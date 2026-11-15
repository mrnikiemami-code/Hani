"use client";
import Slider from '../../components/app-slider/appSlider'
import  { useState } from 'react'
import Link from "next/link";

const FlightFilter = () => {
    const [showMenu,setShowMenu] = useState(false)
    const [showMenu2,setShowMenu2] = useState(false)
    const [showMenu3,setShowMenu3] = useState(false)
  return (
    <>
    {/* Sidebar */}
    <div className="col-xl-3 col-lg-3 ">
        <div className="card filter-sidebar mb-4 mb-lg-0 theiaStickySidebar">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5>Filters</h5>
                <Link href="#" className="fs-14 link-primary">Reset</Link>
            </div>
            <div className="card-body p-0">
                <form >
                    <div className="p-3 border-bottom">
                        <label className="form-label fs-16">Search by Airline Names</label>
                        <div className="input-icon">
                            <span className="input-icon-addon">
                                <i className="isax isax-search-normal"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Search by Airline Names"/>
                        </div>
                    </div>
                    <div className="accordion accordion-list">
                        <div className="accordion-item border-bottom p-3">
                            <div className="accordion-header">
                                <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-populars" aria-expanded="true" aria-controls="accordion-populars" role="button">
                                    <i className="isax isax-ranking me-2 text-primary"></i>Popular
                                </div>
                            </div>
                            <div id="accordion-populars" className="accordion-collapse collapse show">
                                <div className="accordion-body pt-2">
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="popular1" type="checkbox" id="popular1" defaultChecked/>
                                        <label className="form-check-label ms-2" htmlFor="popular1">
                                            Breakfast Included
                                        </label>
                                    </div>
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="popular2" type="checkbox" id="popular2"/>
                                        <label className="form-check-label ms-2" htmlFor="popular2">
                                            Budget
                                        </label>
                                    </div>
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="popular3" type="checkbox" id="popular3"/>
                                        <label className="form-check-label ms-2" htmlFor="popular3">
                                            4 Star Hotels
                                        </label>
                                    </div>
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="popular4" type="checkbox" id="popular4"/>
                                        <label className="form-check-label ms-2" htmlFor="popular4">
                                            5 Star Hotels
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                            <div className="accordion-header">
                                <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-popular" aria-expanded="true" aria-controls="accordion-popular" role="button">
                                    <i className="isax isax-coin me-2 text-primary"></i>Price Per Person
                                </div>
                            </div>
                            <div id="accordion-popular" className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <div className="filter-range">
                                        <Slider range  min={0} max={1000} defaultValue={[200, 800]}  />
                                    </div>
                                    <div className="filter-range-amount">
                                        <p className="fs-14">Range : <span className="text-gray-9 fw-medium">$200 - $5695</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                            <div className="accordion-header">
                                <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-flight" aria-expanded="true" aria-controls="accordion-flight" role="button">
                                    <i className="isax isax-airplane4 me-2 text-primary"></i>Airline Names
                                </div>
                            </div>
                            <div id="accordion-flight" className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <div className="more-content" style={{ height: !showMenu ? '148px' : '232px' }}>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight1" type="checkbox" id="flight1"/>
                                            <label className="form-check-label ms-2" htmlFor="flight1">
                                                American Airlines
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight2" type="checkbox" id="flight2"/>
                                            <label className="form-check-label ms-2" htmlFor="flight2">
                                                Delta Air Lines
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight3" type="checkbox" id="flight3"/>
                                            <label className="form-check-label ms-2" htmlFor="flight3">
                                                Emirates
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight4" type="checkbox" id="flight4"/>
                                            <label className="form-check-label ms-2" htmlFor="flight4">
                                                Air France
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight5" type="checkbox" id="flight5"/>
                                            <label className="form-check-label ms-2" htmlFor="flight5">
                                                Japan Airlines
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight6" type="checkbox" id="flight6"/>
                                            <label className="form-check-label ms-2" htmlFor="flight6">
                                                Qatar Airways
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight7" type="checkbox" id="flight7"/>
                                            <label className="form-check-label ms-2" htmlFor="flight7">
                                                Air Canada
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="flight8" type="checkbox" id="flight8"/>
                                            <label className="form-check-label ms-2" htmlFor="flight8">
                                                United Airlines
                                            </label>
                                        </div>
                                    </div>
                                    <Link href="#" onClick={()=>{setShowMenu(!showMenu)}} className="more-view fw-medium fs-14">{showMenu ?'Show Less':'Show More'}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                            <div className="accordion-header">
                                <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-amenity" aria-expanded="true" aria-controls="accordion-amenity" role="button">
                                    <i className="isax isax-candle me-2 text-primary"></i>Amenities
                                </div>
                            </div>
                            <div id="accordion-amenity" className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <div className="more-content" style={{ height: !showMenu2 ? '148px' : '232px' }}>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenity1" type="checkbox" id="amenity1"/>
                                            <label className="form-check-label ms-2" htmlFor="amenity1">
                                                Free Wifi
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenity2" type="checkbox" id="amenity2"/>
                                            <label className="form-check-label ms-2" htmlFor="amenity2">
                                                Charging Ports
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenity3" type="checkbox" id="amenity3"/>
                                            <label className="form-check-label ms-2" htmlFor="amenity3">
                                                Entertainment
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenity4" type="checkbox" id="amenity4"/>
                                            <label className="form-check-label ms-2" htmlFor="amenity4">
                                                Blankets & Pillows
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenity5" type="checkbox" id="amenity5"/>
                                            <label className="form-check-label ms-2" htmlFor="amenity5">
                                                Adjustable headrests
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenity6" type="checkbox" id="amenity6"/>
                                            <label className="form-check-label ms-2" htmlFor="amenity6">
                                                Complimentary meals
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenity7" type="checkbox" id="amenity7"/>
                                            <label className="form-check-label ms-2" htmlFor="amenity7">
                                                Privacy dividers
                                            </label>
                                        </div>
                                    </div>
                                    <Link href="#" onClick={()=>{setShowMenu2(!showMenu2)}} className="more-view fw-medium fs-14">{showMenu2 ?'Show Less':'Show More'}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                            <div className="accordion-header">
                                <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-cabin" aria-expanded="true" aria-controls="accordion-cabin" role="button">
                                    <i className="isax isax-home-2 me-2 text-primary"></i>Cabin Class
                                </div>
                            </div>
                            <div id="accordion-cabin" className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <div className="more-content" style={{ height: !showMenu3 ? '148px' : '232px' }}>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="cabin1" type="checkbox" id="cabin1"/>
                                            <label className="form-check-label ms-2" htmlFor="cabin1">
                                                Economy
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="cabin2" type="checkbox" id="cabin2"/>
                                            <label className="form-check-label ms-2" htmlFor="cabin2">
                                                Premium Economy
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="cabin3" type="checkbox" id="cabin3"/>
                                            <label className="form-check-label ms-2" htmlFor="cabin3">
                                                Business Class
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="cabin4" type="checkbox" id="cabin4"/>
                                            <label className="form-check-label ms-2" htmlFor="cabin4">
                                                First Class
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="cabin5" type="checkbox" id="cabin5"/>
                                            <label className="form-check-label ms-2" htmlFor="cabin5">
                                                Basic Economy
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="cabin6" type="checkbox" id="cabin6"/>
                                            <label className="form-check-label ms-2" htmlFor="cabin6">
                                                Suite Class
                                            </label>
                                        </div>
                                    </div>
                                    <Link href="#" onClick={()=>{setShowMenu3(!showMenu3)}} className="more-view fw-medium fs-14">{showMenu3 ?'Show Less':'Show More'}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                            <div className="accordion-header">
                                <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-meal" aria-expanded="true" aria-controls="accordion-meal" role="button">
                                    <i className="isax isax-reserve me-2 text-primary"></i>Meal plans available
                                </div>
                            </div>
                            <div id="accordion-meal" className="accordion-collapse collapse show">
                                <div className="accordion-body pt-2">
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="meals1" type="checkbox" id="meals1"/>
                                        <label className="form-check-label ms-2" htmlFor="meals1">
                                            All inclusive
                                        </label>
                                    </div>
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="meals2" type="checkbox" id="meals2"/>
                                        <label className="form-check-label ms-2" htmlFor="meals2">
                                            Breakfast
                                        </label>
                                    </div>
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="meals3" type="checkbox" id="meals3"/>
                                        <label className="form-check-label ms-2" htmlFor="meals3">
                                            Lunch
                                        </label>
                                    </div>
                                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                        <input className="form-check-input ms-0 mt-0" name="meals4" type="checkbox" id="meals4"/>
                                        <label className="form-check-label ms-2" htmlFor="meals4">
                                            Dinner
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-bottom p-3">
                            <div className="accordion-header">
                                <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-brand" aria-expanded="true" aria-controls="accordion-brand" role="button">
                                    <i className="isax isax-discount-shape me-2 text-primary"></i>Reviews
                                </div>
                            </div>
                            <div id="accordion-brand" className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="review1" type="checkbox" id="review1"/>
                                        <label className="form-check-label ms-2" htmlFor="review1">
                                            <span className="rating d-flex align-items-center">
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary"></i>
                                                <span className="ms-2">5 Star</span>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="review2" type="checkbox" id="review2"/>
                                        <label className="form-check-label ms-2" htmlFor="review2">
                                            <span className="rating d-flex align-items-center">
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary"></i>
                                                <span className="ms-2">4 Star</span>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="review3" type="checkbox" id="review3"/>
                                        <label className="form-check-label ms-2" htmlFor="review3">
                                            <span className="rating d-flex align-items-center">
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary"></i>
                                                <span className="ms-2">3 Star</span>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="review4" type="checkbox" id="review4"/>
                                        <label className="form-check-label ms-2" htmlFor="review4">
                                            <span className="rating d-flex align-items-center">
                                                <i className="fas fa-star filled text-primary me-1"></i>
                                                <i className="fas fa-star filled text-primary"></i>
                                                <span className="ms-2">2 Star</span>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-0">
                                        <input className="form-check-input ms-0 mt-0" name="review5" type="checkbox" id="review5"/>
                                        <label className="form-check-label ms-2" htmlFor="review5">
                                            <span className="rating d-flex align-items-center">
                                                <i className="fas fa-star filled text-primary"></i>
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
    {/* /Sidebar */}
    </>
  )
}

export default FlightFilter