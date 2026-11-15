"use client";
import Link from "next/link";
import CustomSelect from "../../../components/common-select/commonSelect";
import { InvoiceServiceOptions, InvoiceStatusOptions } from "../../../core/data/mock/selectOption";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Sidebar from "../../../components/common-sidebar/sidebar";
import { all_routes } from "../../../routes/all_routes";

const CustomerInvoices = () => {
  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      showLabel: true,
      active: false,
    },
    {
      label: "Customer Portal",
      to: routes.userDashboard,
      active: false,
    },
    {
      label: "My Invoices",
      active: true,
    },
  ];
  return (
   <>
  <Breadcrumb
        title="Billing &amp; Invoices"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04"
      />
  {/* Page Content */}
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
          {/* Page Header */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
            <div>
              <h4 className="fs-20 fw-bold mb-1">Invoices &amp; Receipts</h4>
              <p className="fs-14 text-gray-6 mb-0">
                Download official tax invoices and review payment histories for
                all your journeys.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm d-inline-flex align-items-center"
            >
              <i className="isax isax-document-download me-1" />
              Download Annual Tax Summary
            </button>
          </div>
          {/* Invoice Statistics Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-6 col-xl-3">
              <div className="invoice-stat-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fs-13 text-gray-6">Total Invoiced</span>
                  <i className="isax isax-receipt-item text-primary fs-18" />
                </div>
                <h4 className="fw-bold mb-1">$8,420.00</h4>
                <span className="fs-12 text-gray-5">12 Total Invoices</span>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="invoice-stat-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fs-13 text-gray-6">Paid in Full</span>
                  <i className="isax isax-tick-circle text-success fs-18" />
                </div>
                <h4 className="fw-bold text-success mb-1">$7,920.00</h4>
                <span className="fs-12 text-gray-5">11 Cleared Invoices</span>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="invoice-stat-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fs-13 text-gray-6">Outstanding Due</span>
                  <i className="isax isax-clock text-warning fs-18" />
                </div>
                <h4 className="fw-bold text-warning mb-1">$500.00</h4>
                <span className="fs-12 text-gray-5">Due in 5 Days</span>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="invoice-stat-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fs-13 text-gray-6">Total Discounts</span>
                  <i className="isax isax-discount-shape text-info fs-18" />
                </div>
                <h4 className="fw-bold text-info mb-1">$680.00</h4>
                <span className="fs-12 text-gray-5">Promos &amp; Credits</span>
              </div>
            </div>
          </div>
          {/* Filter Bar */}
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row g-2 align-items-center">
                  <div className="col-md-4">
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <i className="isax isax-search-normal" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Invoice # or Service..."
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <CustomSelect
                      options={InvoiceServiceOptions}
                      className="select"
                      defaultValue={InvoiceServiceOptions[0]}
                    />
                  </div>
                  <div className="col-md-3">
                    <CustomSelect
                      options={InvoiceStatusOptions}
                      className="select"
                      defaultValue={InvoiceStatusOptions[1]}
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">
                      Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Invoices Table Card */}
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="fs-16 mb-0">Invoice History</h5>
              <span className="fs-13 text-gray-6">
                Showing 6 Recent Invoices
              </span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="fs-13">Invoice #</th>
                      <th className="fs-13">Service &amp; Booking</th>
                      <th className="fs-13">Billing Date</th>
                      <th className="fs-13">Method</th>
                      <th className="fs-13 text-end">Amount</th>
                      <th className="fs-13 text-center">Status</th>
                      <th className="fs-13 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr>
                      <td>
                        <Link
                          href={routes.invoices}
                          className="invoice-number-link fs-13"
                        >
                          #INV-2026-0841
                        </Link>
                        <span className="fs-11 text-gray-5 d-block">
                          VAT Included
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm bg-light-primary text-primary rounded-circle d-flex align-items-center justify-content-center">
                            <i className="isax isax-building fs-16" />
                          </div>
                          <div>
                            <h6 className="fs-13 mb-0">
                              Hotel Miravent Barcelona
                            </h6>
                            <span className="fs-11 text-gray-6">
                              Ref: #DT-HTL-9842
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">18 May 2026</span>
                      </td>
                      <td>
                        <span className="fs-12 text-dark">
                          <i className="fa-brands fa-cc-visa text-primary me-1" />
                          •••• 4242
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="fs-14 fw-bold text-dark">
                          $1,800.00
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success-transparent text-success fs-11">
                          Paid in Full
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-secondary"
                            title="View Detailed Invoice"
                          >
                            <i className="isax isax-eye" />
                          </Link>
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-primary"
                            title="Download PDF"
                          >
                            <i className="isax isax-document-download" />
                          </Link>
                          <Link
                            href={routes.travelVoucher}
                            className="btn btn-xs btn-outline-info"
                            title="View Travel Voucher"
                          >
                            <i className="isax isax-ticket" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr>
                      <td>
                        <Link
                          href={routes.invoices}
                          className="invoice-number-link fs-13"
                        >
                          #INV-2026-0792
                        </Link>
                        <span className="fs-11 text-gray-5 d-block">
                          VAT Included
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm bg-light-warning text-warning rounded-circle d-flex align-items-center justify-content-center">
                            <i className="isax isax-airplane fs-16" />
                          </div>
                          <div>
                            <h6 className="fs-13 mb-0">
                              Iberia Express Flight (JFK-BCN)
                            </h6>
                            <span className="fs-11 text-gray-6">
                              Ref: #DT-FLT-7721
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">10 May 2026</span>
                      </td>
                      <td>
                        <span className="fs-12 text-dark">
                          <i className="fa-brands fa-cc-mastercard text-danger me-1" />
                          •••• 8891
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="fs-14 fw-bold text-dark">
                          $2,450.00
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success-transparent text-success fs-11">
                          Paid in Full
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-secondary"
                            title="View Detailed Invoice"
                          >
                            <i className="isax isax-eye" />
                          </Link>
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-primary"
                            title="Download PDF"
                          >
                            <i className="isax isax-document-download" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr>
                      <td>
                        <Link
                          href={routes.invoices}
                          className="invoice-number-link fs-13"
                        >
                          #INV-2026-0715
                        </Link>
                        <span className="fs-11 text-gray-5 d-block">
                          Visa Processing
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm bg-light-info text-info rounded-circle d-flex align-items-center justify-content-center">
                            <i className="isax isax-global fs-16" />
                          </div>
                          <div>
                            <h6 className="fs-13 mb-0">
                              Schengen Tourist Visa (Spain)
                            </h6>
                            <span className="fs-11 text-gray-6">
                              Ref: #DT-VSA-2026-88
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">02 May 2026</span>
                      </td>
                      <td>
                        <span className="fs-12 text-dark">
                          <i className="fa-brands fa-paypal text-primary me-1" />
                          PayPal
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="fs-14 fw-bold text-dark">$230.00</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success-transparent text-success fs-11">
                          Paid in Full
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-secondary"
                            title="View Detailed Invoice"
                          >
                            <i className="isax isax-eye" />
                          </Link>
                          <Link
                            href={routes.visaBookingConfirmation}
                            className="btn btn-xs btn-outline-info"
                            title="View Visa Confirmation"
                          >
                            <i className="isax isax-tick-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr>
                      <td>
                        <Link
                          href={routes.invoices}
                          className="invoice-number-link fs-13"
                        >
                          #INV-2026-0690
                        </Link>
                        <span className="fs-11 text-gray-5 d-block">
                          Activity Deposit
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm bg-light-success text-success rounded-circle d-flex align-items-center justify-content-center">
                            <i className="isax isax-user fs-16" />
                          </div>
                          <div>
                            <h6 className="fs-13 mb-0">
                              Certified Private Guide (Micheal John)
                            </h6>
                            <span className="fs-11 text-gray-6">
                              Ref: #DT-GDE-3011
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">28 Apr 2026</span>
                      </td>
                      <td>
                        <span className="fs-12 text-dark">
                          <i className="fa-brands fa-cc-visa text-primary me-1" />
                          •••• 4242
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="fs-14 fw-bold text-dark">$280.00</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success-transparent text-success fs-11">
                          Paid in Full
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-secondary"
                            title="View Detailed Invoice"
                          >
                            <i className="isax isax-eye" />
                          </Link>
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-primary"
                            title="Download PDF"
                          >
                            <i className="isax isax-document-download" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr>
                      <td>
                        <Link
                          href={routes.invoices}
                          className="invoice-number-link fs-13"
                        >
                          #INV-2026-0640
                        </Link>
                        <span className="fs-11 text-warning d-block">
                          Installment Due
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm bg-light-primary text-primary rounded-circle d-flex align-items-center justify-content-center">
                            <i className="isax isax-bag-tick fs-16" />
                          </div>
                          <div>
                            <h6 className="fs-13 mb-0">
                              Catalonia Custom Vacation Package
                            </h6>
                            <span className="fs-11 text-gray-6">
                              Ref: #DT-PKG-5510
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">20 Apr 2026</span>
                      </td>
                      <td>
                        <span className="fs-12 text-muted">
                          Awaiting Payment
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="fs-14 fw-bold text-warning">
                          $500.00
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-warning-transparent text-warning fs-11">
                          Payment Due
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Link
                            href={routes.payment}
                            className="btn btn-xs btn-primary"
                          >
                            Pay Now
                          </Link>
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-secondary"
                            title="View Detailed Invoice"
                          >
                            <i className="isax isax-eye" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    {/* Row 6 */}
                    <tr>
                      <td>
                        <Link
                          href={routes.invoices}
                          className="invoice-number-link fs-13"
                        >
                          #INV-2026-0580
                        </Link>
                        <span className="fs-11 text-purple d-block">
                          Refunded Transaction
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm bg-light-danger text-danger rounded-circle d-flex align-items-center justify-content-center">
                            <i className="isax isax-car fs-16" />
                          </div>
                          <div>
                            <h6 className="fs-13 mb-0">
                              BMW X5 Luxury Rental (7 Days)
                            </h6>
                            <span className="fs-11 text-gray-6">
                              Ref: #DT-CAR-1140
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">12 Apr 2026</span>
                      </td>
                      <td>
                        <span className="fs-12 text-dark">
                          <i className="fa-brands fa-cc-visa text-primary me-1" />
                          •••• 4242
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="fs-14 fw-bold text-dark">$750.00</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-purple-transparent text-purple fs-11">
                          Refunded
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Link
                            href={routes.invoices}
                            className="btn btn-xs btn-outline-secondary"
                            title="View Credit Note"
                          >
                            <i className="isax isax-eye" />
                          </Link>
                          <Link
                            href={routes.customerCancellationRefunds}
                            className="btn btn-xs btn-outline-info"
                            title="Refund Details"
                          >
                            <i className="isax isax-receipt-2" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* VAT & Business Tax Notice */}
          <div className="card border-0 bg-light-primary">
            <div className="card-body">
              <div className="d-flex gap-3">
                <div className="avatar avatar-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="isax isax-info-circle fs-20" />
                </div>
                <div>
                  <h6 className="fs-15 mb-1 text-primary">
                    Need a Corporate or Company VAT Invoice?
                  </h6>
                  <p className="fs-13 text-gray-7 mb-0">
                    All invoices generated on DreamsTour contain standard
                    European VAT / US sales tax declarations. If you need
                    corporate legal entity details, company tax identification
                    numbers (EIN / CIF), or reverse-charge VAT billing added,
                    please update your billing preferences in{" "}
                    <Link
                      href={routes.profileSettings}
                      className="text-primary fw-medium"
                    >
                      Profile Settings
                    </Link>{" "}
                    or contact{" "}
                    <a
                      href="mailto:billing@dreamstour.com"
                      className="text-primary"
                    >
                      billing@dreamstour.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Main Content */}
      </div>
    </div>
  </div>
  {/* /Page Content */}
</>

  )
}

export default CustomerInvoices