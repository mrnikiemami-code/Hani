import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/hani/site";
import { getPublishedContentEntries } from "@/features/home-experience/infrastructure/content-entry-api";

const paths = [
  "",
  "/tours",
  "/tours?scope=domestic",
  "/tours?scope=foreign",
  "/visa",
  "/hotels",
  "/blog",
  "/itineraries",
  "/videos",
  "/agencies",
  "/restaurants",
  "/attractions",
  "/safarsaz"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentRoutes = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const entries = await getPublishedContentEntries(locale);
        return entries.map((entry) => ({
          locale,
          path: `/content/${entry.slug}`,
          updatedAt: entry.updatedAt
        }));
      })
    )
  ).flat();

  const staticRoutes = routing.locales.flatMap((locale) =>
    paths.map((path) => {
      const suffix = path.startsWith("?") ? path : path;
      return {
        url: absoluteUrl(`/${locale}${suffix}`),
        changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
        priority: path === "" ? 1 : path.startsWith("/tours") ? 0.9 : 0.7,
        ...(path === ""
          ? { images: [absoluteUrl("/assets/img/bg/adventure-bg.png")] }
          : {}),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((item) => [
              item,
              absoluteUrl(`/${item}${suffix}`)
            ])
          )
        }
      };
    })
  );

  return [
    ...staticRoutes,
    ...contentRoutes.map((entry) => ({
      url: absoluteUrl(`/${entry.locale}${entry.path}`),
      lastModified: entry.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
