"use client";
import Link from "next/link";
import { all_routes } from "../../../routes/all_routes";

const CustomPackageBuilderModal = () => {
  const routes = all_routes;
  return (
    <>
      {/* Reservation Confirmation Modal */}
      <div
        className="modal fade"
        id="package-success-modal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center p-4">
              <div className="avatar avatar-xxl bg-success-transparent text-success rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                <i className="isax isax-tick-circle fs-40" />
              </div>
              <h4 className="fs-20 fw-bold mb-2">Custom Package Reserved!</h4>
              <p className="fs-14 text-gray-6 mb-3">
                Your customized vacation package to{" "}
                <strong>Barcelona, Spain</strong> has been submitted. Our
                concierge team has locked in your hotel and activity
                reservations.
              </p>
              <div className="border rounded p-3 mb-3 bg-light text-start">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fs-12 text-gray-6">Package Reference:</span>
                  <span className="fs-12 fw-bold text-dark">
                    #PKG-BCN-2026-904
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="fs-12 text-gray-6">Travel Dates:</span>
                  <span className="fs-12 fw-medium text-dark">
                    20 May 2026 – 25 May 2026
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fs-12 text-gray-6">Payment Schedule:</span>
                  <span className="badge bg-warning-transparent text-warning fs-10">
                    20% Deposit Due
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Link
                  href={routes.travelVoucher}
                  className="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                >
                  View Travel Voucher
                </Link>
                <Link
                  href={routes.customerInvoices}
                  className="btn btn-outline-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  View Invoices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Reservation Confirmation Modal */}
    </>
  );
};

export default CustomPackageBuilderModal;
