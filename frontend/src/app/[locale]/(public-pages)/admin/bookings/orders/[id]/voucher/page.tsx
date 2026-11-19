import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { AdminOrderVoucher } from "@/features/home-experience/domain/admin-order-extras";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { PrintButton } from "@/features/home-experience/ui/PrintButton";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  return { title: t("voucher"), robots: { index: false, follow: false } };
}

export default async function AdminOrderVoucherPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminOrderVoucher>(
    `/internal/v1/admin/bookings/orders/${id}/voucher`
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
  const voucher = result.data;

  return (
    <AdminPageShell
      locale={locale}
      title={t("voucher")}
      subtitle={t("voucherHint")}
      active={t("voucher")}
      activeSection="bookings"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h2 className="h5 mb-1" dir="ltr">
              {voucher.voucherNumber}
            </h2>
            <p className="fs-13 text-gray-6 mb-0">
              {voucher.orderNumber} · {voucher.orderStatus} · {voucher.paymentStatus}
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link
              href={`/admin/bookings/orders/${voucher.orderId}`}
              className="btn btn-light btn-sm"
            >
              {t("back")}
            </Link>
            <Link
              href={`/admin/bookings/orders/${voucher.orderId}/contract`}
              className="btn btn-light btn-sm"
            >
              {t("contract")}
            </Link>
            <PrintButton />
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {[
              [t("issuedAt"), formatIsoInstant(voucher.issuedAt, locale, { dateStyle: "medium" })],
              [t("due"), formatIsoInstant(voucher.paymentDueAt, locale, { dateStyle: "medium" })],
              [t("contract"), voucher.contractNumber],
              [t("agency"), voucher.agencyId],
              [t("departure"), voucher.departureId],
              [t("room"), voucher.roomType],
              [t("pax"), `${voucher.adults} / ${voucher.children} / ${voucher.infants}`],
              [t("contactEmail"), voucher.contactEmail],
              [t("contactPhone"), voucher.contactPhone ?? "—"],
              [t("total"), formatMoney(voucher.total, voucher.currency, locale)]
            ].map(([label, value]) => (
              <div className="col-md-4" key={label}>
                <span className="fs-12 text-gray-6 d-block">{label}</span>
                <strong className="fs-14 text-break" dir="auto">
                  {value}
                </strong>
              </div>
            ))}
          </div>
          {voucher.cancelledAt && (
            <div className="alert alert-warning mt-3 mb-0">
              {t("cancelled")}: {voucher.cancellationReason}
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
              {voucher.travelers.map((traveler) => (
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
          <h2 className="h5 mb-0">{t("services")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("description")}</th>
                <th>{t("quantity")}</th>
                <th>{t("amount")}</th>
              </tr>
            </thead>
            <tbody>
              {voucher.lines.map((line) => (
                <tr key={line.lineId}>
                  <td className="text-break">{line.description}</td>
                  <td>{line.quantity}</td>
                  <td>{formatMoney(line.total, line.currency, locale)}</td>
                </tr>
              ))}
              {voucher.lines.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-6 py-4">
                    {formatMoney(voucher.total, voucher.currency, locale)}
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
