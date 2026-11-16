import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyPayments } from "@/features/dashboard/infrastructure/finance-api";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";
import { formatIsoInstant } from "@/lib/hani/calendar";

export const dynamic = "force-dynamic";

export default async function PaymentPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "finance" });
  const payments = await getMyPayments();

  return (
    <FinancePageShell
      title={t("paymentsTitle")}
      subtitle={t("paymentsSubtitle")}
      active={t("paymentsTitle")}
    >
      <div className="card">
        <div className="card-body">
          {payments.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noPayments")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("paymentId")}</th>
                    <th className="fs-13">{t("orderId")}</th>
                    <th className="fs-13">{t("amount")}</th>
                    <th className="fs-13">{t("provider")}</th>
                    <th className="fs-13">{t("status")}</th>
                    <th className="fs-13">{t("date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.paymentIntentId}>
                      <td className="fs-14 fw-medium">{payment.paymentIntentId}</td>
                      <td className="fs-14 text-gray-6">{payment.orderId}</td>
                      <td className="fs-14 fw-semibold">
                        {formatMoney(payment.amount, payment.currency, locale)}
                      </td>
                      <td className="fs-14">{payment.provider}</td>
                      <td>
                        <span className="badge badge-soft-info rounded-pill">
                          {payment.status}
                        </span>
                      </td>
                      <td className="fs-14 text-gray-6">
                        {formatIsoInstant(payment.createdAt, locale, { dateStyle: "medium" })}
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
