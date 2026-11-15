"use client";
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'

interface AddServiceItem {
  id: string;
  title: string;
  detail: string;
  icon: string;
  iconClass: string;
  actionLabel: string;
  link: string;
}

interface RefundLine {
  id: string;
  label: string;
  amount: string;
  isDeduction: boolean;
}

interface PolicyWindow {
  id: string;
  title: string;
  detail: string;
  badge?: string;
  isNow: boolean;
}

interface SummaryLine {
  id: string;
  label: string;
  value: string;
}

const addServices: AddServiceItem[] = [
  {
    id: 'seat-selection',
    title: 'Seat selection',
    detail: 'Currently 1B and 1E',
    icon: 'isax-airplane',
    iconClass: 'bg-primary-transparent text-primary',
    actionLabel: 'Change seats',
    link: all_routes.flightSeatSelection,
  },
  {
    id: 'extra-baggage',
    title: 'Extra baggage',
    detail: 'From $60 per 23 kg bag',
    icon: 'isax-bag-2',
    iconClass: 'bg-info-transparent text-info',
    actionLabel: 'Add bag',
    link: all_routes.flightSeatSelection,
  },
  {
    id: 'travel-insurance',
    title: 'Travel insurance',
    detail: '$42 for both travellers',
    icon: 'isax-shield-tick',
    iconClass: 'bg-success-transparent text-success',
    actionLabel: 'Add cover',
    link: all_routes.payment,
  },
];

const refundLines: RefundLine[] = [
  { id: 'fare-paid', label: 'Fare paid (2 travellers)', amount: '$1,248.00', isDeduction: false },
  { id: 'seat-selection', label: 'Seat selection', amount: '$48.00', isDeduction: false },
  { id: 'cancellation-fee', label: 'Cancellation fee', amount: '− $170.00', isDeduction: true },
  { id: 'seat-fees', label: 'Seat fees (non-refundable)', amount: '− $48.00', isDeduction: true },
];

const policyWindows: PolicyWindow[] = [
  {
    id: 'over-30-days',
    title: 'More than 30 days before departure',
    detail: '$85 per traveller',
    isNow: false,
  },
  {
    id: '7-to-30-days',
    title: '7 to 30 days before departure',
    badge: 'You are here · 12 days',
    detail: '$85 per traveller, seat fees not refunded',
    isNow: true,
  },
  {
    id: 'under-7-days',
    title: 'Under 7 days or no-show',
    detail: 'Fare forfeited, government taxes refundable on request',
    isNow: false,
  },
];

const bookingSummary: SummaryLine[] = [
  { id: 'reference', label: 'Reference', value: 'DT-FL-48219' },
  { id: 'booked-on', label: 'Booked on', value: '02 Apr 2025' },
  { id: 'travellers', label: 'Travellers', value: '2 adults' },
  { id: 'cabin', label: 'Cabin', value: 'Economy' },
];

