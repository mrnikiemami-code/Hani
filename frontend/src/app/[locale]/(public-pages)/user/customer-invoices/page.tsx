import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyInvoices } from "@/features/dashboard/infrastructure/finance-api";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";

export const dynamic = "force-dynamic";

export default async function CustomerInvoicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "finance" });
  const invoices = await getMyInvoices();

  return (
    <FinancePageShell
      title={t("invoicesTitle")}
      subtitle={t("invoicesSubtitle")}
      active={t("invoicesTitle")}
    >
      <div className="card">
        <div className="card-body">
          {invoices.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noInvoices")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("invoiceNumber")}</th>
                    <th className="fs-13">{t("orderId")}</th>
                    <th className="fs-13">{t("subtotal")}</th>
                    <th className="fs-13">{t("tax")}</th>
                    <th className="fs-13">{t("total")}</th>
                    <th className="fs-13">{t("status")}</th>
                    <th className="fs-13">{t("date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.invoiceId}>
                      <td className="fs-14 fw-medium">{invoice.invoiceNumber}</td>
                      <td className="fs-14 text-gray-6">{invoice.orderId}</td>
                      <td className="fs-14">
                        {formatMoney(invoice.subtotal, invoice.currency, locale)}
                      </td>
                      <td className="fs-14">
                        {formatMoney(invoice.tax, invoice.currency, locale)}
                      </td>
                      <td className="fs-14 fw-semibold">
                        {formatMoney(invoice.total, invoice.currency, locale)}
                      </td>
                      <td>
                        <span className="badge badge-soft-info rounded-pill">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="fs-14 text-gray-6">
                        {new Date(invoice.issuedAt).toLocaleDateString(locale)}
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
