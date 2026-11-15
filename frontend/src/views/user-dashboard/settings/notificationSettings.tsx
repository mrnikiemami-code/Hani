"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import Sidebar from '../../../components/common-sidebar/sidebar';

const NotificationSettings = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Settings',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Notifications',
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

            <>
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
                                            <Link href={routes.securitySettings} >
                                                <i className="isax isax-shield-tick me-2" />
                                                Security
                                            </Link>
                                            <Link href={routes.notificationSettings} className="active ps-3">
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
                                            <div className="col-xl-6 d-flex">
                                                <div className="notification-content mb-0 flex-fill">
                                                    <div className="row g-4">
                                                        <div className="col-md-6">
                                                            <h6 className="fs-14 mb-1">Booking Confirmations</h6>
                                                            <p className="fs-14 fw-normal">
                                                                Instant notifications for flight, hotel, or activity
                                                                bookings
                                                            </p>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Push</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check1"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">SMS</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check2"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Email</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check3"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 d-flex">
                                                <div className="notification-content flex-fill">
                                                    <div className="row g-4">
                                                        <div className="col-md-6">
                                                            <h6 className="fs-14 mb-1">Trip Reminders</h6>
                                                            <p className="fs-14 fw-normal">
                                                                Alerts for upcoming trips (1 day, 1 week before).
                                                            </p>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Push</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check4"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">SMS</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check5"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Email</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check6"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 d-flex">
                                                <div className="notification-content flex-fill border-0">
                                                    <div className="row g-4">
                                                        <div className="col-md-6">
                                                            <h6 className="fs-14 mb-1">Price Alerts</h6>
                                                            <p className="fs-14 fw-normal">
                                                                Notify users of price drops for flights or
                                                                accommodations.
                                                            </p>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Push</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check7"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">SMS</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check8"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Email</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check9"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="notification-content border-0">
                                                    <div className="row g-4">
                                                        <div className="col-md-6">
                                                            <h6 className="fs-14 mb-1">Special Offers</h6>
                                                            <p className="fs-14 fw-normal">
                                                                Optional notifications for discounts or promotions.
                                                            </p>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Push</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check10"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">SMS</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check11"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <h6 className="fs-14 mb-1">Email</h6>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="check12"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
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
            </>

        </div>
    )
}

export default NotificationSettings
