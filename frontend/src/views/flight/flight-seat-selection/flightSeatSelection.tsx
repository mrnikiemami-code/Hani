"use client";
import { Fragment, useState, type CSSProperties } from "react";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";

type SeatType = "legroom" | "standard" | "exit";
type StepStatus = "done" | "current" | "upcoming";

interface SeatRow {
  row: number;
  type: SeatType;
  taken: string[];
}

interface Passenger {
  id: string;
  traveller: number;
  label: string;
  name: string;
  inputName: string;
  idPrefix: string;
  badgeClass: string;
  defaultSeat: string;
  mealId: string;
  defaultMeal: string;
}

interface BookingStep {
  label: string;
  status: StepStatus;
}

interface LegendItem {
  label: string;
  boxStyle?: CSSProperties;
}

interface SeatExtra {
  id: string;
  title: string;
  description: string;
  summaryLabel: string;
  price: number;
}

interface InfoItem {
  icon: string;
  text: string;
}

const baseFare = 624;
const taxesAndCharges = 186;

const leftSeatLetters = ["A", "B", "C"];
const rightSeatLetters = ["D", "E", "F"];

const seatPrices: Record<SeatType, number> = {
  legroom: 24,
  standard: 9,
  exit: 18,
};

const seatTypeLabels: Record<SeatType, string> = {
  legroom: "Extra legroom",
  standard: "Standard",
  exit: "Exit row",
};

const seatPositions: Record<string, string> = {
  A: "window",
  B: "middle",
  C: "aisle",
  D: "aisle",
  E: "middle",
  F: "window",
};

const seatRows: SeatRow[] = [
  { row: 1, type: "legroom", taken: ["A"] },
  { row: 2, type: "legroom", taken: ["C"] },
  { row: 3, type: "standard", taken: ["A", "B", "F"] },
  { row: 4, type: "standard", taken: ["D"] },
  { row: 5, type: "standard", taken: [] },
  { row: 6, type: "standard", taken: ["A", "C", "D"] },
  { row: 7, type: "standard", taken: ["E"] },
  { row: 8, type: "standard", taken: [] },
  { row: 12, type: "exit", taken: ["F"] },
  { row: 13, type: "exit", taken: [] },
];

const passengers: Passenger[] = [
  {
    id: "pax-1",
    traveller: 1,
    label: "Adult 1",
    name: "A. Sharma",
    inputName: "seat",
    idPrefix: "seat-",
    badgeClass: "bg-white",
    defaultSeat: "1B",
    mealId: "fx-meal1",
    defaultMeal: "Standard hot meal",
  },
  {
    id: "pax-2",
    traveller: 2,
    label: "Adult 2",
    name: "R. Sharma",
    inputName: "seat-p2",
    idPrefix: "seat-p2-",
    badgeClass: "bg-light",
    defaultSeat: "1E",
    mealId: "fx-meal2",
    defaultMeal: "Vegetarian",
  },
];

const bookingSteps: BookingStep[] = [
  { label: "Flight selected", status: "done" },
  { label: "Seats & extras", status: "current" },
  { label: "Passenger details", status: "upcoming" },
  { label: "Payment", status: "upcoming" },
];

const seatLegend: LegendItem[] = [
  { label: "Available" },
  { label: "Selected", boxStyle: { background: "#CF3425", borderColor: "#CF3425" } },
  { label: "Your other traveller", boxStyle: { background: "#FCEFEA", borderColor: "#CF3425" } },
  { label: "Occupied", boxStyle: { background: "#EEF2F6", borderColor: "#EEF2F6" } },
  { label: "Extra legroom · $24", boxStyle: { borderColor: "#98AA30" } },
  { label: "Exit row · $18", boxStyle: { borderColor: "#155EEF" } },
];

const seatExtras: SeatExtra[] = [
  {
    id: "fx-bag",
    title: "Extra 23 kg checked bag",
    description: "Included allowance is 25 kg per traveller. Cheaper now than at the airport.",
    summaryLabel: "Extra checked bag",
    price: 60,
  },
  {
    id: "fx-priority",
    title: "Priority boarding",
    description: "Board first, overhead locker space guaranteed. Covers both travellers.",
    summaryLabel: "Priority boarding",
    price: 18,
  },
  {
    id: "fx-sports",
    title: "Sports equipment",
    description: "Skis, golf clubs or a bicycle, up to 32 kg.",
    summaryLabel: "Sports equipment",
    price: 85,
  },
];

