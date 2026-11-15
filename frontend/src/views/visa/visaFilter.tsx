"use client";
import Slider from '../../components/app-slider/appSlider'
import { useState } from "react";
import Link from "next/link";


const VisaFilter = () => {
  const [showMenu, setShowMenu] = useState<boolean[]>([]);
  const handleMenu = (i: number) => {
    setShowMenu((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    }
    )
  }
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
              <label className="form-label fs-16">Search</label>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="accordion accordion-list">
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
                    Price Per Person
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
                        min={200}
                        max={800}
                        defaultValue={[300, 450]}
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
                    data-bs-target="#accordion-hotel"
                    aria-expanded="true"
                    aria-controls="accordion-hotel"
                    role="button"
                  >
                    <i className="isax isax-airplane me-2 text-primary" />
                    Country
                  </div>
                </div>
                <div
                  id="accordion-hotel"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="more-content" style={{ height: showMenu[1] ? '232px' : '148px' }}>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel1"
                          type="checkbox"
                          id="hotel1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel1"
                        >
                          USA
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel2"
                          type="checkbox"
                          id="hotel2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel2"
                        >
                          Egypt
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel3"
                          type="checkbox"
                          id="hotel3"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel3"
                        >
                          Australia
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel4"
                          type="checkbox"
                          id="hotel4"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel4"
                        >
                          Spain
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel5"
                          type="checkbox"
                          id="hotel5"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel5"
                        >
                          Turkey
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel6"
                          type="checkbox"
                          id="hotel6"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel6"
                        >
                          Qatar
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel7"
                          type="checkbox"
                          id="hotel7"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel7"
                        >
                          India
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel8"
                          type="checkbox"
                          id="hotel8"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel8"
                        >
                          Canada
                        </label>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="more-view text-primary fw-medium fs-14"
                      onClick={() => handleMenu(1)}
                    >
                      {showMenu[1] ? 'See Less' : 'Show More'}
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
                    <i className="isax isax-airplane me-2 text-primary" />
                    Processing Time
                  </div>
                </div>
                <div
                  id="accordion-amenity"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="more-content" style={{ height: showMenu[2] ? '148px' : '83px' }}>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="amenity1"
                          type="checkbox"
                          id="amenity1"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="amenity1"
                        >
                          5-10 Working Day
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="amenity2"
                          type="checkbox"
                          id="amenity2"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="amenity2"
                        >
                          7-10 Working Day
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="amenity3"
                          type="checkbox"
                          id="amenity3"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="amenity3"
                        >
                          10-15 Working Day
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="amenity4"
                          type="checkbox"
                          id="amenity4"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="amenity4"
                        >
                          12-15 Working Day
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-0">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="amenity4"
                          type="checkbox"
                          id="amenity4"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="amenity4"
                        >
                          13-15 Working Day
                        </label>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="more-view text-primary fw-medium fs-14"
                      onClick={() => handleMenu(2)}
                    >
                      {showMenu[2] ? 'See Less' : 'Show More'}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-bottom p-3">
                <div className="accordion-header">
                  <div
                    className="accordion-button p-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-cusine"
                    aria-expanded="true"
                    aria-controls="accordion-cusine"
                    role="button"
                  >
                    <i className="isax isax-candle me-2 text-primary" />
                    Visa Type
                  </div>
                </div>
                <div
                  id="accordion-cusine"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="cusine1"
                          type="checkbox"
                          id="cusine1"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cusine1"
                        >
                          Tourist
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="cusine2"
                          type="checkbox"
                          id="cusine2"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cusine2"
                        >
                          Business
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="cusine3"
                          type="checkbox"
                          id="cusine3"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cusine3"
                        >
                          Student
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-0">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="cusine4"
                          type="checkbox"
                          id="cusine4"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cusine4"
                        >
                          Work
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
                    data-bs-target="#visa-mode"
                    aria-expanded="true"
                    aria-controls="visa-mode"
                    role="button"
                  >
                    <i className="isax isax-home-2 me-2 text-primary" />
                    Visa Mode
                  </div>
                </div>
                <div
                  id="visa-mode"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="more-content" style={{ height: showMenu[3] ? '166px' : '148px' }}>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel1"
                          type="checkbox"
                          id="hotel1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel1"
                        >
                          e-Visa
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel2"
                          type="checkbox"
                          id="hotel2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel2"
                        >
                          Visa on Arrival
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel3"
                          type="checkbox"
                          id="hotel3"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel3"
                        >
                          Sticker Visa
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel4"
                          type="checkbox"
                          id="hotel4"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel4"
                        >
                          Embassy Visa
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel5"
                          type="checkbox"
                          id="hotel5"
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel5"
                        >
                          Consular Visa
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-0">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="hotel6"
                          type="checkbox"
                          id="hotel6"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="hotel6"
                        >
                          Electronic Travel Authorization
                        </label>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="more-view text-primary fw-medium fs-14"
                      onClick={() => handleMenu(3)}
                    >
                      {showMenu[3] ? 'See Less' : 'Show More'}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-bottom p-3">
                <div className="accordion-header">
                  <div
                    className="accordion-button p-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-meal"
                    aria-expanded="true"
                    aria-controls="accordion-meal"
                    role="button"
                  >
                    <i className="isax isax-reserve me-2 text-primary" />
                    Validity
                  </div>
                </div>
                <div
                  id="accordion-meal"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body pt-2">
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="meals1"
                        type="checkbox"
                        id="meals1"
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="meals1"
                      >
                        50 Days
                      </label>
                    </div>
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="meals2"
                        type="checkbox"
                        id="meals2"
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="meals2"
                      >
                        60 Days
                      </label>
                    </div>
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="meals3"
                        type="checkbox"
                        id="meals3"
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="meals3"
                      >
                        15 Days
                      </label>
                    </div>
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="meals4"
                        type="checkbox"
                        id="meals4"
                        defaultChecked
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="meals4"
                      >
                        40 Days
                      </label>
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
  )
}

export default VisaFilter