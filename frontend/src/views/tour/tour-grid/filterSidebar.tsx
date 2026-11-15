"use client";
import Slider from '../../../components/app-slider/appSlider'
import  { useState } from 'react'
import Link from "next/link";

const FliterSidebar = () => {



    const [disabled, _setDisabled] = useState(false);

 

    const [item, setItem] = useState('Show More');
    const [_isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
        setItem((prev) => (prev === 'Show More' ? 'Show Less' : 'Show More'));
    }

    return (
        <div>
            <div className="card filter-sidebar mb-4 mb-lg-0">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5>Filters</h5>
                    <Link href="#" className="fs-14 link-primary">
                        Reset
                    </Link>
                </div>
                <div className="card-body p-0">
                    <form>
                        <div className="p-3 border-bottom">
                            <label className="form-label fs-16">Search by Tour Type</label>
                            <div className="input-icon">
                                <span className="input-icon-addon">
                                    <i className="isax isax-search-normal" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Tour Type"
                                />
                            </div>
                        </div>
                        <div className="accordion accordion-list">
                            <div className="accordion-item border-bottom p-3">
                                <div className="accordion-header">
                                    <div
                                        className="accordion-button p-0"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#accordion-populars"
                                        aria-expanded="true"
                                        aria-controls="accordion-populars"
                                        role="button"
                                    >
                                        <i className="isax isax-ranking me-2 text-primary" />
                                        Popular
                                    </div>
                                </div>
                                <div
                                    id="accordion-populars"
                                    className="accordion-collapse collapse show"
                                >
                                    <div className="accordion-body pt-2">
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="popular1"
                                                type="checkbox"
                                                id="popular1"
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
                            </div>
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
                                            <Slider range min={0} max={1000} defaultValue={[200, 800]} disabled={disabled} />
                                        </div>
                                        <div className="filter-range-amount">

                                            <p className="fs-14">
                                                Range :{" "}
                                                <span className="text-gray-9 fw-medium">$200 - $800</span>
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
                                        <i className="isax isax-buildings me-2 text-primary" />
                                        Tour Types
                                    </div>
                                </div>
                                <div
                                    id="accordion-hotel"
                                    className="accordion-collapse collapse show"
                                >
                                    <div className="accordion-body">
                                        <div className="more-content" style={{ height: item === 'Show More' ? '148px' : '203px' }}>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="hotel1"                              
                                                    type="checkbox"
                                                    id="hotel1"
                                                    defaultChecked
                                                />
                                                <label className="form-check-label ms-2" htmlFor="hotel1">
                                                    Ecotourism
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
                                                <label className="form-check-label ms-2" htmlFor="hotel2">
                                                    Adventure Tour
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
                                                <label className="form-check-label ms-2" htmlFor="hotel3">
                                                    Group Tours
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
                                                <label className="form-check-label ms-2" htmlFor="hotel4">
                                                    Beach Tours
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="hotel5"
                                                    type="checkbox"
                                                    id="hotel5"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="hotel5">
                                                    Honey Moon
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
                                                <label className="form-check-label ms-2" htmlFor="hotel6">
                                                    Historical Tours
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
                                                <label className="form-check-label ms-2" htmlFor="hotel7">
                                                    Summer Trip
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="hotel8"
                                                    type="checkbox"
                                                    id="hotel8"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="hotel8">
                                                    City Trip
                                                </label>
                                            </div>
                                        </div>
                                        <Link
                                            href="#"
                                            className="more-view text-primary fw-medium fs-14"
                                            onClick={handleToggle}
                                        >
                                            {item}
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
                                        <i className="isax isax-candle me-2 text-primary" />
                                        Accommodation Type
                                    </div>
                                </div>
                                <div
                                    id="accordion-amenity"
                                    className="accordion-collapse collapse show"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="amenity1"
                                                    type="checkbox"
                                                    id="amenity1"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="amenity1">
                                                    Hotel
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="amenity2"
                                                    type="checkbox"
                                                    id="amenity2"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="amenity2">
                                                    Campsite
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="amenity3"
                                                    type="checkbox"
                                                    id="amenity3"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="amenity3">
                                                    Resort
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
                                                <label className="form-check-label ms-2" htmlFor="amenity4">
                                                    Cabin
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
                                        data-bs-target="#accordion-cusine"
                                        aria-expanded="true"
                                        aria-controls="accordion-cusine"
                                        role="button"
                                    >
                                        <i className="isax isax-activity me-2 text-primary" />
                                        Activities
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
                                                <label className="form-check-label ms-2" htmlFor="cusine1">
                                                    Hiking
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="cusine2"
                                                    type="checkbox"
                                                    id="cusine2"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="cusine2">
                                                    Sightseeing
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="cusine3"
                                                    type="checkbox"
                                                    id="cusine3"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="cusine3">
                                                    Wildlife Safari
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
                                                <label className="form-check-label ms-2" htmlFor="cusine4">
                                                    Boat Tours
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
                                        data-bs-target="#accordion-meal"
                                        aria-expanded="true"
                                        aria-controls="accordion-meal"
                                        role="button"
                                    >
                                        <i className="isax isax-reserve me-2 text-primary" />
                                        Meal plans available
                                    </div>
                                </div>
                                <div id="accordion-meal" className="accordion-collapse collapse show">
                                    <div className="accordion-body pt-2">
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="meals1"
                                                type="checkbox"
                                                id="meals1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="meals1">
                                                All inclusive
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="meals2"
                                                type="checkbox"
                                                id="meals2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="meals2">
                                                Breakfast
                                            </label>
                                        </div>
                                        <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="meals3"
                                                type="checkbox"
                                                id="meals3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="meals3">
                                                Lunch
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
                                            <label className="form-check-label ms-2" htmlFor="meals4">
                                                Dinner
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
                                        data-bs-target="#accordion-style"
                                        aria-expanded="true"
                                        aria-controls="accordion-style"
                                        role="button"
                                    >
                                        <i className="isax isax-profile-2user me-2 text-primary" />
                                        Guests
                                    </div>
                                </div>
                                <div
                                    id="accordion-style"
                                    className="accordion-collapse collapse show"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="style1"
                                                    type="checkbox"
                                                    id="style1"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="style1">
                                                    1 - 5
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="style2"
                                                    type="checkbox"
                                                    id="style2"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="style2">
                                                    5 - 10
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="style3"
                                                    type="checkbox"
                                                    id="style3"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="style3">
                                                    10 - 15
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="style4"
                                                    type="checkbox"
                                                    id="style4"
                                                    defaultChecked
                                                />
                                                <label className="form-check-label ms-2" htmlFor="style4">
                                                    15 - 20
                                                </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center ps-0 mb-0">
                                                <input
                                                    className="form-check-input ms-0 mt-0"
                                                    name="style5"
                                                    type="checkbox"
                                                    id="style5"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="style5">
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
                                            <label className="form-check-label ms-2" htmlFor="review1">
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
                                            <label className="form-check-label ms-2" htmlFor="review2">
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
                                            <label className="form-check-label ms-2" htmlFor="review3">
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
                                            <label className="form-check-label ms-2" htmlFor="review4">
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
                                            <label className="form-check-label ms-2" htmlFor="review5">
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

export default FliterSidebar
