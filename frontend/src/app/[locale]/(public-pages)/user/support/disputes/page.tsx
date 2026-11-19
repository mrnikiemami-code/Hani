import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import { getMySupportDisputes } from "@/features/dashboard/infrastructure/support-api";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";

export const dynamic = "force-dynamic";

const STATUSES = ["Open", "Investigating", "AwaitingCustomer", "Resolved", "Rejected"];

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "supportCenter" });
  return { title: t("disputes"), robots: { index: false, follow: false } };
}

export default async function CustomerDisputesPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "supportCenter" });
  const status = STATUSES.includes(sp.status ?? "") ? sp.status! : "";
  const result = await getMySupportDisputes(status || undefined);
  if (result.status === 401 || result.status === 403) {
    redirect(`/${locale}/login`);
  }

  const data = result.data ?? {
    items: [],
    page: 1,
    pageSize: 50,
    total: 0
  };

  return (
    <FinancePageShell
      title={t("disputes")}
      subtitle={t("disputesSubtitle")}
      active={t("title")}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div className="d-flex flex-wrap gap-2">
          <Link
            href="/user/support/disputes"
            className={`btn btn-sm ${!status ? "btn-primary" : "btn-light"}`}
          >
            {t("allStatuses")}
          </Link>
          {STATUSES.map((item) => (
            <Link
              key={item}
              href={`/user/support/disputes?status=${item}`}
              className={`btn btn-sm ${
                status === item ? "btn-primary" : "btn-light"
              }`}
            >
              {t(`disputeStatus${item}`)}
            </Link>
          ))}
        </div>
        <Link href="/user/support" className="btn btn-light btn-sm">
          {t("backToTickets")}
        </Link>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{t("disputes")}</h5>
          <span className="fs-13 text-gray-6">
            {t("total", { count: data.total })}
          </span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="fs-13">{t("ticketNumber")}</th>
                  <th className="fs-13">{t("disputeType")}</th>
                  <th className="fs-13">{t("status")}</th>
                  <th className="fs-13 d-none d-md-table-cell">{t("amount")}</th>
                  <th className="fs-13 d-none d-md-table-cell">{t("openedAt")}</th>
                  <th className="fs-13 text-end">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((dispute) => (
                  <tr key={dispute.id}>
                    <td dir="ltr" className="fs-14">
                      {dispute.ticketNumber}
                    </td>
                    <td className="fs-14">{t(`disputeType${dispute.type}`)}</td>
                    <td>
                      <span className="badge badge-soft-info rounded-pill">
                        {t(`disputeStatus${dispute.status}`)}
                      </span>
                    </td>
                    <td className="fs-14 d-none d-md-table-cell">
                      {dispute.amount != null && dispute.currency
                        ? formatMoney(dispute.amount, dispute.currency, locale)
                        : "—"}
                    </td>
                    <td className="fs-13 text-gray-6 d-none d-md-table-cell">
                      {formatIsoInstant(dispute.openedAt, locale, {
                        dateStyle: "medium"
                      })}
                    </td>
                    <td className="text-end">
                      <Link
                        href={`/user/support/${dispute.ticketId}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        {t("open")}
                      </Link>
                    </td>
                  </tr>
                ))}
                {data.items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-5 py-4">
                      {t("noDisputes")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </FinancePageShell>
  );
}
