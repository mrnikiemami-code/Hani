"use client";
import { useState } from "react";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
import { DatePicker } from '../../components/common-date-picker/appDatePicker'
import BannerCounter from "../../components/banner-counter/counter";
import Link from "next/link";
import { all_routes } from "../../routes/all_routes";
type Mode = "bus";

type BookingState = {

  bus: {
    adults: number;
    children: number;
    infants: number;
  };
};
const BusSearch = () => {
      const [flightRadio, setFlightRadio] = useState<string>("oneway");
      const [formData, setFormData] = useState<BookingState>({
        bus: {
          adults: 0,
          children: 0,
          infants: 0,
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
      const [defaultDate] = useState(new Date());
      const handleCounter = (mode: Mode) => {
        setAppliedData((prev) => ({
          ...prev,
          [mode]: formData[mode],
        }));
      };
      const busPassenger =
        appliedData.bus.adults +
        appliedData.bus.children +
        appliedData.bus.infants;
      const totalBusPassengers = busPassenger === 0 ? 4 : busPassenger;
  return (
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
                            <BookingDropdown
                              label="From"
                              defaultValue="New York"
                              defaultSubValue="USA"
                              locations={[
                                { value: "New York", subValue: "USA" },
                                { value: "Boston", subValue: "Spain" },
                                { value: "NorthernVirginia", subValue: "USA" },
                                { value: "LosAngeles", subValue: "USA" },
                                { value: "Orlando", subValue: "USA" }
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
                              defaultSubValue="USA"
                              locations={[
                                { value: "New York", subValue: "USA" },
                                { value: "Boston", subValue: "Spain" },
                                { value: "NorthernVirginia", subValue: "USA" },
                                { value: "LosAngeles", subValue: "USA" },
                                { value: "Orlando", subValue: "USA" }
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
                          <DatePicker
                            className="form-control datetimepicker"
                            placeholder="dd/mm/yyyy"
                            defaultValue={defaultDate}
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
                              {totalBusPassengers}{" "}
                              <span className="fw-normal fs-14">
                                Persons
                              </span>
                            </h5>
                            <p className="fs-12 mb-0">2 Adult, 2 Children</p>
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
                                      Adults
                                      <span className="text-default fw-normal">
                                        ( 12+ Yrs )
                                      </span>
                                    </label>
                                    <BannerCounter
                                      value={formData.bus.adults}
                                      setValue={(v) => updateField("bus", "adults", v)}
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
                                      value={formData.bus.children}
                                      setValue={(v) => updateField("bus", "children", v)}
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
                                      value={formData.bus.infants}
                                      setValue={(v) => updateField("bus", "infants", v)}
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

                              <button type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleCounter("bus")}
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
                                  <p>Boston Logan International Airport</p>
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
                                  <p>Los Angeles International Airport</p>
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
                                  <p>Boston Logan International Airport</p>
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
                                  <p>Los Angeles International Airport</p>
                                </Link>
                              </li>
                              <li>
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
  )
}

export default BusSearch