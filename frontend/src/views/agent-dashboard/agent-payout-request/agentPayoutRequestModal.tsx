"use client";
import Link from "next/link";
import { all_routes } from "../../../routes/all_routes";

const AgentPayoutRequestModal = () => {
  const routes = all_routes;
  return (
    <>
      {/* Payout Success Modal */}
      <div
        className="modal fade"
        id="payout-success-modal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center p-4">
              <div className="avatar avatar-xxl bg-success-transparent text-success rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                <i className="isax isax-tick-circle fs-40" />
              </div>
              <h4 className="fs-20 fw-bold mb-2">Payout Request Submitted!</h4>
              <p className="fs-14 text-gray-6 mb-3">
                Your withdrawal request of{" "}
                <strong className="text-dark">$2,500.00</strong> has been
                queued for execution to <strong>Chase Checking •••• 4892</strong>.
              </p>
              <div className="border rounded p-3 mb-3 bg-light text-start">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fs-12 text-gray-6">Reference ID:</span>
                  <span className="fs-12 fw-semibold text-dark">#PO-8950</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="fs-12 text-gray-6">Estimated Settlement:</span>
                  <span className="fs-12 fw-medium text-dark">
                    May 21, 2026 (2 Business Days)
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fs-12 text-gray-6">Status:</span>
                  <span className="badge bg-warning-transparent text-warning fs-10">
                    Under Processing
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                >
                  Got it
                </button>
                <Link
                  href={routes.agentEarnings}
                  className="btn btn-outline-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  View History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Payout Success Modal */}
    </>
  );
};

export default AgentPayoutRequestModal;
