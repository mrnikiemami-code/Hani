"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../../components/common-sidebar/sidebar';
import Link from "next/link";
import ImageWithBasePath from '../../../../components/image-with-base-path';

interface TripSummary {
  id: string;
  label: string;
  value: string;
}

interface TripAction {
  id: string;
  label: string;
  link: string;
  className: string;
}

type TripTab = 'upcoming' | 'past' | 'cancelled';

interface TripBooking {
  id: string;
  tab: TripTab;
  image: string;
  countdown?: string;
  icon: string;
  iconClass: string;
  module: string;
  reference: string;
  title: string;
  location: string;
  schedule: string;
  status: string;
  statusClass: string;
  actions: TripAction[];
}

interface ModuleOption {
  value: string;
  label: string;
}

const tripSummary: TripSummary[] = [
  { id: 'summary-upcoming', label: 'Upcoming', value: '4' },
  { id: 'summary-completed', label: 'Completed', value: '18' },
  { id: 'summary-countries', label: 'Countries', value: '11' },
  { id: 'summary-spent', label: 'Spent 2025', value: '$5,965' },
];

const moduleOptions: ModuleOption[] = [
  { value: '', label: 'All modules' },
  { value: 'flight', label: 'Flights' },
  { value: 'hotel', label: 'Hotels' },
  { value: 'tour', label: 'Tours' },
  { value: 'car', label: 'Cars' },
  { value: 'cruise', label: 'Cruises' },
  { value: 'bus', label: 'Buses' },
  { value: 'activity', label: 'Activities' },
  { value: 'guide', label: 'Guides' },
  { value: 'visa', label: 'Visa' },
];

