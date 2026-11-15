"use client";
import Link from "next/link";


const AgentCancellationRequestModal = () => {
  return (
    <>
  {/* Cancellation ID */}
  <div className="modal fade" id="cancellation-id">
    <div className="modal-dialog  modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body p-5">
          <form>
            <div className="text-center">
              <div className="mb-4">
                <i className="isax isax-location-cross5 text-danger fs-40" />
              </div>
              <h5 className="mb-2">Are you sure you want to approve?</h5>
              <p className="mb-4 text-gray-9">
                Order ID : <span className="text-primary">#HB-1245</span>
              </p>
            </div>
            <div className="bg-gray rounded p-3 mb-4">
              <div className="row g-3">
                <div className="col-6">
                  <h6 className="fs-14">Booking Type</h6>
                  <p className="text-gray-6 mb-0">Hotel</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Hotel Name</h6>
                  <p className="text-gray-6 mb-0">Hotel Miravent</p>
                </div>
                <div className="col-12">
                  <h6 className="fs-14">Cancel Reason</h6>
                  <p className="text-gray-6 mb-0">
                    Illness or medical appointments that prevent travel
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Link
                href="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Yes, Approve
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Cancellation ID */}
  {/* Booking ID */}
  <div className="modal fade" id="booking-id">
    <div className="modal-dialog  modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body p-5">
          <form>
            <div className="text-center">
              <div className="mb-4">
                <i className="isax isax-location-cross5 text-danger fs-40" />
              </div>
              <h5 className="mb-2">Are you sure you want to reject?</h5>
              <p className="mb-4 text-gray-9">
                Order ID : <span className="text-primary">#HB-1245</span>
              </p>
            </div>
            <div className="bg-gray rounded p-3 mb-4">
              <div className="row g-3">
                <div className="col-6">
                  <h6 className="fs-14">Booking Type</h6>
                  <p className="text-gray-6 mb-0">Hotel</p>
                </div>
                <div className="col-6">
                  <h6 className="fs-14">Hotel Name</h6>
                  <p className="text-gray-6 mb-0">Hotel Miravent</p>
                </div>
                <div className="col-12">
                  <h6 className="fs-14">Cancel Reason</h6>
                  <p className="text-gray-6 mb-0">
                    Illness or medical appointments that prevent travel
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Link
                href="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Yes, Reject
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Booking ID */}
</>

  )
}

export default AgentCancellationRequestModal