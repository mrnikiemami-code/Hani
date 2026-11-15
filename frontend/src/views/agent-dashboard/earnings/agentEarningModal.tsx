"use client";

import ImageWithBasePath from '../../../components/image-with-base-path'
import Link from "next/link";
import CustomSelect from '../../../components/common-select/commonSelect'
import { Days } from '../../../core/data/mock/selectOption'

const AgentEarningModal = () => {
    return (
        <>
            {/* Earnings Invoice Modal */}
            <div
                className="modal fade"
                id="earning_invoice"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-dialog-centered modal-lg invoice-modal">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <div>
                                    <div className="border-bottom mb-4">
                                        <div className="row justify-content-between align-items-center flex-wrap row-gap-4">
                                            <div className="col-md-6">
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
                                            <div className="col-md-6">
                                                <div className=" text-end mb-3">
                                                    <h6 className="text-default mb-1">
                                                        Invoice No{" "}
                                                        <span className="text-primary fw-medium">#INV0001</span>
                                                    </h6>
                                                    <p className="fs-14 mb-1 fw-medium">
                                                        Created Date :{" "}
                                                        <span className="text-gray-9">Sep 24, 2023</span>{" "}
                                                    </p>
                                                    <p className="fs-14 fw-medium">
                                                        Due Date :{" "}
                                                        <span className="text-gray-9">Sep 30, 2023</span>{" "}
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
                                        <p className="fw-medium mb-3">
                                            Invoice For :{" "}
                                            <span className="text-dark fw-medium">Hotel Booking</span>
                                        </p>
                                        <div className="table-responsive">
                                            <table className="table invoice-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="w-50 bg-light-400">Description</th>
                                                        <th className="text-center bg-light-400">Qty</th>
                                                        <th className="text-end bg-light-400">Cost</th>
                                                        <th className="text-end bg-light-400">Discount</th>
                                                        <th className="text-end bg-light-400">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h6 className="fs-14">
                                                                Hotel Booking ( Hotel Miravent Barcelona ){" "}
                                                            </h6>
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-center">
                                                            1
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $2000
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $150
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $1800
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6 className="fs-14">
                                                                Additional Service ( Airport Pickup, Breakfast )
                                                            </h6>
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-center">
                                                            1
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $200
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $50
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $150
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
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$2000</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
                                                    <p className="fs-14 fw-medium text-gray mb-0">
                                                        Discount (0%)
                                                    </p>
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$100</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                                    <p className="fs-14 fw-medium text-gray mb-0">VAT (5%)</p>
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$55</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                                    <h6>Total Amount</h6>
                                                    <h6>$1955</h6>
                                                </div>
                                                <p className="fs-12">
                                                    Amount in Words : Dollar Thousand Nine Fifty Five
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
            {/* /Earnings Invoice Modal */}
            {/* Withdraw Invoice Modal */}
            <div className="modal fade" id="withdraw_invoice" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-lg invoice-modal">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <div>
                                    <div className="border-bottom mb-4">
                                        <div className="row justify-content-between align-items-center flex-wrap row-gap-4">
                                            <div className="col-md-6">
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
                                            <div className="col-md-6">
                                                <div className=" text-end mb-3">
                                                    <h6 className="text-default mb-1">
                                                        Invoice No{" "}
                                                        <span className="text-primary fw-medium">#WRV0001</span>
                                                    </h6>
                                                    <p className="fs-14 mb-1 fw-medium">
                                                        Date : <span className="text-gray-9">Sep 24, 2023</span>{" "}
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
                                                        Completed
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
                                        <p className="fw-medium mb-3">
                                            Invoice For :{" "}
                                            <span className="text-dark fw-medium">Hotel Booking</span>
                                        </p>
                                        <div className="table-responsive">
                                            <table className="table invoice-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="w-50 bg-light-400">Description</th>
                                                        <th className="text-end bg-light-400">Cost</th>
                                                        <th className="text-end bg-light-400">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h6 className="fs-14">
                                                                Withdrawn payment (15 Jan 2025 - 12 Feb 2025)
                                                            </h6>
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $2000
                                                        </td>
                                                        <td className="text-gray fs-14 fw-medium text-end">
                                                            $1800
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
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$2000</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
                                                    <p className="fs-14 fw-medium text-gray mb-0">
                                                        Discount (0%)
                                                    </p>
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$100</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                                    <p className="fs-14 fw-medium text-gray mb-0">VAT (5%)</p>
                                                    <p className="text-gray-9 fs-14 fw-medium mb-2">$55</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                                                    <h6>Total Amount</h6>
                                                    <h6>$1955</h6>
                                                </div>
                                                <p className="fs-12">
                                                    Amount in Words : Dollar Thousand Nine Fifty Five
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
            {/* /Withdraw Invoice Modal */}
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
                            ></Link>
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
                                        <input type="text" className='form-control' />
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
                                        <button className="btn btn-primary btn-sm" type="submit">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Edit Card Modal */}
            {/* Saved Card Modal */}
            <div className="modal fade" id="saved_card" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Saved Cards</h5>
                            <Link
                                href="#"
                                data-bs-dismiss="modal"
                                className="btn-close text-dark"
                            ></Link>
                        </div>
                        <div className="modal-body pb-1">
                            <div className="border-bottom mb-3">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Bank Name</h6>
                                            <p className="fs-14">Citi Bank Inc</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Branch Name</h6>
                                            <p className="fs-14">London</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Number</h6>
                                            <p className="fs-14">5396 5250 1908 XXXX</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Name</h6>
                                            <p className="fs-14">Darren</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="form-check d-flex align-items-center mb-3">
                                            <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="Radio"
                                                id="mark1"
                                                defaultValue="mark1"
                                                defaultChecked
                                            />
                                            <label
                                                className="form-check-label fs-14 ms-2"
                                                htmlFor="mark1"
                                            >
                                                Mark as default
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mb-3">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Bank Name</h6>
                                            <p className="fs-14">Citi Bank Inc</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Branch Name</h6>
                                            <p className="fs-14">London</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Number</h6>
                                            <p className="fs-14">5396 5250 1908 XXXX</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Name</h6>
                                            <p className="fs-14">Darren</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="form-check d-flex align-items-center mb-3">
                                            <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="Radio"
                                                id="mark2"
                                                defaultValue="mark2"
                                            />
                                            <label
                                                className="form-check-label fs-14 ms-2"
                                                htmlFor="mark2"
                                            >
                                                Mark as default
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mb-3">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Bank Name</h6>
                                            <p className="fs-14">Citi Bank Inc</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Branch Name</h6>
                                            <p className="fs-14">London</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Number</h6>
                                            <p className="fs-14">5396 5250 1908 XXXX</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Name</h6>
                                            <p className="fs-14">Darren</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="form-check d-flex align-items-center mb-3">
                                            <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="Radio"
                                                id="mark3"
                                                defaultValue="mark3"
                                            />
                                            <label
                                                className="form-check-label fs-14 ms-2"
                                                htmlFor="mark3"
                                            >
                                                Mark as default
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Bank Name</h6>
                                            <p className="fs-14">Citi Bank Inc</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Branch Name</h6>
                                            <p className="fs-14">London</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Number</h6>
                                            <p className="fs-14">5396 5250 1908 XXXX</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6">
                                        <div className="mb-3">
                                            <h6 className="fw-medium fs-14 mb-1">Account Name</h6>
                                            <p className="fs-14">Darren</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="form-check d-flex align-items-center mb-3">
                                            <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="Radio"
                                                id="mark4"
                                                defaultValue="mark4"
                                            />
                                            <label
                                                className="form-check-label fs-14 ms-2"
                                                htmlFor="mark4"
                                            >
                                                Mark as default
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Saved Card Modal */}
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
                            ></Link>
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
                                       <input type="text" className='form-control' />
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
                                        <button className="btn btn-primary btn-sm" type="submit">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Add Card Modal */}
            {/* Withdraw Payment Modal */}
            <div className="modal fade" id="withdraw_payment" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-md w-500">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Withdraw Payment</h5>
                            <Link
                                href="#"
                                data-bs-dismiss="modal"
                                className="btn-close text-dark"
                            ></Link>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Enter Amount <span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Select Account <span className="text-danger"> *</span>
                                    </label>
                                    <CustomSelect
                                        options={Days}
                                        className="select d-flex"
                                        placeholder="Select"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="m-0">
                                    <button
                                        className="btn btn-light btn-sm"
                                        type="button"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-primary btn-sm" >
                                        Withdraw
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Withdraw Payment Modal */}
        </>

    )
}

export default AgentEarningModal
