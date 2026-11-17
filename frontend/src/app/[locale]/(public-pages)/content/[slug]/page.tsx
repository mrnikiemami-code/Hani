import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { absoluteUrl } from "@/lib/hani/site";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { getPublishedContentEntry } from "@/features/home-experience/infrastructure/content-entry-api";

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

  return (
    <div className="content">
      <div className="container py-5">
        <article className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <h1 className="mb-3">{entry.title}</h1>
            {entry.excerpt ? (
              <p className="lead text-gray-6">{entry.excerpt}</p>
            ) : null}
            {entry.heroImageUrl ? (
              <img
                src={entry.heroImageUrl}
                alt={entry.title}
                className="img-fluid rounded mb-4"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : null}
            <div className="text-gray-7" style={{ whiteSpace: "pre-wrap" }}>
              {entry.body || t("noResults")}
            </div>
            <p className="fs-12 text-gray-5 mt-4 mb-0">
              {formatIsoInstant(entry.updatedAt, locale, { dateStyle: "medium" })}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
