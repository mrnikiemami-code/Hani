"use client";
import Slider from '../../components/app-slider/appSlider'
import { useState } from "react";
import Link from "next/link";

const ActivityFilter = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="col-xl-3 col-lg-4 theiaStickySidebar">
      <div className="card filter-sidebar mb-4 mb-lg-0">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5>Filters</h5>
          <Link href="#" className="fs-14 link-primary">
            Reset
          </Link>
        </div>
        <div className="card-body p-0">
          <form action="#">
            <div className="p-3 border-bottom">
              <label className="form-label fs-16">
                Search by Activity Names
              </label>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Activity Name"
                />
              </div>
            </div>
            <div className="accordion accordion-list">
              <div className="accordion-item border-bottom p-3">
                <div className="accordion-header">
                  <div
                    className="accordion-button p-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordions-popular"
                    aria-expanded="true"
                    aria-controls="accordions-popular"
                    role="button"
                  >
                    <i className="isax isax-coin me-2 text-primary" />
                    Price
                  </div>
                </div>
                <div
                  id="accordions-popular"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="filter-range">
                      <Slider
                        range
                        min={200}
                        max={5695}
                        defaultValue={[500, 2000]}
                      />
                    </div>
                    <div className="filter-range-amount">
                      <p className="fs-14">
                        Range :{" "}
                        <span className="text-gray-9 fw-medium">
                          $200 - $5695
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
                    data-bs-target="#accordion-hotel"
                    aria-expanded="true"
                    aria-controls="accordion-hotel"
                    role="button"
                  >
                    <i className="isax isax-candle me-2 text-primary" />{" "}
                    Activity Type
                  </div>
                </div>
                <div
                  id="accordion-hotel"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div
                      className="more-content"
                      style={{ height: !showMenu ? "148px" : "232px" }}
                    >
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity1"
                          type="checkbox"
                          id="activity1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity1"
                        >
                          Adventure
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity2"
                          type="checkbox"
                          id="activity2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity2"
                        >
                          Water Sports
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity3"
                          type="checkbox"
                          id="activity3"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity3"
                        >
                          Nature &amp; Wildlife
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity4"
                          type="checkbox"
                          id="activity4"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity4"
                        >
                          Sightseeing
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity5"
                          type="checkbox"
                          id="activity5"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity5"
                        >
                          Cultural Tours
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity6"
                          type="checkbox"
                          id="activity6"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity6"
                        >
                          Cruises &amp; Boat Tours
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity7"
                          type="checkbox"
                          id="activity7"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity7"
                        >
                          Desert &amp; Safari
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="activity8"
                          type="checkbox"
                          id="activity8"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="activity8"
                        >
                          Air Activities
                        </label>
                      </div>
                    </div>
                    <Link
                      href="#"
                      onClick={() => {
                        setShowMenu(!showMenu);
                      }}
                      className="more-view fw-medium fs-14"
                    >
                      {showMenu ? "Show Less" : "Show More"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-bottom p-3">
                <div className="accordion-header">
                  <div
                    className="accordion-button p-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-amenity"
                    aria-expanded="true"
                    aria-controls="accordion-amenity"
                    role="button"
                  >
                    <i className="isax isax-home-2 me-2 text-primary" />{" "}
                    Duration
                  </div>
                </div>
                <div
                  id="accordion-amenity"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="more-content">
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="duration1"
                          type="checkbox"
                          id="duration1"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="duration1"
                        >
                          Less than 2 hours
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="duration2"
                          type="checkbox"
                          id="duration2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="duration2"
                        >
                          2 - 4 hours
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="duration3"
                          type="checkbox"
                          id="duration3"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="duration3"
                        >
                          Half day
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="duration4"
                          type="checkbox"
                          id="duration4"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="duration4"
                        >
                          Full day
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="duration5"
                          type="checkbox"
                          id="duration5"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="duration5"
                        >
                          Multi day
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
                    data-bs-target="#accordion-guests"
                    aria-expanded="true"
                    aria-controls="accordion-guests"
                    role="button"
                  >
                    <i className="isax isax-profile-2user me-2 text-primary" />{" "}
                    Guests
                  </div>
                </div>
                <div
                  id="accordion-guests"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="more-content">
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest1"
                          type="checkbox"
                          id="guest1"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="guest1"
                        >
                          1 - 5
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest2"
                          type="checkbox"
                          id="guest2"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="guest2"
                        >
                          5 - 10
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest3"
                          type="checkbox"
                          id="guest3"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="guest3"
                        >
                          10 - 15
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest4"
                          type="checkbox"
                          id="guest4"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="guest4"
                        >
                          15 - 20
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest5"
                          type="checkbox"
                          id="guest5"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="guest5"
                        >
                          20+
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
                    data-bs-target="#accordion-brands"
                    aria-expanded="true"
                    aria-controls="accordion-brands"
                    role="button"
                  >
                    <i className="isax isax-discount-shape me-2 text-primary" />
                    Reviews
                  </div>
                </div>
                <div
                  id="accordion-brands"
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
  );
};

export default ActivityFilter;
