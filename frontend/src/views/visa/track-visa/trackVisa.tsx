"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const TrackVisa = () => {
  const routes = all_routes;

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
      label: "Visa Tracking",
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
          {/* row start */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="visa-tracking-card-one bg-light-200 border border-light">
                <div className="card-title">
                  <h2>Track Your Visa Application</h2>
                  <p>
                    Enter your tracking number to view the current status of your
                    visa application
                  </p>
                </div>
                <div className="card-content">
                  <div className="border-bottom mb-4">
                    <div className="track-input">
                      <input
                        type="text"
                        placeholder="Enter tracking number (e.g., VIS2024-US-123456)"
                        className="form-control form-control-lg"
                      />
                      <button className="btn btn-primary">
                        <i className="isax isax-search-normal me-2" />
                        Track
                      </button>
                    </div>
                    <div className="card">
                      <div className="card-body text-start">
                        <p>
                          Your tracking number was sent to your email after
                          submitting your application. You can also find it in your
                          application confirmation receipt.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="fs-16 fw-semibold text-dark">
                      Try these sample tracking numbers:
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2 mt-3 flex-wrap">
                      <Link href="#" className="btn btn-outline-light rounded">
                        VIS2024-US-123456
                      </Link>
                      <Link href="#" className="btn btn-outline-light rounded">
                        VIS2024-US-123456
                      </Link>
                      <Link href="#" className="btn btn-outline-light rounded">
                        VIS2024-US-123456
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded mb-3">
                    <div className="d-flex align-items-center flex-wrap">
                      <div>
                        <div className="mb-1 fs-28 fw-bold">Application Status</div>
                        <p className="me-2 mb-0">
                          Tracking Number:{" "}
                          <span className="text-primary">VIS2024-US-123456</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-purple rounded-pill d-inline-flex align-items-center fs-10">
                        <i className="fa-solid fa-circle fs-5 me-1" />
                        Under Review
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <p className="mb-0">Processing Progress</p>
                      <p className="mb-0">3&nbsp;of&nbsp;5&nbsp;steps completed</p>
                    </div>
                    <div
                      className="progress w-100"
                      role="progressbar"
                      aria-valuenow={90}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ height: 8 }}
                    >
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: "90%" }}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center justify-content-between gap-3 mb-4">
                    <div className="col-lg-3">
                      <div className="fs-14 text-dark fw-medium">Name</div>
                      <p><AgencyName /></p>
                    </div>
                    <div className="col-lg-3">
                      <div className="fs-14 text-dark fw-medium">Visa Type</div>
                      <p>Tourist Visa</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="fs-14 text-dark fw-medium">Destination</div>
                      <p>United States</p>
                    </div>
                    <div className="col-lg-3">
                      <div className="fs-14 text-dark fw-medium">Submitted On</div>
                      <p>25 May 2005</p>
                    </div>
                  </div>
                  <div className="card bg-info-transparent border-purple mb-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="me-3">
                          <i className="isax isax-info-circle5 fs-24 text-purple" />
                        </span>
                        <div>
                          <div className="fs-14 fw-medium text-dark">
                            Expected Completion Date
                          </div>
                          <p className="text-dark">Thursday, January 25, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="visa-timeline-card bg-light-200 border border-light">
                <h2>Application Timeline</h2>
                <p className="subtitle">
                  Track the progress of your visa application
                </p>
                <div className="timeline">
                  {/* Item */}
                  <div className="timeline-item completed">
                    <div className="timeline-icon">
                      <i className="isax isax-tick-circle" />
                    </div>
                    <div className="timeline-content">
                      <h4>Application Submitted</h4>
                      <p>
                        Your application has been received and is in queue for
                        processing
                      </p>
                    </div>
                    <div className="timeline-date">25 May 2026, 02:15 PM</div>
                  </div>
                  {/* Item */}
                  <div className="timeline-item completed">
                    <div className="timeline-icon">
                      <i className="isax isax-tick-circle" />
                    </div>
                    <div className="timeline-content">
                      <h4>Document Verification</h4>
                      <p>All documents are being verified by our team</p>
                    </div>
                    <div className="timeline-date">26 May 2026, 04:25 PM</div>
                  </div>
                  {/* Item */}
                  <div className="timeline-item completed">
                    <div className="timeline-icon">
                      <i className="isax isax-tick-circle" />
                    </div>
                    <div className="timeline-content">
                      <h4>Under Review</h4>
                      <p>
                        Application is currently being reviewed by the consulate
                      </p>
                    </div>
                    <div className="timeline-date">29 May 2026, 06:15 PM</div>
                  </div>
                  {/* Active */}
                  <div className="timeline-item">
                    <div className="timeline-icon  bg-primary">
                      <i className="isax isax-clock" />
                    </div>
                    <div className="timeline-content">
                      <h4>Pending Interview</h4>
                      <p className="mb-0">
                        Interview may be required - awaiting confirmation
                      </p>
                      <span className="status">Currently in progress</span>
                    </div>
                  </div>
                  {/* Upcoming */}
                  <div className=" timeline-item1 upcoming">
                    <div className="timeline-icon">
                      <i className="ti ti-point-filled" />
                    </div>
                    <div className="timeline-content">
                      <h4>Approved</h4>
                      <p>Visa has been approved and is ready for collection</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-gap-3">
                <div className="col-lg-6 d-flex">
                  <div className="card flex-fill mb-0">
                    <div className="card-body">
                      <div className="mb-4">
                        <div className="fs-20 fw-semibold text-dark">
                          Quick Actions
                        </div>
                        <p>Manage your application</p>
                      </div>
                      <div>
                        <Link
                          href="#"
                          className="btn btn-outline-light rounded fs-16 fw-normal w-100 text-start mb-3"
                        >
                          <i className="ti ti-download" /> Download Application
                          Receipt
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-outline-light rounded fs-16 fw-normal w-100 text-start mb-3"
                        >
                          <i className="ti ti-download" /> Download Documents
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-outline-light rounded fs-16 fw-normal w-100 text-start mb-0"
                        >
                          <i className="ti ti-mail" /> Email Status Updates
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex">
                  <div className="card flex-fill mb-0">
                    <div className="card-body">
                      <div className="mb-4">
                        <div className="fs-20 fw-semibold text-dark">
                          Need Help?
                        </div>
                        <p>Our support team is here for you</p>
                      </div>
                      <div className="card bg-light mb-3">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <span className="me-3">
                              <i className="isax isax-call5 fs-24 text-primary" />
                            </span>
                            <div>
                              <p className="text-dark mb-0">Call Us</p>
                              <div className="fs-14 fw-medium text-dark">
                                +1 (555) 123-4567
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card bg-light mb-0">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <span className="me-3">
                              <i className="ti ti-mail fs-24 text-primary" />
                            </span>
                            <div>
                              <p className="text-dark mb-0">Email Support</p>
                              <div className="fs-14 fw-medium text-dark">
                                support@visaportal.com
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  )
}

export default TrackVisa