"use client";
import { all_routes } from "../../../routes/all_routes";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Sidebar from "../sidebar/sidebar";
import Link from "next/link";
import ImageWithBasePath from "../../../components/image-with-base-path";
import AgentListingModal from "./modal/agentListingModal";

const AgentListings = () => {
  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Listings",
      active: false,
      link: routes.allService1,
    },
    {
      label: "Listings",
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Listings"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            <div className="col-xl-9 col-lg-8">
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <div className="place-nav listing-nav">
                  <ul className="nav mb-2">
                    <li className="me-2">
                      <Link
                        href="#"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#Hotels-list"
                      >
                        Hotels
                      </Link>
                    </li>
                    <li className="me-2">
                      <Link
                        href="#"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#Cars-list"
                      >
                        Cars
                      </Link>
                    </li>
                    <li className="me-2">
                      <Link
                        href="#"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#Cruise-list"
                      >
                        Cruise
                      </Link>
                    </li>
                    <li className="me-2">
                      <Link
                        href="#"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#Tour-list"
                      >
                        Tour
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#flight-list"
                      >
                        Flights
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#bus-list"
                      >
                        Bus
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown mb-4">
                  <Link
                    href="#"
                    className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    All Listing
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Active
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Inactive
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-content">
                {/* Hotels List */}
                <div className="tab-pane fade active show" id="Hotels-list">
                  <div className="card border-0">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div>
                        <h5 className="mb-1">Listings</h5>
                        <p>No of Listings : 200</p>
                      </div>
                      <div>
                        <Link
                          href={routes.addHotel}
                          className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                          <i className="isax isax-add me-1 fs-16" />
                          Add Listing
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-01.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>
                              Hotel Miravent Barcelona
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Ciutat Vella, Barcelona
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $500{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-05.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>The Luxe Haven</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Oxford Street, London
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $600{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>
                              The Urban Retreat
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Princes Street, Edinburgh
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $500{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>
                              The Grand Horizon
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Deansgate, Manchester
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $400{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link href="#" className="me-2 d-inline-flex">
                                <i className="isax isax-edit" />
                              </Link>
                              <Link href="#" className="me-2 d-inline-flex">
                                <i className="isax isax-trash" />
                              </Link>
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>
                              Hotel Evergreen{" "}
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            King’s Road, Chelsea
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $550{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>Stardust Hotel</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Bold Street, Liverpool
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $450{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>
                              Hotel Serene Valley
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Broad Street, Bristol
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $350{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>
                              Hotel Skyline Vista
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Chapel Street, Salford
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $700{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    {/* Hotel Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-12.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editHotel}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.hotelDetails}>
                              Hotel Aurora Bliss
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-2">
                            <i className="isax isax-location5 me-2" />
                            Castle Street, Cambridge
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h5 className="text-primary text-nowrap me-2">
                              $650{" "}
                              <span className="fs-14 fw-normal text-default">
                                / Night
                              </span>
                            </h5>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Hotel Grid */}
                    <div className="col-md-12">
                      {/* Pagination */}
                      <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                          <li className="page-item disabled">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-left" />
                              </span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" href="#">
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              5
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      {/* /Pagination */}
                    </div>
                  </div>
                </div>
                {/* /Hotels List */}
                {/* Cars List */}
                <div className="tab-pane fade" id="Cars-list">
                  <div className="card border-0">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div>
                        <h5 className="mb-1">Listings</h5>
                        <p>No of Listings : 200</p>
                      </div>
                      <div>
                        <Link
                          href={routes.addCar}
                          className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                          <i className="isax isax-add me-1 fs-16" />
                          Add Listing
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>
                              Toyota Camry SE 400
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Ciutat Vella, Barcelona
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $500{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>
                              Ford Mustang 4.0 AT
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Oxford Street, London
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $600{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>
                              Ferrari 458 MM Special
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Princes Street, Edinburgh
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $300{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>
                              Mercedes-benz Convertible
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Princes Street, Edinburgh
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $400{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#active_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center text-danger"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Inactive
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>
                              BMW 3.0 Gran Turismo
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            King’s Road, Chelsea
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $550{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>Infiniti QX60 </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Bold Street, Liverpool
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $450{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-12.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>Toyota 86 Sports</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Broad Street, Bristol
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $350{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-13.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>Jeep Wrangler</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Chapel Street, Salford
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $700{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#active_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center text-danger"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Inactive
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    {/* Car Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-14.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCar}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                Sedan
                              </span>
                            </div>
                          </div>
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.carDetails}>Jaguar XK</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Castle Street, Cambridge
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $650{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Car Grid */}
                    <div className="col-md-12">
                      {/* Pagination */}
                      <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                          <li className="page-item disabled">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-left" />
                              </span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" href="#">
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              5
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      {/* /Pagination */}
                    </div>
                  </div>
                </div>
                {/* /Cars List */}
                {/* Cruise List */}
                <div className="tab-pane fade" id="Cruise-list">
                  <div className="card border-0">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div>
                        <h5 className="mb-1">Listings</h5>
                        <p>No of Listings : 200</p>
                      </div>
                      <div>
                        <Link
                          href={routes.addCruise}
                          className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                          <i className="isax isax-add me-1 fs-16" />
                          Add Listing
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.cruiseDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-05.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>
                              Super Aquamarine
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Ciutat Vella, Barcelona
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $700{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-12.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>Bonnie Yacht</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Oxford Street, London
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $600{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#active_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center text-danger"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Inactive
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>Coral Cruiser</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Princes Street, Edinburgh
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $300{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href="#"
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>Harbor Haven</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Princes Street, Edinburgh
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $300{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.cruiseDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-01.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>Albert Yacht</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            King’s Road, Chelsea
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $550{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#active_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center text-danger"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Inactive
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>Shelly Yacht</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Bold Street, Liverpool
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $450{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.cruiseDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>Sunny Sailor</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Broad Street, Bristol
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $350{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.cruiseDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>Ocean Voyager</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Chapel Street, Salford
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $700{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    {/* Cruise Grid */}
                    <div className="col-xl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.cruiseDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editCruise}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.cruiseDetails}>
                              Sailor’s Delight
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Castle Street, Cambridge
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $650{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Cruise Grid */}
                    <div className="col-md-12">
                      {/* Pagination */}
                      <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                          <li className="page-item disabled">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-left" />
                              </span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" href="#">
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              5
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      {/* /Pagination */}
                    </div>
                  </div>
                </div>
                {/* /Cruise List */}
                {/* Tour List */}
                <div className="tab-pane fade" id="Tour-list">
                  <div className="card border-0">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div>
                        <h5 className="mb-1">Listings</h5>
                        <p>No of Listings : 200</p>
                      </div>
                      <div>
                        <Link
                          href={routes.addHotel}
                          className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                          <i className="isax isax-add me-1 fs-16" />
                          Add Listing
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>
                              Rainbow Mountain Valley
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Ciutat Vella, Barcelona
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $650{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>Mystic Falls</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Oxford Street, London
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $600{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>Crystal Lake</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Princes Street, Edinburgh
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $300{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>Majestic Peaks</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Deansgate, Manchester
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $400{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>
                              Enchanted Forest
                            </Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            King’s Road, Chelsea
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $500{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#active_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center text-danger"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Inactive
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-12.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>Serene Bay</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Bold Street, Liverpool
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $450{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-13.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>Ancient Ruins</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Broad Street, Bristol
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $350{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-14.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>Mystical Caves</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Chapel Street, Salford
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $700{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#active_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center text-danger"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Inactive
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    {/* Tours Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-15.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editTour}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="mb-1 text-truncate">
                            <Link href={routes.tourDetails}>Frosted Peaks</Link>
                          </h5>
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-location5 me-2" />
                            Castle Street, Cambridge
                          </p>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $650{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Tours Grid */}
                    <div className="col-md-12">
                      {/* Pagination */}
                      <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                          <li className="page-item disabled">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-left" />
                              </span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" href="#">
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              5
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      {/* /Pagination */}
                    </div>
                  </div>
                </div>
                {/* /Tour List */}
                {/* Flight List */}
                <div className="tab-pane fade" id="flight-list">
                  <div className="card border-0">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div>
                        <h5 className="mb-1">Listings</h5>
                        <p>No of Listings : 200</p>
                      </div>
                      <div>
                        <Link
                          href={routes.addFlight}
                          className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                          <i className="isax isax-add me-1 fs-16" />
                          Add Listing
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>Skybridge 191</Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Air India</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Texas
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $500{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>SkyBound 102</Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Indigo</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Dubai
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $600{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>Nimbus 345</Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Indigo</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Dubai
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $300{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#active_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center text-danger"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Inactive
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-01.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>
                              AstraFlight 215
                            </Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Indigo</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Frankfurt
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $300{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-02.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>
                              Cloudrider 789
                            </Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Air India</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Dallas
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $550{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-03.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>
                              Aether Express 901
                            </Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Indigo</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Seoul
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $450{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>Voyager 658</Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Air India</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Sydney
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $350{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-04.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>
                              Silverwing 505
                            </Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Air India</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at London
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $700{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    {/* Flight Grid */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <Link href={routes.flightDetails}>
                            <ImageWithBasePath
                              src="assets/img/flight/flight-05.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                          <div className="edit-delete-item d-flex align-items-center">
                            <Link
                              href={routes.editFlight}
                              className="me-2 d-inline-flex align-items-center justify-content-center"
                            >
                              <i className="isax isax-edit" />
                            </Link>
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-list"
                            >
                              <i className="isax isax-trash" />
                            </Link>
                          </div>
                        </div>
                        <div className="place-content">
                          <h5 className="text-truncate mb-1">
                            <Link href={routes.flightDetails}>Altair 333</Link>
                          </h5>
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/icons/airindia.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 mb-0 me-2">Air India</p>
                            <p className="fs-14 mb-0">
                              <i className="ti ti-point-filled text-primary me-2" />
                              1-stop at Los Angeles
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <h5 className="text-primary">
                                $650{" "}
                                <span className="fs-14 text-gray-6 fw-normal">
                                  / day
                                </span>
                              </h5>
                            </div>
                            <div className="d-flex align-items-center lh-1">
                              <Link
                                href="#inactive_list"
                                data-bs-toggle="modal"
                                className="d-flex align-items-center"
                              >
                                <i className="isax isax-info-circle me-1" />
                                Active
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Flight Grid */}
                    <div className="col-md-12">
                      {/* Pagination */}
                      <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                          <li className="page-item disabled">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-left" />
                              </span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" href="#">
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              5
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      {/* /Pagination */}
                    </div>
                  </div>
                </div>
                {/* /Flight List */}

                {/* Bus list */}
                <div className="tab-pane fade" id="bus-list">
                  <div className="card border-0">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div>
                        <h5 className="mb-1">Listings</h5>
                        <p>No of Listings : 200</p>
                      </div>
                      <div>
                        <Link
                          href={all_routes.addBus}
                          className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                          <i className="isax isax-add me-1 fs-16" />
                          Add Listing
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="row">
                      {/* 1. Red Bird Luxury */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-1.jpg"
                                className="img-fluid"
                                alt="img"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2 selected"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                5.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>Red Bird Luxury</Link>
                            </h5>
                            <div className="d-flex align-items-center mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-01.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Tata</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                Seater
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex align-items-center justify-content-between gap-2">
                                <div className="bus-title-item">
                                  <h5 className="text-truncate mb-1 fs-14 fw-semibold">
                                    Chicago
                                  </h5>
                                  <p className="fs-14 text-default mt-1">
                                    09:30 AM
                                  </p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small className="text-muted">
                                      10h 40m
                                    </small>
                                  </span>
                                </div>
                                <div className="bus-title-item">
                                  <h5 className="text-truncate mb-1 fs-14 fw-semibold">
                                    Miami
                                  </h5>
                                  <p className="fs-14 text-default mt-1">
                                    10:40 PM
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-08.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                  alt="img"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  20 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">
                                <span className="fs-14 text-default">
                                  From{" "}
                                </span>
                                $280
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 2. Elite Ride */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-2.jpg"
                                className="img-fluid"
                                alt="img"
                              />
                            </Link>
                            <div className="fav-item">
                              <Link href="#" className="fav-icon selected">
                                <i className="isax isax-heart5" />
                              </Link>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                4.9
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>Elite Ride</Link>
                            </h5>
                            <div className="d-flex align-items-center mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-02.svg" />
                              </span>
                              <p className="fs-14 mb-0 me-2">Ashok Leyland</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                AC Sleeper
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div className="bus-title-item">
                                  <h5 className="fs-14 mb-1">Toronto</h5>
                                  <p className="fs-14 text-default">02:25 PM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small className="text-muted">
                                      14h 10m
                                    </small>
                                  </span>
                                </div>
                                <div className="bus-title-item">
                                  <h5 className="fs-14 mb-1">Bangkok</h5>
                                  <p className="fs-14 text-default">04:15 PM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-top pt-3">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-09.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  12 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">
                                <span className="fs-14 text-default">
                                  From{" "}
                                </span>
                                $300
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 3. Urban Glide */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-3.jpg"
                                className="img-fluid"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                4.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="mb-1">
                              <Link href={all_routes.busDetails}>Urban Glide</Link>
                            </h5>
                            <div className="d-flex mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-03.svg" />
                              </span>
                              <p className="fs-14 me-2 mb-0">Volvo</p>
                              <p className="fs-14">
                                <i className="ti ti-point-filled text-primary me-2" />
                                Sleeper
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="fs-14 mb-1">Dallas</h5>
                                  <p className="fs-14 text-default">04:45 PM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small className="text-muted">
                                      19h 10m
                                    </small>
                                  </span>
                                </div>
                                <div>
                                  <h5 className="fs-14 mb-1">Atlanta</h5>
                                  <p className="fs-14 text-default">08:15 AM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-top pt-3">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-10.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  11 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">
                                <span className="fs-14 text-default">
                                  From{" "}
                                </span>
                                $400
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 4. Route Max */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-4.jpg"
                                className="img-fluid"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                5.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="mb-1">
                              <Link href={all_routes.busDetails}>Route Max</Link>
                            </h5>
                            <div className="d-flex mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-01.svg" />
                              </span>
                              <p className="fs-14 me-2 mb-0">Tata</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                Seater
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="fs-14 mb-1">New York</h5>
                                  <p className="fs-14">07:00 AM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small className="text-muted">
                                      11h 10m
                                    </small>
                                  </span>
                                </div>
                                <div>
                                  <h5 className="fs-14 mb-1">Boston</h5>
                                  <p className="fs-14">08:25 PM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-top pt-3">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-11.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  20 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">
                                <span>From </span>$280
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 5. Trail Star */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-5.jpg"
                                className="img-fluid"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                4.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="mb-1">
                              <Link href={all_routes.busDetails}>Trail Star</Link>
                            </h5>
                            <div className="d-flex mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-01.svg" />
                              </span>
                              <p className="fs-14 me-2 mb-0">Tata</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                AC Sleeper
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="mb-1 fs-14">Seattle</h5>
                                  <p>06:00 PM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small>13h 20m</small>
                                  </span>
                                </div>
                                <div>
                                  <h5 className="mb-1 fs-14">Denver</h5>
                                  <p>07:20 AM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-12.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  14 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">
                                <span>From </span>$510
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 6. Enviro Bus */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-6.jpg"
                                className="img-fluid"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                5.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="mb-1">
                              <Link href={all_routes.busDetails}>Enviro Bus</Link>
                            </h5>
                            <div className="d-flex mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-02.svg" />
                              </span>
                              <p className="fs-14 me-2 mb-0">Ashok Leyland</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                Seater
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="mb-1 fs-14">Portland</h5>
                                  <p>01:10 PM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small>12h 45m</small>
                                  </span>
                                </div>
                                <div>
                                  <h5 className="mb-1 fs-14">Salt Lake</h5>
                                  <p>12:35 PM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-14.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  15 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">
                                <span>From </span>$190
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 7. City Mover */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-7.jpg"
                                className="img-fluid"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                5.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="mb-1">
                              <Link href={all_routes.busDetails}>City Mover</Link>
                            </h5>
                            <div className="d-flex mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-03.svg" />
                              </span>
                              <p className="fs-14 me-2 mb-0">Tata</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                AC
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="mb-1 fs-14">Houston</h5>
                                  <p>08:30 AM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small>09h 55m</small>
                                  </span>
                                </div>
                                <div>
                                  <h5 className="mb-1 fs-14">Orleans</h5>
                                  <p>06:25 PM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-top pt-3">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-15.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  16 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">From $160</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 8. City Shuttle */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-8.jpg"
                                className="img-fluid"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                4.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="mb-1">
                              <Link href={all_routes.busDetails}>City Shuttle</Link>
                            </h5>
                            <div className="d-flex mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-01.svg" />
                              </span>
                              <p className="fs-14 me-2 mb-0">Volvo</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                AC Sleeper
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="mb-1 fs-14">Phoenix</h5>
                                  <p>01:40 PM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small>04h 15m</small>
                                  </span>
                                </div>
                                <div>
                                  <h5 className="mb-1 fs-14">Vegas</h5>
                                  <p>08:55 PM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-top pt-3">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-19.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  09 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">From $650</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 9. Volt Voyage */}
                      <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="place-item mb-4 flex-fill bus-grid">
                          <div className="place-img">
                            <Link href={all_routes.busDetails}>
                              <ImageWithBasePath
                                src="assets/img/bus/grid/bus-grid-img-9.jpg"
                                className="img-fluid"
                              />
                            </Link>
                            <div className="fav-item">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="fav-icon me-2"
                                >
                                  <i className="isax isax-heart5" />
                                </Link>
                                <span className="badge bg-indigo">
                                  Cheapest
                                </span>
                              </div>
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                                5.0
                              </span>
                            </div>
                          </div>
                          <div className="place-content">
                            <h5 className="mb-1">
                              <Link href={all_routes.busDetails}>Volt Voyage</Link>
                            </h5>
                            <div className="d-flex mb-3">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath src="assets/img/bus/bus-logo-02.svg" />
                              </span>
                              <p className="fs-14 me-2 mb-0">Tata</p>
                              <p className="fs-14 mb-0">
                                <i className="ti ti-point-filled text-primary me-2" />
                                Sleeper
                              </p>
                            </div>
                            <div className="date-info p-2 mb-3">
                              <div className="bus-title d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="mb-1 fs-14">Diego</h5>
                                  <p>04:15 PM</p>
                                </div>
                                <div className="dot-line">
                                  <span>
                                    <small>15h 30m</small>
                                  </span>
                                </div>
                                <div>
                                  <h5 className="mb-1 fs-14">Sacram</h5>
                                  <p>05:45 AM</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-top pt-3">
                              <div className="d-flex align-items-center">
                                <ImageWithBasePath
                                  src="assets/img/users/user-20.jpg"
                                  className="avatar avatar-sm rounded-circle"
                                />
                                <span className="badge bg-outline-success fs-10 fw-medium ms-2">
                                  12 Seats Left
                                </span>
                              </div>
                              <h6 className="text-primary">From $375</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {/* Pagination */}
                      <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                          <li className="page-item disabled">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-left" />
                              </span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" href="#">
                              4
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#">
                              5
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="fa-solid fa-chevron-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      {/* /Pagination */}
                    </div>
                  </div>
                </div>
                {/* /Bus list */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

      <AgentListingModal />
    </div>
  );
};

export default AgentListings;
