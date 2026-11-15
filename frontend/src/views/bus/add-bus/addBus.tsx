"use client";
import { useState } from 'react'
import Link from "next/link";
import { all_routes } from '../../../routes/all_routes';
import CustomSelect from '../../../components/common-select/commonSelect';
import { AccessBus, ACType, ArrivalCity, BodyType, Brakes, BusCity, BusType, CountryOption,  DepartureCity, Doors,  FuelType,  SteeringType, TypeOfLocation } from '../../../core/data/mock/selectOption';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { DatePicker, TimePicker } from '../../../components/common-date-picker/appDatePicker'
import BusModal from './busModal';
import { useSectionSpy } from '../../../hooks/useSectionSpy'
import FormEditors from '../../../components/text-editor/textEditor';

const SECTION_IDS = [
  '#basic_info',
  '#specifications',
  '#departure',
  '#dropoff',
  '#routes',
  '#description',
  '#amenities',
  '#location',
  '#faq',
  '#gallery',
];

const AddBus = () => {


  const { activeId, registerSection, onNavClick } = useSectionSpy(SECTION_IDS);


  const routes = all_routes;


  const [galleryItems, setGalleryItems] = useState<string[]>([
    "assets/img/uploads/upload-01.jpg",
    "assets/img/uploads/upload-02.jpg",
    "assets/img/uploads/upload-03.jpg",
    "assets/img/uploads/upload-04.jpg",
    "assets/img/uploads/upload-05.jpg",
  ]);
  const removeGalleryItem = (index: number) => {
    setGalleryItems(prev => prev.filter((_, i) => i !== index));
  };


  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Add Bus',
      active: false,
      link: routes.home1
    },

    {
      label: 'Bus',
      active: true,
    },

    {
      label: 'Add Bus',
      active: true,
    },
  ];

  return (
    <>

      {/* Breadcrumb */}
      <Breadcrumb title="Add Bus" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-07" />
      {/* /Breadcrumb */}

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          {/* Add New Bus */}
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="card border-0 mb-4 mb-lg-0  theiaStickySidebar">
                <div className="card-body">
                  <div>
                    <h5 className="mb-3">Add Bus</h5>
                    <ul className="add-tab-list">
                      <li>
                        <a
                          href="#basic_info"
                          className={activeId === '#basic_info' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#basic_info')}
                        >
                          Basic Info
                        </a>
                      </li>
                      <li>
                        <a
                          href="#specifications"
                          className={activeId === '#specifications' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#specifications')}
                        >
                          Specifications
                        </a>
                      </li>
                      <li>
                        <a
                          href="#departure"
                          className={activeId === '#departure' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#departure')}
                        >
                          Arrival &amp; Departure
                        </a>
                      </li>
                      <li>
                        <a
                          href="#dropoff"
                          className={activeId === '#dropoff' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#dropoff')}
                        >
                          Pickup &amp; Dropoff
                        </a>
                      </li>
                      <li>
                        <a
                          href="#routes"
                          className={activeId === '#routes' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#routes')}
                        >
                          Routes
                        </a>
                      </li>
                      <li>
                        <a
                          href="#description"
                          className={activeId === '#description' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#description')}
                        >
                          Description
                        </a>
                      </li>
                      <li>
                        <a
                          href="#amenities"
                          className={activeId === '#amenities' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#amenities')}
                        >
                          Amenities
                        </a>
                      </li>
                      <li>
                        <a
                          href="#location"
                          className={activeId === '#location' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#location')}
                        >
                          Location
                        </a>
                      </li>
                      <li>
                        <a
                          href="#faq"
                          className={activeId === '#faq' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#faq')}
                        >
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a
                          href="#gallery"
                          className={activeId === '#gallery' ? 'active' : ''}
                          onClick={(e) => onNavClick(e, '#gallery')}
                        >
                          Gallery
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* /Sidebar */}
            <div className="col-lg-9">
              <form>
                <div className="card shadow-none" id="basic_info" ref={registerSection("#basic_info")}>
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fs-18">Basic Info</h6>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Bus Name</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Bus Number</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Bus Type</label>
                          <CustomSelect
                              options={BusType}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Registered On</label>
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
                <div className="card shadow-none" id="specifications" ref={registerSection("#specifications")}>
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fs-18">Specifications</h6>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Body Type</label>
                          <CustomSelect
                              options={BodyType}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Fuel Type</label>
                          <CustomSelect
                              options={FuelType}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Mileage (km/l)</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">AC Type</label>
                          <CustomSelect
                              options={ACType}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Doors</label>
                          <CustomSelect
                              options={Doors}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Seating Capacity</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Passenger Capacity</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Length (ft)</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Width (ft)</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Height (ft)</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Max Speed (km/h)</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Engine Power (HP)</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Steering Type</label>
                          <CustomSelect
                              options={SteeringType}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Brakes</label>
                          <CustomSelect
                              options={Brakes}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Access</label>
                          <CustomSelect
                              options={AccessBus}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow-none" id="departure" ref={registerSection("#departure")}>
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="fs-18">Arrival &amp; Departure</h5>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-xxl col-xl-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Arrival City</label>
                          <CustomSelect
                              options={ArrivalCity}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-6 col-md-6">
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
                      <div className="col-xxl col-xl-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Departure City</label>
                          <CustomSelect
                              options={DepartureCity}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Departure Time</label>
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
                <div className="card shadow-none" id="dropoff" ref={registerSection("#dropoff")}>
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="fs-18">Pickup &amp; Dropoff</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xxl col-xl-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Type of Location</label>
                          <CustomSelect
                              options={TypeOfLocation}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Location</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Time</label>
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
                    <div>
                      <Link
                        href="#"
                        className="btn btn-primary btn-sm add-service"
                      >
                        <i className="isax isax-add-circle me-1" />
                        Add New
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card shadow-none" id="routes" ref={registerSection("#routes")}>
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="fs-18">Routes</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xxl col-xl-6 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <CustomSelect
                              options={BusCity}
                              className="select d-flex"
                              placeholder="Select"
                            />
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Location</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Time</label>
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
                    <div>
                      <Link
                        href="#"
                        className="btn btn-primary btn-sm add-service"
                      >
                        <i className="isax isax-add-circle me-1" />
                        Add New
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card shadow-none" id="description" ref={registerSection("#description")}>
                  <div className="card-header">
                    <h5 className="fs-18">Description</h5>
                  </div>
                  <div className="card-body">
                      <FormEditors />
                    </div>
                </div>
                <div className="card shadow-none" id="amenities" ref={registerSection("#amenities")}>
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="fs-18">Bus Amenities</h5>
                    </div>
                  </div>
                  <div className="card-body pb-2">
                    <div className="row gy-2">
                      <div className="col-lg-4 col-md-6">
                        <h6 className="fs-16 mb-2">Comfort &amp; Facilities</h6>
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
                            Wi-Fi
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
                            Charging Points
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
                            Reading Lights
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
                            Recliner Seats
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
                            Blankets &amp; Pillows
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
                            TV
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
                            Music System
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
                            Movie Screens
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6 className="fs-16 mb-2">Premium Options</h6>
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
                            Onboard Restroom
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
                            Personal TV
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
                            Lounge Area
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
                            Sleeper Berths
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow-none" id="location" ref={registerSection("#location")}>
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
                <div className="card shadow-none" id="faq" ref={registerSection("#faq")}>
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
                            <Link href="#">Any Other Services?</Link>
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
                <div className="card shadow-none" id="gallery" ref={registerSection("#gallery")}>
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
                    Add New Flight
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* /Add New Bus */}
        </div>
      </div>
      {/* /Page Wrapper */}
      <BusModal />
    </>



  )
}

export default AddBus