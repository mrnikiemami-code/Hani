import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import { getMySupportTicket } from "@/features/dashboard/infrastructure/support-api";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";
import { CustomerSupportReplyForm } from "@/features/dashboard/ui/CustomerSupportReplyForm";
import { CustomerDisputeForm } from "@/features/dashboard/ui/CustomerDisputeForm";
import { SupportAutoRefresh } from "@/components/hani/SupportAutoRefresh";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "supportCenter" });
  return { title: t("detailTitle"), robots: { index: false, follow: false } };
}

export default async function CustomerSupportDetailPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "supportCenter" });
  const result = await getMySupportTicket(id);
  if (result.status === 401 || result.status === 403) {
    redirect(`/${locale}/login`);
  }
  if (result.status === 404 || !result.data) notFound();
  const ticket = result.data;

  return (
    <FinancePageShell
      title={`${t("detailTitle")} ${ticket.ticketNumber}`}
      subtitle={ticket.subject}
      active={t("title")}
    >
      <SupportAutoRefresh />
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <Link href="/user/support" className="btn btn-light btn-sm">
          {t("back")}
        </Link>
        <CustomerDisputeForm ticketId={ticket.id} />
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h5 className="mb-1">{ticket.subject}</h5>
            <span className="fs-13 text-gray-6">
              {ticket.ticketNumber} · {ticket.category}
            </span>
          </div>
          <span className="badge badge-soft-info rounded-pill">
            {t(`status${ticket.status}`)}
          </span>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <span className="fs-12 text-gray-6 d-block">{t("priority")}</span>
              <strong className="fs-14">{t(`priority${ticket.priority}`)}</strong>
            </div>
            <div className="col-md-4">
              <span className="fs-12 text-gray-6 d-block">{t("createdAt")}</span>
              <strong className="fs-14">
                {formatIsoInstant(ticket.createdAt, locale, {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </strong>
            </div>
            <div className="col-md-4">
              <span className="fs-12 text-gray-6 d-block">{t("lastMessage")}</span>
              <strong className="fs-14">
                {formatIsoInstant(ticket.lastMessageAt, locale, {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </strong>
            </div>
            <div className="col-md-4">
              <span className="fs-12 text-gray-6 d-block">
                {t("supportLastRead")}
              </span>
              <strong className="fs-14">
                {ticket.supportLastReadAt
                  ? formatIsoInstant(ticket.supportLastReadAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })
                  : t("notReadYet")}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">{t("thread")}</h5>
        </div>
        <div className="card-body">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={`border rounded p-3 mb-3 ${
                message.authorType === "Admin" ? "bg-light" : "bg-white"
              }`}
            >
              <div className="d-flex justify-content-between gap-2 mb-2">
                <strong className="fs-14">
                  {t(`author${message.authorType}`)}
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
                            src={`/api/support/attachments/${attachment.id}/thumbnail`}
                            alt={attachment.fileName}
                            width={56}
                            height={56}
                            className="rounded object-fit-cover"
                          />
                        )}
                      <a
                        href={`/api/support/attachments/${attachment.id}`}
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

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">{t("disputes")}</h5>
        </div>
        <div className="card-body">
          {ticket.disputes.length === 0 && (
            <p className="fs-14 text-gray-6 mb-0">{t("noDisputes")}</p>
          )}
          {ticket.disputes.map((dispute) => (
            <div className="border rounded p-3 mb-3" key={dispute.id}>
              <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                <strong className="fs-14">
                  {t(`disputeType${dispute.type}`)} ·{" "}
                  {t(`disputeStatus${dispute.status}`)}
                </strong>
                {dispute.amount != null && dispute.currency && (
                  <span className="fs-13 text-gray-6">
                    {formatMoney(dispute.amount, dispute.currency, locale)}
                  </span>
                )}
              </div>
              <p className="fs-14 mb-2 text-break">{dispute.description}</p>
              {dispute.evidenceUrl && (
                <a
                  href={dispute.evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-primary fs-13 d-inline-block mb-2"
                >
                  {t("evidence")}
                </a>
              )}
              {dispute.resolution && (
                <div className="alert alert-light py-2 mb-0">
                  <span className="fs-12 text-gray-6 d-block">
                    {t("resolution")}
                  </span>
                  <span className="fs-14 text-break">{dispute.resolution}</span>
                </div>
              )}
              <span className="fs-12 text-gray-6 d-block mt-2">
                {formatIsoInstant(dispute.openedAt, locale, {
                  dateStyle: "medium"
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <CustomerSupportReplyForm id={ticket.id} />
    </FinancePageShell>
  );
}
