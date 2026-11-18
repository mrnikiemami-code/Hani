import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type {
  ContentEntryListResponse,
  ContentEntryStatus,
  ContentEntryType
} from "@/features/home-experience/domain/content-entry";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { ContentManager } from "@/features/home-experience/ui/ContentManager";

const PAGE_SIZE = 10;
const TYPES: ContentEntryType[] = ["Page", "Banner", "Article", "Section"];
const STATUSES: ContentEntryStatus[] = [
  "Draft",
  "Published",
  "Scheduled",
  "Archived"
];

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminContent" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminContentPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    q?: string;
    type?: string;
    status?: string;
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminContent" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const type = TYPES.includes(sp.type as ContentEntryType)
    ? (sp.type as ContentEntryType)
    : "";
  const status = STATUSES.includes(sp.status as ContentEntryStatus)
    ? (sp.status as ContentEntryStatus)
    : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (type) query.set("type", type);
  if (status) query.set("status", status);

  const entries = await sessionGet<ContentEntryListResponse>(
    `/internal/v1/content-entries?${query}`
  );

  if (entries.status === 401 || entries.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navContent")}
        activeSection="content"
        activeChild="contentPages"
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
      active={t("navContent")}
        activeSection="content"
        activeChild="contentPages"
    >
      <ContentManager
        key={`${q}-${type}-${status}-${page}`}
        locale={locale}
        initialEntries={entries.data?.items ?? []}
        initialTotal={entries.data?.total ?? 0}
        page={entries.data?.page ?? page}
        pageSize={PAGE_SIZE}
        filters={{ q, type, status }}
      />
    </AdminPageShell>
  );
}
