"use client";
import Link from "next/link";


const CouponsModal = () => {
  return (
    <>
      {/* Coupon Info */}
      <div className="modal fade" id="coupon-avaliable">
        <div className="modal-dialog  modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Coupon Info{" "}
                <span className="fs-14 fw-medium text-primary">Dream500</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1">Flat Discount on Dubai Tour Package</h6>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                      <i className="fa-solid fa-circle fs-5 me-1" />
                      Available
                    </span>
                  </div>
                </div>
                <div className="upcoming-details ">
                  <h6 className="mb-3">Coupon Details</h6>
                  <div className="row gy-3">
                    <div className="col-lg-4">
                      <h6 className="fs-14">Category</h6>
                      <p className="text-gray-6 fs-16 ">Tour Package</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Validity</h6>
                      <p className="text-gray-6 fs-16 ">40 days</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Discount</h6>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Coupon Info */}
      {/* Coupon Info */}
      <div className="modal fade" id="coupon-redeemed">
        <div className="modal-dialog  modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Coupon Info{" "}
                <span className="fs-14 fw-medium text-primary">Dream500</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1">Flat Discount on Dubai Tour Package</h6>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                      <i className="fa-solid fa-circle fs-5 me-1" />
                      Redeemed
                    </span>
                  </div>
                </div>
                <div className="upcoming-details ">
                  <h6 className="mb-3">Coupon Details</h6>
                  <div className="row gy-3">
                    <div className="col-lg-4">
                      <h6 className="fs-14">Category</h6>
                      <p className="text-gray-6 fs-16 ">Tour Package</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Validity</h6>
                      <p className="text-gray-6 fs-16 ">40 days</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Discount</h6>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Coupon Info */}
      {/* Coupon Info */}
      <div className="modal fade" id="coupon-expired">
        <div className="modal-dialog  modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Coupon Info{" "}
                <span className="fs-14 fw-medium text-primary">Dream500</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1">Flat Discount on Dubai Tour Package</h6>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
                      <i className="fa-solid fa-circle fs-5 me-1" />
                      Expired
                    </span>
                  </div>
                </div>
                <div className="upcoming-details ">
                  <h6 className="mb-3">Coupon Details</h6>
                  <div className="row gy-3">
                    <div className="col-lg-4">
                      <h6 className="fs-14">Category</h6>
                      <p className="text-gray-6 fs-16 ">Tour Package</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Validity</h6>
                      <p className="text-gray-6 fs-16 ">40 days</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Discount</h6>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Coupon Info */}
    </>

  )
}

export default CouponsModal