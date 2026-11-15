"use client";

import dynamic from "next/dynamic";
import Header from "@/components/common-header/header";
import type { HomeExperienceDefinition } from "../domain/home-experience";
import type { HomeFeed } from "../domain/home-feed";
import { HOME_EXPERIENCE_LOADERS } from "../infrastructure/registry";
import { HomeFeedProvider } from "./HomeFeedProvider";

type Props = {
  definition: HomeExperienceDefinition;
  homeFeed: HomeFeed | null;
};

export function HomeExperienceRenderer({ definition, homeFeed }: Props) {
  const Experience = dynamic(HOME_EXPERIENCE_LOADERS[definition.id], {
    ssr: false,
    loading: () => (
      <div className="container py-5">
        <div className="placeholder-glow">
          <span className="placeholder col-12" />
        </div>
      </div>
    )
  });

  return (
    <HomeFeedProvider value={homeFeed}>
      <Header />
      <Experience />
    </HomeFeedProvider>
  );
}
