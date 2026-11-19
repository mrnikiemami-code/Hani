import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminHotelDetail } from "@/features/home-experience/domain/admin-hotel-detail";
import type { MediaListResponse } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { HotelEditor } from "@/features/home-experience/ui/HotelEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminHotelEditor" });
  return { title: t("createTitle"), robots: { index: false, follow: false } };
}

const emptyHotel: AdminHotelDetail = {
  hotelId: "",
  slug: "",
  destinationId: "",
  stars: 3,
  address: null,
  latitude: null,
  longitude: null,
  translations: [],
  amenities: [],
  images: [],
  rooms: [],
  propertyType: "Hotel",
  contactPhone: null,
  websiteUrl: null,
  checkInTime: null,
  checkOutTime: null,
  status: "Draft",
  seoTitle: null,
  seoDescription: null
};

export default async function AdminHotelCreatePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminHotelEditor" });
  const media = await sessionGet<MediaListResponse>(
    "/internal/v1/content-media?page=1&pageSize=100"
  );

  return (
    <AdminPageShell
      locale={locale}
      title={t("createTitle")}
      subtitle={t("createSubtitle")}
      active={t("createTitle")}
      activeSection="products"
      activeChild="hotels"
    >
      <HotelEditor
        mode="create"
        initial={emptyHotel}
        mediaAssets={media.data?.items ?? []}
      />
    </AdminPageShell>
  );
}
