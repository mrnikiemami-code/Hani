"use client";
import  { useState } from 'react'
import Link from "next/link";
import Slider from '../../components/app-slider/appSlider'
const CarFilter = () => {
    const [showMenu,setShowMenu] = useState(false)
    const [showMenu2,setShowMenu2] = useState(false)
  return (
   <>
  {/* Sidebar */}
  <div className="col-xl-3 col-lg-4 ">
      <div className="card filter-sidebar mb-4 mb-lg-0 theiaStickySidebar">
          <div className="card-header d-flex align-items-center justify-content-between">
              <h5>Filters</h5>
              <Link href="#" className="fs-14 link-primary">Reset</Link>
          </div>
          <div className="card-body p-0">
              <form >
                  <div className="p-3 border-bottom">
                      <label className="form-label fs-16">Search by Car Name</label>
                      <div className="input-icon">
                          <span className="input-icon-addon">
                            <i className="isax isax-search-normal"></i>
                          </span>
                          <input type="text" className="form-control" placeholder="Search by Car Name" />
                      </div>
                  </div>
                  <div className="accordion accordion-list">
                      <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                              <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-populars" aria-expanded="true" aria-controls="accordion-populars" role="button">
                                  <i className="isax isax-coin me-2 text-primary"></i>Price Per Day
                              </div>
                          </div>
                          <div id="accordion-populars" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                  <div className="filter-range">
                                      <Slider range  min={200} max={5695} defaultValue={[500, 2000]}  />
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
                                  <i className="isax isax-car me-2 text-primary"></i>Car Brands
                              </div>
                          </div>
                          <div id="accordion-hotel" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                  <div className="more-content" style={{ height: !showMenu ? '148px' : '232px' }}>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel1" type="checkbox" id="hotel1" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="hotel1">
                                              Toyota
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel2" type="checkbox" id="hotel2" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="hotel2">
                                              Ford
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel3" type="checkbox" id="hotel3" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="hotel3">
                                              Honda
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel4" type="checkbox" id="hotel4" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="hotel4">
                                              BMW
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel5" type="checkbox" id="hotel5" />
                                          <label className="form-check-label ms-2" htmlFor="hotel5">
                                              Mercedes-Benz
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel6" type="checkbox" id="hotel6" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="hotel6">
                                              Tesla
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel7" type="checkbox" id="hotel7" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="hotel7">
                                              Audi
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="hotel8" type="checkbox" id="hotel8" />
                                          <label className="form-check-label ms-2" htmlFor="hotel8">
                                              Chevrolet
                                          </label>
                                      </div>
                                  </div>
                                  <Link href="#" onClick={()=>{setShowMenu(!showMenu)}} className="more-view text-primary fw-medium fs-14">{showMenu ?'See Less':'See More'}</Link>
                              </div>
                          </div>
                      </div>
                      <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                              <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-amenity" aria-expanded="true" aria-controls="accordion-amenity" role="button">
                                  <i className="isax isax-smart-car me-2 text-primary"></i>Car Type
                              </div>
                          </div>
                          <div id="accordion-amenity" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                  <div className="more-content" style={{ height: !showMenu2 ? '148px' : '232px' }}>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="amenity1" type="checkbox" id="amenity1" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="amenity1">
                                              Sedan
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="amenity2" type="checkbox" id="amenity2" />
                                          <label className="form-check-label ms-2" htmlFor="amenity2">
                                              EV
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="amenity3" type="checkbox" id="amenity3" />
                                          <label className="form-check-label ms-2" htmlFor="amenity3">
                                              Crossover
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="amenity4" type="checkbox" id="amenity4" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="amenity4">
                                              Sports
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="amenity5" type="checkbox" id="amenity5" />
                                          <label className="form-check-label ms-2" htmlFor="amenity5">
                                              Van
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="amenity6" type="checkbox" id="amenity6" />
                                          <label className="form-check-label ms-2" htmlFor="amenity6">
                                              Wagon
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="amenity7" type="checkbox" id="amenity7" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="amenity7">
                                              SUV
                                          </label>
                                      </div>

                                  </div>
                                  <Link href="#" onClick={()=>{setShowMenu2(!showMenu2)}} className="more-view fw-medium fs-14">{showMenu2 ?'Show Less':'Show All'}</Link>
                              </div>
                          </div>
                      </div>
                      <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                              <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-cusine" aria-expanded="true" aria-controls="accordion-cusine" role="button">
                                  <i className="isax isax-gas-station me-2 text-primary"></i>Fuel
                              </div>
                          </div>
                          <div id="accordion-cusine" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                  <div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="cusine1" type="checkbox" id="cusine1" />
                                          <label className="form-check-label ms-2" htmlFor="cusine1">
                                              Petrol
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="cusine2" type="checkbox" id="cusine2" />
                                          <label className="form-check-label ms-2" htmlFor="cusine2">
                                              Diesel
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="cusine3" type="checkbox" id="cusine3" />
                                          <label className="form-check-label ms-2" htmlFor="cusine3">
                                              Hybrid
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="cusine4" type="checkbox" id="cusine4" />
                                          <label className="form-check-label ms-2" htmlFor="cusine4">
                                              CNG
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0">
                                          <input className="form-check-input ms-0 mt-0" name="cusine5" type="checkbox" id="cusine5" />
                                          <label className="form-check-label ms-2" htmlFor="cusine5">
                                              EV
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                              <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-meal" aria-expanded="true" aria-controls="accordion-meal" role="button">
                                  <i className="isax isax-kanban me-2 text-primary"></i>Gear
                              </div>
                          </div>
                          <div id="accordion-meal" className="accordion-collapse collapse show">
                              <div className="accordion-body pt-2">
                                  <div className="form-check d-flex align-items-center ps-0 mb-2">
                                      <input className="form-check-input ms-0 mt-0" name="meals1" type="checkbox" id="meals1" />
                                      <label className="form-check-label ms-2" htmlFor="meals1">
                                          Manual
                                      </label>
                                  </div>
                                  <div className="form-check d-flex align-items-center ps-0 mb-2">
                                      <input className="form-check-input ms-0 mt-0" name="meals2" type="checkbox" id="meals2" />
                                      <label className="form-check-label ms-2" htmlFor="meals2">
                                          Auto
                                      </label>
                                  </div>
                                  <div className="form-check d-flex align-items-center ps-0">
                                      <input className="form-check-input ms-0 mt-0" name="meals3" type="checkbox" id="meals3" />
                                      <label className="form-check-label ms-2" htmlFor="meals3">
                                          Hybrid
                                      </label>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                              <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-style" aria-expanded="true" aria-controls="accordion-style" role="button">
                                  <i className="isax isax-tag-user me-2 text-primary"></i>Capacity
                              </div>
                          </div>
                          <div id="accordion-style" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                  <div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="style1" type="checkbox" id="style1" />
                                          <label className="form-check-label ms-2" htmlFor="style1">
                                              2 Seater
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="style2" type="checkbox" id="style2" />
                                          <label className="form-check-label ms-2" htmlFor="style2">
                                              4 Seater
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0 mb-2">
                                          <input className="form-check-input ms-0 mt-0" name="style3" type="checkbox" id="style3" />
                                          <label className="form-check-label ms-2" htmlFor="style3">
                                              5 Seater
                                          </label>
                                      </div>
                                      <div className="form-check d-flex align-items-center ps-0">
                                          <input className="form-check-input ms-0 mt-0" name="style4" type="checkbox" id="style4" defaultChecked />
                                          <label className="form-check-label ms-2" htmlFor="style4">
                                              7 Seater
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="accordion-item border-bottom p-3">
                          <div className="accordion-header">
                              <div className="accordion-button p-0" data-bs-toggle="collapse" data-bs-target="#accordion-popular" aria-expanded="true" aria-controls="accordion-popular" role="button">
                                  <i className="isax isax-routing-2 me-2 text-primary"></i>Travelled
                              </div>
                          </div>
                          <div id="accordion-popular" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                  <div className="filter-range">
                                  <Slider range  min={100} max={2000} defaultValue={[500, 800]}  />
                                  </div>
                                  <div className="filter-range-amount">
                                      <p className="fs-14">Range : <span className="text-gray-9 fw-medium">10000 Km - 20000 Km</span></p>
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
                  </div>
              </form>
          </div>
      </div>
  </div>
  {/* /Sidebar */}
   </>
  )
}

export default CarFilter