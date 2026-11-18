import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminHotelListResponse } from "@/features/home-experience/domain/admin-hotel";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { HotelCatalogManager } from "@/features/home-experience/ui/HotelCatalogManager";

const PAGE_SIZE = 20;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminProducts" });
  return { title: t("hotelsTitle"), robots: { index: false, follow: false } };
}

export default async function AdminHotelsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminProducts" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE),
    locale
  });
  if (q) query.set("q", q);
  const result = await sessionGet<AdminHotelListResponse>(
    `/internal/v1/admin/catalog/hotels?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="products"
        activeChild="hotels"
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
      title={t("hotelsTitle")}
      subtitle={t("hotelsSubtitle")}
      active={t("hotelsTitle")}
      activeSection="products"
      activeChild="hotels"
    >
      <HotelCatalogManager
        key={`${q}-${page}`}
        locale={locale}
        initial={
          result.data ?? {
            items: [],
            page,
            pageSize: PAGE_SIZE,
            total: 0
          }
        }
        q={q}
      />
    </AdminPageShell>
  );
}