const ManageBooking = () => {
  const routes = all_routes;

  const departDate = new Date('2025-05-25');
  const returnDate = new Date('2025-05-28');
  const passportExpiry = new Date('2029-09-14');

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Home',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Account',
      active: false,
    },
    {
      label: 'All Bookings',
      active: false,
    },
    {
      label: 'Manage Booking',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Manage Booking"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <Link
            href={routes.userTripDetails}
            className="fs-14 fw-medium d-inline-flex align-items-center gap-1 mb-4"
          >
            <i className="isax isax-arrow-left4 fw-semibold" />
            Back to Trip Details
          </Link>
          <div className="row">
            <div className="col-lg-8">
              {/* Booking summary */}
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between flex-wrap row-gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="avatar avatar-xl rounded flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/flight/flight-01.jpg"
                          className="rounded"
                          alt="Delhi to Barcelona flight"
                        />
                      </span>
                      <div>
                        <span className="badge bg-primary-transparent text-primary fs-12 mb-1">
                          Flight
                        </span>
                        <h2 className="fs-18 mb-1">Delhi (DEL) to Barcelona (BCN)</h2>
                        <p className="fs-13 text-gray-6 mb-0">
                          Booking reference{' '}
                          <span className="fw-medium text-dark">DT-FL-48219</span> &middot; AI 191
                          &middot; 2 travellers
                        </p>
                      </div>
                    </div>
                    <span className="badge bg-success">Confirmed</span>
                  </div>
                </div>
              </div>
              {/* /Booking summary */}
              {/* What would you like to do */}
              <div className="card">
                <div className="card-header">
                  <h2 className="fs-18 mb-0">What would you like to change?</h2>
                </div>
                <div className="card-body">
                  <div
                    className="accordion custom-accordion accordion-shadow-none"
                    id="manageAccordion"
                  >
                    {/* Change dates */}
                    <div className="accordion-item border-0 mb-3">
                      <div className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#mb-dates"
                          aria-expanded="true"
                        >
                          Change travel dates
                        </button>
                      </div>
                      <div
                        id="mb-dates"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#manageAccordion"
                      >
                        <div className="accordion-body pt-0">
                          <div className="row row-gap-3">
                            <div className="col-md-6">
                              <label className="form-label" htmlFor="mb-depart">
                                New departure date
                              </label>
                              <div className="input-icon-end position-relative">
                                <DatePicker
                                  className="form-control datetimepicker"
                                  id="mb-depart"
                                  placeholder="dd/mm/yyyy"
                                  defaultValue={departDate}
                                  format="DD/MM/YYYY"
                                />
                                <span className="input-icon-addon">
                                  <i className="isax isax-calendar" />
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label" htmlFor="mb-return">
                                New return date
                              </label>
                              <div className="input-icon-end position-relative">
                                <DatePicker
                                  className="form-control datetimepicker"
                                  id="mb-return"
                                  placeholder="dd/mm/yyyy"
                                  defaultValue={returnDate}
                                  format="DD/MM/YYYY"
                                />
                                <span className="input-icon-addon">
                                  <i className="isax isax-calendar" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="alert alert-warning d-flex gap-2 mt-3 mb-3">
                            <i className="isax isax-info-circle flex-shrink-0 mt-1" />
                            <span className="fs-13">
                              A change fee of <strong>$85 per traveller</strong> applies, plus any
                              fare difference. You will see the exact amount before confirming.
                            </span>
                          </div>
                          <button type="button" className="btn btn-primary">
                            Search new dates
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* /Change dates */}
                    {/* Travellers */}
                    <div className="accordion-item border-0 mb-3">
                      <div className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#mb-pax"
                          aria-expanded="false"
                        >
                          Update traveller details
                        </button>
                      </div>
                      <div
                        id="mb-pax"
                        className="accordion-collapse collapse"
                        data-bs-parent="#manageAccordion"
                      >
                        <div className="accordion-body pt-0">
                          <div className="row row-gap-3">
                            <div className="col-md-6">
                              <label className="form-label" htmlFor="mb-email">
                                Contact email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="mb-email"
                                name="mb-email"
                                defaultValue="jeffrey.wilson@example.com"
                                autoComplete="email"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label" htmlFor="mb-phone">
                                Contact phone
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                id="mb-phone"
                                name="mb-phone"
                                defaultValue="+34 600 000 000"
                                autoComplete="tel"
                                inputMode="tel"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label" htmlFor="mb-passport">
                                Passport number &mdash; Jeffrey Wilson
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="mb-passport"
                                name="mb-passport"
                                defaultValue="P4000021"
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label" htmlFor="mb-expiry">
                                Passport expiry
                              </label>
                              <div className="input-icon-end position-relative">
                                <DatePicker
                                  className="form-control datetimepicker"
                                  id="mb-expiry"
                                  placeholder="dd/mm/yyyy"
                                  defaultValue={passportExpiry}
                                  format="DD/MM/YYYY"
                                />
                                <span className="input-icon-addon">
                                  <i className="isax isax-calendar" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="fs-13 text-gray-6 mt-3 mb-3">
                            Names cannot be changed after ticketing. If a name is wrong, a new
                            booking is required.
                          </p>
                          <button type="button" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* /Travellers */}
                    {/* Add services */}
                    <div className="accordion-item border-0 mb-3">
                      <div className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#mb-add"
                          aria-expanded="false"
                        >
                          Add services
                        </button>
                      </div>
                      <div
                        id="mb-add"
                        className="accordion-collapse collapse"
                        data-bs-parent="#manageAccordion"
                      >
                        <div className="accordion-body pt-0">
                          {addServices.map((service, serviceIndex) => (
                            <div
                              key={service.id}
                              className={
                                serviceIndex === addServices.length - 1
                                  ? 'd-flex align-items-center justify-content-between gap-3'
                                  : 'd-flex align-items-center justify-content-between gap-3 pb-3 mb-3 border-bottom'
                              }
                            >
                              <div className="d-flex align-items-center gap-2">
                                <span
                                  className={`avatar avatar-md rounded-circle ${service.iconClass} flex-shrink-0`}
                                >
                                  <i className={`isax ${service.icon}`} />
                                </span>
                                <div>
                                  <p className="fs-14 fw-medium text-dark mb-0">{service.title}</p>
                                  <p className="fs-13 text-gray-6 mb-0">{service.detail}</p>
                                </div>
                              </div>
                              <Link
                                href={service.link}
                                className="btn btn-light btn-sm flex-shrink-0"
                              >
                                {service.actionLabel}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* /Add services */}
                    {/* Cancel */}
                    <div className="accordion-item border-0 mb-0">
                      <div className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#mb-cancel"
                          aria-expanded="false"
                        >
                          Cancel this booking
                        </button>
                      </div>
                      <div
                        id="mb-cancel"
                        className="accordion-collapse collapse"
                        data-bs-parent="#manageAccordion"
                      >
                        <div className="accordion-body pt-0">
                          <h3 className="fs-15 mb-3">What you would get back</h3>
                          <div className="card shadow-none mb-3">
                            <div className="card-body p-3">
                              {refundLines.map((line) => (
                                <div className="fee-row mb-2" key={line.id}>
                                  <span className={line.isDeduction ? 'fs-14 text-danger' : 'fs-14'}>
                                    {line.label}
                                  </span>
                                  <span
                                    className={`fs-14 fw-medium ${
                                      line.isDeduction ? 'text-danger' : 'text-dark'
                                    }`}
                                  >
                                    {line.amount}
                                  </span>
                                </div>
                              ))}
                              <div className="fee-row border-top pt-3 mt-3">
                                <span className="fs-16 fw-semibold text-dark">
                                  Refund to your card
                                </span>
                                <span className="fs-20 fw-semibold text-primary">$1,078.00</span>
                              </div>
                            </div>
                          </div>
                          <h3 className="fs-15 mb-3">How the fee is calculated</h3>
                          {policyWindows.map((policy, policyIndex) => (
                            <div
                              key={policy.id}
                              className={`policy-window${policy.isNow ? ' is-now' : ''} ${
                                policyIndex === policyWindows.length - 1 ? 'mb-4' : 'mb-3'
                              }`}
                            >
                              <p className="fs-14 fw-medium text-dark mb-0">
                                {policy.title}
                                {policy.badge && (
                                  <>
                                    {' '}
                                    <span className="badge bg-primary-transparent text-primary fs-12 ms-1">
                                      {policy.badge}
                                    </span>
                                  </>
                                )}
                              </p>
                              <p className="fs-13 text-gray-6 mb-0">{policy.detail}</p>
                            </div>
                          ))}
                          <div className="alert alert-danger d-flex gap-2 mb-3">
                            <i className="isax isax-warning-2 flex-shrink-0 mt-1" />
                            <span className="fs-13">
                              Cancelling removes both travellers from this flight. It cannot be
                              undone.
                            </span>
                          </div>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#cancel_booking"
                          >
                            Cancel booking
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* /Cancel */}
                  </div>
                </div>
              </div>
              {/* /What would you like to do */}
            </div>
            <div className="col-lg-4 theiaStickySidebar">
              <div className="card">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Booking summary</h3>
                </div>
                <div className="card-body">
                  {bookingSummary.map((line) => (
                    <div className="fee-row mb-2" key={line.id}>
                      <span className="fs-14">{line.label}</span>
                      <span className="fs-14 fw-medium text-dark">{line.value}</span>
                    </div>
                  ))}
                  <div className="fee-row border-top pt-3 mt-3">
                    <span className="fs-16 fw-semibold text-dark">Paid</span>
                    <span className="fs-18 fw-semibold text-dark">$1,296.00</span>
                  </div>
                </div>
              </div>
              <div className="card mb-0">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Need a hand?</h3>
                </div>
                <div className="card-body">
                  <p className="fs-13 text-gray-6 mb-3">Our team answers within 2 hours, 24/7.</p>
                  <Link href={routes.userChat} className="btn btn-primary w-100 mb-2">
                    <i className="isax isax-messages-2 me-1" />
                    Start a chat
                  </Link>
                  <Link href={routes.contactUs} className="btn btn-light w-100">
                    Contact support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

      {/* Cancel Booking Modal */}
      <div className="modal fade" id="cancel_booking" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Cancel this booking?</h4>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn-close"
              />
            </div>
            <div className="modal-body">
              <p className="fs-14 mb-2">
                Booking <strong>DT-FL-48219</strong> will be cancelled for both travellers.
              </p>
              <p className="fs-14 mb-0">
                You will be refunded <strong>$1,078.00</strong> to the original card within
                7&ndash;14 business days.
              </p>
            </div>
            <div className="modal-footer">
              <div className="d-flex align-items-center justify-content-end m-0">
                <Link href="#" className="btn btn-sm btn-light me-2" data-bs-dismiss="modal">
                  No, Don&rsquo;t Cancel
                </Link>
                <Link href={routes.userAllBookings} className="btn btn-sm btn-danger">
                  Yes, Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Cancel Booking Modal */}
    </div>
  );
};

export default ManageBooking;
