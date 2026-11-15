"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";
import { useState } from "react";

const seatRows = [
  ["A1-booked", "A2", "AISLE", "A3", "A4"],
  ["B1-female", "B2", "AISLE", "B3-selected", "B4-selected"],
  ["C1", "C2-booked", "AISLE", "C3-booked", "C4"],
  ["D1", "D2", "AISLE", "D3-select-light", "D4-booked"],
  ["E1-selected", "E2-selected", "AISLE", "E3", "E4-booked"],
  ["F1", "F2", "AISLE", "F3", "F4"],
  ["G1", "G2", "AISLE", "G3", "G4"],
  ["H1", "H2", "AISLE", "H3", "H4"],
  ["I1", "I2", "AISLE", "I3", "I4"],
  ["J1", "J2", "AISLE", "J3", "J4"],
  ["K1", "K2", "AISLE", "K3", "K4"]
];

const maxSeat = 4;

const BusSeatSelection = () => {
  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [

    {
      label: "Bus",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Bus",
      active: false,
    },
    {
      label: "Select Your Seats",
      active: true,
    },
  ];
  const defaultSelected = seatRows
    .flat()
    .filter((seat) => seat.includes("selected"))
    .map((seat) => seat.split("-")[0]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>(defaultSelected);

  const handleSeatClick = (seat: string) => {
    if (seat.includes("booked")) return;

    const seatName = seat.split("-")[0];

    if (selectedSeats.includes(seatName)) {
      /* UNSELECT */
      setSelectedSeats(selectedSeats.filter((s) => s !== seatName));
    } else {
      if (selectedSeats.length >= maxSeat) return;
      /* SELECT */
      setSelectedSeats([...selectedSeats, seatName]);
    }
  };
  const [active, setActive] = useState<boolean[]>([]);
  const handleActive = (i: number) => {
    setActive((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };
  return (
    <>
      <Breadcrumb
        title="Select Your Seats"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />
      {/* Page Wrapper */}
      <div className="content content-two">
        <div className="container">
          <Link
            href={routes.busList}
            className="fs-14 fw-medium d-inline-flex align-items-center gap-1 mb-4"
          >
            <i className="isax isax-arrow-left4 fw-semibold" />
            Back to Bus List
          </Link>
          {/* start row */}
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="seat-content">
                    <div>
                      <h2 className="fs-20 mb-1">Seat Layout</h2>
                      <p>Click on a seat to select/deselect</p>
                    </div>
                    <div id="seatCounter">
                      Selected: {selectedSeats.length}/{maxSeat}
                    </div>
                  </div>
                  <div className="seat-selected">
                    <div className="seat-count">
                      <div className="seat bg-white border border-light" />
                      <p>Available</p>
                    </div>
                    <div className="seat-count">
                      <div className="seat bg-primary border-primary" />
                      <p>Selected</p>
                    </div>
                    <div className="seat-count">
                      <div className="seat bg-light border border-light" />
                      <p>Booked</p>
                    </div>
                    <div className="seat-count">
                      <div className="seat bg-white border border-pink" />
                      <p>Female</p>
                    </div>
                  </div>
                  <div className="seat-booking">
                    <div className="d-flex align-items-center justify-content-end mb-4 pb-4 border-bottom end-item">
                      <div className="driver-seat">Driver</div>
                    </div>
                    <div className="seat-layout" id="seatLayout" >
                      {seatRows.map((row, rowIndex) => (
                        <div className="seat-row" key={rowIndex}>
                          {row.map((seat, index) => {

                            if (seat === "AISLE") {
                              return <div key={index} className="aisle">AISLE</div>;
                            }

                            const seatName = seat.split("-")[0];

                            const classes = ["seat"];

                            if (seat.includes("booked")) classes.push("booked");
                            if (seat.includes("female")) classes.push("female");
                            if (seat.includes("D3-select-light")) classes.push("seat available selected-light");
                            if (selectedSeats.includes(seatName)) classes.push("selected");

                            return (
                              <div
                                key={seatName}
                                className={classes.join(" ")}
                                onClick={() => handleSeatClick(seat)}
                              >
                                {seatName}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-center mt-4 pt-4 border-top end-item">
                      <Link
                        href={routes.busBooking}
                        className="btn btn-danger exit-btn"
                      >
                        Emergency Exit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5>Booking Summary</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3 pb-3 border-bottom">
                    <label className="mb-2">Selected Seats</label>
                    <div className="d-flex align-items-center gap-2">
                      <button className={`tag-btn ${active[1] ? 'active' : ''}`} onClick={() => handleActive(1)}>B3</button>
                      <button className={`tag-btn ${active[2] ? 'active' : ''}`} onClick={() => handleActive(2)}>B4</button>
                      <button className={`tag-btn ${active[3] ? 'active' : ''}`} onClick={() => handleActive(3)}>E1</button>
                      <button className={`tag-btn ${active[4] ? 'active' : ''}`} onClick={() => handleActive(4)}>E2</button>
                    </div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <p className="d-flex align-items-center justify-content-between gap-2 mb-3">
                      {" "}
                      Price per seat:{" "}
                      <span className="fw-medium text-dark">$65</span>{" "}
                    </p>
                    <p className="d-flex align-items-center justify-content-between gap-2 mb-0">
                      {" "}
                      Number of seats:{" "}
                      <span className="fw-medium text-dark">4</span>{" "}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between fw-semibold text-dark mb-4">
                    Total Amount: <span className="fs-20 text-primary">$260</span>
                  </div>
                  <Link
                    href={routes.busBooking}
                    className="btn btn-primary d-flex justify-content-center"
                  >
                    {" "}
                    Continue to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  )
}

export default BusSeatSelection