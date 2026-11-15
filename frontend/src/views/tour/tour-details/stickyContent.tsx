"use client";
import  { useState } from 'react'
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import BannerCounter from '../../../components/banner-counter/counter';
import { all_routes } from '../../../routes/all_routes';


const StickyContent = () => {

     const routes = all_routes;

    const [defaultDate] = useState(new Date());

    return (
        <div className=''>
            <div className="card bg-light-200">
                <div className="card-body">
                    <h5 className="d-flex align-items-center fs-18 mb-3">
                        <span className="avatar avatar-md rounded-circle bg-primary me-2">
                            <i className="isax isax-signpost5" />
                        </span>
                        Tour Details
                    </h5>
                    <div>
                        <div className="d-flex align-items-center justify-content-between details-info">
                            <h6 className="fw-medium">Date</h6>
                            <p className="flex-fill">25 May 2025 - 28 May 2025</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between details-info">
                            <h6 className="fw-medium">Destination</h6>
                            <p className="flex-fill">Cusco, Peru</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between details-info">
                            <h6 className="fw-medium">Duration</h6>
                            <p className="flex-fill">4 Day, 3 Night</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between details-info">
                            <h6 className="fw-medium">Departure</h6>
                            <p className="flex-fill">25 May 2025, 04:45 AM</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between details-info">
                            <h6 className="fw-medium">Return</h6>
                            <p className="flex-fill">28 May 2025, 06:30 PM</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between details-info">
                            <h6 className="fw-medium">Group Size</h6>
                            <p className="flex-fill">12 travellers max</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow-none">
                <div className="card-body">
                    <div className="mb-3">
                        <p className="fs-13 fw-medium mb-1">Starts From</p>
                        <h5 className="text-primary mb-1">
                            $500{" "}
                            <span className="fs-14 text-default fw-normal">/ Night</span>
                        </h5>
                    </div>
                    <div className="banner-form">
                        <form >
                            <div className="form-info border-0">
                                <div className="form-item border rounded p-3 mb-3 w-100">
                                    <label className="form-label fs-14 text-default mb-0">
                                        From
                                    </label>
                                    <DatePicker
                                        className="form-control datetimepicker"
                                        placeholder="dd/mm/yyyy"
                                        defaultValue={defaultDate}
                                        format="DD-MM-YYYY"
                                    />
                                    <p className="fs-12">Monday</p>
                                </div>
                                <div className="form-item border rounded p-3 mb-3 w-100">
                                    <label className="form-label fs-14 text-default mb-0">
                                        To
                                    </label>
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
                                                <label className="form-label text-gray-9 mb-0">
                                                    Adults
                                                </label>
                                                <BannerCounter />
                                            </div>
                                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-0">
                                                    Infants{" "}
                                                    <span className="text-default fw-normal">
                                                        ( 0-12 Yrs )
                                                    </span>
                                                </label>
                                                <BannerCounter />
                                            </div>
                                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-0">
                                                    Children{" "}
                                                    <span className="text-default fw-normal">
                                                        ( 2-12 Yrs )
                                                    </span>
                                                </label>
                                                <BannerCounter />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg search-btn ms-0 w-100 fs-14 d-flex justify-content-center"
                            >
                                Book Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="card shadow-none">
                <div className="card-body">
                    <h5 className="fs-18 mb-3">Why Book With Us</h5>
                    <div>
                        <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-medal-star text-primary me-2" />
                            Expertise and Experience
                        </p>
                        <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-menu text-primary me-2" />
                            Tailored Services
                        </p>
                        <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-message-minus text-primary me-2" />
                            Comprehensive Planning
                        </p>
                        <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-user-add text-primary me-2" />
                            Client Satisfaction
                        </p>
                        <p className="d-flex align-items-center">
                            <i className="isax isax-grammerly text-primary me-2" />
                            24/7 Support
                        </p>
                    </div>
                </div>
            </div>
            <div className="card shadow-none">
                <div className="card-body">
                    <h5 className="fs-18 mb-3">Enquire Us</h5>
                    <div className="banner-form">
                        <form action={routes.tourDetails}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    defaultValue={""}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg search-btn ms-0 w-100 fs-14 d-flex justify-content-center"
                            >
                                Submit Enquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="card shadow-none mb-0">
                <div className="card-body">
                    <h5 className="fs-18 mb-3">Provider Details</h5>
                    <div className="py-1">
                        <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
                            <Link
                                href="#"
                                className="avatar avatar-lg flex-shrink-0"
                            >
                                <ImageWithBasePath
                                    src="assets/img/users/user-05.jpg"
                                    alt="img"
                                    className="rounded-circle"
                                />
                            </Link>
                            <div className="ms-2 overflow-hidden">
                                <h6 className="fw-medium text-truncate">
                                    <Link href="#">Adrian Hendriques</Link>
                                </h6>
                                <p className="fs-14">Member Since : 14 May 2024</p>
                            </div>
                        </div>
                        <div className="border br-10 mb-3 p-3">
                            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                                <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                                    <i className="isax isax-call-outgoing5" />
                                </span>
                                <p>Call Us : +1 12545 45548</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                                    <i className="isax isax-message-search5" />
                                </span>
                                <p>Email : Info@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-sm-6">
                            <Link
                                href="#"
                                className="btn btn-light d-flex align-items-center justify-content-center"
                            >
                                <i className="isax isax-messages5 me-2" />
                                Whatsapp Us
                            </Link>
                        </div>
                        <div className="col-sm-6">
                            <Link
                                href={routes.userChat}
                                className="btn btn-primary d-flex align-items-center justify-content-center"
                            >
                                <i className="isax isax-message-notif5 me-2" />
                                Chat Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StickyContent
