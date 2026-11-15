"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Sidebar from "../../../components/common-sidebar/sidebar";
import CustomerCancellationRefundsModal from "./customerCancellationRefundsModal";
import { all_routes } from "../../../routes/all_routes";

const CustomerCancellationRefunds = () => {
  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Account",
      to: routes.userDashboard,
      active: false,
    },
    {
      label: "My Bookings",
      to: routes.userAllBookings,
      active: false,
    },
    {
      label: "Refunds",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Cancellations &amp; Refund Status"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            {/* Main Content */}
            <div className="col-xl-9 col-lg-8">
              {/* Overview Metrics */}
              <div className="row g-3 mb-4">
                <div className="col-sm-3 col-6">
                  <div className="refund-summary-card">
                    <span className="fs-13 text-gray-6 d-block mb-1">
                      Total Requests
                    </span>
                    <h3 className="fs-22 mb-0">3</h3>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="refund-summary-card">
                    <span className="fs-13 text-gray-6 d-block mb-1">
                      Under Review
                    </span>
                    <h3 className="fs-22 mb-0 text-warning">1</h3>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="refund-summary-card">
                    <span className="fs-13 text-gray-6 d-block mb-1">
                      Refunded
                    </span>
                    <h3 className="fs-22 mb-0 text-success">2</h3>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="refund-summary-card">
                    <span className="fs-13 text-gray-6 d-block mb-1">
                      Total Credited
                    </span>
                    <h3 className="fs-22 mb-0 text-primary">$2,380.00</h3>
                  </div>
                </div>
              </div>
              {/* Table Card */}
              <div className="card hotel-list">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap gap-2 p-3 border-bottom">
                    <h5 className="fs-18 mb-0">
                      Cancellation &amp; Refund Requests
                    </h5>
                    <div className="d-flex align-items-center gap-2">
                      <Link
                        href={routes.manageBooking}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="isax isax-add me-1" />
                        New Cancellation Request
                      </Link>
                    </div>
                  </div>
                  <div className="custom-datatable-filter table-responsive">
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th>Request ID</th>
                          <th>Booking Ref</th>
                          <th>Service</th>
                          <th>Requested on</th>
                          <th>Booking Cost</th>
                          <th>Deduction</th>
                          <th>Net Refund</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span className="fw-semibold text-primary">
                              #CN-8492
                            </span>
                          </td>
                          <td>
                            <Link
                              href={routes.userTripDetails}
                              className="text-dark fw-medium"
                            >
                              #DT-FL-48219
                            </Link>
                            <span className="fs-12 text-gray-6 d-block">
                              Flight · DEL to BCN
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-primary-transparent text-primary fs-12">
                              Flight
                            </span>
                          </td>
                          <td>20 May 2026</td>
                          <td>$1,850.00</td>
                          <td className="text-danger">-$150.00</td>
                          <td className="fw-bold text-success">$1,700.00</td>
                          <td>
                            <span className="badge badge-success rounded-pill fs-11">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Settled
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#refundDetailsModal"
                            >
                              <i className="isax isax-eye" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-semibold text-primary">
                              #CN-7104
                            </span>
                          </td>
                          <td>
                            <Link
                              href={routes.hotelDetails}
                              className="text-dark fw-medium"
                            >
                              #HB-3215
                            </Link>
                            <span className="fs-12 text-gray-6 d-block">
                              Hotel · The Luxe Haven
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-info-transparent text-info fs-12">
                              Hotel
                            </span>
                          </td>
                          <td>22 May 2026</td>
                          <td>$750.00</td>
                          <td className="text-gray-6">$0.00 (Free)</td>
                          <td className="fw-bold text-success">$750.00</td>
                          <td>
                            <span className="badge badge-warning text-dark rounded-pill fs-11">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              In Review
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#refundDetailsModal"
                            >
                              <i className="isax isax-eye" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-semibold text-primary">
                              #CN-5921
                            </span>
                          </td>
                          <td>
                            <Link
                              href={routes.carDetails}
                              className="text-dark fw-medium"
                            >
                              #CB-4581
                            </Link>
                            <span className="fs-12 text-gray-6 d-block">
                              Car · Volkswagen Amarok
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-purple-transparent text-purple fs-12">
                              Car
                            </span>
                          </td>
                          <td>10 May 2026</td>
                          <td>$420.00</td>
                          <td className="text-danger">-$40.00</td>
                          <td className="fw-bold text-success">$380.00</td>
                          <td>
                            <span className="badge badge-success rounded-pill fs-11">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Settled
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#refundDetailsModal"
                            >
                              <i className="isax isax-eye" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Helpful Alert Box */}
              <div className="alert alert-info d-flex align-items-center mt-4">
                <i className="isax isax-info-circle fs-24 me-3 flex-shrink-0" />
                <div>
                  <h6 className="fs-14 mb-1">How DreamsTour Refunds Work</h6>
                  <p className="fs-13 mb-0">
                    Refunds are returned via the original payment method or
                    credited to your DreamsTour Wallet for immediate reuse. Bank
                    card reversals typically appear in your account statement
                    within 3 to 5 business days.
                  </p>
                </div>
              </div>
            </div>
            {/* /Main Content */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
  <CustomerCancellationRefundsModal />
    </>
  );
};

export default CustomerCancellationRefunds;
