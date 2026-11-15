"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../sidebar/sidebar';
import Link from "next/link";

const AgentNotificationSettings = () => {
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
    <>
      <Breadcrumb title="Settings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            {/* Profile Settings */}
            <div className="col-xl-9 col-lg-8">
              <div className="card settings mb-0">
                <div className="card-header">
                  <h6>Settings</h6>
                </div>
                <div className="card-body pb-3">
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
                    <Link href={routes.agentPlanSettings}>
                      <i className="isax isax-star me-2" />
                      Plans &amp; Billing
                    </Link>
                    <Link href={routes.agentNotificationSettings} className="active ps-3">
                      <i className="isax isax-notification me-2" />
                      Notifications
                    </Link>
                  </div>
                  {/* Settings Content */}
                  <div className="row mb-3 row-gap-3">
                    <div className="col-md-6">
                      <h6 className="fs-14 mb-1">Booking Status Alerts</h6>
                      <p className="fs-14 fw-normal">
                        Get notified when a booking is confirmed, modified, or cancelled.
                      </p>
                    </div>
                    <div className="col-2">
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
                    <div className="col-2">
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
                    <div className="col-2">
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
                  <div className="row mb-3 row-gap-3">
                    <div className="col-md-6">
                      <h6 className="fs-14 mb-1">Commission Status Alerts</h6>
                      <p className="fs-14 fw-normal">
                        Instant updates when your commission is approved or marked as pending.
                      </p>
                    </div>
                    <div className="col-2">
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
                    <div className="col-2">
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
                    <div className="col-2">
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
                  <div className="row mb-3 row-gap-3">
                    <div className="col-md-6">
                      <h6 className="fs-14 mb-1">New Review Notifications</h6>
                      <p className="fs-14 fw-normal">
                        Instant alerts when a customer submits a new review for your service.
                      </p>
                    </div>
                    <div className="col-2">
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
                    <div className="col-2">
                      <h6 className="fs-14 mb-1">SMS</h6>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="check8"
                        />
                      </div>
                    </div>
                    <div className="col-2">
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
                  <div className="row mb-3 row-gap-3">
                    <div className="col-md-6">
                      <h6 className="fs-14 mb-1">Service Listing Updates</h6>
                      <p className="fs-14 fw-normal">
                        Get notified when your tour or activity listing is approved or rejected.
                      </p>
                    </div>
                    <div className="col-2">
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
                    <div className="col-2">
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
                    <div className="col-2">
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
                  <div className="row mb-3 row-gap-3">
                    <div className="col-md-6">
                      <h6 className="fs-14 mb-1">System Announcements</h6>
                      <p className="fs-14 fw-normal">
                        Platform updates, feature releases, and important dashboard notices.
                      </p>
                    </div>
                    <div className="col-2">
                      <h6 className="fs-14 mb-1">Push</h6>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="check13"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <h6 className="fs-14 mb-1">SMS</h6>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="check14"
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <h6 className="fs-14 mb-1">Email</h6>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="check15"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-end mt-3 pt-3 border-top">
                    <Link href="#" className="btn btn-light me-2">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                  {/* /Settings Content*/}
                </div>
              </div>
            </div>
            {/* /Profile Settings */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

    </>
  )
}

export default AgentNotificationSettings