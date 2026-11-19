"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const FlightBookingConfirmation = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Flight Booking Confirmation',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Flight',
            active: true,
        },
        {
            label: 'Flight Booking',
            active: true,
        },
    ];


    return (
        <div>
            <Breadcrumb
                title="Flight Booking Confirmation"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-05"
            />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    {/* Booking Confirmation */}
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card booking-confirmation mb-0">
                                <div className="card-body">
                                    <div className="bg-light-200 border border-light p-3 rounded-2 mb-4">
                                        <div className="d-flex flex-wrap align-items-center justify-content-between ">
                                            <div className="d-flex flex-wrap align-items-center booking-hotels">
                                                <Link
                                                    href={routes.flightDetails}
                                                    className="avatar avatar-lg me-2"
                                                >
                                                    <ImageWithBasePath
                                                        src="assets/img/flight/flight-01.jpg"
                                                        alt="image"
                                                        className="img-fluid  rounded-circle"
                                                    />
                                                </Link>
                                                <div className="booking-details">
                                                    <h6 className="mb-1">
                                                        <Link href={routes.flightDetails}>AstraFlight 215</Link>
                                                    </h6>
                                                    <div className="d-flex flex-wrap align-items-center booking-items">
                                                        <p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                alt="image"
                                                                className="avatar avatar-sm avatar-rounded me-2"
                                                            />
                                                            Air India
                                                        </p>
                                                        <p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
                                                            <i className="isax isax-location5 me-1" />
                                                            15/C Prince Dareen Road, New York
                                                        </p>
                                                        <p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
                                                            <span className="badge badge-warning text-gray-9 me-1">
                                                                5.0
                                                            </span>
                                                            (400 Reviews)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="badge badge-info status rounded-pill p-2 fs-10 d-flex align-items-center">
                                                    Upcoming
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-4 border-bottom mb-4">
                                        <h6 className="mb-2">Booking Info</h6>
                                        <div className="row g-3">
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">From</h6>
                                                <p className="text-gray-6 fs-16 ">Delhi (DEL)</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">To</h6>
                                                <p className="text-gray-6 fs-16 ">Barcelona (BCN)</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Booked on</h6>
                                                <p className="text-gray-6 fs-16 ">02 Apr 2025</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Departs</h6>
                                                <p className="text-gray-6 fs-16 ">25 May 2025, 04:45 &middot; Terminal 3</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Arrives</h6>
                                                <p className="text-gray-6 fs-16 ">25 May 2025, 14:30 &middot; Terminal 1</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Travellers</h6>
                                                <p className="text-gray-6 fs-16 ">2 adults &middot; seats 1B, 1E</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Stops</h6>
                                                <p className="text-gray-6 fs-16 ">1 stop &middot; Dubai (DXB), 2h 10m</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-4 border-bottom mb-4">
                                        <h6 className="mb-2">Extra Service Info</h6>
                                        <div className="d-flex flex-wrap align-items-center service-info gap-3">
                                            <span className="badge badge-light rounded-pill">
                                                Blankets &amp; Pillows
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pb-4 border-bottom mb-4">
                                        <h6 className="mb-2">Meals Plan</h6>
                                        <div className="d-flex flex-wrap align-items-center service-info gap-3">
                                            <span className="badge badge-light rounded-pill">Lunch</span>
                                            <span className="badge badge-light rounded-pill">Dinner</span>
                                        </div>
                                    </div>
                                    <div className="pb-4 border-bottom mb-4">
                                        <h6 className="mb-2">Billing Info</h6>
                                        <div className="row g-3">
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Name</h6>
                                                <p className="text-gray-6 fs-16 "><AgencyName /></p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Email</h6>
                                                <p className="text-gray-6 fs-16 ">chrfo2356@example.com</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Phone</h6>
                                                <p className="text-gray-6 fs-16 ">+1 12656 26654</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Address</h6>
                                                <p className="text-gray-6 fs-16 ">
                                                    15/C Prince Dareen Road, New York
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Order Info</h6>
                                        <div className="row g-3">
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Order Id</h6>
                                                <p className="text-primary fs-16 ">#45669</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Payment Method</h6>
                                                <p className="text-gray-6 fs-16 ">Credit Card (Visa)</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Payment Status</h6>
                                                <p className="text-success fs-16 ">Paid</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Date of Payment</h6>
                                                <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Tax</h6>
                                                <p className="text-gray-6 fs-16 ">15% ($60)</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Discount</h6>
                                                <p className="text-gray-6 fs-16 ">20% ($15)</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Booking Fees</h6>
                                                <p className="text-gray-6 fs-16 ">$25</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14">Total Paid</h6>
                                                <p className="text-gray-6 fs-16 ">$6569</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* / Booking Confirmation */}
                </div>
            </div>
            {/* /Page Wrapper */}



        </div>
    )
}

export default FlightBookingConfirmation