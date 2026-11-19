import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type {
  SupportDisputePage,
  SupportTicketDetail
} from "@/features/home-experience/domain/admin-support";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { SupportReplyForm } from "@/features/home-experience/ui/SupportReplyForm";
import { SupportTicketControls } from "@/features/home-experience/ui/SupportTicketControls";
import { SupportDisputePanel } from "@/features/home-experience/ui/SupportDisputePanel";
import { SupportAutoRefresh } from "@/components/hani/SupportAutoRefresh";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  return { title: t("detailTitle"), robots: { index: false, follow: false } };
}

export default async function AdminSupportTicketPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const [result, disputesResult, usersResult] = await Promise.all([
    sessionGet<SupportTicketDetail>(
      `/internal/v1/admin/support/tickets/${id}`
    ),
    sessionGet<SupportDisputePage>(
      `/internal/v1/admin/support/disputes?ticketId=${id}&page=1&pageSize=100`
    ),
    sessionGet<{
      items: {
        id: string;
        mobile: string;
        username: string;
        firstName: string;
        lastName: string;
        role: string;
        status: string;
      }[];
    }>("/internal/v1/admin/users?page=1&pageSize=100")
  ]);

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="support"
        activeChild="tickets"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  if (result.status === 404 || !result.data) notFound();
  const ticket = result.data;
  const disputes = disputesResult.data?.items ?? [];
  const assignees = (usersResult.data?.items ?? [])
    .filter((user) => user.role !== "Customer" && user.status === "Active")
    .map((user) => ({
      id: user.id,
      label:
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        user.mobile
    }));

  return (
    <AdminPageShell
      locale={locale}
      title={`${t("detailTitle")} ${ticket.ticketNumber}`}
      subtitle={ticket.subject}
      active={t("detailTitle")}
      activeSection="support"
      activeChild="tickets"
    >
      <SupportAutoRefresh ticketId={ticket.id} includeInternal />
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h2 className="h5 mb-1">{ticket.subject}</h2>
            <p className="fs-13 text-gray-6 mb-0">
              {ticket.ticketNumber} · {ticket.category} · {ticket.priority}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link href="/admin/support/tickets" className="btn btn-light btn-sm">
              {t("back")}
            </Link>
            <SupportTicketControls
              id={ticket.id}
              status={ticket.status}
              priority={ticket.priority}
              assignedTo={ticket.assignedTo}
              assignees={assignees}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              [t("contactName"), ticket.contactName],
              [t("contactEmail"), ticket.contactEmail],
              [t("contactPhone"), ticket.contactPhone ?? "—"],
              [t("status"), ticket.status],
              [t("priority"), ticket.priority],
              [t("assignedTo"), ticket.assignedToName ?? t("unassigned")],
              [t("sla"), t(`sla${ticket.slaState}`)],
              [
                t("slaDueAt"),
                formatIsoInstant(ticket.slaDueAt, locale, {
                  dateStyle: "medium",
                  timeStyle: "short"
                })
              ],
              [
                t("firstResponseAt"),
                ticket.firstResponseAt
                  ? formatIsoInstant(ticket.firstResponseAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })
                  : t("notResponded")
              ],
              [
                t("customerLastRead"),
                ticket.customerLastReadAt
                  ? formatIsoInstant(ticket.customerLastReadAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })
                  : t("notReadYet")
              ],
              [
                t("createdAt"),
                formatIsoInstant(ticket.createdAt, locale, {
                  dateStyle: "medium",
                  timeStyle: "short"
                })
              ]
            ].map(([label, value]) => (
              <div className="col-md-4" key={label}>
                <span className="fs-12 text-gray-6 d-block">{label}</span>
                <strong className="fs-14" dir="auto">
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("thread")}</h2>
        </div>
        <div className="card-body">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={`border rounded p-3 mb-3 ${
                message.isInternal ? "bg-warning-subtle" : "bg-white"
              }`}
            >
              <div className="d-flex justify-content-between gap-2 mb-2">
                <strong className="fs-14">
                  {message.authorType}
                  {message.isInternal ? ` · ${t("internalNote")}` : ""}
                </strong>
                <span className="fs-12 text-gray-6">
                  {formatIsoInstant(message.createdAt, locale, {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </span>
              </div>
              <p className="mb-0 fs-14 text-break">{message.body}</p>
              {message.attachments.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {message.attachments.map((attachment) => (
                    <div key={attachment.id} className="d-flex align-items-center gap-2">
                      {attachment.hasThumbnail &&
                        attachment.contentType.startsWith("image/") && (
                          <img
                            src={`/api/admin/support/attachments/${attachment.id}/thumbnail`}
                            alt={attachment.fileName}
                            width={56}
                            height={56}
                            className="rounded object-fit-cover"
                          />
                        )}
                      <a
                        href={`/api/admin/support/attachments/${attachment.id}`}
                        className="btn btn-sm btn-light"
                        download
                      >
                        <i className="isax isax-document-download me-1" />
                        {attachment.fileName}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SupportDisputePanel ticketId={ticket.id} disputes={disputes} />

      <SupportReplyForm id={ticket.id} />
    </AdminPageShell>
  );
}
