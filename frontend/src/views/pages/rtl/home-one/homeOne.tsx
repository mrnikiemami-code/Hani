"use client";
import { useState } from 'react'
import Link from "next/link";
import { DatePicker, TimePicker } from '../../../../components/common-date-picker/appDatePicker'
import SearchBy from './searchBy';
import SectionBenefit from './sectionBenefit';
import PlaceSections from './placeSection';
import AboutSection from './about-section';
import ExpertSection from './experts-section';
import TestimonialSection from './testimonialSection';
import UpdateSection from './updateSection';
import ImageWithBasePath from '../../../../components/image-with-base-path';
import BannerCounter from '../../../../components/banner-counter/counter';
import { parseTime } from '../../../../utils/dateFormat'
import AppSwiper from '../../../../components/app-swiper'
import { useDocumentAttribute } from '../../../../hooks/useDocumentAttribute'
import { all_routes } from '../../../../routes/all_routes';
const HomeOneRTL = () => {
  const [defaultDate] = useState(new Date());
  const defaultTime = parseTime('10:30 AM');

  const [flightRadio, setFlightRadio] = useState<string>('oneway');
  const [carRadio, setCarRadio] = useState<string>('sams-drop');

  useDocumentAttribute("dir", "rtl");

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <AppSwiper preset="banner-slider">
          <div className="slider-img">
            <ImageWithBasePath src="assets/img/banner/banner-01.jpg" alt="Img" />
          </div>
          <div className="slider-img">
            <ImageWithBasePath src="assets/img/banner/banner-02.jpg" alt="Img" />
          </div>
          <div className="slider-img">
            <ImageWithBasePath src="assets/img/banner/banner-03.jpg" alt="Img" />
          </div>
          <div className="slider-img">
            <ImageWithBasePath src="assets/img/banner/banner-04.jpg" alt="Img" />
          </div>
        </AppSwiper>
        <div className="container">
          <div className="hero-content">
            <div className="row align-items-center">
              <div className="col-md-12 mx-auto wow fadeInUp" data-wow-delay="0.3s">
                <div className="banner-content mx-auto">
                  <h1 className="text-white display-5 mb-2">
                    Get Closer to the Dream: <span>Your Tour</span> Essentials Await
                  </h1>
                  <h6 className="text-light mx-auto">
                    Your ultimate destination for all things help you celebrate
                    &amp; remember tour experience.
                  </h6>
                </div>
                <div className="banner-form card mb-0">
                  <div className="card-header">
                    <ul className="nav">
                      <li>
                        <Link
                          href="#"
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#flight"
                        >
                          <i className="isax isax-airplane5 ms-2" />
                          Flights
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Hotels"
                        >
                          <i className="isax isax-buildings5 ms-2" />
                          Hotels
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Cars"
                        >
                          <i className="isax isax-car5 ms-2" />
                          Cars
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Cruise"
                        >
                          <i className="isax isax-ship5 ms-2" />
                          Cruise
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Tour"
                        >
                          <i className="isax isax-camera5 ms-2" />
                          Tour
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#bus"
                        >
                          <i className="isax isax-bus me-2" />
                          Bus
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="tab-content">
                        <div className="tab-pane fade active show" id="flight">
                          <form>
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                              <div className="d-flex align-items-center flex-wrap">
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="oneway"
                                    onChange={() => setFlightRadio("oneway")}
                                    checked={
                                      flightRadio === "oneway" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="oneway"
                                  >
                                    Oneway
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="roundtrip"
                                    onChange={() => setFlightRadio("roundtrip")}
                                    checked={
                                      flightRadio === "roundtrip" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="roundtrip"
                                  >
                                    Round Trip
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="multiway"
                                    defaultValue="multiway"
                                    onChange={() => setFlightRadio("multiway")}
                                    checked={
                                      flightRadio === "multiway" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="multiway"
                                  >
                                    Multi Trip
                                  </label>
                                </div>
                              </div>
                              <h6 className="fw-medium fs-16 mb-2">
                                Millions of cheap flights. One simple search
                              </h6>
                            </div>
                            <div
                              className="normal-trip"
                              style={{
                                display:
                                  flightRadio === "multiway" ? "none" : "block",
                              }}
                            >
                              <div className="d-lg-flex">
                                <div className="d-flex  form-info">
                                  <div className="form-item dropdown">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        From
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="New York"
                                      />
                                      <p className="fs-12 mb-0">
                                        John F. Kennedy International Airport
                                      </p>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>John F. Kennedy International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>
                                              Boston Logan International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>Dulles International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>
                                              Los Angeles International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>Orlando International Airport</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item dropdown ps-2 ps-sm-3">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        To
                                      </label>
                                      <h5>Las Vegas</h5>
                                      <p className="fs-12 mb-0">
                                        Harry Reid International Airport
                                      </p>
                                      <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                        <i className="fa-solid fa-arrow-right-arrow-left" />
                                      </span>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>John F. Kennedy International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>
                                              Boston Logan International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>Dulles International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>
                                              Los Angeles International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>Orlando International Airport</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item">
                                    <label className="form-label fs-14 text-default mb-1">
                                      Departure
                                    </label>
                                    <DatePicker
                                      className="form-control datetimepicker"
                                      placeholder="dd/mm/yyyy"
                                      defaultValue={defaultDate}
                                      disablePast
                                      format="DD-MM-YYYY"
                                    />
                                    <p className="fs-12 mb-0">Monday</p>
                                  </div>
                                  <div
                                    className="form-item round-drip"
                                    style={{
                                      display:
                                        flightRadio === "roundtrip"
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Return
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control datetimepicker"
                                      defaultValue="23-10-2024"
                                    />
                                    <p className="fs-12 mb-0">Wednesday</p>
                                  </div>
                                  <div className="form-item dropdown">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        Travellers and cabin class
                                      </label>
                                      <h5>
                                        4{" "}
                                        <span className="fw-normal fs-14">
                                          Persons
                                        </span>
                                      </h5>
                                      <p className="fs-12 mb-0">
                                        1 Adult, Economy
                                      </p>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                      <h5 className="mb-3">
                                        Select Travelers &amp; Class
                                      </h5>
                                      <div className="mb-3 border br-10 info-item pb-1">
                                        <h6 className="fs-16 fw-medium mb-2">
                                          Travellers
                                        </h6>
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label className="form-label text-gray-9 mb-2">
                                                Adults{" "}
                                                <span className="text-default fw-normal">
                                                  ( 12+ Yrs )
                                                </span>
                                              </label>
                                              <BannerCounter />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label className="form-label text-gray-9 mb-2">
                                                Childrens{" "}
                                                <span className="text-default fw-normal">
                                                  ( 2-12 Yrs )
                                                </span>
                                              </label>
                                              <BannerCounter />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label className="form-label text-gray-9 mb-2">
                                                Infants
                                                <span className="text-default fw-normal">
                                                  ( 0-12 Yrs )
                                                </span>
                                              </label>
                                              <BannerCounter />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mb-3 border br-10 info-item pb-1">
                                        <h6 className="fs-16 fw-medium mb-2">
                                          Travellers
                                        </h6>
                                        <div className="d-flex align-items-center flex-wrap">
                                          <div className="form-check me-3 mb-3">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              defaultValue="Economy"
                                              name="cabin-class"
                                              id="economy"
                                              defaultChecked
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="economy"
                                            >
                                              Economy
                                            </label>
                                          </div>
                                          <div className="form-check me-3 mb-3">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              defaultValue="Economy"
                                              name="cabin-class"
                                              id="premium-economy"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="premium-economy"
                                            >
                                              Premium Economy
                                            </label>
                                          </div>
                                          <div className="form-check me-3 mb-3">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              defaultValue="Business"
                                              name="cabin-class"
                                              id="business"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="business"
                                            >
                                              Business
                                            </label>
                                          </div>
                                          <div className="form-check mb-3">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              defaultValue="First Class"
                                              name="cabin-class"
                                              id="first-class"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="first-class"
                                            >
                                              First Class
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-end">
                                        <Link
                                          href="#"
                                          className="btn btn-light btn-sm me-2"
                                        >
                                          Cancel
                                        </Link>

                                        <Link
                                          href={all_routes.flightGrid}
                                          className="btn btn-primary btn-sm"
                                        >
                                          Apply
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Link
                                  href={all_routes.flightGrid}
                                  className="btn btn-primary search-btn rounded"
                                >
                                  Search
                                </Link>
                              </div>
                            </div>
                            <div
                              className="multi-trip"
                              style={{
                                display:
                                  flightRadio === "multiway" ? "block" : "none",
                              }}
                            >
                              <div className="d-lg-flex">
                                <div className="d-flex  form-info">
                                  <div className="form-item dropdown">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        From
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="New York"
                                      />
                                      <p className="fs-12 mb-0">
                                        John F. Kennedy International Airport
                                      </p>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>John F. Kennedy International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>
                                              Boston Logan International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>Dulles International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>
                                              Los Angeles International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>Orlando International Airport</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item dropdown ps-2 ps-sm-3">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        To
                                      </label>
                                      <h5>Las Vegas</h5>
                                      <p className="fs-12 mb-0">
                                        Harry Reid International Airport
                                      </p>
                                      <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                        <i className="fa-solid fa-arrow-right-arrow-left" />
                                      </span>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>John F. Kennedy International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>
                                              Boston Logan International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>Dulles International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>
                                              Los Angeles International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>Orlando International Airport</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item">
                                    <label className="form-label fs-14 text-default mb-1">
                                      Departure
                                    </label>
                                    <DatePicker
                                      className="form-control datetimepicker"
                                      placeholder="dd/mm/yyyy"
                                      defaultValue={defaultDate}
                                      disablePast
                                      format="DD-MM-YYYY"
                                    />
                                    <p className="fs-12 mb-0">Monday</p>
                                  </div>
                                </div>
                                <Link
                                  href={all_routes.flightGrid}
                                  className="btn btn-primary search-btn rounded"
                                >
                                  Search
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane fade" id="Hotels">
                          <form>
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                              <h6 className="fw-medium fs-16 mb-2">
                                Book Hotel - Villas, Apartments &amp; more.
                              </h6>
                            </div>
                            <div className="d-lg-flex">
                              <div className="d-flex  form-info">
                                <div className="form-item dropdown">
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      City, Property name or Location
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="New York"
                                    />
                                    <p className="fs-12 mb-0">USA</p>
                                  </div>
                                  <div className="dropdown-menu dropdown-md p-0">
                                    <div className="input-search p-3 border-bottom">
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search for City, Property name or Location"
                                        />
                                        <span className="input-group-text px-2 border-start-0">
                                          <i className="isax isax-search-normal" />
                                        </span>
                                      </div>
                                    </div>
                                    <ul>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            USA
                                          </h6>
                                          <p>2000 Properties</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Japan
                                          </h6>
                                          <p>3000 Properties</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Singapore
                                          </h6>
                                          <p>8000 Properties</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Russia
                                          </h6>
                                          <p>8000 Properties</p>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Germany
                                          </h6>
                                          <p>2000 Properties</p>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    Check In
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Monday</p>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    Check Out
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Monday</p>
                                </div>
                                <div className="form-item dropdown">
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Guests
                                    </label>
                                    <h5>
                                      4{" "}
                                      <span className="fw-normal fs-14">
                                        Persons
                                      </span>
                                    </h5>
                                    <p className="fs-12 mb-0">
                                      4 Adult, 2 Rooms
                                    </p>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                    <h5 className="mb-3">
                                      Select Travelers &amp; Class
                                    </h5>
                                    <div className="mb-3 border br-10 info-item pb-1">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <label className="form-label text-gray-9 mb-2">
                                              Rooms
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <label className="form-label text-gray-9 mb-2">
                                              Adults
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <label className="form-label text-gray-9 mb-2">
                                              Children{" "}
                                              <span className="text-default fw-normal">
                                                ( 2-12 Yrs )
                                              </span>
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <label className="form-label text-gray-9 mb-2">
                                              Infants{" "}
                                              <span className="text-default fw-normal">
                                                ( 0-12 Yrs )
                                              </span>
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3 border br-10 info-item pb-1">
                                      <h6 className="fs-16 fw-medium mb-2">
                                        Travellers
                                      </h6>
                                      <div className="d-flex align-items-center flex-wrap">
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="room"
                                            id="room1"
                                            defaultChecked
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="room1"
                                          >
                                            Single
                                          </label>
                                        </div>
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="room"
                                            id="room2"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="room2"
                                          >
                                            Double
                                          </label>
                                        </div>
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="room"
                                            id="room3"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="room3"
                                          >
                                            Delux
                                          </label>
                                        </div>
                                        <div className="form-check mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="room"
                                            id="room4"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="room4"
                                          >
                                            Suite
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3 border br-10 info-item pb-1">
                                      <h6 className="fs-16 fw-medium mb-2">
                                        Property Type
                                      </h6>
                                      <div className="d-flex align-items-center flex-wrap">
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="property"
                                            id="property1"
                                            defaultChecked
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="property1"
                                          >
                                            Villa
                                          </label>
                                        </div>
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="property"
                                            id="property2"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="property2"
                                          >
                                            Condo
                                          </label>
                                        </div>
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="property"
                                            id="property3"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="property3"
                                          >
                                            Cabin
                                          </label>
                                        </div>
                                        <div className="form-check mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="property"
                                            id="property4"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="property4"
                                          >
                                            Apartments
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <Link
                                        href="#"
                                        className="btn btn-light btn-sm me-2"
                                      >
                                        Cancel
                                      </Link>

                                      <Link
                                        href={all_routes.hotelGrid}
                                        className="btn btn-primary btn-sm"
                                      >
                                        Apply
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-item dropdown">
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Price per Night
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="$1000 - $15000"
                                    />
                                    <p className="fs-12 mb-0">
                                      20 Offers Available
                                    </p>
                                  </div>
                                  <div className="dropdown-menu dropdown-md p-0">
                                    <ul>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            $500 - $2000
                                          </h6>
                                          <p>Upto 65% offers</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Upto 65% offers
                                          </h6>
                                          <p>Upto 40% offers</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            $5000 - $8000
                                          </h6>
                                          <p>Upto 35% offers</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            $9000 - $11000
                                          </h6>
                                          <p>Upto 20% offers</p>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            $11000 - $15000
                                          </h6>
                                          <p>Upto 10% offers</p>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <Link
                                href={all_routes.hotelGrid}
                                className="btn btn-primary search-btn rounded"
                              >
                                Search
                              </Link>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane fade" id="Cars">
                          <form>
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                              <div className="d-flex align-items-center flex-wrap">
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="drop"
                                    id="same-drop"
                                    defaultValue="same-drop"
                                    onChange={() => setCarRadio("same-drop")}
                                    checked={
                                      carRadio === "same-drop" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="same-drop"
                                  >
                                    Same drop-off
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="drop"
                                    id="different-drop"
                                    defaultValue="different-drop"
                                    onChange={() =>
                                      setCarRadio("different-drop")
                                    }
                                    checked={
                                      carRadio === "different-drop"
                                        ? true
                                        : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="different-drop"
                                  >
                                    Different Drop off
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="drop"
                                    id="airport"
                                    defaultValue="airport"
                                    onChange={() => setCarRadio("airport")}
                                    checked={
                                      carRadio === "airport" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="airport"
                                  >
                                    Airport
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="drop"
                                    id="hourly-drop"
                                    defaultValue="hourly-drop"
                                    onChange={() => setCarRadio("hourly-drop")}
                                    checked={
                                      carRadio === "hourly-drop" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="hourly-drop"
                                  >
                                    Hourly Package
                                  </label>
                                </div>
                              </div>
                              <h6 className="fw-medium fs-16 mb-2">
                                Book Car for rental
                              </h6>
                            </div>
                            <div className="d-lg-flex">
                              <div className="d-flex  form-info">
                                <div
                                  className="form-item dropdown from-location"
                                  style={{
                                    display:
                                      carRadio === "airport" ? "none" : "block",
                                  }}
                                >
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      From
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="New York"
                                    />
                                    <p className="fs-12 mb-0">USA</p>
                                  </div>
                                  <div className="dropdown-menu dropdown-md p-0">
                                    <div className="input-search p-3 border-bottom">
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search for Cars"
                                        />
                                        <span className="input-group-text px-2 border-start-0">
                                          <i className="isax isax-search-normal" />
                                        </span>
                                      </div>
                                    </div>
                                    <ul>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            USA
                                          </h6>
                                          <p>2000 Cars</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Japan
                                          </h6>
                                          <p>3000 Cars</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Singapore
                                          </h6>
                                          <p>8000 Cars</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Russia
                                          </h6>
                                          <p>8000 Cars</p>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Germany
                                          </h6>
                                          <p>6000 Cars</p>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div
                                  className="form-item dropdown pickup-airport"
                                  style={{
                                    display:
                                      carRadio === "airport" ? "block" : "none",
                                  }}
                                >
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      From
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="New York"
                                    />
                                    <p className="fs-12 mb-0">
                                      John F. Kennedy International Airport
                                    </p>
                                  </div>
                                  <div className="dropdown-menu dropdown-md p-0">
                                    <div className="input-search p-3 border-bottom">
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search for Airport"
                                        />
                                        <span className="input-group-text px-2 border-start-0">
                                          <i className="isax isax-search-normal" />
                                        </span>
                                      </div>
                                    </div>
                                    <ul>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Hartsfield-Jackson Atlanta
                                            International
                                          </h6>
                                          <p>USA</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Dallas/Fort Worth International
                                          </h6>
                                          <p>USA</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            London Heathrow
                                          </h6>
                                          <p>UK</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Seoul Incheon
                                          </h6>
                                          <p>South Korea</p>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Singapore Changi International
                                          </h6>
                                          <p>Singapore</p>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div
                                  className="form-item dropdown to-location ps-2 ps-sm-3"
                                  style={{
                                    display:
                                      carRadio === "airport" ? "block" : "none",
                                  }}
                                >
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      To
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="New York"
                                    />
                                    <p className="fs-12 mb-0">USA</p>
                                    <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                      <i className="fa-solid fa-arrow-right-arrow-left" />
                                    </span>
                                  </div>
                                  <div className="dropdown-menu dropdown-md p-0">
                                    <div className="input-search p-3 border-bottom">
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search for Cars"
                                        />
                                        <span className="input-group-text px-2 border-start-0">
                                          <i className="isax isax-search-normal" />
                                        </span>
                                      </div>
                                    </div>
                                    <ul>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            USA
                                          </h6>
                                          <p>2000 Cars</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Japan
                                          </h6>
                                          <p>3000 Cars</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Singapore
                                          </h6>
                                          <p>8000 Cars</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Russia
                                          </h6>
                                          <p>8000 Cars</p>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Germany
                                          </h6>
                                          <p>6000 Cars</p>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    Departure
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Monday</p>
                                </div>
                                <div
                                  className="form-item return-drop"
                                  style={{
                                    display:
                                      carRadio === "different-drop"
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <label className="form-label fs-14 text-default mb-1">
                                    Return
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Wednesday</p>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    Pickup Time
                                  </label>
                                  <TimePicker
                                    defaultValue={defaultTime}
                                    format="h:mm A"
                                    className="form-control timepicker"
                                  />
                                </div>
                                <div
                                  className="form-item dropoff-time"
                                  style={{
                                    display:
                                      carRadio === "different-drop"
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <label className="form-label fs-14 text-default mb-1">
                                    Dropoff Time
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control timepicker"
                                    defaultValue="11:45 PM"
                                  />
                                </div>
                                <div
                                  className="form-item hourly-time"
                                  style={{
                                    display:
                                      carRadio === "hourly-drop"
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <label className="form-label fs-14 text-default mb-1">
                                    Hours
                                  </label>
                                  <h5>02 Hrs 10 Kms</h5>
                                </div>
                              </div>

                              <Link
                                href={all_routes.carGrid}
                                className="btn btn-primary search-btn rounded"
                              >
                                Search
                              </Link>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane fade" id="Cruise">
                          <form>
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                              <h6 className="fw-medium fs-16 mb-2">
                                Search For Cruise
                              </h6>
                            </div>
                            <div className="d-lg-flex">
                              <div className="d-flex  form-info">
                                <div className="form-item dropdown">
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Destination
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="New York"
                                    />
                                    <p className="fs-12 mb-0">USA</p>
                                  </div>
                                  <div className="dropdown-menu dropdown-md p-0">
                                    <div className="input-search p-3 border-bottom">
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search Location"
                                        />
                                        <span className="input-group-text px-2 border-start-0">
                                          <i className="isax isax-search-normal" />
                                        </span>
                                      </div>
                                    </div>
                                    <ul>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            New York
                                          </h6>
                                          <p>John F. Kennedy International Airport</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Boston
                                          </h6>
                                          <p>
                                            Boston Logan International Airport
                                          </p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Northern Virginia
                                          </h6>
                                          <p>Dulles International Airport</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Los Angeles
                                          </h6>
                                          <p>
                                            Los Angeles International Airport
                                          </p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Orlando
                                          </h6>
                                          <p>Orlando International Airport</p>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    Start Date
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Monday</p>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    End Date
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Monday</p>
                                </div>
                                <div className="form-item dropdown">
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Travellers &amp; Cabin{" "}
                                    </label>
                                    <h5>
                                      4{" "}
                                      <span className="fw-normal fs-14">
                                        Persons
                                      </span>
                                    </h5>
                                    <p className="fs-12 mb-0">
                                      4 Adult, 2 Rooms
                                    </p>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                    <h5 className="mb-3">
                                      Select Travelers &amp; Class
                                    </h5>
                                    <div className="mb-3 border br-10 info-item pb-1">
                                      <h6 className="fs-16 fw-medium mb-2">
                                        Travellers
                                      </h6>
                                      <div className="row">
                                        <div className="col-md-4">
                                          <div className="mb-3">
                                            <label className="form-label text-gray-9 mb-2">
                                              Adults{" "}
                                              <span className="text-default fw-normal">
                                                ( 12+ Yrs )
                                              </span>
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="mb-3">
                                            <label className="form-label text-gray-9 mb-2">
                                              Childrens{" "}
                                              <span className="text-default fw-normal">
                                                ( 2-12 Yrs )
                                              </span>
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="mb-3">
                                            <label className="form-label text-gray-9 mb-2">
                                              Infants{" "}
                                              <span className="text-default fw-normal">
                                                ( 0-12 Yrs )
                                              </span>
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mb-3 border br-10 info-item pb-1">
                                      <h6 className="fs-16 fw-medium mb-2">
                                        Select Cabin
                                      </h6>
                                      <div className="d-flex align-items-center flex-wrap">
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="cabin"
                                            id="cabin1"
                                            defaultChecked
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="cabin1"
                                          >
                                            Solo cabins
                                          </label>
                                        </div>
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="cabin"
                                            id="cabin2"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="cabin2"
                                          >
                                            Balcony
                                          </label>
                                        </div>
                                        <div className="form-check me-3 mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            defaultValue="Business"
                                            name="cabin"
                                            id="cabin3"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="cabin3"
                                          >
                                            Oceanview
                                          </label>
                                        </div>
                                        <div className="form-check mb-3">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="cabin"
                                            id="cabin4"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="cabin4"
                                          >
                                            Balcony rooms
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <Link
                                        href="#"
                                        className="btn btn-light btn-sm me-2"
                                      >
                                        Cancel
                                      </Link>

                                      <Link
                                        href={all_routes.cruiseGrid}
                                        className="btn btn-primary btn-sm"
                                      >
                                        Apply
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Link
                                href={all_routes.cruiseGrid}
                                className="btn btn-primary search-btn rounded"
                              >
                                Search
                              </Link>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane fade" id="Tour">
                          <form>
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                              <h6 className="fw-medium fs-16 mb-2">
                                Search holiday packages &amp; trips
                              </h6>
                            </div>
                            <div className="d-lg-flex">
                              <div className="d-flex  form-info">
                                <div className="form-item dropdown">
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Where would like to go?
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="New York"
                                    />
                                    <p className="fs-12 mb-0">USA</p>
                                  </div>
                                  <div className="dropdown-menu dropdown-md p-0">
                                    <div className="input-search p-3 border-bottom">
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search for City, Property name or Location"
                                        />
                                        <span className="input-group-text px-2 border-start-0">
                                          <i className="isax isax-search-normal" />
                                        </span>
                                      </div>
                                    </div>
                                    <ul>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            USA
                                          </h6>
                                          <p>200 Places</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Japan
                                          </h6>
                                          <p>300 Places</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Singapore
                                          </h6>
                                          <p>80 Places</p>
                                        </Link>
                                      </li>
                                      <li className="border-bottom">
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Russia
                                          </h6>
                                          <p>500 Places</p>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          <h6 className="fs-16 fw-medium">
                                            Germany
                                          </h6>
                                          <p>150 Places</p>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    Dates
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Monday</p>
                                </div>
                                <div className="form-item">
                                  <label className="form-label fs-14 text-default mb-1">
                                    Check Out
                                  </label>
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    defaultValue={defaultDate}
                                    disablePast
                                    format="DD-MM-YYYY"
                                  />
                                  <p className="fs-12 mb-0">Wednesday</p>
                                </div>
                                <div className="form-item dropdown">
                                  <div
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="menu"
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Travellers
                                    </label>
                                    <h5>
                                      4{" "}
                                      <span className="fw-normal fs-14">
                                        Persons
                                      </span>
                                    </h5>
                                    <p className="fs-12 mb-0">2 Adult</p>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                    <h5 className="mb-3">Select Travelers</h5>
                                    <div className="mb-3 border br-10 info-item pb-1">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <label className="form-label text-gray-9 mb-2">
                                              Adult
                                            </label>
                                            <BannerCounter />
                                          </div>
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <label className="form-label text-gray-9 mb-2">
                                              Childrens{" "}
                                              <span className="text-default fw-normal">
                                                ( 12+ Yrs )
                                              </span>
                                            </label>
                                            <BannerCounter />
                                          </div>
                                          <div className="mb-3 d-flex align-items-center justify-content-between">
                                            <label className="form-label text-gray-9 mb-2">
                                              Infants{" "}
                                              <span className="text-default fw-normal">
                                                ( 12+ Yrs )
                                              </span>
                                            </label>
                                            <BannerCounter />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <Link
                                        href="#"
                                        className="btn btn-light btn-sm me-2"
                                      >
                                        Cancel
                                      </Link>
                                      <Link
                                        href={all_routes.tourGrid}
                                        className="btn btn-primary btn-sm"
                                      >
                                        Apply
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Link
                                href={all_routes.tourGrid}
                                className="btn btn-primary search-btn rounded"
                              >
                                Search
                              </Link>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane fade" id="bus">
                          <form>
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                              <div className="d-flex align-items-center flex-wrap">
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="oneway"
                                    onChange={() => setFlightRadio("oneway")}
                                    checked={
                                      flightRadio === "oneway" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="oneway"
                                  >
                                    Oneway
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="roundtrip"
                                    onChange={() => setFlightRadio("roundtrip")}
                                    checked={
                                      flightRadio === "roundtrip" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="roundtrip"
                                  >
                                    Round Trip
                                  </label>
                                </div>
                              </div>
                              <h6 className="fw-medium fs-16 mb-2">
                                Low cost Buses in One simple search
                              </h6>
                            </div>
                            <div
                              className="normal-trip"
                              style={{
                                display:
                                  flightRadio === "multiway" ? "none" : "block",
                              }}
                            >
                              <div className="d-lg-flex">
                                <div className="d-flex  form-info">
                                  <div className="form-item dropdown">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        From
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="New York"
                                      />
                                      <p className="fs-12 mb-0">USA</p>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>Spain</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item dropdown ps-2 ps-sm-3">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        To
                                      </label>
                                      <h5>Las Vegas</h5>
                                      <p className="fs-12 mb-0">USA</p>
                                      <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                        <i className="fa-solid fa-arrow-right-arrow-left" />
                                      </span>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>Spain</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>USA</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item">
                                    <label className="form-label fs-14 text-default mb-1">
                                      Departure
                                    </label>
                                    <DatePicker
                                      className="form-control datetimepicker"
                                      placeholder="dd/mm/yyyy"
                                      defaultValue={defaultDate}
                                      disablePast
                                      format="DD-MM-YYYY"
                                    />
                                    <p className="fs-12 mb-0">Monday</p>
                                  </div>
                                  <div
                                    className="form-item round-drip"
                                    style={{
                                      display:
                                        flightRadio === "roundtrip"
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    <label className="form-label fs-14 text-default mb-1">
                                      Return
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control datetimepicker"
                                      defaultValue="23-10-2024"
                                    />
                                    <p className="fs-12 mb-0">Wednesday</p>
                                  </div>
                                  <div className="form-item dropdown">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        Travellers
                                      </label>
                                      <h5>
                                        4{" "}
                                        <span className="fw-normal fs-14">
                                          Persons
                                        </span>
                                      </h5>
                                      <p className="fs-12 mb-0">
                                        2 Adult, 2 Children
                                      </p>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                      <h5 className="mb-3">
                                        Select Travelers &amp; Class
                                      </h5>
                                      <div className="mb-3 border br-10 info-item pb-1">
                                        <h6 className="fs-16 fw-medium mb-2">
                                          Travellers
                                        </h6>
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label className="form-label text-gray-9 mb-2">
                                                Adults{" "}
                                                <span className="text-default fw-normal">
                                                  ( 12+ Yrs )
                                                </span>
                                              </label>
                                              <BannerCounter />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label className="form-label text-gray-9 mb-2">
                                                Childrens{" "}
                                                <span className="text-default fw-normal">
                                                  ( 2-12 Yrs )
                                                </span>
                                              </label>
                                              <BannerCounter />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label className="form-label text-gray-9 mb-2">
                                                Infants
                                                <span className="text-default fw-normal">
                                                  ( 0-12 Yrs )
                                                </span>
                                              </label>
                                              <BannerCounter />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mb-3 border br-10 info-item pb-1">
                                        <h6 className="fs-16 fw-medium mb-2">
                                          Travellers
                                        </h6>
                                        <div className="d-flex align-items-center flex-wrap">
                                          <div className="form-check me-3 mb-3">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              defaultValue="Seater"
                                              name="cabin-class"
                                              id="Seater"
                                              defaultChecked
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="Seater"
                                            >
                                              Seater
                                            </label>
                                          </div>
                                          <div className="form-check me-3 mb-3">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              defaultValue="Sleeper"
                                              name="cabin-class"
                                              id="Sleeper"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="Sleeper"
                                            >
                                              Sleeper
                                            </label>
                                          </div>
                                          <div className="form-check me-3 mb-3">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              defaultValue="AC Sleeprt"
                                              name="cabin-class"
                                              id="AC_sleeprt"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="Ac_Sleeprt"
                                            >
                                              AC Sleeprt
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-end">
                                        <Link
                                          href="#"
                                          className="btn btn-light btn-sm me-2"
                                        >
                                          Cancel
                                        </Link>

                                        <Link
                                          href={all_routes.flightGrid}
                                          className="btn btn-primary btn-sm"
                                        >
                                          Apply
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Link
                                  href={all_routes.flightGrid}
                                  className="btn btn-primary search-btn rounded"
                                >
                                  Search
                                </Link>
                              </div>
                            </div>
                            <div
                              className="multi-trip"
                              style={{
                                display:
                                  flightRadio === "multiway" ? "block" : "none",
                              }}
                            >
                              <div className="d-lg-flex">
                                <div className="d-flex  form-info">
                                  <div className="form-item dropdown">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        From
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="New York"
                                      />
                                      <p className="fs-12 mb-0">
                                        John F. Kennedy International Airport
                                      </p>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>John F. Kennedy International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>
                                              Boston Logan International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>Dulles International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>
                                              Los Angeles International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>Orlando International Airport</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item dropdown ps-2 ps-sm-3">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      role="menu"
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        To
                                      </label>
                                      <h5>Las Vegas</h5>
                                      <p className="fs-12 mb-0">
                                        Harry Reid International Airport
                                      </p>
                                      <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                        <i className="fa-solid fa-arrow-right-arrow-left" />
                                      </span>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                      <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Location"
                                          />
                                          <span className="input-group-text px-2 border-start-0">
                                            <i className="isax isax-search-normal" />
                                          </span>
                                        </div>
                                      </div>
                                      <ul>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              New York
                                            </h6>
                                            <p>John F. Kennedy International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Boston
                                            </h6>
                                            <p>
                                              Boston Logan International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Northern Virginia
                                            </h6>
                                            <p>Dulles International Airport</p>
                                          </Link>
                                        </li>
                                        <li className="border-bottom">
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Los Angeles
                                            </h6>
                                            <p>
                                              Los Angeles International Airport
                                            </p>
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            <h6 className="fs-16 fw-medium">
                                              Orlando
                                            </h6>
                                            <p>Orlando International Airport</p>
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="form-item">
                                    <label className="form-label fs-14 text-default mb-1">
                                      Departure
                                    </label>
                                    <DatePicker
                                      className="form-control datetimepicker"
                                      placeholder="dd/mm/yyyy"
                                      defaultValue={defaultDate}
                                      disablePast
                                      format="DD-MM-YYYY"
                                    />
                                    <p className="fs-12 mb-0">Monday</p>
                                  </div>
                                </div>
                                <Link
                                  href={all_routes.flightGrid}
                                  className="btn btn-primary search-btn rounded"
                                >
                                  Search
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Hero Section */}
      <SearchBy />
      <SectionBenefit />
      <PlaceSections />
      <AboutSection />
      <ExpertSection />
      <TestimonialSection />
      <UpdateSection />
    </>

  )
}

export default HomeOneRTL