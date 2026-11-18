import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type {
  AdminApiClient,
  AdminChannelAgency
} from "@/features/home-experience/domain/admin-channel";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { ChannelClientManager } from "@/features/home-experience/ui/ChannelClientManager";
import { ChannelSettingsManager } from "@/features/home-experience/ui/ChannelSettingsManager";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminChannel" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminChannelPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminChannel" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const [clientsResult, agenciesResult] = await Promise.all([
    sessionGet<AdminApiClient[]>("/internal/v1/admin/channel/clients"),
    sessionGet<AdminChannelAgency[]>("/internal/v1/admin/channel/agencies")
  ]);

  if (clientsResult.status === 401 || clientsResult.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="integrations"
        activeChild="channel"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const clients = clientsResult.data ?? [];
  const agencies = agenciesResult.data ?? [];

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="integrations"
      activeChild="channel"
    >
      <ChannelClientManager
        clients={clients}
        agencies={agencies}
        locale={locale}
      />
      <div className="mt-4">
        <ChannelSettingsManager agencies={agencies} locale={locale} />
      </div>
    </AdminPageShell>
  );
}
