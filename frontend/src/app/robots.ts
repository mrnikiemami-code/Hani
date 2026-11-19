export const revalidate = 3600;

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/hani/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/market/",
          "/internal/",
          "/*/user/",
          "/*/admin/",
          "/*/agent/",
          "/*/checkout/",
          "/*/visa/visa-application",
          "/*/visa/track-visa"
        ]
      }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/")
  };
}
