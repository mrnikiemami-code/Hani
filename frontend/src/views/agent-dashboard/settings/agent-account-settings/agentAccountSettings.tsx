"use client";
import  { useState } from 'react'
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../../components/image-with-base-path';
import Sidebar from '../../sidebar/sidebar';
import { InputOtp } from 'primereact/inputotp';

const AgentAccountSettings = () => {

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


  const [isSelected, setIsSelected] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };
  const handleClick2 = () => {
    setIsSelected2(!isSelected2);
  };
  const handleClick3 = () => {
    setIsSelected3(!isSelected3);
  };

  return (
    <div>
      <Breadcrumb title="Settings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
      <>
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
                      <Link href={routes.agentSettings} >
                        <i className="isax isax-user-octagon me-2" />
                        Edit Profile
                      </Link>
                      <Link href={routes.agentBussinessDetails}>
                                            <i className="isax isax-buildings-2 me-2" />
                                            Bussiness Details
                                        </Link>
                      <Link href={routes.agentAccountSettings} className="active ps-3">
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
                      <Link href={routes.agentNotificationSettings}>
                                            <i className="isax isax-notification me-2" />
                                            Notifications
                                        </Link>
                    </div>
                    <div>
                      <div>
                        <h6 className="mb-3">Two-factor authentication</h6>
                      </div>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="card shadow-none bg-gray-transparent">
                            <div className="card-body">
                              <div className="border-bottom mb-3 pb-3">
                                <h6 className="fw-medium mb-1">
                                  Set up using an Email
                                </h6>
                                <p className="fs-14">
                                  Enter your email which we send you code
                                </p>
                              </div>
                              <form >
                                <div className="d-flex align-items-end flex-wrap flex-sm-nowrap row-gap-3">
                                  <div className="flex-fill">
                                    <label className="form-label">
                                      Email Address
                                    </label>
                                    <input type="text" className="form-control" />
                                  </div>
                                  <div className="ms-2 mb-2">
                                    <Link href="#" className="btn btn-primary btn-sm">
                                      Send Code
                                    </Link>
                                  </div>
                                </div>
                                <div className="digit-group">
                                  <label className="form-label">
                                    Enter the code generated by Email
                                  </label>
                                  <div className="d-flex align-items-center flex-wrap row-gap-3 mb-2">
                                    <InputOtp length={6} className="app-otp" />
                                  </div>
                                </div>
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="card shadow-none bg-gray-transparent">
                            <div className="card-body">
                              <div className="border-bottom mb-3 pb-3">
                                <h6 className="fw-medium mb-1">
                                  Set up using an SMS
                                </h6>
                                <p className="fs-14">
                                  Enter your phone number which we send you code
                                </p>
                              </div>
                              <form>
                                <div className="d-flex align-items-end flex-wrap flex-sm-nowrap row-gap-3">
                                  <div className="flex-fill">
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                  <div className="ms-2 mb-2">
                                    <Link href="#" className="btn btn-primary btn-sm">
                                      Send Code
                                    </Link>
                                  </div>
                                </div>
                                <div className="digit-group">
                                  <label className="form-label">
                                    Enter the code generated by SMS
                                  </label>
                                  <div className="d-flex align-items-center flex-wrap row-gap-3 mb-2">

                                    <InputOtp length={6} className="app-otp" />
                                  </div>
                                </div>
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none bg-gray-transparent">
                        <div className="card-header">
                          <h6 className="mb-1 fw-medium">Linked Account</h6>
                          <p className="fs-14">
                            Effortlessly connect and manage accounts
                          </p>
                        </div>
                        <div className="card-body link-account">
                          <div className="row g-3">
                            <div className="col-xl-4 col-lg-6 d-flex">
                              <div className={`card integration-card flex-fill mb-0 ${isSelected ? 'selected' : ''}`} onClick={handleClick}>

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
                                      <span className="btn bg-light btn-sm">
                                        Invoke
                                      </span>
                                    </div>
                                    <div>
                                      <p className="fs-14">
                                        Used to find travel destinations,
                                        accommodations &amp; reviews with ease.
                                      </p>
                                    </div>
                                    <span className="circle-check-top">
                                      <i className="isax isax-tick-circle5 fs-24 text-success" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 d-flex">
                              <div className={`card integration-card flex-fill mb-0 ${isSelected2 ? 'selected' : ''}`} onClick={handleClick2}>
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
                                      <span className="btn bg-light btn-sm">
                                        Connect
                                      </span>
                                    </div>
                                    <div>
                                      <p className="fs-14">
                                        Receive reminders for upcoming trips,
                                        reservations, and itinerary updates
                                      </p>
                                    </div>
                                    <span className="circle-check-top">
                                      <i className="isax isax-tick-circle5 fs-24 text-success" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 d-flex">
                              <div className={`card integration-card flex-fill mb-0 ${isSelected3 ? 'selected' : ''}`} onClick={handleClick3}>
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
                                      <span className="btn bg-light btn-sm">
                                        Connect
                                      </span>
                                    </div>
                                    <div>
                                      <p className="fs-14">
                                        Provides users with precise directions to
                                        destinations and nearby attractions.
                                      </p>
                                    </div>
                                    <span className="circle-check-top">
                                      <i className="isax isax-tick-circle5 fs-24 text-success" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none bg-gray-transparent">
                        <div className="card-header">
                          <h6 className="mb-1 fw-medium">Social Media Profile</h6>
                          <p className="fs-14">
                            Effortlessly connect and manage accounts
                          </p>
                        </div>
                        <div className="card-body link-account">
                          <div className="row g-3">
                            <div className="col-sm-6">
                              <div>
                                <label className="form-label">Facebook</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div>
                                <label className="form-label">Twitter</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div>
                                <label className="form-label">Instagram</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div>
                                <label className="form-label">Youtube</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end">
                        <Link href="#" className="btn btn-light btn-sm me-2">
                          Cancel
                        </Link>
                        <Link href="#" className="btn btn-primary btn-sm">
                          Save
                        </Link>
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
      </>


    </div>
  )
}

export default AgentAccountSettings
