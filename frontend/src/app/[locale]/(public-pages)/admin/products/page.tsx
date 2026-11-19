import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminHotelListResponse } from "@/features/home-experience/domain/admin-hotel";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminProducts" });
  return { title: t("overviewTitle"), robots: { index: false, follow: false } };
}

export default async function AdminProductsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminProducts" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const hotels = await sessionGet<AdminHotelListResponse>(
    `/internal/v1/admin/catalog/hotels?page=1&pageSize=1&locale=${encodeURIComponent(locale)}`
  );

  if (hotels.status === 401 || hotels.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="products"
        activeChild="productsOverview"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const cards = [
    {
      href: "/admin/products/hotels",
      title: t("hotelsTitle"),
      hint: t("hotelsHint"),
      count: hotels.data?.total ?? 0,
      icon: "isax isax-buildings-2",
      live: true
    },
    {
      href: "/admin/products/tours",
      title: t("tours"),
      hint: t("toursHint"),
      count: null,
      icon: "isax isax-map",
      live: true
    },
    {
      href: "/admin/products/flights",
      title: t("flights"),
      hint: t("flightsHint"),
      count: null,
      icon: "isax isax-airplane",
      live: true
    },
    {
      href: "/admin/products/visas",
      title: t("visas"),
      hint: t("visasHint"),
      count: null,
      icon: "isax isax-passport",
      live: true
    }
  ];

  return (
    <AdminPageShell
      locale={locale}
      title={t("overviewTitle")}
      subtitle={t("overviewSubtitle")}
      active={t("overviewTitle")}
      activeSection="products"
      activeChild="productsOverview"
    >
      <div className="row g-4">
        {cards.map((card) => {
          const content = (
            <>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="avatar avatar-lg bg-primary-transparent text-primary rounded-circle">
                  <i className={`${card.icon} fs-20`} />
                </span>
                <span
                  className={`badge rounded-pill ${
                    card.live ? "badge-success" : "badge-secondary"
                  }`}
                >
                  {card.live ? t("live") : t("soon")}
                </span>
              </div>
              <h3 className="h5 mb-1">{card.title}</h3>
              <p className="fs-13 text-gray-6 mb-2">{card.hint}</p>
              {card.count !== null && (
                <span className="fs-13 text-gray-5">
                  {t("count", { count: card.count })}
                </span>
              )}
            </>
          );

          return (
            <div className="col-xl-3 col-md-6" key={card.title}>
              {card.href ? (
                <Link
                  href={card.href}
                  className="card border-0 shadow-sm h-100 text-decoration-none"
                >
                  <div className="card-body">{content}</div>
                </Link>
              ) : (
                <div className="card border-0 shadow-sm h-100 opacity-75">
                  <div className="card-body">{content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AdminPageShell>
  );
}
