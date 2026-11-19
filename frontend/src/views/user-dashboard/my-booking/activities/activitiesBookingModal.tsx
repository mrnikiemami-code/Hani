"use client";
import Link from "next/link";
import ImageWithBasePath from "../../../../components/image-with-base-path"
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const ActivitiesBookingModal = () => {
  return (
    <>
  {/* Pending Modal */}
  <div className="modal fade" id="pending">
    <div className="modal-dialog  modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#AB-1245</span>
          </h5>
          <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/visa/visa-01.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">Desert Safari Adventure</h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-signpost5 me-2" />
                      Dubai, UAE
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
            <div className="upcoming-details ">
              <h6 className="mb-3">Booking Info</h6>
              <div className="row gy-3">
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
                  <p className="text-gray-6 fs-16 ">28 Oct 2026</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Travellers</h6>
                  <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-3">Billing Info</h6>
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
              <h6 className="mb-3">Order Info</h6>
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
                  <p className="text-gray-6 fs-16 ">28 Oct 2026, 10:50 AM</p>
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
  <div className="modal fade" id="confirmed">
    <div className="modal-dialog  modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#AB-1245</span>
          </h5>
          <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/visa/visa-01.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">Desert Safari Adventure</h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-signpost5 me-2" />
                      Dubai, UAE
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
                  Confirmed
                </span>
              </div>
            </div>
            <div className="upcoming-details ">
              <h6 className="mb-3">Booking Info</h6>
              <div className="row gy-3">
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
                  <p className="text-gray-6 fs-16 ">28 Oct 2026</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Travellers</h6>
                  <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-3">Billing Info</h6>
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
              <h6 className="mb-3">Order Info</h6>
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
                  <p className="text-gray-6 fs-16 ">28 Oct 2026, 10:50 AM</p>
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
  {/* /Completed Modal */}
  {/* Cancelled Modal */}
  <div className="modal fade" id="cancelled">
    <div className="modal-dialog  modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#AB-1245</span>
          </h5>
          <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/visa/visa-01.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">Desert Safari Adventure</h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2 border-end border-light fw-normal">
                      <i className="isax isax-signpost5 me-2" />
                      Dubai, UAE
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
            <div className="upcoming-details ">
              <h6 className="mb-3">Booking Info</h6>
              <div className="row gy-3">
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
                  <p className="text-gray-6 fs-16 ">28 Oct 2026</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Travellers</h6>
                  <p className="text-gray-6 fs-16 ">4 Adults, 2 Child</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-3">Billing Info</h6>
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
              <h6 className="mb-3">Order Info</h6>
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
                  <p className="text-gray-6 fs-16 ">28 Oct 2026, 10:50 AM</p>
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
            <div className="upcoming-details">
              <h6 className="mb-3">Cancel Reason</h6>
              <h6 className="mb-2">Reason</h6>
              <p>Illness or medical appointments that prevent travel</p>
            </div>
          </div>
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
                Order ID : <span className="text-primary">#VB-1245</span>
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
              <button type="submit" className="btn btn-primary">
                Yes, Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Booking Cancel */}
</>

  )
}

export default ActivitiesBookingModal