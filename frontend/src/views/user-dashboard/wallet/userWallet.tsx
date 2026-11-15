"use client";
import { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../components/common-sidebar/sidebar';
import PredefinedDateRanges from '../../../components/common-date-picker/datePicker';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Link from "next/link";
type PasswordField = "password" | "confirmPassword";

const UserWallet = () => {

  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Wishlist',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Wishlist',
      active: true,
    },
  ];

  const [paymentRadio, setPaymentRadio] = useState('credit-card');

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div>
      <Breadcrumb
        title="Wishlist"
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
            {/* Wallet */}
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                {/* Wallet List */}
                <div className="col-xl-5 col-lg-12 d-flex">
                  <div className="row flex-fill">
                    <div className="col-xl-6 col-lg-6 col-md-6  d-flex">
                      <div className="card shadow-none mb-4 flex-fill">
                        <div className="card-body">
                          <span className="avatar avatar-lg rounded-circle bg-primary mb-3">
                            <i className="isax isax-calendar-15 text-white" />
                          </span>
                          <div className="mb-3">
                            <p className="mb-0 text-truncate line-ellipsis-2">
                              Wallet Balance
                            </p>
                            <h4>$4596</h4>
                          </div>
                          <p className="fs-14">
                            <span className="text-teal fw-medium">+8%</span> last
                            Month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6  d-flex">
                      <div className="card shadow-none mb-4 flex-fill">
                        <div className="card-body">
                          <span className="avatar avatar-lg rounded-circle bg-secondary mb-3">
                            <i className="isax isax-money-send5 text-white" />
                          </span>
                          <div className="mb-3">
                            <p className="mb-0 text-truncate line-ellipsis-2">
                              Total Credit
                            </p>
                            <h4>$15659</h4>
                          </div>
                          <p className="fs-14">
                            <span className="text-danger fw-medium">-6%</span> last
                            Month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6  d-flex">
                      <div className="card shadow-none mb-4 flex-fill">
                        <div className="card-body">
                          <span className="avatar avatar-lg rounded-circle bg-purple mb-3">
                            <i className="isax isax-money-time5 text-white" />
                          </span>
                          <div className="mb-3">
                            <h4>$16598</h4>
                            <p className="mb-0">Total Debit</p>
                          </div>
                          <p className="fs-14">
                            <span className="text-teal fw-medium">+9%</span> last
                            Month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6  d-flex">
                      <div className="card shadow-none mb-4 flex-fill">
                        <div className="card-body">
                          <span className="avatar avatar-lg rounded-circle bg-teal mb-3">
                            <i className="isax isax-money-time5 text-white" />
                          </span>
                          <div className="mb-3">
                            <h4>60</h4>
                            <p className="mb-0">Transactions</p>
                          </div>
                          <p className="fs-14">
                            <span className="text-teal fw-medium">+7%</span> last
                            Month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Wallet List */}
                {/* Wallet */}
                <div className="col-xl-7 col-lg-12 d-flex">
                  <div className="card payment-details flex-fill mb-4">
                    <div className="card-header">
                      <h5>Wallet</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Add Amount</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="tab-pane fade active show" id="wallet">
                        <div className="d-flex align-items-center  flex-wrap mb-1">
                          <h6 className="fs-16 me-3 mb-2">Payment Type</h6>
                          <div className="d-flex align-items-center flex-wrap payment-form">
                            <div className="form-check d-flex align-items-center me-3 mb-2">
                              <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="credit-card"
                                onChange={() => setPaymentRadio('credit-card')}
                                checked={paymentRadio === 'credit-card' ? true : false}
                              />
                              <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="credit-card"
                              >
                                Credit / Debit Card
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center me-3 mb-2">
                              <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="paypal"
                                onChange={() => setPaymentRadio('paypal')}
                                checked={paymentRadio === 'paypal' ? true : false}
                              />
                              <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="paypal"
                              >
                                Paypal
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center me-0 mb-2">
                              <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="stripe"
                                onChange={() => setPaymentRadio('stripe')}
                                checked={paymentRadio === 'stripe' ? true : false}
                              />
                              <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="stripe"
                              >
                                Stripe
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="credit-card-details " style={{ display: paymentRadio === 'credit-card' ? 'block' : 'none' }}>
                          <div className="card-form">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="mb-2">
                                  <label className="form-label">
                                    Card Holder Name
                                  </label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-user" />
                                    </span>
                                    <input type="email" className="form-control " />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-2">
                                  <label className="form-label">Card Number</label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-card-tick" />
                                    </span>
                                    <input type="email" className="form-control " />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">Expire Date</label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-calendar-2" />
                                    </span>
                                    <DatePicker
                                      className="form-control datetimepicker"
                                      placeholder="dd/mm/yyyy"
                                      format="DD-MM-YYYY"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">CVV</label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-check" />
                                    </span>
                                    <input type="email" className="form-control " />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Paypal */}
                        <div className="paypal-details" style={{ display: paymentRadio === 'paypal' ? 'block' : 'none' }}>
                          <div className="mb-3">
                            <h6 className="fs-16 ">Payment With Paypal</h6>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <div className="user-icon">
                                  <span className="input-icon fs-14">
                                    <i className="isax isax-sms" />
                                  </span>
                                  <input type="email" className="form-control " />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <div className="input-icon">
                                  <span className="input-icon-addon">
                                    <i className="isax isax-lock" />
                                  </span>
                                  <input
                                    type={
                                      passwordVisibility.password
                                        ? "text"
                                        : "password"
                                    }
                                    className="pass-input form-control"
                                  />
                                  <span
                                    className={`isax toggle-passwords ${passwordVisibility.password
                                      ? "isax-eye"
                                      : "isax-eye-slash"
                                      }`}
                                    onClick={() =>
                                      togglePasswordVisibility("password")
                                    }
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Paypal */}
                        {/* Stripe */}
                        <div className="stripe-details" style={{ display: paymentRadio === 'stripe' ? 'block' : 'none' }}>
                          <div className="mb-3">
                            <h6 className="fs-16">Payment With Stripe</h6>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <div className="user-icon">
                                  <span className="input-icon fs-14">
                                    <i className="isax isax-sms" />
                                  </span>
                                  <input type="email" className="form-control " />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <div className="input-icon">
                                  <span className="input-icon-addon">
                                    <i className="isax isax-lock" />
                                  </span>
                                  <input
                                    type={
                                      passwordVisibility.password
                                        ? "text"
                                        : "password"
                                    }
                                    className="pass-input form-control"
                                  />
                                  <span
                                    className={`isax toggle-passwords ${passwordVisibility.password
                                      ? "isax-eye"
                                      : "isax-eye-slash"
                                      }`}
                                    onClick={() =>
                                      togglePasswordVisibility("password")
                                    }
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Stripe */}
                        <div className="d-flex align-items-center justify-content-end">
                          <Link href="#" className="btn btn-primary">
                            Add Payment
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Wallet */}
              </div>
              {/* Transactions */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                    <div>
                      <h6>Transactions</h6>
                      <p className="fs-14">No of Transactions : 60</p>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                      <div className="input-icon-end position-relative">
                        <span className="input-icon-addon">
                          <i className="isax isax-calendar-edit" />
                        </span>
                        <PredefinedDateRanges />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Transactions */}
              {/* Transactions List */}
              <div className="card hotel-list mb-0">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6>Transactions List</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="input-icon-start  me-2 position-relative">
                        <span className="icon-addon">
                          <i className="isax isax-search-normal-1 fs-14" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                      <div className="dropdown me-3">
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
                              Completed
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
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th>Payment Type</th>
                          <th>Credit / Debit</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Balance</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-gray-9 fw-medium">Card</td>
                          <td>Debit</td>
                          <td>15 May 2025, 10:00 AM</td>
                          <td>
                            <span className="text-danger">-$256</span>
                          </td>
                          <td>$11,569</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-9 fw-medium">Paypal</td>
                          <td>Credit</td>
                          <td>20 May 2025, 11:20 AM</td>
                          <td>
                            <span className="text-success">+$3000</span>
                          </td>
                          <td>$11,569</td>
                          <td>
                            <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Pending
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-9 fw-medium">Stripe</td>
                          <td>Credit</td>
                          <td>22 May 2025, 02:40 PM</td>
                          <td>
                            <span className="text-success">+$4000</span>
                          </td>
                          <td>$12,497</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-9 fw-medium">Card</td>
                          <td>Debit</td>
                          <td>12 Jun 2025, 05:15 PM</td>
                          <td>
                            <span className="text-danger">-$600</span>
                          </td>
                          <td>$14,284</td>
                          <td>
                            <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Cancelled
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-gray-9 fw-medium">Card</td>
                          <td>Debit</td>
                          <td>17 Jun 2025, 09:30 AM</td>
                          <td>
                            <span className="text-success">+$11,569</span>
                          </td>
                          <td>$13,025</td>
                          <td>
                            <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                              <i className="fa-solid fa-circle fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* /Transactions List */}
            </div>
            {/* /Wallet */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}



    </div>
  )
}

export default UserWallet
