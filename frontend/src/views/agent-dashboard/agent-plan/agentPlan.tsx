"use client";
import  { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import CustomSelect from '../../../components/common-select/commonSelect';
import { CountryOption } from '../../../core/data/mock/selectOption';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import AgentPlantModal from './agentPlantModal';
import Link from "next/link";
type PasswordField = "password" | "confirmPassword";

const AgentPlan = () => {

    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Plans & Billings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Plans & Billings',
            active: true,
        },
    ];

    //PaymentDetails
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
            <Breadcrumb title="Plans & Billings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />



            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="mb-3">
                        <Link
                            href={routes.agentPlanSettings}
                            className="text-primary d-inline-flex align-items-center fs-14"
                        >
                            <i className="isax isax-arrow-left me-2" />
                            Back to Plans &amp; Billings
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card shadow-none">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5>Personal Info</h5>
                                    </div>
                                </div>
                                <div className="card-body pb-1">
                                    <div className="row gx-3">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Phone</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-none">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5>Billing Address</h5>
                                    </div>
                                </div>
                                <div className="card-body pb-1">
                                    <div className="row gx-3">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Address</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Country</label>
                                                <CustomSelect
                                                    options={CountryOption}
                                                    className="select d-flex"
                                                    placeholder="Select"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">State</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">City</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Postal Code</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card payment-details flex-fill">
                                <div className="card-header">
                                    <h5>Payment Method</h5>
                                </div>
                                <div className="card-body pb-1">
                                    <div className="tab-pane fade active show" id="wallet">
                                        <div className="d-flex align-items-center  flex-wrap mb-3">
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
                                        <div className="credit-card-details" style={{ display: paymentRadio === 'credit-card' ? 'block' : 'none' }}>
                                            <div className="card-form">
                                                <h6 className="mb-3">Payment With Credit Card</h6>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="mb-2">
                                                            <label className="form-label">Card Holder Name</label>
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
                                                <h6 className="fs-16">Payment With Paypal</h6>
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
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                <Link
                                    href="#"
                                    className="btn btn-primary btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#payment_success"
                                >
                                    Proceed to Pay $99.00
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 theiaStickySidebar">
                            <div className="card shadow-none">
                                <div className="card-header">
                                    <h5>Subscription Details</h5>
                                </div>
                                <div className="card-body">
                                    <div className="border rounded p-3">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <p className="mb-0">Plan Name:</p>
                                            <h6 className="fw-medium">Basic</h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <p className="mb-0">Plan Amount:</p>
                                            <h6 className="fw-medium">$99.00</h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <p className="mb-0">Tax:</p>
                                            <h6 className="fw-medium">$0.00</h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Total:</p>
                                            <h6 className="fw-medium">$99.00</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}


            <AgentPlantModal />
        </div>
    )
}

export default AgentPlan
