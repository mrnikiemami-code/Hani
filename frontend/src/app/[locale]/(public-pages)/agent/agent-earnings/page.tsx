import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyAgencyDashboard } from "@/features/dashboard/infrastructure/dashboard-api";
import { getMyAgencyPayouts } from "@/features/dashboard/infrastructure/agency-api";
import { AgentPageShell } from "@/features/dashboard/ui/AgentPageShell";

export const dynamic = "force-dynamic";

export default async function AgentEarningsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "agency" });
  const [dashboard, payouts] = await Promise.all([
    getMyAgencyDashboard(),
    getMyAgencyPayouts()
  ]);

  return (
    <AgentPageShell
      title={t("earningsTitle")}
      subtitle={t("earningsSubtitle")}
      active={t("earningsTitle")}
    >
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-none">
            <div className="card-body">
              <p className="mb-1">{t("grossPaid")}</p>
              <h4 className="mb-0">
                {formatMoney(
                  dashboard?.grossPaid ?? 0,
                  dashboard?.currency,
                  locale
                )}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-none">
            <div className="card-body">
              <p className="mb-1">{t("paid")}</p>
              <h4 className="mb-0">{dashboard?.paidCount ?? 0}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {payouts.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noPayouts")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("payout")}</th>
                    <th className="fs-13">{t("period")}</th>
                    <th className="fs-13">{t("amount")}</th>
                    <th className="fs-13">{t("status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr key={payout.payoutId}>
                      <td className="fs-14 fw-medium">{payout.payoutId}</td>
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
    </AgentPageShell>
  );
}
