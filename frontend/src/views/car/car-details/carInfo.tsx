"use client";
import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageWithBasePath from '../../../components/image-with-base-path'
import { all_routes } from '../../../routes/all_routes'
import { DatePicker, TimePicker } from '../../../components/common-date-picker/appDatePicker'
import { parseTime } from '../../../utils/dateFormat'
import BannerCounter from '../../../components/banner-counter/counter';

const CarInfo = () => {
     const nextRouter = useRouter();
  const navigate = (to: string) => nextRouter.push(to);
     const [defaultDate] = useState(new Date());
     const defaultTime = parseTime('10:30 AM');
      const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        navigate(all_routes.carBooking);
      };
  return (
    <div className="">
        <div className="card shadow-none">
            <div className="card-body">
                <h5 className="fs-18 mb-3">Check Availability</h5>
                <div className="d-flex align-items-center flex-wrap mb-2">
                    <div className="form-check me-3 d-flex mb-2">
                        <input className="form-check-input me-2" type="radio" name="availability" id="available_1" defaultChecked />
                        <label className="form-check-label" htmlFor="available_1">
                            Same drop-off
                        </label>
                    </div>
                    <div className="form-check me-3 d-flex mb-2">
                        <input className="form-check-input me-2" type="radio" name="availability" id="available_2" />
                        <label className="form-check-label" htmlFor="available_2">
                            Different Drop off
                        </label>
                    </div>
                    <div className="form-check me-3 d-flex mb-2">
                        <input className="form-check-input me-2" type="radio" name="availability" id="available_3" />
                        <label className="form-check-label" htmlFor="available_3">
                            Airport
                        </label>
                    </div>
                    <div className="form-check me-3 d-flex mb-2">
                        <input className="form-check-input me-2" type="radio" name="availability" id="available_4" />
                        <label className="form-check-label" htmlFor="available_4">
                            Hourly Package
                        </label>
                    </div>
                </div>
                <div className="banner-form">
                    <form  onSubmit={handleFormSubmit} className="form-info border-0">
                        <div className="d-flex align-items-center border rounded mb-3">
                            <div className="flex-fill">
                                <div className="form-item dropdown from-location p-3">
                                    <div data-bs-toggle="dropdown" data-bs-auto-close="outside"  role="menu">
                                        <label className="form-label fs-14 text-default mb-1">From</label>
                                        <input type="text" className="form-control" defaultValue="New York" />
                                        <p className="fs-12 mb-0">USA</p>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                        <div className="input-search p-3 border-bottom">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search for Cars" />
                                                <span className="input-group-text px-2 border-start-0"><i className="isax isax-search-normal"></i></span>
                                            </div>
                                        </div>
                                        <ul>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">USA</h6>
                                                    <p>2000 Cars</p>
                                                </Link>
                                            </li>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Japan</h6>
                                                    <p>3000 Cars</p>
                                                </Link>
                                            </li>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Singapore</h6>
                                                    <p>8000 Cars</p>
                                                </Link>
                                            </li>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Russia</h6>
                                                    <p>8000 Cars</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Germany</h6>
                                                    <p>6000 Cars</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-item dropdown pickup-airport p-3">
                                    <div data-bs-toggle="dropdown" data-bs-auto-close="outside"  role="menu">
                                        <label className="form-label fs-14 text-default mb-1">From</label>
                                        <input type="text" className="form-control" defaultValue="New York" />
                                        <p className="fs-12 mb-0">John F. Kennedy International Airport</p>
                                    </div>
                                    <div className="dropdown-menu dropdown-md p-0">
                                        <div className="input-search p-3 border-bottom">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search for Airport" />
                                                <span className="input-group-text px-2 border-start-0"><i className="isax isax-search-normal"></i></span>
                                            </div>
                                        </div>
                                        <ul>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Hartsfield-Jackson Atlanta International</h6>
                                                    <p>USA</p>
                                                </Link>
                                            </li>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Dallas/Fort Worth International</h6>
                                                    <p>USA</p>
                                                </Link>
                                            </li>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">London Heathrow</h6>
                                                    <p>UK</p>
                                                </Link>
                                            </li>
                                            <li className="border-bottom">
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Seoul Incheon</h6>
                                                    <p>South Korea</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" href="#">
                                                    <h6 className="fs-16 fw-medium">Singapore Changi International</h6>
                                                    <p>Singapore</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="form-item dropdown to-location flex-fill ps-3 ps-sm-4 p-2">
                                <div data-bs-toggle="dropdown" data-bs-auto-close="outside"  role="menu">
                                    <label className="form-label fs-14 text-default mb-1">To</label>
                                    <input type="text" className="form-control" defaultValue="Las Vegas" />
                                    <p className="fs-12 mb-0">USA</p>
                                    <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                                    </span>
                                </div>
                                <div className="dropdown-menu dropdown-md p-0">
                                    <div className="input-search p-3 border-bottom">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search for Cars" />
                                            <span className="input-group-text px-2 border-start-0"><i className="isax isax-search-normal"></i></span>
                                        </div>
                                    </div>
                                    <ul>
                                        <li className="border-bottom">
                                            <Link className="dropdown-item" href="#">
                                                <h6 className="fs-16 fw-medium">USA</h6>
                                                <p>2000 Cars</p>
                                            </Link>
                                        </li>
                                        <li className="border-bottom">
                                            <Link className="dropdown-item" href="#">
                                                <h6 className="fs-16 fw-medium">Japan</h6>
                                                <p>3000 Cars</p>
                                            </Link>
                                        </li>
                                        <li className="border-bottom">
                                            <Link className="dropdown-item" href="#">
                                                <h6 className="fs-16 fw-medium">Singapore</h6>
                                                <p>8000 Cars</p>
                                            </Link>
                                        </li>
                                        <li className="border-bottom">
                                            <Link className="dropdown-item" href="#">
                                                <h6 className="fs-16 fw-medium">Russia</h6>
                                                <p>8000 Cars</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">
                                                <h6 className="fs-16 fw-medium">Germany</h6>
                                                <p>6000 Cars</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="form-info border-0">
                            <div className="form-item border rounded p-3 mb-3 w-100">
                                <label className="form-label fs-14 text-default mb-0">Departure</label>
                                <DatePicker
                                className="form-control datetimepicker"
                                placeholder="dd/mm/yyyy"
                                defaultValue={defaultDate}
                                format="DD-MM-YYYY"
                                />
                                <p className="fs-12">Monday</p>
                            </div>
                            <div className="form-item border rounded p-3 mb-3 w-100">
                                <label className="form-label fs-14 text-default mb-0">Return</label>
                                <DatePicker
                                className="form-control datetimepicker"
                                placeholder="dd/mm/yyyy"
                                defaultValue={defaultDate}
                                format="DD-MM-YYYY"
                                />
                                <p className="fs-12">Wednesday</p>
                            </div>
                            <div className="form-item border rounded p-3 mb-3 w-100">
                                <label className="form-label fs-14 text-default mb-1">Pickup Time</label>
                                <TimePicker
                                defaultValue ={defaultTime}
                                format="h:mm A"
                                className="form-control timepicker"
                                />
                            </div>
                            <div className="form-item border rounded p-3 mb-3 w-100">
                                <label className="form-label fs-14 text-default mb-1">Dropoff Time</label>
                                <TimePicker
                                defaultValue ={defaultTime}
                                format="h:mm A"
                                className="form-control timepicker"
                                />
                            </div>
                        </div>
                        <div className="card shadow-none mb-3">
                            <div className="card-body p-3 pb-0">
                                <div className="border-bottom pb-2 mb-2">
                                    <h6>Details</h6>
                                </div>
                                <div className="custom-increment">
                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label className="form-label text-gray-9">Passengers</label>
                                        <BannerCounter/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 className="text-success fs-14 fw-medium mb-3">Available For Ride</h6>
                        <button type="submit" className="btn btn-primary btn-lg search-btn ms-0 mb-3 w-100 fs-14 justify-content-center">Book Now</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="card shadow-none">
            <div className="card-body">
                <h5 className="fs-18 mb-3">Why Book With Us</h5>
                <div>
                    <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                            <i className="isax isax-medal-star"></i>
                        </span>Expertise and Experience
                    </p>
                    <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                            <i className="isax isax-menu"></i>
                        </span>Tailored Services
                    </p>
                    <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                            <i className="isax isax-message-minus"></i>
                        </span>Comprehensive Planning
                    </p>
                    <p className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                            <i className="isax isax-user-add"></i>
                        </span>Client Satisfaction
                    </p>
                    <p className="d-flex align-items-center">
                        <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                            <i className="isax isax-grammerly"></i>
                        </span>24/7 Support
                    </p>
                </div>
            </div>
        </div>
        <div className="card shadow-none">
            <div className="card-body">
                <h5 className="fs-18 mb-3">Enquire Us</h5>
                <div className="banner-form">
                    <form action="#">
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
                            <textarea className="form-control" rows={3}></textarea>
                        </div>
                        <button type="button" className="btn btn-primary btn-lg search-btn ms-0 w-100 fs-14 justify-content-center">Submit Enquiry</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="card shadow-none mb-0">
            <div className="card-body">
                <h5 className="fs-18 mb-3">Provider Details</h5>
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
                            <p>+1 12545 45548</p>
                        </div>
                        <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                            <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary"><i className="isax isax-message-search5"></i></span>
                            <p>Info@example.com</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary"><i className="isax isax-location-tick5"></i></span>
                            <p>4635 Pheasant Ridge Road, USA</p>
                        </div>
                    </div>
                </div>
                <div className="row g-2">
                    <div className="col-sm-6">
                        <Link href="#" className="btn btn-light d-flex align-items-center justify-content-center"><i className="isax isax-messages5 me-2"></i>Whatsapp Us</Link>                               
                    </div>
                    <div className="col-sm-6">
                        <Link href={all_routes.chat} className="btn btn-primary d-flex align-items-center justify-content-center"><i className="isax isax-message-notif5 me-2"></i>Chat Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CarInfo