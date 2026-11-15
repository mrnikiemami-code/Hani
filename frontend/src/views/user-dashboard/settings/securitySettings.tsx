"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import Sidebar from '../../../components/common-sidebar/sidebar';
import SecuritySettingsModal from './modal/securitySettingsModal';

const SecuritySettings = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Settings',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Security',
            active: true,
        },
    ];


    return (
        <div>
            <Breadcrumb
                title="Settings"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-04"
            />


            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 ">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        {/* Profile Settings */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="card settings mb-0">
                                <div className="card-header">
                                    <h6>Settings</h6>
                                </div>
                                <div className="card-body pb-1">
                                    <div className="settings-link d-flex align-items-center flex-wrap">
                                        <Link href={routes.profileSettings} >
                                            <i className="isax isax-user-octagon me-2" />
                                            Profile Settings
                                        </Link>
                                        <Link href={routes.securitySettings} className="active ps-3">
                                            <i className="isax isax-shield-tick me-2" />
                                            Security
                                        </Link>
                                        <Link href={routes.notificationSettings}>
                                            <i className="isax isax-notification me-2" />
                                            Notifications
                                        </Link>
                                        <Link href={routes.integrationSettings} className="pe-3">
                                            <i className="isax isax-hierarchy me-2" />
                                            Integrations
                                        </Link>
                                    </div>
                                    {/* Security Content */}
                                    <div className="row gy-2">
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Google Authenticator</h6>
                                                    <div className="form-check form-switch mb-1">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="check1"
                                                            defaultChecked
                                                        />
                                                    </div>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Google Authenticator provides 6-digit codes for 2FA
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Password</h6>
                                                    <Link
                                                        href="#"
                                                        className="btn btn-primary btn-xs mb-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#changePassword"
                                                    >
                                                        Change
                                                    </Link>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Last Changed 15 Oct 2024, 09:00 AM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Two Factor</h6>
                                                    <div className="form-check form-switch mb-1">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="check2"
                                                            defaultChecked
                                                        />
                                                    </div>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Receive codes via SMS or email every time you login
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Phone Number Verification</h6>
                                                    <div>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-light btn-xs me-2 mb-1"
                                                        >
                                                            Remove
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#change-phone"
                                                            className="btn btn-primary btn-xs mb-1"
                                                        >
                                                            Change
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Last Changed 15 Oct 2024, 09:00 AM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Email Verification</h6>
                                                    <div>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-light btn-xs me-2 mb-1"
                                                        >
                                                            Remove
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#change-email"
                                                            className="btn btn-primary btn-xs mb-1"
                                                        >
                                                            Change
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Verified Email : info@example.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Device Management</h6>
                                                    <div>
                                                        <Link
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#device-management"
                                                            className="btn btn-primary btn-xs mb-1"
                                                        >
                                                            Manage
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Last Changed 18 Oct 2024, 11:15 AM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill border-0">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Account Activity</h6>
                                                    <div>
                                                        <Link
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#acc-activity"
                                                            className="btn btn-primary btn-xs mb-1"
                                                        >
                                                            View
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Last Changed 04 Nov 2024, 04:30 PM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex">
                                            <div className="security-content flex-fill border-0">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <h6 className="fs-14 mb-1">Delete Account</h6>
                                                    <div>
                                                        <Link
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-account"
                                                            className="btn btn-primary btn-xs mb-1"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="fs-14 text-gray-6 fw-normal">
                                                    Refers to permanently deleting a user's account and data
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Security Content*/}
                                </div>
                            </div>
                        </div>
                        {/* /Profile Settings */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <SecuritySettingsModal />

        </div>
    )
}

export default SecuritySettings
