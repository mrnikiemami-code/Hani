"use client";

import Link from "next/link";
import { all_routes } from '../../../../routes/all_routes'
import ImageWithBasePath from '../../../../components/image-with-base-path';
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const UserHotelsBookingModal = () => {

    const routes = all_routes;

  return (
    <div>
      <>
  {/* Upcoming Modal */}
  <div
    className="modal fade"
    id="upcoming"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog  modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#HB-1245</span>
          </h5>
          <Link
            href="#"
            data-bs-dismiss="modal"
            className="btn-close text-dark"
          />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/hotels/hotel-13.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">The Luxe Haven</h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-building me-2" />
                      Luxury Hotel
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-location5 me-2" />
                      15/C Prince Dareen Road, New York
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2  fw-normal">
                      <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                        5.0
                      </span>
                      (400 Reviews)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                  <i className="fa-solid fa-circle fs-5 me-1" />
                  Upcoming
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Room Details</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Type</h6>
                  <p className="text-gray-6 fs-16 ">Queen Room</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Rooms</h6>
                  <p className="text-gray-6 fs-16 ">1</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Price</h6>
                  <p className="text-gray-6 fs-16 ">$400</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Guests</h6>
                  <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Booking Info</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Booked On</h6>
                  <p className="text-gray-6 fs-16 ">15 May 2024</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Check In Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Checkout Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">25 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Days Stay</h6>
                  <p className="text-gray-6 fs-16 ">4 Days, 5 Nights</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Extra Service Info</h6>
              <div className="d-flex align-items-center">
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Cleaning
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Airport Pickup
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14">
                  Breakfast
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Billing Info</h6>
              <div className="row gy-3">
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
            <div className="upcoming-details">
              <h6 className="mb-2">Order Info</h6>
              <div className="row gy-3">
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
        <div className="modal-footer">
          <Link
            href="#"
            className="btn btn-md btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#cancel-booking"
          >
            Cancel Booking
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /Upcoming Modal */}
  {/* Pending Modal */}
  <div
    className="modal fade"
    id="pending"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog  modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#HB-1245</span>
          </h5>
          <Link
            href="#"
            data-bs-dismiss="modal"
            className="btn-close text-dark"
          />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/hotels/hotel-13.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">The Luxe Haven</h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-building me-2" />
                      Luxury Hotel
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-location5 me-2" />
                      15/C Prince Dareen Road, New York
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2  fw-normal">
                      <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                        5.0
                      </span>
                      (400 Reviews)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                  <i className="fa-solid fa-circle fs-5 me-1" />
                  Pending
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Room Details</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Type</h6>
                  <p className="text-gray-6 fs-16 ">Queen Room</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Rooms</h6>
                  <p className="text-gray-6 fs-16 ">1</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Price</h6>
                  <p className="text-gray-6 fs-16 ">$400</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Guests</h6>
                  <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Booking Info</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Booked On</h6>
                  <p className="text-gray-6 fs-16 ">15 May 2024</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Check In Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Checkout Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">25 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Days Stay</h6>
                  <p className="text-gray-6 fs-16 ">4 Days, 5 Nights</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Extra Service Info</h6>
              <div className="d-flex align-items-center">
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Cleaning
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Airport Pickup
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14">
                  Breakfast
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Billing Info</h6>
              <div className="row gy-3">
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
            <div className="upcoming-details">
              <h6 className="mb-2">Order Info</h6>
              <div className="row gy-3">
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
        <div className="modal-footer">
          <Link
            href="#"
            className="btn btn-md btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#cancel-booking"
          >
            Cancel Booking
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /Pending Modal */}
  {/* Completed Modal */}
  <div
    className="modal fade"
    id="completed"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog  modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#HB-1245</span>
          </h5>
          <Link
            href="#"
            data-bs-dismiss="modal"
            className="btn-close text-dark"
          />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/hotels/hotel-13.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">The Luxe Haven</h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-building me-2" />
                      Luxury Hotel
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-location5 me-2" />
                      15/C Prince Dareen Road, New York
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2  fw-normal">
                      <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                        5.0
                      </span>
                      (400 Reviews)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                  <i className="fa-solid fa-circle fs-5 me-1" />
                  Completed
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Room Details</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Type</h6>
                  <p className="text-gray-6 fs-16 ">Queen Room</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Rooms</h6>
                  <p className="text-gray-6 fs-16 ">1</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Price</h6>
                  <p className="text-gray-6 fs-16 ">$400</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Guests</h6>
                  <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Booking Info</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Booked On</h6>
                  <p className="text-gray-6 fs-16 ">15 May 2024</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Check In Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Checkout Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">25 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Days Stay</h6>
                  <p className="text-gray-6 fs-16 ">4 Days, 5 Nights</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Extra Service Info</h6>
              <div className="d-flex align-items-center">
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Cleaning
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Airport Pickup
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14">
                  Breakfast
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Billing Info</h6>
              <div className="row gy-3">
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
            <div className="upcoming-details">
              <h6 className="mb-2">Order Info</h6>
              <div className="row gy-3">
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
        <div className="modal-footer">
          <Link href={routes.hotelDetails} className="btn btn-md btn-primary">
            Book Again
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /Completed Modal */}
  {/* Cancelled Modal */}
  <div
    className="modal fade"
    id="cancelled"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog  modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#HB-1245</span>
          </h5>
          <Link
            href="#"
            data-bs-dismiss="modal"
            className="btn-close text-dark"
          />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/hotels/hotel-13.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">The Luxe Haven</h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-building me-2" />
                      Luxury Hotel
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-location5 me-2" />
                      15/C Prince Dareen Road, New York
                    </p>
                    <p className="d-flex align-items-center pe-2 me-2  fw-normal">
                      <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                        5.0
                      </span>
                      (400 Reviews)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                  <i className="fa-solid fa-circle fs-5 me-1" />
                  Cancelled
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Room Details</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Type</h6>
                  <p className="text-gray-6 fs-16 ">Queen Room</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Rooms</h6>
                  <p className="text-gray-6 fs-16 ">1</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Room Price</h6>
                  <p className="text-gray-6 fs-16 ">$400</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Guests</h6>
                  <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Booking Info</h6>
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="fs-14">Booked On</h6>
                  <p className="text-gray-6 fs-16 ">15 May 2024</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Check In Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">20 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Checkout Date &amp; Time</h6>
                  <p className="text-gray-6 fs-16 ">25 May 2024, 10:50 AM</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Days Stay</h6>
                  <p className="text-gray-6 fs-16 ">4 Days, 5 Nights</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Extra Service Info</h6>
              <div className="d-flex align-items-center">
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Cleaning
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14 me-2">
                  Airport Pickup
                </span>
                <span className="bg-light rounded-pill py-1 px-2 text-gray-6 fs-14">
                  Breakfast
                </span>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Billing Info</h6>
              <div className="row gy-3">
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
            <div className="upcoming-details">
              <h6 className="mb-2">Order Info</h6>
              <div className="row gy-3">
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
            <div className="upcoming-details mb-0">
              <h6 className="mb-2">Cancel Reason</h6>
              <div className="row">
                <div className="col-lg-5">
                  <h6 className="fs-14">Reason</h6>
                  <p className="text-gray-6 fs-16 ">
                    Illness or medical appointments that prevent travel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Link href={routes.hotelDetails} className="btn btn-md btn-primary">
            Reschedule
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /Cancelled Modal */}
  {/* Booking Cancel */}
  <div className="modal fade" id="cancel-booking">
    <div className="modal-dialog  modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body p-5">
          <form>
            <div className="text-center">
              <div className="mb-4">
                <i className="isax isax-location-cross5 text-danger fs-40" />
              </div>
              <h5 className="mb-2">Are you sure you want to cancel booking?</h5>
              <p className="mb-4 text-gray-9">
                Order ID : <span className="text-primary">#HB-1245</span>
              </p>
            </div>
            <div className="mb-4">
              <label className="form-label">
                Reason <span className="text-danger">*</span>
              </label>
              <textarea className="form-control" rows={3} defaultValue={""} />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Link
                href="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                No, Don’t Cancel
              </Link>
              <Link href="#" data-bs-dismiss="modal" className="btn btn-primary">
                Yes, Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Booking Cancel */}
</>

    </div>
  )
}

export default UserHotelsBookingModal