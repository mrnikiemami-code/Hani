import { absoluteUrl } from "@/lib/hani/site";

type VisaStructuredDataProps = {
  locale: string;
  slug: string;
  name: string;
  description: string | null;
  types: Array<{
    code: string;
    priceAdult: number;
    currency: string;
    faqs: Array<{ question: string; answer: string }>;
  }>;
};

/** JSON-LD for a public visa detail page. */
export function VisaStructuredData({
  locale,
  slug,
  name,
  description,
  types
}: VisaStructuredDataProps) {
  const url = absoluteUrl(`/${locale}/visa/${slug}`);
  const first = types[0];
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${name} visa`,
      description: description ?? undefined,
      serviceType: "Visa application assistance",
      url,
      provider: {
        "@type": "Organization",
        name: "Hani",
        url: absoluteUrl("/")
      },
      areaServed: {
        "@type": "Country",
        name: name
      },
      ...(first
        ? {
            offers: {
              "@type": "Offer",
              price: first.priceAdult,
              priceCurrency: first.currency,
              url
            }
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
          name: "Visas",
          item: absoluteUrl(`/${locale}/visa`)
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: url
        }
      ]
    }
  ];

  if (first?.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: first.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
      }}
    />
  );
}
