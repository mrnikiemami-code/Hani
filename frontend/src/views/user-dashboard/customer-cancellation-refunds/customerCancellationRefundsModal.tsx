"use client";
import Link from "next/link";
import { all_routes } from "../../../routes/all_routes";

const CustomerCancellationRefundsModal = () => {
  const routes = all_routes;
  return (
    <>
      {/* Refund Details Modal */}
      <div className="modal fade" id="refundDetailsModal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-18">
                Cancellation &amp; Refund Summary — #CN-8492
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body p-4">
              {/* Tracker */}
              <h6 className="fs-14 text-gray-6 mb-2">PROGRESS TIMELINE</h6>
              <div className="refund-step-tracker">
                <div className="step-node completed">
                  <span className="node-icon">
                    <i className="isax isax-tick-circle" />
                  </span>
                  <span className="node-label">Submitted</span>
                  <span className="fs-11 text-gray-6">20 May</span>
                </div>
                <div className="step-node completed">
                  <span className="node-icon">
                    <i className="isax isax-tick-circle" />
                  </span>
                  <span className="node-label">Agent Review</span>
                  <span className="fs-11 text-gray-6">21 May</span>
                </div>
                <div className="step-node completed">
                  <span className="node-icon">
                    <i className="isax isax-tick-circle" />
                  </span>
                  <span className="node-label">Bank Reversal</span>
                  <span className="fs-11 text-gray-6">22 May</span>
                </div>
                <div className="step-node completed">
                  <span className="node-icon">
                    <i className="isax isax-tick-circle" />
                  </span>
                  <span className="node-label">Settled</span>
                  <span className="fs-11 text-gray-6">24 May</span>
                </div>
              </div>
              <div className="p-3 bg-light-200 rounded border mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fs-13 text-gray-6">
                    Original Transaction Amount:
                  </span>
                  <span className="fs-13 fw-medium text-dark">$1,850.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fs-13 text-gray-6">
                    Airline Cancellation Fee:
                  </span>
                  <span className="fs-13 fw-medium text-danger">-$150.00</span>
                </div>
                <div className="d-flex justify-content-between border-top pt-2">
                  <span className="fs-14 fw-bold text-dark">
                    Net Amount Refunded:
                  </span>
                  <span className="fs-16 fw-bold text-success">$1,700.00</span>
                </div>
              </div>
              <p className="fs-13 text-gray-6 mb-0">
                <strong>Refund Destination:</strong> Mastercard ending in 4242
                · Reference ARN: <strong>ARN-84920194812</strong>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <Link
                href={routes.customerInvoices}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                View Invoices
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* /Refund Details Modal */}
    </>
  );
};

export default CustomerCancellationRefundsModal;
