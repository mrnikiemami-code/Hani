"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const TourBookingConfirmation = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Tour Booking Confirmation',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Tours',
            active: true,
        },
        {
            label: 'Tour Booking',
            active: true,
        },
    ];
    return (
        <div>

            <Breadcrumb
                title="Tour Booking Confirmation"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />

            <>
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
                                                        href={routes.tourDetails}
                                                        className="avatar avatar-lg me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-21.jpg"
                                                            alt="image"
                                                            className="img-fluid  rounded-circle"
                                                        />
                                                    </Link>
                                                    <div className="booking-details">
                                                        <h6 className="mb-1">
                                                            <Link href={routes.tourDetails}>LaughFest Carnival</Link>
                                                        </h6>
                                                        <div className="d-flex flex-wrap align-items-center booking-items">
                                                            <p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
                                                                <i className="isax isax-signpost5 me-2" />
                                                                Sightseeing Tours
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
                                                    <h6 className="fs-14">Destination</h6>
                                                    <p className="text-gray-6 fs-16 ">Las Vegas</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">No of Days</h6>
                                                    <p className="text-gray-6 fs-16 ">4 Days, 5 Nights</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Booked On</h6>
                                                    <p className="text-gray-6 fs-16 ">15 May 2024</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Check In Date &amp; Time</h6>
                                                    <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Return Date &amp; Time</h6>
                                                    <p className="text-gray-6 fs-16 ">25 May 2024, 10:50 AM</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14">Travellers</h6>
                                                    <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pb-4 border-bottom mb-4">
                                            <h6 className="mb-2">Extra Service Info</h6>
                                            <div className="d-flex flex-wrap align-items-center service-info gap-3">
                                                <span className="badge badge-light rounded-pill">
                                                    Local Expert Guides
                                                </span>
                                                <span className="badge badge-light rounded-pill">
                                                    Photography Services
                                                </span>
                                            </div>
                                        </div>
                                        <div className="pb-4 border-bottom mb-4">
                                            <h6 className="mb-2">Activities</h6>
                                            <div className="d-flex flex-wrap align-items-center service-info gap-3">
                                                <span className="badge badge-light rounded-pill">
                                                    Sightseeing
                                                </span>
                                                <span className="badge badge-light rounded-pill">
                                                    Boat Tours
                                                </span>
                                            </div>
                                        </div>
                                        <div className="pb-4 border-bottom mb-4">
                                            <h6 className="mb-2">Billing Info</h6>
                                            <div className="row g-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Name</h6>
                                                    <p className="fs-16 text-gray-6"><AgencyName /></p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Email</h6>
                                                    <p className="fs-16 text-gray-6">chrfo2356@example.com</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Phone</h6>
                                                    <p className="fs-16 text-gray-6">+1 12656 26654</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Address</h6>
                                                    <p className="fs-16 text-gray-6">
                                                        15/C Prince Road, New York
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Order Info</h6>
                                            <div className="row g-3">
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Order Id</h6>
                                                    <p className="fs-16 text-primary">#45669</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Payment Method</h6>
                                                    <p className="fs-16 text-gray-6">Credit Card (Visa)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Payment Status</h6>
                                                    <p className="fs-16 text-success">Paid</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Date of Payment</h6>
                                                    <p className="fs-16 text-gray-6">20 May 2024, 10:50 AM</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Tax</h6>
                                                    <p className="fs-16 text-gray-6">15% ($60)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Discount</h6>
                                                    <p className="fs-16 text-gray-6">20% ($15)</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Booking Fees</h6>
                                                    <p className="fs-16 text-gray-6">$25</p>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6 className="fs-14 mb-1">Total Paid</h6>
                                                    <p className="fs-16 text-gray-6">$6569</p>
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
            </>



        </div>
    )
}

export default TourBookingConfirmation