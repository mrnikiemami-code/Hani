"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const HotelBookingConfirmation = () => {
    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Hotel Booking Confirmation',
            active: false,
            link: routes.home1
        },
        {
            label: 'Hotel',
            active: false,
        },
        {
            label: 'Booking Confirmation',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb title="Hotel Booking Confirmation" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />

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
                                                    href={routes.hotelDetails}
                                                    className="avatar avatar-lg me-2"
                                                >
                                                    <ImageWithBasePath
                                                        src="assets/img/hotels/hotel-06.jpg"
                                                        alt="image"
                                                        className="img-fluid  rounded-circle"
                                                    />
                                                </Link>
                                                <div className="booking-details">
                                                    <h6 className="mb-1">
                                                        <Link href={routes.hotelDetails}>Hotel Miravent Barcelona</Link>
                                                    </h6>
                                                    <div className="d-flex flex-wrap align-items-center booking-items">
                                                        <p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
                                                            <i className="isax isax-buildings me-1" />
                                                            Luxury Hotel
                                                        </p>
                                                        <p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
                                                            <i className="isax isax-location5 me-1" />
                                                            Ciutat Vella, Barcelona
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
                                        <h6 className="mb-2">Room Details</h6>
                                        <div className="row g-3">
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Room Type</h6>
                                                <p className="fs-16 text-gray-6">Superior Twin</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">No of Rooms</h6>
                                                <p className="fs-16 text-gray-6">1</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Room Price</h6>
                                                <p className="fs-16 text-gray-6">$181 per night</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Guests</h6>
                                                <p className="fs-16 text-gray-6">2 adults</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-4 border-bottom mb-4">
                                        <h6 className="mb-2">Booking Info</h6>
                                        <div className="row g-3">
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Booked On</h6>
                                                <p className="fs-16 text-gray-6">02 Apr 2025</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Check In Date &amp; Time</h6>
                                                <p className="fs-16 text-gray-6">25 May 2025, from 15:00</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Checkout Date &amp; Time</h6>
                                                <p className="fs-16 text-gray-6">28 May 2025, by 11:00</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">No of Days Stay</h6>
                                                <p className="fs-16 text-gray-6">3 nights</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-4 border-bottom mb-4">
                                        <h6 className="mb-2">Extra Service Info</h6>
                                        <div className="d-flex flex-wrap align-items-center service-info gap-3">
                                            <span className="badge badge-light rounded-pill">
                                                Cleaning
                                            </span>
                                            <span className="badge badge-light rounded-pill">
                                                Airport Pickup
                                            </span>
                                            <span className="badge badge-light rounded-pill">
                                                Breakfast
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
                                                <p className="fs-16 text-gray-6">02 Apr 2025, 14:22</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Tax</h6>
                                                <p className="fs-16 text-gray-6">$54</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Discount</h6>
                                                <p className="fs-16 text-gray-6">-$50 &middot; Dreams25</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Booking Fees</h6>
                                                <p className="fs-16 text-gray-6">Included in taxes</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h6 className="fs-14 mb-1">Total Paid</h6>
                                                <p className="fs-16 text-gray-6">$547</p>
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

export default HotelBookingConfirmation