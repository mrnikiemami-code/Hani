"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";

const TravelVoucher = () => {
  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Account",
      to: routes.userAllBookings,
      active: false,
    },
    {
      label: "Trip Details",
      to: routes.userTripDetails,
      active: false,
    },
    {
      label: "Official Voucher",
      active: true,
    },
  ];
  return (
   <>
  <Breadcrumb
        title="Travel Voucher &amp; E-Ticket"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07 no-print"
      />
  {/* Page Wrapper */}
  <div className="content">
    <div className="container">
      {/* Service Switcher (No Print) */}
      <div className="card mb-4 no-print">
        <div className="card-body p-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <span className="fs-13 text-gray-6 d-block">
                Trip Reference: <strong>DT-TRIP-4821</strong> (Barcelona, 25 –
                28 May 2026)
              </span>
              <span className="fs-14 fw-medium text-dark">
                Select Service Voucher to View or Print:
              </span>
            </div>
            <div className="d-flex align-items-center flex-wrap gap-2">
              <ul
                className="nav nav-pills voucher-nav-pills gap-2"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    data-bs-toggle="pill"
                    data-bs-target="#voucher-hotel"
                    type="button"
                    role="tab"
                  >
                    <i className="isax isax-buildings-2 me-1" />
                    Hotel Voucher
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    data-bs-toggle="pill"
                    data-bs-target="#voucher-flight"
                    type="button"
                    role="tab"
                  >
                    <i className="isax isax-airplane me-1" />
                    Flight Boarding Pass
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    data-bs-toggle="pill"
                    data-bs-target="#voucher-car"
                    type="button"
                    role="tab"
                  >
                    <i className="isax isax-car me-1" />
                    Car Rental Voucher
                  </button>
                </li>
              </ul>
              <div className="d-flex align-items-center gap-2 ms-lg-2">
                <Link
                  href={routes.userTripDetails}
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="isax isax-arrow-left4 me-1" />
                  Back to Trip
                </Link>
                <button
                  type="button"
                  className="btn btn-primary btn-sm btn-print-voucher"
                  onClick={() => window.print()}
                >
                  <i className="isax isax-printer me-1" />
                  Print Voucher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Content (Printable Voucher Container) */}
      <div className="tab-content" id="printable-voucher">
        {/* 1. HOTEL VOUCHER PANE */}
        <div
          className="tab-pane fade show active"
          id="voucher-hotel"
          role="tabpanel"
        >
          <div className="travel-voucher-wrap mb-4">
            {/* Voucher Header */}
            <div className="voucher-header-band">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                    <ImageWithBasePath
                      src="assets/img/logo.svg"
                      alt="DreamsTour"
                      className="voucher-logo-img"
                    />
                    <span className="badge bg-white text-primary fs-12 fw-bold ms-2">
                      OFFICIAL HOTEL STAY VOUCHER
                    </span>
                  </div>
                  <h3 className="fs-22 text-white mb-1">
                    Hotel Miravent Barcelona
                  </h3>
                  <p className="fs-14 text-white-50 mb-0">
                    Carrer de la Boqueria, 12, Ciutat Vella, 08002 Barcelona,
                    Spain · Phone: +34 932 114 800
                  </p>
                </div>
                <div className="text-lg-end">
                  <span className="fs-12 text-white-50 d-block">
                    VOUCHER NUMBER
                  </span>
                  <h4 className="fs-20 text-white mb-1" id="vchr-hotel-num">
                    VCHR-HTL-94821
                  </h4>
                  <span className="badge bg-success text-white fs-11">
                    <i className="isax isax-shield-tick me-1" />
                    CONFIRMED &amp; GUARANTEED
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              {/* Guest & Booking Summary */}
              <div className="row g-3 mb-4">
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Lead Guest
                    </span>
                    <h6 className="fs-15 mb-0">Jeffrey Wilson</h6>
                    <span className="fs-13 text-gray-6">
                      jeffrey.w@example.com
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Guests &amp; Rooms
                    </span>
                    <h6 className="fs-15 mb-0">2 Adults · 1 Room</h6>
                    <span className="fs-13 text-gray-6">
                      Deluxe King Suite (City View)
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Check-In Date
                    </span>
                    <h6 className="fs-15 mb-0">25 May 2026</h6>
                    <span className="fs-13 text-gray-6">From 15:00 hrs</span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Check-Out Date
                    </span>
                    <h6 className="fs-15 mb-0">28 May 2026</h6>
                    <span className="fs-13 text-gray-6">
                      Until 11:00 hrs (3 Nights)
                    </span>
                  </div>
                </div>
              </div>
              {/* Perforated Cut Line */}
              <div className="voucher-perforated" />
              {/* Inclusions & Amenity Verification */}
              <div className="row g-4 mb-4">
                <div className="col-lg-8">
                  <h5 className="fs-16 mb-2">
                    Confirmed Meal Plan &amp; Inclusions
                  </h5>
                  <div className="row g-2 mb-3">
                    <div className="col-sm-6">
                      <div className="p-2 border rounded d-flex align-items-center gap-2">
                        <i className="isax isax-cup text-primary fs-18" />
                        <span className="fs-13 fw-medium">
                          Daily Artisan Buffet Breakfast Included
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-2 border rounded d-flex align-items-center gap-2">
                        <i className="isax isax-wifi text-primary fs-18" />
                        <span className="fs-13 fw-medium">
                          Complimentary High-Speed WiFi
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-2 border rounded d-flex align-items-center gap-2">
                        <i className="isax isax-car text-primary fs-18" />
                        <span className="fs-13 fw-medium">
                          Airport Shuttle Transfer Arranged
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-2 border rounded d-flex align-items-center gap-2">
                        <i className="isax isax-clock text-primary fs-18" />
                        <span className="fs-13 fw-medium">
                          Complimentary Late Checkout (13:00)
                        </span>
                      </div>
                    </div>
                  </div>
                  <h5 className="fs-16 mb-2">Special Check-In Instructions</h5>
                  <p className="fs-13 text-gray-6 mb-2">
                    Please present this printed voucher or digital copy upon
                    arrival along with valid government-issued photographic
                    identification for both guests. City tourism tax
                    (€3.25/person/night) is payable directly to hotel reception
                    at checkout.
                  </p>
                  <p className="fs-13 text-gray-6 mb-0">
                    <strong>Hotel Front Desk 24/7 Helpline:</strong> +34 932 114
                    800 · <strong>DreamsTour Concierge Desk:</strong> +1 56565
                    56594
                  </p>
                </div>
                <div className="col-lg-4 text-center">
                  <div className="voucher-barcode-box">
                    <span className="fs-12 text-gray-6 d-block mb-2">
                      SCAN FOR FRONT DESK CHECK-IN
                    </span>
                    <div className="mb-2">
                      <svg className="voucher-qr-code" viewBox="0 0 100 100">
                        <rect width={100} height={100} fill="#ffffff" />
                        <rect
                          x={10}
                          y={10}
                          width={25}
                          height={25}
                          fill="#111827"
                        />
                        <rect
                          x={15}
                          y={15}
                          width={15}
                          height={15}
                          fill="#ffffff"
                        />
                        <rect
                          x={18}
                          y={18}
                          width={9}
                          height={9}
                          fill="#111827"
                        />
                        <rect
                          x={65}
                          y={10}
                          width={25}
                          height={25}
                          fill="#111827"
                        />
                        <rect
                          x={70}
                          y={15}
                          width={15}
                          height={15}
                          fill="#ffffff"
                        />
                        <rect
                          x={73}
                          y={18}
                          width={9}
                          height={9}
                          fill="#111827"
                        />
                        <rect
                          x={10}
                          y={65}
                          width={25}
                          height={25}
                          fill="#111827"
                        />
                        <rect
                          x={15}
                          y={70}
                          width={15}
                          height={15}
                          fill="#ffffff"
                        />
                        <rect
                          x={18}
                          y={73}
                          width={9}
                          height={9}
                          fill="#111827"
                        />
                        <circle cx={50} cy={50} r={10} fill="#155EEF" />
                        <rect
                          x={42}
                          y={15}
                          width={16}
                          height={6}
                          fill="#111827"
                        />
                        <rect
                          x={42}
                          y={75}
                          width={16}
                          height={6}
                          fill="#111827"
                        />
                        <rect
                          x={65}
                          y={45}
                          width={10}
                          height={10}
                          fill="#111827"
                        />
                        <rect
                          x={80}
                          y={65}
                          width={10}
                          height={10}
                          fill="#111827"
                        />
                      </svg>
                    </div>
                    <div className="fs-12 font-monospace text-dark fw-bold mb-1">
                      *VCHR-HTL-94821-2026*
                    </div>
                    <span className="badge bg-light text-gray-7 fs-11">
                      Authorized Booking Partner Voucher
                    </span>
                  </div>
                </div>
              </div>
              {/* Financial Confirmation & Payment Status */}
              <div className="p-3 bg-light-200 rounded border d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div>
                  <span className="fs-13 text-gray-6 d-block">
                    Booking Reference: <strong>DT-HB-1245</strong>
                  </span>
                  <span className="fs-13 text-success fw-medium">
                    <i className="isax isax-tick-circle me-1" />
                    Fully Prepaid · No Additional Room Charges Due Upon Arrival
                  </span>
                </div>
                <div className="text-end">
                  <span className="fs-12 text-gray-6 d-block">
                    Total Amount Paid
                  </span>
                  <span className="fs-18 fw-bold text-primary">$1,500.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 2. FLIGHT BOARDING PASS PANE */}
        <div className="tab-pane fade" id="voucher-flight" role="tabpanel">
          <div className="travel-voucher-wrap mb-4">
            <div className="voucher-header-band voucher-band-flight">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                    <span className="badge bg-white text-primary fs-12 fw-bold">
                      E-TICKET &amp; BOARDING DOCUMENT
                    </span>
                    <span className="badge bg-warning text-dark fs-11">
                      SEATS ASSIGNED
                    </span>
                  </div>
                  <h3 className="fs-22 text-white mb-1">
                    Air India · Flight AI-191
                  </h3>
                  <p className="fs-14 text-white-50 mb-0">
                    Boeing 787-8 Dreamliner · Class: Economy Premium · Operated
                    by Air India
                  </p>
                </div>
                <div className="text-lg-end">
                  <span className="fs-12 text-white-50 d-block">
                    BOOKING PNR
                  </span>
                  <h4 className="fs-22 text-white font-monospace mb-1">
                    AI-BCN789
                  </h4>
                  <span className="badge bg-success text-white fs-11">
                    CONFIRMED TICKET
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              {/* Route & Flight Timeline */}
              <div className="row align-items-center g-3 mb-4 pb-4 border-bottom">
                <div className="col-md-4 text-center text-md-start">
                  <span className="fs-28 fw-bold text-dark d-block">DEL</span>
                  <h6 className="fs-16 mb-0">Delhi (Indira Gandhi Int'l)</h6>
                  <span className="fs-13 text-gray-6 d-block">
                    Terminal 3 · Gate 14
                  </span>
                  <p className="fs-14 fw-bold text-primary mt-1 mb-0">
                    25 May 2026, 04:45 AM
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <span className="fs-13 text-gray-6 d-block">
                    Flight Duration: 9h 45m
                  </span>
                  <div className="d-flex align-items-center justify-content-center gap-2 my-2">
                    <div className="flight-path-line" />
                    <i className="isax isax-airplane text-primary fs-20" />
                    <div className="flight-path-line" />
                  </div>
                  <span className="badge bg-light text-dark fs-12">
                    Non-Stop Direct
                  </span>
                </div>
                <div className="col-md-4 text-center text-md-end">
                  <span className="fs-28 fw-bold text-dark d-block">BCN</span>
                  <h6 className="fs-16 mb-0">Barcelona (El Prat Airport)</h6>
                  <span className="fs-13 text-gray-6 d-block">Terminal 1</span>
                  <p className="fs-14 fw-bold text-primary mt-1 mb-0">
                    25 May 2026, 14:30 PM
                  </p>
                </div>
              </div>
              {/* Passenger & Seat Allocation */}
              <div className="row g-3 mb-4">
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Passenger 1
                    </span>
                    <h6 className="fs-15 mb-0">Jeffrey Wilson</h6>
                    <span className="fs-13 text-primary fw-medium">
                      Seat 12A (Window)
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Passenger 2
                    </span>
                    <h6 className="fs-15 mb-0">Sarah Wilson</h6>
                    <span className="fs-13 text-primary fw-medium">
                      Seat 12B (Middle)
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Baggage Allowance
                    </span>
                    <h6 className="fs-15 mb-0">2x 23kg Checked</h6>
                    <span className="fs-13 text-gray-6">1x 7kg Cabin each</span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Boarding Time
                    </span>
                    <h6 className="fs-15 mb-0 text-danger">03:55 AM</h6>
                    <span className="fs-13 text-gray-6">
                      Gate closes 04:25 AM
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-light-200 rounded border d-flex align-items-center justify-content-between flex-wrap gap-2">
                <span className="fs-13 text-gray-6">
                  E-Ticket Number: <strong>098-2489201948</strong> · Status:{" "}
                  <strong>PAID IN FULL</strong>
                </span>
                <span className="fs-13 text-dark fw-bold">
                  Electronic check-in available 48 hours prior
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 3. CAR RENTAL VOUCHER PANE */}
        <div className="tab-pane fade" id="voucher-car" role="tabpanel">
          <div className="travel-voucher-wrap mb-4">
            <div className="voucher-header-band voucher-band-car">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-white text-success fs-12 fw-bold">
                      CAR RENTAL CONFIRMATION
                    </span>
                  </div>
                  <h3 className="fs-22 text-white mb-1">
                    Volkswagen Amarok (Automatic, 4x4)
                  </h3>
                  <p className="fs-14 text-white-50 mb-0">
                    Provider: Sixt Car Rental · Airport Terminal 1 Station,
                    Barcelona
                  </p>
                </div>
                <div className="text-lg-end">
                  <span className="fs-12 text-white-50 d-block">
                    RENTAL AGREEMENT
                  </span>
                  <h4 className="fs-20 text-white font-monospace mb-1">
                    RA-BAR-4581
                  </h4>
                  <span className="badge bg-white text-dark fs-11">
                    PREPAID RESERVATION
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="row g-3 mb-4">
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Primary Driver
                    </span>
                    <h6 className="fs-15 mb-0">Jeffrey Wilson</h6>
                    <span className="fs-13 text-gray-6">
                      License: DL-US-48201
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Pickup Location
                    </span>
                    <h6 className="fs-15 mb-0">BCN Airport T1</h6>
                    <span className="fs-13 text-gray-6">
                      25 May 2026, 15:30
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Drop-off Location
                    </span>
                    <h6 className="fs-15 mb-0">BCN Airport T1</h6>
                    <span className="fs-13 text-gray-6">
                      28 May 2026, 12:00
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="voucher-meta-tile">
                    <span className="fs-12 text-gray-6 d-block">
                      Insurance Package
                    </span>
                    <h6 className="fs-15 mb-0 text-success">
                      Full Collision Waiver
                    </h6>
                    <span className="fs-13 text-gray-6">
                      Zero Deductible Excess
                    </span>
                  </div>
                </div>
              </div>
              <p className="fs-13 text-gray-6 mb-0">
                <strong>Important:</strong> Primary driver must present an
                original valid driving license, passport, and a credit card in
                the driver's name for deposit verification.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Page Action Buttons (No Print) */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-5 no-print">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-primary btn-print-voucher d-inline-flex align-items-center"
            onClick={() => window.print()}
          >
            <i className="isax isax-printer me-2" />
            Print Official Voucher
          </button>
          <Link
            href={routes.customerInvoices}
            className="btn btn-outline-dark d-inline-flex align-items-center"
          >
            <i className="isax isax-receipt-item me-2" />
            View Billing Invoices
          </Link>
        </div>
        <div>
          <Link
            href={routes.userTripDetails}
            className="btn btn-light d-inline-flex align-items-center"
          >
            <i className="isax isax-arrow-left4 me-1" />
            Back to Trip Details
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
</>

  )
}

export default TravelVoucher