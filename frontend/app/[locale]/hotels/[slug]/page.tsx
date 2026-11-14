import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { HotelDetail } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function HotelDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const hotel = await apiGet<HotelDetail>(`/market/v1/hotels/${slug}`);
  const name =
    hotel?.translations.find((item) => item.locale === locale)?.name ??
    hotel?.translations[0]?.name ??
    slug;

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!hotel ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <>
              <h1>
                {name} · {hotel.stars}★
              </h1>
              <div className="muted">
                {hotel.averageRating ?? "—"} / 5 · {hotel.reviewCount} reviews
                {hotel.rankInCity ? ` · rank ${hotel.rankInCity}` : ""}
              </div>
              <p>{hotel.address}</p>

              <section className="section">
                <h2>{t("amenities")}</h2>
                <div className="grid">
                  {hotel.amenities.map((amenity) => (
                    <div className="card" key={`${amenity.category}-${amenity.name}`}>
                      {amenity.name}
                    </div>
                  ))}
                </div>
              </section>

              <section className="section">
                <h2>{t("rooms")}</h2>
                <div className="list">
                  {hotel.rooms.map((room) => (
                    <div className="row" key={room.name}>
                      <div>
                        <strong>{room.name}</strong>
                        <div className="muted">
                          {room.roomType} · {room.mealPlan}
                        </div>
                      </div>
                      <div className="price">{formatMoney(room.price, room.currency)}</div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
