"use client";
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';

interface ItineraryEvent {
  id: string;
  time: string;
  title: string;
  detail: string;
}

interface ItineraryDay {
  id: string;
  step: string;
  title: string;
  date: string;
  icon: string;
  iconClass: string;
  events: ItineraryEvent[];
}

interface TravelDocument {
  id: string;
  title: string;
  meta: string;
  icon: string;
  iconClass: string;
}

interface WeatherDay {
  id: string;
  day: string;
  icon: string;
  iconClass: string;
  temperature: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  note?: string;
  checked: boolean;
}

const itineraryDays: ItineraryDay[] = [
  {
    id: 'day-01',
    step: '01',
    title: 'Flight to Barcelona',
    date: 'Sun 25 May',
    icon: 'isax-airplane',
    iconClass: 'bg-primary-transparent text-primary',
    events: [
      {
        id: 'day-01-depart-del',
        time: '04:45',
        title: 'Depart Delhi (DEL) Terminal 3',
        detail: 'AI 191 · Boeing 787-9 · Seats 1B, 1E',
      },
      {
        id: 'day-01-arrive-dxb',
        time: '07:05',
        title: 'Arrive Dubai (DXB) Terminal 1',
        detail: 'Layover 2h 10m · gate change, no terminal change',
      },
      {
        id: 'day-01-depart-dxb',
        time: '09:15',
        title: 'Depart Dubai (DXB)',
        detail: 'AI 193 · Boeing 787-9',
      },
      {
        id: 'day-01-arrive-bcn',
        time: '14:30',
        title: 'Arrive Barcelona (BCN) Terminal 1',
        detail: 'Baggage belt 6 · 25 kg checked per traveller',
      },
      {
        id: 'day-01-hotel-checkin',
        time: '16:00',
        title: 'Check in at Hotel Miravent Barcelona',
        detail: 'Ciutat Vella · 1 room, 2 guests',
      },
    ],
  },
  {
    id: 'day-02',
    step: '02',
    title: 'Barcelona at your own pace',
    date: 'Mon 26 May',
    icon: 'isax-map',
    iconClass: 'bg-info-transparent text-info',
    events: [
      {
        id: 'day-02-breakfast',
        time: '09:00',
        title: 'Breakfast at the hotel',
        detail: 'Included in your rate',
      },
      {
        id: 'day-02-free-day',
        time: 'All day',
        title: 'No bookings scheduled',
        detail: 'A free day. Browse things to do nearby.',
      },
    ],
  },
  {
    id: 'day-03',
    step: '03',
    title: 'Car pick-up and coast drive',
    date: 'Tue 27 May',
    icon: 'isax-car',
    iconClass: 'bg-purple-transparent text-purple',
    events: [
      {
        id: 'day-03-collect-car',
        time: '09:30',
        title: 'Collect Audi A3 2019',
        detail: 'Barcelona El Prat Airport · automatic, diesel',
      },
      {
        id: 'day-03-licence',
        time: '10:00',
        title: 'Driving licence and card required',
        detail: 'The card holder must be the named driver',
      },
    ],
  },
  {
    id: 'day-04',
    step: '04',
    title: 'Check out and return home',
    date: 'Wed 28 May',
    icon: 'isax-buildings-2',
    iconClass: 'bg-teal-transparent text-teal',
    events: [
      {
        id: 'day-04-checkout',
        time: '11:00',
        title: 'Hotel check-out',
        detail: 'Late check-out available on request',
      },
      {
        id: 'day-04-return-flight',
        time: '18:30',
        title: 'Return flight departs BCN',
        detail: 'Online check-in opens 48 hours before',
      },
    ],
  },
];

