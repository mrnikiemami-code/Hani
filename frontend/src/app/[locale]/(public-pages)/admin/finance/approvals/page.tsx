import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { AdminApproval } from "@/features/home-experience/domain/admin-bookings";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { ApprovalActions } from "@/features/home-experience/ui/ApprovalActions";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminFinance" });
  return { title: t("approvalTitle"), robots: { index: false, follow: false } };
}

export default async function AdminApprovalsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminFinance" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminApproval[]>(
    "/internal/v1/admin/approvals?status=Pending"
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="finance"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const approvals = result.data ?? [];

  return (
    <AdminPageShell
      locale={locale}
      title={t("approvalTitle")}
      subtitle={t("approvalHint")}
      active={t("approvalTitle")}
      activeSection="finance"
      activeChild="approvals"
    >
      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h2 className="h5 mb-0">{t("pendingApprovals")}</h2>
          <Link href="/admin/finance" className="btn btn-light btn-sm">
            {t("backToFinance")}
          </Link>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("type")}</th>
                <th>{t("entity")}</th>
                <th>{t("amount")}</th>
                <th>{t("requestedBy")}</th>
                <th>{t("requestedAt")}</th>
                <th>{t("bankReference")}</th>
                <th>{t("settlementDocument")}</th>
                <th>{t("reason")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((approval) => (
                <tr key={approval.id}>
                  <td>{approval.type}</td>
                  <td dir="ltr">{approval.entityId}</td>
                  <td>{formatMoney(approval.amount, approval.currency, locale)}</td>
                  <td dir="ltr">
                    {approval.requestedByMobile || approval.requestedBy}
                  </td>
                  <td className="text-nowrap">
                    {formatIsoInstant(approval.requestedAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </td>
                  <td dir="ltr">{approval.bankReference ?? "—"}</td>
                  <td>
                    {approval.documentUrl ? (
                      <a
                        href={approval.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-primary"
                      >
                        {t("viewDocument")}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="text-truncate" title={approval.requestedReason}>
                    {approval.requestedReason}
                  </td>
                  <td className="text-end">
                    <ApprovalActions approvalId={approval.id} />
                  </td>
                </tr>
              ))}
              {approvals.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-gray-6 py-4">
                    {t("noPendingApprovals")}
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
