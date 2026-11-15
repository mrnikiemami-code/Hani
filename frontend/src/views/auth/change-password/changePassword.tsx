"use client";
import  {  useState } from 'react'
import ImageWithBasePath from '../../../components/image-with-base-path'
import { all_routes } from '../../../routes/all_routes';
import Link from "next/link";
type PasswordField = "password" | "confirmPassword";

const ChangePassword = () => {
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
    <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
      <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-11 mx-auto">
          <div className="p-4 text-center">
            <ImageWithBasePath src="assets/img/logo-dark.svg" alt="logo" className="img-fluid" />
          </div>
          <div className="card authentication-card">
            <div className="card-header">
              <div className="text-center">
                <h5 className="mb-1">Change Password</h5>
                <p>Enter Details to Change Password</p>
              </div>
            </div>
            <div className="card-body">
              <form >
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
                <div className="mb-4">
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
                <div className="mb-0">
                  <Link href={all_routes.login}
                    type="submit"
                    className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100"
                  >
                    Change Password
                    <i className="isax isax-arrow-right-3 ms-2" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ChangePassword