const travelDocuments: TravelDocument[] = [
  {
    id: 'doc-eticket',
    title: 'E-ticket — AI 191 / AI 193',
    meta: 'PDF · 148 KB',
    icon: 'isax-airplane',
    iconClass: 'bg-primary-transparent text-primary',
  },
  {
    id: 'doc-hotel-voucher',
    title: 'Hotel voucher — Hotel Miravent Barcelona',
    meta: 'PDF · 96 KB',
    icon: 'isax-buildings-2',
    iconClass: 'bg-info-transparent text-info',
  },
  {
    id: 'doc-car-rental',
    title: 'Car rental agreement',
    meta: 'PDF · 210 KB',
    icon: 'isax-car',
    iconClass: 'bg-purple-transparent text-purple',
  },
  {
    id: 'doc-insurance',
    title: 'Travel insurance certificate',
    meta: 'PDF · 74 KB',
    icon: 'isax-shield-tick',
    iconClass: 'bg-success-transparent text-success',
  },
];

const weatherDays: WeatherDay[] = [
  { id: 'weather-sun', day: 'Sun', icon: 'isax-sun-15', iconClass: 'text-warning', temperature: '24°' },
  { id: 'weather-mon', day: 'Mon', icon: 'isax-sun-15', iconClass: 'text-warning', temperature: '26°' },
  { id: 'weather-tue', day: 'Tue', icon: 'isax-cloud', iconClass: 'text-gray-5', temperature: '22°' },
  { id: 'weather-wed', day: 'Wed', icon: 'isax-sun-15', iconClass: 'text-warning', temperature: '25°' },
];

const checklistItems: ChecklistItem[] = [
  { id: 'chk-passport', label: 'Passport valid past 28 Nov 2025', checked: true },
  { id: 'chk-visa', label: 'Schengen visa approved', checked: true },
  { id: 'chk-checkin', label: 'Online check-in', note: 'opens 23 May', checked: false },
  { id: 'chk-licence', label: 'Driving licence for the car hire', checked: false },
];

