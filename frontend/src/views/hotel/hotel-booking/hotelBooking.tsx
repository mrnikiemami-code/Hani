"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import BookingForm from '../../../components/booking/bookingForm';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';

const bedOptions = ['Two single beds', 'One double bed'];
const arrivalOptions = [
    'Before 15:00 · early check-in on request',
    '15:00 – 18:00',
    '18:00 – 22:00',
    'After 22:00 · late arrival',
];
const floorOptions = ['No preference', 'High floor', 'Low floor', 'Accessible room'];
const occasionOptions = ['Leisure', 'Business', 'Anniversary', 'Honeymoon'];
const countryOptions = ['Spain', 'United Kingdom', 'United States', 'India'];

interface PolicyItem {
    icon: string;
    text: string;
}

const policies: PolicyItem[] = [
    {
        icon: 'isax-tick-square5 text-success',
        text: 'Free cancellation until 23 May, 23:59 local time. After that, one night is charged.',
    },
    {
        icon: 'isax-tick-square5 text-success',
        text: 'Breakfast is included for both guests, served 07:00 to 10:30.',
    },
    {
        icon: 'isax-tick-square5 text-success',
        text: 'Check-in from 15:00, check-out by 11:00. Luggage storage is free on either side.',
    },
    {
        icon: 'isax-info-circle text-primary',
        text: 'A city tax of €3.25 per person per night is collected by the property on arrival, roughly $21 for this stay.',
    },
];

interface OrderInfoItem {
    label: string;
    value: string;
}

const orderInfo: OrderInfoItem[] = [
    { label: 'Check In', value: 'Sun 25 May 2025, from 15:00' },
    { label: 'Check Out', value: 'Wed 28 May 2025, by 11:00' },
    { label: 'Guests', value: '2 adults' },
    { label: 'Nights', value: '3' },
    { label: 'Rooms', value: '1 · Superior Twin' },
    { label: 'Board', value: 'Breakfast included' },
];

interface PaymentInfoItem {
    label: string;
    note?: string;
    value: string;
    valueClass?: string;
}

const paymentInfo: PaymentInfoItem[] = [
    { label: 'Room rate', note: ' (3 × $181)', value: '$543' },
    { label: 'Taxes & service fee', value: '$54' },
    { label: 'Discount', note: ' (Dreams25)', value: '-$50', valueClass: 'text-success' },
];

