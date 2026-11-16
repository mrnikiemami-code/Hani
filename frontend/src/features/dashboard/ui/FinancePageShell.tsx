import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Sidebar from "@/components/common-sidebar/sidebar";

export function FinancePageShell({
  title,
  subtitle,
  active,
  children
}: {
  title: string;
  subtitle: string;
  active: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb
        title={title}
        breadcrumbs={[
          { label: "Home", link: "/", active: false },
          { label: "Dashboard", link: "/user/dashboard", active: false },
          { label: active, active: true }
        ]}
        backgroundClass="breadcrumb-bg-04"
      />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <Sidebar />
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
