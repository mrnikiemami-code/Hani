"use client";
import  { useState } from 'react'
import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path'
import { DatePicker } from '../../components/common-date-picker/appDatePicker'

import BannerCounter from '../../components/banner-counter/counter';
import { all_routes } from '../../routes/all_routes';
import BookingDropdown from '../../components/booking-dropdown/bookingDropdown';
type Mode = "flight";
type BookingState = {
  flight: {
    cabinClass: string;
    adults: number;
    children: number;
    infants: number;
  }
};
const FlightSearch = () => {
        const routes = all_routes
      const [flightRadio,setFlightRadio] = useState<string>('oneway')
      const [defaultDate] = useState(new Date());
        const [formData, setFormData] = useState<BookingState>({
          flight: {
            adults: 0,
            children: 0,
            infants: 0,
            cabinClass: "Economy",
          },
        });
        const updateField = <T extends Mode>(
          mode: T,
          field: keyof BookingState[T],
          value: React.SetStateAction<number>
        ) => {
          setFormData((prev) => ({
            ...prev,
            [mode]: {
              ...prev[mode],
              [field]:
                typeof value === "function"
                  ? value(prev[mode][field] as number)
                  : value,
            },
          }));
        };
        const [appliedData, setAppliedData] = useState(formData);
      
        const handleCounter = (mode: "flight") => {
          setAppliedData((prev) => ({
            ...prev,
            [mode]: formData[mode],
          }));
        };
        const flightPassengers =
          appliedData.flight.adults +
          appliedData.flight.children +
          appliedData.flight.infants;
      const totalFlightPassengers = flightPassengers === 0 ? 4 : flightPassengers;
  return (
    <>
     {/* Flight Search */}
     <div className="card">
        <div className="card-body">
            <div className="banner-form">
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
                                      checked={flightRadio === "oneway" ? true : false}
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
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                          label="From"
                                          defaultValue="New York"
                                          defaultSubValue="John F. Kennedy International Airport"
                                          locations={[
                                            { value: "New York", subValue: "John F. Kennedy International Airport" },
                                            { value: "Boston", subValue: "Boston Logan International Airport" },
                                            { value: "NorthernVirginia", subValue: "Dulles International Airport" },
                                            { value: "LosAngeles", subValue: "Los Angeles International Airport" },
                                            { value: "Orlando", subValue: "Orlando International Airport" }
                                          ]}
                                        />
                                      </div>
            
                                    </div>
                                    <div className="form-item dropdown ps-2 ps-sm-3">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                          label="To"
                                          defaultValue="Las Vegas"
                                          defaultSubValue="Harry Reid International Airport"
                                          locations={[
                                            { value: "New York", subValue: "John F. Kennedy International Airport" },
                                            { value: "Boston", subValue: "Boston Logan International Airport" },
                                            { value: "NorthernVirginia", subValue: "Dulles International Airport" },
                                            { value: "LosAngeles", subValue: "Los Angeles International Airport" },
                                            { value: "Orlando", subValue: "Orlando International Airport" }
                                          ]}
                                        />
                                        <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                          <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </span>
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
                                          {totalFlightPassengers}{" "}
                                          <span className="fw-normal fs-14">
                                            Persons
                                          </span>
                                        </h5>
                                        <p className="fs-12 mb-0">1 Adult, Economy</p>
                                      </div>
                                      <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                        <h5 className="mb-3">
                                          Select Travelers &amp; Class
                                        </h5>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Travellers
                                          </div>
                                          <div className="row">
                                            <div className="col-md-4">
                                              <div className="mb-3">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Adults
                                                  <span className="text-default fw-normal">
                                                    ( 12+ Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                  value={formData.flight.adults}
                                                  setValue={(v) => updateField("flight", "adults", v)}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="mb-3">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Childrens
                                                  <span className="text-default fw-normal">
                                                    ( 2-12 Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                  value={formData.flight.children}
                                                  setValue={(v) => updateField("flight", "children", v)}
                                                />
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
                                                <BannerCounter
                                                  value={formData.flight.infants}
                                                  setValue={(v) => updateField("flight", "infants", v)}
                                                />
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
            
                                          <button type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleCounter("flight")}
                                          >
                                            Apply
                                          </button>
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
                                        <BookingDropdown
                                          label="From"
                                          defaultValue="New York"
                                          defaultSubValue="John F. Kennedy International Airport"
                                          locations={[
                                            { value: "New York", subValue: "John F. Kennedy International Airport" },
                                            { value: "Boston", subValue: "Boston Logan International Airport" },
                                            { value: "NorthernVirginia", subValue: "Dulles International Airport" },
                                            { value: "LosAngeles", subValue: "Los Angeles International Airport" },
                                            { value: "Orlando", subValue: "Orlando International Airport" }
                                          ]}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-item dropdown ps-2 ps-sm-3">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                          label="To"
                                          defaultValue="Las Vegas"
                                          defaultSubValue="Harry Reid International Airport"
                                          locations={[
                                            { value: "New York", subValue: "John F. Kennedy International Airport" },
                                            { value: "Boston", subValue: "Boston Logan International Airport" },
                                            { value: "NorthernVirginia", subValue: "Dulles International Airport" },
                                            { value: "LosAngeles", subValue: "Los Angeles International Airport" },
                                            { value: "Orlando", subValue: "Orlando International Airport" }
                                          ]}
                                        />
                                        <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                          <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </span>
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
    {/* /Flight Search */}

    {/* Flight Types */}
    <div className="mb-2">
        <div className="mb-3">
            <h5 className="mb-2">Choose type of Flights you are interested</h5>
        </div>
        <div className="row">
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link href={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-01.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link href={routes.flightGrid}>American Airline</Link></h6>
                        <p className="fs-14">216 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link href={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-02.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link href={routes.flightGrid}>Delta Airlines</Link></h6>
                        <p className="fs-14">569 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link href={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-03.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link href={routes.flightGrid}>Emirates</Link></h6>
                        <p className="fs-14">129 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link href={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-04.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link href={routes.flightGrid}>Air France</Link></h6>
                        <p className="fs-14">600 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link href={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-05.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link href={routes.flightGrid}>Qatar Airways</Link></h6>
                        <p className="fs-14">200 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link href={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-06.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link href={routes.flightGrid}>Air India</Link></h6>
                        <p className="fs-14">180 Flights</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* /Flight Types */}
    </>
  )
}

export default FlightSearch