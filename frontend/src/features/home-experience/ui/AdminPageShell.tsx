import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminIdentity } from "../domain/admin-identity";

type AdminNavItem = {
  id: string;
  href?: string;
  labelKey: string;
  icon: string;
  permission: string;
  enabled?: boolean;
  children?: Array<{
    href?: string;
    labelKey: string;
    permission: string;
    enabled?: boolean;
  }>;
};

const ADMIN_NAV: AdminNavItem[] = [
  {
    id: "dashboard",
    href: "/admin/dashboard",
    labelKey: "dashboard",
    icon: "isax isax-grid-55",
    permission: "dashboard.view"
  },
  {
    id: "agencies",
    href: "/admin/agencies",
    labelKey: "agencies",
    icon: "isax isax-buildings-2",
    permission: "agency.view"
  },
  {
    id: "users",
    href: "/admin/users",
    labelKey: "users",
    icon: "isax isax-people",
    permission: "user.view"
  },
  {
    id: "products",
    href: "/admin/products",
    labelKey: "products",
    icon: "isax isax-map",
    permission: "catalog.view",
    children: [
      {
        href: "/admin/products",
        labelKey: "productsOverview",
        permission: "catalog.view"
      },
      {
        href: "/admin/products/hotels",
        labelKey: "hotels",
        permission: "catalog.view"
      },
      {
        labelKey: "tours",
        permission: "catalog.view",
        enabled: false
      },
      {
        labelKey: "flights",
        permission: "catalog.view",
        enabled: false
      },
      {
        labelKey: "visas",
        permission: "catalog.view",
        enabled: false
      }
    ]
  },
  {
    id: "bookings",
    href: "/admin/bookings",
    labelKey: "bookings",
    icon: "isax isax-calendar-tick",
    permission: "booking.view"
  },
  {
    id: "finance",
    href: "/admin/finance",
    labelKey: "finance",
    icon: "isax isax-wallet",
    permission: "finance.view",
    children: [
      {
        href: "/admin/finance",
        labelKey: "financeOverview",
        permission: "finance.view"
      },
      {
        href: "/admin/finance/approvals",
        labelKey: "approvals",
        permission: "finance.view"
      }
    ]
  },
  {
    id: "content",
    href: "/admin/content",
    labelKey: "content",
    icon: "isax isax-document-text",
    permission: "content.view",
    children: [
      {
        href: "/admin/home",
        labelKey: "homepage",
        permission: "content.view"
      },
      {
        href: "/admin/content",
        labelKey: "contentPages",
        permission: "content.view"
      },
      {
        href: "/admin/media",
        labelKey: "media",
        permission: "content.view"
      },
      {
        href: "/admin/content/moderation",
        labelKey: "moderation",
        permission: "content.view"
      }
    ]
  },
  {
    id: "marketing",
    href: "/admin/marketing/campaigns",
    labelKey: "marketing",
    icon: "isax isax-megaphone",
    permission: "marketing.view",
    children: [
      {
        href: "/admin/marketing/campaigns",
        labelKey: "campaigns",
        permission: "marketing.view"
      },
      {
        href: "/admin/marketing/ads",
        labelKey: "ads",
        permission: "marketing.view"
      }
    ]
  },
  {
    id: "support",
    href: "/admin/support/tickets",
    labelKey: "support",
    icon: "isax isax-message-question",
    permission: "support.view",
    children: [
      {
        href: "/admin/support/tickets",
        labelKey: "tickets",
        permission: "support.view"
      },
      {
        href: "/admin/notifications",
        labelKey: "notifications",
        permission: "support.view"
      },
      {
        labelKey: "disputes",
        permission: "support.view",
        enabled: false
      }
    ]
  },
  {
    id: "integrations",
    href: "/admin/channel",
    labelKey: "integrations",
    icon: "isax isax-code",
    permission: "integration.view",
    children: [
      {
        href: "/admin/channel",
        labelKey: "channel",
        permission: "integration.view"
      },
      {
        labelKey: "suppliers",
        permission: "integration.view",
        enabled: false
      }
    ]
  },
  {
    id: "reports",
    href: "/admin/reports",
    labelKey: "reports",
    icon: "isax isax-chart-2",
    permission: "report.view"
  },
  {
    id: "settings",
    href: "/admin/security",
    labelKey: "settings",
    icon: "isax isax-setting-2",
    permission: "settings.view",
    children: [
      {
        href: "/admin/security",
        labelKey: "security",
        permission: "settings.view"
      },
      {
        href: "/admin/audit",
        labelKey: "audit",
        permission: "audit.view"
      }
    ]
  }
];