const UserTripDetails = () => {
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
      active: false,
    },
    {
      label: 'Trip Details',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Trip Details"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <Link
            href={routes.userAllBookings}
            className="fs-14 fw-medium d-inline-flex align-items-center gap-1 mb-4"
          >
            <i className="isax isax-arrow-left4 fw-semibold" />
            Back to All Bookings
          </Link>
          {/* Trip hero */}
          <div className="trip-hero mb-4">
            <ImageWithBasePath
              src="assets/img/destination/destination-01.jpg"
              alt="Barcelona skyline"
            />
            <div className="trip-hero-overlay">
              <span className="badge bg-success mb-2">Confirmed</span>
              <h2 className="fs-24 text-white mb-1">Barcelona, 25 &ndash; 28 May 2025</h2>
              <p className="fs-14 text-white mb-0">
                Trip reference DT-TRIP-4821 &middot; 4 days &middot; 2 travellers &middot; 4 bookings
              </p>
            </div>
          </div>
          {/* /Trip hero */}
          <div className="row">
            <div className="col-lg-8">
              {/* Itinerary */}
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <h2 className="fs-18 mb-0">Day by day</h2>
                  <Link href="#" className="btn btn-light btn-sm">
                    <i className="isax isax-calendar-add me-1" />
                    Add to calendar
                  </Link>
                </div>
                <div className="card-body">
                  <div className="stage-flow">
                    {itineraryDays.map((day) => (
                      <div className="d-flex align-items-center flows-step" key={day.id}>
                        <span className="flow-step">{day.step}</span>
                        <div className="flow-content">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className={`avatar avatar-sm rounded-circle ${day.iconClass} flex-shrink-0`}>
                              <i className={`isax ${day.icon} fs-14`} />
                            </span>
                            <div>
                              <h3 className="fs-16 mb-0">{day.title}</h3>
                              <p className="fs-13 text-gray-6 mb-0">{day.date}</p>
                            </div>
                          </div>
                          <div className="card shadow-none mb-0">
                            <div className="card-body p-3">
                              {day.events.map((event, eventIndex) => (
                                <div
                                  key={event.id}
                                  className={
                                    eventIndex === 0
                                      ? 'd-flex gap-3'
                                      : 'd-flex gap-3 border-top pt-3 mt-3'
                                  }
                                >
                                  <span
                                    className="fs-13 fw-medium text-dark flex-shrink-0"
                                    style={{ minWidth: '64px' }}
                                  >
                                    {event.time}
                                  </span>
                                  <div>
                                    <p className="fs-14 fw-medium text-dark mb-0">{event.title}</p>
                                    <p className="fs-13 text-gray-6 mb-0">{event.detail}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* /Itinerary */}
              {/* Travellers */}
              <div className="card">
                <div className="card-header">
                  <h2 className="fs-18 mb-0">Travellers</h2>
                </div>
                <div className="card-body">
                  <div className="row row-gap-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-2">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            className="rounded-circle"
                            alt="Jeffrey Wilson"
                          />
                        </span>
                        <div>
                          <p className="fs-14 fw-medium text-dark mb-0">Jeffrey Wilson</p>
                          <p className="fs-13 text-gray-6 mb-0">
                            Lead traveller &middot; Passport P4••••21
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-2">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0">
                          <ImageWithBasePath
                            src="assets/img/users/user-04.jpg"
                            className="rounded-circle"
                            alt="Rita Wilson"
                          />
                        </span>
                        <div>
                          <p className="fs-14 fw-medium text-dark mb-0">Rita Wilson</p>
                          <p className="fs-13 text-gray-6 mb-0">Adult &middot; Passport P7••••08</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Travellers */}
              {/* Documents */}
              <div className="card mb-0">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <h2 className="fs-18 mb-0">Travel documents</h2>
                  <Link href="#" className="btn btn-light btn-sm">
                    <i className="isax isax-document-download me-1" />
                    Download all
                  </Link>
                </div>
                <div className="card-body">
                  {travelDocuments.map((document, documentIndex) => (
                    <div
                      key={document.id}
                      className={
                        documentIndex === 0
                          ? 'd-flex align-items-center justify-content-between gap-3'
                          : 'd-flex align-items-center justify-content-between gap-3 border-top pt-3 mt-3'
                      }
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span className={`avatar avatar-md rounded-circle ${document.iconClass} flex-shrink-0`}>
                          <i className={`isax ${document.icon}`} />
                        </span>
                        <div>
                          <p className="fs-14 fw-medium text-dark mb-0">{document.title}</p>
                          <p className="fs-13 text-gray-6 mb-0">{document.meta}</p>
                        </div>
                      </div>
                      <Link href="#" className="btn btn-light btn-sm flex-shrink-0">
                        <i className="isax isax-import-2 me-1" />
                        Download
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* /Documents */}
            </div>
            <div className="col-lg-4 theiaStickySidebar">
              {/* Actions */}
              <div className="card">
                <div className="card-body d-flex align-items-center gap-2 flex-wrap d-lg-block">
                  <Link href={routes.manageBooking} className="btn btn-primary w-100 mb-2">
                    Manage this trip
                  </Link>
                  <Link href="#" className="btn btn-light w-100 mb-2">
                    <i className="isax isax-share me-1" />
                    Share trip
                  </Link>
                  <Link href={routes.invoices} className="btn btn-light w-100">
                    View invoices
                  </Link>
                </div>
              </div>
              {/* /Actions */}
              {/* Weather */}
              <div className="card">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Barcelona this week</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between text-center">
                    {weatherDays.map((weather) => (
                      <div key={weather.id}>
                        <p className="fs-13 text-gray-6 mb-1">{weather.day}</p>
                        <i className={`isax ${weather.icon} fs-20 ${weather.iconClass}`} />
                        <p className="fs-13 fw-medium text-dark mb-0">{weather.temperature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* /Weather */}
              {/* Checklist */}
              <div className="card mb-0">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Before you go</h3>
                </div>
                <div className="card-body">
                  {checklistItems.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={`form-check checklist-item ${
                        itemIndex === checklistItems.length - 1 ? 'mb-0' : 'mb-3'
                      }`}
                    >
                      <input
                        className="form-check-input mt-1"
                        type="checkbox"
                        id={item.id}
                        defaultChecked={item.checked}
                      />
                      <label className="form-check-label fs-14" htmlFor={item.id}>
                        {item.label}
                        {item.note && (
                          <>
                            {' '}
                            <span className="text-gray-6">{item.note}</span>
                          </>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* /Checklist */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </div>
  );
};

export default UserTripDetails;
