"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import BookingForm from '../../../components/booking/bookingForm';
import { all_routes } from '../../../routes/all_routes';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'

const diningOptions = ['Early seating · 18:00', 'Late seating · 20:30', 'Flexible dining'];
const tableOptions = ['Table for 2', 'Shared table, 6 to 8 guests', 'No preference'];
const cabinBedOptions = ['Queen bed', 'Two single beds'];
const dietOptions = ['None', 'Vegetarian', 'Vegan', 'Gluten free', 'Nut allergy'];

const CruiseBooking = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Cruise',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Cruise Booking',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb
                title="Cruise Booking"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-06"
            />

            <>
                {/* Page Wrapper */}
                <div className="content content-two">
                    <div className="container">
                        <div className="row">
                            {/* Checkout */}
                            <div className="col-lg-8">
                                <BookingForm afterCheckout={<>
                                {/* Cabin & Dining */}
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Cabin &amp; Dining</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between gap-3 bg-light-200 rounded p-3 mb-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="avatar avatar-lg rounded flex-shrink-0">
                                                    <ImageWithBasePath
                                                        src="assets/img/hotels/hotel-gallery-03.jpg"
                                                        className="rounded"
                                                        alt="Balcony cabin interior"
                                                    />
                                                </span>
                                                <div>
                                                    <p className="fs-14 fw-medium text-dark mb-0">
                                                        Balcony &middot; Cabin 8012
                                                    </p>
                                                    <p className="fs-13 text-gray-6 mb-0">
                                                        Deck 8 Marina &middot; midship, port side &middot; 24 m&sup2;
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                href={routes.cruiseCabinSelection}
                                                className="btn btn-light btn-sm flex-shrink-0"
                                            >
                                                Change
                                            </Link>
                                        </div>
                                        <div className="row row-gap-3">
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-dining">
                                                    Dining seating
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="cb-dining"
                                                    name="cb-dining"
                                                    defaultValue={diningOptions[1]}
                                                >
                                                    {diningOptions.map((option) => (
                                                        <option key={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <p className="fs-13 text-gray-6 mt-1 mb-0">
                                                    Seating is confirmed at embarkation and cannot always be changed
                                                    onboard.
                                                </p>
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-table">
                                                    Table preference
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="cb-table"
                                                    name="cb-table"
                                                    defaultValue="Shared table, 6 to 8 guests"
                                                >
                                                    {tableOptions.map((option) => (
                                                        <option key={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-bed">
                                                    Bed configuration
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="cb-bed"
                                                    name="cb-bed"
                                                    defaultValue="Queen bed"
                                                >
                                                    {cabinBedOptions.map((option) => (
                                                        <option key={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-diet">
                                                    Dietary requirements
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="cb-diet"
                                                    name="cb-diet"
                                                    defaultValue="None"
                                                >
                                                    {dietOptions.map((option) => (
                                                        <option key={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label" htmlFor="cb-occasion">
                                                    Celebrating something? <span className="text-gray-6 fw-normal">Optional</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cb-occasion"
                                                    name="cb-occasion"
                                                    placeholder="Anniversary, birthday, honeymoon"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Guest manifest */}
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Guest Documents</h5>
                                        <p className="fs-13 text-gray-6 mb-0">
                                            Required by the port authority before boarding. You can complete this now
                                            or at online check-in, which opens 30 days before sailing.
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        <div className="row row-gap-3">
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-pass1">
                                                    Passport number &mdash; Guest 1
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cb-pass1"
                                                    name="cb-pass1"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-exp1">
                                                    Passport expiry &mdash; Guest 1
                                                </label>
                                                <div className="input-icon-end position-relative">
                                                    <DatePicker
                                                        className="form-control datetimepicker"
                                                        id="cb-exp1"
                                                        placeholder="dd/mm/yyyy"
                                                        format="DD-MM-YYYY"
                                                    />
                                                    <span className="input-icon-addon">
                                                        <i className="isax isax-calendar" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-pass2">
                                                    Passport number &mdash; Guest 2
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cb-pass2"
                                                    name="cb-pass2"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-exp2">
                                                    Passport expiry &mdash; Guest 2
                                                </label>
                                                <div className="input-icon-end position-relative">
                                                    <DatePicker
                                                        className="form-control datetimepicker"
                                                        id="cb-exp2"
                                                        placeholder="dd/mm/yyyy"
                                                        format="DD-MM-YYYY"
                                                    />
                                                    <span className="input-icon-addon">
                                                        <i className="isax isax-calendar" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-emg">
                                                    Emergency contact name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cb-emg"
                                                    name="cb-emg"
                                                    autoComplete="name"
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label" htmlFor="cb-emgtel">
                                                    Emergency contact phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="cb-emgtel"
                                                    name="cb-emgtel"
                                                    autoComplete="tel"
                                                    inputMode="tel"
                                                />
                                            </div>
                                        </div>
                                        <div className="alert alert-warning d-flex gap-2 mt-3 mb-0">
                                            <i className="isax isax-info-circle flex-shrink-0 mt-1" />
                                            <span className="fs-13">
                                                Passports must be valid for at least six months beyond 21 May 2025,
                                                the disembarkation date.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Onboard extras */}
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Onboard Extras</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-check d-flex align-items-start gap-2 pb-3 mb-3 border-bottom">
                                            <input
                                                className="form-check-input mt-1"
                                                type="checkbox"
                                                id="cb-grat"
                                                defaultChecked
                                            />
                                            <label className="form-check-label" htmlFor="cb-grat">
                                                <span className="d-block fs-14 fw-medium text-dark">
                                                    Prepaid gratuities
                                                </span>
                                                <span className="d-block fs-13 text-gray-6">
                                                    $16 per guest per night &middot; $192 for 2 guests. Charged
                                                    onboard if not prepaid.
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-start gap-2 pb-3 mb-3 border-bottom">
                                            <input className="form-check-input mt-1" type="checkbox" id="cb-drinks" />
                                            <label className="form-check-label" htmlFor="cb-drinks">
                                                <span className="d-block fs-14 fw-medium text-dark">
                                                    Classic drinks package
                                                </span>
                                                <span className="d-block fs-13 text-gray-6">
                                                    $59 per guest per night &middot; must be bought for both guests
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-start gap-2 pb-3 mb-3 border-bottom">
                                            <input className="form-check-input mt-1" type="checkbox" id="cb-wifi" />
                                            <label className="form-check-label" htmlFor="cb-wifi">
                                                <span className="d-block fs-14 fw-medium text-dark">
                                                    Wi-Fi, one device
                                                </span>
                                                <span className="d-block fs-13 text-gray-6">$89 for the voyage</span>
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-start gap-2 mb-0">
                                            <input
                                                className="form-check-input mt-1"
                                                type="checkbox"
                                                id="cb-ins"
                                                defaultChecked
                                            />
                                            <label className="form-check-label" htmlFor="cb-ins">
                                                <span className="d-block fs-14 fw-medium text-dark">
                                                    Travel insurance
                                                </span>
                                                <span className="d-block fs-13 text-gray-6">
                                                    $68 for 2 guests &middot; covers cancellation, medical and missed
                                                    port departure
                                                </span>
                                            </label>
                                        </div>
                                        <p className="fs-13 text-gray-6 mt-3 mb-0">
                                            Shore excursions open for booking 90 days before sailing and appear in
                                            Manage Booking.
                                        </p>
                                    </div>
                                </div>
                                </>} paymentNotice={
                                    <div className="px-3 pt-3">
                                        <div className="d-flex align-items-start gap-2 bg-light-200 rounded p-3">
                                            <i className="isax isax-info-circle text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="fs-14 fw-medium text-dark mb-1">You are paying a deposit today, not the full fare</p>
                                                <p className="fs-13 text-gray-6 mb-0">$500 is taken now to hold cabin 8012. The remaining <strong>$1,778</strong> is due on <strong>14 Feb 2025</strong>, 90 days before sailing. We will email a reminder and you can pay it any time from Manage Booking.</p>
                                            </div>
                                        </div>
                                    </div>
                                } />
                            </div>
                            {/* Checkout */}
                            {/* Review Order Details */}
                            <div className="col-lg-4 ">
                                <div className="card order-details theiaStickySidebar">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between header-content">
                                            <h5>Review Order Details</h5>
                                            <Link href={routes.cruiseDetails} className="rounded-circle p-2 btn btn-light d-flex align-items-center justify-content-center"><span className="fs-16 d-flex align-items-center justify-content-center"><i className="isax isax-edit-2"></i></span></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="pb-3 border-bottom">
                                            <div className="mb-3 review-img">
                                                <ImageWithBasePath src="assets/img/cruise/cruise-large-03.jpg" alt="Img" className="img-fluid" />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <h6 className="mb-2">Coral Cruiser - Balcony</h6>
                                                    <p className="fs-14 "><span className="badge badge-warning text-gray-9 fs-13 fw-medium me-2">5.0</span>(400 Reviews)</p>
                                                </div>
                                                <h6 className="fs-14 fw-normal text-gray-9">$960 <span className="fs-13 text-gray-6">pp</span></h6>
                                            </div>
                                        </div>
                                        <div className="mt-3 pb-3 border-bottom">
                                            <h6 className="text-primary mb-3">Order Info</h6>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">Cabin</h6>
                                                <p className="fs-16">Balcony &middot; 8012, Deck 8</p>
                                            </div>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">Embarkation</h6>
                                                <p className="fs-16">15 May 2025, Barcelona</p>
                                            </div>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">Disembarkation</h6>
                                                <p className="fs-16">21 May 2025, Barcelona</p>
                                            </div>
                                            <div className="d-flex align-items-center  details-info">
                                                <h6 className="fs-16">Guests</h6>
                                                <p className="fs-16">2 adults</p>
                                            </div>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">Duration</h6>
                                                <p className="fs-16">6 nights, 4 ports</p>
                                            </div>
                                            <div className="d-flex align-items-center details-info">
                                                <h6 className="fs-16">Dining</h6>
                                                <p className="fs-16">Late seating, 20:30</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 border-bottom">
                                            <h6 className="text-primary mb-3">Payment Info</h6>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">Cruise fare <span className="text-gray-6"> (2 &times; $960)</span></h6>
                                                <p className="fs-16">$1,920</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">Port charges &amp; taxes</h6>
                                                <p className="fs-16">$148</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">Prepaid gratuities <span className="text-gray-6"> ($16 pp/night)</span></h6>
                                                <p className="fs-16">$192</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">Travel insurance</h6>
                                                <p className="fs-16">$68</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h6 className="fs-16">Discount <span className="text-gray-6"> (Dreams25)</span></h6>
                                                <p className="fs-16 text-success">-$50</p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <h6>Booking total</h6>
                                                <h6>$2,278</h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                                                <h6>Deposit due today</h6>
                                                <h6 className="text-primary">$500</h6>
                                            </div>
                                            <p className="fs-13 text-gray-6 mt-2 mb-0">Balance of $1,778 due 14 Feb 2025.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Review Order Details */}
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}

            </>


        </div>
    )
}

export default CruiseBooking