const tripBookings: TripBooking[] = [
  {
    id: 'DT-FL-48219',
    tab: 'upcoming',
    image: 'assets/img/flight/flight-01.jpg',
    countdown: 'Departs in 12 days',
    icon: 'isax-airplane',
    iconClass: 'bg-primary-transparent text-primary',
    module: 'Flight',
    reference: 'DT-FL-48219',
    title: 'Delhi to Barcelona',
    location: 'DEL Terminal 3 to BCN Terminal 1',
    schedule: '25 May 2025, 04:45 · 2 travellers · Economy',
    status: 'Confirmed',
    statusClass: 'bg-success',
    actions: [
      { id: 'view', label: 'View trip', link: all_routes.userTripDetails, className: 'btn-primary' },
      { id: 'manage', label: 'Manage', link: all_routes.manageBooking, className: 'btn-light' },
    ],
  },
  {
    id: 'DT-HT-31904',
    tab: 'upcoming',
    image: 'assets/img/hotels/hotel-01.jpg',
    icon: 'isax-buildings-2',
    iconClass: 'bg-info-transparent text-info',
    module: 'Hotel',
    reference: 'DT-HT-31904',
    title: 'Hotel Miravent Barcelona',
    location: 'Ciutat Vella, Barcelona',
    schedule: '25 May – 28 May 2025 · 1 room · 2 guests',
    status: 'Confirmed',
    statusClass: 'bg-success',
    actions: [
      { id: 'view', label: 'View trip', link: all_routes.userTripDetails, className: 'btn-primary' },
      { id: 'manage', label: 'Manage', link: all_routes.manageBooking, className: 'btn-light' },
    ],
  },
  {
    id: 'DT-AC-77260',
    tab: 'upcoming',
    image: 'assets/img/activities/activity-01.jpg',
    icon: 'isax-tree',
    iconClass: 'bg-success-transparent text-success',
    module: 'Activity',
    reference: 'DT-AC-77260',
    title: 'Tropical Reef Snorkeling Adventure',
    location: 'Patong Beach, Phuket',
    schedule: '02 Jun 2025, 09:00 · 2 adults · free cancellation',
    status: 'Confirmed',
    statusClass: 'bg-success',
    actions: [
      { id: 'view', label: 'View trip', link: all_routes.userTripDetails, className: 'btn-primary' },
      { id: 'manage', label: 'Manage', link: all_routes.manageBooking, className: 'btn-light' },
    ],
  },
  {
    id: 'DT-VS-10553',
    tab: 'upcoming',
    image: 'assets/img/visa/visa-01.jpg',
    icon: 'isax-document-text',
    iconClass: 'bg-dark-transparent text-dark',
    module: 'Visa',
    reference: 'DT-VS-10553',
    title: 'Spain Schengen Tourist Visa',
    location: 'Spain · Short stay, 90 days',
    schedule: 'Submitted 02 May 2025 · Decision expected 16 May',
    status: 'In review',
    statusClass: 'bg-warning text-gray-9',
    actions: [
      { id: 'track', label: 'Track application', link: all_routes.trackVisa, className: 'btn-primary' },
    ],
  },
  {
    id: 'DT-TR-22841',
    tab: 'past',
    image: 'assets/img/tours/tours-01.jpg',
    icon: 'isax-map',
    iconClass: 'bg-secondary-transparent text-secondary',
    module: 'Tour',
    reference: 'DT-TR-22841',
    title: 'Rainbow Mountain Valley',
    location: 'Cusco, Peru',
    schedule: '12 Mar – 15 Mar 2025 · 2 travellers · 4 days',
    status: 'Completed',
    statusClass: 'bg-light text-gray-9',
    actions: [
      { id: 'review', label: 'Write a review', link: all_routes.userReviews, className: 'btn-primary' },
      { id: 'book-again', label: 'Book again', link: all_routes.tourDetails, className: 'btn-light' },
    ],
  },
  {
    id: 'DT-CR-90117',
    tab: 'past',
    image: 'assets/img/cars/car-01.jpg',
    icon: 'isax-car',
    iconClass: 'bg-purple-transparent text-purple',
    module: 'Car',
    reference: 'DT-CR-90117',
    title: 'Audi A3 2019',
    location: 'Barcelona El Prat Airport',
    schedule: '12 Mar – 15 Mar 2025 · 3 days · automatic',
    status: 'Completed',
    statusClass: 'bg-light text-gray-9',
    actions: [
      { id: 'invoice', label: 'Download invoice', link: all_routes.invoices, className: 'btn-primary' },
      { id: 'book-again', label: 'Book again', link: all_routes.carDetails, className: 'btn-light' },
    ],
  },
  {
    id: 'DT-BS-55402',
    tab: 'cancelled',
    image: 'assets/img/bus/bus-img-01.jpg',
    icon: 'isax-bus',
    iconClass: 'bg-warning-transparent text-warning',
    module: 'Bus',
    reference: 'DT-BS-55402',
    title: 'Barcelona to Valencia Express',
    location: 'Barcelona Nord Bus Station',
    schedule: '08 Feb 2025, 07:30 · Cancelled 05 Feb · refunded',
    status: 'Refunded',
    statusClass: 'bg-danger-transparent text-danger',
    actions: [
      { id: 'refund', label: 'View refund', link: all_routes.invoices, className: 'btn-light' },
    ],
  },
];

