"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import VideoModal from "../../components/video-modal/videoModal";
import Link from "next/link";
import { DatePicker, TimePicker } from '../../components/common-date-picker/appDatePicker'

import { all_routes } from "../../routes/all_routes";
import CommonDateRange from "../../components/common-date-range-picker/CommonDateRange";
import ExperienceSection from "./experienceSection";
import DeliverySection from "./deliverySection";
import GuideSection from "./guideSection";
import TestimonialSection from "./testimonialSection";
import ChooseSection from "./chooseSection";
import FooterSection from "./footerSection";
import { HaniTrendingTours } from "@/features/home-experience/ui/HaniTrendingTours";
import { HaniHomeTourSearch } from "@/features/home-experience/ui/HaniHomeTourSearch";
import { HaniScopeTourSection } from "@/features/home-experience/ui/HaniScopeTourSection";
import { HaniOriginCities } from "@/features/home-experience/ui/HaniOriginCities";
import { HaniRecommendedVisas } from "@/features/home-experience/ui/HaniRecommendedVisas";
import { HaniLatestContent } from "@/features/home-experience/ui/HaniLatestContent";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
import { parseTime } from '../../utils/dateFormat'
import CircularText from '../../components/circular-text/circularText'
import BannerCounter from "../../components/banner-counter/counter";
type Mode = "flight" | "hotel" | "cruise" | "tour" | "bus" | "activity" | "visa" | "guide";

