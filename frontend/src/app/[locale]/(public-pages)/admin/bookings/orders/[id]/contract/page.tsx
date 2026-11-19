import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { AdminOrderContract } from "@/features/home-experience/domain/admin-order-extras";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { PrintButton } from "@/features/home-experience/ui/PrintButton";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  return { title: t("contract"), robots: { index: false, follow: false } };
}

export default async function AdminOrderContractPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminOrderContract>(
    `/internal/v1/admin/bookings/orders/${id}/contract`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="bookings"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{tHome("accessHint")}</div>
        </div>
      </AdminPageShell>
    );
  }
  if (result.status === 404 || !result.data) notFound();
  const contract = result.data;

  return (
    <AdminPageShell
      locale={locale}
      title={t("contract")}
      subtitle={t("contractHint")}
      active={t("contract")}
      activeSection="bookings"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h2 className="h5 mb-1" dir="ltr">
              {contract.contractNumber}
            </h2>
            <p className="fs-13 text-gray-6 mb-0">
              {contract.orderNumber} · {contract.orderStatus}
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link
              href={`/admin/bookings/orders/${contract.orderId}`}
              className="btn btn-light btn-sm"
            >
              {t("back")}
            </Link>
            <Link
              href={`/admin/bookings/orders/${contract.orderId}/voucher`}
              className="btn btn-light btn-sm"
            >
              {t("voucher")}
            </Link>
            <PrintButton />
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              [t("issuedAt"), formatIsoInstant(contract.issuedAt, locale, { dateStyle: "medium" })],
              [t("agency"), contract.agencyId],
              [t("departure"), contract.departureId],
              [t("room"), contract.roomType],
              [t("pax"), `${contract.adults} / ${contract.children} / ${contract.infants}`],
              [t("seats"), String(contract.seats)],
              [t("contactEmail"), contract.contactEmail],
              [t("contactPhone"), contract.contactPhone ?? "—"],
              [t("total"), formatMoney(contract.total, contract.currency, locale)]
            ].map(([label, value]) => (
              <div className="col-md-4" key={label}>
                <span className="fs-12 text-gray-6 d-block">{label}</span>
                <strong className="fs-14 text-break" dir="auto">
                  {value}
                </strong>
              </div>
            ))}
          </div>
          {contract.cancelledAt && (
            <div className="alert alert-warning mt-3 mb-0">
              {t("cancelled")}: {contract.cancellationReason}
            </div>
          )}
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("travelers")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("name")}</th>
                <th>{t("type")}</th>
                <th>{t("birthDate")}</th>
              </tr>
            </thead>
            <tbody>
              {contract.travelers.map((traveler) => (
                <tr key={traveler.travelerId}>
                  <td>{traveler.fullName}</td>
                  <td>{traveler.type}</td>
                  <td>
                    {traveler.dateOfBirth
                      ? formatIsoDate(traveler.dateOfBirth, locale, "short")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("priceComponents")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("description")}</th>
                <th>{t("quantity")}</th>
                <th>{t("unitPrice")}</th>
                <th>{t("amount")}</th>
              </tr>
            </thead>
            <tbody>
              {contract.lines.map((line) => (
                <tr key={line.lineId}>
                  <td className="text-break">{line.description}</td>
                  <td>{line.quantity}</td>
                  <td>{formatMoney(line.unitPrice, line.currency, locale)}</td>
                  <td>{formatMoney(line.total, line.currency, locale)}</td>
                </tr>
              ))}
              {contract.lines.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-6 py-4">
                    {formatMoney(contract.total, contract.currency, locale)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageShell>
  );
}
