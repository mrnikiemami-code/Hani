"use client";

import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path'
import { all_routes } from '../../../routes/all_routes';


const ForgotPassword = () => {
 
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
                <h5 className="mb-1">Forgot Password</h5>
                <p>Reset Your DreamsTour Password</p>
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
                <div className="mb-4">
                  <p className="text-success">
                    <i className="isax isax-tick-circle5 me-1" />
                    Reset Password Sent to “adrian@example.com”
                  </p>
                </div>
                <div className="mb-3">
                  <Link href={all_routes.changepassword}
                    type="submit"
                    className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100"
                  >
                    Reset Password
                    <i className="isax isax-arrow-right-3 ms-2" />
                  </Link>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="fs-14">
                    Remember Password ?{" "}
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


  )
}

export default ForgotPassword