const UserAllBookings = () => {
  const routes = all_routes;

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
      active: true,
    },
  ];

  const renderTripCard = (trip: TripBooking) => (
    <div className="card trip-card" key={trip.id}>
      <div className="card-body">
        <div className="row align-items-center row-gap-3">
          <div className="col-lg-2 col-md-3">
            <div className="trip-thumb">
              <ImageWithBasePath
                src={trip.image}
                className="img-fluid rounded"
                alt={trip.title}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-9">
            {trip.countdown && (
              <span className="badge bg-primary-transparent text-primary fs-12 mb-2">
                <i className="isax isax-timer-1 me-1" />
                {trip.countdown}
              </span>
            )}
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className={`avatar avatar-xs rounded-circle ${trip.iconClass} flex-shrink-0`}>
                <i className={`isax ${trip.icon} fs-12`} />
              </span>
              <span className="fs-13 text-gray-6">
                {trip.module} &middot; {trip.reference}
              </span>
            </div>
            <h3 className="fs-16 mb-1">
              <Link href={routes.userTripDetails}>{trip.title}</Link>
            </h3>
            <p className="fs-13 text-gray-6 mb-1">
              <i className="isax isax-location5 me-1" />
              {trip.location}
            </p>
            <p className="fs-13 text-gray-6 mb-0">
              <i className="isax isax-calendar-1 me-1" />
              {trip.schedule}
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <span className={`badge ${trip.statusClass} mb-3`}>{trip.status}</span>
            <div className="d-flex align-items-center gap-2 justify-content-lg-end flex-wrap">
              {trip.actions.map((action) => (
                <Link
                  key={action.id}
                  href={action.link}
                  className={`btn ${action.className} btn-sm`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const upcomingTrips = tripBookings.filter((trip) => trip.tab === 'upcoming');
  const pastTrips = tripBookings.filter((trip) => trip.tab === 'past');
  const cancelledTrips = tripBookings.filter((trip) => trip.tab === 'cancelled');

  return (
    <div>
      <Breadcrumb
        title="All Bookings"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            {/* Trips */}
            <div className="col-xl-9 col-lg-8 theiaStickySidebar">
              {/* Summary */}
              <div className="row row-gap-3 mb-4">
                {tripSummary.map((summary) => (
                  <div className="col-sm-3 col-6" key={summary.id}>
                    <div className="trip-summary-tile">
                      <p className="fs-13 text-gray-6 mb-1">{summary.label}</p>
                      <h3 className="fs-24 mb-0">{summary.value}</h3>
                    </div>
                  </div>
                ))}
              </div>
              {/* /Summary */}
              {/* Controls */}
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
                <ul className="nav nav-pills gap-2" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      data-bs-toggle="pill"
                      data-bs-target="#trips-upcoming"
                      type="button"
                      role="tab"
                      aria-selected="true"
                    >
                      Upcoming <span className="badge bg-white text-dark ms-1">4</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#trips-past"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Past <span className="badge bg-light text-dark ms-1">18</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#trips-cancelled"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Cancelled <span className="badge bg-light text-dark ms-1">1</span>
                    </button>
                  </li>
                </ul>
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0 fs-13 text-gray-6" htmlFor="trip-module">
                    Module
                  </label>
                  <select
                    className="form-control form-control-sm w-auto"
                    id="trip-module"
                    name="trip-module"
                    defaultValue=""
                  >
                    {moduleOptions.map((option) => (
                      <option key={option.value || 'all'} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* /Controls */}
              <div className="tab-content">
                <div className="tab-pane fade show active" id="trips-upcoming" role="tabpanel">
                  {upcomingTrips.map((trip) => renderTripCard(trip))}
                </div>
                <div className="tab-pane fade" id="trips-past" role="tabpanel">
                  {pastTrips.map((trip) => renderTripCard(trip))}
                </div>
                <div className="tab-pane fade" id="trips-cancelled" role="tabpanel">
                  {cancelledTrips.map((trip) => renderTripCard(trip))}
                </div>
              </div>
              {/* Empty state (shown when a filter returns nothing) */}
              <div className="card mb-0 d-none" id="tripsEmpty">
                <div className="card-body text-center trip-empty">
                  <span className="avatar avatar-xxl rounded-circle bg-light text-gray-5 mx-auto mb-3">
                    <i className="isax isax-routing fs-32" />
                  </span>
                  <h3 className="fs-18 mb-2">No trips match this filter</h3>
                  <p className="fs-14 text-gray-6 mb-3">
                    Try a different module, or start planning something new.
                  </p>
                  <Link href={routes.allService1} className="btn btn-primary">
                    Search for a trip
                  </Link>
                </div>
              </div>
              {/* /Empty state */}
            </div>
            {/* /Trips */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </div>
  );
};

export default UserAllBookings;
