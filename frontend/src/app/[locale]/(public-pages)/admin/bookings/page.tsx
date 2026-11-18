import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { AdminBookings } from "@/features/home-experience/domain/admin-bookings";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminBookingsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminBookings" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const result = await sessionGet<AdminBookings>(
    `/internal/v1/admin/bookings?page=1&pageSize=20${q ? `&q=${encodeURIComponent(q)}` : ""}`
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
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const data = result.data ?? {
    orderCount: 0,
    requestCount: 0,
    inquiryCount: 0,
    orders: [],
    requests: [],
    inquiries: []
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="bookings"
    >
      <div className="row g-3 mb-4">
        {[
          [t("orders"), data.orderCount],
          [t("requests"), data.requestCount],
          [t("inquiries"), data.inquiryCount]
        ].map(([label, count]) => (
          <div className="col-md-4" key={String(label)}>
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="fs-13 text-gray-6 mb-1">{label}</p>
                <h3 className="mb-0">{count}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form className="card border-0 shadow-sm mb-4" method="get">
        <div className="card-body d-flex flex-wrap gap-2">
          <input
            className="form-control"
            name="q"
            defaultValue={q}
            placeholder={t("searchPlaceholder")}
          />
          <button className="btn btn-primary" type="submit">
            {t("search")}
          </button>
        </div>
      </form>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("orders")}</h2>
          <span className="badge badge-success">{data.orderCount}</span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("number")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-md-table-cell">{t("payment")}</th>
                <th className="d-none d-sm-table-cell">{t("amount")}</th>
                <th className="d-none d-lg-table-cell">{t("contact")}</th>
                <th className="d-none d-lg-table-cell">{t("createdAt")}</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.id}>
                  <td dir="ltr">
                    <Link href={`/admin/bookings/orders/${order.id}`} className="link-primary">
                      {order.number}
                    </Link>
                  </td>
                  <td>{order.status}</td>
                  <td className="d-none d-md-table-cell">{order.paymentStatus}</td>
                  <td className="d-none d-sm-table-cell">
                    {formatMoney(order.total, order.currency, locale)}
                  </td>
                  <td className="d-none d-lg-table-cell">{order.contactEmail}</td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(order.createdAt, locale, { dateStyle: "medium" })}
                  </td>
                </tr>
              ))}
              {data.orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-6 py-4">{t("empty")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("requests")}</h2>
          <span className="badge badge-warning">{data.requestCount}</span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("number")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-sm-table-cell">{t("amount")}</th>
                <th className="d-none d-lg-table-cell">{t("contact")}</th>
                <th className="d-none d-lg-table-cell">{t("createdAt")}</th>
                <th className="d-none d-md-table-cell">{t("due")}</th>
              </tr>
            </thead>
            <tbody>
              {data.requests.map((request) => (
                <tr key={request.id}>
                  <td dir="ltr">{request.number}</td>
                  <td>{request.status}</td>
                  <td className="d-none d-sm-table-cell">
                    {formatMoney(request.total, request.currency, locale)}
                  </td>
                  <td className="d-none d-lg-table-cell">{request.contactEmail}</td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(request.createdAt, locale, { dateStyle: "medium" })}
                  </td>
                  <td className="d-none d-md-table-cell text-nowrap">
                    {formatIsoInstant(request.expiresAt, locale, { dateStyle: "medium" })}
                  </td>
                </tr>
              ))}
              {data.requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-6 py-4">{t("empty")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("inquiries")}</h2>
          <span className="badge badge-info">{data.inquiryCount}</span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("number")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-sm-table-cell">{t("stay")}</th>
                <th className="d-none d-md-table-cell">{t("rooms")}</th>
                <th className="d-none d-lg-table-cell">{t("contact")}</th>
                <th className="d-none d-lg-table-cell">{t("createdAt")}</th>
              </tr>
            </thead>
            <tbody>
              {data.inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td dir="ltr">{inquiry.number}</td>
                  <td>{inquiry.status}</td>
                  <td className="text-nowrap">
                    {formatIsoDate(inquiry.checkIn, locale, "short")} –{" "}
                    {formatIsoDate(inquiry.checkOut, locale, "short")}
                  </td>
                  <td className="d-none d-md-table-cell">{inquiry.rooms}</td>
                  <td className="d-none d-lg-table-cell">{inquiry.contactEmail}</td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(inquiry.createdAt, locale, { dateStyle: "medium" })}
                  </td>
                </tr>
              ))}
              {data.inquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-6 py-4">{t("empty")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageShell>
  );
}
