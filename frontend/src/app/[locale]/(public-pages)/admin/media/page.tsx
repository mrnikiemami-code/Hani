import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type {
  MediaFolder,
  MediaListResponse
} from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { MediaManager } from "@/features/home-experience/ui/MediaManager";

const PAGE_SIZE = 12;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminMediaPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; folderId?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const folderId =
    typeof sp.folderId === "string" &&
    /^[0-9a-f-]{36}$/i.test(sp.folderId)
      ? sp.folderId
      : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (folderId) query.set("folderId", folderId);

  const [result, folderResult] = await Promise.all([
    sessionGet<MediaListResponse>(`/internal/v1/content-media?${query}`),
    sessionGet<MediaFolder[]>("/internal/v1/content-media/folders")
  ]);

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navMedia")}
        activeSection="content"
        activeChild="media"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{t("accessHint")}</div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("navMedia")}
        activeSection="content"
        activeChild="media"
    >
      <MediaManager
        key={`${q}-${folderId}-${page}`}
        locale={locale}
        initialItems={result.data?.items ?? []}
        initialTotal={result.data?.total ?? 0}
        page={result.data?.page ?? page}
        pageSize={PAGE_SIZE}
        folders={folderResult.data ?? []}
        filters={{ q, folderId }}
      />
    </AdminPageShell>
  );
}
