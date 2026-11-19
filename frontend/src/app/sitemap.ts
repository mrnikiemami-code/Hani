import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/hani/site";
import { getPublishedContentEntries } from "@/features/home-experience/infrastructure/content-entry-api";
import { apiGet } from "@/lib/hani/api";

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

  const hotelRoutes = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const result = await apiGet<{
          items: { slug: string }[];
        }>(`/market/v1/hotels?page=1&pageSize=50&locale=${locale}`);
        return (result?.items ?? []).map((hotel) => ({
          locale,
          slug: hotel.slug
        }));
      })
    )
  ).flat();

  const tourRoutes = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const result = await apiGet<{
          items: { slug: string }[];
        }>(`/market/v1/search?locale=${locale}&page=1&pageSize=50&sort=newest`);
        return (result?.items ?? []).map((tour) => ({
          locale,
          slug: tour.slug
        }));
      })
    )
  ).flat();

  const visaRoutes = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const result = await apiGet<{ slug: string }[]>(
          `/market/v1/visas?locale=${locale}`
        );
        return (result ?? []).map((visa) => ({
          locale,
          slug: visa.slug
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
    })),
    ...hotelRoutes.map((hotel) => ({
      url: absoluteUrl(`/${hotel.locale}/hotel/${hotel.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...tourRoutes.map((tour) => ({
      url: absoluteUrl(`/${tour.locale}/tours/${tour.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...visaRoutes.map((visa) => ({
      url: absoluteUrl(`/${visa.locale}/visa/${visa.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];
}
