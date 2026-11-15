"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
const VISA_REFERENCE = "DT-VISA-84920";
import { all_routes } from "../../../routes/all_routes";

const VisaBookingConfirmation = () => {
  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Visa",
      to: routes.visaGrid,
      active: false,
    },
    {
      label: "Booking Confirmation",
      active: true,
    },
  ];

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(VISA_REFERENCE);
  };

  return (
    <>
      <Breadcrumb
        title="Visa Booking Confirmation"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-08"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Confirmation Card */}
              <div className="card visa-confirmation-card mb-4">
                {/* Status Banner */}
                <div className="visa-status-banner">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="avatar avatar-xl rounded-circle bg-success text-white flex-shrink-0 d-inline-flex align-items-center justify-content-center">
                        <i className="isax isax-tick-circle fs-32" />
                      </span>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                          <h3 className="fs-20 mb-0">
                            Application Lodged Successfully!
                          </h3>
                          <span className="badge bg-success-transparent text-success fs-12">
                            Paid &amp; Confirmed
                          </span>
                        </div>
                        <p className="fs-14 text-gray-6 mb-0">
                          Your visa application and supporting documentation
                          have been verified and submitted for consular
                          processing.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="visa-ref-badge">
                        <span className="text-gray-6 fs-12">Ref ID:</span>
                        <strong id="visa-ref-id">{VISA_REFERENCE}</strong>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-light btn-copy-ref"
                        data-copy-target="#visa-ref-id"
                        title="Copy Reference ID"
                        onClick={handleCopyRef}
                      >
                        <i className="isax isax-copy" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  {/* Country & Target Visa Info */}
                  <div className="bg-light-200 border border-light p-3 rounded-2 mb-4">
                    <div className="d-flex flex-wrap align-items-center justify-content-between row-gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar avatar-xl rounded border overflow-hidden flex-shrink-0">
                          <ImageWithBasePath
                            src="assets/img/flags/es.png"
                            className="img-fluid"
                            alt="Flag of Spain"
                          />
                        </span>
                        <div>
                          <span className="badge bg-primary-transparent text-primary fs-12 mb-1">
                            Schengen Visa
                          </span>
                          <h4 className="fs-18 mb-1">
                            Spain — Short Stay Tourist Visa (Category C)
                          </h4>
                          <p className="fs-14 text-gray-6 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Consulate General of Spain, New York ·
                            <span className="text-dark fw-medium">
                              Up to 90 Days · Single Entry
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="text-lg-end">
                        <span className="fs-13 text-gray-6 d-block">
                          Expected Processing:
                        </span>
                        <span className="fs-16 fw-semibold text-primary">
                          10 – 15 Working Days
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Main Details Grid */}
                  <div className="row g-4 mb-4 pb-4 border-bottom">
                    <div className="col-md-3 col-6">
                      <span className="fs-13 text-gray-6 d-block mb-1">
                        Primary Applicant
                      </span>
                      <h6 className="fs-15 mb-0">Alexander Wright</h6>
                      <span className="fs-13 text-gray-6">
                        Passport: US-8492019
                      </span>
                    </div>
                    <div className="col-md-3 col-6">
                      <span className="fs-13 text-gray-6 d-block mb-1">
                        Nationality &amp; Origin
                      </span>
                      <h6 className="fs-15 mb-0">United States</h6>
                      <span className="fs-13 text-gray-6">
                        Place of Birth: Chicago
                      </span>
                    </div>
                    <div className="col-md-3 col-6">
                      <span className="fs-13 text-gray-6 d-block mb-1">
                        Intended Date of Entry
                      </span>
                      <h6 className="fs-15 mb-0">15 Nov 2026</h6>
                      <span className="fs-13 text-gray-6">
                        Exit: 28 Nov 2026
                      </span>
                    </div>
                    <div className="col-md-3 col-6">
                      <span className="fs-13 text-gray-6 d-block mb-1">
                        Biometrics Status
                      </span>
                      <span className="badge bg-info-transparent text-info fs-12">
                        <i className="isax isax-calendar me-1" />
                        Scheduled: 05 Oct 2026
                      </span>
                      <span className="fs-12 text-gray-6 d-block mt-1">
                        10:30 AM at VFS Center
                      </span>
                    </div>
                  </div>
                  {/* Document Verification Checklist */}
                  <div className="mb-4 pb-4 border-bottom">
                    <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                      <h5 className="fs-16 mb-0">
                        Uploaded Documentation Checklist
                      </h5>
                      <span className="badge bg-success-transparent text-success fs-12">
                        <i className="isax isax-shield-tick me-1" />6 of 6
                        Verified by Agent
                      </span>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <div className="visa-doc-item">
                          <div className="d-flex align-items-center gap-2">
                            <i className="isax isax-document-text text-primary fs-18" />
                            <span className="fs-14">
                              Valid US Passport (Min 6 months)
                            </span>
                          </div>
                          <span className="badge bg-success text-white fs-11">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="visa-doc-item">
                          <div className="d-flex align-items-center gap-2">
                            <i className="isax isax-image text-primary fs-18" />
                            <span className="fs-14">
                              Biometric Photograph (35x45mm)
                            </span>
                          </div>
                          <span className="badge bg-success text-white fs-11">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="visa-doc-item">
                          <div className="d-flex align-items-center gap-2">
                            <i className="isax isax-airplane text-primary fs-18" />
                            <span className="fs-14">
                              Round-Trip Flight Reservation
                            </span>
                          </div>
                          <span className="badge bg-success text-white fs-11">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="visa-doc-item">
                          <div className="d-flex align-items-center gap-2">
                            <i className="isax isax-buildings-2 text-primary fs-18" />
                            <span className="fs-14">
                              Confirmed Hotel Booking Voucher
                            </span>
                          </div>
                          <span className="badge bg-success text-white fs-11">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="visa-doc-item">
                          <div className="d-flex align-items-center gap-2">
                            <i className="isax isax-bank text-primary fs-18" />
                            <span className="fs-14">
                              Bank Statements (Last 3 Months)
                            </span>
                          </div>
                          <span className="badge bg-success text-white fs-11">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="visa-doc-item">
                          <div className="d-flex align-items-center gap-2">
                            <i className="isax isax-shield-tick text-primary fs-18" />
                            <span className="fs-14">
                              Travel Medical Insurance (EUR 30,000)
                            </span>
                          </div>
                          <span className="badge bg-success text-white fs-11">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Next Steps Timeline */}
                  <div className="mb-4 pb-4 border-bottom">
                    <h5 className="fs-16 mb-3">
                      Application Milestones &amp; Next Steps
                    </h5>
                    <div className="embassy-timeline">
                      <div className="timeline-step">
                        <span className="step-marker completed" />
                        <h6 className="fs-14 mb-1">
                          1. Application Lodged &amp; Verified
                        </h6>
                        <p className="fs-13 text-gray-6 mb-0">
                          Completed on 28 Sep 2026. DreamsTour Visa Experts
                          vetted your submission.
                        </p>
                      </div>
                      <div className="timeline-step">
                        <span className="step-marker active" />
                        <h6 className="fs-14 mb-1">
                          2. Biometrics &amp; Passport Submission
                        </h6>
                        <p className="fs-13 text-gray-6 mb-0">
                          Scheduled for <strong>05 Oct 2026, 10:30 AM</strong>{" "}
                          at VFS Global, 145 W 45th St, New York. Bring your
                          appointment letter.
                        </p>
                      </div>
                      <div className="timeline-step">
                        <span className="step-marker" />
                        <h6 className="fs-14 mb-1">
                          3. Embassy Review &amp; Decision
                        </h6>
                        <p className="fs-13 text-gray-6 mb-0">
                          Consulate General of Spain evaluates application
                          (Estimated turnaround: 7–10 days).
                        </p>
                      </div>
                      <div className="timeline-step">
                        <span className="step-marker" />
                        <h6 className="fs-14 mb-1">
                          4. Secure Courier Passport Return
                        </h6>
                        <p className="fs-13 text-gray-6 mb-0">
                          Your stamped passport will be delivered to your
                          registered address with tracking code.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Billing & Order Summary */}
                  <div className="mb-4 pb-4 border-bottom">
                    <h5 className="fs-16 mb-3">Payment Summary</h5>
                    <div className="row g-3">
                      <div className="col-lg-3 col-6">
                        <span className="fs-13 text-gray-6 d-block">
                          Government Consular Fee
                        </span>
                        <p className="fs-15 fw-semibold text-dark mb-0">
                          $90.00
                        </p>
                      </div>
                      <div className="col-lg-3 col-6">
                        <span className="fs-13 text-gray-6 d-block">
                          Platform Vetting Charge
                        </span>
                        <p className="fs-15 fw-semibold text-dark mb-0">
                          $35.00
                        </p>
                      </div>
                      <div className="col-lg-3 col-6">
                        <span className="fs-13 text-gray-6 d-block">
                          Secure Courier Delivery
                        </span>
                        <p className="fs-15 fw-semibold text-dark mb-0">
                          $12.00
                        </p>
                      </div>
                      <div className="col-lg-3 col-6">
                        <span className="fs-13 text-gray-6 d-block">
                          Total Paid
                        </span>
                        <p className="fs-18 fw-bold text-primary mb-0">
                          $137.00
                        </p>
                        <span className="fs-12 text-success">
                          <i className="isax isax-tick-circle me-1" />
                          Mastercard ···· 4242
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-2">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <Link
                        href={routes.trackVisa}
                        className="btn btn-primary d-inline-flex align-items-center"
                      >
                        <i className="isax isax-radar5 me-2" />
                        Track Visa Status
                      </Link>
                      <Link
                        href={routes.travelVoucher}
                        className="btn btn-outline-light d-inline-flex align-items-center"
                      >
                        <i className="isax isax-receipt-item me-2" />
                        Download Receipt / Voucher
                      </Link>
                      <button
                        type="button"
                        className="btn btn-light btn-print-voucher d-inline-flex align-items-center"
                        onClick={() => window.print()}
                      >
                        <i className="isax isax-printer me-2" />
                        Print Confirmation
                      </button>
                    </div>
                    <div>
                      <Link
                        href={routes.userVisaBooking}
                        className="btn btn-light d-inline-flex align-items-center"
                      >
                        <i className="isax isax-arrow-left4 me-1" />
                        My Visa Bookings
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Confirmation Card */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default VisaBookingConfirmation;
