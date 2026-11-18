import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { AdminOrderDetail, AdminOrderPayment } from "@/features/home-experience/domain/admin-order-detail";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { OrderActions } from "@/features/home-experience/ui/OrderActions";
import { RefundPaymentAction } from "@/features/home-experience/ui/RefundPaymentAction";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  return { title: t("orderDetail"), robots: { index: false, follow: false } };
}

export default async function AdminOrderPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const [result, paymentsResult] = await Promise.all([
    sessionGet<AdminOrderDetail>(`/internal/v1/admin/bookings/orders/${id}`),
    sessionGet<AdminOrderPayment[]>(
      `/internal/v1/admin/bookings/orders/${id}/payments`
    )
  ]);

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="bookings"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{tHome("accessHint")}</div>
        </div>
      </AdminPageShell>
    );
  }
  if (result.status === 404 || !result.data) notFound();
  const order = result.data;
  const payments = paymentsResult.data ?? [];

  return (
    <AdminPageShell
      locale={locale}
      title={`${t("orderDetail")} ${order.orderNumber}`}
      subtitle={t("orderDetailHint")}
      active={t("orderDetail")}
      activeSection="bookings"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h2 className="h5 mb-1">{order.orderNumber}</h2>
            <p className="fs-13 text-gray-6 mb-0">
              {order.status} · {order.paymentStatus}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link href="/admin/bookings" className="btn btn-light btn-sm">
              {t("back")}
            </Link>
            <OrderActions
              orderId={order.orderId}
              disabled={order.status === "Cancelled"}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              [t("amount"), formatMoney(order.total, order.currency, locale)],
              [t("agency"), order.agencyId],
              [t("createdAt"), formatIsoInstant(order.createdAt, locale, { dateStyle: "medium" })],
              [t("due"), formatIsoInstant(order.paymentDueAt, locale, { dateStyle: "medium" })],
              [t("room"), order.roomType],
              [t("contract"), order.contractNumber]
            ].map(([label, value]) => (
              <div className="col-md-4" key={label}>
                <span className="fs-12 text-gray-6 d-block">{label}</span>
                <strong className="fs-14">{value}</strong>
              </div>
            ))}
          </div>
          {order.cancelledAt && (
            <div className="alert alert-warning mt-3 mb-0">
              {t("cancelled")}: {order.cancellationReason}
            </div>
          )}
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("travelers")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("name")}</th>
                <th>{t("type")}</th>
                <th>{t("birthDate")}</th>
              </tr>
            </thead>
            <tbody>
              {order.travelers.map((traveler) => (
                <tr key={traveler.travelerId}>
                  <td>{traveler.fullName}</td>
                  <td>{traveler.type}</td>
                  <td>{traveler.dateOfBirth ? formatIsoDate(traveler.dateOfBirth, locale, "short") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {payments.length > 0 && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header">
            <h2 className="h5 mb-0">{t("payments")}</h2>
          </div>
          <div className="card-body p-0 admin-table-wrap">
            <table className="table admin-data-table content-data-table align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  <th>{t("amount")}</th>
                  <th>{t("currency")}</th>
                  <th>{t("paymentStatus")}</th>
                  <th>{t("provider")}</th>
                  <th>{t("createdAt")}</th>
                  <th className="text-end">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.paymentIntentId}>
                    <td>{formatMoney(payment.amount, payment.currency, locale)}</td>
                    <td>{payment.currency}</td>
                    <td>{payment.status}</td>
                    <td dir="ltr">{payment.provider}</td>
                    <td className="text-nowrap">
                      {formatIsoInstant(payment.createdAt, locale, {
                        dateStyle: "medium"
                      })}
                    </td>
                    <td className="text-end">
                      {payment.status === "Succeeded" ? (
                        <RefundPaymentAction
                          orderId={order.orderId}
                          paymentIntentId={payment.paymentIntentId}
                          amount={payment.amount}
                          currency={payment.currency}
                          locale={locale}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("priceComponents")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("currency")}</th>
                <th>{t("net")}</th>
                <th>{t("tax")}</th>
                <th>{t("amount")}</th>
              </tr>
            </thead>
            <tbody>
              {order.components.map((component) => (
                <tr key={component.currency}>
                  <td>{component.currency}</td>
                  <td>{formatMoney(component.netAmount, component.currency, locale)}</td>
                  <td>{formatMoney(component.taxAmount, component.currency, locale)}</td>
                  <td>{formatMoney(component.totalAmount, component.currency, locale)}</td>
                </tr>
              ))}
              {order.components.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-6 py-4">
                    {formatMoney(order.total, order.currency, locale)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageShell>
  );
}