/**
 * Permission-driven admin shell. The visual structure comes from the template's
 * agency dashboard; navigation state comes from the Hani admin identity API.
 */
export async function AdminPageShell({
  locale,
  title,
  subtitle,
  active,
  activeSection,
  activeChild,
  children
}: {
  locale: string;
  title: string;
  subtitle: string;
  active: string;
  activeSection?: string;
  activeChild?: string;
  children: React.ReactNode;
}) {
  const t = await getTranslations({ locale, namespace: "adminHome" });
  const nav = await getTranslations({ locale, namespace: "adminNav" });
  const identityResult = await sessionGet<AdminIdentity>("/internal/v1/admin/me");
  const permissions = identityResult.data?.permissions ?? [];
  const role = identityResult.data?.role ?? "Admin";

  return (
    <>
      <Breadcrumb
        title={title}
        breadcrumbs={[
          { label: t("breadcrumbHome"), link: "/", active: false },
          { label: t("breadcrumbAdmin"), link: "/admin/dashboard", active: false },
          { label: active, active: true }
        ]}
        backgroundClass="breadcrumb-bg-04"
      />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="card user-sidebar agent-sidebar admin-sidebar mb-4 mb-lg-0 theiaStickySidebar">
                <div className="card-header user-sidebar-header text-center bg-gray-transparent">
                  <div className="agent-profile d-inline-flex">
                    <ImageWithBasePath
                      src="assets/img/logo.svg"
                      alt="Hani"
                      className="img-fluid rounded-circle bg-white p-2"
                    />
                  </div>
                  <h6 className="fs-16 mt-2">{t("adminName")}</h6>
                  <p className="fs-14 mb-2">{role}</p>
                </div>
                <div className="card-body user-sidebar-body">
                  <ul>
                    {ADMIN_NAV.filter((item) =>
                      permissions.includes(item.permission)
                    ).map((item) => {
                      const icon = <i className={`${item.icon} me-2`} />;
                      const label = nav(item.labelKey);
                      const childItems =
                        item.children?.filter((child) =>
                          permissions.includes(child.permission)
                        ) ?? [];

                      return (
                        <li key={item.id}>
                          {item.enabled === false || !item.href ? (
                            <span className="admin-nav-disabled d-flex align-items-center">
                              {icon}
                              {label}
                              <small className="ms-auto">{nav("soon")}</small>
                            </span>
                          ) : (
                            <Link
                              href={item.href}
                              className={`d-flex align-items-center ${
                                activeSection === item.id ? "active" : ""
                              }`}
                            >
                              {icon}
                              {label}
                            </Link>
                          )}
                          {activeSection === item.id && childItems.length > 0 && (
                            <ul className="admin-subnav">
                              {childItems.map((child) =>
                                child.enabled === false || !child.href ? (
                                  <li key={child.labelKey}>
                                    <span className="admin-nav-disabled d-flex align-items-center">
                                      {nav(child.labelKey)}
                                      <small className="ms-auto">{nav("soon")}</small>
                                    </span>
                                  </li>
                                ) : (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={
                                        activeChild === child.labelKey
                                          ? "active"
                                          : undefined
                                      }
                                      aria-current={
                                        activeChild === child.labelKey
                                          ? "page"
                                          : undefined
                                      }
                                    >
                                      {nav(child.labelKey)}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                    <li>
                      <Link href="/" className="d-flex align-items-center">
                        <i className="isax isax-arrow-left-2 me-2" />
                        {t("backToSite")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                <div>
                  <h4 className="fs-20 fw-bold mb-1">{title}</h4>
                  <p className="fs-14 text-gray-6 mb-0">{subtitle}</p>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
