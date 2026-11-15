"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../components/common-sidebar/sidebar';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';

const IntegrationSettings = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Settings',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Integrations',
            active: true,
        },
    ];

    return (
        <div>

            <Breadcrumb
                title="Integrations"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-04"
            />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        {/* Integration Settings */}
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
                                        <Link href={routes.notificationSettings}>
                                            <i className="isax isax-notification me-2" />
                                            Notifications
                                        </Link>
                                        <Link href={routes.integrationSettings} className="active ps-3 pe-3">
                                            <i className="isax isax-hierarchy me-2" />
                                            Integrations
                                        </Link>
                                    </div>
                                    {/* Integration Content */}
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6 d-flex">
                                            <div className="card integration-card mb-3 flex-fill">
                                                <div className="card-body">
                                                    <div className="integration-content">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <div className="d-flex align-items-center">
                                                                <span className="icons me-2">
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/google.svg"
                                                                        alt="icon"
                                                                        className="img-fluid"
                                                                    />
                                                                </span>
                                                                <h6 className="fs-14">Google</h6>
                                                            </div>
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
                                                        <div>
                                                            <p className="fs-14">
                                                                Used to find travel destinations, accommodations
                                                                &amp; reviews with ease.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6 d-flex">
                                            <div className="card integration-card mb-3 flex-fill">
                                                <div className="card-body">
                                                    <div className="integration-content">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <div className="d-flex align-items-center">
                                                                <span className="icons me-2">
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/google-calender.svg"
                                                                        alt="icon"
                                                                        className="img-fluid"
                                                                    />
                                                                </span>
                                                                <h6 className="fs-14">Google Calendar</h6>
                                                            </div>
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
                                                        <div>
                                                            <p className="fs-14">
                                                                Get notifications for upcoming trips or events.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-6 d-flex">
                                            <div className="card integration-card mb-3 flex-fill">
                                                <div className="card-body">
                                                    <div className="integration-content">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <div className="d-flex align-items-center">
                                                                <span className="icons me-2">
                                                                    <ImageWithBasePath
                                                                        src="assets/img/icons/google-map.svg"
                                                                        alt="icon"
                                                                        className="img-fluid"
                                                                    />
                                                                </span>
                                                                <h6 className="fs-14">Google Maps</h6>
                                                            </div>
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
                                                        <div>
                                                            <p className="fs-14">
                                                                Boosts with interactive routes, destinations &amp;
                                                                location-based services.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Integration Content*/}
                                </div>
                            </div>
                        </div>
                        {/* /Integration Settings */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

        </div>
    )
}

export default IntegrationSettings
