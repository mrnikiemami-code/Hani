"use client";
import Slider from '../../../components/app-slider/appSlider'
import  { useState } from 'react'
import Link from "next/link";

const FliterSidebar = () => {



    const [disabled, _setDisabled] = useState(false);

  

    const [showMenu, setShowMenu] = useState(false)
    const [showMenu2, setShowMenu2] = useState(false)
    const [showMenu3, setShowMenu3] = useState(false)

    return (
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
                        <label className="form-label fs-16">Search by Cruise Type</label>
                        <div className="input-icon">
                            <span className="input-icon-addon">
                                <i className="isax isax-search-normal" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Cruise Type"
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
                                    Price Per Night
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
                                            <span className="text-gray-9 fw-medium">$200 - $5695</span>
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
                                    data-bs-target="#accordion-cabin"
                                    aria-expanded="true"
                                    aria-controls="accordion-cabin"
                                    role="button"
                                >
                                    <i className="isax isax-airplane4 me-2 text-primary" />
                                    Cabin Types
                                </div>
                            </div>
                            <div
                                id="accordion-cabin"
                                className="accordion-collapse collapse show"
                            >
                                <div className="accordion-body">
                                    <div className="more-content" style={{ height: !showMenu ? '148px' : '232px' }}>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cabin1"
                                                type="checkbox"
                                                id="cabin1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cabin1">
                                                Inside
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cabin2"
                                                type="checkbox"
                                                id="cabin2"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cabin2">
                                                Oceanview
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cabin3"
                                                type="checkbox"
                                                id="cabin3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cabin3">
                                                Balcony
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cabin4"
                                                type="checkbox"
                                                id="cabin4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cabin4">
                                                Suite
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cabin5"
                                                type="checkbox"
                                                id="cabin5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cabin5">
                                                Mini-Suite
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cabin6"
                                                type="checkbox"
                                                id="cabin6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cabin6">
                                                Family Cabin
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cabin7"
                                                type="checkbox"
                                                id="cabin7"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cabin7">
                                                Penthouse Suite
                                            </label>
                                        </div>
                                    </div>
                                    <Link href="#" onClick={()=>{setShowMenu(!showMenu)}} className="more-view fw-medium fs-14">{showMenu ?'Show Less':'Show More'}</Link>
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
                                    Amenities
                                </div>
                            </div>
                            <div
                                id="accordion-amenity"
                                className="accordion-collapse collapse show"
                            >
                                <div className="accordion-body">
                                    <div className="more-content" style={{ height: !showMenu2 ? '148px' : '232px' }}>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenity1"
                                                type="checkbox"
                                                id="amenity1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenity1">
                                                Free Wifi
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
                                                Casinos
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenity3"
                                                type="checkbox"
                                                id="amenity3"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenity3">
                                                Pool
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenity4"
                                                type="checkbox"
                                                id="amenity4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenity4">
                                                Fitness Centers
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenity5"
                                                type="checkbox"
                                                id="amenity5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenity5">
                                                Theaters
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenity6"
                                                type="checkbox"
                                                id="amenity6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenity6">
                                                Complimentary meals
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenity7"
                                                type="checkbox"
                                                id="amenity7"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenity7">
                                                Play Areas
                                            </label>
                                        </div>
                                    </div>
                                    <Link href="#" className="more-view fw-medium fs-14" onClick={() => { setShowMenu2(!showMenu2) }}>{showMenu2 ? 'Show Less' : 'Show More'}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3 pb-2">
                            <div className="accordion-header">
                                <div
                                    className="accordion-button p-0"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-daylist"
                                    aria-expanded="true"
                                    aria-controls="accordion-daylist"
                                    role="button"
                                >
                                    <i className="isax isax-timer me-2 text-primary" />
                                    Days
                                </div>
                            </div>
                            <div
                                id="accordion-daylist"
                                className="accordion-collapse collapse show"
                            >
                                <div className="accordion-body">
                                    <div className="">
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="daylist1"
                                                type="checkbox"
                                                id="daylist1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="daylist1">
                                                1 - 2 days
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="daylist2"
                                                type="checkbox"
                                                id="daylist2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="daylist2">
                                                3 - 5 days
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="daylist3"
                                                type="checkbox"
                                                id="daylist3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="daylist3">
                                                6 - 9 days
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="daylist4"
                                                type="checkbox"
                                                id="daylist4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="daylist4">
                                                10+ days
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
                                    data-bs-target="#accordion-cruise"
                                    aria-expanded="true"
                                    aria-controls="accordion-cruise"
                                    role="button"
                                >
                                    <i className="isax isax-home-2 me-2 text-primary" />
                                    Cruise Types
                                </div>
                            </div>
                            <div
                                id="accordion-cruise"
                                className="accordion-collapse collapse show"
                            >
                                <div className="accordion-body">
                                    <div className="more-content" style={{ height: !showMenu3 ? '148px' : '180px' }}>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cruise1"
                                                type="checkbox"
                                                id="cruise1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cruise1">
                                                Luxury Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cruise2"
                                                type="checkbox"
                                                id="cruise2"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cruise2">
                                                Adventure Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cruise3"
                                                type="checkbox"
                                                id="cruise3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cruise3">
                                                Expedition Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cruise4"
                                                type="checkbox"
                                                id="cruise4"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cruise4">
                                                River Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cruise5"
                                                type="checkbox"
                                                id="cruise5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cruise5">
                                                Family Cruise
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="cruise6"
                                                type="checkbox"
                                                id="cruise6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="cruise6">
                                                Economic Cruise
                                            </label>
                                        </div>
                                    </div>
                                    <Link href="#" className="more-view fw-medium fs-14" onClick={() => { setShowMenu3(!showMenu3) }}>{showMenu3 ? 'Show Less' : 'Show More'}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3 pb-2">
                            <div className="accordion-header">
                                <div
                                    className="accordion-button p-0"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion-guests"
                                    aria-expanded="true"
                                    aria-controls="accordion-guests"
                                    role="button"
                                >
                                    <i className="isax isax-timer me-2 text-primary" />
                                    Guests
                                </div>
                            </div>
                            <div
                                id="accordion-guests"
                                className="accordion-collapse collapse show"
                            >
                                <div className="accordion-body">
                                    <div className="">
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="guests1"
                                                type="checkbox"
                                                id="guests1"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guests1">
                                                1 - 5
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="guests2"
                                                type="checkbox"
                                                id="guests2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guests2">
                                                5 - 10
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="guests3"
                                                type="checkbox"
                                                id="guests3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guests3">
                                                10 - 15
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="guests4"
                                                type="checkbox"
                                                id="guests4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guests4">
                                                15 - 20
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="guests5"
                                                type="checkbox"
                                                id="guests5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="guests5">
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

    )
}

export default FliterSidebar
