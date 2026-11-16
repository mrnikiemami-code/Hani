import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyRefunds } from "@/features/dashboard/infrastructure/finance-api";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";
import { formatIsoInstant } from "@/lib/hani/calendar";

export const dynamic = "force-dynamic";

export default async function CustomerCancellationRefundsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "finance" });
  const refunds = await getMyRefunds();

  return (
    <FinancePageShell
      title={t("refundsTitle")}
      subtitle={t("refundsSubtitle")}
      active={t("refundsTitle")}
    >
      <div className="card">
        <div className="card-body">
          {refunds.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noRefunds")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("orderId")}</th>
                    <th className="fs-13">{t("amount")}</th>
                    <th className="fs-13">{t("reason")}</th>
                    <th className="fs-13">{t("status")}</th>
                    <th className="fs-13">{t("requested")}</th>
                    <th className="fs-13">{t("processed")}</th>
                  </tr>
                </thead>
                <tbody>
                  {refunds.map((refund) => (
                    <tr key={refund.refundId}>
                      <td className="fs-14 fw-medium">{refund.orderId}</td>
                      <td className="fs-14 fw-semibold">
                        {formatMoney(refund.amount, refund.currency, locale)}
                      </td>
                      <td className="fs-14 text-gray-6">{refund.reason}</td>
                      <td>
                        <span className="badge badge-soft-warning rounded-pill">
                          {refund.status}
                        </span>
                      </td>
                      <td className="fs-14 text-gray-6">
                        {formatIsoInstant(refund.requestedAt, locale, { dateStyle: "medium" })}
                      </td>
                      <td className="fs-14 text-gray-6">
                        {refund.processedAt
                          ? formatIsoInstant(refund.processedAt, locale, { dateStyle: "medium" })
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </FinancePageShell>
  );
}
