"use client";
import Link from "next/link";
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../../routes/all_routes';
import Sidebar from '../../sidebar/sidebar';
import ImageWithBasePath from '../../../../components/image-with-base-path';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';

const AgentCommissionSummary = () => {
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
                    <h6 className="mb-1">Commission Summary</h6>
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
              {/* Pending Payouts List */}
              <div className="card hotel-list">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Booking</h6>
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
                              Sedan
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Hatchback
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Coupe
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
                  {/* Car List */}
                  <div className="custom-datatable-filter table-responsive">
                    <table className="table datatable">
                      <thead className="thead-light">
                        <tr>
                          <th>Booking ID</th>
                          <th>Booked Type</th>
                          <th>Service</th>
                          <th>Booked on</th>
                          <th>Price</th>
                          <th>Value</th>
                          <th>Commission Fee</th>
                          <th>Net Amount</th>
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
                              #HB-1245
                            </Link>
                          </td>
                          <td>Hotel</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/hotels/hotel-01.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.hotelDetails}>Hotel Miravent</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Barcelona
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>15 May 2026</td>
                          <td>$500</td>
                          <td>10%</td>
                          <td>$50</td>
                          <td>$450</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #CB-4581
                            </Link>
                          </td>
                          <td>Car</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/cars/car-01.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.carDetails}>Volkswagen Amarok</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Sedan
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>10 May 2026</td>
                          <td>$300</td>
                          <td>5%</td>
                          <td>$30</td>
                          <td>$270</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #TR-1458
                            </Link>
                          </td>
                          <td>Tour</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/tours/gallery-tour-01.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.tourDetails}>
                                    Joy Jubilee Jamboree
                                  </Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Innovation Ignited
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>04 May 2026</td>
                          <td>$320</td>
                          <td>10%</td>
                          <td>$32</td>
                          <td>$288</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #HB-3215
                            </Link>
                          </td>
                          <td>Hotel</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/hotels/hotel-02.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.hotelDetails}>The Urban Retreat</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Edinburgh
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>25 Apr 2026</td>
                          <td>$400</td>
                          <td>10%</td>
                          <td>$40</td>
                          <td>$360</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                          <td>Activity</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/tours/gallery-tour-03.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.tourDetails}>Snorkeling Tour</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Phuket, Thailand
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>17 Apr 2026</td>
                          <td>$520</td>
                          <td>5%</td>
                          <td>$52</td>
                          <td>$468</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #FL-2315
                            </Link>
                          </td>
                          <td>Flight</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/flight/flight-01.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.flightDetails}>Skybridge 191</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Air India
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>02 Apr 2026</td>
                          <td>$400</td>
                          <td>10%</td>
                          <td>$40</td>
                          <td>$360</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #CB-6545
                            </Link>
                          </td>
                          <td>Car</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/cars/car-02.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.carDetails}>Ford Mustang 4.0 AT</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Coupe
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>20 Mar 2026</td>
                          <td>$280</td>
                          <td>10%</td>
                          <td>$28</td>
                          <td>$252</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #CR-3654
                            </Link>
                          </td>
                          <td>Cruise</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/cruise/cruise-01.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.cruiseDetails}>Coral Cruiser</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Edinburgh
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>10 Mar 2026</td>
                          <td>$350</td>
                          <td>10%</td>
                          <td>$35</td>
                          <td>$315</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #GB-6589
                            </Link>
                          </td>
                          <td>Guide</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/guide/guide-01.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.guideDetails}>Albert Flores</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Fitness Frenzy
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>15 Feb 2026</td>
                          <td>$510</td>
                          <td>10%</td>
                          <td>$51</td>
                          <td>$459</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
                              #FL-5414
                            </Link>
                          </td>
                          <td>Flight</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-lg rounded-circle me-2">
                                <ImageWithBasePath
                                  src="assets/img/flight/flight-02.jpg"
                                  alt="img"
                                  className="img-fluid rounded-circle"
                                />
                              </div>
                              <div>
                                <p className="text-dark mb-0 fw-medium fs-14">
                                  <Link href={routes.flightDetails}>Nimbus 345</Link>
                                </p>
                                <span className="fs-14 fw-normal text-gray-6">
                                  Qatar Airways
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>22 Jan 2026</td>
                          <td>$600</td>
                          <td>10%</td>
                          <td>$60</td>
                          <td>$540</td>
                          <td>
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#upcoming"
                            >
                              <i className="isax isax-eye" />
                            </Link>
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
        id="upcoming"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="fs-20 fw-semibold text-dark">Commission Details</div>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-2">
                      <ImageWithBasePath
                        src="assets/img/tours/gallery-tour-03.jpg"
                        alt="image"
                        className="avatar avartar-md avatar-rounded"
                      />
                    </div>
                    <div>
                      <h6 className="mb-1">Snorkeling Tour</h6>
                      <div className="title-list">
                        <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                          <i className="isax isax-location5 me-2" />
                          Phuket, Thailand
                        </p>
                        <p className="d-flex align-items-center pe-2 me-2  fw-normal">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            5.0
                          </span>
                          (400 Reviews)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-info rounded-pill fw-normal fs-10">
                      <i className="fa-solid fa-circle fs-5 me-1" />
                      Upcoming
                    </span>
                  </div>
                </div>
                <div className="upcoming-details">
                  <div className="fs-18 fw-semibold text-dark mb-3">
                    Booking Info
                  </div>
                  <div className="row gy-3">
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">
                        Booking ID
                      </div>
                      <p className="text-primary fs-16 ">#AB-3256</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">
                        Booking Type
                      </div>
                      <p className="text-gray-6 fs-16 ">Activity</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">
                        Net Amount
                      </div>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">
                        Payment Status
                      </div>
                      <span className="badge bg-success rounded-pill fw-normal fs-10">
                        <i className="ti ti-point-filled" />
                        Paid
                      </span>
                    </div>
                  </div>
                </div>
                <div className="upcoming-details">
                  <div className="fs-18 fw-semibold text-dark mb-3">
                    Commission Info
                  </div>
                  <div className="row gy-3">
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">Price</div>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">
                        Commission Value
                      </div>
                      <p className="text-gray-6 fs-16 ">10%</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">
                        Commission Amount
                      </div>
                      <p className="text-gray-6 fs-16 ">$50</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="text-dark fw-medium fs-14 mb-1">
                        Net Amount
                      </div>
                      <p className="text-gray-6 fs-16 ">$450</p>
                    </div>
                  </div>
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

export default AgentCommissionSummary