"use client";
import Link from "next/link";
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb'
import Sidebar from '../../../../components/common-sidebar/sidebar';
import { all_routes } from '../../../../routes/all_routes';
import ImageWithBasePath from '../../../../components/image-with-base-path';
import VisaBookingModal from './visaBookingModal';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';

const UserVisaBooking = () => {
  const routes = all_routes

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'My Bookings',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'My Bookings',
      active: true,
    },
    {
      label: 'Visa',
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="My Bookings"
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
                    <h6>Visa Bookings</h6>
                    <p className="fs-14 text-gray-6 fw-normal">
                      No of Bookings : 142
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
                    <h6 className="">Visa List</h6>
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
                          Visa Type
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Business Visa
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Student Visa
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Work Visa
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
                              Applied
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              On Progress
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Applied
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Completed
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
                          <th>Visa Name</th>
                          <th>Catagory</th>
                          <th>Processing Time</th>
                          <th>Booked on</th>
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
                              data-bs-target="#applied"
                            >
                              #VS-1245
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-01.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>Micheal John</Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Business Visa
                          </td>
                          <td>5-7 Days</td>
                          <td>15 May 2026</td>
                          <td>
                            <span className="badge badge-purple rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Applied
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#applied"
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
                              data-bs-target="#applied"
                            >
                              #VS-3215
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-02.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Long term for Academic..
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Student Visa
                          </td>
                          <td>2-4 weeks</td>
                          <td>10 May 2026</td>
                          <td>
                            <span className="badge badge-purple rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Applied
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#applied"
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
                              data-bs-target="#progress"
                            >
                              #VS-4581
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-03.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Work Visa for Employment...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Work Visa
                          </td>
                          <td>15-20 Days</td>
                          <td>04 May 2026</td>
                          <td>
                            <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              On progress
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#progress"
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
                              data-bs-target="#completed"
                            >
                              #VS-6545
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-04.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Short term Visa for...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Business Visa
                          </td>
                          <td>3-5 Days</td>
                          <td>25 Apr 2026</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#completed"
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
                              data-bs-target="#applied"
                            >
                              #VS-3256
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-05.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Family Members to...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Family Visa
                          </td>
                          <td>8-12 Days</td>
                          <td>17 Apr 2026</td>
                          <td>
                            <span className="badge badge-purple rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Applied
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#applied"
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
                              data-bs-target="#applied"
                            >
                              #VS-3654
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-06.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Cultural Programs and...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Dependent Visa
                          </td>
                          <td>12-15 Days</td>
                          <td>02 Sep 2026</td>
                          <td>
                            <span className="badge badge-purple rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Applied
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#applied"
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
                              data-bs-target="#completed"
                            >
                              #VS-1458
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-07.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Grown up E-visa with...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Transit Visa
                          </td>
                          <td>2-3 weeks</td>
                          <td>20 Oct 2026</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#completed"
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
                              data-bs-target="#completed"
                            >
                              #VS-6589
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-08.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Voluntary Work with...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Work Visa
                          </td>
                          <td>7-12 Days</td>
                          <td>10 Nov 2026</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#completed"
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
                              data-bs-target="#completed"
                            >
                              #VS-2315
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-09.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Skilled Workers with...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Work Visa
                          </td>
                          <td>12-20 Days</td>
                          <td>15 Dec 2026</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#completed"
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
                              data-bs-target="#progress"
                            >
                              #VS-5414
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href={routes.visaDetails}
                                className="avatar avatar-lg"
                              >
                                <ImageWithBasePath
                                  src="assets/img/visa/visa-10.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="img"
                                />
                              </Link>
                              <div className="ms-2">
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.visaDetails}>
                                    Cultural Programs and...
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-dark mb-0 fw-medium fs-14">
                            Tourist Visa
                          </td>
                          <td>2-8 Days</td>
                          <td>22 Dec 2026</td>
                          <td>
                            <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              On progress
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#progress"
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
      <VisaBookingModal />
    </>
  )
}

export default UserVisaBooking