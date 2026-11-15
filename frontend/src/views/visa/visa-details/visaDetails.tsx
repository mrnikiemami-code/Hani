"use client";
import { img_path } from "../../../environment";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomSelect from "../../../components/common-select/commonSelect";
import { visaDays } from "../../../core/data/mock/selectOption";
import BannerCounter from "../../../components/banner-counter/counter";
import { dismissBootstrapModals } from '../../../utils/bootstrapModal'
import Lightbox from "yet-another-react-lightbox";


const VisaDetails = () => {
  const routes = all_routes;
  const [defaultDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const nextRouter = useRouter();
  const navigate = (to: string) => nextRouter.push(to);

  const handleBooking = () => {
    dismissBootstrapModals();
    navigate(routes.visaBookingConfirmation);
  };
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Visa",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Visa",
      active: true,
    },
    {
      label: "Visa Details",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Visa"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-08"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              {/* Slider */}
              <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                  <div className="mb-2">
                    <h4 className="mb-2 d-flex align-items-center flex-wrap">
                      Academic Year Abroad with Comprehensive Healthcare
                    </h4>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Link
                      href="#"
                      className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"
                    >
                      <i className="isax isax-share" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-outline-light btn-sm d-inline-flex align-items-center"
                    >
                      <i className="isax isax-heart5 text-danger me-1" />
                      Save
                    </Link>
                  </div>
                </div>
                <div className="service-wrap mb-4">
                  <div>
                    <ImageWithBasePath
                      src="assets/img/visa/visa-details.jpg"
                      alt="visa-details"
                      className="img-fluid w-100"
                    />
                  </div>
                </div>
              </div>
              {/* /Slider */}
              <div className="card shadow-none bg-light-200">
                <div className="card-body pb-1">
                  <h5 className="d-flex align-items-center fs-18 mb-3">
                    <span className="avatar avatar-md rounded-circle bg-primary me-2">
                      <i className="isax isax-airplane5" />
                    </span>
                    Visa Information
                  </h5>
                  <div className="row">
                    <div className="col-xl col-lg-4 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Country</h6>
                        <p>Egypt</p>
                      </div>
                    </div>
                    <div className="col-xl col-lg-4 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Category</h6>
                        <p>Student Visa</p>
                      </div>
                    </div>
                    <div className="col-xl col-lg-4 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Validity</h6>
                        <p>1 Year</p>
                      </div>
                    </div>
                    <div className="col-xl col-lg-4 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Processing Time</h6>
                        <p>7-10 Working Day</p>
                      </div>
                    </div>
                    <div className="col-xl col-lg-4 col-md-4 col-sm-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Visa Mode</h6>
                        <p>Consular Visa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion custom-accordion accordion-shadow">
                <div className="accordion-item border-0 mb-4">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_one"
                      aria-expanded="true"
                    >
                      <i className="isax isax-note-1 me-2" />
                      Documents Requirement
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_one"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div>
                        <p>
                          <i className="isax isax-flash-15 text-primary me-2 fs-16" />
                          Prior Visas (if applicable)
                        </p>
                        <p>
                          <i className="isax isax-flash-15 text-primary me-2 fs-16" />
                          Passport (6+ months validity).
                        </p>
                        <p>
                          <i className="isax isax-flash-15 text-primary me-2 fs-16" />
                          Passport &amp; visa copies (if any).
                        </p>
                        <p>
                          <i className="isax isax-flash-15 text-primary me-2 fs-16" />
                          Sufficient Funds (statements, payslips)
                        </p>
                        <p>
                          <i className="isax isax-flash-15 text-primary me-2 fs-16" />
                          Travel Insurance (Schengen, etc.)
                        </p>
                        <p>
                          <i className="isax isax-flash-15 text-primary me-2 fs-16" />
                          Medical, repatriation &amp; COVID coverage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item border-0 mb-4">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_two"
                      aria-expanded="true"
                    >
                      <i className="isax isax-note me-2" />
                      Description
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_two"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <p className="mb-2">
                        Embarking on May 15, 2025, the "Scholars Voyage" offers
                        long-term academic stays with comprehensive health
                        insurance. Destinations include university hubs like Oxford,
                        Heidelberg, Kyoto, and Melbourne. Each package ensures
                        access to healthcare, cultural immersion, and academic
                        resources for a transformative experience.
                      </p>
                      <Link
                        href="#"
                        className="fs-14 fw-medium text-decoration-underline mb-2"
                      >
                        Show More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4 border-0">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_three"
                      aria-expanded="true"
                    >
                      <i className="isax isax-archive-book me-2" />
                      Additional Requirement
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_three"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div>
                        <p>
                          <i className="isax isax-minus-cirlce5 text-primary me-2 fs-16" />
                          Visa copies (Schengen, US, UK, etc.)
                        </p>
                        <p>
                          <i className="isax isax-minus-cirlce5 text-primary me-2 fs-16" />
                          International travel history (passport stamps).
                        </p>
                        <p>
                          <i className="isax isax-minus-cirlce5 text-primary me-2 fs-16" />
                          Travel purpose explanation letter
                        </p>
                        <p>
                          <i className="isax isax-minus-cirlce5 text-primary me-2 fs-16" />
                          Sponsor's Bank &amp; ID.
                        </p>
                        <p>
                          <i className="isax isax-minus-cirlce5 text-primary me-2 fs-16" />
                          Police Clearance (some countries).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4 border-0" id="location">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_eight"
                      aria-expanded="true"
                    >
                      <i className="isax isax-message-question me-2" />
                      Frequently Asked Questions
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_eight"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="accordion faq-accordion" id="accordionFaq">
                        <div className="accordion-item show mb-2">
                          <div className="accordion-header">
                            <button
                              className="accordion-button fw-medium"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#faq-collapseOne"
                              aria-expanded="false"
                              aria-controls="faq-collapseOne"
                            >
                              What is the age requirement for a student visa?
                            </button>
                          </div>
                          <div
                            id="faq-collapseOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Our student visa services cater to a wide array of
                                academic pursuits, from language courses to
                                university degrees. Explore our website or reach out
                                to our consultants to identify the ideal visa
                                solution tailored to your educational objectives.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item mb-2">
                          <div className="accordion-header">
                            <button
                              className="accordion-button fw-medium collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#faq-two"
                              aria-expanded="false"
                              aria-controls="faq-two"
                            >
                              What documents are needed to apply for a student visa?
                            </button>
                          </div>
                          <div
                            id="faq-two"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                A passport valid for at least six months, a completed
                                application form, recent passport photographs, proof of
                                enrolment from your institution, and evidence of sufficient
                                funds.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item mb-2">
                          <div className="accordion-header">
                            <button
                              className="accordion-button fw-medium collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#faq-three"
                              aria-expanded="false"
                              aria-controls="faq-three"
                            >
                              What types of student visas are available?
                            </button>
                          </div>
                          <div
                            id="faq-three"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Short-course, undergraduate, postgraduate and
                                exchange-programme visas are covered, each with its own
                                duration and work-rights conditions.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <div className="accordion-header">
                            <button
                              className="accordion-button fw-medium collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#faq-four"
                              aria-expanded="false"
                              aria-controls="faq-four"
                            >
                              Can I pay the visa fee with a debit card?
                            </button>
                          </div>
                          <div
                            id="faq-four"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Yes. Government fees and our service charge can both be paid
                                by debit or credit card, and are itemised separately on your
                                receipt.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4 border-0">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_ten"
                      aria-expanded="true"
                    >
                      <i className="isax isax-level me-2" />
                      Conditional Requirement
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_ten"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div>
                        <p>
                          <i className="isax isax-add-circle5 text-primary me-2 fs-16" />
                          Child's Birth Certificate.
                        </p>
                        <p>
                          <i className="isax isax-add-circle5 text-primary me-2 fs-16" />
                          Non-traveling parent's consent (if applicable)
                        </p>
                        <p>
                          <i className="isax isax-add-circle5 text-primary me-2 fs-16" />
                          Guardianship Proof (if needed).
                        </p>
                        <p>
                          <i className="isax isax-add-circle5 text-primary me-2 fs-16" />
                          Family ties proof for return.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-18 text-dark fw-semibold">
                      <i className="isax isax-star me-2" /> Reviews
                    </div>
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#add_review"
                      className="btn btn-primary btn-md mb-3"
                    >
                      <i className="isax isax-edit-2 me-1" />
                      Write a Review
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 d-flex">
                      <div className="rating-item bg-light-200 text-center flex-fill mb-3">
                        <h6 className="fw-medium mb-3">
                          Customer Reviews &amp; Ratings
                        </h6>
                        <h5 className="display-6">4.9 / 5.0</h5>
                        <div className="d-inline-flex align-items-center justify-content-center mb-3">
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary" />
                        </div>
                        <p>Based On 2,459 Reviews</p>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex">
                      <div className="card rating-progress shadow-none flex-fill mb-3">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">5 Star Ratings</p>
                            <div
                              className="progress w-100"
                              role="progressbar"
                              aria-valuenow={90}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: "90%" }}
                              />
                            </div>
                            <p className="progress-count ms-2">247</p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">4 Star Ratings</p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={80}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: "80%" }}
                              />
                            </div>
                            <p className="progress-count ms-2">145</p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">3 Star Ratings</p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={70}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: "70%" }}
                              />
                            </div>
                            <p className="progress-count ms-2">600</p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">2 Star Ratings</p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={90}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: "60%" }}
                              />
                            </div>
                            <p className="progress-count ms-2">560</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <p className="me-2 text-nowrap mb-0">1 Star Ratings</p>
                            <div
                              className="progress mb-0 w-100"
                              role="progressbar"
                              aria-valuenow={40}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: "40%" }}
                              />
                            </div>
                            <p className="progress-count ms-2">400</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card review-item shadow-none mb-3">
                    <div className="card-body p-3">
                      <div className="review-info">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/users/user-05.jpg"
                                className="rounded-circle"
                                alt="img"
                              />
                            </span>
                            <div>
                              <h6 className="fs-16 fw-medium mb-1">
                                Adrian Hendriques
                              </h6>
                              <div className="d-flex align-items-center flex-wrap date-info">
                                <p className="fs-14 mb-0">2 days ago</p>
                                <p className="fs-14 d-inline-flex align-items-center mb-0">
                                  Excellent service!
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            5.0
                          </span>
                        </div>
                        <p className="mb-2">
                          The visa application process was smooth, but the interview
                          scheduling was a bit delayed. Overall, a satisfactory
                          experience.
                        </p>
                        <Lightbox
                          open={open}
                          close={() => setOpen(false)}
                          slides={[
                            {
                              src: `${img_path}assets/img/visa/gallery-img-large-01.jpg`,
                            },
                            {
                              src: `${img_path}assets/img/visa/gallery-img-large-02.jpg`,
                            },
                            {
                              src: `${img_path}assets/img/visa/gallery-img-large-03.jpg`,
                            },
                          ]}
                        />
                        <div className="d-flex align-items-center">
                          <Link onClick={() => setOpen(true)}
                            className="avatar avatar-md me-2 mb-2"
                            data-fancybox="gallery"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/visa/gallery-img-large-01.jpg"
                              alt="img"
                            />
                          </Link>
                          <Link onClick={() => setOpen(true)}
                            className="avatar avatar-md me-2 mb-2"
                            data-fancybox="gallery"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/visa/gallery-img-large-02.jpg"
                              alt="img"
                            />
                          </Link>
                          <Link onClick={() => setOpen(true)}
                            className="avatar avatar-md me-0 mb-2"
                            data-fancybox="gallery"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/visa/gallery-img-large-03.jpg"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="d-inline-flex align-items-center">
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center fs-14 me-3"
                          >
                            <i className="isax isax-like-1 me-2" />
                            21
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-dislike me-2" />
                            50
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-heart5 text-danger me-2" />
                            45
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card review-item shadow-none mb-3">
                    <div className="card-body p-3">
                      <div className="review-info">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/users/user-21.jpg"
                                className="rounded-circle"
                                alt="img"
                              />
                            </span>
                            <div>
                              <h6 className="fs-16 fw-medium mb-1">
                                Adrian Hendriques
                              </h6>
                              <div className="d-flex align-items-center flex-wrap date-info">
                                <p className="fs-14 mb-0">2 days ago</p>
                                <p className="fs-14 d-inline-flex align-items-center mb-0">
                                  <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                    4.0
                                  </span>
                                  Excellent service!
                                </p>
                              </div>
                            </div>
                          </div>
                          <Link
                            href="#"
                            className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"
                          >
                            <i className="isax isax-repeat me-1" />
                            Reply
                          </Link>
                        </div>
                        <p className="mb-2">
                          I found the visa guidance invaluable, though the online
                          form could be more user-friendly. Excellent support
                          throughout!
                        </p>
                        <div className="d-inline-flex align-items-center">
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center fs-14 me-3"
                          >
                            <i className="isax isax-like-1 me-2" />
                            15
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-dislike me-2" />
                            30
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-heart5 text-danger me-2" />
                            52
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card review-item shadow-none mb-3">
                    <div className="card-body p-3">
                      <div className="review-info">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/users/user-26.jpg"
                                className="rounded-circle"
                                alt="img"
                              />
                            </span>
                            <div>
                              <h6 className="fs-16 fw-medium mb-1">Jessie Alves</h6>
                              <div className="d-flex align-items-center flex-wrap date-info">
                                <p className="fs-14 mb-0">2 days ago</p>
                                <p className="fs-14 d-inline-flex align-items-center mb-0">
                                  <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                    5.0
                                  </span>
                                  Convenient Location!
                                </p>
                              </div>
                            </div>
                          </div>
                          <Link
                            href="#"
                            className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"
                          >
                            <i className="isax isax-repeat me-1" />
                            Reply
                          </Link>
                        </div>
                        <p className="mb-2">
                          The visa service was efficient, but I wish there were more
                          options for expedited processing. Still, I'd recommend it.
                        </p>
                        <div className="d-inline-flex align-items-center">
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center fs-14 me-3"
                          >
                            <i className="isax isax-like-1 me-2" />
                            13
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-dislike me-2" />
                            38
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-heart5 text-danger me-2" />
                            75
                          </Link>
                        </div>
                      </div>
                      <div className="review-info reply mt-4 p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/users/user-25.jpg"
                                className="rounded-circle"
                                alt="img"
                              />
                            </span>
                            <div>
                              <h6 className="fs-16 fw-medium mb-1">
                                Adrian Hendriques
                              </h6>
                              <div className="d-flex align-items-center flex-wrap date-info">
                                <p className="fs-14 mb-0">2 days ago</p>
                                <p className="fs-14 d-inline-flex align-items-center mb-0">
                                  <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                    2.0
                                  </span>
                                  Excellent service!
                                </p>
                              </div>
                            </div>
                          </div>
                          <Link
                            href="#"
                            className="btn btn-outline-light btn-md d-inline-flex align-items-center me-2"
                          >
                            <i className="isax isax-repeat me-1" />
                            Reply
                          </Link>
                        </div>
                        <p className="mb-2">
                          I appreciated the detailed visa checklist provided, but
                          the communication could be more prompt. Good value for the
                          price.
                        </p>
                        <div className="d-inline-flex align-items-center">
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center fs-14 me-3"
                          >
                            <i className="isax isax-like-1 me-2" />
                            10
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-dislike me-2" />
                            21
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-heart5 text-danger me-2" />
                            46
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-4 mb-xl-0">
                    <Link
                      href="#"
                      className="btn btn-primary btn-md d-inline-flex align-items-center justify-content-center mt-2"
                    >
                      See all 4,078 reviews
                      <i className="isax isax-arrow-right-3 ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 theiaStickySidebar">
              <div className="card shadow-none">
                <div className="card-body">
                  <h5 className="fs-18 mb-3">Check Availability</h5>
                  <div className="banner-form">
                    <form action="#" className="form-info border-0">
                      <div className="form-info border-0">
                        <div className="form-item dropdown border rounded p-3 mb-3 w-100">
                          <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false"
                            role="menu"
                          >
                            <label className="form-label fs-14 text-default mb-1">
                              Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="New York"
                            />
                          </div>
                          <div className="dropdown-menu dropdown-md p-0">
                            <div className="input-search p-3 border-bottom">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search"
                                />
                                <span className="input-group-text px-2 border-start-0">
                                  <i className="isax isax-search-normal" />
                                </span>
                              </div>
                            </div>
                            <ul>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">New York</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Boston</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">
                                    Northern Virginia
                                  </h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Los Angeles</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Orlando</h6>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="form-item dropdown border rounded p-3 mb-3 w-100">
                          <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false"
                            role="menu"
                          >
                            <label className="form-label fs-14 text-default mb-1">
                              Visa Type
                            </label>
                            <h5>Tourist</h5>
                          </div>
                          <div className="dropdown-menu dropdown-md p-0">
                            <div className="input-search p-3 border-bottom">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search"
                                />
                                <span className="input-group-text px-2 border-start-0">
                                  <i className="isax isax-search-normal" />
                                </span>
                              </div>
                            </div>
                            <ul>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Tourist</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Business</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Student</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Work</h6>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="form-item dropdown border rounded p-3 mb-3 w-100">
                          <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false"
                            role="menu"
                          >
                            <label className="form-label fs-14 text-default mb-1">
                              Citizenship{" "}
                            </label>
                            <h5>Australia</h5>
                          </div>
                          <div className="dropdown-menu dropdown-md p-0">
                            <div className="input-search p-3 border-bottom">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search"
                                />
                                <span className="input-group-text px-2 border-start-0">
                                  <i className="isax isax-search-normal" />
                                </span>
                              </div>
                            </div>
                            <ul>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">America</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Australia</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">Canada</h6>
                                </Link>
                              </li>
                              <li className="border-bottom">
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">UK</h6>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" href="#">
                                  <h6 className="fs-16 fw-medium">China</h6>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fs-14 text-default mb-1">
                            Processing Time
                          </label>
                          <CustomSelect
                            options={visaDays}
                            className="select"
                            placeholder="Select"
                          />

                        </div>
                        <div className="card shadow-none mb-3">
                          <div className="card-body p-3 pb-0">
                            <div className="border-bottom pb-2 mb-2">
                              <h6>Details</h6>
                            </div>
                            <div className="custom-increment">
                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                <label className="form-label text-gray-9 mb-0">
                                  Adults
                                </label>
                                <BannerCounter />
                              </div>
                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                <label className="form-label text-gray-9 mb-0">
                                  Infants{" "}
                                  <span className="text-default fw-normal">
                                    ( 0-12 Yrs )
                                  </span>
                                </label>
                                <BannerCounter />
                              </div>
                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                <label className="form-label text-gray-9 mb-0">
                                  Children{" "}
                                  <span className="text-default fw-normal">
                                    ( 2-12 Yrs )
                                  </span>
                                </label>
                                <BannerCounter />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between bg-success-transparent p-2 rounded-pill mb-4">
                        <h6 className="fs-14 fw-medium text-success mb-0 d-inline-flex align-items-center">
                          <i className="isax isax-tick-circle5 me-1 fs-24" />
                          40 Seats Available on your Search
                        </h6>
                      </div>
                      <button
                        type="button"
                        data-bs-target="#apply_visa"
                        data-bs-toggle="modal"
                        className="btn btn-primary btn-lg search-btn ms-0 w-100 fs-14 d-flex align-items-center justify-content-center"
                      >
                        Book Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* Card */}
              <div className="card shadow-none border-0 bg-purple-transparent">
                <div className="card-body">
                  <div className="fs-18 text-dark fw-semibold">
                    <i className="isax isax-document-text-14 me-1" />
                    Important Note
                  </div>
                  <div className="mt-3">
                    <p>
                      <i className="isax isax-information5 me-1 text-purple" />
                      False info = visa denial.
                    </p>
                    <p>
                      <i className="isax isax-information5 me-1 text-purple" />
                      Requirements vary: nationality, travel, purpose.
                    </p>
                    <p>
                      <i className="isax isax-information5 me-1 text-purple" />
                      Extra documents not always needed.
                    </p>
                  </div>
                </div>
              </div>
              {/* /Card */}
              {/* Enquiry */}
              <div className="card shadow-none">
                <div className="card-body">
                  <form>
                    <h5 className="mb-3 fs-18">Enquire Us</h5>
                    <div className="py-1">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-lg d-flex align-items-center justify-content-center"
                    >
                      Submit Enquiry
                    </button>
                  </form>
                </div>
              </div>
              {/* /Enquiry */}
              <div className="card shadow-none mb-4">
                <div className="card-body">
                  <h5 className="fs-18 mb-3">Provider Details</h5>
                  <div className="py-1">
                    <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
                      <Link href="#" className="avatar avatar-lg flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/users/user-05.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </Link>
                      <div className="ms-2 overflow-hidden">
                        <h6 className="fw-medium text-truncate">
                          <Link href="#">Adrian Hendriques</Link>
                        </h6>
                        <p className="fs-14">Member Since : 14 May 2024</p>
                      </div>
                    </div>
                    <div className="border br-10 mb-3 p-3">
                      <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                          <i className="isax isax-call-outgoing5" />
                        </span>
                        <p>+1 12545 45548</p>
                      </div>
                      <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                          <i className="isax isax-message-search5" />
                        </span>
                        <p>Info@example.com</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                          <i className="isax isax-location-tick5" />
                        </span>
                        <p>4635 Pheasant Ridge Road, USA</p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-sm-6">
                      <Link
                        href="#"
                        className="btn btn-light d-flex align-items-center justify-content-center"
                      >
                        <i className="isax isax-messages5 me-2" />
                        Whatsapp Us
                      </Link>
                    </div>
                    <div className="col-sm-6">
                      <Link
                        href={routes.chat}
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                      >
                        <i className="isax isax-message-notif5 me-2" />
                        Chat Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow-none border-0 bg-danger-transparent">
                <div className="card-body">
                  <div className="fs-18 text-dark fw-semibold">
                    Common Reasons for Rejection
                  </div>
                  <div className="mt-3">
                    <p className="text-dark">
                      <i className="isax isax-information5 me-1 text-danger" />
                      False info = visa denial.
                    </p>
                    <p className="text-dark">
                      <i className="isax isax-information5 me-1 text-danger" />
                      Requirements vary: nationality, travel, purpose.
                    </p>
                    <p className="text-dark">
                      <i className="isax isax-information5 me-1 text-danger" />
                      Extra documents not always needed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="visa-details-card pb-0 text-center">
                <ImageWithBasePath
                  src="assets/img/visa/visa-details-card-bg-01.png"
                  alt="img"
                  className="img-fluid w-100 position-absolute top-0 end-0 z-0"
                />
                <ImageWithBasePath
                  src="assets/img/visa/visa-details-card-bg-02.png"
                  alt="img"
                  className="img-fluid w-100 position-absolute bottom-0 start-0 z-0"
                />
                <div className="title">
                  Need Visa <br /> Assistance?
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                  <p className="mb-0">
                    <i className="isax isax-tick-square5 me-1" />
                    Expert Guidance
                  </p>
                  <p className="mb-0">
                    <i className="isax isax-tick-square5 me-1" />
                    Fast Processing
                  </p>
                </div>
                <div className="text-center">
                  <ImageWithBasePath
                    src="assets/img/visa/visa-details-card-img.png"
                    alt="img"
                    className="img-fluid position-relative z-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

      {/* Review Modal */}
      <div className="modal fade" id="add_review">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h5>Write a Review</h5>
              <Link href="#" data-bs-dismiss="modal" aria-label="Close">
                <i className="ti ti-x fs-16" />
              </Link>
            </div>
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Your Rating <span className="text-danger">*</span>
                      </label>
                      <div className="selection-wrap">
                        <div className="d-inline-block">
                          <div className="rating-selction">
                            <input
                              type="radio"
                              name="rating"
                              defaultValue={5}
                              id="rating5"
                            />
                            <label htmlFor="rating5">
                              <i className="fa-solid fa-star" />
                            </label>
                            <input
                              type="radio"
                              name="rating"
                              defaultValue={4}
                              id="rating4"
                            />
                            <label htmlFor="rating4">
                              <i className="fa-solid fa-star" />
                            </label>
                            <input
                              type="radio"
                              name="rating"
                              defaultValue={3}
                              id="rating3"
                            />
                            <label htmlFor="rating3">
                              <i className="fa-solid fa-star" />
                            </label>
                            <input
                              type="radio"
                              name="rating"
                              defaultValue={2}
                              id="rating2"
                            />
                            <label htmlFor="rating2">
                              <i className="fa-solid fa-star" />
                            </label>
                            <input
                              type="radio"
                              name="rating"
                              defaultValue={1}
                              id="rating1"
                            />
                            <label htmlFor="rating1">
                              <i className="fa-solid fa-star" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Write Your Review <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex align-items-center justify-content-end m-0">
                  <button type="submit" className="btn btn-primary btn-md">
                    <i className="isax isax-edit-2 me-1" />
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Review Modal */}
      {/* Apply */}
      <div className="modal fade" id="apply_visa" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header px-4">
              <h5>Apply for Visa</h5>
              <button
                data-bs-dismiss="modal"
                aria-label="close"
                className="btn-close"
              />
            </div>
            <form action="#">
              <div className="modal-body p-4">
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
                        Attached Documents <span className="text-danger">*</span>
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
                    <div className="mb-0">
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
                    className="btn btn-primary"
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
                <span className="d-inline-block mb-3">
                  <i className="isax isax-tick-circle5 fs-40 text-success" />
                </span>
                <h5 className="mb-3">Applied Successfully</h5>
                <p>
                  Your visa for the “Academic Year Abroad with Comprehensive
                  Healthcare” has been applied successfully. Stay tuned for updates
                  on your application status.with Reference Number{" "}
                  <span className="text-primary">#12559845</span>
                </p>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Link
                    href="#"
                    className="btn w-100 btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </Link>
                  <button
                    onClick={handleBooking}
                    className="btn w-100 btn-primary"
                  >
                    Booking Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Success */}
    </>
  )
}

export default VisaDetails