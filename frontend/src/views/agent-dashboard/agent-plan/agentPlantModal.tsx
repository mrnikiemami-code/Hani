"use client";

import Link from "next/link";
import { all_routes } from '../../../routes/all_routes'
import ImageWithBasePath from '../../../components/image-with-base-path';

const AgentPlantModal = () => {

    const routes = all_routes;

    return (
        <>
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
            <div className="modal fade" id="payment_success" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <span className="text-success d-flex align-items-center justify-content-center mb-3 fs-40">
                                <i className="isax isax-tick-circle5" />
                            </span>
                            <h5 className="mb-3">Payment Successful</h5>
                            <p className="mb-3">
                                Your purchase of the Basic Plan has been completed with Reference
                                Number <span className="text-primary d-block">#12559845</span>
                            </p>
                            <div className="d-flex align-items-center justify-content-center">
                                <Link href={routes.agentPlanSettings} className="btn btn-light me-2">
                                    Back to Plans
                                </Link>
                                <Link
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#transaction_detail"
                                    className="btn btn-primary"
                                >
                                    View Purchase Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Pricing Plan Modal */}
        </>

    )
}

export default AgentPlantModal
