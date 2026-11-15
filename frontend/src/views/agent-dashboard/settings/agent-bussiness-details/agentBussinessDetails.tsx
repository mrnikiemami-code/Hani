"use client";
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../../components/image-with-base-path';
import Link from "next/link";
import Sidebar from '../../sidebar/sidebar';
import { bussinessExp, bussinessService, bussinessType, City, CountryOption, State } from '../../../../core/data/mock/selectOption';
import CustomSelect from '../../../../components/common-select/commonSelect';

const AgentBussinessDetails = () => {
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
                    <Link href={routes.agentBussinessDetails} className="active ps-3">
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
                    <Link href={routes.agentNotificationSettings}>
                      <i className="isax isax-notification me-2" />
                      Notifications
                    </Link>
                  </div>
                  {/* Settings Content */}
                  <form>
                    <div className="settings-content mb-3">
                      <h6 className="fs-16 mb-3">Basic Information</h6>
                      <div className="row gy-2 mb-3">
                        <div className="col-lg-12">
                          <div>
                            <label className="form-label">Business Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">Business Type</label>
                            <CustomSelect
                              options={bussinessType}
                              className="select"
                              placeholder="Select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">Owner Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">Phone Number</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <h6 className="fs-16 mb-3">Company Profile</h6>
                      <div className="row gy-2">
                        <div className="col-lg-12">
                          <div className="d-flex align-items-center">
                            <ImageWithBasePath
                              src="assets/img/bg/company.jpg"
                              alt="image"
                              className="img-fluid avatar avatar-xxl br-10 flex-shrink-0 me-3"
                            />
                            <div>
                              <p className="fs-14 text-gray-6 fw-normal mb-2">
                                Company Logo (400 x 400 pixels)
                              </p>
                              <div className="d-flex align-items-center">
                                <div className="me-2">
                                  <label
                                    className="upload-btn"
                                    htmlFor="fileUpload"
                                  >
                                    Upload
                                  </label>
                                  <input
                                    type="file"
                                    id="fileUpload"
                                    style={{ display: "none" }}
                                  />
                                </div>
                                <Link href="#" className="btn btn-light btn-md">
                                  Remove
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">Yeas of Experience</label>
                            <CustomSelect
                              options={bussinessExp}
                              className="select"
                              placeholder="Select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">
                              Primary Services Offered
                            </label>
                            <CustomSelect
                              options={bussinessService}
                              className="select"
                              placeholder="Select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div>
                            <label className="form-label">Description</label>
                            <textarea className="form-control" defaultValue={""} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="settings-content">
                      <h6 className="fs-16 mb-3">Address Information</h6>
                      <div className="row gy-2">
                        <div className="col-lg-12">
                          <div>
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">Country</label>
                            <CustomSelect
                              options={CountryOption}
                              className="select"
                              placeholder="Select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">State</label>
                            <CustomSelect
                              options={State}
                              className="select"
                              placeholder="Select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">City</label>
                            <CustomSelect
                              options={City}
                              className="select"
                              placeholder="Select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <label className="form-label">Postal Code</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end mt-3">
                      <Link href="#" className="btn btn-light me-2">
                        Cancel
                      </Link>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
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

export default AgentBussinessDetails