import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type {
  PagedPending,
  PendingMedia,
  PendingReview
} from "@/features/home-experience/domain/admin-moderation";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { ModerationManager } from "@/features/home-experience/ui/ModerationManager";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminModeration" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminModerationPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminModeration" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const [reviews, media] = await Promise.all([
    sessionGet<PagedPending<PendingReview>>(
      "/internal/v1/reviews?page=1&pageSize=20"
    ),
    sessionGet<PagedPending<PendingMedia>>(
      "/internal/v1/media?status=Pending&page=1&pageSize=20"
    )
  ]);

  if (reviews.status === 401 || reviews.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="content"
        activeChild="moderation"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="content"
      activeChild="moderation"
    >
      <ModerationManager
        locale={locale}
        reviews={reviews.data ?? { items: [], totalCount: 0 }}
        media={media.data ?? { items: [], totalCount: 0 }}
      />
    </AdminPageShell>
  );
}
