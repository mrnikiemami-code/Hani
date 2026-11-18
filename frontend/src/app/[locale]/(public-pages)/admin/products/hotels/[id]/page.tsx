import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminHotelDetail } from "@/features/home-experience/domain/admin-hotel-detail";
import type { MediaListResponse } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { HotelEditor } from "@/features/home-experience/ui/HotelEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminHotelEditor" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminHotelEditPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminHotelEditor" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const [hotel, media] = await Promise.all([
    sessionGet<AdminHotelDetail>(`/internal/v1/admin/catalog/hotels/${id}`),
    sessionGet<MediaListResponse>(
      "/internal/v1/content-media?page=1&pageSize=100"
    )
  ]);

  if (hotel.status === 401 || hotel.status === 403) {
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

  if (hotel.status === 404 || !hotel.data) {
    notFound();
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="products"
      activeChild="hotels"
    >
      <HotelEditor
        initial={hotel.data}
        mediaAssets={media.data?.items ?? []}
      />
    </AdminPageShell>
  );
}
