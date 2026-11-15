"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../../components/common-sidebar/sidebar';
import Link from "next/link";
import CouponsModal from './couponsModal';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';

const UserCoupons = () => {
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
      label: 'Coupons',
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
                    <h6>Cancellation Requests</h6>
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
                    <h6 className="">Coupons List</h6>
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
                          Coupon Type
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Flat discount
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Special offer
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Welcome offer
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
                              Available
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Expired
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
                          <th>Coupon Code</th>
                          <th>Category</th>
                          <th>Validity</th>
                          <th>Discount on</th>
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              DREAM500
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Flat discount on...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Tour Package</td>
                          <td>40 Days</td>
                          <td>$500</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Available
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#coupon-avaliable"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              ACT10
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Special offer on...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Activities</td>
                          <td>42 Days</td>
                          <td>$300</td>
                          <td>
                            <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
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
                                data-bs-target="#coupon-expired"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              VISA300
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Discount on visa...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Visa</td>
                          <td>38 Days</td>
                          <td>$320</td>
                          <td>
                            <span className="badge badge-secondary text-white rounded-pill d-inline-flex align-items-center fs-10">
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
                                data-bs-target="#coupon-redeemed"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              SUMMER800
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  New user welcome offer
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Tour Package</td>
                          <td>36 Days</td>
                          <td>$400</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Available
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#coupon-avaliable"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              LOYALTY200
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Offer on private tour...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Visa</td>
                          <td>34 Days</td>
                          <td>$520</td>
                          <td>
                            <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
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
                                data-bs-target="#coupon-expired"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              ACTFLAT400
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Flat discount on...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Flights</td>
                          <td>32 Days</td>
                          <td>$400</td>
                          <td>
                            <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
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
                                data-bs-target="#coupon-expired"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              VISA10
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Percentage discount on...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Car</td>
                          <td>30 Days</td>
                          <td>$280</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Available
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#coupon-avaliable"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              FESTIVE25
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Festival season...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Visa</td>
                          <td>28 Days</td>
                          <td>$350</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Available
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#coupon-avaliable"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              LOYALTY200
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  Reward coupon for...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Tour Package</td>
                          <td>26 Days</td>
                          <td>$510</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Available
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#coupon-avaliable"
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
                              data-bs-target="#coupon-avaliable"
                              className="link-primary fw-medium"
                            >
                              SUMMER800
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  New user welcome offer
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>Activities</td>
                          <td>24 Days</td>
                          <td>$600</td>
                          <td>
                            <span className="badge badge-secondary text-white rounded-pill d-inline-flex align-items-center fs-10">
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
                                data-bs-target="#coupon-redeemed"
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
      <CouponsModal />
    </>
  )
}

export default UserCoupons