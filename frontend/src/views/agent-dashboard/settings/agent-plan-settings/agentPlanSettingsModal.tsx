"use client";

import ImageWithBasePath from '../../../../components/image-with-base-path'
import Link from "next/link";
import { all_routes } from '../../../../routes/all_routes'

const AgentPlanSettingsModal = () => {

    const routes = all_routes;

    return (
        <div>


            {/* Transaction Details Modal */}
            <div className="modal fade" id="transaction_detail" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-lg invoice-modal">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <div>
                                    <div className="border-bottom mb-4">
                                        <div className="row justify-content-between align-items-center flex-wrap row-gap-4">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <div className="mb-2 invoice-logo-dark">
                                                        <ImageWithBasePath
                                                            src="assets/img/logo-dark.svg"
                                                            className="img-fluid"
                                                            alt="logo"
                                                        />
                                                    </div>
                                                    <div className="mb-2 invoice-logo-white">
                                                        <ImageWithBasePath
                                                            src="assets/img/logo.svg"
                                                            className="img-fluid"
                                                            alt="logo"
                                                        />
                                                    </div>
                                                    <p className="fs-12">
                                                        3099 Kennedy Court Framingham, MA 01702
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className=" text-end mb-3">
                                                    <h6 className="text-default mb-1">
                                                        Invoice No{" "}
                                                        <span className="text-primary fw-medium">#WRV0001</span>
                                                    </h6>
                                                    <p className="fs-14 mb-1 fw-medium">
                                                        Created Date :{" "}
                                                        <span className="text-gray-9">Sep 24, 2023</span>{" "}
                                                    </p>
                                                    <p className="fs-14 mb-0 fw-medium">
                                                        Due Date :{" "}
                                                        <span className="text-gray-9">Sep 24, 2023</span>{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom mb-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <div className="mb-3">
                                                    <h6 className="mb-3 fw-semibold fs-14">From</h6>
                                                    <div>
                                                        <h6 className="mb-1">Thomas Lawler</h6>
                                                        <p className="fs-14 mb-1">
                                                            2077 Chicago Avenue Orosi, CA 93647
                                                        </p>
                                                        <p className="fs-14 mb-1">
                                                            Email :{" "}
                                                            <span className="text-gray-9">
                                                                tarala2445@example.com
                                                            </span>
                                                        </p>
                                                        <p className="fs-14">
                                                            Phone :{" "}
                                                            <span className="text-gray-9">+1 987 654 3210</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <h6 className="mb-3 fw-semibold fs-14">To</h6>
                                                    <div>
                                                        <h6 className="mb-1">Sara Inc,.</h6>
                                                        <p className="fs-14 mb-1">
                                                            3103 Trainer Avenue Peoria, IL 61602
                                                        </p>
                                                        <p className="fs-14 mb-1">
                                                            Email :{" "}
                                                            <span className="text-gray-9">
                                                                sara_inc34@example.com
                                                            </span>
                                                        </p>
                                                        <p className="fs-14">
                                                            Phone :{" "}
                                                            <span className="text-gray-9">+1 987 471 6589</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <h6 className="mb-1 fs-14 fw-medium">Payment Status </h6>
                                                    <span className="badge badge-success align-items-center fs-10 mb-4">
                                                        <i className="ti ti-point-filled " />
                                                        Paid
                                                    </span>
                                                    <div>
                                                        <ImageWithBasePath
                                                            src="assets/img/invoice/qr.svg"
                                                            className="img-fluid"
                                                            alt="QR"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="table-responsive mb-3">
                                            <table className="table invoice-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="w-50 bg-light-400">Package</th>
                                                        <th className="text-end bg-light-400">Cost</th>
                                                        <th className="text-end bg-light-400">Days</th>
                                                        <th className="text-end bg-light-400">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h6 className="fs-14">Basic (Monthly)</h6>
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $99
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            30 Days
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $99
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="border-bottom mb-3">
                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className="py-4">
                                                    <div className="mb-3">
                                                        <h6 className="fs-14 mb-1">Terms and Conditions</h6>
                                                        <p className="fs-12">
                                                            Please pay within 15 days from the date of invoice,
                                                            overdue interest @ 14% will be charged on delayed
                                                            payments.
                                                        </p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h6 className="fs-14 mb-1">Notes</h6>
                                                        <p className="fs-12">
                                                            Please quote invoice number when remitting funds.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
                                                    <p className="fs-14 fw-medium text-gray mb-0">
                                                        Sub Total
                                                    </p>
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$99</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
                                                    <p className="fs-14 fw-medium text-gray mb-0">
                                                        Discount (0%)
                                                    </p>
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$0</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                                    <p className="fs-14 fw-medium text-gray mb-0">VAT (5%)</p>
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$0</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                                    <h6>Total Amount</h6>
                                                    <h6>$99</h6>
                                                </div>
                                                <p className="fs-12">
                                                    Amount in Words : Dollar Ninety Nine
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom mb-3 me-2">
                                        <div className="row justify-content-end align-items-end text-end">
                                            <div className="col-md-3">
                                                <div className="text-end">
                                                    <ImageWithBasePath
                                                        src="assets/img//invoice/sign.svg"
                                                        className="img-fluid"
                                                        alt="sign"
                                                    />
                                                </div>
                                                <div className="text-end mb-3">
                                                    <h6 className="fs-14 fw-medium pe-3">Ted M. Davis</h6>
                                                    <p>Assistant Manager</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-3 invoice-logo-dark">
                                            <ImageWithBasePath
                                                src="assets/img/logo-dark.svg"
                                                className="img-fluid"
                                                alt="logo"
                                            />
                                        </div>
                                        <div className="mb-3 invoice-logo-white">
                                            <ImageWithBasePath
                                                src="assets/img/logo.svg"
                                                className="img-fluid"
                                                alt="logo"
                                            />
                                        </div>
                                        <p className="text-gray-9 fs-12 mb-1">
                                            Payment Made Via bank transfer / Cheque in the name of Thomas
                                            Lawler
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Transaction Details Modal */}
            {/* Pricing Plan Modal */}
            <div className="modal fade" id="price_plane" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Pricing Plans</h5>
                            <Link
                                href="#"
                                data-bs-dismiss="modal"
                                className="btn-close text-dark"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <h5 className="text-gray-6">Yearly</h5>
                                <div className="form-check form-switch ms-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="check2"
                                        defaultChecked
                                    />
                                </div>
                                <h5>Monthly</h5>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 d-flex">
                                    <div className="card flex-fill mb-0">
                                        <div className="card-header">
                                            <div className="mb-3">
                                                <div className="mb-2">
                                                    <h4>Basic Plan</h4>
                                                </div>
                                                <div className="mb-2">
                                                    <p className="fs-16 text-gray-6">
                                                        For casual travelers who just need simple bookings.
                                                    </p>
                                                </div>
                                                <div>
                                                    <h5 className="fs-32 fw-bold">
                                                        $99 <span className="fs-16 fw-normal">/ monthly</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div>
                                                <Link
                                                    href={routes.agentPlanSettings}
                                                    className="btn btn-dark d-flex align-items-center justify-content-center "
                                                >
                                                    Choose Plan <i className="ms-2 isax isax-arrow-right-3" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-2">
                                                <h6 className="fs-16">Features Include</h6>
                                            </div>
                                            <div className="pricing-list-items">
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Flight, hotel, car bookings
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Basic search filters
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Email support
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Weekday support
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    General deals access
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Itinerary tracking
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Travel updates
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Save recent searches
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 d-flex">
                                    <div className="card flex-fill mb-0 bg-light-400">
                                        <div className="card-header">
                                            <div className="mb-3">
                                                <div className="mb-2 pricing-header d-flex align-items-center justify-content-between">
                                                    <h4 className="text-truncate">Standard Plan</h4>
                                                    <span className="rounded-pill">Recommended</span>
                                                </div>
                                                <div className="mb-2">
                                                    <p className="fs-16 text-gray-6">
                                                        Ideal for travelers seeking deals and convenience.
                                                    </p>
                                                </div>
                                                <div>
                                                    <h5 className="fs-32 fw-bold">
                                                        $199 <span className="fs-16 fw-normal">/ monthly</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div>
                                                <Link
                                                    href={routes.agentPlanSettings}
                                                    className="btn btn-primary d-flex align-items-center justify-content-center "
                                                >
                                                    Choose Plan <i className="ms-2 isax isax-arrow-right-3" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-2">
                                                <h6 className="fs-16">Features Include</h6>
                                            </div>
                                            <div className="pricing-list-items">
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Everything in Basic
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Advanced filters
                                                </p>
                                                <p className="d-flex align-items-center text-truncate">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Priority email &amp; chat support
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Early sale access
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Fare tracking
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Itinerary tracking
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Price alerts
                                                </p>
                                                <p className="d-flex align-items-center text-truncate">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Personalized recommendations
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 d-flex">
                                    <div className="card flex-fill mb-0">
                                        <div className="card-header">
                                            <div className="mb-3">
                                                <div className="mb-2 ">
                                                    <h4 className="text-truncate">Premium Plan</h4>
                                                </div>
                                                <div className="mb-2">
                                                    <p className="fs-16 text-gray-6">
                                                        Perfect for frequent travelers who want top-tier
                                                        features
                                                    </p>
                                                </div>
                                                <div>
                                                    <h5 className="fs-32 fw-bold">
                                                        $299 <span className="fs-16 fw-normal">/ monthly</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div>
                                                <Link
                                                    href={routes.agentPlanSettings}
                                                    className="btn btn-dark d-flex align-items-center justify-content-center "
                                                >
                                                    Choose Plan <i className="ms-2 isax isax-arrow-right-3" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-2">
                                                <h6 className="fs-16">Features Include</h6>
                                            </div>
                                            <div className="pricing-list-items">
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Everything in Explorer
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    24/7 VIP support
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Exclusive deals
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Unlimited booking changes
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Free lounge access
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Personal travel consultant
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Free upgrades
                                                </p>
                                                <p className="d-flex align-items-center ">
                                                    <i className="isax isax-tick-circle5 text-gray-1 me-1" />
                                                    Priority check-in/boarding
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Pricing Plan Modal */}
            {/* Add Card Modal */}
            <div className="modal fade" id="add_card" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-md w-500">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add New</h5>
                            <Link
                                href="#"
                                data-bs-dismiss="modal"
                                className="btn-close text-dark"
                            />
                        </div>
                        <form >
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Card Holder Name <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-user fs-14" />
                                        </span>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Card Number <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-card-tick fs-14" />
                                        </span>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Expire Date <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-calendar-2 fs-14" />
                                        </span>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        CVV <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-check fs-14" />
                                        </span>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex align-items-center justify-content-between flex-fill flex-wrap row-gap-3 m-0">
                                    <div className="form-check d-flex align-items-center ps-0 me-4">
                                        <input
                                            className="form-check-input ms-0 mt-0"
                                            type="checkbox"
                                            id="mark"
                                        />
                                        <label className="form-check-label ms-2" htmlFor="mark">
                                            Mark as default
                                        </label>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-light btn-sm"
                                            type="button"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <Link href="#" data-bs-dismiss="modal" className="btn btn-primary btn-sm">
                                            Save Changes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Add Card Modal */}
            {/* Edit Card Modal */}
            <div className="modal fade" id="edit_card" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-md w-500">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit Card</h5>
                            <Link
                                href="#"
                                data-bs-dismiss="modal"
                                className="btn-close text-dark"
                            />
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Card Holder Name <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-user fs-14" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="Adrian Jermain"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Card Number <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-card-tick fs-14" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="6565 4546 4564 4664"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Expire Date <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-calendar-2 fs-14" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="15/21"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        CVV <span className="text-danger"> *</span>
                                    </label>
                                    <div className="input-icon-start position-relative">
                                        <span className="icon-addon">
                                            <i className="isax isax-check fs-14" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={556}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex align-items-center justify-content-between flex-fill flex-wrap row-gap-3 m-0">
                                    <div className="form-check d-flex align-items-center ps-0 me-4">
                                        <input
                                            className="form-check-input ms-0 mt-0"
                                            type="checkbox"
                                            id="hotel-5"
                                        />
                                        <label className="form-check-label ms-2" htmlFor="hotel-5">
                                            Mark as default
                                        </label>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-light btn-sm"
                                            type="button"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <Link className="btn btn-primary btn-sm" href="#" data-bs-dismiss="modal">
                                            Save Changes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Edit Card Modal */}
            {/* Delete Modal */}
            <div className="modal fade" id="delete-list" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center">
                                <h5 className="mb-3">Delete Card</h5>
                                <p className="mb-3">Are you sure you want to delete this card?</p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link href="#" className="btn btn-light me-2">
                                        No
                                    </Link>
                                    <Link href={routes.agentPlanSettings} className="btn btn-primary">
                                        Yes, Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Delete Modal */}



        </div>
    )
}

export default AgentPlanSettingsModal
