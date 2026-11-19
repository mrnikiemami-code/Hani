import { absoluteUrl } from "@/lib/hani/site";

type TourStructuredDataProps = {
  locale: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  coverImageUrl?: string | null;
  durationDays: number;
  offers: Array<{
    price: number;
    currency: string;
    availability?: string;
  }>;
};

/** JSON-LD for a public tour detail page. */
export function TourDetailStructuredData({
  locale,
  slug,
  title,
  summary,
  description,
  coverImageUrl,
  durationDays,
  offers
}: TourStructuredDataProps) {
  const url = absoluteUrl(`/${locale}/tours/${slug}`);
  const graph = [
    {
      "@type": "TouristTrip",
      "@id": `${url}#trip`,
      name: title,
      description: summary || description,
      url,
      ...(coverImageUrl ? { image: coverImageUrl } : {}),
      ...(durationDays > 0
        ? {
            itinerary: {
              "@type": "ItemList",
              numberOfItems: durationDays
            }
          }
        : {}),
      provider: {
        "@type": "Organization",
        name: "Hani",
        url: absoluteUrl("/")
      },
      ...(offers.length > 0
        ? {
            offers: offers.map((offer) => ({
              "@type": "Offer",
              price: offer.price,
              priceCurrency: offer.currency,
              availability:
                offer.availability ??
                "https://schema.org/InStock",
              url
            }))
          }
        : {})
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
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
          item: absoluteUrl(`/${locale}/tours`)
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: url
        }
      ]
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
      }}
    />
  );
}
