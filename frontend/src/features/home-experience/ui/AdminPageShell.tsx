import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";

/**
 * Admin shell built from the template's agency-dashboard visual language.
 * The template ships no separate admin layout, so this reuses the agency
 * sidebar card, breadcrumb, spacing, and content grid rather than inventing a
 * second design system.
 */
export async function AdminPageShell({
  locale,
  title,
  subtitle,
  active,
  children
}: {
  locale: string;
  title: string;
  subtitle: string;
  active: string;
  children: React.ReactNode;
}) {
  const t = await getTranslations({ locale, namespace: "adminHome" });

  return (
    <>
      <Breadcrumb
        title={title}
        breadcrumbs={[
          { label: t("breadcrumbHome"), link: "/", active: false },
          { label: t("breadcrumbAdmin"), link: "/admin/home", active: false },
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
                  <p className="fs-14 mb-2">{t("adminRole")}</p>
                </div>
                <div className="card-body user-sidebar-body">
                  <ul>
                    <li>
                      <Link
                        href="/admin/home"
                        className={`d-flex align-items-center ${
                          active === t("navHomepage") ? "active" : ""
                        }`}
                      >
                        <i className="isax isax-grid-55 me-2" />
                        {t("navHomepage")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/media"
                        className={`d-flex align-items-center ${
                          active === t("navMedia") ? "active" : ""
                        }`}
                      >
                        <i className="isax isax-gallery me-2" />
                        {t("navMedia")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/content"
                        className={`d-flex align-items-center ${
                          active === t("navContent") ? "active" : ""
                        }`}
                      >
                        <i className="isax isax-document-text me-2" />
                        {t("navContent")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/security"
                        className={`d-flex align-items-center ${
                          active === t("navSecurity") ? "active" : ""
                        }`}
                      >
                        <i className="isax isax-shield-tick me-2" />
                        {t("navSecurity")}
                      </Link>
                    </li>
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