type BookingState = {
  flight: {
    adults: number;
    children: number;
    infants: number;
    cabinClass: string;
  };
  hotel: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
  cruise: {
    adults: number;
    children: number;
    infants: number;
  };
  tour: {
    adults: number;
    children: number;
    infants: number;
  };
  bus: {
    adults: number;
    children: number;
    infants: number;
  };
  activity: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
  visa: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
  guide: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
};
const HomeServiceOne = ({
  tourScope,
}: {
  tourScope?: "Domestic" | "Foreign";
}) => {
  const t = useTranslations("home");
  const [showModal, setShowModal] = useState(false);
  const videoUrl = "https://youtu.be/NSAOrGb9orM";
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


const [formData, setFormData] = useState<BookingState>({
  flight: {
    adults: 0,
    children: 0,
    infants: 0,
    cabinClass: "Economy",
  },
  hotel: {
    rooms: 0,
    adults: 0,
    children: 0,
    infants: 0,
  },
  cruise: {
    adults: 0,
    children: 0,
    infants:0,
  },
  tour: {
    adults: 0,
    children: 0,
    infants:0,
  },
  bus: {
    adults: 0,
    children: 0,
    infants:0,
  },
  activity: {
    rooms:0,
    adults: 0,
    children: 0,
    infants:0,
  },
  visa: {
    rooms:0,
    adults: 0,
    children: 0,
    infants:0,
  },
  guide: {
    rooms:0,
    adults: 0,
    children: 0,
    infants:0,
  },
});
const updateField = <T extends Mode>(
  mode: T,
  field: keyof BookingState[T],
  value: React.SetStateAction<number>
) => {
  setFormData((prev) => ({
    ...prev,
    [mode]: {
      ...prev[mode],
      [field]:
        typeof value === "function"
          ? value(prev[mode][field] as number)
          : value,
    },
  }));
};
const [appliedData, setAppliedData] = useState(formData);

const handleCounter = (mode: "flight" | "hotel" | "cruise" | "bus" | "activity" | "guide" | "visa" | "tour") => {
  setAppliedData((prev) => ({
    ...prev,
    [mode]: formData[mode],
  }));
};
const flightPassengers =
  appliedData.flight.adults +
  appliedData.flight.children +
  appliedData.flight.infants ;
  const totalFlightPassengers = flightPassengers === 0 ? 4 : flightPassengers;

const hotelGuests =
  appliedData.hotel.rooms +
  appliedData.hotel.adults +
  appliedData.hotel.children +
  appliedData.hotel.infants;
  const totalHotelGuest = hotelGuests === 0 ? 4 : hotelGuests;

const cruisePassenger =
  appliedData.cruise.adults +
  appliedData.cruise.children +
  appliedData.cruise.infants;
  const totalCruisePassengers = cruisePassenger === 0 ? 4 : cruisePassenger;

const tourPassenger =
  appliedData.tour.adults +
  appliedData.tour.children +
  appliedData.tour.infants;
  const totalTourPassengers = tourPassenger === 0 ? 4 : tourPassenger;

const busPassenger =
  appliedData.bus.adults +
  appliedData.bus.children +
  appliedData.bus.infants;
  const totalBusPassengers = busPassenger === 0 ? 4 : busPassenger;

const activityPassenger =
  appliedData.activity.rooms +
  appliedData.activity.adults +
  appliedData.activity.children +
  appliedData.activity.infants;
  const totalActivityPassengers = activityPassenger === 0 ? 4 : activityPassenger;

const visaPassenger =
  appliedData.visa.rooms +
  appliedData.visa.adults +
  appliedData.visa.children +
  appliedData.visa.infants;
  const totalVisaPassengers = visaPassenger === 0 ? 4 : visaPassenger;

const guidePassenger =
  appliedData.guide.rooms +
  appliedData.guide.adults +
  appliedData.guide.children +
  appliedData.guide.infants;
  const totalGuidePassengers = guidePassenger === 0 ? 4 : guidePassenger;

  const [_dates, setDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const handleApply = (start: Date, end: Date) => {
    setDates({ start, end });
    console.log("Selected:", start, end);
  };

  const [flightRadio, setFlightRadio] = useState<string>("oneway");
  const [carRadio, setCarRadio] = useState<string>("same-drop");
  const [busRadio, setbusRadio] = useState<string>("oneway");
  const [defaultDate] = useState(new Date());
  const defaultTime = parseTime("10:30 AM");
  return (
    <>
      {/* Hero Section */}
      <section className="hero-sec-eight">
        <div className="container">
          <h1 className="animate-text">{t("heroTitle")}</h1>
          <div
            className="animate-button"
          >
            <CircularText text="Play Video . Play Video ." />
            <Link
              href="#"
              className="button-circle"
              data-fancybox=""
              aria-label={t("playVideo")}
              onClick={handleOpenModal}
            >
              <i className="isax isax-play" />
            </Link>
            <VideoModal
              show={showModal}
              handleClose={handleCloseModal}
              videoUrl={videoUrl}
            />
          </div>
          <div className="hero-content">
            <div className="row align-items-center">
              <div className="col-md-12 mx-auto">
                <div
                  className="banner-form card mb-0 wow fadeInUp"
                  data-wow-delay="1.5"
                >
                  <div className="card-header">
                    <ul className="nav">
                      <li>
                        <Link
                          href="#"
                          className="nav-link "
                          data-bs-toggle="tab"
                          data-bs-target="#flight"
                        >
                          <i className="isax isax-airplane5 me-2" />
                          Flights
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Hotels"
                        >
                          <i className="isax isax-buildings5 me-2" />
                          Hotels
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Cars"
                        >
                          <i className="isax isax-car5 me-2" />
                          Cars
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Cruise"
                        >
                          <i className="isax isax-ship5 me-2" />
                          Cruise
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#Tour"
                        >
                          <i className="isax isax-camera5 me-2" />
                          Tour
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Bus"
                        >
                          <i className="isax isax-bus5 me-2" />
                          Bus
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Activity"
                        >
                          <i className="isax isax-calendar5 me-2" />
                          Activity
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Visa"
                        >
                          <i className="isax isax-document5 me-2" />
                          Visa
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#Guide"
                        >
                          <i className="isax isax-user-octagon me-2" />
                          Guide
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="tab-content">
                        <div className="tab-pane fade" id="flight">
                          <form>
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                              <div className="d-flex align-items-center">
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="oneway"
                                    onChange={() => setFlightRadio("oneway")}
                                    checked={
                                      flightRadio === "oneway" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="oneway"
                                  >
                                    Oneway
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="roundtrip"
                                    onChange={() => setFlightRadio("roundtrip")}
                                    checked={
                                      flightRadio === "roundtrip" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="roundtrip"
                                  >
                                    Round Trip
                                  </label>
                                </div>
                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="Radio"
                                    id="multiway"
                                    onChange={() => setFlightRadio("multiway")}
                                    checked={
                                      flightRadio === "multiway" ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label fs-14 ms-2"
                                    htmlFor="multiway"
                                  >
                                    Multi Trip
                                  </label>
                                </div>
                              </div>
                              <span className="fw-medium fs-16 mb-2 text-white">
                                Millions of cheap flights. One simple search
                              </span>
                            </div>
                            <div
                              className="normal-trip"
                              style={{
                                display:
                                  flightRadio === "multiway" ? "none" : "block",
                              }}
                            >
                              <div className="d-lg-flex">
                                <div className="d-flex  form-info">
                                  <div className="form-item change-drop booking-dropdown dropdown">
                                    <div
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                      aria-expanded="false"
                                      role="menu"
                                    >
                                      <BookingDropdown
                                        label="From"
                                        defaultValue="New York"
                                        defaultSubValue="John F. Kennedy International Airport"
                                        locations={[
                                          { value: "New York", subValue: "John F. Kennedy International Airport" },
                                          { value: "Boston", subValue: "Boston Logan International Airport" },
                                          { value: "NorthernVirginia", subValue: "Dulles International Airport" },
    { value: "LosAngeles", subValue: "Los Angeles International Airport" },
    { value: "Orlando", subValue: "Orlando International Airport" }
                                        ]}
                                      />
                                      </div>
                                      </div>


                                      <div className="form-item change-drop booking-dropdown dropdown ps-2 ps-sm-3">
                                        <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                          <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </span>
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                          <BookingDropdown
                                        label="To"
                                        defaultValue="Las Vegas"
                                        defaultSubValue="Harry Reid International Airport"
                                        locations={[
                                          { value: "New York", subValue: "John F. Kennedy International Airport" },
                                          { value: "Boston", subValue: "Boston Logan International Airport" },
                                          { value: "NorthernVirginia", subValue: "Dulles International Airport" },
    { value: "LosAngeles", subValue: "Los Angeles International Airport" },
    { value: "Orlando", subValue: "Orlando International Airport" }
                                        ]}
                                      />
                                          </div>
                                      </div>
                                      <div className="form-item">
                                        <label className="form-label fs-14 text-default mb-1">
                                          Departure
                                        </label>
                                        <DatePicker
                                          className="form-control datetimepicker"
                                          placeholder="dd/mm/yyyy"
                                          defaultValue={defaultDate}
                                          disablePast
                                          format="DD-MM-YYYY"
                                        />
                                        <p className="fs-12 mb-0">Monday</p>
                                      </div>
                                      <div
                                        className="form-item round-drip"
                                        style={{
                                          display:
                                            flightRadio === "roundtrip"
                                              ? "block"
                                              : "none",
                                        }}
                                      >
                                        <label className="form-label fs-14 text-default mb-1">
                                          Return
                                        </label>
                                        <DatePicker
                                          className="form-control datetimepicker"
                                          placeholder="dd/mm/yyyy"
                                          defaultValue={defaultDate}
                                          disablePast
                                          format="DD-MM-YYYY"
                                        />
                                        <p className="fs-12 mb-0">Wednesday</p>
                                      </div>
                                      <div className="form-item dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                          <label className="form-label fs-14 text-default mb-1">
                                            Travellers and cabin class
                                          </label>
                                          <div className="home-eight-title text-dark member-count">
                                            {totalFlightPassengers}{" "}
                                            <span className="fw-normal fs-14">
                                              Persons
                                            </span>
                                          </div>
                                          <p className="fs-12 mb-0">
                                            <span className="adult">1</span> Adult,{" "}
                                            <span className="class-name">
                                              Economy
                                            </span>
                                          </p>
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                          <div className="mb-3 home-eight-title text-dark">
                                            Select Travelers &amp; Class
                                          </div>
                                          <div className="mb-3 border br-10 info-item pb-1">
                                            <div className="fs-16 fw-medium mb-2 text-dark">
                                              Travellers
                                            </div>
                                            <div className="row">
                                              <div className="col-md-4">
                                                <div className="mb-3">
                                                  <label className="form-label text-gray-9 mb-2">
                                                    Adults
                                                    <span className="text-default fw-normal">
                                                      ( 12+ Yrs )
                                                    </span>
                                                  </label>
                                                  <BannerCounter
                                                    value={formData.flight.adults}
                                                    setValue={(v) => updateField("flight", "adults", v)}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="mb-3">
                                                  <label className="form-label text-gray-9 mb-2">
                                                    Childrens
                                                    <span className="text-default fw-normal">
                                                      ( 2-12 Yrs )
                                                    </span>
                                                  </label>
                                                   <BannerCounter
                                                    value={formData.flight.children}
                                                    setValue={(v) => updateField("flight", "children", v)}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="mb-3">
                                                  <label className="form-label text-gray-9 mb-2">
                                                    Infants
                                                    <span className="text-default fw-normal">
                                                      ( 0-12 Yrs )
                                                    </span>
                                                  </label>
                                                  <BannerCounter
                                                    value={formData.flight.infants}
                                                    setValue={(v) => updateField("flight", "infants", v)}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3 border br-10 info-item pb-1">
                                            <span className="fs-16 fw-medium mb-2 text-dark">
                                              Travellers
                                            </span>
                                            <div className="d-flex align-items-center flex-wrap">
                                              <div className="form-check me-3 mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  defaultValue="Economy"
                                                  name="cabin-class"
                                                  id="economy"
                                                  defaultChecked
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="economy"
                                                >
                                                  Economy
                                                </label>
                                              </div>
                                              <div className="form-check me-3 mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  defaultValue="Economy"
                                                  name="cabin-class"
                                                  id="premium-economy"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="premium-economy"
                                                >
                                                  Premium Economy
                                                </label>
                                              </div>
                                              <div className="form-check me-3 mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  defaultValue="Business"
                                                  name="cabin-class"
                                                  id="business2"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="business2"
                                                >
                                                  Business
                                                </label>
                                              </div>
                                              <div className="form-check mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  defaultValue="First Class"
                                                  name="cabin-class"
                                                  id="first-class"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="first-class"
                                                >
                                                  First Class
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="d-flex justify-content-end">
                                            <Link
                                              href="#"
                                              className="btn btn-light btn-sm me-2"
                                            >
                                              Cancel
                                            </Link>
                                            <button
                                              type="button"
                                              className="btn btn-primary btn-sm apply-btn"
                                              onClick={()=>handleCounter("flight")}
                                            >
                                              Apply
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Link
                                      href={all_routes.flightGrid}
                                      className="btn btn-primary search-btn rounded"
                                    >
                                      Search
                                    </Link>
                                  </div>
                                </div>
                                <div
                                  className="multi-trip"
                                  style={{
                                    display:
                                      flightRadio === "multiway" ? "block" : "none",
                                  }}
                                >
                                  <div className="d-lg-flex">
                                    <div className="d-flex  form-info">
                                      <div className="form-item change-drop booking-dropdown dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                         <BookingDropdown
                                        label="From"
                                        defaultValue="New York"
                                        defaultSubValue="John F. Kennedy International Airport"
                                        locations={[
                                          { value: "New York", subValue: "John F. Kennedy International Airport" },
                                          { value: "Boston", subValue: "Boston Logan International Airport" },
                                          { value: "NorthernVirginia", subValue: "Dulles International Airport" },
    { value: "LosAngeles", subValue: "Los Angeles International Airport" },
    { value: "Orlando", subValue: "Orlando International Airport" }
                                        ]}
                                      />
                                      </div>

                                      </div>
                                      <div className="form-item change-drop booking-dropdown dropdown ps-2 ps-sm-3">
                                        <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                          <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </span>
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                         <BookingDropdown
                                        label="To"
                                        defaultValue="Las Vegas"
                                        defaultSubValue="Harry Reid International Airport"
                                        locations={[
                                          { value: "New York", subValue: "John F. Kennedy International Airport" },
                                          { value: "Boston", subValue: "Boston Logan International Airport" },
                                          { value: "NorthernVirginia", subValue: "Dulles International Airport" },
    { value: "LosAngeles", subValue: "Los Angeles International Airport" },
    { value: "Orlando", subValue: "Orlando International Airport" }
                                        ]}
                                      />
                                          </div>
                                      </div>
                                      <div className="form-item">
                                        <label className="form-label fs-14 text-default mb-1">
                                          Departure
                                        </label>
                                        <DatePicker
                                          className="form-control datetimepicker"
                                          placeholder="dd/mm/yyyy"
                                          defaultValue={defaultDate}
                                          disablePast
                                          format="DD-MM-YYYY"
                                        />
                                        <p className="fs-12 mb-0">Monday</p>
                                      </div>
                                    </div>
                                    <Link
                                      href={all_routes.flightGrid}
                                      className="btn btn-primary search-btn rounded"
                                    >
                                      Search
                                    </Link>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane fade" id="Hotels">
                              <form>
                                <div className="fw-medium fs-16 mb-2 text-center text-white">
                                  Book Hotel - Villas, Apartments &amp; more.
                                </div>
                                <div className="d-lg-flex">
                                  <div className="d-flex  form-info">
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="City, Property name or Location"
                                        defaultValue="New York"
                                        defaultSubValue="USA"
                                        locations={[
                                          { value: "USA", subValue: "2000 Properties" },
                                          { value: "Japan", subValue: "3000 Properties" },
                                          { value: "Singapore", subValue: "Singapore" },
    { value: "Russia", subValue: " 8000 Properties" },
    { value: "Germany", subValue: "2000 Properties" }
                                        ]}
                                      />
                                      </div>
                                      
                                    </div>

                                    <CommonDateRange
                                      onApply={handleApply}
                                      fromLabel="Check In"
                                      toLabel="Check Out"
                                    />

                                    <div className="form-item dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <label className="form-label fs-14 text-default mb-1">
                                          Guests
                                        </label>
                                        <div className="home-eight-title text-dark member-count">
                                          {totalHotelGuest}{" "}
                                          <span className="fw-normal fs-14">
                                            Persons
                                          </span>
                                        </div>
                                        <p className="fs-12 mb-0">
                                          <span className="adult">4</span> Adult,{" "}
                                          <span className="room">2</span> Rooms
                                        </p>
                                      </div>
                                      <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                        <div className="mb-3 home-eight-title text-dark">
                                          Select Travelers &amp; Class
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="row">
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Rooms
                                                </label>
                                                <BannerCounter
                                                    value={formData.hotel.rooms}
                                                    setValue={(v) => updateField("hotel", "rooms", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Adults
                                                </label>
                                                <BannerCounter
                                                    value={formData.hotel.adults}
                                                    setValue={(v) => updateField("hotel", "adults", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Children
                                                  <span className="text-default fw-normal">
                                                    ( 2-12 Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                    value={formData.hotel.children}
                                                    setValue={(v) => updateField("hotel", "children", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Infants
                                                  <span className="text-default fw-normal">
                                                    ( 0-12 Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                    value={formData.hotel.infants}
                                                    setValue={(v) => updateField("hotel", "infants", v)}
                                                  />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Travellers
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room01"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room01"
                                              >
                                                Single
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room02"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room02"
                                              >
                                                Double
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room03"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room03"
                                              >
                                                Delux
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room04"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room04"
                                              >
                                                Suite
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Property Type
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property01"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property01"
                                              >
                                                Villa
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property02"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property02"
                                              >
                                                Condo
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property03"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property03"
                                              >
                                                Cabin
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property04"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property04"
                                              >
                                                Apartments
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                          <Link
                                            href="#"
                                            className="btn btn-light btn-sm me-2"
                                          >
                                            Cancel
                                          </Link>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-sm apply-btn"
                                            onClick={()=>handleCounter("hotel")}
                                          >
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="Price per Night"
                                        defaultValue="$1000 - $15000"
                                        defaultSubValue="20 Offers Available"
                                        locations={[
                                          { value: "$500 - $2000", subValue: "Upto 65% offers" },
                                          { value: "$2000 - $5000", subValue: "Upto 40% offers" },
                                          { value: "$5000 - $8000", subValue: "Upto 35% offers" },
    { value: "$9000 - $11000", subValue: "Upto 20% offers" },
    { value: "$11000 - $15000", subValue: "Upto 10% offers" }
                                        ]}
                                      />
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    href={all_routes.hotelGrid}
                                    className="btn btn-primary search-btn rounded"
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane fade" id="Cars">
                              <form>
                                <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                  <div className="d-flex align-items-center flex-wrap">
                                    <div className="form-check d-flex align-items-center me-3 mb-2">
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        name="drop"
                                        id="same-drop"
                                        defaultValue="same-drop"
                                        onChange={() => setCarRadio("same-drop")}
                                        checked={
                                          carRadio === "same-drop" ? true : false
                                        }
                                      />
                                      <label
                                        className="form-check-label fs-14 ms-2"
                                        htmlFor="same-drop"
                                      >
                                        Same drop-off
                                      </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center me-3 mb-2">
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        name="drop"
                                        id="different-drop"
                                        defaultValue="different-drop"
                                        onChange={() =>
                                          setCarRadio("different-drop")
                                        }
                                        checked={
                                          carRadio === "different-drop"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="form-check-label fs-14 ms-2"
                                        htmlFor="different-drop"
                                      >
                                        Different Drop off
                                      </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center me-3 mb-2">
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        name="drop"
                                        id="airport"
                                        defaultValue="airport"
                                        onChange={() => setCarRadio("airport")}
                                        checked={
                                          carRadio === "airport" ? true : false
                                        }
                                      />
                                      <label
                                        className="form-check-label fs-14 ms-2"
                                        htmlFor="airport"
                                      >
                                        Airport
                                      </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center me-3 mb-2">
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        name="drop"
                                        id="hourly-drop"
                                        defaultValue="hourly-drop"
                                        onChange={() => setCarRadio("hourly-drop")}
                                        checked={
                                          carRadio === "hourly-drop" ? true : false
                                        }
                                      />
                                      <label
                                        className="form-check-label fs-14 ms-2"
                                        htmlFor="hourly-drop"
                                      >
                                        Hourly Package
                                      </label>
                                    </div>
                                  </div>
                                  <div className="fw-medium fs-16 mb-2 text-white">
                                    Book Car for rental
                                  </div>
                                </div>
                                <div className="d-lg-flex">
                                  <div className="d-flex  form-info">
                                    <div
                                      className="form-item change-drop booking-dropdown dropdown from-location"
                                      style={{
                                        display:
                                          carRadio === "airport" ? "none" : "block",
                                      }}
                                    >
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                         <BookingDropdown
                                        label="From"
                                        defaultValue="USA"
                                        defaultSubValue="2000 Cars"
                                        locations={[
                                          { value: "USA", subValue: "2000 Cars" },
                                          { value: "Japan", subValue: "3000 Cars" },
                                          { value: "Singapore", subValue: "8000 Cars" },
    { value: "Russia", subValue: "8000 Cars" },
    { value: "Germany", subValue: "6000 Cars" }
                                        ]}
                                      />
                                      </div>
                                      </div>
                                    </div>
                                    <div
                                      className="form-item change-drop dropdown pickup-airport"
                                      style={{
                                        display:
                                          carRadio === "airport" ? "block" : "none",
                                      }}
                                    >
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="From"
                                        defaultValue="USA"
                                        defaultSubValue="2000 Cars"
                                        locations={[
                                          { value: "USA", subValue: "2000 Cars" },
                                          { value: "Japan", subValue: "3000 Cars" },
                                          { value: "Singapore", subValue: "8000 Cars" },
    { value: "Russia", subValue: "8000 Cars" },
    { value: "Germany", subValue: "6000 Cars" }
                                        ]}
                                      />
                                      </div>
                                    </div>
                                    <div className="form-item change-drop booking-dropdown dropdown to-location ps-2 ps-sm-3">
                                      <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                        <i className="fa-solid fa-arrow-right-arrow-left" />
                                      </span>
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="To"
                                        defaultValue="USA"
                                        defaultSubValue="2000 Cars"
                                        locations={[
                                          { value: "USA", subValue: "2000 Cars" },
                                          { value: "Japan", subValue: "3000 Cars" },
                                          { value: "Singapore", subValue: "8000 Cars" },
    { value: "Russia", subValue: "8000 Cars" },
    { value: "Germany", subValue: "6000 Cars" }
                                        ]}
                                      />
                                      </div>
                                    </div>
                                    <div className="form-item">
                                      <label className="form-label fs-14 text-default mb-1">
                                        Departure
                                      </label>
                                      <DatePicker
                                        className="form-control datetimepicker"
                                        placeholder="dd/mm/yyyy"
                                        defaultValue={defaultDate}
                                        disablePast
                                        format="DD-MM-YYYY"
                                      />
                                      <p className="fs-12 mb-0">Monday</p>
                                    </div>
                                    <div
                                      className="form-item return-drop"
                                      style={{
                                        display:
                                          carRadio === "different-drop"
                                            ? "block"
                                            : "none",
                                      }}
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        Return
                                      </label>
                                      <DatePicker
                                        className="form-control datetimepicker"
                                        placeholder="dd/mm/yyyy"
                                        defaultValue={defaultDate}
                                        disablePast
                                        format="DD-MM-YYYY"
                                      />
                                      <p className="fs-12 mb-0">Wednesday</p>
                                    </div>
                                    <div className="form-item">
                                      <label className="form-label fs-14 text-default mb-1">
                                        Pickup Time
                                      </label>
                                      <TimePicker
                                        defaultValue={defaultTime}
                                        format="h:mm A"
                                        className="form-control timepicker"
                                      />
                                    </div>
                                    <div
                                      className="form-item dropoff-time"
                                      style={{
                                        display:
                                          carRadio === "different-drop"
                                            ? "block"
                                            : "none",
                                      }}
                                    >
                                      <label className="form-label fs-14 text-default mb-1">
                                        Dropoff Time
                                      </label>
                                      <TimePicker
                                        defaultValue={defaultTime}
                                        format="h:mm A"
                                        className="form-control timepicker"
                                      />
                                    </div>
                                    <div className="form-item hourly-time">
                                      <label className="form-label fs-14 text-default mb-1">
                                        Hours
                                      </label>
                                      <div className="home-eight-title text-dark">
                                        02 Hrs 10 Kms
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    href={all_routes.carGrid}
                                    className="btn btn-primary search-btn rounded"
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane fade" id="Cruise">
                              <form>
                                <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                  <div className="fw-medium fs-16 mb-2 text-white">
                                    Search For Cruise
                                  </div>
                                </div>
                                <div className="d-lg-flex">
                                  <div className="d-flex  form-info">
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="Destination"
                                        defaultValue="New York"
                                        defaultSubValue="USA"
                                        locations={[
                                          { value: "New York", subValue: "USA" },
                                          { value: "Boston", subValue: "Spain" },
                                          { value: "NorthernVirginia", subValue: "USA" },
    { value: "LosAngeles", subValue: "USA" },
    { value: "Orlando", subValue: "USA" }
                                        ]}
                                      />
                                      </div>
                                    </div>
                                    <CommonDateRange
                                      onApply={handleApply}
                                      fromLabel="Start Date"
                                      toLabel="End Date"
                                    />
                                    {/* Add a hidden input or just use one of the inputs to trigger the daterangepicker */}
                                    <input
                                      type="text"
                                      className="date-range d-none"
                                    />
                                    <div className="form-item dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <label className="form-label fs-14 text-default mb-1">
                                          Travellers &amp; Cabin{" "}
                                        </label>
                                        <div className="home-eight-title text-dark member-count">
                                          {totalCruisePassengers}{" "}
                                          <span className="fw-normal fs-14">
                                            Persons
                                          </span>
                                        </div>
                                        <p className="fs-12 mb-0">
                                          <span className="adult">4</span> Adult
                                        </p>
                                      </div>
                                      <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                        <div className="mb-3 home-eight-title text-dark">
                                          Select Travelers &amp; Class
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Travellers
                                          </div>
                                          <div className="row">
                                            <div className="col-md-4">
                                              <div className="mb-3">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Adults
                                                  <span className="text-default fw-normal">
                                                    ( 12+ Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                    value={formData.cruise.adults}
                                                    setValue={(v) => updateField("cruise", "adults", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="mb-3">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Childrens
                                                  <span className="text-default fw-normal">
                                                    ( 2-12 Yrs )
                                                  </span>
                                                </label>
                                                 <BannerCounter
                                                    value={formData.cruise.children}
                                                    setValue={(v) => updateField("cruise", "children", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="mb-3">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Infants
                                                  <span className="text-default fw-normal">
                                                    ( 0-12 Yrs )
                                                  </span>
                                                </label>
                                                 <BannerCounter
                                                    value={formData.cruise.infants}
                                                    setValue={(v) => updateField("cruise", "infants", v)}
                                                  />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Select Cabin
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="cabin"
                                                id="cabin1"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cabin1"
                                              >
                                                Solo cabins
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="cabin"
                                                id="cabin2"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cabin2"
                                              >
                                                Balcony
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                defaultValue="Business"
                                                name="cabin"
                                                id="cabin3"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cabin3"
                                              >
                                                Oceanview
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="cabin"
                                                id="cabin4"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cabin4"
                                              >
                                                Balcony rooms
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                          <Link
                                            href="#"
                                            className="btn btn-light btn-sm me-2"
                                          >
                                            Cancel
                                          </Link>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-sm apply-btn"
                                            onClick={()=>handleCounter("cruise")}
                                          >
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    href={all_routes.cruiseGrid}
                                    className="btn btn-primary search-btn rounded"
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane fade active show" id="Tour">
                              <HaniHomeTourSearch />
                            </div>
                            <div className="tab-pane fade" id="Bus">
                              <form action="#">
                                <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                  <div className="d-flex align-items-center">
                                    <div className="form-check d-flex align-items-center me-3 mb-2">
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        name="tripType"
                                        id="oneways"
                                        defaultValue="oneway"
                                        onChange={() => setbusRadio("oneway")}
                                        checked={
                                          busRadio === "oneway" ? true : false
                                        }
                                      />
                                      <label
                                        className="form-check-label fs-14 ms-2"
                                        htmlFor="oneways"
                                      >
                                        Oneway
                                      </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center me-3 mb-2">
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        name="tripType"
                                        id="roundedtrip"
                                        defaultValue="roundtrip"
                                        onChange={() => setbusRadio("roundtrip")}
                                        checked={
                                          busRadio === "roundtrip" ? true : false
                                        }
                                      />
                                      <label
                                        className="form-check-label fs-14 ms-2"
                                        htmlFor="roundedtrip"
                                      >
                                        Round Trip
                                      </label>
                                    </div>
                                  </div>
                                  <div className="fw-medium fs-16 mb-2 text-white">
                                    Low cost Buses in One simple search
                                  </div>
                                </div>
                                <div className="normal-trip">
                                  <div className="d-lg-flex">
                                    <div className="d-flex  form-info">
                                      <div className="form-item change-drop booking-dropdown dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                          <BookingDropdown
                                        label="From"
                                        defaultValue="New York"
                                        defaultSubValue="USA"
                                        locations={[
                                          { value: "New York", subValue: "USA" },
                                          { value: "Boston", subValue: "Spain" },
                                          { value: "NorthernVirginia", subValue: "USA" },
    { value: "LosAngeles", subValue: "USA" },
    { value: "Orlando", subValue: "USA" }
                                        ]}
                                      />
                                        </div>
                                      </div>
                                      <div className="form-item change-drop booking-dropdown dropdown ps-2 ps-sm-3">
                                        <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                          <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </span>
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                        <BookingDropdown
                                        label="To"
                                        defaultValue="Las Vegas"
                                        defaultSubValue="USA"
                                        locations={[
                                          { value: "New York", subValue: "USA" },
                                          { value: "Boston", subValue: "Spain" },
                                          { value: "NorthernVirginia", subValue: "USA" },
    { value: "LosAngeles", subValue: "USA" },
    { value: "Orlando", subValue: "USA" }
                                        ]}
                                      />
                                        </div>
                                      </div>
                                      <div className="form-item">
                                        <label className="form-label fs-14 text-default mb-1">
                                          Departure
                                        </label>
                                        <DatePicker
                                          className="form-control datetimepicker"
                                          placeholder="dd/mm/yyyy"
                                          defaultValue={defaultDate}
                                          disablePast
                                          format="DD-MM-YYYY"
                                        />
                                        <p className="fs-12 mb-0">Monday</p>
                                      </div>
                                      <div
                                        className="form-item round-drip"
                                        style={{
                                          display:
                                            busRadio === "roundtrip"
                                              ? "block"
                                              : "none",
                                        }}
                                      >
                                        <label className="form-label fs-14 text-default mb-1">
                                          Return
                                        </label>
                                        <DatePicker
                                          className="form-control datetimepicker"
                                          placeholder="dd/mm/yyyy"
                                          defaultValue={defaultDate}
                                          disablePast
                                          format="DD-MM-YYYY"
                                        />
                                        <p className="fs-12 mb-0">Wednesday</p>
                                      </div>
                                      <div className="form-item dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                          <label className="form-label fs-14 text-default mb-1">
                                            Travellers
                                          </label>
                                          <div className="home-eight-title text-dark member-count">
                                            {totalBusPassengers}{" "}
                                            <span className="fw-normal fs-14">
                                              Persons
                                            </span>
                                          </div>
                                          <p className="fs-12 mb-0">
                                            <span className="adult">2</span> Adult,{" "}
                                            <span className="children">2</span>{" "}
                                            children
                                          </p>
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                          <div className="mb-3 home-eight-title text-dark">
                                            Select Travelers &amp; Class
                                          </div>
                                          <div className="mb-3 border br-10 info-item pb-1">
                                            <div className="fs-16 fw-medium mb-2 text-dark">
                                              Travellers
                                            </div>
                                            <div className="row">
                                              <div className="col-md-4">
                                                <div className="mb-3">
                                                  <label className="form-label text-gray-9 mb-2">
                                                    Adults
                                                    <span className="text-default fw-normal">
                                                      ( 12+ Yrs )
                                                    </span>
                                                  </label>
                                                   <BannerCounter
                                                    value={formData.bus.adults}
                                                    setValue={(v) => updateField("bus", "adults", v)}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="mb-3">
                                                  <label className="form-label text-gray-9 mb-2">
                                                    Childrens
                                                    <span className="text-default fw-normal">
                                                      ( 2-12 Yrs )
                                                    </span>
                                                  </label>
                                                   <BannerCounter
                                                    value={formData.bus.children}
                                                    setValue={(v) => updateField("bus", "children", v)}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="mb-3">
                                                  <label className="form-label text-gray-9 mb-2">
                                                    Infants
                                                    <span className="text-default fw-normal">
                                                      ( 0-12 Yrs )
                                                    </span>
                                                  </label>
                                                   <BannerCounter
                                                    value={formData.bus.infants}
                                                    setValue={(v) => updateField("bus", "infants", v)}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3 border br-10 info-item pb-1">
                                            <div className="fs-16 fw-medium mb-2 text-dark">
                                              Travellers
                                            </div>
                                            <div className="d-flex align-items-center flex-wrap">
                                              <div className="form-check me-3 mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  defaultValue="Economy"
                                                  name="cabin-class"
                                                  id="economys"
                                                  defaultChecked
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="economys"
                                                >
                                                  Seater
                                                </label>
                                              </div>
                                              <div className="form-check me-3 mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  defaultValue="Economy"
                                                  name="cabin-class"
                                                  id="premium-economys"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="premium-economys"
                                                >
                                                  Sleeper
                                                </label>
                                              </div>
                                              <div className="form-check me-3 mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  defaultValue="Business"
                                                  name="cabin-class"
                                                  id="business"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="business"
                                                >
                                                  AC Sleeper
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="d-flex justify-content-end">
                                            <Link
                                              href="#"
                                              className="btn btn-light btn-sm me-2"
                                            >
                                              Cancel
                                            </Link>
                                            <button
                                              type="button"
                                              className="btn btn-primary btn-sm apply-btn"
                                              onClick={()=>handleCounter("bus")}
                                            >
                                              Apply
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Link
                                      href={all_routes.busList}
                                      className="btn btn-primary search-btn rounded"
                                    >
                                      Search
                                    </Link>
                                  </div>
                                </div>
                                <div className="multi-trip">
                                  <div className="d-lg-flex">
                                    <div className="d-flex  form-info">
                                      <div className="form-item change-drop booking-dropdown dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                          <label className="form-label fs-14 text-default mb-1">
                                            From
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control value-input"
                                            defaultValue="New York"
                                          />
                                          <p className="fs-12 mb-0">
                                            John F. Kennedy International Airport
                                          </p>
                                        </div>
                                        <div className="dropdown-menu dropdown-md p-0">
                                          <div className="input-search p-3 border-bottom">
                                            <div className="input-group">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Location"
                                              />
                                              <span className="input-group-text px-2 border-start-0">
                                                <i className="isax isax-search-normal" />
                                              </span>
                                            </div>
                                          </div>
                                          <ul>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  New York
                                                </div>
                                                <p>John F. Kennedy International Airport</p>
                                              </Link>
                                            </li>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Boston
                                                </div>
                                                <p>
                                                  Boston Logan International Airport
                                                </p>
                                              </Link>
                                            </li>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Northern Virginia
                                                </div>
                                                <p>Dulles International Airport</p>
                                              </Link>
                                            </li>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Los Angeles
                                                </div>
                                                <p>
                                                  Los Angeles International Airport
                                                </p>
                                              </Link>
                                            </li>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Orlando
                                                </div>
                                                <p>Orlando International Airport</p>
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="form-item change-drop booking-dropdown dropdown ps-2 ps-sm-3">
                                        <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                          <i className="fa-solid fa-arrow-right-arrow-left" />
                                        </span>
                                        <div
                                          data-bs-toggle="dropdown"
                                          data-bs-auto-close="outside"
                                          aria-expanded="false"
                                          role="menu"
                                        >
                                          <label className="form-label fs-14 text-default mb-1">
                                            To
                                          </label>
                                          <div className="home-eight-title text-dark value-input">
                                            Las Vegas
                                          </div>
                                          <p className="fs-12 mb-0">
                                            Harry Reid International Airport
                                          </p>
                                        </div>
                                        <div className="dropdown-menu dropdown-md p-0">
                                          <div className="input-search p-3 border-bottom">
                                            <div className="input-group">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Location"
                                              />
                                              <span className="input-group-text px-2 border-start-0">
                                                <i className="isax isax-search-normal" />
                                              </span>
                                            </div>
                                          </div>
                                          <ul>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  New York
                                                </div>
                                                <p>John F. Kennedy International Airport</p>
                                              </Link>
                                            </li>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Boston
                                                </div>
                                                <p>
                                                  Boston Logan International Airport
                                                </p>
                                              </Link>
                                            </li>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Northern Virginia
                                                </div>
                                                <p>Dulles International Airport</p>
                                              </Link>
                                            </li>
                                            <li className="border-bottom">
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Los Angeles
                                                </div>
                                                <p>
                                                  Los Angeles International Airport
                                                </p>
                                              </Link>
                                            </li>
                                            <li>
                                              <Link className="dropdown-item" href="#">
                                                <div className="fs-16 fw-medium text-dark dropdown-name">
                                                  Orlando
                                                </div>
                                                <p>Orlando International Airport</p>
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="form-item">
                                        <label className="form-label fs-14 text-default mb-1">
                                          Departure
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control datetimepicker"
                                          defaultValue="21-10-2024"
                                        />
                                        <p className="fs-12 mb-0">Monday</p>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-primary search-btn rounded"
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane fade" id="Activity">
                              <form action="#">
                                <div className="fw-medium fs-16 mb-2 text-center text-white">
                                  Book Adventure Activity.
                                </div>
                                <div className="d-lg-flex">
                                  <div className="d-flex  form-info">
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                         <BookingDropdown
                                        label="Location"
                                        defaultValue="Dubai"
                                        defaultSubValue="United Arab Emirates"
                                        locations={[
                                          { value: "New York", subValue: "USA" },
                                          { value: "Boston", subValue: "Spain" },
                                          { value: "NorthernVirginia", subValue: "USA" },
    { value: "LosAngeles", subValue: "USA" },
    { value: "Orlando", subValue: "USA" }
                                        ]}
                                      />
                                      </div>
                                    </div>
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                         <BookingDropdown
                                        label="Select Activity"
                                        defaultValue="Ballon Ride"
                                        defaultSubValue="20 Offers Available"
                                        locations={[
                                          { value: "ScubaDiving"},
                                          { value: "HotAir Ballon" },
                                          { value: "Family Park Adventure" },
    { value: "Mountain Climbing"},
    { value: "SkyDive"}
                                        ]}
                                      />
                                     
                                      </div>
                                    </div>
                                    <CommonDateRange
                                      onApply={handleApply}
                                      fromLabel="Check In"
                                      toLabel="Check Out"
                                    />
                                    <div className="form-item dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <label className="form-label fs-14 text-default mb-1">
                                          Guests
                                        </label>
                                        <div className="home-eight-title text-dark member-count">
                                          {totalActivityPassengers}{" "}
                                          <span className="fw-normal fs-14">
                                            Persons
                                          </span>
                                        </div>
                                        <p className="fs-12 mb-0">
                                          <span className="adult">4</span> Adult,{" "}
                                          <span className="room">2</span> Rooms
                                        </p>
                                      </div>
                                      <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                        <div className="mb-3 home-eight-title text-dark">
                                          Select Travelers &amp; Class
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="row">
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Rooms
                                                </label>
                                                <BannerCounter
                                                    value={formData.activity.rooms}
                                                    setValue={(v) => updateField("activity", "rooms", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Adults
                                                </label>
                                                 <BannerCounter
                                                    value={formData.activity.adults}
                                                    setValue={(v) => updateField("activity", "adults", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Children
                                                  <span className="text-default fw-normal">
                                                    ( 2-12 Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                    value={formData.activity.children}
                                                    setValue={(v) => updateField("activity", "children", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Infants
                                                  <span className="text-default fw-normal">
                                                    ( 0-12 Yrs )
                                                  </span>
                                                </label>
                                                 <BannerCounter
                                                    value={formData.activity.infants}
                                                    setValue={(v) => updateField("activity", "infants", v)}
                                                  />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Travellers
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room5"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room5"
                                              >
                                                Single
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room6"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room6"
                                              >
                                                Double
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room7"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room7"
                                              >
                                                Delux
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room8"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room8"
                                              >
                                                Suite
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Property Type
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property5"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property5"
                                              >
                                                Villa
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property6"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property6"
                                              >
                                                Condo
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property7"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property7"
                                              >
                                                Cabin
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property8"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property8"
                                              >
                                                Apartments
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                          <Link
                                            href="#"
                                            className="btn btn-light btn-sm me-2"
                                          >
                                            Cancel
                                          </Link>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-sm apply-btn"
                                            onClick={()=>handleCounter("activity")}
                                          >
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    href={all_routes.activityGrid}
                                    className="btn btn-primary search-btn rounded"
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane fade" id="Visa">
                              <form action="#">
                                <div className="fw-medium fs-16 mb-2 text-center text-white">
                                  Check Eligibility
                                </div>
                                <div className="d-lg-flex">
                                  <div className="d-flex  form-info">
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="Country"
                                        defaultValue="Select"
                                        defaultSubValue=""
                                        locations={[
                                          { value: "USA"},
                                          { value: "Japan" },
                                          { value: "Singapore" },
    { value: "Russia"},
    { value: "Germany"}
                                        ]}
                                      />
                                      </div>
                                    </div>
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="Visa Type"
                                        defaultValue="Select"
                                        defaultSubValue=""
                                        locations={[
                                          { value: "Tourist Visa"},
                                          { value: "Business Visa" },
                                          { value: "Student Visa" },
    { value: "Transit Visa"},
    { value: "GroupTravel Visa"}
                                        ]}
                                      />
                                       
                                      </div>
                                    </div>
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <BookingDropdown
                                        label="Citizenship"
                                        defaultValue="Select"
                                        defaultSubValue=""
                                        locations={[
                                          { value: "USA"},
                                          { value: "Japan" },
                                          { value: "Singapore" },
    { value: "Russia"},
    { value: "Germany"}
                                        ]}
                                      />
                                       
                                      </div>
                                    </div>
                                    <div className="form-item dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <label className="form-label fs-14 text-default mb-1">
                                          Travelers
                                        </label>
                                        <div className="home-eight-title text-dark member-count">
                                          {totalVisaPassengers}{" "}
                                          <span className="fw-normal fs-14">
                                            Persons
                                          </span>
                                        </div>
                                      </div>
                                      <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                        <div className="mb-3 home-eight-title text-dark">
                                          Select Travelers &amp; Class
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="row">
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Rooms
                                                </label>
                                                <BannerCounter
                                                    value={formData.visa.rooms}
                                                    setValue={(v) => updateField("visa", "rooms", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Adults
                                                </label>
                                                 <BannerCounter
                                                    value={formData.visa.adults}
                                                    setValue={(v) => updateField("visa", "adults", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Children
                                                  <span className="text-default fw-normal">
                                                    ( 2-12 Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                    value={formData.visa.children}
                                                    setValue={(v) => updateField("visa", "children", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Infants
                                                  <span className="text-default fw-normal">
                                                    ( 0-12 Yrs )
                                                  </span>
                                                </label>
                                                 <BannerCounter
                                                    value={formData.visa.infants}
                                                    setValue={(v) => updateField("visa", "infants", v)}
                                                  />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Travellers
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room9"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room9"
                                              >
                                                Single
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room10"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room10"
                                              >
                                                Double
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room11"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room11"
                                              >
                                                Delux
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room12"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room12"
                                              >
                                                Suite
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Property Type
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property9"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property9"
                                              >
                                                Villa
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property10"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property10"
                                              >
                                                Condo
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property11"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property11"
                                              >
                                                Cabin
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property12"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property12"
                                              >
                                                Apartments
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                          <Link
                                            href="#"
                                            className="btn btn-light btn-sm me-2"
                                          >
                                            Cancel
                                          </Link>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-sm apply-btn"
                                            onClick={()=>handleCounter("visa")}
                                          >
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    href={all_routes.visaGrid}
                                    className="btn btn-primary search-btn rounded"
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane fade" id="Guide">
                              <form action="#">
                                <div className="d-lg-flex">
                                  <div className="d-flex  form-info">
                                    <div className="form-item booking-dropdown dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                         <BookingDropdown
                                        label="Destination"
                                        defaultValue="New York"
                                        defaultSubValue="USA"
                                        locations={[
                                          { value: "New York", subValue: "USA" },
                                          { value: "Boston", subValue: "Spain" },
                                          { value: "NorthernVirginia", subValue: "USA" },
    { value: "LosAngeles", subValue: "USA" },
    { value: "Orlando", subValue: "USA" }
                                        ]}
                                      />
                                       
                                      </div>
                                    </div>
                                    <CommonDateRange
                                      onApply={handleApply}
                                      fromLabel="Start Date"
                                      toLabel="End Date"
                                    />
                                    <div className="form-item dropdown">
                                      <div
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false"
                                        role="menu"
                                      >
                                        <label className="form-label fs-14 text-default mb-1">
                                          Guests
                                        </label>
                                        <div className="home-eight-title text-dark member-count">
                                          {totalGuidePassengers}{" "}
                                          <span className="fw-normal fs-14">
                                            Persons
                                          </span>
                                        </div>
                                        <p className="fs-12 mb-0">
                                          <span className="adult">3</span> Adult
                                        </p>
                                      </div>
                                      <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                        <div className="mb-3 home-eight-title text-dark">
                                          Select Travelers &amp; Class
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="row">
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Rooms
                                                </label>
                                                <BannerCounter
                                                    value={formData.guide.rooms}
                                                    setValue={(v) => updateField("guide", "rooms", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Adults
                                                </label>
                                                 <BannerCounter
                                                    value={formData.guide.adults}
                                                    setValue={(v) => updateField("guide", "adults", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Children
                                                  <span className="text-default fw-normal">
                                                    ( 2-12 Yrs )
                                                  </span>
                                                </label>
                                                <BannerCounter
                                                    value={formData.guide.children}
                                                    setValue={(v) => updateField("guide", "children", v)}
                                                  />
                                              </div>
                                            </div>
                                            <div className="col-md-12">
                                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <label className="form-label text-gray-9 mb-2">
                                                  Infants
                                                  <span className="text-default fw-normal">
                                                    ( 0-12 Yrs )
                                                  </span>
                                                </label>
                                                 <BannerCounter
                                                    value={formData.guide.infants}
                                                    setValue={(v) => updateField("guide", "infants", v)}
                                                  />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Travellers
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room1"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room1"
                                              >
                                                Single
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room2"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room2"
                                              >
                                                Double
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room3"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room3"
                                              >
                                                Delux
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="room"
                                                id="room4"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="room4"
                                              >
                                                Suite
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 border br-10 info-item pb-1">
                                          <div className="fs-16 fw-medium mb-2 text-dark">
                                            Property Type
                                          </div>
                                          <div className="d-flex align-items-center flex-wrap">
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property1"
                                                defaultChecked
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property1"
                                              >
                                                Villa
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property2"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property2"
                                              >
                                                Condo
                                              </label>
                                            </div>
                                            <div className="form-check me-3 mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property3"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property3"
                                              >
                                                Cabin
                                              </label>
                                            </div>
                                            <div className="form-check mb-3">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name="property"
                                                id="property4"
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="property4"
                                              >
                                                Apartments
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                          <Link
                                            href="#"
                                            className="btn btn-light btn-sm me-2"
                                          >
                                            Cancel
                                          </Link>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-sm apply-btn"
                                            onClick={()=>handleCounter("guide")}
                                          >
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    href={all_routes.guideGrid}
                                    className="btn btn-primary search-btn rounded"
                                  >
                                    Search
                                  </Link>
                                </div>
                              </form>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      {/* /Hero Section */}
      <HaniTrendingTours scope={tourScope} />
      <HaniScopeTourSection scope="Domestic" titleKey="latestDomestic" />
      <HaniScopeTourSection scope="Foreign" titleKey="latestForeign" />
      <HaniOriginCities />
      <ExperienceSection />
      <HaniRecommendedVisas />
      <DeliverySection />
      <GuideSection />
      <TestimonialSection />
      <ChooseSection />
      <HaniLatestContent variant="travelogues" />
      <HaniLatestContent variant="blog" />
      <FooterSection />


    </>
  );
};

export default HomeServiceOne;
