"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../../components/common-sidebar/sidebar';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';
import RewardshistoryModal from './rewardshistoryModal';
import Link from "next/link";

const UserRewardsHistory = () => {
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
      label: 'Reward History',
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
                    <h6>Rewards History</h6>
                    <p className="fs-14 text-gray-6 fw-normal">
                      No of Rewards History : 150
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
                    <h6 className="">Rewards History List</h6>
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
                          Rewards Type
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Loyalty Points
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Referral Bonus
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Promotional Reward
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
                          <th>Issued Date</th>
                          <th>Reward Type</th>
                          <th>Reward Details</th>
                          <th>Reward Value</th>
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
                              #RH-1245
                            </Link>
                          </td>
                          <td>15 May 2026</td>
                          <td>Loyalty Points</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Dubai Tour Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>+$600</td>
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
                              #RH-3215
                            </Link>
                          </td>
                          <td>10 Jun 2026</td>
                          <td>Referral Bonus</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Friend referral completed
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>+$540</td>
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
                              data-bs-target="#expired"
                              className="link-primary fw-medium"
                            >
                              #RH-4581
                            </Link>
                          </td>
                          <td>04 July 2026</td>
                          <td>Loyalty Points</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Desert Safari Activity
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>+$200</td>
                          <td>
                            <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Expired
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#expired"
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
                              #RH-6545
                            </Link>
                          </td>
                          <td>25 Aug 2026</td>
                          <td>Promotional Reward</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  New User Welcome Bonus
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>-$600</td>
                          <td>
                            <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
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
                              #RH-3256
                            </Link>
                          </td>
                          <td>17 Aug 2026</td>
                          <td>Loyalty Points</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Redeemed at checkout
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>+$320</td>
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
                              #RH-3654
                            </Link>
                          </td>
                          <td>02 Sep 2026</td>
                          <td>Cashback</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Wallet cashback credited
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>-$400</td>
                          <td>
                            <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
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
                              #RH-1458
                            </Link>
                          </td>
                          <td>20 Oct 2026</td>
                          <td>Promotional Reward</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Festival Offer Reward
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>-$280</td>
                          <td>
                            <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
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
                              #RH-6589
                            </Link>
                          </td>
                          <td>10 Nov 2026</td>
                          <td>Activities</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Visa Service Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>+$320</td>
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
                              #RH-2315
                            </Link>
                          </td>
                          <td>15 Dec 2026</td>
                          <td>Referral Bonus</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Referral reward redeemed
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>+$129</td>
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
                              #RH-5414
                            </Link>
                          </td>
                          <td>22 Dec 2026</td>
                          <td>Loyalty Points</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  USA Tour Booking
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>-$600</td>
                          <td>
                            <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
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
      <RewardshistoryModal />

    </>
  )
}

export default UserRewardsHistory