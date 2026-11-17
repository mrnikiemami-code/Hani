import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/hani/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((path) => {
      const suffix = path.startsWith("?") ? path : path;
      return {
        url: absoluteUrl(`/${locale}${suffix}`),
        changeFrequency: path === "" ? "daily" : "weekly",
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
}
