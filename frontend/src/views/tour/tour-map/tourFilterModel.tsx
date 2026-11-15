"use client";
import Slider from '../../../components/app-slider/appSlider'

import Link from "next/link";

const TourFilterModel = () => {


    return (
        <>
            {/* Filter Modal */}
            <div
                className="modal fade"
                id="filter_modal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-center justify-content-between">
                            <h4>Filters</h4>
                            <Link href="#" className="text-primary">
                                Clear
                            </Link>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className=" mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="me-2">
                                            <i className="isax isax-ranking text-primary" />
                                        </span>
                                        <h6>Popular</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="popular1"
                                                type="checkbox"
                                                id="popular1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="popular1">
                                                Local Guide
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="popular2"
                                                type="checkbox"
                                                id="popular2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="popular2">
                                                VIP Access
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="popular3"
                                                type="checkbox"
                                                id="popular3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="popular3">
                                                Photographs
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="popular4"
                                                type="checkbox"
                                                id="popular4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="popular4">
                                                Adventure Gears
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-2 pb-2">
                                        <span className="me-2">
                                            <i className="isax isax-coin text-primary" />
                                        </span>
                                        <h6>Price Per Night</h6>
                                    </div>
                                    <div className="mt-4">
                                        <div className="filter-range">
                                            <Slider range min={0} max={1000} defaultValue={[200, 800]}  />
                                        </div>
                                        <div className="filter-range-amount">
                                            <p className="fs-14">
                                                Range :{" "}
                                                <span className="text-gray-9 fw-medium">$200 - $5695</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-buildings text-primary" />
                                        </span>
                                        <h6>Hotel Types</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-1">
                                                Ecotourism
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-2">
                                                Adventure Tour
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-3">
                                                Group Tours
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-4"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-4">
                                                Beach Tours
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-5">
                                                Honey Moon
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-6">
                                                Historical Tours
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-7"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-7">
                                                Summer Trip
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-8"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-8">
                                                City Trip
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-candle text-primary" />
                                        </span>
                                        <h6>Accommodation Type</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-1"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-1"
                                            >
                                                Hotel
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-2"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-2"
                                            >
                                                Campsite
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-3"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-3"
                                            >
                                                Resort
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-4"
                                                defaultChecked
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-4"
                                            >
                                                Cabin
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-activity text-primary" />
                                        </span>
                                        <h6>Activities</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-1">
                                                Hiking
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-2">
                                                Sightseeing
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-3">
                                                Wildlife Safari
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-4"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-4">
                                                Boat Tours
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-5">
                                                Adventure Sports
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-6">
                                                Cycling
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-7"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-7">
                                                Photography
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="loc-8"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="loc-8">
                                                Water Sports
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-reserve text-primary" />
                                        </span>
                                        <h6>Meal plans available</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="meal1"
                                                type="checkbox"
                                                id="meal1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="meal1">
                                                All inclusive
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="meal2"
                                                type="checkbox"
                                                id="meal2"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="meal2">
                                                Breakfast
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="meal3"
                                                type="checkbox"
                                                id="meal3"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="meal3">
                                                Lunch
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="meal4"
                                                type="checkbox"
                                                id="meal4"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="meal4">
                                                Dinner
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-building text-primary" />
                                        </span>
                                        <h6>Guests</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="Guest1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="Guest1">
                                                1 - 5
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="Guest2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="Guest2">
                                                5 - 10
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="Guest3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="Guest3">
                                                10 - 15
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="Guest4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="Guest4">
                                                15 - 20
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="Guest5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="Guest5">
                                                20+
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-building text-primary" />
                                        </span>
                                        <h6>Reviews</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="star1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="star1">
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="star2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="star2">
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="star3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="star3">
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="star4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="star4">
                                                <i className="fas fa-star filled text-primary" />
                                                <i className="fas fa-star filled text-primary" />
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="star5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="star5">
                                                <i className="fas fa-star filled text-primary" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <button
                                        type="button"
                                        className="btn btn-light btn-md me-2"
                                        data-bs-dismiss="modal"
                                    >
                                        Reset
                                    </button>
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-primary btn-md">
                                        Apply Filters
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Filter Modal */}
        </>

    )
}

export default TourFilterModel
