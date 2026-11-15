"use client";
import  {  useState } from 'react'
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path'
import { all_routes } from '../../../routes/all_routes';
type PasswordField = "password" | "confirmPassword";

const Register = () => {

  const routes = all_routes
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
      {/* Register */}
      <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
          <div className="col-xxl-4 col-lg-6 col-md-6 col-11 mx-auto">
            <div className="p-4 text-center">
              <ImageWithBasePath
                src="assets/img/logo-dark.svg"
                alt="logo"
                className="img-fluid"
              />
            </div>
            <div className="card authentication-card">
              <div className="card-header">
                <div className="text-center">
                  <h5 className="mb-1">Sign Up</h5>
                  <p>Create your DreamsTour Account</p>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <i className="isax isax-user" />
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Full Name"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <i className="isax isax-message" />
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
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
                    <label className="form-label">Confirm Password</label>
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
                  <div className="mt-3 mb-3">
                    <div className="d-flex">
                      <div className="form-check d-flex align-items-center mb-2">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          defaultValue=""
                          id="agree"
                        />
                        <label
                          className="form-check-label ms-2 text-gray-9 fs-14"
                          htmlFor="agree"
                        >
                          I agree with the&nbsp;
                          <Link
                            href={routes.termsConditions}
                            className="link-primary fw-medium"
                          >
                            Terms Of Service.
                          </Link>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100"
                    >
                      Register
                      <i className="isax isax-arrow-right-3 ms-2" />
                    </button>
                  </div>
                  <div className="login-or mb-3">
                    <span className="span-or">Or</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Link
                      href="#"
                      className="btn btn-light flex-fill d-flex align-items-center justify-content-center me-2"
                    >
                      <ImageWithBasePath
                        src="assets/img/icons/google-icon.svg"
                        className="me-2"
                        alt="Img"
                      />
                      Google
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                    >
                      <ImageWithBasePath
                        src="assets/img/icons/fb-icon.svg"
                        className="me-2"
                        alt="Img"
                      />
                      Facebook
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center">
                    <p className="fs-14">
                      Already have an account?{" "}
                      <Link href={all_routes.login} className="link-primary fw-medium">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Register */}
    </>

  )
}

export default Register