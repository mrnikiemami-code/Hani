"use client";
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import BookingForm from '../../../components/booking/bookingForm';
import { all_routes } from '../../../routes/all_routes';


const TourBooking = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Tours Details',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Tours',
            active: true,
        },
        {
            label: 'Tour Details',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb
                title="Tours Details"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />

            <>
                {/* Page Wrapper */}
                <div className="content content-two">
                    <div className="container">
                        <div className="row">
                            {/* Checkout */}
                            <div className="col-lg-8">
                                <BookingForm />
                            </div>
                            {/* Checkout */}
                            {/* Review Order Details */}
                            <div className="col-lg-4 ">
                                <div className="card order-details theiaStickySidebar">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between header-content">
                                            <h5>Review Order Details</h5>
                                            <Link
                                                href={routes.tourDetails}
                                                className="rounded-circle p-2 btn btn-light d-flex align-items-center justify-content-center"
                                            >
                                                <span className="fs-16 d-flex align-items-center justify-content-center">
                                                    <i className="isax isax-edit-2" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="pb-3 border-bottom">
                                            <div className="mb-3 review-img">
                                                <ImageWithBasePath
                                                    src="assets/img/tours/tour-large-01.jpg"
                                                    alt="Img"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <h6 className="mb-2">Rainbow Mountain Valley</h6>
                                                    <p className="fs-14 ">
                                                        <span className="badge badge-warning text-gray-9 fs-13 fw-medium me-2">
                                                            5.0
                                                        </span>
                                                        (400 Reviews)
                                                    </p>
                                                </div>
                                                <h6 className="fs-14 fw-normal text-gray-9">$2000</h6>
                                            </div>
                                        </div>
                                        <div className="mt-3 pb-3 border-bottom">
                                            <h6 className="text-primary mb-3">Order Info</h6>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">Departure</h6>
                                                <p className="fs-16">25 May 2025, 04:45 AM</p>
                                            </div>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">Return</h6>
                                                <p className="fs-16">31 May 2025, 10:00 PM</p>
                                            </div>
                                            <div className="d-flex align-items-center  details-info">
                                                <h6 className="fs-16">Adults</h6>
                                                <p className="fs-16">20</p>
                                            </div>
                                            <div className="d-flex align-items-center  details-info">
                                                <h6 className="fs-16">Children</h6>
                                                <p className="fs-16">8</p>
                                            </div>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">No of Days</h6>
                                                <p className="fs-16">4 Days, 3 Nights</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 border-bottom">
                                            <h6 className="text-primary mb-3">Payment Info</h6>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">Sub Total</h6>
                                                <p className="fs-16">$8565</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">
                                                    Tax <span className="text-gray-6"> (10%)</span>
                                                </h6>
                                                <p className="fs-16">$85</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">Booking Fees</h6>
                                                <p className="fs-16">$89</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">
                                                    Discount <span className="text-gray-6"> (10%)</span>
                                                </h6>
                                                <p className="fs-16">-$20</p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <h6>Amount to Pay</h6>
                                                <h6 className="text-primary">$9569</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Review Order Details */}
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}

            </>


        </div>
    )
}

export default TourBooking
