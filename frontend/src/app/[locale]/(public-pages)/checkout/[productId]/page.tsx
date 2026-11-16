import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { formatIsoDate } from "@/lib/hani/calendar";
import { submitCheckout } from "@/features/checkout/application/submit-checkout";
import { getCheckoutProduct } from "@/features/checkout/infrastructure/checkout-api";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return { title: t("title") };
}

export default async function CheckoutPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string; productId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale, productId } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const product = await getCheckoutProduct(productId, locale);
  if (!product) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "checkout" });
  const offer = product.offers.find((item) => item.departures.length > 0);
  const departure = offer?.departures[0];
  const roomTypes = [...new Set(departure?.prices.map((price) => price.roomType) ?? [])];

  return (
    <div>
      <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
        <div className="container">
          <h2 className="breadcrumb-title mb-2">{t("title")}</h2>
          <p className="mb-0">{t("subtitle")}</p>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {query.error && (
            <div className="alert alert-danger" role="alert">
              {query.error === "quote"
                ? t("quoteError")
                : query.error === "hold"
                  ? t("holdError")
                  : query.error === "order"
                    ? t("orderError")
                    : t("invalid")}
            </div>
          )}

          <div className="row">
            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  <h5 className="mb-1">{product.title}</h5>
                  <p className="text-gray-5">{product.summary}</p>

                  {offer && departure ? (
                    <form action={submitCheckout} className="row gy-3">
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="productId" value={product.productId} />

                      <div className="col-md-6">
                        <label className="form-label" htmlFor="departure">
                          {t("departure")}
                        </label>
                        <select className="form-select" id="departure" name="departureId" defaultValue={departure.id}>
                          {offer.departures.map((item) => (
                            <option key={item.id} value={item.id}>
                              {formatIsoDate(item.startDate, locale)} —{" "}
                              {formatIsoDate(item.endDate, locale)}
                            </option>
                          ))}
                        </select>
                        <small className="text-gray-5">
                          {t("seatsLeft", { count: departure.seatsLeft })}
                        </small>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label" htmlFor="roomType">
                          {t("roomType")}
                        </label>
                        <select className="form-select" id="roomType" name="roomType" defaultValue={roomTypes[0] ?? "Double"}>
                          {(roomTypes.length > 0 ? roomTypes : ["Double"]).map((roomType) => (
                            <option key={roomType} value={roomType}>
                              {roomType}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label" htmlFor="adults">
                          {t("adults")}
                        </label>
                        <input className="form-control" id="adults" name="adults" type="number" min={1} defaultValue={1} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="children">
                          {t("children")}
                        </label>
                        <input className="form-control" id="children" name="children" type="number" min={0} defaultValue={0} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="infants">
                          {t("infants")}
                        </label>
                        <input className="form-control" id="infants" name="infants" type="number" min={0} defaultValue={0} />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label" htmlFor="contactEmail">
                          {t("email")}
                        </label>
                        <input className="form-control" id="contactEmail" name="contactEmail" type="email" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="contactPhone">
                          {t("phone")}
                        </label>
                        <input className="form-control" id="contactPhone" name="contactPhone" type="tel" />
                      </div>

                      <div className="col-12">
                        <h6 className="mb-2">{t("contact")}</h6>
                        <div className="row gy-2">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <div className="col-md-6" key={index}>
                              <label className="form-label" htmlFor={`traveler-${index}`}>
                                {t("traveler", { index: index + 1 })}
                              </label>
                              <input
                                className="form-control"
                                id={`traveler-${index}`}
                                name={`traveler-${index}`}
                                type="text"
                                autoComplete="name"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary" type="submit">
                          {t("submit")}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-gray-5 mb-0">{t("noDepartures")}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">{offer?.agencyName ?? product.title}</h6>
                  <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                    <span>{t("price")}</span>
                    <strong>
                      {formatMoney(departure?.prices[0]?.amount ?? offer?.minPrice, departure?.prices[0]?.currency ?? offer?.currency, locale)}
                    </strong>
                  </div>
                  <p className="fs-14 text-gray-5 mb-0">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
