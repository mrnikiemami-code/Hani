import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyAgencyOrders } from "@/features/dashboard/infrastructure/agency-api";
import { AgentPageShell } from "@/features/dashboard/ui/AgentPageShell";

export const dynamic = "force-dynamic";

export default async function AgentTourBookingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "agency" });
  const orders = await getMyAgencyOrders();

  return (
    <AgentPageShell
      title={t("bookingsTitle")}
      subtitle={t("bookingsSubtitle")}
      active={t("bookingsTitle")}
    >
      <div className="card">
        <div className="card-body">
          {orders.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noBookings")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("product")}</th>
                    <th className="fs-13">{t("amount")}</th>
                    <th className="fs-13">{t("status")}</th>
                    <th className="fs-13">{t("paid")}</th>
                    <th className="fs-13">{t("date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="fs-14 fw-medium">{order.orderNumber}</td>
                      <td className="fs-14 fw-semibold">
                        {formatMoney(order.total, order.currency, locale)}
                      </td>
                      <td>
                        <span className="badge badge-soft-info rounded-pill">
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-soft-success rounded-pill">
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="fs-14 text-gray-6">
                        {new Date(order.createdAt).toLocaleDateString(locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AgentPageShell>
  );
}