const HotelBooking = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Home',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Hotel Booking',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb
                title="Hotel Booking"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />
            {/* Page Wrapper */}
            <div className="content content-two">
                <div className="container">
                    <div className="row">
                        {/* Checkout */}
                        <div className="col-lg-8">
                            <BookingForm afterCheckout={<>
                            {/* Room & Stay */}
                            <div className="card">
                                <div className="card-header">
                                    <h5>Room &amp; Stay</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between gap-3 bg-light-200 rounded p-3 mb-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="avatar avatar-lg rounded flex-shrink-0">
                                                <ImageWithBasePath
                                                    src="assets/img/hotels/hotel-02.jpg"
                                                    className="rounded"
                                                    alt="Superior Twin room"
                                                />
                                            </span>
                                            <div>
                                                <p className="fs-14 fw-medium text-dark mb-0">
                                                    Superior Twin &middot; 1 room
                                                </p>
                                                <p className="fs-13 text-gray-6 mb-0">
                                                    28 m&sup2; &middot; breakfast included &middot; free cancellation
                                                    until 23 May
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={routes.hotelRoomSelection}
                                            className="btn btn-light btn-sm flex-shrink-0"
                                        >
                                            Change
                                        </Link>
                                    </div>
                                    <div className="row row-gap-3">
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="hb-bed">
                                                Bed configuration
                                            </label>
                                            <select
                                                className="form-control"
                                                id="hb-bed"
                                                name="hb-bed"
                                                defaultValue="Two single beds"
                                            >
                                                {bedOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                            <p className="fs-13 text-gray-6 mt-1 mb-0">
                                                Subject to availability on arrival.
                                            </p>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="hb-arrival">
                                                Estimated arrival time
                                            </label>
                                            <select
                                                className="form-control"
                                                id="hb-arrival"
                                                name="hb-arrival"
                                                defaultValue={arrivalOptions[1]}
                                            >
                                                {arrivalOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="hb-floor">
                                                Floor preference
                                            </label>
                                            <select
                                                className="form-control"
                                                id="hb-floor"
                                                name="hb-floor"
                                                defaultValue="No preference"
                                            >
                                                {floorOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="hb-occasion">
                                                Travelling for <span className="text-gray-6 fw-normal">Optional</span>
                                            </label>
                                            <select
                                                className="form-control"
                                                id="hb-occasion"
                                                name="hb-occasion"
                                                defaultValue="Leisure"
                                            >
                                                {occasionOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label" htmlFor="hb-notes">
                                                Special requests <span className="text-gray-6 fw-normal">Optional</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="hb-notes"
                                                name="hb-notes"
                                                rows={3}
                                                placeholder="Quiet room, extra pillows, cot for an infant"
                                            />
                                            <p className="fs-13 text-gray-6 mt-1 mb-0">
                                                Requests are passed to the property and are not guaranteed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Who is checking in */}
                            <div className="card">
                                <div className="card-header">
                                    <h5>Who is checking in?</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row row-gap-3">
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="hb-guest1">
                                                Guest 1, lead guest
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="hb-guest1"
                                                name="hb-guest1"
                                                autoComplete="name"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="hb-guest2">
                                                Guest 2
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="hb-guest2"
                                                name="hb-guest2"
                                                autoComplete="name"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="hb-country">
                                                Country of residence
                                            </label>
                                            <select
                                                className="form-control"
                                                id="hb-country"
                                                name="hb-country"
                                                autoComplete="country-name"
                                                defaultValue="Spain"
                                            >
                                                {countryOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-check mt-4 pt-2">
                                                <input className="form-check-input" type="checkbox" id="hb-business" />
                                                <label className="form-check-label fs-14" htmlFor="hb-business">
                                                    I need an invoice for a company
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="alert alert-warning d-flex gap-2 mt-3 mb-0">
                                        <i className="isax isax-info-circle flex-shrink-0 mt-1" />
                                        <span className="fs-13">
                                            Photo ID is required at check-in for every guest. The lead guest must be
                                            18 or over.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Property policies */}
                            <div className="card">
                                <div className="card-header">
                                    <h5>Property Policies</h5>
                                </div>
                                <div className="card-body">
                                    {policies.map((policy, index) => (
                                        <div
                                            key={policy.text}
                                            className={`d-flex align-items-start gap-2 ${index === policies.length - 1 ? 'mb-0' : 'mb-2'}`}
                                        >
                                            <i className={`isax ${policy.icon} flex-shrink-0 mt-1`} />
                                            <span className="fs-14">{policy.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            </>} />
                        </div>
                        {/* /Checkout */}
                        {/* Review Order Details */}
                        <div className="col-lg-4 theiaStickySidebar">
                            <div className="card order-details">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between header-content">
                                        <h5>Review Order Details</h5>
                                        <Link
                                            href={routes.hotelDetails}
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
                                                src="assets/img/hotels/hotel-large-02.jpg"
                                                alt="Img"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h6 className="mb-2">
                                                    Hotel Miravent Barcelona &middot; Superior Twin
                                                </h6>
                                                <p className="fs-14 ">
                                                    <span className="badge badge-warning text-gray-9 fs-13 fw-medium me-2">
                                                        5.0
                                                    </span>
                                                    (400 Reviews)
                                                </p>
                                            </div>
                                            <h6 className="fs-14 fw-normal text-gray-9">
                                                $181 <span className="fs-13 text-gray-6">per night</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="mt-3 border-bottom">
                                        <h6 className="text-primary mb-3">Order Info</h6>
                                        {orderInfo.map((item) => (
                                            <div
                                                key={item.label}
                                                className="d-flex align-items-center justify-content-between mb-3"
                                            >
                                                <h6 className="fs-16">{item.label}</h6>
                                                <p className="fs-16">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 border-bottom">
                                        <h6 className="text-primary mb-3">Payment Info</h6>
                                        {paymentInfo.map((item) => (
                                            <div
                                                key={item.label}
                                                className="d-flex align-items-center justify-content-between mb-3"
                                            >
                                                <h6 className="fs-16">
                                                    {item.label}
                                                    {item.note && (
                                                        <>
                                                            {' '}
                                                            <span className="text-gray-6">{item.note}</span>
                                                        </>
                                                    )}
                                                </h6>
                                                <p className={item.valueClass ? `fs-16 ${item.valueClass}` : 'fs-16'}>
                                                    {item.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h6>Amount to Pay</h6>
                                            <h6 className="text-primary">$547</h6>
                                        </div>
                                        <p className="fs-13 text-gray-6 mt-2 mb-0">
                                            Plus a city tax of about $21, collected by the property on arrival.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Review Order Details */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
        </div>
    )
}

export default HotelBooking
