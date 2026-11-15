"use client";

import ImageWithBasePath from '../../../components/image-with-base-path'
import Link from "next/link";
import { all_routes } from '../../../routes/all_routes'

const Error500 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 overflow-auto flex-wrap">
  {/* Page Wrapper */}
  <div className="content">
    <div className="container">
      <div className="error-main-logo text-center">
        <ImageWithBasePath src="assets/img/logo-dark.svg" alt="Img" />
      </div>
      <div className="error-img text-center">
        <ImageWithBasePath src="assets/img/bg/error-500.svg" alt="Img" />
      </div>
      <div className="maintenance-update">
        <div className="text-center mb-3">
          <h5 className="mb-1">500- Oops! Internal Server Error</h5>
          <p className="text-gray-6">
            The server has been deserted for a while, please be patient or try
            again later
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Link
            href={all_routes.home1}
            className="btn btn-primary d-flex align-items-center justify-content-center"
          >
            <i className="isax isax-arrow-left-2 me-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* Page Wrapper */}
</div>

  )
}

export default Error500