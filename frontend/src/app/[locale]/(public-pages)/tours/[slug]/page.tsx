import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatIsoDate } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { routing } from "@/i18n/routing";
import { TourDetailStructuredData } from "@/features/tours/ui/TourDetailStructuredData";
import { absoluteUrl } from "@/lib/hani/site";
import { Link } from "@/i18n/navigation";
import {
  getTourBySlug,
  getTourComparison,
  getTourReviews,
  localizedTranslation
} from "@/features/tours/infrastructure/tour-detail-api";


export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getTourBySlug(locale, slug);
  const translation = product ? localizedTranslation(product.translations, locale) : null;
  return {
    title: translation?.seoTitle ?? translation?.title ?? "Hani",
    description: translation?.seoDescription ?? translation?.summary ?? undefined,
    alternates: product
      ? {
          canonical: absoluteUrl(`/${locale}/tours/${product.slug}`),
          languages: Object.fromEntries(
            routing.locales.map((item) => [
              item,
              absoluteUrl(`/${item}/tours/${product.slug}`)
            ])
          )
        }
      : undefined,
    robots: { index: true, follow: true }
  };
}

export default async function TourDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "tourDetail" });
  const product = await getTourBySlug(locale, slug);
  if (!product) notFound();
  const translation = localizedTranslation(product.translations, locale);
  if (!translation) notFound();
  const comparison = await getTourComparison(product.id, locale);
  const reviews = await getTourReviews(product.id, locale);

  return (
    <>
      <TourDetailStructuredData
        locale={locale}
        slug={product.slug}
        title={translation.title}
        summary={translation.summary}
        description={translation.description}
        coverImageUrl={product.coverImageUrl}
        durationDays={product.durationDays}
        offers={(comparison?.offers ?? []).map((offer) => ({
          price: offer.minPrice,
          currency: offer.currency
        }))}
      />
      <Breadcrumb
        title={translation.title}
        breadcrumbs={[
          { label: t("home"), link: "/", active: false },
          { label: t("tours"), link: "/tours", active: false },
          { label: translation.title, active: true }
        ]}
        backgroundClass="breadcrumb-bg-04"
      />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="card border-0 shadow-sm mb-4">
                {product.coverImageUrl && (
                  <img
                    src={product.coverImageUrl}
                    alt={translation.title}
                    className="card-img-top"
                    style={{ maxHeight: 420, objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h4 className="mb-2">{translation.title}</h4>
                  <p className="text-gray-6">{translation.summary}</p>
                  <div className="row g-3 my-3">
                    {[
                      [t("duration"), t("days", { count: product.durationDays })],
                      [t("scope"), product.scope],
                      [t("type"), product.tourType],
                      [t("difficulty"), product.difficulty],
                      [t("vehicle"), product.vehicleType],
                      [t("accommodation"), product.accommodationType]
                    ].map(([label, value]) => (
                      <div className="col-sm-4" key={label}>
                        <span className="fs-12 text-gray-6 d-block">{label}</span>
                        <strong className="fs-14">{value}</strong>
                      </div>
                    ))}
                  </div>
                  <h5 className="mt-4">{t("description")}</h5>
                  <p className="text-gray-6" style={{ whiteSpace: "pre-line" }}>
                    {translation.description}
                  </p>
                  {translation.includedServices && (
                    <>
                      <h5 className="mt-4">{t("included")}</h5>
                      <p className="text-gray-6" style={{ whiteSpace: "pre-line" }}>
                        {translation.includedServices}
                      </p>
                    </>
                  )}
                  {translation.excludedServices && (
                    <>
                      <h5 className="mt-4">{t("excluded")}</h5>
                      <p className="text-gray-6" style={{ whiteSpace: "pre-line" }}>
                        {translation.excludedServices}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {reviews?.items.length ? (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{t("reviews")}</h5>
                    <span className="fs-13 text-gray-6">
                      {t("reviewCount", { count: reviews.totalCount })}
                    </span>
                  </div>
                  <div className="card-body">
                    {reviews.items.map((review) => (
                      <div className="border-bottom pb-3 mb-3" key={review.reviewId}>
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <strong className="fs-14">{review.authorDisplayName}</strong>
                          <span className="badge badge-soft-warning rounded-pill">
                            {review.rating}/5
                          </span>
                        </div>
                        {review.title ? (
                          <span className="d-block fw-medium mt-1">{review.title}</span>
                        ) : null}
                        <p className="text-gray-6 mb-1 mt-1">{review.comment}</p>
                        <span className="fs-12 text-gray-5">
                          {formatIsoDate(review.createdAt, locale, "medium")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {product.itineraryDays.length > 0 && (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">{t("itinerary")}</h5>
                  </div>
                  <div className="card-body">
                    {product.itineraryDays.map((day) => {
                      const copy =
                        day.translations.find((item) => item.locale === locale) ??
                        day.translations.find((item) => item.locale === "fa") ??
                        day.translations[0];
                      return (
                        <div className="border-bottom pb-3 mb-3" key={day.dayNumber}>
                          <strong className="d-block mb-1">
                            {t("day", { number: day.dayNumber })}
                            {copy?.title ? ` — ${copy.title}` : ""}
                          </strong>
                          <p className="mb-1 text-gray-6">{copy?.description}</p>
                          {copy?.accommodation && (
                            <span className="fs-13 text-gray-6">
                              {t("stay")}: {copy.accommodation}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="col-xl-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header">
                  <h5 className="mb-0">{t("offers")}</h5>
                </div>
                <div className="card-body">
                  {comparison?.offers.length ? (
                    comparison.offers.map((offer) => (
                      <div className="border rounded p-3 mb-3" key={offer.offerId}>
                        <strong className="d-block mb-1">{offer.agencyName}</strong>
                        <span className="fs-13 text-gray-6 d-block mb-2">
                          {offer.title}
                        </span>
                        <span className="d-block fs-18 fw-bold">
                          {formatMoney(offer.minPrice, offer.currency, locale)}
                        </span>
                        {offer.departures[0] && (
                          <span className="fs-12 text-gray-6 d-block mb-2">
                            {formatIsoDate(offer.departures[0].startDate, locale, "short")}
                            {" – "}
                            {formatIsoDate(offer.departures[0].endDate, locale, "short")}
                          </span>
                        )}
                        <Link
                          href={`/checkout/${product.id}`}
                          className="btn btn-primary btn-sm w-100"
                        >
                          {t("book")}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-6 mb-0">{t("noOffers")}</p>
                  )}
                </div>
              </div>
              {translation.cancellationPolicy && (
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">{t("cancellation")}</h5>
                  </div>
                  <div className="card-body text-gray-6" style={{ whiteSpace: "pre-line" }}>
                    {translation.cancellationPolicy}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
