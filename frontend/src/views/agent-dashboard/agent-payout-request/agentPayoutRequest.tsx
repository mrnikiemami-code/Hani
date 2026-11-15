"use client";
import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Sidebar from "../sidebar/sidebar";
import AgentPayoutRequestModal from "./agentPayoutRequestModal";
import { all_routes } from "../../../routes/all_routes";

const AgentPayoutRequest = () => {
  const routes = all_routes;
  const availableBalance = 4850;
  const [amount, setAmount] = useState<number>(2500);
  const [activePct, setActivePct] = useState<number | null>(null);
  const fee = amount > 0 ? (amount >= 500 ? 0 : 5) : 0;
  const net = Math.max(0, amount - fee);

  const handlePercent = (pct: number) => {
    setActivePct(pct);
    setAmount(Number(((availableBalance * pct) / 100).toFixed(2)));
  };

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Agent Portal",
      to: routes.agentDashboard,
      active: false,
    },
    {
      label: "Request Payout",
      active: true,
    },
  ];
  return (
    <>
  <Breadcrumb
        title="Request Payout"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04"
      />
  {/* Page Content */}
  <div className="content">
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
          <Sidebar />
        </div>
        {/* /Sidebar */}
        {/* Main Content */}
        <div className="col-xl-9 col-lg-8">
          {/* Payout Overview Balance Cards */}
          <div className="row g-3 mb-4 payout-stats-grid">
            <div className="col-md-6 col-xl-3">
              <div className="card payout-stat-card h-100 mb-0">
                <div className="card-body">
                  <div>
                    <span className="payout-stat-title">
                      Available to Withdraw
                    </span>
                    <h3
                      className="payout-stat-value"
                      id="payout-available-balance"
                      data-amount={4850}
                    >
                      $4,850.00
                    </h3>
                  </div>
                  <div>
                    <span className="badge bg-soft-primary">
                      Ready For Payout
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card payout-stat-card h-100 mb-0">
                <div className="card-body">
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                      <span className="payout-stat-title">
                        Pending Clearance
                      </span>
                    </div>
                    <h3 className="payout-stat-value">$1,250.00</h3>
                  </div>
                  <span className="payout-stat-subtitle">
                    Clears on May 28, 2026
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card payout-stat-card h-100 mb-0">
                <div className="card-body">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="payout-stat-title">Total Paid Out</span>
                    </div>
                    <h3 className="payout-stat-value">$38,400.00</h3>
                  </div>
                  <span className="payout-stat-subtitle">
                    24 lifetime requests
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card payout-stat-card h-100 mb-0">
                <div className="card-body">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="payout-stat-title">
                        Next Auto Payout
                      </span>
                    </div>
                    <h3 className="payout-stat-value">Thursday</h3>
                  </div>
                  <span className="payout-stat-subtitle">May 21, 2026</span>
                </div>
              </div>
            </div>
          </div>
          {/* Withdrawal Form Card */}
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="fs-16 mb-0">Initiate Payout Request</h5>
              <span className="fs-13 text-gray-6">
                Min Payout: <strong>$100.00</strong>
              </span>
            </div>
            <div className="card-body">
              <form id="payout-request-form">
                {/* Payout Method Selection */}
                <div className="mb-4">
                  <label className="form-label fs-14 fw-semibold text-dark mb-2">
                    1. Select Withdrawal Method
                  </label>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="payout-method-option d-block h-100">
                        <input
                          type="radio"
                          name="payout_method"
                          defaultValue="bank"
                          className="form-check-input position-absolute"
                          defaultChecked
                        />
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <i className="isax isax-bank text-primary fs-22" />
                          <h6 className="fs-15 mb-0">Bank Wire / ACH</h6>
                        </div>
                        <p className="fs-12 text-gray-6 mb-1">
                          Direct deposit to verified agency bank account.
                        </p>
                        <span className="badge bg-success-transparent text-success fs-11">
                          Fee: $0.00 (Over $500)
                        </span>
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label className="payout-method-option d-block h-100">
                        <input
                          type="radio"
                          name="payout_method"
                          defaultValue="paypal"
                          className="form-check-input position-absolute"
                        />
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <i className="fa-brands fa-paypal text-primary fs-22" />
                          <h6 className="fs-15 mb-0">PayPal Express</h6>
                        </div>
                        <p className="fs-12 text-gray-6 mb-1">
                          Instant delivery to registered PayPal email.
                        </p>
                        <span className="badge bg-warning-transparent text-warning fs-11">
                          Fee: 1.0% ($5.00 min)
                        </span>
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label className="payout-method-option d-block h-100">
                        <input
                          type="radio"
                          name="payout_method"
                          defaultValue="stripe"
                          className="form-check-input position-absolute"
                        />
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <i className="fa-brands fa-stripe text-info fs-22" />
                          <h6 className="fs-15 mb-0">Stripe Connect</h6>
                        </div>
                        <p className="fs-12 text-gray-6 mb-1">
                          Same-day transfer via debit card or payout link.
                        </p>
                        <span className="badge bg-info-transparent text-info fs-11">
                          Fee: 0.5% ($2.50)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* Destination Account */}
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
                    <label className="form-label fs-14 fw-semibold text-dark mb-0">
                      2. Select Destination Account
                    </label>
                    <Link
                      href={routes.agentSettings}
                      className="fs-13 text-primary"
                    >
                      + Manage Bank Accounts
                    </Link>
                  </div>
                  <div className="border rounded p-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-3 flex-wrap gap-2">
                      <div className="avatar bg-soft-primary rounded-circle text-primary d-flex align-items-center justify-content-center flex-shrink-0">
                        <i className="isax isax-card fs-20" />
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap gap-2">
                          <h6 className="fs-14 mb-0">
                            JPMorgan Chase Bank, N.A.
                          </h6>
                          <span className="badge bg-success-transparent text-success fs-10">
                            Primary
                          </span>
                        </div>
                        <p className="fs-12 text-gray-6 mb-0">
                          Checking Account ending in •••• 4892 · Routing:
                          021000021
                        </p>
                      </div>
                    </div>
                    <span className="badge bg-light text-dark fs-12 px-3 py-2">
                      Verified Account
                    </span>
                  </div>
                </div>
                {/* Amount & Quick Percentage */}
                <div className="mb-4">
                  <label
                    className="form-label fs-14 fw-semibold text-dark mb-2"
                    htmlFor="payout-amount-input"
                  >
                    3. Enter Withdrawal Amount
                  </label>
                  <div className="input-group mb-2">
                    <span className="input-group-text fs-16 fw-bold">$</span>
                    <input
                      type="number"
                      className="form-control form-control-lg fs-18 fw-semibold"
                      id="payout-amount-input"
                      placeholder="0.00"
                      min={100}
                      max={4850}
                      step={50}
                      value={amount}
                      onChange={(e) => {
                        setActivePct(null);
                        setAmount(parseFloat(e.target.value) || 0);
                      }}
                    />
                    <button
                      className={`btn btn-outline-secondary percentage-chip${activePct === 100 ? " active" : ""}`}
                      type="button"
                      data-pct={100}
                      onClick={() => handlePercent(100)}
                    >
                      Max
                    </button>
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mt-2">
                    <span className="fs-12 text-gray-6 me-1">
                      Quick Select:
                    </span>
                    <button
                      type="button"
                      className={`percentage-chip${activePct === 25 ? " active" : ""}`}
                      data-pct={25}
                      onClick={() => handlePercent(25)}
                    >
                      25% ($1,212.50)
                    </button>
                    <button
                      type="button"
                      className={`percentage-chip${activePct === 50 ? " active" : ""}`}
                      data-pct={50}
                      onClick={() => handlePercent(50)}
                    >
                      50% ($2,425.00)
                    </button>
                    <button
                      type="button"
                      className={`percentage-chip${activePct === 75 ? " active" : ""}`}
                      data-pct={75}
                      onClick={() => handlePercent(75)}
                    >
                      75% ($3,637.50)
                    </button>
                    <button
                      type="button"
                      className={`percentage-chip${activePct === 100 ? " active" : ""}`}
                      data-pct={100}
                      onClick={() => handlePercent(100)}
                    >
                      100% ($4,850.00)
                    </button>
                  </div>
                </div>
                {/* Fee & Calculation Summary Box */}
                <div className="fee-calc-box mb-4">
                  <h6 className="fs-14 fw-semibold mb-3">Payout Breakdown</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">
                      Gross Amount Requested
                    </span>
                    <span
                      className="fs-13 fw-medium text-dark"
                      id="payout-gross-display"
                    >
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">
                      Transfer Fee (Free over $500)
                    </span>
                    <span
                      className="fs-13 text-success fw-medium"
                      id="payout-fee-amount"
                    >
                      ${fee.toFixed(2)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-13 text-gray-6">
                      Withholding Tax (W-9 on file)
                    </span>
                    <span className="fs-13 text-dark fw-medium">
                      $0.00 (0%)
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between align-items-center pt-1">
                    <span className="fs-15 fw-bold text-dark">
                      Estimated Net Deposit:
                    </span>
                    <span
                      className="fs-18 fw-bold text-primary"
                      id="payout-net-amount"
                    >
                      ${net.toFixed(2)}
                    </span>
                  </div>
                </div>
                {/* Internal Remarks Note */}
                <div className="mb-4">
                  <label
                    className="form-label fs-14 fw-medium text-dark"
                    htmlFor="payout-notes"
                  >
                    Reference Note (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="payout-notes"
                    placeholder="e.g. May Mid-month booking settlement"
                  />
                </div>
                {/* Confirmation Checkbox */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="confirm-payout-terms"
                    required
                    defaultChecked
                  />
                  <label
                    className="form-check-label fs-13 text-gray-6"
                    htmlFor="confirm-payout-terms"
                  >
                    I confirm that the destination bank account details are
                    correct and acknowledge that standard wire settlements take
                    1–2 business days.
                  </label>
                </div>
                {/* Submit Button */}
                <div className="d-flex align-items-center gap-3 flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#payout-success-modal"
                  >
                    <i className="isax isax-send-2 me-2" />
                    Submit Payout Request
                  </button>
                  <Link href={routes.agentDashboard} className="btn btn-light px-4">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* Recent Payout Requests Table */}
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="fs-16 mb-0">Recent Payout Transactions</h5>
              <Link href={routes.agentEarnings} className="fs-13 text-primary">
                View All Records
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="fs-13">Payout ID</th>
                      <th className="fs-13">Date Requested</th>
                      <th className="fs-13">Method &amp; Account</th>
                      <th className="fs-13">Gross Amount</th>
                      <th className="fs-13">Net Deposited</th>
                      <th className="fs-13">Status</th>
                      <th className="fs-13 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="fw-semibold text-dark">#PO-8849</span>
                      </td>
                      <td>
                        <span className="fs-13">12 May 2026</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <i className="isax isax-bank text-primary" />
                          <span className="fs-13">Chase •••• 4892</span>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13 fw-medium">$3,200.00</span>
                      </td>
                      <td>
                        <span className="fs-13 fw-bold text-success">
                          $3,200.00
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success-transparent text-success fs-11">
                          Completed
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          href="#"
                          className="btn btn-xs btn-outline-secondary"
                        >
                          <i className="isax isax-document-download" /> Receipt
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-semibold text-dark">#PO-8712</span>
                      </td>
                      <td>
                        <span className="fs-13">28 Apr 2026</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <i className="fa-brands fa-paypal text-primary" />
                          <span className="fs-13">chris@agency.com</span>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13 fw-medium">$1,800.00</span>
                      </td>
                      <td>
                        <span className="fs-13 fw-bold text-success">
                          $1,782.00
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success-transparent text-success fs-11">
                          Completed
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          href="#"
                          className="btn btn-xs btn-outline-secondary"
                        >
                          <i className="isax isax-document-download" /> Receipt
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="fw-semibold text-dark">#PO-8605</span>
                      </td>
                      <td>
                        <span className="fs-13">15 Apr 2026</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <i className="isax isax-bank text-primary" />
                          <span className="fs-13">Chase •••• 4892</span>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13 fw-medium">$4,500.00</span>
                      </td>
                      <td>
                        <span className="fs-13 fw-bold text-success">
                          $4,500.00
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success-transparent text-success fs-11">
                          Completed
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          href="#"
                          className="btn btn-xs btn-outline-secondary"
                        >
                          <i className="isax isax-document-download" /> Receipt
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Policy Info Card */}
          <div className="card border-0 bg-light-primary">
            <div className="card-body">
              <div className="d-flex gap-3">
                <div className="avatar avatar-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="isax isax-info-circle fs-20" />
                </div>
                <div>
                  <h6 className="fs-15 mb-1 text-primary">
                    Payout Policies &amp; Processing Windows
                  </h6>
                  <p className="fs-13 text-gray-7 mb-0">
                    ACH and Bank wire transfers are batched every Tuesday and
                    Thursday at 17:00 EST. Earnings from completed customer
                    stays are cleared after a standard 7-day post-checkout
                    dispute window. For questions regarding large volume
                    transfers (&gt; $25,000), please consult your designated
                    agency account manager.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Content */}
  <AgentPayoutRequestModal />
</>

  )
}

export default AgentPayoutRequest