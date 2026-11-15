"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../sidebar/sidebar';
import Link from "next/link";
import ImageWithBasePath from '../../../../components/image-with-base-path';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';
import AgentActivitiesBookingModal from './activitiesBookingModal';

const AgentActivitiesBooking = () => {
      const routes = all_routes;
      //Breadcrumb Data
      const breadcrumbs = [
          {
              label: 'My Bookings',
              active: false,
              link: routes.home1
          },
          {
              label: 'My Bookings',
              active: true,
          },
          {
              label: 'Activities Bookings',
              active: true,
          },
      ];
  return (
    <>
    <Breadcrumb title="My Bookings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
    {/* Page Wrapper */}
  <div className="content">
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
          <Sidebar/>
        </div>
        {/* /Sidebar */}
        {/* Hotel Booking */}
        <div className="col-xl-9 col-lg-8">
          {/* Booking Header */}
          <div className="card booking-header">
            <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
              <div>
                <h6>Activity Bookings</h6>
                <p className="fs-14 text-gray-6 fw-normal">
                  No of Bookings : 150
                </p>
              </div>
              <div className="d-flex align-items-center flex-wrap">
                <div className="input-icon-start position-relative">
                  <span className="icon-addon">
                    <i className="isax isax-calendar-edit fs-14" />
                  </span>
                  <PredefinedDateRanges/>
                </div>
              </div>
            </div>
          </div>
          {/* /Booking Header */}
          {/* Car-Booking List */}
          <div className="card hotel-list">
            <div className="card-body p-0">
              <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="">Booking List</h6>
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
                      Tour Type
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Adventure Tourism
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Escorted Tour
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Ground Tour
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
                          Upcoming
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Pending
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Cancelled
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
                      <th>Activity</th>
                      <th>Booked By</th>
                      <th>Duration</th>
                      <th>Pricing</th>
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
                          data-bs-target="#upcoming"
                        >
                          #AB-1245
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>Snorkeling Tour</Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Phuket, Thailand
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Lynwood Dickens
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Texas
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>4 Hours</td>
                      <td>$500</td>
                      <td>15 May 2026</td>
                      <td>
                        <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                          <i className="fa-solid fa-circle fs-5 me-1" />
                          Upcoming
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#upcoming"
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
                          data-bs-target="#upcoming"
                        >
                          #AB-3215
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>
                                Alpine Snowboarding
                              </Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Zermatt, Switzerland
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              James Osborne
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              California
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>4 Hours</td>
                      <td>$300</td>
                      <td>10 May 2026</td>
                      <td>
                        <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                          <i className="fa-solid fa-circle fs-5 me-1" />
                          Upcoming
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#upcoming"
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
                          data-bs-target="#upcoming"
                        >
                          #AB-4581
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>
                                White Water Rafting
                              </Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Rotorua, New Zealand
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Steve Grieve
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              New York
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>5 Hours</td>
                      <td>$320</td>
                      <td>04 May 2026</td>
                      <td>
                        <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                          <i className="fa-solid fa-circle fs-5 me-1" />
                          Upcoming
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#upcoming"
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
                          #AB-6545
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>
                                Cliffside Paragliding
                              </Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Annecy, France
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Alene Downing
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Florida
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>2 Hours</td>
                      <td>$400</td>
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
                          data-bs-target="#upcoming"
                        >
                          #AB-3256
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>River Cruise</Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Paris, France
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Carol Gardner
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Georgia
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>3 Hours</td>
                      <td>$520</td>
                      <td>17 Apr 2026</td>
                      <td>
                        <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                          <i className="fa-solid fa-circle fs-5 me-1" />
                          Upcoming
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#upcoming"
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
                          data-bs-target="#cancelled"
                        >
                          #AB-3654
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>Dessert Adventure</Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Dubai, UAE
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Enrique Archer
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Las Vegas
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>3 Hours</td>
                      <td>$400</td>
                      <td>02 Apr 2026</td>
                      <td>
                        <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
                          <i className="fa-solid fa-circle fs-5 me-1" />
                          Cancelled
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#cancelled"
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
                          #AB-1458
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>Coastal Kayaking</Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Sydney, Australia
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Weston Carrasco
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Texas
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>3 Hours</td>
                      <td>$280</td>
                      <td>20 Mar 2026</td>
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
                          #AB-6589
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>
                                Historic Landmarks Tour
                              </Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Rome, Italy
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Bonnie Coleman
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              California
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>3 Hours</td>
                      <td>$350</td>
                      <td>10 Mar 2026</td>
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
                          #AB-2315
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>Wildlife Safari</Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Kruger, South Africa
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Aurora Conklin
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Georgia
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>3 Hours</td>
                      <td>$510</td>
                      <td>15 Feb 2026</td>
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
                          #AB-5414
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.activityDetails}
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
                              <Link href={routes.activityDetails}>Kristin Watson</Link>
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Annecy, France
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Robin Banks
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Las Vegas
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>2 Hours</td>
                      <td>$600</td>
                      <td>22 Jan 2026</td>
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
  <AgentActivitiesBookingModal/>

    </>
  )
}

export default AgentActivitiesBooking