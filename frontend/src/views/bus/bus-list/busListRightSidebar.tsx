"use client";
import { useState } from "react";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "../../../components/image-with-base-path";
import Link from "next/link";
import BusOffcanvas from "../Busoffcanvas";
import BusFilter from "./brandsFilter";
import Slider from '../../../components/app-slider/appSlider'
import BusSearch from "../busSearch";

const BusListRightSidebar = () => {
  const routes = all_routes;
  const [disabled, _setDisabled] = useState(false);
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Bus List with Right Sidebar",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Bus",
      active: false,
    },
    {
      label: "Bus List with Right Sidebar",
      active: true,
    },
  ];


  return (
    <>
      <Breadcrumb
        title="Bus List with Right Sidebar"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          {/* Bus Search */}
         <BusSearch/>
          {/* /Bus Search */}

          {/* Bus Types */}
          <div className="mb-2">
            <div className="mb-3">
              <h5 className="mb-2">Choose type of Buses you are interested</h5>
            </div>
            <div className="row">
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={all_routes.busDetails} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/bus/buses-img-01.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={all_routes.busDetails}>Luxury Bus</Link>
                    </h6>
                    <p className="fs-14">124 Routes</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={all_routes.busDetails} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/bus/buses-img-02.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={all_routes.busDetails}>Sleeper Coach</Link>
                    </h6>
                    <p className="fs-14">96 Routes</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={all_routes.busDetails} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/bus/buses-img-03.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={all_routes.busDetails}>AC Seater</Link>
                    </h6>
                    <p className="fs-14">129 Routes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Bus Types */}
          <div className="row">
            <div className="col-xl-9 col-lg-9">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-3">1920 Buses Found on Your Search</h6>
                <div className="d-flex align-items-center flex-wrap">
                  <div className="dropdown mb-3">
                    <Link
                      href="#"
                      className="dropdown-toggle py-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="fw-medium text-gray-9">Sort By : </span>
                      Recommended
                    </Link>
                    <div className="dropdown-menu dropdown-sm">
                      <form>
                        <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend1"
                          >
                            Recommended
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend2"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend2"
                          >
                            Price: low to high
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend3"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend3"
                          >
                            Price: high to low
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend4"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend4"
                          >
                            Newest
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend5"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend5"
                          >
                            Ratings
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend6"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend6"
                          >
                            Reviews
                          </label>
                        </div>
                        <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                          <Link
                            href="#"
                            className="btn btn-light btn-sm me-2"
                          >
                            Reset
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                          >
                            Apply
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-info br-10 p-3 pb-2 mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center">
                    <i className="isax isax-info-circle me-2" />
                    Save an average of 15% on thousands of buses when you're
                    signed in
                  </p>
                  <Link
                    href={all_routes.login}
                    className="btn btn-white btn-sm mb-2"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="bus-list">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-01.jpg"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>
                                Red Bird Luxury
                              </Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-01.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2"> Tata</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href="#">Chicago</Link>
                              </h5>
                              <p>09:30 AM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">13h 10m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href="#">Miami</Link>
                              </h5>
                              <p>10:40 PM</p>
                            </div>
                          </div>
                          <div>
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $280
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Seater
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-02.jpg"
                            className="img-fluid"
                            alt="img"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>Elite Ride</Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-02.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Ashok Leyland</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Toronto</Link>
                              </h5>
                              <p>08:25 PM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">16h 25m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Bangkok</Link>
                              </h5>
                              <p>04:45 AM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $300
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Semi Sleeper
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-03.jpg"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>
                                Urban Glide
                              </Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-03.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Volvo</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Dallas</Link>
                              </h5>
                              <p>06:45 AM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">11h 40m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Atlanta</Link>
                              </h5>
                              <p>06:25 PM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $220
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Sleeper
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-04.jpg"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>Route Max</Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-01.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Tata</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>New York</Link>
                              </h5>
                              <p>07:00 AM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">10h 25m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Boston</Link>
                              </h5>
                              <p>05:25 PM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $180
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Seater
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-05.jpg"
                            className="img-fluid"
                            alt="img"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>Trail Star</Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-03.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Volvo</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Seattle</Link>
                              </h5>
                              <p>06:10 PM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">15h 30m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Denver</Link>
                              </h5>
                              <p>09:40 AM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $310
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Seater
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-06.jpg"
                            className="img-fluid"
                            alt="img"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>Enviro Bus</Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-02.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Ashok Leyland</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Portland</Link>
                              </h5>
                              <p>06:20 AM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">12h 45m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>
                                  Salt Lake City
                                </Link>
                              </h5>
                              <p>07:05 PM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $290
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Seater
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-07.jpg"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>City Mover</Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-01.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Tata</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Houston</Link>
                              </h5>
                              <p>08:30 AM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">08h 55m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>
                                  New Orleans
                                </Link>
                              </h5>
                              <p>05:25 PM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $160
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Seater
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-08.jpg"
                            className="img-fluid"
                            alt="img"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>
                                City Shuttle
                              </Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-03.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Volvo</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Phoenix</Link>
                              </h5>
                              <p>06:45 PM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">7h 15m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>
                                  Las Vegas
                                </Link>
                              </h5>
                              <p>02:00 AM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $150
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                AC Sleeper
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-09.jpg"
                            className="img-fluid"
                            alt="img"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>
                                Volt Voyage
                              </Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-01.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2"> Tata</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>
                                  San Diego
                                </Link>
                              </h5>
                              <p>09:15 PM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">13h 25m</small>
                              </span>
                            </div>
                            <div className="">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>
                                  Sacramento
                                </Link>
                              </h5>
                              <p>10:40 AM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $275
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Seater
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                    {/* Bus List */}
                    <div className="place-item p-4 mb-4">
                      <div className="place-img">
                        <Link href={all_routes.busDetails}>
                          <ImageWithBasePath
                            src="assets/img/bus/bus-img-10.jpg"
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
                          </div>
                        </div>
                      </div>
                      <div className="place-content">
                        <div className="bus-content">
                          <div className="bus-title-item">
                            <h5 className="text-truncate mb-1">
                              <Link href={all_routes.busDetails}>
                                Journey Jet
                              </Link>
                            </h5>
                            <div className="d-flex">
                              <span className="avatar avatar-sm me-2">
                                <ImageWithBasePath
                                  src="assets/img/bus/bus-logo-02.svg"
                                  className="rounded-circle"
                                  alt="icon"
                                />
                              </span>
                              <p className="fs-14 mb-0 me-2">Ashok Leyland</p>
                            </div>
                          </div>
                          <div className="bus-title">
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>Orlando</Link>
                              </h5>
                              <p>08:00 AM</p>
                            </div>
                            <div className="dot-line">
                              <span>
                                <small className="text-muted">16h 05m</small>
                              </span>
                            </div>
                            <div className="bus-title-item">
                              <h5 className="text-truncate mb-1">
                                <Link href={all_routes.busDetails}>
                                  Washington
                                </Link>
                              </h5>
                              <p>12:05 PM</p>
                            </div>
                          </div>
                          <div className="bus-title-item">
                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                              From
                              <span className="ms-1 fs-18 fw-semibold text-primary">
                                $340
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className="bus-footer">
                          <div className="d-flex align-items-center justify-content-between me-2">
                            <div className="me-2">
                              <span className="badge bg-light rounded-pill">
                                Sleeper
                              </span>
                            </div>
                            <div className="bus-footer-dot">
                              <span />
                            </div>
                            <div>
                              <span>
                                <i className="isax isax-home-wifi text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-location-tick text-gray-6 me-1" />
                              </span>
                              <span>
                                <i className="isax isax-hierarchy text-gray-6" />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-primary btn-md search-btn me-1"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#routes_details"
                              aria-controls="route"
                            >
                              Routes
                            </button>
                            <button
                              className="btn btn-dark btn-md search-btn"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#bus_details"
                              aria-controls="booing-now"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Bus List */}
                  </div>
                </div>
              </div>
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
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-3 theiaStickySidebar">
              <div className="stickysidebar">
                <div className="card filter-sidebar mb-4 mb-lg-0">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5>Filters</h5>
                    <Link href="#" className="fs-14 link-primary">
                      Reset
                    </Link>
                  </div>
                  <div className="card-body p-0">
                    <form>
                      <div className="accordion accordion-list">
                        <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                            <div
                              className="accordion-button p-0"
                              data-bs-toggle="collapse"
                              data-bs-target="#accordion-flight"
                              aria-expanded="true"
                              aria-controls="accordion-flight"
                              role="button"
                            >
                              <i className="isax isax-bus me-2 text-primary" />
                              Brands
                            </div>
                          </div>
                          <div
                            id="accordion-flight"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              <BusFilter />
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                            <div
                              className="accordion-button p-0"
                              data-bs-toggle="collapse"
                              data-bs-target="#accordion-types"
                              aria-expanded="true"
                              aria-controls="accordion-types"
                              role="button"
                            >
                              <i className="isax isax-candle me-2 text-primary" />
                              Type
                            </div>
                          </div>
                          <div
                            id="accordion-types"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              <div className="more-content">
                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                  <input
                                    className="form-check-input ms-0 mt-0"
                                    name="types1"
                                    type="checkbox"
                                    id="types1"
                                    defaultChecked
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="types1"
                                  >
                                    Seater
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                  <input
                                    className="form-check-input ms-0 mt-0"
                                    name="types2"
                                    type="checkbox"
                                    id="types2"
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="types2"
                                  >
                                    Sleeper
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                  <input
                                    className="form-check-input ms-0 mt-0"
                                    name="types3"
                                    type="checkbox"
                                    id="types3"
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="types3"
                                  >
                                    Semi Sleeper
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                  <input
                                    className="form-check-input ms-0 mt-0"
                                    name="types4"
                                    type="checkbox"
                                    id="types4"
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="types4"
                                  >
                                    AC Sleeper
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                  <input
                                    className="form-check-input ms-0 mt-0"
                                    name="types4"
                                    type="checkbox"
                                    id="types4"
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="types4"
                                  >
                                    AC Seater
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                            <div
                              className="accordion-button p-0"
                              data-bs-toggle="collapse"
                              data-bs-target="#accordion-popular"
                              aria-expanded="true"
                              aria-controls="accordion-popular"
                              role="button"
                            >
                              <i className="isax isax-coin me-2 text-primary" />
                              Price Per Day
                            </div>
                          </div>
                          <div
                            id="accordion-popular"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              <div className="filter-range">
                                <Slider
                                  range
                                  min={0}
                                  max={1000}
                                  defaultValue={[200, 800]}
                                  disabled={disabled}
                                />
                              </div>
                              <div className="filter-range-amount">
                                <p className="fs-14">
                                  Range :{" "}
                                  <span className="text-gray-9 fw-medium">
                                    $200 - $800
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                            <div
                              className="accordion-button p-0"
                              data-bs-toggle="collapse"
                              data-bs-target="#accordion-brand"
                              aria-expanded="true"
                              aria-controls="accordion-brand"
                              role="button"
                            >
                              <i className="isax isax-discount-shape me-2 text-primary" />
                              Reviews
                            </div>
                          </div>
                          <div
                            id="accordion-brand"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              <div className="form-check d-flex align-items-center ps-0 mb-2">
                                <input
                                  className="form-check-input ms-0 mt-0"
                                  name="review1"
                                  type="checkbox"
                                  id="review1"
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="review1"
                                >
                                  <span className="rating d-flex align-items-center">
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary" />
                                    <span className="ms-2">5 Star</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check d-flex align-items-center ps-0 mb-2">
                                <input
                                  className="form-check-input ms-0 mt-0"
                                  name="review2"
                                  type="checkbox"
                                  id="review2"
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="review2"
                                >
                                  <span className="rating d-flex align-items-center">
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary" />
                                    <span className="ms-2">4 Star</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check d-flex align-items-center ps-0 mb-2">
                                <input
                                  className="form-check-input ms-0 mt-0"
                                  name="review3"
                                  type="checkbox"
                                  id="review3"
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="review3"
                                >
                                  <span className="rating d-flex align-items-center">
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary" />
                                    <span className="ms-2">3 Star</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check d-flex align-items-center ps-0 mb-2">
                                <input
                                  className="form-check-input ms-0 mt-0"
                                  name="review4"
                                  type="checkbox"
                                  id="review4"
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="review4"
                                >
                                  <span className="rating d-flex align-items-center">
                                    <i className="fas fa-star filled text-primary me-1" />
                                    <i className="fas fa-star filled text-primary" />
                                    <span className="ms-2">2 Star</span>
                                  </span>
                                </label>
                              </div>
                              <div className="form-check d-flex align-items-center ps-0 mb-0">
                                <input
                                  className="form-check-input ms-0 mt-0"
                                  name="review5"
                                  type="checkbox"
                                  id="review5"
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="review5"
                                >
                                  <span className="rating d-flex align-items-center">
                                    <i className="fas fa-star filled text-primary" />
                                    <span className="ms-2">1 Star</span>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* /Sidebar */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <BusOffcanvas />
    </>
  );
};

export default BusListRightSidebar;
