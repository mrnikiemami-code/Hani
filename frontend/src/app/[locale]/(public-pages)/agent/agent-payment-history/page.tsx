import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyAgencyPayouts } from "@/features/dashboard/infrastructure/agency-api";
import { AgentPageShell } from "@/features/dashboard/ui/AgentPageShell";

export const dynamic = "force-dynamic";

export default async function AgentPaymentHistoryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "agency" });
  const payouts = await getMyAgencyPayouts();

  return (
    <AgentPageShell
      title={t("paymentsTitle")}
      subtitle={t("paymentsSubtitle")}
      active={t("paymentsTitle")}
    >
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
                    <th className="fs-13">{t("date")}</th>
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
                      <td className="fs-14 text-gray-6">
                        {new Date(payout.createdAt).toLocaleDateString(locale)}
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
