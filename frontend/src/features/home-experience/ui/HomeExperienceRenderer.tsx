"use client";

import dynamic from "next/dynamic";
import Header from "@/components/common-header/header";
import type { HomeExperienceDefinition } from "../domain/home-experience";
import type { HomeFeed } from "../domain/home-feed";
import type { HomePageSettings } from "../domain/home-page-settings";
import type { PageCompositionData } from "../domain/page-composition";
import { CompositionSection } from "./CompositionSection";
import { HOME_EXPERIENCE_LOADERS } from "../infrastructure/registry";
import { HomeFeedProvider } from "./HomeFeedProvider";
import { HaniTrendingTours } from "./HaniTrendingTours";
import { HaniRecommendedVisas } from "./HaniRecommendedVisas";
import { HaniLatestContent } from "./HaniLatestContent";

type Props = {
  definition: HomeExperienceDefinition;
  homeFeed: HomeFeed | null;
  tourScope?: "Domestic" | "Foreign";
  homeSettings?: HomePageSettings;
  composition?: PageCompositionData | null;
};

export function HomeExperienceRenderer({
  definition,
  homeFeed,
  tourScope,
  homeSettings,
  composition
}: Props) {
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
      {definition.id !== "all-services-classic" && (
        <>
          <HaniTrendingTours scope={tourScope} />
          <HaniRecommendedVisas />
          <HaniLatestContent />
        </>
      )}
      <Experience
        tourScope={tourScope}
        homeSettings={homeSettings}
        composition={composition}
      />
      {composition?.sections
        .filter(
          (section) =>
            section.enabled &&
            ![
              "featured",
              "latestDomestic",
              "latestForeign",
              "visas",
              "originCities",
              "travelogues",
              "magazine",
              "experience",
              "delivery",
              "guide",
              "testimonials",
              "whyChoose"
            ].includes(section.id)
        )
        .sort((left, right) => left.order - right.order)
        .map((section) => (
          <CompositionSection key={section.id} section={section} />
        ))}
    </HomeFeedProvider>
  );
}
