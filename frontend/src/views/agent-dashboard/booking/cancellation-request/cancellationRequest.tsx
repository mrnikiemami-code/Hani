"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../sidebar/sidebar';
import Link from "next/link";
import AgentCancellationRequestModal from './cancellationRequestModal';

const AgentCancellationRequest = () => {
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
              label: 'Cancellation Requests',
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
                  <input
                    type="text"
                    className="form-control date-range bookingrange"
                    placeholder="Select"
                    defaultValue="Academic Year : 2024 / 2025"
                  />
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
                      Booking Type
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Hotel
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Car
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Tour
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
                      <th>Booking ID</th>
                      <th>Booked Type</th>
                      <th>Booked By</th>
                      <th>Service</th>
                      <th>Booked on</th>
                      <th>Booked on</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-1245
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #HB-1245
                        </Link>
                      </td>
                      <td>Hotel</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Hotel Miravent
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Barcelona
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>15 May 2026</td>
                      <td>18 May 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-3215
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #CB-4581
                        </Link>
                      </td>
                      <td>Car</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Volkswagen Amarok
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Sedan
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>10 May 2026</td>
                      <td>11 May 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-4581
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #TR-1458
                        </Link>
                      </td>
                      <td>Tour</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Joy Jubilee Jamboree
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Innovation Ignited
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>04 May 2026</td>
                      <td>06 May 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-6545
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #HB-3215
                        </Link>
                      </td>
                      <td>Hotel</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2 position-relative">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Alene Downing
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Florida
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              The Urban Retreat
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Edinburgh
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>25 Apr 2026</td>
                      <td>30 Apr 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-3256
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #CR-3256
                        </Link>
                      </td>
                      <td>Cruise</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Super Aquamarine
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Barcelona
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>17 Apr 2026</td>
                      <td>20 Apr 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-3654
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #FL-2315
                        </Link>
                      </td>
                      <td>Flight</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Skybridge 191
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Air India
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>02 Apr 2026</td>
                      <td>05 Apr 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-1458
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #CB-6545
                        </Link>
                      </td>
                      <td>Car</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Ford Mustang 4.0 AT
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Coupe
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>20 Mar 2026</td>
                      <td>21 Mar 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-6589
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #CR-3654
                        </Link>
                      </td>
                      <td>Cruise</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Coral Cruiser
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Edinburgh
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>10 Mar 2026</td>
                      <td>12 Mar 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-2315
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #TR-6589
                        </Link>
                      </td>
                      <td>Tour</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              PlayPalooza Part
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Ground tour
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>15 Feb 2026</td>
                      <td>17 Feb 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#cancellation-id"
                          className="link-primary fw-medium"
                        >
                          #CN-5414
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#booking-id"
                          className="link-primary fw-medium"
                        >
                          #FL-5414
                        </Link>
                      </td>
                      <td>Flight</td>
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
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14">
                              Nimbus 345
                            </p>
                            <span className="fs-14 fw-normal text-gray-6">
                              Qatar Airways
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>22 Jan 2026</td>
                      <td>23 Jan 2026</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <i className="isax isax-tick-circle me-2" />
                          </Link>
                          <Link href="#">
                            <i className="isax isax-close-circle" />
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
  <AgentCancellationRequestModal/>
  {/* /Page Wrapper */}
    </>
  )
}

export default AgentCancellationRequest