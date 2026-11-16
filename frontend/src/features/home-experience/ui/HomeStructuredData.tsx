import { absoluteUrl, siteUrl } from "@/lib/hani/site";
import type { HomeFeed } from "../domain/home-feed";

export function HomeStructuredData({
  locale,
  feed
}: {
  locale: string;
  feed: HomeFeed | null;
}) {
  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Hani",
    url: siteUrl,
    logo: absoluteUrl("/assets/img/logo.svg")
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Hani",
    url: absoluteUrl(`/${locale}`),
    inLanguage: locale,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl(`/${locale}/tours`)}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  const tours = feed?.featuredTours.items.slice(0, 8) ?? [];
  const itemList =
    tours.length > 0
      ? {
          "@type": "ItemList",
          "@id": `${absoluteUrl(`/${locale}`)}#featured-tours`,
          name: "Featured tours",
          numberOfItems: tours.length,
          itemListElement: tours.map((tour, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/${locale}/tours/${tour.slug}`),
            name: tour.title
          }))
        }
      : null;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, ...(itemList ? [itemList] : [])]
  };
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
