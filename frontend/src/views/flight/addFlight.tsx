"use client";
import React, { useState } from 'react'
import Link from "next/link";
import { CountryOption, DateFormat, FlightName, SeatType } from '../../core/data/mock/selectOption'
import CustomSelect from '../../components/common-select/commonSelect'
import { DatePicker, TimePicker } from '../../components/common-date-picker/appDatePicker'
import Breadcrumb from '../../components/breadcrumb/breadcrumb'
import { all_routes } from '../../routes/all_routes'
import ImageWithBasePath from '../../components/image-with-base-path'
import AddFaq from '../../components/modals/addFaq'
import EditFaq from '../../components/modals/editFaq'
import DeleteModal from '../../components/modals/deleteModal'
import DefaultEditor from "react-simple-wysiwyg";

const AddFlight = () => {



  const [highlights, setHighlights] = useState<string[]>([]);

  const addHighlight = () => {
    setHighlights([...highlights, ""]); // Add an empty highlight
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index)); // Remove the highlight by index
  };


  const routes = all_routes;


  const [galleryItems, setGalleryItems] = useState<string[]>([
    "assets/img/uploads/upload-01.jpg",
    "assets/img/uploads/upload-02.jpg",
    "assets/img/uploads/upload-03.jpg",
    "assets/img/uploads/upload-04.jpg",
    "assets/img/uploads/upload-05.jpg",
  ]);
  const removeGalleryItem = (index: number) => {
    setGalleryItems(galleryItems.filter((_, i) => i !== index)); // Remove item by index
  };


  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Add Flight',
      active: false,
      link: routes.home1
    },

    {
      label: 'Add Flight',
      active: true,
    },
  ];

  const [values, setValue] = React.useState();
  function onChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <>
      <Breadcrumb title="Add Flight" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-05" />
      <div className="content">
        <div className="container">
          <div className="place-nav">
            <ul className="nav" role="tablist">
              <li>
                <Link
                  href="#"
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#add_flight"
                  aria-selected="true"
                  role="tab"
                >
                  Add New Flight
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#add_cabin"
                  aria-selected="false"
                  role="tab"
                  tabIndex={-1}
                >
                  Add New Cabin
                </Link>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            {/* Add New Flight */}
            <div
              className="tab-pane fade active show"
              id="add_flight"
              role="tabpanel"
            >
              <div className="row">
                {/* Sidebar */}
                <div className="col-lg-3 ">
                  <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                    <div className="card-body">
                      <div>
                        <h5 className="mb-3">Add Flight</h5>
                        <ul className="add-tab-list">
                          <li>
                            <a href="#basic_info" className="active" id='list-example'> Basic Info </a>
                          </li>
                          <li>
                            <a href="#specifications">Specifications</a>
                          </li>
                          <li>
                            <a href="#departure">Arrival &amp;Departure</a>
                          </li>
                          <li>
                            <a href="#location">Locations</a>
                          </li>
                          <li>
                            <a href="#additional_service">Additional Service</a>
                          </li>
                          <li>
                            <a href="#amenties">Amenities</a>
                          </li>
                          <li>
                            <a href="#faq">FAQ</a>
                          </li>
                          <li>
                            <a href="#gallery">Gallery</a>
                          </li>
                          <li>
                            <a href="#description">Description</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Sidebar */}
                <div className="col-lg-9">
                  <form data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" >
                    <div className="card shadow-none" id="basic_info">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="fs-18">Basic Info</h6>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Airline Name</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Flight Name</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Flight Number</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Make</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Manufactured On</label>
                              <div className="input-icon-end position-relative">
                                <DatePicker
                                  className="form-control datetimepicker"
                                  placeholder="dd/mm/yyyy"
                                />
                                <span className="input-icon-addon">
                                  <i className="isax isax-calendar" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="specifications">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="fs-18">Specifications</h6>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Aircraft Type</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Cabin Crew</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Cabin Class</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Baggage Allowance</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Departure Terminal</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Flight Duration</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="departure">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Arrival &amp; Departure</h5>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-xxl col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Day</label>
                              <CustomSelect
                                options={DateFormat}
                                className="select d-flex"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div className="col-xxl col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Arrival Date</label>
                              <div className="input-icon-end position-relative">
                                <DatePicker
                                  className="form-control datetimepicker"
                                  placeholder="dd/mm/yyyy"
                                />
                                <span className="input-icon-addon">
                                  <i className="isax isax-calendar" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xxl col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Arrival Time</label>
                              <div className="input-icon-end position-relative">
                                <TimePicker
                                  placeholder="Choose"
                                  format="h:mm A"
                                  className="form-control timepicker"
                                />
                                <span className="input-icon-addon">
                                  <i className="ti ti-clock-hour-10 text-gray-7" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xxl col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Departure Date</label>
                              <div className="input-icon-end position-relative">
                                <DatePicker
                                  className="form-control datetimepicker"
                                  placeholder="dd/mm/yyyy"
                                />
                                <span className="input-icon-addon">
                                  <i className="isax isax-calendar" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xxl col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Departure Time</label>
                              <div className="input-icon-end position-relative">
                                <TimePicker
                                  placeholder="Choose"
                                  format="h:mm A"
                                  className="form-control timepicker"
                                />
                                <span className="input-icon-addon">
                                  <i className="ti ti-clock-hour-10 text-gray-7" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="location">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Location</h5>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Country</label>
                              <CustomSelect
                                options={CountryOption}
                                className="select d-flex"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">City</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">State</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Zip Code</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Address</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Address 1</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="additional_service">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Additional Service</h5>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="add-service-info">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Name of the Service
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                          {highlights.map((_highlight, index) => (
                            <div className="row service-info" key={index}>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Name of the Service</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Price</label>
                                  <div className="d-flex align-items-center">
                                    <input type="text" className="form-control" />
                                    <Link href="#" className="text-danger trash-icon d-flex align-items-center justify-content-center ms-3" onClick={() => removeHighlight(index)}>
                                      <i className="isax isax-trash" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>

                          )
                          )}
                        </div>
                        <div>
                          <Link
                            href="#"
                            className="btn btn-primary btn-sm add-service"
                            onClick={addHighlight}
                          >
                            <i className="isax isax-add-circle me-1" />
                            Add New
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="amenties">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Amenities</h5>
                        </div>
                      </div>
                      <div className="card-body pb-2">
                        <div className="row gy-2">
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Seating Comfort</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-01"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-01"
                              >
                                Adjustable headrests
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-02"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-02"
                              >
                                Extra legroom seats
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-03"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-03"
                              >
                                Privacy dividers
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-04"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-04"
                              >
                                Reclining seats
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-05"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-05"
                              >
                                Reclining seats
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Entertainment</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-07"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-07"
                              >
                                Music and radio channels
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-08"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-08"
                              >
                                Noise-canceling headphones
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-09"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-09"
                              >
                                Personal seatback screens
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-010"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-010"
                              >
                                Head Phones
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-011"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-011"
                              >
                                Video games
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Connectivity</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-013"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-013"
                              >
                                In-flight Wi-Fi
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-014"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-014"
                              >
                                Charging ports
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-015"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-015"
                              >
                                Power outlets for laptops
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-016"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-016"
                              >
                                Bluetooth headphone pairing
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-017"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-017"
                              >
                                Translator Service
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Dining</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-018"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-018"
                              >
                                Beverages
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-019"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-019"
                              >
                                Snacks and refreshments
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-020"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-020"
                              >
                                Complimentary meals
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-021"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-021"
                              >
                                Pre-Order Meals
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-022"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-022"
                              >
                                Special Dietary Options
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Bedding &amp; Comfort</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-023"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-023"
                              >
                                Pillows and blankets
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-024"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-024"
                              >
                                Sleep masks
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-025"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-025"
                              >
                                Foam Mattresses
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-026"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-026"
                              >
                                Ambient Lighting
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-027"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-027"
                              >
                                Earplugs
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Accessibility Features</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-028"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-028"
                              >
                                Wheelchair access
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-029"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-029"
                              >
                                Braille seat numbers
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-030"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-030"
                              >
                                Accessible restrooms
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-031"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-031"
                              >
                                Wheelchair Assistance
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-032"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-032"
                              >
                                Accessible Lavatories
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="faq">
                      <div className="card-header">
                        <h5 className="fs-18">FAQ</h5>
                      </div>
                      <div className="card-body">
                        <div className="card shadow-none mb-3">
                          <div className="card-body px-3 py-2">
                            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                              <h6>
                                <Link href="#">
                                  Does offer free cancellation for a full refund?
                                </Link>
                              </h6>
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit_faq"
                                  className="rounded-edit d-flex align-items-center justify-content-center me-2"
                                >
                                  <i className="isax isax-edit-2" />
                                </Link>
                                <Link
                                  href="#"
                                  className="trash-icon d-flex align-items-center justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="isax isax-trash text-danger" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card shadow-none mb-3">
                          <div className="card-body px-3 py-2">
                            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                              <h6>
                                <Link href="#">Is there a pool?</Link>
                              </h6>
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit_faq"
                                  className="rounded-edit d-flex align-items-center justify-content-center me-2"
                                >
                                  <i className="isax isax-edit-2" />
                                </Link>
                                <Link
                                  href="#"
                                  className="trash-icon d-flex align-items-center justify-content-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="isax isax-trash text-danger" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Link
                            href="#"
                            className="btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#add_faq"
                          >
                            <i className="isax isax-add-circle me-1" />
                            Add New
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="gallery">
                      <div className="card-header">
                        <h5 className="fs-18">Gallery</h5>
                      </div>
                      <div className="card-body">
                        <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2">
                          <span className="upload-img d-block mb-2">
                            <i className="isax isax-document-upload fs-24" />
                          </span>
                          <h6 className="mb-1">Upload Gallery Images</h6>
                          <p className="mb-0">
                            Upload Feature Image First, Image size should below 5MB
                          </p>
                          <input type="file" accept="video/image" />
                        </div>
                        <div className="d-flex align-items-center">
                          {galleryItems.map((src, index) => (
                            <Link href="#" key={index} className="gallery-upload-img me-2">
                              <ImageWithBasePath src={src} alt={`Gallery Item ${index + 1}`} />
                              <span
                                className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash"
                                onClick={() => removeGalleryItem(index)}
                              >
                                <i className="isax isax-trash" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="description">
                      <div className="card-header">
                        <h5 className="fs-18">Description</h5>
                      </div>
                      <div className="card-body text-editor">
                        <DefaultEditor value={values} onChange={onChange} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="button" className="btn btn-light me-2">
                        Reset
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Add New Flight
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /Add New Flight */}
            {/* Add New Cabin */}
            <div className="tab-pane fade" id="add_cabin" role="tabpanel">
              <div className="row">
                <div className="col-lg-3 ">
                  <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                    <div className="card-body">
                      <div>
                        <h5 className="mb-3">Add Cabin</h5>
                        <ul className="add-tab-list">
                          <li>
                            <Link href="#basic_info_2" className="active">
                              Basic Info
                            </Link>
                          </li>
                          <li>
                            <Link href="#description_2">Description</Link>
                          </li>
                          <li>
                            <Link href="#specification">Specifications</Link>
                          </li>
                          <li>
                            <Link href="#popular_amenities_2">Amenities</Link>
                          </li>
                          <li>
                            <Link href="#gallery_2">Gallery</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <form>
                    <div className="card shadow-none" id="basic_info_2">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Basic Info</h5>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Cabin Name</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Flight Name</label>
                              <CustomSelect
                                options={FlightName}
                                className="select d-flex"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Flight Number</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="description_2">
                      <div className="card-header">
                        <h5 className="fs-18">Description</h5>
                      </div>
                      <div className="card-body text-editor">
                        <DefaultEditor value={values} onChange={onChange} />
                      </div>
                    </div>
                    <div className="card shadow-none" id="specification">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Specifications</h5>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Seats Available</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Seat Pitch</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Seat Type</label>
                              <CustomSelect
                                options={SeatType}
                                className="select d-flex"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Price Per Seat</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="popular_amenities_2">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Amenities</h5>
                        </div>
                      </div>
                      <div className="card-body pb-2">
                        <div className="row gy-2">
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Seating Comfort</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-1"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-1"
                              >
                                Adjustable headrests
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-2"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-2"
                              >
                                Extra legroom seats
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-3"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-3"
                              >
                                Privacy dividers
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-4"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-4"
                              >
                                Reclining seats
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Entertainment</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-7"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-7"
                              >
                                Music and radio channels
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-8"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-8"
                              >
                                Noise-canceling headphones
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-9"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-9"
                              >
                                Personal seatback screens
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-11"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-11"
                              >
                                Video games
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Connectivity</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-13"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-13"
                              >
                                In-flight Wi-Fi
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-14"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-14"
                              >
                                Charging ports
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-15"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-15"
                              >
                                Power outlets for laptops
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-16"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-16"
                              >
                                Bluetooth headphone pairing
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Dining</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-18"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-18"
                              >
                                Beverages
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-19"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-19"
                              >
                                Snacks and refreshments
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-20"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-20"
                              >
                                Complimentary meals
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Bedding &amp; Comfort</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-23"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-23"
                              >
                                Pillows and blankets
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-24"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-24"
                              >
                                Sleep masks
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-25"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-25"
                              >
                                Earplugs
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Accessibility Features</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-28"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-28"
                              >
                                Wheelchair access
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-29"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-29"
                              >
                                Braille seat numbers
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-30"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-30"
                              >
                                Accessible restrooms
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="gallery_2">
                      <div className="card-header">
                        <h5 className="fs-18">Gallery</h5>
                      </div>
                      <div className="card-body">
                        <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2">
                          <span className="upload-img d-block mb-2">
                            <i className="isax isax-document-upload fs-24" />
                          </span>
                          <h6 className="mb-1">Upload Gallery Images</h6>
                          <p className="mb-0">
                            Upload Feature Image First, Image size should below 5MB
                          </p>
                          <input type="file" accept="video/image" />
                        </div>
                        <div className="d-flex align-items-center">
                          {galleryItems.map((src, index) => (
                            <Link href="#" key={index} className="gallery-upload-img me-2">
                              <ImageWithBasePath src={src} alt={`Gallery Item ${index + 1}`} />
                              <span
                                className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash"
                                onClick={() => removeGalleryItem(index)}
                              >
                                <i className="isax isax-trash" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="button" className="btn btn-light me-2">
                        Reset
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Add New Room
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /Add New Cabin */}
          </div>
        </div>
      </div>
      <AddFaq />
      <EditFaq />
      <DeleteModal />
    </>



  )
}

export default AddFlight