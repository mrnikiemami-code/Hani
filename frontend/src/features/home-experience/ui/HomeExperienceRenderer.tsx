"use client";

import dynamic from "next/dynamic";
import Header from "@/components/common-header/header";
import type { HomeExperienceDefinition } from "../domain/home-experience";
import { HOME_EXPERIENCE_LOADERS } from "../infrastructure/registry";

type Props = {
  definition: HomeExperienceDefinition;
};

export function HomeExperienceRenderer({ definition }: Props) {
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
    <>
      <Header />
      <Experience />
    </>
  );
}
