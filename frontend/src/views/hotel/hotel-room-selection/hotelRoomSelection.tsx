"use client";
import { useState } from "react";
import Link from "next/link";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";

interface RatePlan {
  id: string;
  board: string;
  cancellation: string;
  refundable: boolean;
  payment: string;
  pricePerNight: number;
}

interface RoomType {
  id: string;
  name: string;
  image: string;
  availability?: string;
  size: string;
  beds: string;
  guests: string;
  view: string;
  amenities: string[];
  rates: RatePlan[];
}

interface StayDetail {
  label: string;
  value: string;
}

interface InfoItem {
  icon: string;
  text: string;
}

const nights = 3;

const roomQuantityOptions = [0, 1, 2];

const guestOptions = ["2 adults", "1 adult", "2 adults, 1 child", "4 adults"];

const sortOptions = ["Price, lowest first", "Price, highest first", "Room size"];

const roomTypes: RoomType[] = [
  {
    id: "classic-double",
    name: "Classic Double",
    image: "assets/img/hotels/hotel-01.jpg",
    availability: "Only 3 left",
    size: "22 m²",
    beds: "1 double bed",
    guests: "2 guests",
    view: "City view",
    amenities: ["Free Wi-Fi", "Air conditioning", "Flat-screen TV", "Safe"],
    rates: [
      {
        id: "qty-0-0",
        board: "Room only",
        cancellation: "Non-refundable",
        refundable: false,
        payment: "Pay now, no changes",
        pricePerNight: 128,
      },
      {
        id: "qty-0-1",
        board: "Room only",
        cancellation: "Free cancellation until 23 May",
        refundable: true,
        payment: "Pay at the hotel",
        pricePerNight: 146,
      },
    ],
  },
  {
    id: "superior-twin",
    name: "Superior Twin",
    image: "assets/img/hotels/hotel-02.jpg",
    size: "28 m²",
    beds: "2 single beds",
    guests: "2 guests",
    view: "Courtyard view",
    amenities: ["Free Wi-Fi", "Air conditioning", "Nespresso machine", "Bathrobes"],
    rates: [
      {
        id: "qty-1-0",
        board: "Breakfast included",
        cancellation: "Non-refundable",
        refundable: false,
        payment: "Pay now, no changes",
        pricePerNight: 162,
      },
      {
        id: "qty-1-1",
        board: "Breakfast included",
        cancellation: "Free cancellation until 23 May",
        refundable: true,
        payment: "Pay at the hotel",
        pricePerNight: 181,
      },
    ],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    image: "assets/img/hotels/hotel-03.jpg",
    availability: "Only 1 left",
    size: "46 m²",
    beds: "1 king bed + sofa bed",
    guests: "3 guests",
    view: "Balcony, sea view",
    amenities: ["Free Wi-Fi", "Living area", "Lounge access", "Late check-out"],
    rates: [
      {
        id: "qty-2-0",
        board: "Breakfast included",
        cancellation: "Free cancellation until 24 May",
        refundable: true,
        payment: "Pay at the hotel",
        pricePerNight: 268,
      },
      {
        id: "qty-2-1",
        board: "Half board",
        cancellation: "Free cancellation until 24 May",
        refundable: true,
        payment: "Pay at the hotel",
        pricePerNight: 312,
      },
    ],
  },
];

const stayDetails: StayDetail[] = [
  { label: "Check-in", value: "Sun 25 May, 15:00" },
  { label: "Check-out", value: "Wed 28 May, 11:00" },
  { label: "Nights", value: `${nights}` },
  { label: "Guests", value: "2 adults" },
];

const goodToKnow: InfoItem[] = [
  {
    icon: "isax-tick-circle text-success",
    text: "Free cancellation rates can be changed until 23 May at 23:59 local time.",
  },
  {
    icon: "isax-tick-circle text-success",
    text: "Children under 6 stay free using existing bedding.",
  },
  {
    icon: "isax-info-circle text-primary",
    text: "A city tax of €3.25 per person per night is payable at the property.",
  },
];

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

