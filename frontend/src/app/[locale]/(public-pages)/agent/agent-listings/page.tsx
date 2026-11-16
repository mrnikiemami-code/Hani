import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatMoney } from "@/lib/hani/money";
import { getMyAgencyListings } from "@/features/dashboard/infrastructure/agency-api";
import { AgentPageShell } from "@/features/dashboard/ui/AgentPageShell";

export const dynamic = "force-dynamic";

export default async function AgentListingsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "agency" });
  const listings = await getMyAgencyListings();

  return (
    <AgentPageShell
      title={t("listingsTitle")}
      subtitle={t("listingsSubtitle")}
      active={t("listingsTitle")}
    >
      <div className="card">
        <div className="card-body">
          {listings.length === 0 ? (
            <p className="text-gray-5 mb-0">{t("noListings")}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fs-13">{t("offer")}</th>
                    <th className="fs-13">{t("product")}</th>
                    <th className="fs-13">{t("basePrice")}</th>
                    <th className="fs-13">{t("departures")}</th>
                    <th className="fs-13">{t("status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.offerId}>
                      <td className="fs-14 fw-medium">{listing.title}</td>
                      <td className="fs-14 text-gray-6">{listing.tourProductId}</td>
                      <td className="fs-14 fw-semibold">
                        {formatMoney(listing.basePrice, listing.currency, locale)}
                      </td>
                      <td className="fs-14 text-gray-6">
                        {listing.departures.length}
                      </td>
                      <td>
                        <span className="badge badge-soft-info rounded-pill">
                          {listing.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AgentPageShell>
  );
}
