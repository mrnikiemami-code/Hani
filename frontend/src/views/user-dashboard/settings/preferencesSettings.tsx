"use client";
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import Sidebar from '../../../components/common-sidebar/sidebar';

const PreferencesSettings = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Settings',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Preferences',
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
                                    <div className="card-body">
                                        <div className="settings-link d-flex align-items-center flex-wrap">
                                            <Link href={routes.profileSettings} >
                                                <i className="isax isax-user-octagon me-2" />
                                                Profile Settings
                                            </Link>
                                            <Link href={routes.securitySettings} >
                                                <i className="isax isax-shield-tick me-2" />
                                                Security
                                            </Link>
                                            <Link href={routes.notificationSettings} >
                                                <i className="isax isax-notification me-2" />
                                                Notifications
                                            </Link>
                                            <Link href={routes.integrationSettings} className="pe-3">
                                                <i className="isax isax-hierarchy me-2" />
                                                Integrations
                                            </Link>
                                        </div>
                                        {/* Preferences Content */}
                                        <div className="row gy-4 align-items-center">
                                            <div className="col-lg-4">
                                                <div className="preference-content">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className="fs-14">Bookings</h6>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id="check1"
                                                                defaultChecked
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="preference-content">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className="fs-14">Reviews</h6>
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
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="preference-content">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className="fs-14">Payments</h6>
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
                                            <div className="col-lg-4">
                                                <div className="preference-content">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className="fs-14">Wishlist</h6>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id="check4"
                                                                defaultChecked
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="preference-content">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className="fs-14">Wallet</h6>
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
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="preference-content">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className="fs-14">Messages</h6>
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
                                        {/* /Preferences Content*/}
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

export default PreferencesSettings
