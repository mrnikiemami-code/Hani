"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BookingForm from '../../../components/booking/bookingForm';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'

const mealOptions = ['Standard hot meal', 'Vegetarian', 'Jain', 'Gluten free'];
const baggageOptions = [
    '25 kg per traveller · included',
    '25 kg + 1 extra bag · $60',
    '25 kg + 2 extra bags · $120',
];
const assistanceOptions = [
    'None',
    'Wheelchair to the aircraft door',
    'Wheelchair to the seat',
    'Visual or hearing assistance',
];
const nationalityOptions = ['India', 'United Kingdom', 'United States', 'Spain'];

const FlightBooking = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Flight Booking',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Flight Booking',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb
                title="Flight Booking"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-05"
            />
            {/* Page Wrapper */}
            <div className="content content-two">
                <div className="container">
                    {/* Cart */}
                    <div className="row">
                        <div className="col-lg-8">
                            <BookingForm afterCheckout={<>
                            {/* Cabin & Seats */}
                            <div className="card">
                                <div className="card-header">
                                    <h5>Cabin &amp; Seats</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between gap-3 bg-light-200 rounded p-3 mb-4">
                                        <div>
                                            <p className="fs-14 fw-medium text-dark mb-0">
                                                Economy &middot; Seats 1B and 1E
                                            </p>
                                            <p className="fs-13 text-gray-6 mb-0">
                                                Extra legroom &middot; held for both legs, DEL&ndash;DXB and
                                                DXB&ndash;BCN
                                            </p>
                                        </div>
                                        <Link
                                            href={routes.flightSeatSelection}
                                            className="btn btn-light btn-sm flex-shrink-0"
                                        >
                                            Change
                                        </Link>
                                    </div>
                                    <div className="row row-gap-3">
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-meal1">
                                                Meal &mdash; Adult 1
                                            </label>
                                            <select
                                                className="form-control"
                                                id="fb-meal1"
                                                name="fb-meal1"
                                                defaultValue="Standard hot meal"
                                            >
                                                {mealOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-meal2">
                                                Meal &mdash; Adult 2
                                            </label>
                                            <select
                                                className="form-control"
                                                id="fb-meal2"
                                                name="fb-meal2"
                                                defaultValue="Vegetarian"
                                            >
                                                {mealOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-bag">
                                                Checked baggage
                                            </label>
                                            <select
                                                className="form-control"
                                                id="fb-bag"
                                                name="fb-bag"
                                                defaultValue={baggageOptions[1]}
                                            >
                                                {baggageOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-assist">
                                                Special assistance
                                            </label>
                                            <select
                                                className="form-control"
                                                id="fb-assist"
                                                name="fb-assist"
                                                defaultValue="None"
                                            >
                                                {assistanceOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Passenger documents */}
                            <div className="card">
                                <div className="card-header">
                                    <h5>Passenger Documents</h5>
                                    <p className="fs-13 text-gray-6 mb-0">
                                        Names must match the passport exactly. They cannot be changed after
                                        ticketing.
                                    </p>
                                </div>
                                <div className="card-body">
                                    <div className="row row-gap-3">
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-pass1">
                                                Passport number &mdash; Adult 1
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fb-pass1"
                                                name="fb-pass1"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-exp1">
                                                Passport expiry &mdash; Adult 1
                                            </label>
                                            <div className="input-icon-end position-relative">
                                                <DatePicker
                                                    className="form-control datetimepicker"
                                                    id="fb-exp1"
                                                    placeholder="dd/mm/yyyy"
                                                    format="DD-MM-YYYY"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="isax isax-calendar" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-pass2">
                                                Passport number &mdash; Adult 2
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fb-pass2"
                                                name="fb-pass2"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-exp2">
                                                Passport expiry &mdash; Adult 2
                                            </label>
                                            <div className="input-icon-end position-relative">
                                                <DatePicker
                                                    className="form-control datetimepicker"
                                                    id="fb-exp2"
                                                    placeholder="dd/mm/yyyy"
                                                    format="DD-MM-YYYY"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="isax isax-calendar" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-nat">
                                                Nationality
                                            </label>
                                            <select
                                                className="form-control"
                                                id="fb-nat"
                                                name="fb-nat"
                                                autoComplete="country-name"
                                                defaultValue="India"
                                            >
                                                {nationalityOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="fb-ffn">
                                                Frequent flyer number <span className="text-gray-6 fw-normal">Optional</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fb-ffn"
                                                name="fb-ffn"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="alert alert-warning d-flex gap-2 mt-3 mb-0">
                                        <i className="isax isax-info-circle flex-shrink-0 mt-1" />
                                        <span className="fs-13">
                                            Passports must be valid for at least six months beyond 25 May 2025, and
                                            you need any visa required for Spain and for the Dubai transit.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Fare rules */}
                            <div className="card">
                                <div className="card-header">
                                    <h5>Fare Rules</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-start gap-2 mb-2">
                                        <i className="isax isax-tick-square5 text-success flex-shrink-0 mt-1" />
                                        <span className="fs-14">
                                            Free cancellation within 24 hours of booking, as departure is more than 7
                                            days away.
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 mb-2">
                                        <i className="isax isax-tick-square5 text-success flex-shrink-0 mt-1" />
                                        <span className="fs-14">
                                            Date changes permitted up to 4 hours before departure: $85 per traveller
                                            plus any fare difference.
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 mb-2">
                                        <i className="isax isax-close-square5 text-danger flex-shrink-0 mt-1" />
                                        <span className="fs-14">
                                            This Economy fare is non-refundable after the 24 hour window. Government
                                            taxes stay refundable on request.
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 mb-0">
                                        <i className="isax isax-close-square5 text-danger flex-shrink-0 mt-1" />
                                        <span className="fs-14">
                                            Seat fees are not refunded if the booking is cancelled.
                                        </span>
                                    </div>
                                    <div className="form-check mt-3 mb-0">
                                        <input className="form-check-input" type="checkbox" id="fb-agree" />
                                        <label className="form-check-label fs-14" htmlFor="fb-agree">
                                            I have read and accept the fare rules and baggage conditions
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </>} />
                        </div>
                        {/* Review Order Details */}
                        <div className="col-lg-4 ">
                            <div className="card order-details theiaStickySidebar">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between header-content">
                                        <h5>Review Order Details</h5>
                                        <Link
                                            href={routes.flightDetails}
                                            className="rounded-circle p-2 btn btn-light d-flex align-items-center justify-content-center"
                                        >
                                            <span className="fs-16 d-flex align-items-center justify-content-center">
                                                <i className="isax isax-edit-2" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="pb-3 border-bottom">
                                        <div className="mb-3 review-img">
                                            <ImageWithBasePath
                                                src="assets/img/flight/flight-large-01.jpg"
                                                alt="Img"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h6 className="mb-2">
                                                    Air India AI 191 &middot; Boeing 787-9 &middot; Economy
                                                </h6>
                                                <p className="fs-14 ">
                                                    <span className="badge badge-warning text-gray-9 fs-13 fw-medium me-2">
                                                        5.0
                                                    </span>
                                                    (400 Reviews)
                                                </p>
                                            </div>
                                            <h6 className="fs-14 fw-normal text-gray-9">
                                                $624 <span className="fs-13 text-gray-6">pp</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="mt-3 pb-3 border-bottom">
                                        <h6 className="text-primary mb-3">Order Info</h6>
                                        <div className="d-flex align-items-center details-info">
                                            <h6 className="fs-16">Departure</h6>
                                            <p className="fs-16">25 May 2025, 04:45 &middot; DEL T3</p>
                                        </div>
                                        <div className="d-flex align-items-center details-info">
                                            <h6 className="fs-16">Arrival</h6>
                                            <p className="fs-16">25 May 2025, 14:30 &middot; BCN T1</p>
                                        </div>
                                        <div className="d-flex align-items-center  details-info">
                                            <h6 className="fs-16">Total duration</h6>
                                            <p className="fs-16">13h 45m &middot; 1 stop, Dubai 2h 10m</p>
                                        </div>
                                        <div className="d-flex align-items-center  details-info">
                                            <h6 className="fs-16">Adults</h6>
                                            <p className="fs-16">2</p>
                                        </div>
                                        <div className="d-flex align-items-center  details-info">
                                            <h6 className="fs-16">Cabin</h6>
                                            <p className="fs-16">Economy</p>
                                        </div>
                                        <div className="d-flex align-items-center details-info">
                                            <h6 className="fs-16">Seats</h6>
                                            <p className="fs-16">1B, 1E</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 border-bottom">
                                        <h6 className="text-primary mb-3">Payment Info</h6>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h6 className="fs-16">
                                                Base fare <span className="text-gray-6"> (2 &times; $624)</span>
                                            </h6>
                                            <p className="fs-16">$1,248</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h6 className="fs-16">Taxes &amp; carrier charges</h6>
                                            <p className="fs-16">$186</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h6 className="fs-16">
                                                Seats <span className="text-gray-6"> (2 &times; $24)</span>
                                            </h6>
                                            <p className="fs-16">$48</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h6 className="fs-16">Extra checked bag</h6>
                                            <p className="fs-16">$60</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h6 className="fs-16">Priority boarding</h6>
                                            <p className="fs-16">$18</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h6 className="fs-16">
                                                Discount <span className="text-gray-6"> (Dreams25)</span>
                                            </h6>
                                            <p className="fs-16 text-success">-$50</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h6>Amount to Pay</h6>
                                            <h6 className="text-primary">$1,510</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Review Order Details */}
                    </div>
                    {/* / Cart */}
                </div>
            </div>
            {/* /Page Wrapper */}



        </div>
    )
}

export default FlightBooking