const HotelRoomSelection = () => {
  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Hotel",
      active: false,
    },
    {
      label: "Select Your Room",
      active: true,
    },
  ];

  const [checkInDate] = useState(new Date("2025-05-25"));
  const [checkOutDate] = useState(new Date("2025-05-28"));
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (rateId: string, quantity: number) => {
    setRoomQuantities((prev) => ({ ...prev, [rateId]: quantity }));
  };

  const selectedRates = roomTypes.flatMap((room) =>
    room.rates
      .filter((rate) => (roomQuantities[rate.id] ?? 0) > 0)
      .map((rate) => ({ room, rate, quantity: roomQuantities[rate.id] }))
  );
  const hasSelection = selectedRates.length > 0;
  const stayTotal = selectedRates.reduce(
    (sum, item) => sum + item.rate.pricePerNight * nights * item.quantity,
    0
  );

  return (
    <>
      <Breadcrumb
        title="Select Your Room"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <Link
            href={routes.hotelDetails}
            className="fs-14 fw-medium d-inline-flex align-items-center gap-1 mb-4"
          >
            <i className="isax isax-arrow-left4 fw-semibold" />
            Back to Hotel Details
          </Link>
          {/* Stay summary */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-end row-gap-3">
                <div className="col-lg-4">
                  <h2 className="fs-18 mb-1">Hotel Miravent Barcelona</h2>
                  <p className="fs-13 text-gray-6 mb-0">
                    <i className="isax isax-location5 me-1" />
                    Ciutat Vella, Barcelona
                  </p>
                </div>
                <div className="col-lg-2 col-6">
                  <label className="form-label" htmlFor="rs-checkin">
                    Check-in
                  </label>
                  <div className="input-icon-end position-relative">
                    <DatePicker
                      className="form-control datetimepicker"
                      id="rs-checkin"
                      placeholder="dd-mm-yyyy"
                      defaultValue={checkInDate}
                      format="DD-MM-YYYY"
                    />
                    <span className="input-icon-addon">
                      <i className="isax isax-calendar" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-2 col-6">
                  <label className="form-label" htmlFor="rs-checkout">
                    Check-out
                  </label>
                  <div className="input-icon-end position-relative">
                    <DatePicker
                      className="form-control datetimepicker"
                      id="rs-checkout"
                      placeholder="dd-mm-yyyy"
                      defaultValue={checkOutDate}
                      format="DD-MM-YYYY"
                    />
                    <span className="input-icon-addon">
                      <i className="isax isax-calendar" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-2 col-6">
                  <label className="form-label" htmlFor="rs-guests">
                    Guests
                  </label>
                  <select className="form-control" id="rs-guests" name="rs-guests">
                    {guestOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-2 col-6">
                  <button type="button" className="btn btn-primary w-100">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* start row */}
          <div className="row">
            <div className="col-lg-8">
              {/* Results bar */}
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
                <p className="fs-14 mb-0">
                  <span className="fw-semibold text-dark">{roomTypes.length} room types</span>{" "}
                  available for {nights} nights
                </p>
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0 fs-13 text-gray-6" htmlFor="rs-sort">
                    Sort by
                  </label>
                  <select
                    className="form-control form-control-sm w-auto"
                    id="rs-sort"
                    name="rs-sort"
                  >
                    {sortOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Filter chips */}
              <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                <span className="badge bg-primary-transparent text-primary">
                  Free cancellation{" "}
                  <Link
                    href="#"
                    className="text-primary ms-1"
                    aria-label="Remove free cancellation filter"
                  >
                    &times;
                  </Link>
                </span>
                <span className="badge bg-primary-transparent text-primary">
                  Breakfast included{" "}
                  <Link
                    href="#"
                    className="text-primary ms-1"
                    aria-label="Remove breakfast filter"
                  >
                    &times;
                  </Link>
                </span>
                <Link href="#" className="fs-13 link-primary text-decoration-underline">
                  Clear all
                </Link>
              </div>
              {roomTypes.map((room) => (
                <div className="card" key={room.id}>
                  <div className="card-body">
                    <div className="row row-gap-3">
                      <div className="col-lg-4">
                        <ImageWithBasePath
                          src={room.image}
                          className="img-fluid rounded w-100 room-thumb"
                          alt={room.name}
                        />
                      </div>
                      <div className="col-lg-8">
                        <h3 className="fs-16 mb-2">
                          {room.name}
                          {room.availability && (
                            <span className="badge bg-danger-transparent text-danger fs-12 ms-2">
                              {room.availability}
                            </span>
                          )}
                        </h3>
                        <div className="d-flex align-items-center flex-wrap gap-3 mb-2">
                          <span className="fs-13 text-gray-6">
                            <i className="isax isax-maximize-3 me-1" />
                            {room.size}
                          </span>
                          <span className="fs-13 text-gray-6">
                            <i className="isax isax-hospital me-1" />
                            {room.beds}
                          </span>
                          <span className="fs-13 text-gray-6">
                            <i className="isax isax-profile-2user me-1" />
                            {room.guests}
                          </span>
                          <span className="fs-13 text-gray-6">
                            <i className="isax isax-eye me-1" />
                            {room.view}
                          </span>
                        </div>
                        <div className="mb-3">
                          {room.amenities.map((amenity) => (
                            <span
                              className="badge bg-light text-gray-9 fs-12 me-1 mb-1"
                              key={amenity}
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={routes.hotelDetails}
                          className="fs-13 link-primary text-decoration-underline"
                        >
                          See room photos and full amenities
                        </Link>
                      </div>
                    </div>
                    <div className="border-top mt-3 pt-3">
                      {room.rates.map((rate, rateIndex) => (
                        <div
                          className={`row align-items-center row-gap-3${rateIndex > 0 ? " border-top pt-3 mt-3" : ""}`}
                          key={rate.id}
                        >
                          <div className="col-lg-6">
                            <p className="fs-14 fw-medium text-dark mb-1">
                              <i className="isax isax-cake me-1 text-gray-6" />
                              {rate.board}
                            </p>
                            <p
                              className={`fs-13 ${rate.refundable ? "text-success" : "text-danger"} mb-1`}
                            >
                              <i className="isax isax-tick-circle me-1" />
                              {rate.cancellation}
                            </p>
                            <p className="fs-13 text-gray-6 mb-0">
                              <i className="isax isax-card me-1" />
                              {rate.payment}
                            </p>
                          </div>
                          <div className="col-lg-3 text-lg-end">
                            <p className="fs-18 fw-semibold text-dark mb-0">
                              {formatPrice(rate.pricePerNight)}
                            </p>
                            <p className="fs-13 text-gray-6 mb-0">per night</p>
                            <p className="fs-13 text-gray-6 mb-0">
                              {formatPrice(rate.pricePerNight * nights)} for {nights} nights
                            </p>
                          </div>
                          <div className="col-lg-3 text-lg-end">
                            <div className="d-flex align-items-center gap-2 justify-content-lg-end">
                              <label
                                className="form-label mb-0 fs-13 visually-hidden"
                                htmlFor={rate.id}
                              >
                                Rooms
                              </label>
                              <select
                                className="form-control form-control-sm w-auto"
                                id={rate.id}
                                name={rate.id}
                                value={roomQuantities[rate.id] ?? 0}
                                onChange={(event) =>
                                  handleQuantityChange(rate.id, Number(event.target.value))
                                }
                              >
                                {roomQuantityOptions.map((quantity) => (
                                  <option value={quantity} key={quantity}>
                                    {quantity}
                                  </option>
                                ))}
                              </select>
                              <Link href={routes.hotelBooking} className="btn btn-primary btn-sm">
                                Select
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* end col */}
            <div className="col-lg-4 theiaStickySidebar">
              <div className="card">
                <div className="card-header">
                  <h4 className="fs-16 mb-0">Your stay</h4>
                </div>
                <div className="card-body">
                  {stayDetails.map((detail) => (
                    <div className="d-flex justify-content-between mb-2" key={detail.label}>
                      <span className="fs-14">{detail.label}</span>
                      <span className="fs-14 fw-medium text-dark">{detail.value}</span>
                    </div>
                  ))}
                  <div className="border-top pt-3 mt-3">
                    {hasSelection ? (
                      <>
                        {selectedRates.map(({ room, rate, quantity }) => (
                          <div className="d-flex justify-content-between mb-2" key={rate.id}>
                            <span className="fs-14">
                              {quantity} &times; {room.name}{" "}
                              <span className="text-gray-6">
                                ({rate.board}, {rate.refundable ? "free cancellation" : "non-refundable"})
                              </span>
                            </span>
                            <span className="fs-14 fw-medium text-dark">
                              {formatPrice(rate.pricePerNight * nights * quantity)}
                            </span>
                          </div>
                        ))}
                        <div className="d-flex justify-content-between border-top pt-3 mt-3 mb-3">
                          <span className="fs-16 fw-semibold text-dark">Total</span>
                          <span className="fs-20 fw-semibold text-primary">
                            {formatPrice(stayTotal)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="fs-13 text-gray-6 mb-2">
                        No rooms selected yet. Choose a rate to see your total.
                      </p>
                    )}
                    <Link
                      href={hasSelection ? routes.hotelBooking : "#"}
                      className={`btn btn-primary w-100${hasSelection ? "" : " disabled"}`}
                      role="button"
                      aria-disabled={!hasSelection}
                      tabIndex={hasSelection ? undefined : -1}
                    >
                      Continue to checkout
                    </Link>
                  </div>
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

export default HotelRoomSelection;
