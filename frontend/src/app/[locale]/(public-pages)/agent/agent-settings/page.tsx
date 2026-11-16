import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMyAgency } from "@/features/dashboard/infrastructure/agency-api";
import { AgentPageShell } from "@/features/dashboard/ui/AgentPageShell";

export const dynamic = "force-dynamic";

export default async function AgentSettingsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "agency" });
  const agency = await getMyAgency();

  return (
    <AgentPageShell
      title={t("settingsTitle")}
      subtitle={t("settingsSubtitle")}
      active={t("settingsTitle")}
    >
      <div className="card">
        <div className="card-body">
          {agency ? (
            <table className="table table-borderless align-middle mb-0">
              <tbody>
                <tr>
                  <th className="fs-14 text-gray-6">{t("name")}</th>
                  <td className="fs-14">{agency.name}</td>
                </tr>
                <tr>
                  <th className="fs-14 text-gray-6">{t("licenseNo")}</th>
                  <td className="fs-14">{agency.licenseNo}</td>
                </tr>
                <tr>
                  <th className="fs-14 text-gray-6">{t("city")}</th>
                  <td className="fs-14">{agency.city}</td>
                </tr>
                <tr>
                  <th className="fs-14 text-gray-6">{t("website")}</th>
                  <td className="fs-14">{agency.website ?? "-"}</td>
                </tr>
                <tr>
                  <th className="fs-14 text-gray-6">{t("contactEmail")}</th>
                  <td className="fs-14">{agency.contactEmail ?? "-"}</td>
                </tr>
                <tr>
                  <th className="fs-14 text-gray-6">{t("contactPhone")}</th>
                  <td className="fs-14">{agency.contactPhone ?? "-"}</td>
                </tr>
                <tr>
                  <th className="fs-14 text-gray-6">{t("managerName")}</th>
                  <td className="fs-14">{agency.managerName ?? "-"}</td>
                </tr>
                <tr>
                  <th className="fs-14 text-gray-6">{t("status")}</th>
                  <td className="fs-14">{agency.status}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-5">{t("notReady")}</p>
              <Link className="btn btn-primary btn-sm" href={`/${locale}/requests/agency/general-info`}>
                {t("onboarding")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </AgentPageShell>
  );
}
