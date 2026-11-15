"use client";
import Link from "next/link";


const ReferralProgramModal = () => {
  return (
    <>
      {/* Coupon Info */}
      <div className="modal fade" id="confirmed">
        <div className="modal-dialog  modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Referral Info{" "}
                <span className="fs-14 fw-medium text-primary">REF-1021</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1">Jocab Jones</h6>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                      <i className="fa-solid fa-circle fs-5 me-1" />
                      Confirmed
                    </span>
                  </div>
                </div>
                <div className="upcoming-details ">
                  <h6 className="mb-3">Referral Details</h6>
                  <div className="row gy-3">
                    <div className="col-lg-4">
                      <h6 className="fs-14">Issued Date</h6>
                      <p className="text-gray-6 fs-16 ">20 May 2026</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Referral User</h6>
                      <p className="text-gray-6 fs-16 ">Jocab Jones</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Reward Value</h6>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Link
                href="#"
                className="btn btn-md btn-primary"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* /Coupon Info */}
      {/* Coupon Info */}
      <div className="modal fade" id="rewarded">
        <div className="modal-dialog  modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Referral Info{" "}
                <span className="fs-14 fw-medium text-primary">REF-1021</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1">Jocab Jones</h6>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-primary rounded-pill d-inline-flex align-items-center fs-10">
                      <i className="fa-solid fa-circle fs-5 me-1" />
                      Rewarded
                    </span>
                  </div>
                </div>
                <div className="upcoming-details ">
                  <h6 className="mb-3">Referral Details</h6>
                  <div className="row gy-3">
                    <div className="col-lg-4">
                      <h6 className="fs-14">Issued Date</h6>
                      <p className="text-gray-6 fs-16 ">20 May 2026</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Referral User</h6>
                      <p className="text-gray-6 fs-16 ">Jocab Jones</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Reward Value</h6>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Link
                href="#"
                className="btn btn-md btn-primary"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* /Coupon Info */}
      {/* Coupon Info */}
      <div className="modal fade" id="pending">
        <div className="modal-dialog  modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Referral Info{" "}
                <span className="fs-14 fw-medium text-primary">REF-1021</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1">Jocab Jones</h6>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                      <i className="fa-solid fa-circle fs-5 me-1" />
                      Pending
                    </span>
                  </div>
                </div>
                <div className="upcoming-details ">
                  <h6 className="mb-3">Referral Details</h6>
                  <div className="row gy-3">
                    <div className="col-lg-4">
                      <h6 className="fs-14">Issued Date</h6>
                      <p className="text-gray-6 fs-16 ">20 May 2026</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Referral User</h6>
                      <p className="text-gray-6 fs-16 ">Jocab Jones</p>
                    </div>
                    <div className="col-lg-4">
                      <h6 className="fs-14">Reward Value</h6>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Link
                href="#"
                className="btn btn-md btn-primary"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* /Coupon Info */}
      {/* Coupon Info */}
      <div className="modal fade" id="redeemed">
        <div className="modal-dialog  modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Loyalty Points Info{" "}
                <span className="fs-14 fw-medium text-primary">#LP-1245</span>
              </h5>
              <Link href="#" data-bs-dismiss="modal" className="btn-close text-dark" />
            </div>
            <div className="modal-body">
              <div className="upcoming-content">
                <div className="upcoming-title mb-4 d-flex align-items-center justify-content-between p-3 rounded">
                  <div className="d-flex align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1">Dubai Tour Booking</h6>
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
                  <h6 className="mb-3">Loyalty Points Details</h6>
                  <div className="row gy-3">
                    <div className="col-lg-3">
                      <h6 className="fs-14">Issued Date</h6>
                      <p className="text-gray-6 fs-16 ">20 May 2026</p>
                    </div>
                    <div className="col-lg-3">
                      <h6 className="fs-14">Earned</h6>
                      <p className="text-gray-6 fs-16 ">$500</p>
                    </div>
                    <div className="col-lg-3">
                      <h6 className="fs-14">Redeemed</h6>
                      <p className="text-gray-6 fs-16 ">-</p>
                    </div>
                    <div className="col-lg-3">
                      <h6 className="fs-14">Expiry Date</h6>
                      <p className="text-gray-6 fs-16 ">20 May 2027</p>
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

export default ReferralProgramModal