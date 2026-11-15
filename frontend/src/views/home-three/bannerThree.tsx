"use client";
import { useState } from "react";
import Link from "next/link";
import { DatePicker, TimePicker } from '../../components/common-date-picker/appDatePicker'
import { all_routes } from "../../routes/all_routes";
import { parseTime } from '../../utils/dateFormat'

const BannerThree = () => {
  const [defaultDate] = useState(new Date());
  const defaultTime = parseTime("10:30 AM");
  const [carRadio, setCarRadio] = useState<string>("same-drop");

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section-three">
        <div className="container">
          <div className="hero-content">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="banner-content aos " data-aos="fade-up">
                  <h1 className="text-white display-5">
                    Rent Luxury Cars on the Lowest Price
                  </h1>
                  <p className="text-white">
                    Your ultimate destination for all things help you celebrate
                    & remember tour experience.
                  </p>
                </div>
                <div className="banner-form card mb-0">

                  <div className="card-body">
                    <div className="tab-pane fade active show" id="Cars">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Hero Section */}
    </>
  );
};

export default BannerThree;
