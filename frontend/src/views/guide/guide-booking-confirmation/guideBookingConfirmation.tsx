"use client";

import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";

const GuideBookingConfirmation = () => {


  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Guide",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Our Guide",
      active: true,
    },
    {
      label: "Guide Booking Confirmation",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Guide"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-09"
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
                          href={routes.guideDetails}
                          className="avatar avatar-lg me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/guide/guide-01.jpg"
                            alt="image"
                            className="img-fluid rounded"
                          />
                        </Link>
                        <div className="booking-details">
                          <h6 className="mb-1">
                            <Link href={routes.guideDetails}>Mr.Aaron Williams</Link>
                          </h6>
                          <div className="d-flex flex-wrap align-items-center booking-items">
                            <p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
                              Professional Travel Guide
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="badge badge-purple status rounded-pill p-2 fs-10 d-flex align-items-center">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pb-4 border-bottom mb-4">
                    <div className="fs-18 text-dark fw-semibold mb-3">
                      Booking Info
                    </div>
                    <div className="row g-3">
                      <div className="col-lg-3">
                        <h6 className="fs-14">Booked On</h6>
                        <p className="text-gray-6 fs-16 ">28/10/2026</p>
                      </div>
                      <div className="col-lg-3">
                        <h6 className="fs-14">Timeslot</h6>
                        <p className="text-gray-6 fs-16 ">12:00 PM - 4:00 PM</p>
                      </div>
                      <div className="col-lg-3">
                        <h6 className="fs-14">No of Members </h6>
                        <p className="text-gray-6 fs-16 ">2 Adults, 2 Children</p>
                      </div>
                      <div className="col-lg-3">
                        <h6 className="fs-14">Duration</h6>
                        <p className="text-gray-6 fs-16 ">7 hours</p>
                      </div>
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
                    <div className="fs-18 text-dark fw-semibold mb-3">
                      Billing Info
                    </div>
                    <div className="row g-3">
                      <div className="col-lg-3">
                        <h6 className="fs-14">Name</h6>
                        <p className="text-gray-6 fs-16 ">Chris Foxy</p>
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
                    <div className="fs-18 text-dark fw-semibold mb-3">
                      Order Info
                    </div>
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
                <div className="card-footer text-end">
                  <Link href={routes.guideGrid} className="btn btn-primary">
                    Cancel Booking
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* / Booking Confirmation */}
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  )
}

export default GuideBookingConfirmation