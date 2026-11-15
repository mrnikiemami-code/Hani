"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';

const Invoices = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Invoice',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Pages',
            active: true,
        },
        {
            label: 'Invoice',
            active: true,
        },
    ];


    return (
        <div>
            <Breadcrumb
                title="Destinations"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />
            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    {/* Invoices */}
                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            <div className="card mb-0">
                                <div className="card-body">
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
                                        <div className="row align-items-center g-4">
                                            <div className="col-md-5">
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
                                            <div className="col-md-4">
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
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <h6 className="mb-1 fs-14 fw-medium">Payment Status </h6>
                                                    <span className="badge badge-danger align-items-center fs-10 mb-4">
                                                        <i className="ti ti-point-filled " />
                                                        Due in 10 Days
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
                                    <div className="row border-bottom mb-3">
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
                                            <div className="d-flex justify-content-between align-items-center border-bottom my-2 pe-3">
                                                <p className="fs-14 fw-medium text-gray mb-0">Sub Total</p>
                                                <p className="text-gray-9 fs-14 fw-medium mb-2">$2000</p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center border-bottom my-2 pe-3">
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
                                    <div className="row justify-content-end align-items-end text-end border-bottom mb-3 me-2">
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
                                        <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                                            <p className="fs-12 mb-0">
                                                Bank Name : <span className="text-gray-9">HDFC Bank</span>
                                            </p>
                                            <p className="fs-12 mb-0">
                                                Account Number :{" "}
                                                <span className="text-gray-9">45366287987</span>
                                            </p>
                                            <p className="fs-12">
                                                IFSC : <span className="text-gray-9">HDFC0018159</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Invoices */}
                </div>
            </div>
            {/* /Page Wrapper */}

        </div>
    )
}

export default Invoices
