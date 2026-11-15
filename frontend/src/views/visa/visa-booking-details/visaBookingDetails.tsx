"use client";
import { useState } from "react";
import Link from "next/link";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";

const VisaBookingDetails = () => {
  const routes = all_routes;
  const [defaultDate] = useState(new Date());


  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Visa",
      active: false,
    },
    {
      label: "Visa Booking Details",
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumb
        title="Visa Booking Details"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-08"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card mb-0">
                <div className="card-body">
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
                          <div className="title-list d-flex align-items-center">
                            <p className="text-primary me-2 mb-0 fs-14">
                              #VS-1254 <i className="ti ti-point-filled ms-2" />
                            </p>
                            <p className="d-flex align-items-center fs-14 pe-2 me-2  border-light fw-normal">
                              <i className="isax isax-location5 me-1" />
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
                    <div className="upcoming-details pb-4 border-bottom mb-4">
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
                          <p className="text-gray-6 fs-16 ">Chris Foxy</p>
                        </div>
                        <div className="col-lg-4">
                          <h6 className="fs-14">Email</h6>
                          <p className="text-gray-6 fs-16 ">
                            chrfo2356@example.com
                          </p>
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
                            <p className="text-gray-6 fs-16 me-2">
                              Passport.pdf
                            </p>
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
                        Apply for a visa to study abroad for an academic year
                        with comprehensive healthcare coverage.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <Link href="#" className="btn btn-primary">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

      {/* Apply */}
      <div className="modal fade" id="apply_visa" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Apply for Visa</h5>
              <button
                data-bs-dismiss="modal"
                aria-label="close"
                className="btn-close"
              />
            </div>
            <form action="#">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Name <span className="text-danger"> *</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Date of Birth <span className="text-danger"> *</span>
                      </label>
                      <div className="input-icon-end position-relative">
                        <DatePicker
                          className="form-control datetimepicker"
                          placeholder="dd/mm/yyyy"
                          defaultValue={defaultDate}
                          disablePast
                          format="DD-MM-YYYY"
                        />
                        <span className="input-icon-addon">
                          <i className="isax isax-calendar" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Phone Number <span className="text-danger"> *</span>
                      </label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Email Address <span className="text-danger"> *</span>
                      </label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Attached Documents <span className="text-danger"> *</span>
                      </label>
                      <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2">
                        <span className="upload-img bg-light p-2 rounded-circle d-inline-flex align-items-center justify-content-center d-block mb-2">
                          <i className="isax isax-document-upload fs-18" />
                        </span>
                        <h6 className="mb-1">
                          Drag &amp; Drop Your Files Here to Upload
                        </h6>
                        <p className="mb-0 fs-14">Format: PDF, DOC, JPG, PNG</p>
                        <input type="file" accept="video/image" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Short Notes</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex align-items-center justify-content-end m-0">
                  <Link
                    href="#"
                    className="btn btn-sm btn-primary"
                    data-bs-target="#success_visa"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Submit Now <i className="isax isax-arrow-right-3 ms-1" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Apply */}

      {/* success */}
      <div
        className="modal fade"
        id="success_visa"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <span className="mb-3">
                  <i className="isax isax-tick-circle5 fs-40 text-success" />
                </span>
                <h5 className="mb-3">Applied Successfully</h5>
                <p>
                  Your visa for the “Academic Year Abroad with Comprehensive
                  Healthcare” has been applied successfully. Stay tuned for
                  updates on your application status.with Reference Number{" "}
                  <span className="text-primary">#12559845</span>
                </p>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Link
                    href="#"
                    className="btn w-100 btn-light"
                    data-bs-dismiss="modal"
                  >
                    Contact Provider
                  </Link>
                  <Link
                    href="#"
                    className="btn w-100 btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Contact Provider
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Success */}
    </>
  );
};

export default VisaBookingDetails;
