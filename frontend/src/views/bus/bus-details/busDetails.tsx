"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BusSlider from './busSlider';
import { BusType } from '../../../core/data/mock/selectOption';
import CustomSelect from '../../../components/common-select/commonSelect';
import { useState } from 'react';
import BusAccordion from './busAccordion';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'

const BusDetails = () => {

  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Bus Details',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Bus',
      active: true,
    },
    {
      label: 'Bus Details',
      active: true,
    },
  ];

  // Initialize state for Adults, Infants, Children
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(1);
  const [children, setChildren] = useState(1);

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => prev + 1);
  };

  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => (prev > 0 ? prev - 1 : 0));
  };

  const [defaultDate] = useState(new Date());

  return (
    <div>
      <Breadcrumb
        title="Bus Details"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">

              <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                <div className="mb-2">
                  <h4 className="mb-2 d-flex align-items-center flex-wrap">
                    Red Bird Luxury
                    <span className="badge badge-xs bg-success rounded-pill ms-2 border-0">
                      <i className="isax isax-ticket-star5 me-1" />
                      Verified
                    </span>
                    <span className="badge badge-xs bg-indigo rounded-pill ms-2">
                      <i className="isax isax-star5 me-1" />
                      Cheapest
                    </span>
                  </h4>
                  <div className="d-flex align-items-center flex-wrap">
                    <p className="fs-14 mb-0 me-3 pe-3 border-end d-flex align-items-center mb-2">
                      <ImageWithBasePath src="assets/img/bus/bus-logo-01.svg" className="me-2" alt="Img" />{" "}
                      Tata
                    </p>
                    <p className="fs-14 mb-0 me-3 pe-3 border-end mb-2">
                      <span className="badge badge-md bg-orange rounded-pill ms-2">
                        Seater
                      </span>
                    </p>
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                        5.0
                      </span>
                      <p className="fs-14">
                        <Link href="#reviews">(400 Reviews)</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Link
                    href="#"
                    className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"
                  >
                    <i className="isax isax-share" />
                  </Link>
                  <Link
                    href="#"
                    className="btn btn-outline-light btn-sm d-inline-flex align-items-center"
                  >
                    <i className="isax isax-heart5 text-danger me-1" />
                    Save
                  </Link>
                </div>
              </div>

              {/* Slider */}
              <div>
                <BusSlider />
              </div>
              {/* /Slider */}
              <div className="card shadow-none bg-light-200">
                <div className="card-body pb-1">
                  <h5 className="d-flex align-items-center fs-18 mb-3">
                    <span className="avatar avatar-md rounded-circle bg-primary me-2">
                      <i className="isax isax-bus" />
                    </span>
                    Bus Information
                  </h5>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Registered On</h6>
                        <p>14 Feb 2021</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Transmission</h6>
                        <p>Manual</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Seats</h6>
                        <p>40</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Fuel</h6>
                        <p>200 Liters</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Weight</h6>
                        <p>8 Tons</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Height</h6>
                        <p>3.5 Meters</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Length</h6>
                        <p>12 Meters</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Top Speed</h6>
                        <p>100 km/h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <BusAccordion />
            </div>
            <div className="col-xl-4 theiaStickySidebar">
              <div className="stickysidebar">
                <div className="card shadow-none">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-4">
                      <span className="btn btn-outline-light flex-fill">
                        <span className="me-2">
                          <i className="isax isax-bus" />
                        </span>
                        New York
                      </span>
                      <Link
                        href="#"
                        className="way-icon badge badge-primary rounded-pill mx-2"
                      >
                        <i className="fa-solid fa-arrow-right-arrow-left" />
                      </Link>
                      <span className="btn btn-outline-light flex-fill">
                        <span className="me-2">
                          <i className="isax isax-bus" />
                        </span>
                        Las Vegas
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-3 mb-3">
                      <p className="fs-13 fw-medium mb-0">Starts From</p>
                      <h5 className="text-primary">
                        $500{" "}
                        <span className="fs-14 text-default fw-normal">/ Person</span>
                      </h5>
                    </div>
                    <h5 className="fs-18 mb-3">Check Availability</h5>
                    <div className="banner-form">
                      <form action="#" className="form-info border-0">
                        <div className="form-info border-0">
                          <div className="form-item dropdown border rounded p-3 mb-3 w-100">
                            <div
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="outside"
                              aria-expanded="false"
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
                                    <h6 className="fs-16 fw-medium">New York</h6>
                                    <p>USA</p>
                                  </Link>
                                </li>
                                <li className="border-bottom">
                                  <Link
                                    className="dropdown-item"
                                    href="#"
                                  >
                                    <h6 className="fs-16 fw-medium">Boston</h6>
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
                                    <h6 className="fs-16 fw-medium">Los Angeles</h6>
                                    <p>USA</p>
                                  </Link>
                                </li>
                                <li className="border-bottom">
                                  <Link
                                    className="dropdown-item"
                                    href="#"
                                  >
                                    <h6 className="fs-16 fw-medium">Orlando</h6>
                                    <p>USA</p>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="form-item dropdown border rounded p-2 mb-3 w-100">
                            <div
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="outside"
                              aria-expanded="false"
                              role="menu"
                            >
                              <label className="form-label fs-14 text-default mb-1">
                                To
                              </label>
                              <h5>Las Vegas</h5>
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
                                    <h6 className="fs-16 fw-medium">New York</h6>
                                    <p>USA</p>
                                  </Link>
                                </li>
                                <li className="border-bottom">
                                  <Link
                                    className="dropdown-item"
                                    href="#"
                                  >
                                    <h6 className="fs-16 fw-medium">Boston</h6>
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
                                    <h6 className="fs-16 fw-medium">Los Angeles</h6>
                                    <p>USA</p>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="dropdown-item"
                                    href="#"
                                  >
                                    <h6 className="fs-16 fw-medium">Orlando</h6>
                                    <p>USA</p>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="form-item border rounded p-3 mb-3 w-100">
                            <label className="form-label fs-14 text-default mb-1">
                              Departure
                            </label>
                            <DatePicker
                              className="form-control datetimepicker"
                              placeholder="dd/mm/yyyy"
                              defaultValue={defaultDate}
                              format="DD-MM-YYYY"
                            />
                            <p className="fs-12 mb-0">Monday</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fs-14 text-default mb-1">
                              Type
                            </label>
                            <CustomSelect
                              options={BusType}
                              className="select d-flex"
                              placeholder="Select"
                            />
                          </div>
                          <div className="card shadow-none mb-3">
                            <div className="card-body p-3 pb-0">
                              <div className="border-bottom pb-2 mb-2">
                                <h6>Details</h6>
                              </div>
                              <div className="custom-increment">
                                {/* Adults */}
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                  <label className="form-label text-gray-9 mb-0">Adults</label>
                                  <div className="custom-increment">
                                    <div className="input-group">
                                      <span className="input-group-btn float-start">
                                        <button
                                          type="button"
                                          className="quantity-left-minus btn btn-light btn-number"
                                          onClick={() => decrement(setAdults)}
                                        >
                                          <span><i className="isax isax-minus"></i></span>
                                        </button>
                                      </span>
                                      <input
                                        type="text"
                                        className="input-number"
                                        value={adults.toString().padStart(2, "0")}
                                        readOnly
                                      />
                                      <span className="input-group-btn float-end">
                                        <button
                                          type="button"
                                          className="quantity-right-plus btn btn-light btn-number"
                                          onClick={() => increment(setAdults)}
                                        >
                                          <span><i className="isax isax-add"></i></span>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Infants */}
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                  <label className="form-label text-gray-9 mb-0">
                                    Infants <span className="text-default fw-normal">( 0-12 Yrs )</span>
                                  </label>
                                  <div className="custom-increment">
                                    <div className="input-group">
                                      <span className="input-group-btn float-start">
                                        <button
                                          type="button"
                                          className="quantity-left-minus btn btn-light btn-number"
                                          onClick={() => decrement(setInfants)}
                                        >
                                          <span><i className="isax isax-minus"></i></span>
                                        </button>
                                      </span>
                                      <input
                                        type="text"
                                        className="input-number"
                                        value={infants.toString().padStart(2, "0")}
                                        readOnly
                                      />
                                      <span className="input-group-btn float-end">
                                        <button
                                          type="button"
                                          className="quantity-right-plus btn btn-light btn-number"
                                          onClick={() => increment(setInfants)}
                                        >
                                          <span><i className="isax isax-add"></i></span>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Children */}
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                  <label className="form-label text-gray-9 mb-0">
                                    Children <span className="text-default fw-normal">( 2-12 Yrs )</span>
                                  </label>
                                  <div className="custom-increment">
                                    <div className="input-group">
                                      <span className="input-group-btn float-start">
                                        <button
                                          type="button"
                                          className="quantity-left-minus btn btn-light btn-number"
                                          onClick={() => decrement(setChildren)}
                                        >
                                          <span><i className="isax isax-minus"></i></span>
                                        </button>
                                      </span>
                                      <input
                                        type="text"
                                        className="input-number"
                                        value={children.toString().padStart(2, "0")}
                                        readOnly
                                      />
                                      <span className="input-group-btn float-end">
                                        <button
                                          type="button"
                                          className="quantity-right-plus btn btn-light btn-number"
                                          onClick={() => increment(setChildren)}
                                        >
                                          <span><i className="isax isax-add"></i></span>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg search-btn ms-0 w-100 mb-3 fs-14 d-inline-flex justify-content-center"
                        >
                          Book Now
                        </button>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                          <h6 className="fs-14 fw-medium text-success">
                            40 Seats Available on your Search
                          </h6>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Map */}
                <div className="card shadow-none" id="location">
                  <div className="d-flex">
                    <iframe
                      src="https://www.google.com/maps?q=Barcelona%20Nord%20Bus%20Station%2C%20Spain&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="contact-map"
                    />
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <p className="d-flex align-items-center mb-0">
                        <i className="isax isax-location5 me-2" />
                        15,Adri Street,Ciutat Vella,Barcelona
                      </p>
                    </div>
                  </div>
                </div>
                {/* /Map */}
                {/* Enquiry */}
                <div className="card shadow-none">
                  <div className="card-body">
                    <form>
                      <h5 className="mb-3 fs-18">Enquire Us</h5>
                      <div className="py-1">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 btn-lg d-flex align-items-center justify-content-center"
                      >
                        Submit Enquiry
                      </button>
                    </form>
                  </div>
                </div>
                {/* /Enquiry */}
                <div className="card shadow-none">
                  <div className="card-body">
                    <h5 className="fs-18 mb-3">Why Book With Us</h5>
                    <div>
                      <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                          <i className="isax isax-medal-star" />
                        </span>
                        Expertise and Experience
                      </p>
                      <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                          <i className="isax isax-menu" />
                        </span>
                        Tailored Services
                      </p>
                      <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                          <i className="isax isax-message-minus" />
                        </span>
                        Comprehensive Planning
                      </p>
                      <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                          <i className="isax isax-user-add" />
                        </span>
                        Client Satisfaction
                      </p>
                      <p className="d-flex align-items-center">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                          <i className="isax isax-grammerly" />
                        </span>
                        24/7 Support
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card shadow-none mb-0">
                  <div className="card-body">
                    <h5 className="fs-18 mb-3">Provider Details</h5>
                    <div className="py-1">
                      <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
                        <Link
                          href="#"
                          className="avatar avatar-lg flex-shrink-0"
                        >
                          <ImageWithBasePath
                            src="assets/img/users/user-05.jpg"
                            alt="img"
                            className="rounded-circle"
                          />
                        </Link>
                        <div className="ms-2 overflow-hidden">
                          <h6 className="fw-medium text-truncate">
                            <Link href="#">Adrian Hendriques</Link>
                          </h6>
                          <p className="fs-14">Member Since : 14 May 2024</p>
                        </div>
                      </div>
                      <div className="border br-10 mb-3 p-3">
                        <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                          <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                            <i className="isax isax-call-outgoing5" />
                          </span>
                          <p>+1 12545 45548</p>
                        </div>
                        <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                          <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                            <i className="isax isax-message-search5" />
                          </span>
                          <p>Info@example.com</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                            <i className="isax isax-location-tick5" />
                          </span>
                          <p>4635 Pheasant Ridge Road, USA</p>
                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-sm-6">
                        <Link
                          href="#"
                          className="btn btn-light d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-messages5 me-2" />
                          Whatsapp Us
                        </Link>
                      </div>
                      <div className="col-sm-6">
                        <Link
                          href={all_routes.chat}
                          className="btn btn-primary d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-message-notif5 me-2" />
                          Chat Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

    </div>
  )
}

export default BusDetails
