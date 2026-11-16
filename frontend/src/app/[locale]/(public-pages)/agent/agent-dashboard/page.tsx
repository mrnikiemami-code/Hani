import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyAgencyDashboard } from "@/features/dashboard/infrastructure/dashboard-api";
import {
  getMyAgencyListings,
  getMyAgencyOrders,
  getMyAgencyPayouts
} from "@/features/dashboard/infrastructure/agency-api";
import { AgentPageShell } from "@/features/dashboard/ui/AgentPageShell";
import { formatIsoInstant } from "@/lib/hani/calendar";

export const dynamic = "force-dynamic";

export default async function AgentDashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common, dashboard, orders, listings, payouts] = await Promise.all([
    getTranslations({ locale, namespace: "agency" }),
    getTranslations({ locale, namespace: "common" }),
    getMyAgencyDashboard(),
    getMyAgencyOrders(),
    getMyAgencyListings(),
    getMyAgencyPayouts()
  ]);

  return (
    <AgentPageShell
      title={t("bookingsTitle")}
      subtitle={t("bookingsSubtitle")}
      active={t("bookingsTitle")}
    >
      <div className="row mb-4">
        <div className="col-xl-3 col-sm-6 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-body text-center">
              <p className="mb-1">{common("totalBookings")}</p>
              <h5 className="mb-0">{dashboard?.orderCount ?? 0}</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-body text-center">
              <p className="mb-1">{common("pendingBookings")}</p>
              <h5 className="mb-0">{dashboard?.pendingCount ?? 0}</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-body text-center">
              <p className="mb-1">{common("totalEarnings")}</p>
              <h5 className="mb-0">
                {formatMoney(dashboard?.grossPaid ?? 0, dashboard?.currency, locale)}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-body text-center">
              <p className="mb-1">{common("agencyStatus")}</p>
              <h5 className="mb-0">
                {dashboard?.agencyName ?? common("pending")}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h6 className="mb-3">{t("bookingsTitle")}</h6>
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
                  {orders.slice(0, 5).map((order) => (
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
                        {formatIsoInstant(order.createdAt, locale, { dateStyle: "medium" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <h6 className="mb-3">{t("listingsTitle")}</h6>
              {listings.length === 0 ? (
                <p className="text-gray-5 mb-0">{t("noListings")}</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <tbody>
                      {listings.slice(0, 5).map((listing) => (
                        <tr key={listing.offerId}>
                          <td className="fs-14 fw-medium">{listing.title}</td>
                          <td className="fs-14 text-gray-6">
                            {formatMoney(listing.basePrice, listing.currency, locale)}
                          </td>
                          <td>
                            <span className="badge badge-soft-info rounded-pill">
                              {listing.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <h6 className="mb-3">{t("paymentsTitle")}</h6>
              {payouts.length === 0 ? (
                <p className="text-gray-5 mb-0">{t("noPayouts")}</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <tbody>
                      {payouts.slice(0, 5).map((payout) => (
                        <tr key={payout.payoutId}>
                          <td className="fs-14 text-gray-6">
                            {payout.periodStart} — {payout.periodEnd}
                          </td>
                          <td className="fs-14 fw-semibold">
                            {formatMoney(payout.amount, payout.currency, locale)}
                          </td>
                          <td>
                            <span className="badge badge-soft-info rounded-pill">
                              {payout.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AgentPageShell>
  );
}
