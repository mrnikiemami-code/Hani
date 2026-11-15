"use client";
import  { useState } from 'react'
import ImageWithBasePath from '../../../components/image-with-base-path'
import Link from "next/link";
import BannerCounter from '../../../components/banner-counter/counter'
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import { all_routes } from '../../../routes/all_routes'

const StickyContent = () => {

    const routes = all_routes

    const [defaultDate] = useState(new Date());
  return (
    <div className='sticky-components'>
    {/* Availability */}
    <div className="card shadow-none">
        <div className="card-body">
            <div className="mb-3">
                <p className="fs-13 fw-medium mb-1">Rooms from</p>
                <h5 className="text-primary mb-1">$128 <span className="fs-14 text-default fw-normal">per night</span></h5>
            </div>
            <div className="banner-form">
                <form >
                    <div className="form-info border-0">
                        <div className="form-item border rounded p-3 mb-3 w-100">
                            <label className="form-label fs-14 text-default mb-0">Check In</label>
                            <DatePicker
                                className="form-control datetimepicker"
                                placeholder="dd/mm/yyyy"
                                defaultValue={defaultDate}
                                format="DD-MM-YYYY"
                              />
                            <p className="fs-12">Monday</p>
                        </div>
                        <div className="form-item border rounded p-3 mb-3 w-100">
                            <label className="form-label fs-14 text-default mb-0">Check Out</label>
                            <DatePicker 
                                className="form-control datetimepicker"
                                placeholder="dd/mm/yyyy"
                                defaultValue={defaultDate}
                                format="DD-MM-YYYY"
                              />
                            <p className="fs-12">Monday</p>
                        </div>
                        <div className="card shadow-none mb-3">
                            <div className="card-body p-3 pb-0">
                                <div className="border-bottom pb-2 mb-2">
                                    <h6>Details</h6>
                                </div>
                                <div className="custom-increment">
                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label className="form-label text-gray-9 mb-0">Adults</label>
                                        <BannerCounter/>
                                    </div>
                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label className="form-label text-gray-9">Infants <span className="text-default fw-normal mb-0">( 0-12 Yrs )</span></label>
                                        <BannerCounter/>
                                    </div>
                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label className="form-label text-gray-9 mb-0">Children <span className="text-default fw-normal">( 2-12 Yrs )</span></label>
                                        <BannerCounter/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href={routes.hotelRoomSelection} className="btn btn-primary btn-lg search-btn ms-0 mb-3 w-100 fs-14 d-flex justify-content-center">Select a Room</Link>
                </form>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-1">
                <p className="fs-14 text-dark d-inline-flex align-items-center mb-0"><i className="isax isax-eye me-2"></i>400 Views</p>
                <Link href={routes.hotelRoomSelection} className="link-primary text-decoration-underline fs-14">View rooms &amp; rates</Link>
            </div>
        </div>
    </div>
    {/* /Availability */}

    {/* Map */}
    <div className="card shadow-none" id="location">
        <div>
            <iframe src="https://www.google.com/maps?q=Ciutat%20Vella%2C%20Barcelona%2C%20Spain&output=embed"
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="contact-map"></iframe>
        </div>
        <div className="card-body">
            <div className="mb-1 d-flex align-items-center justify-content-between flex-wrap">
                <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>15,Adri Street,Ciutat Vella,Barcelona</p>
            </div>
            <h5 className="mb-3 fs-18">Nearby Landmarks & Visits</h5>
            <p className="d-flex align-items-center mb-2"><i className="isax isax-tick-circle me-2"></i>Near By Statue of Liberty</p>
            <p className="d-flex align-items-center mb-2"><i className="isax isax-tick-circle me-2"></i>The Metropolitan Museum of Art</p>
            <p className="d-flex align-items-center mb-0"><i className="isax isax-tick-circle me-2"></i>Yellowstone National Park</p>
        </div>
    </div>
    {/* /Map */}

    {/* Enquiry */}
    <div className="card shadow-none">
        <div className="card-body">
            <form >
                <h5 className="mb-3 fs-18">Enquire Us</h5>
                <div className="py-1">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" rows={3}></textarea>
                    </div>
                </div>
                <button type="button" className="btn btn-primary w-100 btn-lg d-flex align-items-center justify-content-center">Submit Enquiry</button>
            </form>
        </div>
    </div>
    {/* /Enquiry */}

    {/* Why Book With Us */}
    <div className="card shadow-none">
        <div className="card-body pb-0">
            <h5 className="mb-3 fs-18">Why Book With Us</h5>
            <div className="py-1">
                <p className="d-flex align-items-center mb-3"><i className="isax isax-medal-star text-primary me-2"></i>Expertise and Experience</p>
                <p className="d-flex align-items-center mb-3"><i className="isax isax-menu text-primary me-2"></i>Tailored Services</p>
                <p className="d-flex align-items-center mb-3"><i className="isax isax-message-minus text-primary me-2"></i>Comprehensive Planning</p>
                <p className="d-flex align-items-center mb-3"><i className="isax isax-user-add text-primary me-2"></i>Client Satisfaction</p>
                <p className="d-flex align-items-center mb-3"><i className="isax isax-grammerly text-primary me-2"></i>24/7 Support</p>
            </div>
        </div>
    </div>
    {/* /Why Book With Us */}

    {/* Provider Details */}
    <div className="card shadow-none mb-0">
        <div className="card-body">
            <h5 className="mb-3 fs-18">Provider Details</h5>
            <div className="py-1">
                <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                        <ImageWithBasePath src="assets/img/users/user-05.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div className="ms-2 overflow-hidden">
                        <h6 className="fw-medium text-truncate"><Link href="#">Adrian Hendriques</Link></h6>
                        <p className="fs-14">Member Since : 14 May 2024</p>
                    </div>
                </div>
                <div className="border br-10 mb-3 p-3">
                    <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary"><i className="isax isax-call-outgoing5"></i></span>
                        <p>Call Us : +1 12545 45548</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary"><i className="isax isax-message-search5"></i></span>
                        <p>Email : Info@example.com</p>
                    </div>
                </div>
            </div>
            <div className="row g-2">
                <div className="col-sm-6">
                    <Link href="#" className="btn btn-light d-flex align-items-center justify-content-center"><i className="isax isax-messages5 me-2"></i>Whatsapp Us</Link>
                </div>
                <div className="col-sm-6">
                    <Link href={routes.userChat} className="btn btn-primary d-flex align-items-center justify-content-center"><i className="isax isax-message-notif5 me-2"></i>Chat Now</Link>
                </div>
            </div>
        </div>
    </div>
    {/* /Provider Details */}
    </div>
  )
}

export default StickyContent