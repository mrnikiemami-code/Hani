"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";

const PricingPlanTwo = () => {
  const routes = all_routes
  const breadcrumbs = [
    {
      label: 'Pricing Plan Two',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Pages',
      active: false,
    },
    {
      label: 'Pricing Plan Two',
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb title="Pricing Plan Two" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="header-section text-center mb-4">
                <h2 className="mb-2">Choose Your Perfect Travel Package</h2>
                <p>
                  Choose flexible one-time, monthly, or annual travel plans for
                  uninterrupted access to exclusive deals on flights, hotels, and
                  tours
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="place-nav pricing-plan-tab">
              <div className="nav justify-content-center">
                <div className="tab-btn d-flex align-items-center">
                  <div>
                    <Link
                      href="#"
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#pricing-list-01"
                    >
                      Monthly
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#pricing-list-02"
                    >
                      Yearly
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-content">
              {/* Pricing Plan List */}
              <div className="tab-pane fade active show" id="pricing-list-01">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive  pt-3">
                      <table className="table pricing-table">
                        {/* Plans Header */}
                        <thead>
                          <tr>
                            <th className="text-start" />
                            <th>
                              <div className="pricing-plan">
                                <div className="pricing-head">
                                  <div className="pricing-contet">
                                    <h6 className="fw-bold">Basic Plan</h6>
                                    <p>
                                      For casual travelers who just need simple
                                      bookings.
                                    </p>
                                    <h4 className="fw-bold">
                                      $99{" "}
                                      <span className="text-muted">/ monthly</span>
                                    </h4>
                                  </div>
                                  <Link href="#" className="btn btn-dark mt-2 w-100">
                                    Choose Plan{" "}
                                    <i className="isax isax-arrow-right-3 ms-1" />
                                  </Link>
                                </div>
                              </div>
                            </th>
                            <th className="position-relative">
                              <div className="pricing-plan">
                                <div className="pricing-head">
                                  <div className="pricing-contet">
                                    <h6 className="fw-bold">Premium Plan</h6>
                                    <p>
                                      For casual travelers who just need simple
                                      bookings.
                                    </p>
                                    <h4 className="fw-bold">
                                      $199{" "}
                                      <span className="text-muted">/ monthly</span>
                                    </h4>
                                  </div>
                                  <Link href="#" className="btn btn-dark mt-2 w-100">
                                    Choose Plan{" "}
                                    <i className="isax isax-arrow-right-3 ms-1" />
                                  </Link>
                                </div>
                              </div>
                              <div className="recommeded-set">
                                <span>Recommended</span>
                              </div>
                            </th>
                            <th>
                              <div className="pricing-plan">
                                <div className="pricing-head">
                                  <div className="pricing-contet">
                                    <h6 className="fw-bold">Business Plan</h6>
                                    <p>
                                      Tailored for business travelers with high
                                      demands.
                                    </p>
                                    <h4 className="fw-bold">
                                      $299{" "}
                                      <span className="text-muted">/ monthly</span>
                                    </h4>
                                  </div>
                                  <Link href="#" className="btn btn-dark mt-2 w-100">
                                    Choose Plan{" "}
                                    <i className="isax isax-arrow-right-3 ms-1" />
                                  </Link>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Overview Section */}
                          <tr className="table-secondary">
                            <td colSpan={4} className="text-start fw-bold">
                              Overview
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Build for industry</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Stakeholders</td>
                            <td>
                              <span className="pricing-cross">
                                <i className="isax isax-close-circle5 text-danger" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Pricing option</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Project module</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Mobile App Ready</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Unlimited users</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          {/* Experience & Support */}
                          <tr className="table-secondary">
                            <td
                              colSpan={4}
                              className="text-start bg-white pt-3 fw-bold"
                            >
                              Experience &amp; Support
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Professional tool path</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Integration Support</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Customization</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">24/7 Support</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Free updates</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Pricing Plan List */}
              {/* Pricing Plan List */}
              <div className="tab-pane fade " id="pricing-list-02">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive  pt-3">
                      <table className="table pricing-table">
                        {/* Plans Header */}
                        <thead>
                          <tr>
                            <th className="text-start" />
                            <th>
                              <div className="pricing-plan">
                                <div className="pricing-head">
                                  <div className="pricing-contet">
                                    <h6 className="fw-bold">Basic Plan</h6>
                                    <p>
                                      For casual travelers who just need simple
                                      bookings.
                                    </p>
                                    <h4 className="fw-bold">
                                      $499{" "}
                                      <span className="text-muted">/ yearly</span>
                                    </h4>
                                  </div>
                                  <Link href="#" className="btn btn-dark mt-2 w-100">
                                    Choose Plan{" "}
                                    <i className="isax isax-arrow-right-3 ms-1" />
                                  </Link>
                                </div>
                              </div>
                            </th>
                            <th className="position-relative">
                              <div className="pricing-plan">
                                <div className="pricing-head">
                                  <div className="pricing-contet">
                                    <h6 className="fw-bold">Premium Plan</h6>
                                    <p>
                                      For casual travelers who just need simple
                                      bookings.
                                    </p>
                                    <h4 className="fw-bold">
                                      $799{" "}
                                      <span className="text-muted">/ yearly</span>
                                    </h4>
                                  </div>
                                  <Link href="#" className="btn btn-dark mt-2 w-100">
                                    Choose Plan{" "}
                                    <i className="isax isax-arrow-right-3 ms-1" />
                                  </Link>
                                </div>
                              </div>
                              <div className="recommeded-set">
                                <span>Recommended</span>
                              </div>
                            </th>
                            <th>
                              <div className="pricing-plan">
                                <div className="pricing-head">
                                  <div className="pricing-contet">
                                    <h6 className="fw-bold">Business Plan</h6>
                                    <p>
                                      Tailored for business travelers with high
                                      demands.
                                    </p>
                                    <h4 className="fw-bold">
                                      $999{" "}
                                      <span className="text-muted">/ yearly</span>
                                    </h4>
                                  </div>
                                  <Link href="#" className="btn btn-dark mt-2 w-100">
                                    Choose Plan{" "}
                                    <i className="isax isax-arrow-right-3 ms-1" />
                                  </Link>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Overview Section */}
                          <tr className="table-secondary">
                            <td colSpan={4} className="text-start fw-bold">
                              Overview
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Build for industry</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Stakeholders</td>
                            <td>
                              <span className="pricing-cross">
                                <i className="isax isax-close-circle5 text-danger" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Pricing option</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Project module</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Mobile App Ready</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Unlimited users</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          {/* Experience & Support */}
                          <tr className="table-secondary">
                            <td
                              colSpan={4}
                              className="text-start bg-white pt-3 fw-bold"
                            >
                              Experience &amp; Support
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Professional tool path</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Integration Support</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Customization</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">24/7 Support</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-start">Free updates</td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                            <td>
                              <span className="pricing-check">
                                <i className="isax isax-tick-circle5 text-success" />
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Pricing Plan List */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>


  )
}

export default PricingPlanTwo;