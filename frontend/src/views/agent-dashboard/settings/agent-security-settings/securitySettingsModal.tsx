"use client";
import  { useState } from 'react'
import Link from "next/link";
import PhoneInput from 'react-phone-number-input'
type PasswordField = "password" | "confirmPassword" | "currentPassword";



const SecuritySettingsModal = () => {

    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
        currentPassword: false,
    });

    const togglePasswordVisibility = (field: PasswordField) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };


    const [value, setValue] = useState<string | undefined>(undefined);

    return (
        <>
            {/* Change password */}
            <div
                className="modal fade"
                id="changePassword"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Change Password</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form>
                            <div className="modal-body pb-0">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Current Password <span className="text-primary">*</span>{" "}
                                    </label>
                                    <div className="input-icon">
                                        <span className="input-icon-addon">
                                            <i className="isax isax-lock" />
                                        </span>
                                        <input
                                            type={
                                                passwordVisibility.currentPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="pass-input form-control"
                                            placeholder='Enter Password'
                                        />
                                        <span
                                            className={`isax toggle-passwords ${passwordVisibility.currentPassword
                                                ? "isax-eye"
                                                : "isax-eye-slash"
                                                }`}
                                            onClick={() =>
                                                togglePasswordVisibility("currentPassword")
                                            }
                                        ></span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        New Password <span className="text-primary">*</span>{" "}
                                    </label>
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
                                            placeholder='Enter Password'
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
                                <div className="mb-3">
                                    <label className="form-label">
                                        Confirm Password <span className="text-primary">*</span>{" "}
                                    </label>
                                    <div className="input-icon">
                                        <span className="input-icon-addon">
                                            <i className="isax isax-lock" />
                                        </span>
                                        <input
                                            type={
                                                passwordVisibility.confirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="pass-input form-control"
                                            placeholder='Enter Password'
                                        />
                                        <span
                                            className={`isax toggle-passwords ${passwordVisibility.confirmPassword
                                                ? "isax-eye"
                                                : "isax-eye-slash"
                                                }`}
                                            onClick={() =>
                                                togglePasswordVisibility("confirmPassword")
                                            }
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light btn-md"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <Link href="#" data-bs-dismiss="modal" className="btn btn-primary btn-md">
                                    Update Password
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Change password */}
            {/* Change Email */}
            <div
                className="modal fade"
                id="change-email"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Change Email</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form>
                            <div className="modal-body pb-0">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Current Email Address <span className="text-primary">*</span>{" "}
                                    </label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        New Email Address <span className="text-primary">*</span>{" "}
                                    </label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <p className="d-flex align-items-center fs-14">
                                        <i className="isax isax-info-circle me-1" />
                                        New email address only updated once you verified{" "}
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Current Password <span className="text-primary">*</span>{" "}
                                    </label>
                                    <div className="input-icon">
                                        <span className="input-icon-addon">
                                            <i className="isax isax-lock" />
                                        </span>
                                        <input
                                            type={
                                                passwordVisibility.currentPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="pass-input form-control"
                                            placeholder='Enter Password'
                                        />
                                        <span
                                            className={`isax toggle-passwords ${passwordVisibility.currentPassword
                                                ? "isax-eye"
                                                : "isax-eye-slash"
                                                }`}
                                            onClick={() =>
                                                togglePasswordVisibility("currentPassword")
                                            }
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light btn-md"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <Link href="#" data-bs-dismiss="modal" className="btn btn-primary btn-md">
                                    Save Changes
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Change Email */}
            {/* Change Phone */}
            <div
                className="modal fade"
                id="change-phone"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Change Phone Number</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form>
                            <div className="modal-body pb-0">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Current Phone Number <span className="text-primary">*</span>{" "}
                                    </label>
                                    <PhoneInput
                                        placeholder="(201) 555-0123"
                                        value={value}
                                        defaultCountry="US"
                                        onChange={setValue} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        New Phone Number <span className="text-primary">*</span>{" "}
                                    </label>
                                    <PhoneInput
                                        placeholder="(201) 555-0123"
                                        value={value}
                                        defaultCountry="US"
                                        onChange={setValue} />
                                </div>
                                <div className="mb-3">
                                    <p className="d-flex align-items-center fs-14">
                                        <i className="isax isax-info-circle me-1" />
                                        New Phone Number only updated once you verified{" "}
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Current Password <span className="text-primary">*</span>{" "}
                                    </label>
                                    <div className="input-icon">
                                        <span className="input-icon-addon">
                                            <i className="isax isax-lock" />
                                        </span>
                                        <input
                                            type={
                                                passwordVisibility.currentPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="pass-input form-control"
                                            placeholder='Enter Password'
                                        />
                                        <span
                                            className={`isax toggle-passwords ${passwordVisibility.currentPassword
                                                ? "isax-eye"
                                                : "isax-eye-slash"
                                                }`}
                                            onClick={() =>
                                                togglePasswordVisibility("currentPassword")
                                            }
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light btn-md"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <Link href="#" data-bs-dismiss="modal" className="btn btn-primary btn-md">
                                    Save Changes
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Change Phone */}
            {/* Account Activity */}
            <div
                className="modal fade"
                id="acc-activity"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Account Activity</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                                <table className="table border">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Date</th>
                                            <th>Device</th>
                                            <th>IP Address</th>
                                            <th>Location </th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>15 May 2025, 10:30 AM</td>
                                            <td>Chrome - Windows</td>
                                            <td>232.222.12.72</td>
                                            <td>New York / USA</td>
                                            <td>
                                                <span className="badge badge-success badge-xs rounded-pill d-inline-flex align-items-center">
                                                    <i className="ti ti-circle-filled fs-5 me-1" />
                                                    Connect
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>10 Apr 2025, 05:15 PM</td>
                                            <td>Safari Macos</td>
                                            <td>New York / USA</td>
                                            <td>224.111.12.75</td>
                                            <td>
                                                <span className="badge badge-success badge-xs rounded-pill d-inline-flex align-items-center">
                                                    <i className="ti ti-circle-filled fs-5 me-1" />
                                                    Connect
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>15 Mar 2025, 02:40 PM</td>
                                            <td>Firefox Windows</td>
                                            <td>111.222.13.28</td>
                                            <td>New York / USA</td>
                                            <td>
                                                <span className="badge badge-success badge-xs rounded-pill d-inline-flex align-items-center">
                                                    <i className="ti ti-circle-filled fs-5 me-1" />
                                                    Connect
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>15 Jan 2025, 08:00 AM</td>
                                            <td>Safari Macos</td>
                                            <td>333.555.10.54</td>
                                            <td>New York / USA</td>
                                            <td>
                                                <span className="badge badge-success badge-xs rounded-pill d-inline-flex align-items-center">
                                                    <i className="ti ti-circle-filled fs-5 me-1" />
                                                    Connect
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Account Activity */}
            {/* Device Management */}
            <div
                className="modal fade"
                id="device-management"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Device Management</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                                <table className="table border">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Device</th>
                                            <th>Date</th>
                                            <th>Location </th>
                                            <th>IP Address</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Chrome - Windows</td>
                                            <td>15 May 2025, 10:30 AM</td>
                                            <td>New York / USA</td>
                                            <td>232.222.12.72</td>
                                            <td>
                                                <Link href="#" className="link-default">
                                                    <i className="isax isax-trash" />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Safari Macos</td>
                                            <td>10 Apr 2025, 05:15 PM</td>
                                            <td>New York / USA</td>
                                            <td>224.111.12.75</td>
                                            <td>
                                                <Link href="#" className="link-default">
                                                    <i className="isax isax-trash" />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Firefox Windows</td>
                                            <td>15 Mar 2025, 02:40 PM</td>
                                            <td>New York / USA</td>
                                            <td>111.222.13.28</td>
                                            <td>
                                                <Link href="#" className="link-default">
                                                    <i className="isax isax-trash" />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Safari Macos</td>
                                            <td>15 Jan 2025, 08:00 AM</td>
                                            <td>New York / USA</td>
                                            <td>333.555.10.54</td>
                                            <td>
                                                <Link href="#" className="link-default">
                                                    <i className="isax isax-trash" />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Device Management */}
            {/* Delete Account */}
            <div
                className="modal fade"
                id="delete-account"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Delete Account</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <h6 className="mb-1">
                                Are you sure you want to delete your account?
                            </h6>
                            <p>
                                Refers to the action of permanently removing a user's account and
                                associated data from a system, service and platform.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light btn-md"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-md"
                                data-bs-toggle="modal"
                                data-bs-target="#del-acc"
                                data-bs-dismiss="modal"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Delete Account */}
            {/* Delete Account */}
            <div
                className="modal fade"
                id="del-acc"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Delete Account</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form >
                            <div className="modal-body">
                                <h6 className="mb-1">Why Are You Deleting Your Account?</h6>
                                <p className="mb-3">
                                    We're sorry to see you go! To help us improve, please let us know
                                    your reason for deleting your account
                                </p>
                                <div className="form-check d-flex mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="delete"
                                        id="del-acc1"
                                    />
                                    <label className="form-check-label fs-14 ms-2" htmlFor="del-acc1">
                                        <span className="text-gray-9 fw-medium">
                                            No longer using the service
                                        </span>
                                        <span className="d-block">
                                            I no longer need this service and won’t be using it in the
                                            future.
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check d-flex mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="delete"
                                        id="del-acc2"
                                    />
                                    <label className="form-check-label fs-14 ms-2" htmlFor="del-acc2">
                                        <span className="text-gray-9 fw-medium">Privacy concerns</span>
                                        <span className="d-block">
                                            I am concerned about how my data is handled and want to remove
                                            my information.
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check d-flex mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="delete"
                                        id="del-acc3"
                                    />
                                    <label className="form-check-label fs-14 ms-2" htmlFor="del-acc3">
                                        <span className="text-gray-9 fw-medium">
                                            Too many notifications/emails
                                        </span>
                                        <span className="d-block">
                                            I’m overwhelmed by the volume of notifications or emails and
                                            would like to reduce them.
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check d-flex mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="delete"
                                        id="del-acc4"
                                    />
                                    <label className="form-check-label fs-14 ms-2" htmlFor="del-acc4">
                                        <span className="text-gray-9 fw-medium">
                                            Poor user experience
                                        </span>
                                        <span className="d-block">
                                            I’ve had difficulty using the platform, and it didn’t meet my
                                            expectations.
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check d-flex mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="delete"
                                        id="del-acc5"
                                        defaultChecked
                                    />
                                    <label className="form-check-label fs-14 ms-2" htmlFor="del-acc5">
                                        <span className="text-gray-9 fw-medium">
                                            Other (Please specify)
                                        </span>
                                    </label>
                                </div>
                                <div className="ms-4">
                                    <textarea className="form-control" rows={3} defaultValue={""} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light btn-md"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <Link href="#" data-bs-dismiss="modal" className="btn btn-primary btn-md">
                                    Delete Account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Delete Account */}
        </>

    )
}

export default SecuritySettingsModal
