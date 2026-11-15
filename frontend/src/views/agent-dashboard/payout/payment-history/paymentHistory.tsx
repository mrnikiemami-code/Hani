"use client";
import Link from "next/link";
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../../routes/all_routes';
import Sidebar from '../../sidebar/sidebar';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';


const AgentPaymentHistory = () => {
  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: '',
      active: false,
      link: routes.home1
    },
    {
      label: 'Payouts',
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumb title="Payouts" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            {/* Payouts */}
            <div className="col-xl-9 col-lg-8 theiaStickySidebar">
              {/* Payout Header */}
              <div className="card booking-header border-0">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                  <div>
                    <h6 className="mb-1">Payouts</h6>
                    <p className="fs-14 text-gray-6 fw-normal ">
                      No of Payouts : 150
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="input-icon-start position-relative">
                      <span className="icon-addon">
                        <i className="isax isax-calendar-edit fs-14" />
                      </span>
                      <PredefinedDateRanges />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Payout Header */}
              <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                <Link href={routes.agentPendingPayouts} className="btn btn-light">
                  Pending Payouts
                </Link>
                <Link href={routes.agentPaymentHistory} className="btn btn-primary">
                  Payment History
                </Link>
              </div>
              {/* Pending Payouts List */}
              <div className="card hotel-list">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Pending Payouts</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="input-icon-start  me-2 position-relative">
                        <span className="icon-addon">
                          <i className="isax isax-search-normal-1 fs-14" />
                        </span>
                        <input type="text" className="form-control" placeholder="Search" />
                      </div>
                      <div className="dropdown me-3">
                        <Link
                          href="#"
                          className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Status
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Paid
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Rejected
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex align-items-center sort-by">
                        <span className="fs-14 text-gray-9 fw-medium">Sort By :</span>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle text-gray-6 btn rounded d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Recommended
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded-1">
                                Recently Added
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded-1">
                                Ascending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded-1">
                                Desending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded-1">
                                Last Month
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded-1">
                                Last 7 Days
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Payout List */}
                  <div className="custom-datatable-filter table-responsive">
                    <table className="table datatable">
                      <thead className="thead-light">
                        <tr>
                          <th>ID</th>
                          <th>Requested Date </th>
                          <th>Payout Method</th>
                          <th>Requested Amount</th>
                          <th>Processing Fee</th>
                          <th>Net Payable</th>
                          <th>Status</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#payoutDetails"
                            >
                              #PO-1245
                            </Link>
                          </td>
                          <td>15 May 2026, 10:00 AM</td>
                          <td>Bank Transfer</td>
                          <td>$500</td>
                          <td>$50</td>
                          <td>$630</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Paid
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#payoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#rejectedpayoutDetails"
                            >
                              #PO-3215
                            </Link>
                          </td>
                          <td>10 May 2026, 12:40 PM</td>
                          <td>Bank Transfer</td>
                          <td>$800</td>
                          <td>$80</td>
                          <td>$450</td>
                          <td>
                            <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Rejected
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#rejectedpayoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#payoutDetails"
                            >
                              #PO-4581
                            </Link>
                          </td>
                          <td>20 Apr 2026, 08:10 AM</td>
                          <td>Bank Transfer</td>
                          <td>$600</td>
                          <td>$60</td>
                          <td>$720</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Paid
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#payoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#payoutDetails"
                            >
                              #PO-6545
                            </Link>
                          </td>
                          <td>12 Apr 2026, 03:15 PM</td>
                          <td>Bank Transfer</td>
                          <td>$400</td>
                          <td>$40</td>
                          <td>$540</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Paid
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#payoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#rejectedpayoutDetails"
                            >
                              #PO-3854
                            </Link>
                          </td>
                          <td>05 Apr 2026, 11:30 AM</td>
                          <td>Bank Transfer</td>
                          <td>$300</td>
                          <td>$30</td>
                          <td>$270</td>
                          <td>
                            <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Rejected
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#rejectedpayoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#payoutDetails"
                            >
                              #PO-3256
                            </Link>
                          </td>
                          <td>28 Mar 2026, 08:20 AM</td>
                          <td>Bank Transfer</td>
                          <td>$900</td>
                          <td>$90</td>
                          <td>$810</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Paid
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#payoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#payoutDetails"
                            >
                              #PO-1458
                            </Link>
                          </td>
                          <td>16 Mar 2026, 03:15 PM</td>
                          <td>Bank Transfer</td>
                          <td>$200</td>
                          <td>$20</td>
                          <td>$180</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Paid
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#payoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#rejectedpayoutDetails"
                            >
                              #PO-6589
                            </Link>
                          </td>
                          <td>25 Feb 2026, 05:30 PM</td>
                          <td>Bank Transfer</td>
                          <td>$100</td>
                          <td>$10</td>
                          <td>$90</td>
                          <td>
                            <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Rejected
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#rejectedpayoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#payoutDetails"
                            >
                              #PO-2315
                            </Link>
                          </td>
                          <td>04 Feb 2026, 02:15 PM</td>
                          <td>Bank Transfer</td>
                          <td>$600</td>
                          <td>$60</td>
                          <td>$540</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Paid
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#payoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              className="link-primary fw-medium"
                              data-bs-toggle="modal"
                              data-bs-target="#payoutDetails"
                            >
                              #PO-5414
                            </Link>
                          </td>
                          <td>20 Jan 2026, 10:30 AM</td>
                          <td>Bank Transfer</td>
                          <td>$700</td>
                          <td>$70</td>
                          <td>$630</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Paid
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#payoutDetails"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* /Car List */}
                </div>
              </div>
              {/* /Car-Booking List */}
              <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                <div className="value d-flex align-items-center">
                  <span>Show</span>
                  <select>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Link href="#">
                    <span className="me-3">
                      <i className="isax isax-arrow-left-2" />
                    </span>
                  </Link>
                  <nav aria-label="Page navigation">
                    <ul className="paginations d-flex justify-content-center align-items-center">
                      <li className="page-item me-2">
                        <Link
                          className="page-link-1 active d-flex justify-content-center align-items-center "
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item me-2">
                        <Link
                          className="page-link-1 d-flex justify-content-center align-items-center"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link
                          className="page-link-1 d-flex justify-content-center align-items-center"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <Link href="#">
                    <span className="ms-3">
                      <i className="isax isax-arrow-right-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* /Car Booking */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Upcoming Modal */}
      <div
        className="modal fade"
        id="payoutDetails"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Payout Details{" "}
                <span className="fs-14 fw-medium text-primary">#PO-1245</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body p-3">
              <div className="row justify-content-between gy-3">
                <div className="col-6">
                  <h6 className="fs-14">Requested Date</h6>
                  <p className="text-gray-6 fs-16 ">15 May 2026, 10:00 AM</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Requested Amount</h6>
                  <p className="text-gray-6 fs-16 ">$500</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Payment Method</h6>
                  <p className="text-gray-6 fs-16 ">Bank Transfer</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Processing Fee</h6>
                  <p className="text-gray-6 fs-16 ">$50</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Net Payable</h6>
                  <p className="text-gray-6 fs-16 ">$450</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Status</h6>
                  <span className="badge badge-md badge-success rounded-pill d-inline-flex align-items-center fs-10">
                    <i className="fa-solid fa-circle fs-5 me-1" />
                    Paid
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Upcoming Modal */}
      {/* Upcoming Modal */}
      <div
        className="modal fade"
        id="rejectedpayoutDetails"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Payout Details{" "}
                <span className="fs-14 fw-medium text-primary">#PO-8589</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body p-3">
              <div className="row justify-content-between gy-3">
                <div className="col-6">
                  <h6 className="fs-14">Requested Date</h6>
                  <p className="text-gray-6 fs-16 ">25 Feb 2026, 05:30 PM</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Requested Amount</h6>
                  <p className="text-gray-6 fs-16 ">$100</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Payment Method</h6>
                  <p className="text-gray-6 fs-16 ">Bank Transfer</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Processing Fee</h6>
                  <p className="text-gray-6 fs-16 ">$10</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Net Payable</h6>
                  <p className="text-gray-6 fs-16 ">$90</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Status</h6>
                  <span className="badge badge-md badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                    <i className="fa-solid fa-circle fs-5 me-1" />
                    Rejected
                  </span>
                </div>
                <div className="col-12">
                  <h6 className="fs-14">Reason</h6>
                  <p className="text-gray-6 fs-16 ">
                    Amount does not meet the minimum payout requirement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Upcoming Modal */}
    </>
  )
}

export default AgentPaymentHistory