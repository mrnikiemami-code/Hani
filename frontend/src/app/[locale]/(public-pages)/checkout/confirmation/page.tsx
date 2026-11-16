import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import {
  getOrder,
  getPaymentIntent
} from "@/features/checkout/infrastructure/checkout-api";
import { payWithMockGateway } from "@/features/checkout/application/complete-mock-payment";

export const dynamic = "force-dynamic";

export default async function CheckoutConfirmationPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ orderId?: string; intent?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "checkout" });
  const intent = query.intent ? await getPaymentIntent(query.intent) : null;
  const orderId = query.orderId ?? intent?.orderId;
  const order = orderId ? await getOrder(orderId) : null;

  return (
    <div>
      <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
        <div className="container">
          <h2 className="breadcrumb-title mb-2">{t("confirmationTitle")}</h2>
          {order && <p className="mb-0">{order.orderNumber}</p>}
        </div>
      </div>

      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  {order ? (
                    <>
                      <div className="d-flex justify-content-between border-bottom py-2">
                        <span>{t("orderNumber")}</span>
                        <strong>{order.orderNumber}</strong>
                      </div>
                      <div className="d-flex justify-content-between border-bottom py-2">
                        <span>{t("status")}</span>
                        <strong>{order.status}</strong>
                      </div>
                      <div className="d-flex justify-content-between border-bottom py-2">
                        <span>{t("paymentStatus")}</span>
                        <strong>{order.paymentStatus}</strong>
                      </div>
                      <div className="d-flex justify-content-between py-2">
                        <span>{t("total")}</span>
                        <strong>{formatMoney(order.total, order.currency, locale)}</strong>
                      </div>
                      {order.paymentStatus !== "Paid" && (
                        <>
                          <p className="alert alert-warning mt-3 mb-3">{t("paymentPending")}</p>
                          {intent && intent.status !== "Succeeded" && (
                            <form action={payWithMockGateway} className="mb-3">
                              <input type="hidden" name="locale" value={locale} />
                              <input type="hidden" name="paymentIntentId" value={intent.paymentIntentId} />
                              <button className="btn btn-primary" type="submit">
                                {t("payNow")}
                              </button>
                            </form>
                          )}
                        </>
                      )}
                      <a className="btn btn-primary mt-3" href={`/${locale}/user/dashboard`}>
                        {t("backToDashboard")}
                      </a>
                    </>
                  ) : (
                    <p className="mb-0">{t("invalid")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
