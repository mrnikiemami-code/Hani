"use client";
import Link from "next/link";
import ImageWithBasePath from "../../../../components/image-with-base-path"
import { AgencyName } from "@/features/agencies/ui/AgencyName";


const AgentVisaBookingModal = () => {
  return (
    <>
  {/* Applied Modal */}
  <div className="modal fade" id="applied">
    <div className="modal-dialog  modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#VS-1245</span>
          </h5>
          <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/users/user-11.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">
                    Long term for Academic with Health Insurance
                  </h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2  border-light fw-normal">
                      <i className="isax isax-location5 me-2" />
                      Egypt
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="badge badge-purple rounded-pill d-inline-flex align-items-center fs-10">
                  <i className="fa-solid fa-circle fs-5 me-1" />
                  Applied
                </span>
              </div>
            </div>
            <div className="upcoming-details ">
              <h6 className="mb-2">Visa Details</h6>
              <div className="row gy-3">
                <div className="col-lg-3">
                  <h6 className="fs-14">Country</h6>
                  <p className="text-gray-6 fs-16 ">Egypt</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Category</h6>
                  <p className="text-gray-6 fs-16 ">Student Visa</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Validity</h6>
                  <p className="text-gray-6 fs-16 ">1 Year</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Persons</h6>
                  <p className="text-gray-6 fs-16 ">04</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Processing Time</h6>
                  <p className="text-gray-6 fs-16 ">7-10 Working Day</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Visa Mode</h6>
                  <p className="text-gray-6 fs-16 ">Consular Visa</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Applied On</h6>
                  <p className="text-gray-6 fs-16 ">20 May 2026</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Personal Details</h6>
              <div className="row gy-3">
                <div className="col-lg-4">
                  <h6 className="fs-14">Name</h6>
                  <p className="text-gray-6 fs-16 "><AgencyName /></p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Email</h6>
                  <p className="text-gray-6 fs-16 ">chrfo2356@example.com</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Date of Birth</h6>
                  <p className="text-gray-6 fs-16 ">25 May 2005</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Phone</h6>
                  <p className="text-gray-6 fs-16 ">+1 12656 26654</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Document</h6>
                  <div className="d-flex">
                    <p className="text-gray-6 fs-16 me-2">Passport.pdf</p>
                    <Link
                      href="#"
                      className="fw-medium text-primary text-decoration-underline"
                    >
                      Download
                    </Link>
                  </div>
                </div>
              </div>
              <h6 className="mb-2">Short Description</h6>
              <p>
                Apply for a visa to study abroad for an academic year with
                comprehensive healthcare coverage.
              </p>
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
            Cancel
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /Applied Modal */}
  {/* Progress Modal */}
  <div className="modal fade" id="progress">
    <div className="modal-dialog  modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#VS-1245</span>
          </h5>
          <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/users/user-11.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">
                    Long term for Academic with Health Insurance
                  </h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2  border-light fw-normal">
                      <i className="isax isax-location5 me-2" />
                      Egypt
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="badge badge-info rounded-pill d-inline-flex align-items-center fs-10">
                  <i className="fa-solid fa-circle fs-5 me-1" />
                  On Progress
                </span>
              </div>
            </div>
            <div className="upcoming-details ">
              <h6 className="mb-2">Visa Details</h6>
              <div className="row gy-3">
                <div className="col-lg-3">
                  <h6 className="fs-14">Country</h6>
                  <p className="text-gray-6 fs-16 ">Egypt</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Category</h6>
                  <p className="text-gray-6 fs-16 ">Student Visa</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Validity</h6>
                  <p className="text-gray-6 fs-16 ">1 Year</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Persons</h6>
                  <p className="text-gray-6 fs-16 ">04</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Processing Time</h6>
                  <p className="text-gray-6 fs-16 ">7-10 Working Day</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Visa Mode</h6>
                  <p className="text-gray-6 fs-16 ">Consular Visa</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Applied On</h6>
                  <p className="text-gray-6 fs-16 ">20 May 2026</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Personal Details</h6>
              <div className="row gy-3">
                <div className="col-lg-4">
                  <h6 className="fs-14">Name</h6>
                  <p className="text-gray-6 fs-16 "><AgencyName /></p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Email</h6>
                  <p className="text-gray-6 fs-16 ">chrfo2356@example.com</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Date of Birth</h6>
                  <p className="text-gray-6 fs-16 ">25 May 2005</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Phone</h6>
                  <p className="text-gray-6 fs-16 ">+1 12656 26654</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Document</h6>
                  <div className="d-flex">
                    <p className="text-gray-6 fs-16 me-2">Passport.pdf</p>
                    <Link
                      href="#"
                      className="fw-medium text-primary text-decoration-underline"
                    >
                      Download
                    </Link>
                  </div>
                </div>
              </div>
              <h6 className="mb-2">Short Description</h6>
              <p>
                Apply for a visa to study abroad for an academic year with
                comprehensive healthcare coverage.
              </p>
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
            Cancel
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /Progress Modal */}
  {/* Completed Modal */}
  <div className="modal fade" id="completed">
    <div className="modal-dialog  modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5>
            Booking Info{" "}
            <span className="fs-14 fw-medium text-primary">#VS-1245</span>
          </h5>
          <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
        </div>
        <div className="modal-body">
          <div className="upcoming-content">
            <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
              <div className="d-flex align-items-center flex-wrap">
                <div className="me-2">
                  <ImageWithBasePath
                    src="assets/img/users/user-11.jpg"
                    alt="image"
                    className="avatar avartar-md avatar-rounded"
                  />
                </div>
                <div>
                  <h6 className="mb-1">
                    Long term for Academic with Health Insurance
                  </h6>
                  <div className="title-list">
                    <p className="d-flex align-items-center pe-2 me-2  border-light fw-normal">
                      <i className="isax isax-location5 me-2" />
                      Egypt
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
            <div className="upcoming-details ">
              <h6 className="mb-2">Visa Details</h6>
              <div className="row gy-3">
                <div className="col-lg-3">
                  <h6 className="fs-14">Country</h6>
                  <p className="text-gray-6 fs-16 ">Egypt</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Category</h6>
                  <p className="text-gray-6 fs-16 ">Student Visa</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Validity</h6>
                  <p className="text-gray-6 fs-16 ">1 Year</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">No of Persons</h6>
                  <p className="text-gray-6 fs-16 ">04</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Processing Time</h6>
                  <p className="text-gray-6 fs-16 ">7-10 Working Day</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Visa Mode</h6>
                  <p className="text-gray-6 fs-16 ">Consular Visa</p>
                </div>
                <div className="col-lg-3">
                  <h6 className="fs-14">Applied On</h6>
                  <p className="text-gray-6 fs-16 ">20 May 2026</p>
                </div>
              </div>
            </div>
            <div className="upcoming-details">
              <h6 className="mb-2">Personal Details</h6>
              <div className="row gy-3">
                <div className="col-lg-4">
                  <h6 className="fs-14">Name</h6>
                  <p className="text-gray-6 fs-16 "><AgencyName /></p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Email</h6>
                  <p className="text-gray-6 fs-16 ">chrfo2356@example.com</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Date of Birth</h6>
                  <p className="text-gray-6 fs-16 ">25 May 2005</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Phone</h6>
                  <p className="text-gray-6 fs-16 ">+1 12656 26654</p>
                </div>
                <div className="col-lg-4">
                  <h6 className="fs-14">Document</h6>
                  <div className="d-flex">
                    <p className="text-gray-6 fs-16 me-2">Passport.pdf</p>
                    <Link
                      href="#"
                      className="fw-medium text-primary text-decoration-underline"
                    >
                      Download
                    </Link>
                  </div>
                </div>
              </div>
              <h6 className="mb-2">Short Description</h6>
              <p>
                Apply for a visa to study abroad for an academic year with
                comprehensive healthcare coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Completed Modal */}
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
                No, Don&rsquo;t Cancel
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

export default AgentVisaBookingModal