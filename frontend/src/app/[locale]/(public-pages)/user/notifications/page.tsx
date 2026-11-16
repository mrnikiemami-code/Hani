import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMyMessages } from "@/features/dashboard/infrastructure/notifications-api";
import { markMessageReadAction } from "@/features/dashboard/application/mark-message-read";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";

export const dynamic = "force-dynamic";

export default async function NotificationsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "notifications" });
  const messages = await getMyMessages();

  return (
    <FinancePageShell
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
    >
      <div className="card">
        <div className="card-body">
          {messages.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noMessages")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("subject")}</th>
                    <th className="fs-13">{t("body")}</th>
                    <th className="fs-13">{t("status")}</th>
                    <th className="fs-13">{t("date")}</th>
                    <th className="fs-13" />
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.messageId}>
                      <td className="fs-14 fw-medium">{message.subject}</td>
                      <td className="fs-14 text-gray-6">{message.body}</td>
                      <td>
                        <span className="badge badge-soft-info rounded-pill">
                          {message.status}
                        </span>
                      </td>
                      <td className="fs-14 text-gray-6">
                        {new Date(message.createdAt).toLocaleDateString(locale)}
                      </td>
                      <td className="text-end">
                        <form action={markMessageReadAction}>
                          <input type="hidden" name="locale" value={locale} />
                          <input type="hidden" name="messageId" value={message.messageId} />
                          <button className="btn btn-sm btn-outline-primary" type="submit">
                            {t("markRead")}
                          </button>
                        </form>
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
