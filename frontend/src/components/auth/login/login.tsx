"use client";

import  { useState } from 'react'
import Link from 'next/link'
import ImageWithBasePath from "@/core/imageWithBasePath";
import  {all_routes} from '@/routes/all_routes';

const LoginComponent = () => {

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const routes = all_routes;

  return (
    <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
      <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
        <div className="col-xxl-4 col-lg-6 col-md-6 col-11 mx-auto">
          <div className="p-4 text-center">
            <ImageWithBasePath src="assets/img/logo-dark.svg" alt="logo" className="img-fluid" />
          </div>
          <div className="card authentication-card">
            <div className="card-header">
              <div className="text-center">
                <h5 className="mb-1">Sign In</h5>
                <p>Sign in to Start Manage your DreamsTour Account</p>
              </div>
            </div>
            <div className="card-body">
              <form>
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
                      type={isPasswordVisible ? "text" : "password"}
                      className="pass-input form-control"
                       placeholder='Enter Password'
                    />
                    <span
                      className={`isax toggle-password ${isPasswordVisible ? "isax-eye" : "isax-eye-slash"
                        }`}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <div className="mt-3 mb-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                    <div className="form-check d-flex align-items-center mb-2">
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        defaultValue=""
                        id="remembers_me"
                      />
                      <label
                        className="form-check-label ms-2 text-gray-9 fs-14"
                        htmlFor="remembers_me"
                      >
                        Remember Me
                      </label>
                    </div>
                    <Link
                      href={all_routes.forgotPassword}
                      className="link-primary fw-medium fs-14 mb-2"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="mb-3">
                  <Link href={routes.home1}
                    type="submit"
                    className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100"
                  >
                    Login
                    <i className="isax isax-arrow-right-3 ms-2" />
                  </Link>
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
                    Don&apos;t you have an account?{" "}
                    <Link href={all_routes.register} className="link-primary fw-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginComponent