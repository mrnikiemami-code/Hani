import { absoluteUrl } from "@/lib/hani/site";
import type { TourScopeValue, TourSearchItem } from "../domain/tour-search";

export function TourListStructuredData({
  locale,
  scope,
  tours
}: {
  locale: string;
  scope?: TourScopeValue;
  tours: TourSearchItem[];
}) {
  const scopeQuery =
    scope === "Domestic" ? "?scope=domestic" : scope === "Foreign" ? "?scope=foreign" : "";
  const listUrl = absoluteUrl(`/${locale}/tours${scopeQuery}`);
  const list = {
    "@type": "ItemList",
    "@id": `${listUrl}#tours`,
    name: "Tours",
    numberOfItems: tours.length,
    itemListElement: tours.slice(0, 20).map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/${locale}/tours/${tour.slug}`),
      name: tour.title
    }))
  };
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl(`/${locale}`)
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tours",
        item: listUrl
      }
    ]
  };
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [list, breadcrumb]
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
