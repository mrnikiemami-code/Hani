"use client";
import Slider from '../../components/app-slider/appSlider'
import  { useState } from 'react'
import Link from "next/link";

const HotelFilter = () => {
    const [showMenu,setShowMenu] = useState(false)
    const [showMenu2,setShowMenu2] = useState(false)
    const [showMenu3,setShowMenu3] = useState(false)
    const [showMenu4,setShowMenu4] = useState(false)
    const [showMenu5,setShowMenu5] = useState(false)
  return (
    <div className="card filter-sidebar mb-4 mb-lg-0 theiaStickySidebar">
        <div className="card-header d-flex align-items-center justify-content-between">
            <h5>Filters</h5>
            <Link href="#" className="fs-14 link-primary">Reset</Link>
        </div>
        <div className="card-body p-0">
            <form>
                <div className="p-3 border-bottom">
                    <label className="form-label fs-16">Search by Hotel Name</label>
                    <input type="text" className="form-control" placeholder="Search by Hotel Name" />
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
                                    <input className="form-check-input ms-0 mt-0" name="popular1" type="checkbox" id="popular1" defaultChecked />
                                    <label className="form-check-label ms-2" htmlFor="popular1">
                                        Breakfast Included
                                    </label>
                                </div>
                                <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                    <input className="form-check-input ms-0 mt-0" name="popular2" type="checkbox" id="popular2" />
                                    <label className="form-check-label ms-2" htmlFor="popular2">
                                        Budget
                                    </label>
                                </div>
                                <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                    <input className="form-check-input ms-0 mt-0" name="popular3" type="checkbox" id="popular3" />
                                    <label className="form-check-label ms-2" htmlFor="popular3">
                                        4 Star Hotels
                                    </label>
                                </div>
                                <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                    <input className="form-check-input ms-0 mt-0" name="popular4" type="checkbox" id="popular4" />
                                    <label className="form-check-label ms-2" htmlFor="popular4">
                                        5 Star Hotels
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item border-bottom p-3">
                        <div className="accordion-header">
                            <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-popular1" aria-expanded="true" aria-controls="accordion-popular" role="button">
                                <i className="isax isax-coin me-2 text-primary"></i>Price Per Night
                            </div>
                        </div>
                        <div id="accordion-popular1" className="accordion-collapse collapse show">
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
                            <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-hotel" aria-expanded="true" aria-controls="accordion-hotel" role="button">
                                <i className="isax isax-buildings me-2 text-primary"></i>Hotel Types
                            </div>
                        </div>
                        <div id="accordion-hotel" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="more-content" style={{ height: !showMenu ? '148px' : '232px' }}>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel1" type="checkbox" id="hotel1" />
                                        <label className="form-check-label ms-2" htmlFor="hotel1">
                                            Hotels
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel2" type="checkbox" id="hotel2" />
                                        <label className="form-check-label ms-2" htmlFor="hotel2">
                                            Aparthotel
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel3" type="checkbox" id="hotel3" />
                                        <label className="form-check-label ms-2" htmlFor="hotel3">
                                            Villa
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel4" type="checkbox" id="hotel4" defaultChecked />
                                        <label className="form-check-label ms-2" htmlFor="hotel4">
                                            Apartment
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel5" type="checkbox" id="hotel5" />
                                        <label className="form-check-label ms-2" htmlFor="hotel5">
                                            Private Vacation Home
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel6" type="checkbox" id="hotel6" />
                                        <label className="form-check-label ms-2" htmlFor="hotel6">
                                            Guest House
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel7" type="checkbox" id="hotel7" />
                                        <label className="form-check-label ms-2" htmlFor="hotel7">
                                            Lodge
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="hotel8" type="checkbox" id="hotel8" />
                                        <label className="form-check-label ms-2" htmlFor="hotel8">
                                            Resort
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
                                        <input className="form-check-input ms-0 mt-0" name="amenity1" type="checkbox" id="amenity1" />
                                        <label className="form-check-label ms-2" htmlFor="amenity1">
                                            Free Wifi
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="amenity2" type="checkbox" id="amenity2" />
                                        <label className="form-check-label ms-2" htmlFor="amenity2">
                                            Breakfast Included
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="amenity3" type="checkbox" id="amenity3" />
                                        <label className="form-check-label ms-2" htmlFor="amenity3">
                                            Pool
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="amenity4" type="checkbox" id="amenity4" defaultChecked />
                                        <label className="form-check-label ms-2" htmlFor="amenity4">
                                            Free Parking
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="amenity5" type="checkbox" id="amenity5" />
                                        <label className="form-check-label ms-2" htmlFor="amenity5">
                                            Spa
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="amenity6" type="checkbox" id="amenity6" />
                                        <label className="form-check-label ms-2" htmlFor="amenity6">
                                            Gym
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="amenity7" type="checkbox" id="amenity7" />
                                        <label className="form-check-label ms-2" htmlFor="amenity7">
                                            Ocean view
                                        </label>
                                    </div>
                                </div>
                                <Link href="#" className="more-view fw-medium fs-14" onClick={()=>{setShowMenu2(!showMenu2)}}>{showMenu2 ?'Show Less':'Show More'}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item border-bottom p-3">
                        <div className="accordion-header">
                            <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-popular" aria-expanded="true" aria-controls="accordion-popular" role="button">
                                <i className="isax isax-maximize me-2 text-primary"></i>Distance
                            </div>
                        </div>
                        <div id="accordion-popular" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="filter-range-amount">
                                    <p className="fs-14">25km</p>
                                </div>
                                <div className="filter-range">
                                    <Slider  max={100} defaultValue={20}  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item border-bottom p-3">
                        <div className="accordion-header">
                            <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-cusine" aria-expanded="true" aria-controls="accordion-cusine" role="button">
                                <i className="isax isax-receipt-item me-2 text-primary"></i>Cusine
                            </div>
                        </div>
                        <div id="accordion-cusine" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="more-content" style={{ height: !showMenu3 ? '148px' : '232px' }}>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="cusine1" type="checkbox" id="cusine1" />
                                        <label className="form-check-label ms-2" htmlFor="cusine1">
                                            American
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="cusine2" type="checkbox" id="cusine2" />
                                        <label className="form-check-label ms-2" htmlFor="cusine2">
                                            Chinese
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="cusine3" type="checkbox" id="cusine3" />
                                        <label className="form-check-label ms-2" htmlFor="cusine3">
                                            Italian
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="cusine4" type="checkbox" id="cusine4" defaultChecked />
                                        <label className="form-check-label ms-2" htmlFor="cusine4">
                                            Mexican
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="cusine5" type="checkbox" id="cusine5" />
                                        <label className="form-check-label ms-2" htmlFor="cusine5">
                                            Indian
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="cusine6" type="checkbox" id="cusine6" />
                                        <label className="form-check-label ms-2" htmlFor="cusine6">
                                            Australian
                                        </label>
                                    </div>
                                </div>
                                <Link href="#" className="more-view fw-medium fs-14" onClick={()=>{setShowMenu3(!showMenu3)}}>{showMenu3 ?'Show Less':'Show More'}</Link>
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
                                    <input className="form-check-input ms-0 mt-0" name="meals1" type="checkbox" id="meals1" />
                                    <label className="form-check-label ms-2" htmlFor="meals1">
                                        All inclusive
                                    </label>
                                </div>
                                <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                    <input className="form-check-input ms-0 mt-0" name="meals2" type="checkbox" id="meals2" />
                                    <label className="form-check-label ms-2" htmlFor="meals2">
                                        Breakfast
                                    </label>
                                </div>
                                <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                    <input className="form-check-input ms-0 mt-0" name="meals3" type="checkbox" id="meals3" />
                                    <label className="form-check-label ms-2" htmlFor="meals3">
                                        Lunch
                                    </label>
                                </div>
                                <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                                    <input className="form-check-input ms-0 mt-0" name="meals4" type="checkbox" id="meals4" defaultChecked />
                                    <label className="form-check-label ms-2" htmlFor="meals4">
                                        Dinner
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item border-bottom p-3">
                        <div className="accordion-header">
                            <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-style" aria-expanded="true" aria-controls="accordion-style" role="button">
                                <i className="isax isax-building me-2 text-primary"></i>Style
                            </div>
                        </div>
                        <div id="accordion-style" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="more-content" style={{ height: !showMenu4 ? '148px' : '232px' }}>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="style1" type="checkbox" id="style1" />
                                        <label className="form-check-label ms-2" htmlFor="style1">
                                            Budget
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="style2" type="checkbox" id="style2" />
                                        <label className="form-check-label ms-2" htmlFor="style2">
                                            Midrange
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="style3" type="checkbox" id="style3" />
                                        <label className="form-check-label ms-2" htmlFor="style3">
                                            Luxury
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="style4" type="checkbox" id="style4" defaultChecked />
                                        <label className="form-check-label ms-2" htmlFor="style4">
                                            Family Friendly
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="style5" type="checkbox" id="style5" />
                                        <label className="form-check-label ms-2" htmlFor="style5">
                                            Business
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="style6" type="checkbox" id="style6" />
                                        <label className="form-check-label ms-2" htmlFor="style6">
                                            Romantic
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="style7" type="checkbox" id="style7" />
                                        <label className="form-check-label ms-2" htmlFor="style7">
                                            Modern
                                        </label>
                                    </div>
                                </div>
                                <Link href="#" className="more-view fw-medium fs-14" onClick={()=>{setShowMenu4(!showMenu4)}}>{showMenu4 ?'Show Less':'Show More'}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item border-bottom p-3">
                        <div className="accordion-header">
                            <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-brands" aria-expanded="true" aria-controls="accordion-brands" role="button">
                                <i className="isax isax-discount-shape me-2 text-primary"></i>Reviews
                            </div>
                        </div>
                        <div id="accordion-brands" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                    <input className="form-check-input ms-0 mt-0" name="review1" type="checkbox" id="review1" />
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
                                    <input className="form-check-input ms-0 mt-0" name="review2" type="checkbox" id="review2" />
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
                                    <input className="form-check-input ms-0 mt-0" name="review3" type="checkbox" id="review3" />
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
                                    <input className="form-check-input ms-0 mt-0" name="review4" type="checkbox" id="review4" />
                                    <label className="form-check-label ms-2" htmlFor="review4">
                                        <span className="rating d-flex align-items-center">
                                            <i className="fas fa-star filled text-primary me-1"></i>
                                            <i className="fas fa-star filled text-primary"></i>
                                            <span className="ms-2">2 Star</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check d-flex align-items-center ps-0 mb-0">
                                    <input className="form-check-input ms-0 mt-0" name="review5" type="checkbox" id="review5" />
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
                    <div className="accordion-item border-bottom p-3">
                        <div className="accordion-header">
                            <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-brand" aria-expanded="true" aria-controls="accordion-brand" role="button">
                                <i className="isax isax-cd me-2 text-primary"></i>Brands
                            </div>
                        </div>
                        <div id="accordion-brand" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="more-content" style={{ height: !showMenu5 ? '148px' : '232px' }}>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="brand1" type="checkbox" id="brand1" />
                                        <label className="form-check-label ms-2" htmlFor="brand1">
                                            OYO
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="brand2" type="checkbox" id="brand2" />
                                        <label className="form-check-label ms-2" htmlFor="brand2">
                                            Fab Hotels
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="brand3" type="checkbox" id="brand3" />
                                        <label className="form-check-label ms-2" htmlFor="brand3">
                                            Treebo
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="brand4" type="checkbox" id="brand4" defaultChecked />
                                        <label className="form-check-label ms-2" htmlFor="brand4">
                                            The Park Hotels
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="brand5" type="checkbox" id="brand5" />
                                        <label className="form-check-label ms-2" htmlFor="brand5">
                                            Hotel Taj
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                        <input className="form-check-input ms-0 mt-0" name="brand6" type="checkbox" id="brand6" />
                                        <label className="form-check-label ms-2" htmlFor="brand6">
                                            Raddission
                                        </label>
                                    </div>
                                </div>
                                <Link href="#" className="more-view fw-medium fs-14" onClick={()=>{setShowMenu5(!showMenu5)}}>{showMenu5 ?'Show Less':'Show More'}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default HotelFilter