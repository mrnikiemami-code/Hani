import type { HomeFeed } from "@/lib/types";
import { getHomeExperienceDefinition } from "../domain/home-experience";
import { HOME_EXPERIENCE_LOADERS } from "../infrastructure/home-experience-registry";

export async function HomeExperienceRenderer({
  locale,
  data,
  experienceId
}: {
  locale: string;
  data: HomeFeed | null;
  experienceId: string | null | undefined;
}) {
  const definition = getHomeExperienceDefinition(experienceId);
  const { default: Experience } = await HOME_EXPERIENCE_LOADERS[definition.id]();

  return <Experience locale={locale} data={data} definition={definition} />;
}
