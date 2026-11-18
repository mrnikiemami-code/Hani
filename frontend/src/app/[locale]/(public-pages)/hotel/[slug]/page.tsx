import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { absoluteUrl } from "@/lib/hani/site";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import {
  getHotelDetail,
  getHotelReviewCriteria,
  getHotelReviews
} from "@/features/hotels/infrastructure/hotel-detail-api";
import { HotelBookingRequest } from "@/features/hotels/ui/HotelBookingRequest";
import { HotelReviewActions } from "@/features/hotels/ui/HotelReviewActions";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const hotel = await getHotelDetail(locale, slug);
  if (!hotel) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  const translation =
    hotel.translations.find((item) => item.locale === locale) ??
    hotel.translations[0];
  const title = hotel.seoTitle || translation?.name || hotel.slug;
  const description = hotel.seoDescription || translation?.description || "";
  const cover = hotel.images.find((image) => image.isCover) ?? hotel.images[0];

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/hotel/${hotel.slug}`)
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl(`/${locale}/hotel/${hotel.slug}`),
      images: cover?.url ? [cover.url] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cover?.url ? [cover.url] : undefined
    }
  };
}

export default async function HotelDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hotelDetail" });
  const hotel = await getHotelDetail(locale, slug);
  if (!hotel) notFound();

  const [reviews, criteria] = await Promise.all([
    getHotelReviews(hotel.hotelId),
    getHotelReviewCriteria(hotel.hotelId)
  ]);
  const translation =
    hotel.translations.find((item) => item.locale === locale) ??
    hotel.translations[0];
  const cover = hotel.images.find((image) => image.isCover) ?? hotel.images[0];
  const gallery = hotel.images.filter((image) => image !== cover);
  const amenityGroups = hotel.amenities.reduce<Record<string, string[]>>(
    (groups, amenity) => {
      (groups[amenity.category] ??= []).push(amenity.name);
      return groups;
    },
    {}
  );
  const assetUrl = (value: string) =>
    value.startsWith("http")
      ? value
      : absoluteUrl(value.startsWith("/") ? value : `/${value}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: translation?.name ?? hotel.slug,
    image: cover?.url ? assetUrl(cover.url) : undefined,
    starRating: { "@type": "Rating", ratingValue: hotel.stars },
    address: hotel.address,
    telephone: hotel.contactPhone,
    url: absoluteUrl(`/${locale}/hotel/${hotel.slug}`),
    aggregateRating:
      hotel.averageRating != null
        ? {
            "@type": "AggregateRating",
            ratingValue: hotel.averageRating,
            reviewCount: hotel.reviewCount
          }
        : undefined
  };

  const criteriaLabels: Record<string, string> = {
    Food: "کیفیت و تنوع غذا",
    Cleanliness: "تمیزی و زیبایی هتل و اتاق‌ها",
    Staff: "عملکرد کارکنان",
    Entertainment: "تفریحات و امکانات هتل",
    Location: "منطقه و دسترسی",
    Value: "ارزش قیمت به نسبت خدمات"
  };

  return (
    <div className="content">
      <div className="container py-4 py-lg-5">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <nav className="mb-3 fs-13 text-gray-6">
          <Link href="/">{t("about")}</Link>
          {" / "}
          <Link href="/hotel/hotel-grid">{t("roomsTitle")}</Link>
          {" / "}
          <span>{translation?.name ?? hotel.slug}</span>
        </nav>

        <div className="row g-4">
          <div className="col-lg-8">
            {cover && (
              <img
                src={assetUrl(cover.url)}
                alt={cover.altText ?? translation?.name ?? hotel.slug}
                className="img-fluid rounded w-100 mb-3"
                style={{ maxHeight: 460, objectFit: "cover" }}
              />
            )}
            {gallery.length > 0 && (
              <div className="row g-2 mb-4">
                {gallery.slice(0, 4).map((image) => (
                  <div className="col-3" key={image.url}>
                    <img
                      src={assetUrl(image.url)}
                      alt={image.altText ?? ""}
                      className="img-fluid rounded w-100"
                      style={{ height: 90, objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-start justify-content-between gap-2">
                  <div>
                    <h1 className="h3 mb-1">{translation?.name ?? hotel.slug}</h1>
                    <p className="text-gray-6 mb-1">{hotel.address}</p>
                    <span className="text-warning">
                      {"★".repeat(hotel.stars)}
                    </span>
                  </div>
                  <div className="text-end">
                    {hotel.averageRating != null && (
                      <span className="badge bg-success fs-14">
                        {hotel.averageRating.toFixed(1)}
                      </span>
                    )}
                    <p className="fs-12 text-gray-6 mb-0 mt-1">
                      {t("reviewCount", { count: hotel.reviewCount })}
                    </p>
                  </div>
                </div>

                {hotel.recommendationPercent != null && (
                  <p className="mt-3 mb-1 fs-14">
                    {t("recommendation")}:{" "}
                    <strong>{hotel.recommendationPercent}%</strong>
                  </p>
                )}
                {hotel.rankInCity != null && (
                  <p className="fs-14 mb-0">
                    {t("rank")}: <strong>#{hotel.rankInCity}</strong>
                  </p>
                )}

                <hr />
                <h2 className="h5">{t("about")}</h2>
                <p className="text-gray-7 mb-0">
                  {translation?.description ?? "—"}
                </p>
              </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h5 mb-3">{t("amenities")}</h2>
                {Object.keys(amenityGroups).length === 0 ? (
                  <p className="text-gray-6 mb-0">{t("noAmenities")}</p>
                ) : (
                  Object.entries(amenityGroups).map(([category, names]) => (
                    <div className="mb-3" key={category}>
                      <h3 className="h6">{category}</h3>
                      <div className="d-flex flex-wrap gap-2">
                        {names.map((name) => (
                          <span className="badge bg-light text-dark border" key={name}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h5 mb-3">{t("roomsTitle")}</h2>
                {hotel.rooms.length === 0 ? (
                  <p className="text-gray-6 mb-0">{t("noRooms")}</p>
                ) : (
                  <div className="row g-3">
                    {hotel.rooms.map((room) => (
                      <div className="col-md-6" key={`${room.name}-${room.roomType}`}>
                        <div className="border rounded p-3 h-100">
                          <h3 className="h6">{room.name}</h3>
                          <p className="fs-13 text-gray-6 mb-1">
                            {room.roomType} · {room.mealPlan} · {room.adults}+
                            {room.children}
                          </p>
                          <p className="mb-0">
                            <strong>
                              {new Intl.NumberFormat(locale, {
                                style: "currency",
                                currency: room.currency,
                                maximumFractionDigits: 0
                              }).format(room.price)}
                            </strong>{" "}
                            <span className="fs-12 text-gray-6">
                              {t("perNight")}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 mb-3">{t("reviews")}</h2>
                {criteria && Object.keys(criteria.averages).length > 0 && (
                  <div className="mb-4">
                    <h3 className="h6">{t("ratingBreakdown")}</h3>
                    <div className="row g-2">
                      {Object.entries(criteria.averages).map(([key, value]) => (
                        <div className="col-md-6" key={key}>
                          <div className="d-flex justify-content-between fs-13">
                            <span>{t(`criteria${key}`)}</span>
                            <strong>{value}</strong>
                          </div>
                          <div className="progress" style={{ height: 5 }}>
                            <div
                              className="progress-bar bg-success"
                              style={{ width: `${(value / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {!reviews || reviews.items.length === 0 ? (
                  <p className="text-gray-6 mb-0">{t("noReviews")}</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {reviews.items.map((review) => (
                      <article className="border rounded p-3" key={review.reviewId}>
                        <div className="d-flex justify-content-between gap-2">
                          <strong>{review.authorDisplayName}</strong>
                          <span className="badge bg-success">{review.rating}</span>
                        </div>
                        <p className="fs-12 text-gray-6 mb-2">
                          {formatIsoInstant(review.createdAt, locale, {
                            dateStyle: "medium"
                          })}
                          {review.visitDate
                            ? ` · ${formatIsoInstant(review.visitDate, locale, {
                                dateStyle: "medium"
                              })}`
                            : ""}
                          {` · ${t(`travelType${review.travelType}`)}`}
                        </p>
                        {review.title && <h3 className="h6">{review.title}</h3>}
                        <p className="mb-2">{review.comment}</p>
                        <HotelReviewActions
                          reviewId={review.reviewId}
                          helpfulCount={review.helpfulCount}
                        />
                        {review.photos.length > 0 && (
                          <div className="d-flex gap-2 flex-wrap">
                            {review.photos.map((photo) => (
                              <img
                                key={photo.photoId}
                                src={assetUrl(photo.url)}
                                alt={photo.caption ?? ""}
                                className="rounded"
                                style={{ width: 90, height: 70, objectFit: "cover" }}
                              />
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sticky-component">
              <HotelBookingRequest hotelId={hotel.hotelId} />

              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body">
                  <h2 className="h6 mb-3">{t("contact")}</h2>
                  <p className="fs-13 mb-1">
                    <strong>{t("address")}:</strong> {hotel.address ?? "—"}
                  </p>
                  <p className="fs-13 mb-1">
                    <strong>{t("phoneLabel")}:</strong>{" "}
                    <span dir="ltr">{hotel.contactPhone ?? "—"}</span>
                  </p>
                  <p className="fs-13 mb-1">
                    <strong>{t("website")}:</strong>{" "}
                    {hotel.websiteUrl ? (
                      <a href={hotel.websiteUrl} target="_blank" rel="noreferrer">
                        {hotel.websiteUrl}
                      </a>
                    ) : (
                      "—"
                    )}
                  </p>
                  <p className="fs-13 mb-0">
                    <strong>{t("checkInOut")}:</strong> {hotel.checkInTime ?? "—"} /{" "}
                    {hotel.checkOutTime ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
