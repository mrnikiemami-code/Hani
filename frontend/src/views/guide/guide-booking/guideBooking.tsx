"use client";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import CustomSelect from "../../../components/common-select/commonSelect";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { ActivityCountry } from "../../../core/data/mock/selectOption";
import { all_routes } from "../../../routes/all_routes";
import { useState } from "react";
import Link from "next/link";
const GuideBooking = () => {


  const routes = all_routes;
  const [defaultDate] = useState(new Date());
  const [stepper, setStepper] = useState<string>('1');
  const [payment, setPayment] = useState<string>("card");
  const [password, setPassword] = useState<boolean[]>([]);
  const handleStepper = (id: string) => {
    setStepper(id);
  }
  const handlePayment = (id: string) => {
    setPayment(id);
  };
  const handlePassword = (i: number) => {
    setPassword((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Guide",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Our Guide",
      active: true,
    },
    {
      label: "Guide Booking",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Our Guide"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-09"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          {/* row start */}
          <div className="row">
            <div className="col-lg-4">
              <div className="card order-details guide-booking-card">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between header-content">
                    <h5>Review Guide Details</h5>
                    <Link
                      href={routes.guideDetails}
                      className="rounded-circle p-2 btn btn-light d-flex align-items-center justify-content-center"
                    >
                      <span className="fs-16 d-flex align-items-center justify-content-center">
                        <i className="isax isax-edit-2" />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="pb-3 border-bottom">
                    <div className="mb-3 text-center">
                      <ImageWithBasePath
                        src="assets/img/guide/guide-booking-img.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-2">Rainbow Mountain Valley</h6>
                        <p className="fs-14 ">Professional Travel Guide</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pb-3 border-bottom">
                    <div className="fs-18 text-dark fw-semibold mb-3">About me</div>
                    <p>
                      With over 8+ years of experience, I am a dedicated travel
                      guide committed to delivering personalized and memorable
                      journeys for travelers from around the world. I specialize in
                      adventure tours, cultural exploration, and nature-based
                      experiences, ensuring every trip is smooth, engaging, and
                      well-organized.
                    </p>
                  </div>
                  <div className="mt-3 pb-3 border-bottom">
                    <div className="fs-18 text-dark fw-semibold mb-3">
                      Order Info
                    </div>
                    <div className="d-flex align-items-center justify-content-between details-info">
                      <div className=" text-dark fw-medium">Departure</div>
                      <p className="fs-16">25 May 2025, 04:45 AM</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between details-info">
                      <div className=" text-dark fw-medium">Return</div>
                      <p className="fs-16">31 May 2025, 10:00 PM</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between details-info">
                      <div className=" text-dark fw-medium">Adults</div>
                      <p className="fs-16">20</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between details-info">
                      <div className=" text-dark fw-medium">Children</div>
                      <p className="fs-16">8</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between details-info">
                      <div className=" text-dark fw-medium">No of Days</div>
                      <p className="fs-16">4 Days, 3 Nights</p>
                    </div>
                  </div>
                  <div className="mt-3 border-bottom">
                    <div className="fs-18 text-dark fw-semibold mb-3">
                      Payment Info
                    </div>
                    <div className="coupoun-code mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon Code"
                      />
                      <Link href="#" className="btn btn-sm btn-primary">
                        Apply Coupon{" "}
                      </Link>
                    </div>
                    <div className="coupoun-list mb-3">
                      <p className="d-flex align-items-center justify-content-between">
                        <span className="text-success">Applied Successfully</span>{" "}
                        <Link href="#" className="text-remove ms-2">
                          Remove
                        </Link>{" "}
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className=" text-dark fw-medium">Sub Total</div>
                      <p className="fs-16">$8565</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className=" text-dark fw-medium">
                        Tax <span className="text-gray-6"> (10%)</span>
                      </div>
                      <p className="fs-16">$85</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className=" text-dark fw-medium">Booking Fees</div>
                      <p className="fs-16">$89</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className=" text-dark fw-medium">
                        Discount <span className="text-gray-6"> (10%)</span>
                      </div>
                      <p className="fs-16">-$20</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>Amount to Pay</h6>
                      <h6 className="text-primary">$8569</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 theiaStickySidebar">
              <div className="card">
                <div className="card-body">
                  <div className="wizard-container">
                    {/* STEP 1 */}
                    <div className={`step-content ${stepper === '1' ? 'active' : ''}`} data-step={1}>
                      <h2>Guide Booking Details</h2>
                      {/* Stepper */}
                      <div className="steps">
                        <div className={`step active ${stepper === '2' ? 'completed' : ''}`} data-step={1}>
                          <span>1</span> Basic Information
                        </div>
                        <div className="step" data-step={2}>
                          <span>2</span> Payment Details
                        </div>
                        <Link href={routes.guideBookingConfirmation} className="step">
                          <span>3</span> Confirmation
                        </Link>
                      </div>
                      <div className="card checkout-card">
                        <div className="card-header">
                          <h5>Secure Checkout</h5>
                        </div>
                        <div className="card-body">
                          <div>
                            <div className="checkout-title">
                              <h6 className="mb-2">Contact Info</h6>
                            </div>
                            <div className="checkout-details pb-2 border-bottom mb-4">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Email Address
                                    </label>
                                    <input type="email" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <CustomSelect
                                      options={ActivityCountry}
                                      className="select"
                                      placeholder="Select"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Phone Number
                                    </label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="checkout-title">
                              <h6 className="mb-2">Tour Information</h6>
                            </div>
                            <div className="checkout-details pb-2 border-bottom mb-4">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">Tour Type</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Preferred Date
                                    </label>
                                    <div className="input-icon-end position-relative">
                                      <DatePicker
                                        className="form-control datetimepicker"
                                        placeholder="dd/mm/yyyy"
                                        defaultValue={defaultDate}
                                        format="DD-MM-YYYY"
                                      />
                                      <span className="input-icon-addon">
                                        <i className="isax isax-calendar" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">Time slots</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      No of Travellers
                                    </label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="checkout-title">
                              <h6 className="mb-2">Location Details</h6>
                            </div>
                            <div className="checkout-details">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Pickup Location
                                    </label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Destination / Tour Area
                                    </label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="mb-0">
                                    <label className="form-label">
                                      Additional Info
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows={4}
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <button className="btn btn-primary next-step d-inline-flex align-items-center gap-1"
                          onClick={() => handleStepper('2')}>
                          Proceed to Payment{" "}
                          <i className="isax isax-arrow-right-3 ms-1" />
                        </button>
                      </div>
                    </div>
                    {/* STEP 2 */}
                    <div className={`step-content  ${stepper === '2' ? 'active' : ''}`} data-step={2}>
                      <h2>Secure Checkout</h2>
                      {/* Stepper */}
                      <div className="steps">
                        <div className={`step active ${stepper === '2' ? 'completed' : ''}`} data-step={1}>
                          <span>1</span> Basic Information
                        </div>
                        <div className={`step ${stepper === '2' ? 'active' : ''}`} data-step={2}>
                          <span>2</span> Payment Details
                        </div>
                        <Link href={routes.guideBookingConfirmation} className="step">
                          <span>3</span> Confirmation
                        </Link>
                      </div>
                      <div className="card payment-details">
                        <div className="card-header">
                          <h5>Payment Details</h5>
                        </div>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                            <div className="d-flex align-items-center flex-wrap payment-form">
                              <div className="form-check d-flex align-items-center me-3 mb-2">
                                <input
                                  className="form-check-input mt-0"
                                  type="radio"
                                  name="Radio"
                                  id="credit-card"
                                  defaultValue="credit-card"
                                  defaultChecked
                                  onClick={() => {
                                    handlePayment("card");
                                  }}
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
                                  defaultValue="paypal"
                                  onClick={() => {
                                    handlePayment("paypal");
                                  }}
                                />
                                <label
                                  className="form-check-label fs-14 ms-2"
                                  htmlFor="paypal"
                                >
                                  Paypal
                                </label>
                              </div>
                              <div className="form-check d-flex align-items-center me-3 mb-2">
                                <input
                                  className="form-check-input mt-0"
                                  type="radio"
                                  name="Radio"
                                  id="stripe"
                                  defaultValue="stripe"
                                  onClick={() => {
                                    handlePayment("stripe");
                                  }}
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
                          {/* Credit Card */}
                          <div
                            className="credit-card-details"
                            style={{
                              display: payment === "card" ? "block" : "none",
                            }}
                          >
                            <div className="mb-3">
                              <h6 className="fs-16 ">
                                Payment With Credit Card
                              </h6>
                            </div>
                            <div className="card-detials mb-3">
                              <div className="row g-3 align-items-center">
                                <div className="col-lg-4 d-flex">
                                  <div className="card-content flex-fill">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                      <div>
                                        <ImageWithBasePath
                                          src="assets/img/icons/visa.svg"
                                          alt="image"
                                          className="img-fluid mb-2"
                                        />
                                        <p className="fs-16 fw-medium text-gray-6">
                                          **** **** **** 2547
                                        </p>
                                      </div>
                                      <div className="card-edit-icon">
                                        <Link href="#" className="rounded-circle">
                                          {" "}
                                          <span className=" d-flex align-items-center justify-content-center fs-14">
                                            <i className="isax isax-edit-2" />
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="fs-14 mb-1">Expiry</h6>
                                      <span className="fs-14 fw-normal text-gray-6">
                                        May 2026
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 d-flex">
                                  <div className="card-content flex-fill">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                      <div>
                                        <ImageWithBasePath
                                          src="assets/img/icons/visa-2.svg"
                                          alt="image"
                                          className="img-fluid mb-2"
                                        />
                                        <p className="fs-16 fw-medium text-gray-6">
                                          **** **** **** 3256
                                        </p>
                                      </div>
                                      <div className="card-edit-icon">
                                        <Link href="#" className="rounded-circle">
                                          {" "}
                                          <span className=" d-flex align-items-center justify-content-center fs-14">
                                            <i className="isax isax-edit-2" />
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="fs-14 mb-1">Expiry</h6>
                                      <span className="fs-14 fw-normal text-gray-6">
                                        May 2026
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 d-flex">
                                  <div className="card-add flex-fill d-flex align-items-center justify-content-center">
                                    <div className="add-option d-flex align-items-center justify-content-center">
                                      <Link
                                        href="#"
                                        id="open-folder"
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                      >
                                        <span className="d-flex align-items-center justify-content-center">
                                          <i className="isax isax-add" />
                                        </span>
                                      </Link>
                                      <input
                                        type="file"
                                        id="folder-input"
                                        className="file-input"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-form">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Card Holder Name
                                    </label>
                                    <div className="user-icon">
                                      <span className="input-icon fs-14">
                                        <i className="isax isax-user" />
                                      </span>
                                      <input
                                        type="text"
                                        className="form-control "
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Card Number
                                    </label>
                                    <div className="user-icon">
                                      <span className="input-icon fs-14">
                                        <i className="isax isax-card-tick" />
                                      </span>
                                      <input
                                        type="text"
                                        className="form-control "
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Expire Date
                                    </label>
                                    <div className="user-icon">
                                      <span className="input-icon fs-14">
                                        <i className="isax isax-calendar-2" />
                                      </span>
                                      <input
                                        type="text"
                                        className="form-control "
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
                                      <input
                                        type="text"
                                        className="form-control "
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Credit Card */}
                          {/* Paypal */}
                          <div
                            className="paypal-details"
                            style={{
                              display: payment === "paypal" ? "block" : "none",
                            }}
                          >
                            <div className="mb-3">
                              <h6 className="fs-16 ">Payment With Paypal</h6>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Email Address
                                  </label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-sms" />
                                    </span>
                                    <input
                                      type="email"
                                      className="form-control "
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">Password</label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-lock" />
                                    </span>
                                    <input
                                      type={`${password[1] ? "text" : "password"}`}
                                      className="form-control pass-input"
                                    />
                                    <span
                                      className="input-icon toggle-password fs-14"
                                      onClick={() => handlePassword(1)}
                                    >
                                      <i
                                        className={`isax ${password[1] ? "isax-eye" : "isax-eye-slash"}`}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Paypal */}
                          {/* Stripe */}
                          <div
                            className="stripe-details"
                            style={{
                              display: payment === "stripe" ? "block" : "none",
                            }}
                          >
                            <div className="mb-3">
                              <h6 className="fs-16 ">Payment With Stripe</h6>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Email Address
                                  </label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-sms" />
                                    </span>
                                    <input
                                      type="email"
                                      className="form-control "
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">Password</label>
                                  <div className="user-icon">
                                    <span className="input-icon fs-14">
                                      <i className="isax isax-lock" />
                                    </span>
                                    <input
                                      type={`${password[2] ? "text" : "password"}`}
                                      className="form-control pass-input"
                                    />
                                    <span
                                      className="input-icon toggle-password fs-14"
                                      onClick={() => handlePassword(2)}
                                    >
                                      <i
                                        className={`isax ${password[2] ? "isax-eye" : "isax-eye-slash"}`}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /Stripe */}
                        </div>
                      </div>
                      <div className="actions d-flex align-items-center justify-content-between">
                        <button className="btn btn-light prev-step d-flex align-items-center gap-1" onClick={() => handleStepper('1')}>
                          <i className="isax isax-arrow-left-2" /> Back to
                          Information
                        </button>
                        <Link
                          href={routes.guideBookingConfirmation}
                          className="btn btn-primary"
                        >
                          Confirm &amp; Pay $9569
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  )
}

export default GuideBooking