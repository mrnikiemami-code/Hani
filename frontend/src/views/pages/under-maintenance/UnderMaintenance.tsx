"use client";

import ImageWithBasePath from '../../../components/image-with-base-path'
import Link from "next/link";

const UnderMaintenance = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 overflow-auto flex-wrap">
    {/* Page Wrapper */}
    <div className="content">
      <div className="container">
        <div className="main-logo text-center">
          <ImageWithBasePath src="assets/img/logo-dark.svg" alt="Img" />
        </div>
        <div className="maintenance-img text-center">
          <ImageWithBasePath src="assets/img/under-maintenance.svg" alt="Img" />
        </div>
        <div className="maintenance-update">
          <div className="text-center">
            <div className="row justify-content-center mb-3">
              <div className="col-md-7">
                <p className="text-gray-6 text-center">
                  Please check back later, We are working hard to get everything
                  just right.
                </p>
              </div>
            </div>
            <h6 className="fs-14 mb-3">Subscribe to get notified</h6>
          </div>
          <div className="input-group justify-content-center mx-auto mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
            />
            <button type="submit" className="btn btn-primary rounded-pill">
              Subscribe
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <ul className="d-flex justify-content-center align-items-center">
              <li>
                <Link
                  href="#"
                  className="bg-primary avatar avatar-md rounded-circle text-white me-2"
                >
                  <i className="fa-brands fa-facebook fs-16" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-primary avatar avatar-md rounded-circle text-white me-2"
                >
                  <i className="fa-brands fa-x-twitter fs-16" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-primary avatar avatar-md rounded-circle text-white me-2"
                >
                  <i className="fa-brands fa-instagram fs-16" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="bg-primary avatar avatar-md rounded-circle text-white me-2"
                >
                  <i className="fa-brands fa-linkedin fs-16" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* Page Wrapper */}
  </div>
  

  )
}

export default UnderMaintenance