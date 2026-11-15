"use client";

import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../../components/image-with-base-path';
import Link from "next/link";
import Sidebar from '../../sidebar/sidebar';
import AgentPlanSettingsModal from './agentPlanSettingsModal';


const AgentPlanSettings = () => {

    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Settings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Settings',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb title="Settings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        {/* Profile Settings */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="card settings mb-0">
                                <div className="card-header">
                                    <h6>Settings</h6>
                                </div>
                                <div className="card-body">
                                    <div className="settings-link d-flex align-items-center flex-wrap">
                                        <Link href={routes.agentSettings}>
                                            <i className="isax isax-user-octagon me-2" />
                                            Edit Profile
                                        </Link>
                                        <Link href={routes.agentBussinessDetails}>
                                            <i className="isax isax-buildings-2 me-2" />
                                            Bussiness Details
                                        </Link>
                                        <Link href={routes.agentAccountSettings}>
                                            <i className="isax isax-wallet-money me-2" />
                                            Account Settings
                                        </Link>
                                        <Link href={routes.agentSecuritySettings}>
                                            <i className="isax isax-shield-tick me-2" />
                                            Security
                                        </Link>
                                        <Link href={routes.agentPlanSettings} className="active ps-3">
                                            <i className="isax isax-star me-2" />
                                            Plans &amp; Billing
                                        </Link>
                                        <Link href={routes.agentNotificationSettings}>
                                            <i className="isax isax-notification me-2" />
                                            Notifications
                                        </Link>
                                    </div>
                                    <div>
                                        <div>
                                            <h6 className="mb-3">Plans &amp; Billing</h6>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-5 d-flex">
                                                <div className="card shadow-none bg-gray-transparent flex-fill">
                                                    <div className="card-body">
                                                        <div className="border-bottom d-flex align-items-center justify-content-between mb-3 pb-3">
                                                            <h6 className="fw-medium">Active Plan</h6>
                                                            <Link href="#" className="btn btn-light btn-sm">
                                                                Download PDF
                                                            </Link>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between border-bottom mb-4 pb-4">
                                                            <div>
                                                                <h5 className="mb-1 fs-18">Standard Plan</h5>
                                                                <p className="fs-14">
                                                                    Valid till: May 2025 - Jun 2025
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <h4>$199</h4>
                                                                <span className="d-block fs-14">per year</span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-end">
                                                            <Link href="#" className="btn btn-light btn-sm me-2">
                                                                Cancel Subscription
                                                            </Link>
                                                            <Link
                                                                href="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#price_plane"
                                                                className="btn btn-primary btn-sm"
                                                            >
                                                                Update Plan
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-7 d-flex">
                                                <div className="card shadow-none bg-gray-transparent flex-fill">
                                                    <div className="card-body">
                                                        <div className="border-bottom d-flex align-items-center justify-content-between mb-3 pb-3">
                                                            <h6 className="fw-medium">Saved Cards</h6>
                                                            <Link
                                                                href="#"
                                                                className="btn btn-light btn-sm d-inline-flex align-items-center"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#add_card"
                                                            >
                                                                <i className="isax isax-add me-1" />
                                                                Add New Card
                                                            </Link>
                                                        </div>
                                                        <div className="row g-2">
                                                            <div className="col-md-6">
                                                                <div className="card mb-0">
                                                                    <div className="card-body p-3">
                                                                        <div className="d-flex align-items-center mb-3">
                                                                            <span className="payment-img d-flex align-items-center justify-content-center flex-shrink-0 rounded border me-2">
                                                                                <ImageWithBasePath
                                                                                    src="assets/img/icons/visa-3.svg"
                                                                                    alt=""
                                                                                />
                                                                            </span>
                                                                            <div>
                                                                                <span className="fs-14 mb-1 d-block">
                                                                                    Credit Card
                                                                                </span>
                                                                                <h6 className="fs-14 fw-medium text-truncate">
                                                                                    Visa •••• 1568
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                            <Link
                                                                                href="#"
                                                                                className="btn btn-primary btn-sm"
                                                                            >
                                                                                Default
                                                                            </Link>
                                                                            <div className="d-flex align-items-center edit-delete-icon">
                                                                                <Link
                                                                                    href="#"
                                                                                    className="avatar rounded-circle border me-2"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#edit_card"
                                                                                >
                                                                                    <i className="isax isax-edit fs-14" />
                                                                                </Link>
                                                                                <Link
                                                                                    href="#"
                                                                                    className="avatar rounded-circle border"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#delete-list"
                                                                                >
                                                                                    <i className="isax isax-trash fs-14" />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="card mb-0">
                                                                    <div className="card-body p-3">
                                                                        <div className="d-flex align-items-center mb-3">
                                                                            <span className="payment-img d-flex align-items-center justify-content-center flex-shrink-0 rounded border me-2">
                                                                                <ImageWithBasePath
                                                                                    src="assets/img/icons/visa-2.svg"
                                                                                    alt=""
                                                                                />
                                                                            </span>
                                                                            <div>
                                                                                <span className="fs-14 mb-1 d-block">
                                                                                    Debit Card
                                                                                </span>
                                                                                <h6 className="fs-14 fw-medium text-truncate">
                                                                                    Mastercard •••• 1279
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                            <Link
                                                                                href="#"
                                                                                className="text-primary text-decoration-underline fs-14"
                                                                            >
                                                                                Set as Default
                                                                            </Link>
                                                                            <div className="d-flex align-items-center edit-delete-icon">
                                                                                <Link
                                                                                    href="#"
                                                                                    className="avatar rounded-circle border me-2"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#edit_card"
                                                                                >
                                                                                    <i className="isax isax-edit fs-14" />
                                                                                </Link>
                                                                                <Link
                                                                                    href="#"
                                                                                    className="avatar rounded-circle border"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#delete-list"
                                                                                >
                                                                                    <i className="isax isax-trash fs-14" />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card hotel-list mb-0">
                                            <div className="card-body p-0">
                                                <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6>Transaction History</h6>
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <div className="dropdown">
                                                            <Link
                                                                href="#"
                                                                className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                                                                data-bs-toggle="dropdown"
                                                                
                                                            >
                                                                Status
                                                            </Link>
                                                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                                                <li>
                                                                    <Link
                                                                        href="#"
                                                                        className="dropdown-item rounded-1"
                                                                    >
                                                                        Paid
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#"
                                                                        className="dropdown-item rounded-1"
                                                                    >
                                                                        Pending
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#"
                                                                        className="dropdown-item rounded-1"
                                                                    >
                                                                        Cancelled
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="custom-datatable-filter table-responsive">
                                                    <table className="table datatable">
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Plan Name</th>
                                                                <th>Payment Method</th>
                                                                <th>Subscribed On</th>
                                                                <th>Last Date</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                                <th />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Link
                                                                        href="#"
                                                                        className="link-primary fw-medium"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#transaction_detail"
                                                                    >
                                                                        #IN-1245
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <h6 className="fs-14 fw-medium">Standard Plan</h6>
                                                                </td>
                                                                <td>Credit Card</td>
                                                                <td>15 May 2025</td>
                                                                <td>14 Jun 2025</td>
                                                                <td>$199</td>
                                                                <td>
                                                                    <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                                                                        <i className="fa-solid fa-circle fs-5 me-1" />
                                                                        Pending
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Link
                                                                            href="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#transaction_detail"
                                                                            className="me-2"
                                                                        >
                                                                            <i className="isax isax-eye" />
                                                                        </Link>
                                                                        <Link href="#">
                                                                            <i className="isax isax-document-download" />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Link
                                                                        href="#"
                                                                        className="link-primary fw-medium"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#transaction_detail"
                                                                    >
                                                                        #IN-3215
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <h6 className="fs-14 fw-medium">Basic Plan</h6>
                                                                </td>
                                                                <td>Debit Card</td>
                                                                <td>15 Apr 2025</td>
                                                                <td>14 May 2025</td>
                                                                <td>$99</td>
                                                                <td>
                                                                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                        <i className="fa-solid fa-circle fs-5 me-1" />
                                                                        Paid
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Link
                                                                            href="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#transaction_detail"
                                                                            className="me-2"
                                                                        >
                                                                            <i className="isax isax-eye" />
                                                                        </Link>
                                                                        <Link href="#">
                                                                            <i className="isax isax-document-download" />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Link
                                                                        href="#"
                                                                        className="link-primary fw-medium"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#transaction_detail"
                                                                    >
                                                                        #IN-4581
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <h6 className="fs-14 fw-medium">Premium Plan</h6>
                                                                </td>
                                                                <td>Paypal</td>
                                                                <td>15 Mar 2025</td>
                                                                <td>14 Apr 2025</td>
                                                                <td>$299</td>
                                                                <td>
                                                                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                        <i className="fa-solid fa-circle fs-5 me-1" />
                                                                        Paid
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Link
                                                                            href="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#transaction_detail"
                                                                            className="me-2"
                                                                        >
                                                                            <i className="isax isax-eye" />
                                                                        </Link>
                                                                        <Link href="#">
                                                                            <i className="isax isax-document-download" />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Link
                                                                        href="#"
                                                                        className="link-primary fw-medium"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#transaction_detail"
                                                                    >
                                                                        #IN-6545
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <h6 className="fs-14 fw-medium">Basic Plan</h6>
                                                                </td>
                                                                <td>Debit Card</td>
                                                                <td>15 Feb 2025</td>
                                                                <td>14 Mar 2025</td>
                                                                <td>$99</td>
                                                                <td>
                                                                    <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                                        <i className="fa-solid fa-circle fs-5 me-1" />
                                                                        Cancelled
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Link
                                                                            href="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#transaction_detail"
                                                                            className="me-2"
                                                                        >
                                                                            <i className="isax isax-eye" />
                                                                        </Link>
                                                                        <Link href="#">
                                                                            <i className="isax isax-document-download" />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Link
                                                                        href="#"
                                                                        className="link-primary fw-medium"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#transaction_detail"
                                                                    >
                                                                        #IN-5769
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <h6 className="fs-14 fw-medium">Standard Plan</h6>
                                                                </td>
                                                                <td>Stripe</td>
                                                                <td>15 Jan 2025</td>
                                                                <td>14 Feb 2025</td>
                                                                <td>$99</td>
                                                                <td>
                                                                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                        <i className="fa-solid fa-circle fs-5 me-1" />
                                                                        Paid
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <Link
                                                                            href="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#transaction_detail"
                                                                            className="me-2"
                                                                        >
                                                                            <i className="isax isax-eye" />
                                                                        </Link>
                                                                        <Link href="#">
                                                                            <i className="isax isax-document-download" />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Profile Settings */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AgentPlanSettingsModal />

        </div>
    )
}

export default AgentPlanSettings
