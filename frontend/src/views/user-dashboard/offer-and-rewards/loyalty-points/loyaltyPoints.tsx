"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../../components/common-sidebar/sidebar';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';
import LoyaltyPointsModal from './loyaltyPointsModal';
import Link from "next/link";

const UserLoyaltyPoints = () => {
  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: '',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Offers & Rewards',
      active: true,
    },
    {
      label: 'Loyalty Points',
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Offers & Rewards"
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
            {/* Hotel Booking */}
            <div className="col-xl-9 col-lg-8">
              {/* Booking Header */}
              <div className="card booking-header">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                  <div>
                    <h6>Loyalty Points</h6>
                    <p className="fs-14 text-gray-6 fw-normal">
                      No of Requests : 150
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
              {/* /Booking Header */}
              {/* Car-Booking List */}
              <div className="card hotel-list">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Loyalty Points List</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="input-icon-start  me-2 position-relative">
                        <span className="icon-addon">
                          <i className="isax isax-search-normal-1 fs-14" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                      <div className="dropdown me-3">
                        <Link
                          href="#"
                          className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Summary Type
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Dubai Tour Booking
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Activity Booking
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Visa Service
                            </Link>
                          </li>
                        </ul>
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
                              Confirmed
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Redeemed
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex align-items-center sort-by">
                        <span className="fs-14 text-gray-9 fw-medium">
                          Sort By :
                        </span>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle text-gray-6 btn  rounded d-inline-flex align-items-center"
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
                  {/* Hotel List */}
                  <div className="custom-datatable-filter table-responsive">
                    <table className="table datatable">
                      <thead className="thead-light">
                        <tr>
                          <th>ID</th>
                          <th>Summary</th>
                          <th>Issued Date</th>
                          <th>Earned</th>
                          <th>Redeemed</th>
                          <th>Expiry Date</th>
                          <th>Status</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#confirmed"
                              className="link-primary fw-medium"
                            >
                              #LP-1245
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Dubai Tour Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>15 May 2026</td>
                          <td>+$500</td>
                          <td>-</td>
                          <td>15 May 2027</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Confirmed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#confirmed"
                              className="link-primary fw-medium"
                            >
                              #LP-3215
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Activity Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>10 Jun 2026</td>
                          <td>+$300</td>
                          <td>-</td>
                          <td>10 Jun 2027</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Confirmed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#confirmed"
                              className="link-primary fw-medium"
                            >
                              #LP-4581
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Visa Service
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>04 July 2026</td>
                          <td>+$320</td>
                          <td>-</td>
                          <td>04 July 2027</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Confirmed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#redeemed"
                              className="link-primary fw-medium"
                            >
                              #LP-6545
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Redeemed at Checkout
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>25 Aug 2026</td>
                          <td>-</td>
                          <td>-$500</td>
                          <td>25 Aug 2027</td>
                          <td>
                            <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Redeemed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#redeemed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#confirmed"
                              className="link-primary fw-medium"
                            >
                              #LP-3256
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Referral Bonus
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>17 Aug 2026</td>
                          <td>+$520</td>
                          <td>-</td>
                          <td>17 Aug 2027</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Confirmed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#redeemed"
                              className="link-primary fw-medium"
                            >
                              #LP-3654
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Paris Tour Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>02 Sep 2026</td>
                          <td>-</td>
                          <td>-$400</td>
                          <td>02 Sep 2027</td>
                          <td>
                            <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Redeemed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#redeemed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#redeemed"
                              className="link-primary fw-medium"
                            >
                              #LP-1458
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Activity Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>20 Oct 2026</td>
                          <td>-</td>
                          <td>-$280</td>
                          <td>20 Oct 2027</td>
                          <td>
                            <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Redeemed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#redeemed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#confirmed"
                              className="link-primary fw-medium"
                            >
                              #LP-6589
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Bus Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>10 Nov 2026</td>
                          <td>+$350</td>
                          <td>-</td>
                          <td>10 Nov 2027</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Confirmed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#confirmed"
                              className="link-primary fw-medium"
                            >
                              #LP-2315
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Visa Service
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>15 Dec 2026</td>
                          <td>+$510</td>
                          <td>-</td>
                          <td>15 Dec 2027</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Confirmed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmed"
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
                              data-bs-toggle="modal"
                              data-bs-target="#redeemed"
                              className="link-primary fw-medium"
                            >
                              #LP-5414
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  USA Tour Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>22 Dec 2026</td>
                          <td>-</td>
                          <td>-$600</td>
                          <td>22 Dec 2027</td>
                          <td>
                            <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Redeemed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#redeemed"
                              >
                                <i className="isax isax-eye" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* /Hotel List */}
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
            {/* /Hotel Booking */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <LoyaltyPointsModal />
    </>
  )
}

export default UserLoyaltyPoints