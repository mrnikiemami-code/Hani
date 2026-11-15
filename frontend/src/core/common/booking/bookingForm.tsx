import React, { useState } from 'react'
import CustomSelect from '../commonSelect';
import { AgeOption, CountryOption } from '../selectOption/json/selectOption';
import ImageWithBasePath from '../imageWithBasePath';
import PaymentModal from '@/components/hani/paymentSuccessfulModal';
import { all_routes } from '@/routes/all_routes';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ReactNode } from "react";
type PasswordField = "password" | "confirmPassword";

interface BookingFormProps {
  // extra cards rendered between "Secure Checkout" and "Coupon"
  afterCheckout?: ReactNode;
  // notice rendered inside "Payment Details", above its body
  paymentNotice?: ReactNode;
}

const BookingForm = ({ afterCheckout, paymentNotice }: BookingFormProps) => {
  const location = usePathname();
  const [addModal, setAddModal] = useState(false);
  const disabledDate = (current: any) => {
    return current && current < dayjs().startOf("day");
  };

  //PaymentDetails
  const [paymentRadio, setPaymentRadio] = useState('credit-card');

  const folderInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleOpenFolder = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click(); // Simulates a click on the file input
    }
  };

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
    <>
      {/* Checkout */}

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
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="checkout-title">
              <h6 className="mb-2">Traveler info</h6>
            </div>
            <div className="checkout-details">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <CustomSelect
                      options={AgeOption}
                      className="select d-flex"
                      placeholder="Select"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <CustomSelect
                      options={CountryOption}
                      className="select d-flex"
                      placeholder="Select"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">Address line 1</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">Address line 2</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label">Zip Code</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-0">
                    <label className="form-label">Additional Info</label>
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
      {afterCheckout}
      <div className="card coupoun coupoun-item">
        <div className="card-header">
          <h5>Coupon</h5>
        </div>
        <div className="card-body">
          <div>
            <div className="d-flex align-items-center mb-3">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Coupon Code"
              />
              <Link href="#" className="btn btn-primary flex-shrink-0">
                Apply Coupon
              </Link>
            </div>
            <div>
              <div className="coupoun-list mb-3">
                <p className="text-center">
                  Coupon Code <span className="text-gray-9"> Dreams25 ($50) </span>{" "}
                  has been applied successfully{" "}
                  <Link
                    href="#"
                    className=" ms-2 text-primary text-decoration-underline"
                  >
                    Remove
                  </Link>{" "}
                </p>
              </div>
              <div className="coupoun-list-two">
                <p className="text-center">
                  Code Invalid{" "}
                  <Link
                    href="#"
                    className=" ms-2 text-primary text-decoration-underline"
                  >
                    Close
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card payment-details">
        <div className="card-header">
          <h5>Payment Details</h5>
        </div>
        {paymentNotice}
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
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
              <div className="form-check d-flex align-items-center me-3 mb-2">
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
          {/* Credit Card */}
          <div className="credit-card-details" style={{ display: paymentRadio === 'credit-card' ? 'block' : 'none' }}>
            <div className="mb-3">
              <h6 className="fs-16 ">Payment With Credit Card</h6>
            </div>
            <div className="card-detials mb-3">
              <div className="row g-3">
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
                        <Link
                          href="#"
                          className="rounded-circle"
                        >
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
                          **** **** **** 2547
                        </p>
                      </div>
                      <div className="card-edit-icon">
                        <Link
                          href="#"
                          className="rounded-circle"
                        >
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
                        onClick={handleOpenFolder}
                      >
                        <span className="d-flex align-items-center justify-content-center">
                          <i className="isax isax-add" />
                        </span>
                      </Link>
                      <input
                        type="file"
                        id="folder-input"
                        className="file-input"
                        style={{ display: 'none' }}
                        ref={folderInputRef}
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
                    <label className="form-label">Card Holder Name</label>
                    <div className="user-icon">
                      <span className="input-icon fs-14">
                        <i className="isax isax-user" />
                      </span>
                      <input type="text" className="form-control " />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <div className="user-icon">
                      <span className="input-icon fs-14">
                        <i className="isax isax-card-tick" />
                      </span>
                      <input type="text" className="form-control " />
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
                        disabledDate={disabledDate}
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
                      <input type="text" className="form-control " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Credit Card */}
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
          <div className="d-flex align-items-center justify-content-end flex-wrap gap-2">
            <Link
              href="#"
              className="btn btn-primary"
              onClick={() => setAddModal(true)}
            >
              Confirm &amp; Pay $9569{" "}
            </Link>
          </div>
        </div>
      </div>
      <PaymentModal setAddModal={setAddModal}
        title={location.includes('cruise') ? 'Coral Cruiser - Balcony' :
          location.includes('tour') ? 'Rainbow Mountain Valley' :
            location.includes('flight') ? 'Econnomy Class' :
              location.includes('bus') ? 'Econnomy Class' :
                location.includes('car') ? 'Audi A3 2019' : 'Superior Twin'}
        link={location.includes('cruise') ? all_routes.cruiseBookingConfirmation :
          location.includes('tour') ? all_routes.tourBookingConfirmation :
            location.includes('flight') ? all_routes.flightBookingConfirmation :
              location.includes('bus') ? all_routes.busBookingConfirmation :
                location.includes('car') ? all_routes.carBookingConfirmation : all_routes.hotelBookingConfirmation}
        addModal={addModal} />
      {/* Checkout */}
    </>

  )
}

export default BookingForm