const defaultExtras = ["fx-bag", "fx-priority"];

const mealOptions = [
  "Standard hot meal",
  "Vegetarian",
  "Jain",
  "Gluten free",
  "Low sodium",
];

const goodToKnow: InfoItem[] = [
  { icon: "isax-tick-circle text-success", text: "Seats are held for both legs, DEL–DXB and DXB–BCN." },
  { icon: "isax-info-circle text-primary", text: "Online check-in opens 48 hours before departure." },
  { icon: "isax-close-circle text-danger", text: "Seat fees are not refunded if you cancel." },
];

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

const getSeatType = (seatId: string): SeatType => {
  const rowNumber = parseInt(seatId, 10);
  return seatRows.find((seatRow) => seatRow.row === rowNumber)?.type ?? "standard";
};

const FlightSeatSelection = () => {
  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Flight",
      active: false,
    },
    {
      label: "Seat Selection",
      active: true,
    },
  ];

  const [selectedSeats, setSelectedSeats] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      passengers.map((pax): [string, string] => [pax.id, pax.defaultSeat])
    )
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>(defaultExtras);

  const handleSeatChange = (paxId: string, seatId: string) => {
    setSelectedSeats((prev) => ({ ...prev, [paxId]: seatId }));
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const seatCharges = passengers.map((pax) => seatPrices[getSeatType(selectedSeats[pax.id])]);
  const seatTotal = seatCharges.reduce((sum, price) => sum + price, 0);
  const seatBreakdown = seatCharges.every((price) => price === seatCharges[0])
    ? `${seatCharges.length} × ${formatPrice(seatCharges[0])}`
    : seatCharges.map((price) => formatPrice(price)).join(" + ");
  const activeExtras = seatExtras.filter((extra) => selectedExtras.includes(extra.id));
  const extrasTotal = activeExtras.reduce((sum, extra) => sum + extra.price, 0);
  const fareTotal = baseFare * passengers.length + taxesAndCharges + seatTotal + extrasTotal;

  const renderSeat = (pax: Passenger, seatRow: SeatRow, letter: string) => {
    const seatId = `${seatRow.row}${letter}`;

    if (seatRow.taken.includes(letter)) {
      return (
        <span
          key={seatId}
          className="fseat is-taken"
          role="img"
          aria-label={`Seat ${seatId}, unavailable`}
        >
          {seatId}
        </span>
      );
    }

    /* Seat already held by the other traveller */
    const heldBy = passengers.find(
      (other) => other.id !== pax.id && selectedSeats[other.id] === seatId
    );
    if (heldBy) {
      return (
        <span
          key={seatId}
          className="fseat is-yours"
          role="img"
          aria-label={`Seat ${seatId}, held for traveller ${heldBy.traveller}`}
        >
          {seatId}
        </span>
      );
    }

    const inputId = `${pax.idPrefix}${seatId}`;
    return (
      <Fragment key={seatId}>
        <input
          className="fseat-input"
          type="radio"
          name={pax.inputName}
          id={inputId}
          value={seatId}
          checked={selectedSeats[pax.id] === seatId}
          onChange={() => handleSeatChange(pax.id, seatId)}
        />
        <label
          className={`fseat ${seatRow.type}`}
          htmlFor={inputId}
          title={`Seat ${seatId}, ${formatPrice(seatPrices[seatRow.type])}`}
        >
          {seatId}
        </label>
      </Fragment>
    );
  };

  return (
    <>
      <Breadcrumb
        title="Seat Selection"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />
      {/* Page Wrapper */}
      <div className="content content-two">
        <div className="container">
          <Link
            href={routes.flightDetails}
            className="fs-14 fw-medium d-inline-flex align-items-center gap-1 mb-4"
          >
            <i className="isax isax-arrow-left4 fw-semibold" />
            Back to Flight Details
          </Link>
          {/* Steps */}
          <div className="card mb-4">
            <div className="card-body py-3">
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                {bookingSteps.map((step, index) => (
                  <Fragment key={step.label}>
                    {index > 0 && (
                      <span className="d-none d-lg-block flex-fill border-top mx-3" />
                    )}
                    <div className="d-flex align-items-center gap-2">
                      {step.status === "done" && (
                        <span className="avatar avatar-sm rounded-circle bg-success text-white flex-shrink-0">
                          <i className="isax isax-tick-circle5" />
                        </span>
                      )}
                      {step.status === "current" && (
                        <span className="avatar avatar-sm rounded-circle bg-primary text-white flex-shrink-0">
                          {index + 1}
                        </span>
                      )}
                      {step.status === "upcoming" && (
                        <span className="avatar avatar-sm rounded-circle bg-light text-gray-6 flex-shrink-0">
                          {index + 1}
                        </span>
                      )}
                      <span
                        className={
                          step.status === "upcoming"
                            ? "fs-14 text-gray-6"
                            : "fs-14 fw-medium text-dark"
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          {/* start row */}
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h2 className="fs-18 mb-1">Choose your seats</h2>
                  <p className="fs-13 text-gray-6 mb-0">
                    AI 191 &middot; Delhi (DEL) to Dubai (DXB) &middot; Boeing 787-9
                    &middot; Economy, 3-3 cabin
                  </p>
                </div>
                <div className="card-body">
                  {/* Passengers */}
                  <ul className="nav nav-pills gap-2 mb-3" role="tablist">
                    {passengers.map((pax, index) => (
                      <li className="nav-item" role="presentation" key={pax.id}>
                        <button
                          className={`nav-link${index === 0 ? " active" : ""}`}
                          id={`${pax.id}-tab`}
                          data-bs-toggle="pill"
                          data-bs-target={`#${pax.id}`}
                          type="button"
                          role="tab"
                          aria-controls={pax.id}
                          aria-selected={index === 0 ? "true" : "false"}
                        >
                          {pax.label} &middot; {pax.name}{" "}
                          <span className={`badge ${pax.badgeClass} text-dark ms-1`}>
                            {selectedSeats[pax.id]}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* Legend */}
                  <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
                    {seatLegend.map((item) => (
                      <span className="legend-key" key={item.label}>
                        <span className="legend-box" style={item.boxStyle} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <div className="tab-content">
                    {passengers.map((pax, index) => (
                      <div
                        className={`tab-pane fade${index === 0 ? " show active" : ""}`}
                        id={pax.id}
                        role="tabpanel"
                        aria-labelledby={`${pax.id}-tab`}
                        key={pax.id}
                      >
                        <div className="fcabin">
                          <p className="cabin-ends mb-3">
                            Front of aircraft &middot; galley and lavatories
                          </p>
                          {seatRows.map((seatRow) => (
                            <div className="seat-row cabin-3-3" key={seatRow.row}>
                              {leftSeatLetters.map((letter) =>
                                renderSeat(pax, seatRow, letter)
                              )}
                              <div className="aisle">{seatRow.row}</div>
                              {rightSeatLetters.map((letter) =>
                                renderSeat(pax, seatRow, letter)
                              )}
                            </div>
                          ))}
                          <p className="cabin-ends mt-3 mb-0">Rear of aircraft</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="alert alert-warning d-flex gap-2 mt-4 mb-0">
                    <i className="isax isax-info-circle flex-shrink-0 mt-1" />
                    <span className="fs-13">
                      Exit row seats carry safety requirements: passengers must be 16 or
                      over, able-bodied, and willing to assist the crew in an emergency.
                    </span>
                  </div>
                </div>
              </div>
              {/* Extras */}
              <div className="card mb-0">
                <div className="card-header">
                  <h2 className="fs-18 mb-0">Add to your booking</h2>
                </div>
                <div className="card-body">
                  {seatExtras.map((extra) => (
                    <div
                      className="d-flex align-items-start justify-content-between gap-3 pb-3 mb-3 border-bottom"
                      key={extra.id}
                    >
                      <div className="form-check d-flex align-items-start gap-2 mb-0">
                        <input
                          className="form-check-input mt-1"
                          type="checkbox"
                          id={extra.id}
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => handleExtraToggle(extra.id)}
                        />
                        <label className="form-check-label" htmlFor={extra.id}>
                          <span className="d-block fs-14 fw-medium text-dark">
                            {extra.title}
                          </span>
                          <span className="d-block fs-13 text-gray-6">
                            {extra.description}
                          </span>
                        </label>
                      </div>
                      <span className="fs-15 fw-semibold text-dark flex-shrink-0">
                        {formatPrice(extra.price)}
                      </span>
                    </div>
                  ))}
                  <div className="row row-gap-3">
                    {passengers.map((pax) => (
                      <div className="col-md-6" key={pax.id}>
                        <label className="form-label" htmlFor={pax.mealId}>
                          Meal &mdash; {pax.label}
                        </label>
                        <select
                          className="form-control"
                          id={pax.mealId}
                          name={pax.mealId}
                          defaultValue={pax.defaultMeal}
                        >
                          {mealOptions.map((meal) => (
                            <option key={meal}>{meal}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <div className="col-12">
                      <p className="fs-13 text-gray-6 mb-0">
                        Special meals must be requested at least 24 hours before departure
                        and are included in the fare.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            {/* Summary */}
            <div className="col-lg-4 theiaStickySidebar">
              <div className="card">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Your seats</h3>
                </div>
                <div className="card-body">
                  {passengers.map((pax, index) => {
                    const seatId = selectedSeats[pax.id];
                    const seatType = getSeatType(seatId);
                    const isLast = index === passengers.length - 1;
                    return (
                      <div
                        className={`d-flex align-items-center justify-content-between${isLast ? "" : " pb-2 mb-2 border-bottom"}`}
                        key={pax.id}
                      >
                        <div>
                          <p className="fs-14 fw-medium text-dark mb-0">
                            Seat {seatId} &middot; {pax.name}
                          </p>
                          <p className="fs-13 text-gray-6 mb-0">
                            {seatTypeLabels[seatType]}, {seatPositions[seatId.slice(-1)]}
                          </p>
                        </div>
                        <span className="fs-14 fw-medium text-dark">
                          {formatPrice(seatPrices[seatType])}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Fare summary</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-14">
                      Base fare{" "}
                      <span className="text-gray-6">
                        ({passengers.length} &times; {formatPrice(baseFare)})
                      </span>
                    </span>
                    <span className="fs-14 fw-medium text-dark">
                      {formatPrice(baseFare * passengers.length)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-14">Taxes &amp; carrier charges</span>
                    <span className="fs-14 fw-medium text-dark">
                      {formatPrice(taxesAndCharges)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-14">
                      Seats <span className="text-gray-6">({seatBreakdown})</span>
                    </span>
                    <span className="fs-14 fw-medium text-dark">
                      {formatPrice(seatTotal)}
                    </span>
                  </div>
                  {activeExtras.map((extra) => (
                    <div className="d-flex justify-content-between mb-2" key={extra.id}>
                      <span className="fs-14">{extra.summaryLabel}</span>
                      <span className="fs-14 fw-medium text-dark">
                        {formatPrice(extra.price)}
                      </span>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between border-top pt-3 mt-3">
                    <span className="fs-16 fw-semibold text-dark">Total</span>
                    <span className="fs-20 fw-semibold text-primary">
                      {formatPrice(fareTotal)}
                    </span>
                  </div>
                  <p className="fs-13 text-gray-6 mt-2 mb-3">
                    Paid in full at booking. A coupon can be applied at checkout.
                  </p>
                  <Link href={routes.flightBooking} className="btn btn-primary w-100 mb-2">
                    Continue to passenger details
                  </Link>
                  <Link href={routes.flightBooking} className="btn btn-light w-100">
                    Skip &mdash; assign seats at check-in
                  </Link>
                </div>
              </div>
              <div className="card mb-0">
                <div className="card-header">
                  <h4 className="fs-16 mb-0">Good to know</h4>
                </div>
                <div className="card-body">
                  {goodToKnow.map((item, index) => (
                    <div
                      className={`d-flex gap-2 ${index === goodToKnow.length - 1 ? "mb-0" : "mb-2"}`}
                      key={item.text}
                    >
                      <i className={`isax ${item.icon} flex-shrink-0 mt-1`} />
                      <span className="fs-13">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default FlightSeatSelection;
