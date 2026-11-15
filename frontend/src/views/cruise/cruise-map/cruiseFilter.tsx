"use client";
import Slider from '../../../components/app-slider/appSlider'
import Link from "next/link";

const CruiseFilter = () => {
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
                                                Wi-Fi
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
                                                Beverage Packages
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
                                                Adventure
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
                                                Spa &amp; Wellness
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-2 pb-2">
                                        <span className="me-2">
                                            <i className="isax isax-coin text-primary" />
                                        </span>
                                        <h6>Price Per Day</h6>
                                    </div>
                                    <div className="mt-4">
                                        <div className="filter-range">
                                            <Slider range min={200} max={5695} defaultValue={[500, 2000]} />
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
                                            <i className="isax isax-home text-primary" />
                                        </span>
                                        <h6>Cabin Types</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-1">
                                                Inside
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-2"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-2">
                                                Oceanview
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-3">
                                                Balcony
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
                                                Suite
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-5">
                                                Mini-Suite
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-6">
                                                Family Cabin
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="hotel-7"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="hotel-7">
                                                Penthouse Suite
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-candle text-primary" />
                                        </span>
                                        <h6>Amenities</h6>
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
                                                Free Wifi
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
                                                Casinos
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
                                                Pool
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-4"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-4"
                                            >
                                                Fitness Centers
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-5"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-5"
                                            >
                                                Theaters
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-6"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-6"
                                            >
                                                Live Shows
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-7"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-7"
                                            >
                                                Buffet Restaurants
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="amenities-8"
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities-8"
                                            >
                                                Room Service
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-timer text-primary" />
                                        </span>
                                        <h6>Days</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="fuel-1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="fuel-1">
                                                1 - 2 days
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="fuel-2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="fuel-2">
                                                3 - 5 days
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="fuel-3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="fuel-3">
                                                6 - 9 days
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="fuel-4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="fuel-4">
                                                10+ days
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
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="gear-1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="gear-1">
                                                All inclusive
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="gear-2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="gear-2">
                                                Breakfast
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="gear-3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="gear-3">
                                                Lunch
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="gear-4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="gear-4">
                                                Dinner
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-tag-user text-primary" />
                                        </span>
                                        <h6>Capacity</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="seat-1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="seat-1">
                                                2 Seater
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="seat-2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="seat-2">
                                                4 Seater
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="seat-3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="seat-3">
                                                5 Seater
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="seat-4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="seat-4">
                                                7 Seater
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-ship text-primary" />
                                        </span>
                                        <h6>Cruise Types</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-1">
                                                Luxury Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-2">
                                                Adventure Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-3">
                                                Expedition Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-4">
                                                River Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-5">
                                                Family Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-6">
                                                Theme Cruises
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-7"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-7">
                                                World Cruises
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="type-8"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="type-8">
                                                Sailing Cruises
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2">
                                            <i className="isax isax-profile-2user text-primary" />
                                        </span>
                                        <h6>Guests</h6>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="guest1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guest1">
                                                1 - 5
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="guest2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guest2">
                                                5 - 10
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="guest3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guest3">
                                                10 - 15
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="guest4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guest4">
                                                15 - 20
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 me-4">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                type="checkbox"
                                                id="guest5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guest5">
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
                                    <button data-bs-dismiss="modal" className="btn btn-primary btn-md">
                                        Apply Filters
                                    </button>
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

export default CruiseFilter
