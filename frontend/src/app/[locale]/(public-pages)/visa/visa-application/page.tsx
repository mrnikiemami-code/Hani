import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { searchVisas } from "@/features/visa/infrastructure/visa-api";
import { getVisaBySlug } from "@/features/visa/infrastructure/visa-detail-api";
import { VisaApplicationForm } from "@/features/visa/ui/VisaApplicationForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visaApplication" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function VisaApplicationPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ slug?: string; error?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const visaItems = await searchVisas(locale);
  const slug = query.slug ?? visaItems[0]?.slug;
  if (!slug) notFound();
  const visa = await getVisaBySlug(locale, slug);
  if (!visa) notFound();

  return (
    <div className="content">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-xl-9">
            <VisaApplicationForm
              locale={locale}
              visa={visa}
              error={query.error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
