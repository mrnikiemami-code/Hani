"use client";
import CustomSelect from "../../../components/common-select/commonSelect";
import { CancellationReason } from "../../../core/data/mock/selectOption";

const AgentBookingDetailsModal = () => {
  return (
    <>
      {/* Cancel Booking Modal */}
      <div className="modal fade" id="cancel-booking">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <div className="mb-3">
                <i className="isax isax-warning-2 text-danger fs-48" />
              </div>
              <h5 className="mb-2">Cancel Booking #HB-1245?</h5>
              <p className="text-gray-6 fs-14 mb-4">
                Are you sure you want to cancel this booking? A cancellation
                request will be submitted and refund calculations will be
                applied per supplier policy.
              </p>
              <div className="mb-3 text-start">
                <label className="form-label fs-13">
                  Reason for Cancellation
                </label>
                <CustomSelect
                  options={CancellationReason}
                  className="select"
                  defaultValue={CancellationReason[0]}
                  modal={true}
                />
              </div>
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Cancel Booking Modal */}
    </>
  );
};

export default AgentBookingDetailsModal;
