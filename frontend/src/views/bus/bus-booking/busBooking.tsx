"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BookingForm from '../../../components/booking/bookingForm';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';

const BusBooking = () => {

  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Bus',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Bus Booking',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Bus Booking"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />


      {/* Page Wrapper */}
      <div className="content content-two">
        <div className="container">
          {/* Cart */}
          <div className="row">
            <div className="col-lg-8">
              <BookingForm />
            </div>
            {/* Review Order Details */}
            <div className="col-lg-4 theiaStickySidebar">
              <div className="card order-details">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between header-content">
                    <h5>Review Order Details</h5>
                    <Link
                      href={all_routes.busDetails}
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
                        src="assets/img/bus/bus-large-01.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-2">Red Bird Luxury</h6>
                        <div className="d-flex">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-sm me-2">
                              <ImageWithBasePath
                                src="assets/img/bus/bus-logo-01.svg"
                                className="rounded-circle"
                                alt="icon"
                              />
                            </span>
                            <p className="fs-14 me-2"> Tata</p>
                          </div>
                          <p className="fs-14">
                            <span className="badge badge-warning text-gray-9 fs-13 fw-medium me-2">
                              5.0
                            </span>
                            (400 Reviews)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pb-3 border-bottom">
                    <h6 className="text-primary mb-3">Order Info</h6>
                    <div className="d-flex align-items-center details-info">
                      <h6 className="fs-16">Departure</h6>
                      <p className="fs-16">15 Sep 2025 at 10:10 AM</p>
                    </div>
                    <div className="d-flex align-items-center details-info">
                      <h6 className="fs-16">Arrival</h6>
                      <p className="fs-16">16 Sep 2025 at 09:15 AM</p>
                    </div>
                    <div className="d-flex align-items-center  details-info">
                      <h6 className="fs-16">Travel Time</h6>
                      <p className="fs-16">13hrs 10min</p>
                    </div>
                    <div className="d-flex align-items-center  details-info">
                      <h6 className="fs-16">Adults</h6>
                      <p className="fs-16">2</p>
                    </div>
                    <div className="d-flex align-items-center  details-info">
                      <h6 className="fs-16">Children</h6>
                      <p className="fs-16">2</p>
                    </div>
                    <div className="d-flex align-items-center details-info">
                      <h6 className="fs-16">No of Seats</h6>
                      <p className="fs-16">4</p>
                    </div>
                    <div className="d-flex align-items-center details-info">
                      <h6 className="fs-16">Seat Type</h6>
                      <p className="fs-16">Seater</p>
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
          {/* / Cart */}
        </div>
      </div>
      {/* /Page Wrapper */}


    </div>
  )
}

export default BusBooking
