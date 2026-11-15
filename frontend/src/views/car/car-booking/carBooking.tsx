"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BookingForm from '../../../components/booking/bookingForm';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';

const CarBooking = () => {

  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Car',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Car Booking',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Car Booking"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-02"
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
            <div className="col-lg-4 ">
              <div className="card order-details theiaStickySidebar">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between header-content">
                    <h5>Review Order Details</h5>
                    <Link
                      href={routes.carDetails}
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
                        src="assets/img/cars/car-large-01.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-2">Audi A3 2019</h6>
                        <p className="fs-14 ">
                          <span className="badge badge-warning text-gray-9 fs-13 fw-medium me-2">
                            5.0
                          </span>
                          (400 Reviews)
                        </p>
                      </div>
                      <h6 className="fs-14 fw-normal text-gray-9">$200</h6>
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
                      <p className="fs-16">25 May 2025, 06:00 PM</p>
                    </div>
                    <div className="d-flex align-items-center  details-info">
                      <h6 className="fs-16">Passengers</h6>
                      <p className="fs-16">2</p>
                    </div>
                    <div className="d-flex align-items-center details-info">
                      <h6 className="fs-16">Car Type</h6>
                      <p className="fs-16">Sedan</p>
                    </div>
                    <div className="d-flex align-items-center details-info">
                      <h6 className="fs-16">Extra Services</h6>
                      <p className="fs-16">Wi-Fi Hotspot, GPS Navigation</p>
                    </div>
                  </div>
                  <div className="mt-3 border-bottom">
                    <h6 className="text-primary mb-3">Payment Info</h6>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="fs-16">Sub Total</h6>
                      <p className="fs-16">$1100</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="fs-16">
                        Tax <span className="text-gray-6"> (10%)</span>
                      </h6>
                      <p className="fs-16">$110</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="fs-16">Booking Fees</h6>
                      <p className="fs-16">$50</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="fs-16">
                        Discount <span className="text-gray-6"> (10%)</span>
                      </h6>
                      <p className="fs-16">-$55</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>Amount to Pay</h6>
                      <h6 className="text-primary">$1205</h6>
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
      {/* /Page Wrapper*/}



    </div>
  )
}

export default CarBooking
