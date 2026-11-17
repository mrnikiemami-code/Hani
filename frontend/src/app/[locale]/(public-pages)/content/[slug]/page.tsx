import type { Metadata } from "next";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { absoluteUrl } from "@/lib/hani/site";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { getPublishedContentEntry } from "@/features/home-experience/infrastructure/content-entry-api";
import { getMediaAsset } from "@/features/home-experience/infrastructure/media-api";
import { HaniMediaImage, MEDIA_SIZES } from "@/features/home-experience/ui/HaniMediaImage";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = await getPublishedContentEntry(locale, slug);
  if (!entry) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  const title = entry.seoTitle || entry.title;
  const description = entry.seoDescription || entry.excerpt || "";
  const image = entry.heroImageUrl
    ? entry.heroImageUrl.startsWith("http")
      ? entry.heroImageUrl
      : absoluteUrl(entry.heroImageUrl)
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/${locale}/content/${entry.slug}`) },
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(`/${locale}/content/${entry.slug}`),
      images: image ? [image] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined
    }
  };
}

export default async function ContentPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const entry = await getPublishedContentEntry(locale, slug);
  if (!entry) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "common" });
  const heroMedia = entry.heroMediaId
    ? await getMediaAsset(entry.heroMediaId)
    : null;

  return (
    <div className="content">
      <div className="container py-5">
        <article className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <h1 className="mb-3">{entry.title}</h1>
            {entry.excerpt ? (
              <p className="lead text-gray-6">{entry.excerpt}</p>
            ) : null}
            {heroMedia ? (
              <HaniMediaImage
                media={heroMedia}
                sizes={MEDIA_SIZES.detail}
                loading="eager"
                fetchPriority="high"
                className="img-fluid rounded mb-4"
              />
            ) : entry.heroImageUrl ? (
              <img
                src={entry.heroImageUrl}
                alt={entry.title}
                className="img-fluid rounded mb-4"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : null}
            <div
              className="text-gray-7"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(entry.body || t("noResults"), {
                  allowedTags: [
                    "p", "br", "strong", "b", "em", "i", "u", "s",
                    "ul", "ol", "li", "h2", "h3", "h4", "blockquote",
                    "a", "img", "table", "thead", "tbody", "tr", "th", "td"
                  ],
                  allowedAttributes: {
                    a: ["href", "title", "target", "rel"],
                    img: ["src", "alt", "width", "height", "loading"]
                  },
                  allowedSchemes: ["http", "https", "mailto"]
                })
              }}
            />
            <p className="fs-12 text-gray-5 mt-4 mb-0">
              {formatIsoInstant(entry.updatedAt, locale, { dateStyle: "medium" })}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
