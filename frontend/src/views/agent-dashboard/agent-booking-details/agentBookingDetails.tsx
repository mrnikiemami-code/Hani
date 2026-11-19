"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Sidebar from "../sidebar/sidebar";
import ImageWithBasePath from "../../../components/image-with-base-path";
import AgentBookingDetailsModal from "./agentBookingDetailsModal";
import { all_routes } from "../../../routes/all_routes";
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const AgentBookingDetails = () => {
  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Agent Portal",
      to: routes.agentDashboard,
      active: false,
    },
    {
      label: "Bookings",
      to: routes.agentHotelBooking,
      active: false,
    },
    {
      label: "Booking #HB-1245",
      active: true,
    },
  ];
  return (
    <>
  <Breadcrumb
        title="Agent Booking Details"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04"
      />
  {/* Page Wrapper */}
  <div className="content">
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
          <Sidebar />
        </div>
        {/* /Sidebar */}
        {/* Main Content */}
        <div className="col-xl-9 col-lg-8">
          {/* Back Navigation */}
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <Link
              href={routes.agentHotelBooking}
              className="fs-14 fw-medium text-dark d-inline-flex align-items-center gap-1"
            >
              <i className="isax isax-arrow-left4" />
              Back to Hotel Bookings
            </Link>
            <span className="fs-13 text-gray-6">
              Created on: 15 May 2026, 14:22
            </span>
          </div>
          {/* Header Hero Card */}
          <div className="card agent-booking-hero mb-4">
            <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3 flex-wrap flex-lg-nowrap">
                <span className="avatar avatar-xl rounded overflow-hidden flex-shrink-0">
                  <ImageWithBasePath
                    src="assets/img/hotels/hotel-01.jpg"
                    className="img-fluid"
                    alt="Hotel Miravent"
                  />
                </span>
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                    <h3 className="fs-20 mb-0">Booking #HB-1245</h3>
                    <span className="badge badge-info rounded-pill fs-11">
                      Upcoming Stay
                    </span>
                    <span className="badge bg-success-transparent text-success fs-11">
                      Paid in Full
                    </span>
                  </div>
                  <p className="fs-14 fw-medium text-dark mb-1">
                    Hotel Miravent Barcelona · Suite Room 402
                  </p>
                  <p className="fs-13 text-gray-6 mb-0">
                    <i className="isax isax-location5 me-1" />
                    Ciutat Vella, Barcelona · 4 Days, 3 Nights
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Link
                  href={routes.travelVoucher}
                  className="btn btn-outline-primary btn-sm d-inline-flex align-items-center"
                >
                  <i className="isax isax-ticket me-1" />
                  View Voucher
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel-booking"
                >
                  <i className="isax isax-close-circle me-1" />
                  Cancel
                </button>
                <div className="dropdown">
                  <button
                    className="btn btn-primary btn-sm dropdown-toggle px-3"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    Change Status
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" href="#">
                        Mark Confirmed
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#">
                        Mark Checked-In
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#">
                        Mark Completed
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#cancel-booking"
                      >
                        Cancel Booking
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Customer & Stay Info Grid */}
          <div className="row g-4 mb-4">
            {/* Customer Details */}
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="fs-16 mb-0">Primary Guest Information</h5>
                  <Link href={routes.agentChat} className="btn btn-xs btn-light">
                    <i className="isax isax-message-2 me-1" />
                    Chat
                  </Link>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <ImageWithBasePath
                      src="assets/img/users/user-01.jpg"
                      alt="Lynwood Dickens"
                      className="avatar avatar-lg rounded-circle"
                    />
                    <div>
                      <h6 className="fs-16 mb-1">Lynwood Dickens</h6>
                      <span className="fs-13 text-gray-6">
                        Registered Member Since 2024
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">Email Address</span>
                    <span className="fs-13 fw-medium text-dark">
                      lynwood.dickens@example.com
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">Phone Number</span>
                    <span className="fs-13 fw-medium text-dark">
                      +1 (512) 849-2019
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">
                      Origin / Residence
                    </span>
                    <span className="fs-13 fw-medium text-dark">
                      Austin, Texas, United States
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="fs-13 text-gray-6">Special Requests</span>
                    <span className="fs-13 fw-medium text-primary">
                      High Floor, Extra Pillows
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Stay Manifest */}
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="fs-16 mb-0">Room &amp; Stay Manifest</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">Room Assigned</span>
                    <span className="fs-13 fw-semibold text-dark">
                      Suite Room 402 (King Bed)
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">Total Occupants</span>
                    <span className="fs-13 fw-medium text-dark">
                      2 Adults, 1 Child (Age 6)
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">Check-In Date</span>
                    <span className="fs-13 fw-medium text-dark">
                      20 May 2026, 10:50 AM
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">Check-Out Date</span>
                    <span className="fs-13 fw-medium text-dark">
                      25 May 2026, 10:50 AM
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">Meal Plan</span>
                    <span className="fs-13 fw-medium text-dark">
                      Breakfast Included Daily
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="fs-13 text-gray-6">
                      Extra Services Added
                    </span>
                    <span className="fs-13 text-dark">
                      Airport Pickup ($50), Cleaning ($20)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Financial & Commission Breakdown */}
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="fs-16 mb-0">
                Financial &amp; Commission Calculation
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Item Description</th>
                      <th className="text-center">Rate / Night</th>
                      <th className="text-center">Qty / Days</th>
                      <th className="text-end">Gross Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0">Suite Room Accommodation</h6>
                        <span className="fs-12 text-gray-6">
                          Rate Code: BAR-PROMO-10
                        </span>
                      </td>
                      <td className="text-center">$2,800.00</td>
                      <td className="text-center">4 Nights</td>
                      <td className="text-end fw-semibold text-dark">
                        $11,200.00
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0">
                          Airport Luxury Shuttle Pickup
                        </h6>
                        <span className="fs-12 text-gray-6">
                          One-way BCN Terminal 1
                        </span>
                      </td>
                      <td className="text-center">$50.00</td>
                      <td className="text-center">1 Transfer</td>
                      <td className="text-end fw-semibold text-dark">$50.00</td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0">
                          Cleaning &amp; Linen Refresh
                        </h6>
                        <span className="fs-12 text-gray-6">
                          Daily Premium Service
                        </span>
                      </td>
                      <td className="text-center">$20.00</td>
                      <td className="text-center">4 Days</td>
                      <td className="text-end fw-semibold text-dark">$80.00</td>
                    </tr>
                    <tr className="border-top">
                      <td colSpan={3} className="text-end fw-semibold">
                        Gross Client Payment
                      </td>
                      <td className="text-end fw-bold fs-16 text-dark">
                        $11,330.00
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-end text-gray-6">
                        Platform Processing Fee (3%)
                      </td>
                      <td className="text-end text-danger">-$339.90</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-end fw-bold text-success">
                        Your Agent Commission (10%)
                      </td>
                      <td className="text-end fw-bold fs-16 text-success">
                        +$1,133.00
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-end fw-semibold">
                        Net Payable to Property Supplier
                      </td>
                      <td className="text-end fw-bold text-primary">
                        $9,857.10
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Internal Agent Notes & Operational Log */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="fs-16 mb-0">
                Internal Agency Notes &amp; Operational Log
              </h5>
            </div>
            <div className="card-body">
              <div className="internal-note-box">
                <div className="d-flex align-items-center justify-content-between mb-1 flex-wrap gap-2">
                  <strong className="fs-14 text-dark">
                    <AgencyName /> (Agent)
                  </strong>
                  <span className="fs-12 text-gray-6">
                    16 May 2026, 09:15 AM
                  </span>
                </div>
                <p className="fs-13 text-gray-7 mb-0">
                  Confirmed arrival flight AI-191 landing at 10:15 AM. Notified
                  Hotel Miravent front desk manager (Elena) regarding early
                  check-in preference and luggage storage.
                </p>
              </div>
              <div className="internal-note-box border-start-warning">
                <div className="d-flex align-items-center justify-content-between mb-1 flex-wrap gap-2">
                  <strong className="fs-14 text-dark">
                    System Notification
                  </strong>
                  <span className="fs-12 text-gray-6">
                    15 May 2026, 02:22 PM
                  </span>
                </div>
                <p className="fs-13 text-gray-7 mb-0">
                  Prepayment authorized successfully through Stripe. Booking
                  voucher DT-HB-1245 emailed to traveler.
                </p>
              </div>
              <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
                <label className="form-label fs-14 fw-medium">
                  Add New Internal Note
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add operational notes visible only to agency team members..."
                  />
                  <button className="btn btn-primary" type="button">
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Main Content */}
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
  <AgentBookingDetailsModal />
</>

  )
}

export default AgentBookingDetails