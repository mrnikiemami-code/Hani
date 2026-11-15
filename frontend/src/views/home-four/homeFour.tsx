"use client";
import { useState } from "react";
import Link from "next/link";
import VideoModal from "../../components/video-modal/videoModal";
import { DatePicker } from '../../components/common-date-picker/appDatePicker'
import ClientSection from "./clientSection";

import ImageWithBasePath from "../../components/image-with-base-path";
import PlaceSection from "./placeSection";
import Provider from "./provider";
import BlogSection from "./blogSection";
import Footer from "./footer";
import { all_routes } from "../../routes/all_routes";
import BannerCounter from "../../components/banner-counter/counter";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
type Mode = "flight";
type BookingState = {
  flight: {
    cabinClass: string;
    adults: number;
    children: number;
    infants: number;
  }
};
const HomeFour = () => {
  const routes = all_routes;

  const [showModal, setShowModal] = useState(false);
  const videoUrl = "https://youtu.be/NSAOrGb9orM";

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [defaultDate] = useState(new Date());

  const [flightRadio, setFlightRadio] = useState<string>("oneway");
  const [formData, setFormData] = useState<BookingState>({
    flight: {
      adults: 0,
      children: 0,
      infants: 0,
      cabinClass: "Economy",
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

  const handleCounter = (mode: "flight") => {
    setAppliedData((prev) => ({
      ...prev,
      [mode]: formData[mode],
    }));
  };
  const flightPassengers =
    appliedData.flight.adults +
    appliedData.flight.children +
    appliedData.flight.infants;
  const totalFlightPassengers = flightPassengers === 0 ? 4 : flightPassengers;




  return (
    <>
      {/* Hero Section */}
      <section className="hero-section-four">
        <div className="container">
          <div className="hero-content">
            <div className="row align-items-center">
              <div
                className="col-lg-10 col-md-12 mx-auto aos "
                data-aos="fade-up"
              >
                <div className="banner-content text-center mx-auto">
                  <h1 className="text-white display-4 mb-2">
                    Discover the World, One{" "}
                    <span className="flight-icon">
                      <ImageWithBasePath
                        src="assets/img/icons/flight-icon.svg"
                        alt="icon"
                      />
                    </span>{" "}
                    Flight at a Time with DreamsTour!
                  </h1>
                  <p className="text-white mx-auto">
                    Your ultimate destination for all things help you celebrate
                    &amp; remember tour experience.
                  </p>
                  <Link
                    className="video-btn video-effect"
                    href="#"
                    onClick={handleOpenModal}
                  >
                    <i className="isax isax-play5" />
                  </Link>
                  <VideoModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    videoUrl={videoUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Hero Section */}

      {/* Banner Search */}
      <section className="banner-search-four">
        <div className="container">
          <div className="banner-form card mb-0">
            <div className="card-body">
              <div className="tab-pane" id="flight">
                <form>
                  <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="form-check d-flex align-items-center me-3 mb-2">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name="Radio"
                          id="oneway"
                          onChange={() => setFlightRadio("oneway")}
                          checked={flightRadio === "oneway" ? true : false}
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
                          defaultValue="multiway"
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
                    <h6 className="fw-medium fs-16 mb-2">
                      Millions of cheap flights. One simple search
                    </h6>
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
                        <div className="form-item dropdown">
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
                        <div className="form-item dropdown ps-2 ps-sm-3">
                          <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
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
                            <span className="way-icon badge badge-primary rounded-pill translate-middle">
                              <i className="fa-solid fa-arrow-right-arrow-left" />
                            </span>
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
                            format="DD-MM-YYYY"
                            disablePast
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
                          <input
                            type="text"
                            className="form-control datetimepicker"
                            defaultValue="23-10-2024"
                          />
                          <p className="fs-12 mb-0">Wednesday</p>
                        </div>
                        <div className="form-item dropdown">
                          <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            role="menu"
                          >
                            <label className="form-label fs-14 text-default mb-1">
                              Travellers and cabin class
                            </label>
                            <h5>
                              {totalFlightPassengers}{" "}
                              <span className="fw-normal fs-14">
                                Persons
                              </span>
                            </h5>
                            <p className="fs-12 mb-0">1 Adult, Economy</p>
                          </div>
                          <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                            <h5 className="mb-3">
                              Select Travelers &amp; Class
                            </h5>
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
                              <h6 className="fs-16 fw-medium mb-2">
                                Travellers
                              </h6>
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
                                    id="business"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="business"
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

                              <button type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleCounter("flight")}
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
                        <div className="form-item dropdown">
                          <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
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
                        <div className="form-item dropdown ps-2 ps-sm-3">
                          <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
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
                            <span className="way-icon badge badge-primary rounded-pill translate-middle">
                              <i className="fa-solid fa-arrow-right-arrow-left" />
                            </span>
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
                            format="DD-MM-YYYY"
                            disablePast
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
            </div>
          </div>
        </div>
      </section>
      {/* /Banner Search */}

      {/* Destination Section */}
      <section className="section destination-section">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-xl-5 col-lg-10 text-center aos "
              data-aos="fade-up"
            >
              <div className="section-header section-header-four text-center">
                <h2 className="mb-2">
                  <span>Popular</span> Locations
                </h2>
                <p className="sub-title">
                  Connecting Needs with Offers for the Professional Flight
                  Services, Book your next flight appointment with ease.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center g-4">
            {/* Destination Item*/}
            <div className="col-lg-3 col-sm-6">
              <div className="location-wrap aos" data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/destination/destination-15.jpg"
                  alt="img"
                />
                <span className="loc-name bg-white">Denmark</span>
                <Link href={routes.flightGrid} className="loc-view">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            {/* /Destination Item*/}
            {/* Destination Item*/}
            <div className="col-lg-3 col-sm-6">
              <div className="location-wrap aos " data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/destination/destination-16.jpg"
                  alt="img"
                />
                <span className="loc-name bg-white">Belgium</span>
                <Link href={routes.flightGrid} className="loc-view">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            {/* /Destination Item*/}
            {/* Destination Item*/}
            <div className="col-lg-3 col-sm-6">
              <div className="location-wrap aos" data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/destination/destination-17.jpg"
                  alt="img"
                />
                <span className="loc-name bg-white">Barcelona</span>
                <Link href={routes.flightGrid} className="loc-view">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            {/* /Destination Item*/}
            {/* Destination Item*/}
            <div className="col-lg-3 col-sm-6">
              <div className="location-wrap aos" data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/destination/destination-18.jpg"
                  alt="img"
                />
                <span className="loc-name bg-white">Mexico</span>
                <Link href={routes.flightGrid} className="loc-view">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            {/* /Destination Item*/}
            {/* Destination Item*/}
            <div className="col-lg-4 col-sm-6">
              <div className="location-wrap aos " data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/destination/destination-19.jpg"
                  alt="img"
                />
                <span className="loc-name bg-white">Indonesia</span>
                <Link href={routes.flightGrid} className="loc-view">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            {/* /Destination Item*/}
            {/* Destination Item*/}
            <div className="col-lg-4 col-sm-6">
              <div className="location-wrap aos" data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/destination/destination-20.jpg"
                  alt="img"
                />
                <span className="loc-name bg-white">Romania</span>
                <Link href={routes.flightGrid} className="loc-view">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            {/* /Destination Item*/}
            {/* Destination Item*/}
            <div className="col-lg-4 col-sm-6">
              <div className="location-wrap aos " data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/destination/destination-21.jpg"
                  alt="img"
                />
                <span className="loc-name bg-white">India</span>
                <Link href={routes.flightGrid} className="loc-view">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            {/* /Destination Item*/}
          </div>
        </div>
      </section>
      {/* /Destination Section */}
      <ClientSection />
      <PlaceSection />
      <Provider />
      {/* About Section */}
      <section className="section about-section-four bg-light-200">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 aos" data-aos="fade-up">
              <div className="section-header section-header-four mb-4">
                <h2 className="mb-2">
                  <span>Where comfort</span> meets elegance and every guest is
                  treated like family.
                </h2>
                <p className="sub-title">
                  Our mission is to create memorable experiences for our guests.
                  We believe that every stay should feel special, whether you’re
                  here for business, leisure, or a special occasion.
                </p>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb-3">
                    <h6 className="display-6">
                      <span className="counter">57</span>+
                    </h6>
                    <p>Destinations Worldwide</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <h6 className="display-6">
                      <span className="counter">121</span>+
                    </h6>
                    <p>Providers Registered</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <h6 className="display-6">
                      <span className="counter">7098</span>+
                    </h6>
                    <p>Booking Completed</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <h6 className="display-6">
                      <span className="counter">67</span>+
                    </h6>
                    <p>Client Globally</p>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-3 mb-0 mb-md-4 mb-lg-0">
                <Link
                  href={routes.addFlight}
                  className="btn btn-dark d-inline-flex align-items-center"
                >
                  <i className="isax isax-add-circle5 me-2" />
                  Add Flights
                </Link>
                <Link
                  href={routes.flightGrid}
                  className="btn btn-primary d-inline-flex align-items-center"
                >
                  <i className="isax isax-calendar-2 me-2" />
                  Book a Flight
                </Link>
                <div className="card border-0 mb-0">
                  <div className="card-body d-flex align-items-center">
                    <div className="avatar-list-stacked avatar-group-md me-2">
                      <span className="avatar avatar-rounded">
                        <ImageWithBasePath
                          className="border border-white"
                          src="assets/img/users/user-01.jpg"
                          alt="img"
                        />
                      </span>
                      <span className="avatar avatar-rounded">
                        <ImageWithBasePath
                          className="border border-white"
                          src="assets/img/users/user-04.jpg"
                          alt="img"
                        />
                      </span>
                      <span className="avatar avatar-rounded">
                        <ImageWithBasePath
                          className="border border-white"
                          src="assets/img/users/user-06.jpg"
                          alt="img"
                        />
                      </span>
                    </div>
                    <div>
                      <div className="d-flex align-items-center fs-12">
                        <i className="ti ti-star-filled text-warning" />
                        <i className="ti ti-star-filled text-warning" />
                        <i className="ti ti-star-filled text-warning" />
                        <i className="ti ti-star-filled text-warning" />
                        <i className="ti ti-star-filled text-warning me-1" />
                        <p className="fs-14 text-gray-9">5.0</p>
                      </div>
                      <p className="fs-14">2K+ Reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 d-flex ps-lg-0 aos" data-aos="fade-up">
              <div className="flight-about d-lg-flex align-items-center flex-fill">
                <ImageWithBasePath
                  src="assets/img/flight/about.svg"
                  alt="img"
                />
                <div className="flight-bg">
                  <ImageWithBasePath
                    src="assets/img/bg/flight-bg.png"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flight-bg">
          <ImageWithBasePath
            src="assets/img/bg/flight-bg-01.png"
            alt="img"
            className="flight-bg-01"
          />
          <ImageWithBasePath
            src="assets/img/bg/flight-bg-02.png"
            alt="img"
            className="flight-bg-02"
          />
        </div>
      </section>
      {/* /About Section */}

      {/* Support Section */}
      <section
        className="support-section bg-dark support-section-five aos"
        data-aos="fade-up"
      >
        <div
          className="horizontal-slide d-flex"
          data-direction="left"
          data-speed="slow"
        >
          <div className="slide-list d-flex">
            <div className="support-item">
              <h5>Personalized Itineraries</h5>
            </div>
            <div className="support-item">
              <h5>Comprehensive Planning</h5>
            </div>
            <div className="support-item">
              <h5>Expert Guidance</h5>
            </div>
            <div className="support-item">
              <h5>Local Experience</h5>
            </div>
            <div className="support-item">
              <h5>Customer Support</h5>
            </div>
            <div className="support-item">
              <h5>Sustainability Efforts</h5>
            </div>
            <div className="support-item">
              <h5>Multiple Regions</h5>
            </div>
          </div>
        </div>
      </section>
      {/* /Support Section */}

      {/* Testimonial Section */}
      <section className="section testimonial-section z-1 bg-light-200">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 aos" data-aos="fade-up">
              <div className="flex-fill position-relative">
                <div className="success-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/icon-arrow.svg"
                    alt="img"
                  />
                </div>
                <div className="mb-4 mb-lg-0 success-wrap">
                  <div className="section-header section-header-four">
                    <h2 className="mb-2">
                      <span>Success</span> stories in their own words
                    </h2>
                    <p className="sub-title">
                      Read what our satisfied clients have to say about their
                      experiences with our platform.
                    </p>
                  </div>
                  <h6 className="fw-medium mb-1">Trusted by 40K+ customers</h6>
                  <div className="d-flex align-items-center fs-14">
                    <i className="ti ti-star-filled text-primary me-1" />
                    <i className="ti ti-star-filled text-primary me-1" />
                    <i className="ti ti-star-filled text-primary me-1" />
                    <i className="ti ti-star-filled text-primary me-1" />
                    <i className="ti ti-star-filled text-primary me-2" />
                    <p className="fs-14">
                      <span className="text-gray-9">4.4/5.0</span> (From 3580
                      Reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="testimonial-success">
                <div className="row g-4">
                  <div className="col-md-6 d-flex">
                    <div className="card flex-fill mb-0 aos" data-aos="fade-up">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            href="#"
                            className="avatar avatar-lg flex-shrink-0"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-28.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div className="ms-2">
                            <h6 className="fs-16 fw-medium">
                              <Link href="#">Rachel Mariscal</Link>
                            </h6>
                            <p>United States</p>
                          </div>
                        </div>
                        <h6 className="mb-2">Smooth Booking Experience!</h6>
                        <p className="mb-2">
                          I had an I recently booked a flight through [Booking
                          Website/App], and I couldn’t be happier with the
                          experience.
                        </p>
                        <div className="d-flex align-items-center">
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <p>5.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div
                      className="card flex-fill mb-0 aos "
                      data-aos="fade-up"
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            href="#"
                            className="avatar avatar-lg flex-shrink-0"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-22.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div className="ms-2">
                            <h6 className="fs-16 fw-medium">
                              <Link href="#">Stephen Brekke</Link>
                            </h6>
                            <p>Germany</p>
                          </div>
                        </div>
                        <h6 className="mb-2">Customer Service</h6>
                        <p className="mb-2">
                          I did have a quick question about my itinerry, and
                          customer service was incredibly helpful and responsive
                        </p>
                        <div className="d-flex align-items-center">
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <p>5.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card flex-fill mb-0 aos" data-aos="fade-up">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            href="#"
                            className="avatar avatar-lg flex-shrink-0"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-07.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div className="ms-2">
                            <h6 className="fs-16 fw-medium">
                              <Link href="#">Harriet Collins</Link>
                            </h6>
                            <p>France</p>
                          </div>
                        </div>
                        <h6 className="mb-2">Overall Experience</h6>
                        <p className="mb-2">
                          After finally selecting a flight, I was hit with
                          unexpected fees during checkout that weren’t clearly
                          stated upfront.
                        </p>
                        <div className="d-flex align-items-center">
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <p>5.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card flex-fill mb-0 aos" data-aos="fade-up">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            href="#"
                            className="avatar avatar-lg flex-shrink-0"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-27.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div className="ms-2">
                            <h6 className="fs-16 fw-medium">
                              <Link href="#">Charles Earnhardt</Link>
                            </h6>
                            <p>Italy</p>
                          </div>
                        </div>
                        <h6 className="mb-2">Confirmation Process</h6>
                        <p className="mb-2">
                          I received my confirmation email almost immediately,
                          and all the details were accurate.
                        </p>
                        <div className="d-flex align-items-center">
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <i className="ti ti-star-filled text-primary me-1" />
                          <p>5.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonials-bg">
                  <ImageWithBasePath
                    src="assets/img/bg/testimonial-bg-01.png"
                    alt="img"
                    className="testimonial-bg-03"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonials-bg">
          <ImageWithBasePath
            src="assets/img/bg/testimonial-bg-01.png"
            alt="img"
            className="testimonial-bg-01"
          />
          <ImageWithBasePath
            src="assets/img/bg/testimonial-bg-02.png"
            alt="img"
            className="testimonial-bg-02"
          />
        </div>
      </section>
      {/* /Testimonial Section */}

      {/* FAQ Section */}
      <section className="faq-section-four section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-12 text-center aos" data-aos="fade-up">
              <div className="section-header section-header-four text-center">
                <h2 className="mb-2">
                  <span>Frequently</span> Asked Questions
                </h2>
                <p className="sub-title">
                  Connecting Needs with Offers for the Professional Fligt
                  Services,{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div
                className="accordion accordion-flush faq-four"
                id="accordionFaq"
              >
                <div
                  className="accordion-item show mb-2 aos"
                  data-aos="fade-up"
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-collapseOne"
                      aria-controls="faq-collapseOne"
                    >
                      What types of tours do you offer?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        We offer a wide range of tours, including cultural,
                        adventure, luxury, and customized itineraries.
                      </p>
                      <p>
                        Popular destinations include Europe, Africa (e.g.,
                        Morocco),{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-2 aos" data-aos="fade-up">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-collapsetwo"
                      aria-controls="faq-collapsetwo"
                    >
                      Are the tours customizable?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsetwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        We offer a wide range of tours, including cultural,
                        adventure, luxury, and customized itineraries.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-2 aos" data-aos="fade-up">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-collapsthree"
                      aria-controls="faq-collapsthree"
                    >
                      What safety measures do you follow?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsthree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        We offer a wide range of tours, including cultural,
                        adventure, luxury, and customized itineraries.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-2 aos " data-aos="fade-up">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-collapsefour"
                      aria-controls="faq-collapsefour"
                    >
                      How far in advance should I book?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsefour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        We offer a wide range of tours, including cultural,
                        adventure, luxury, and customized itineraries.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item aos" data-aos="fade-up">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-collapsefive"
                      aria-controls="faq-collapsefive"
                    >
                      What is your cancellation policy?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsefive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        We offer a wide range of tours, including cultural,
                        adventure, luxury, and customized itineraries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Business*/}
          <div className="business-wrap bg-dark aos" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-6">
                <div className="business-info">
                  <h2 className="display-6 text-white mb-3">
                    Discover the easiest way to automate scheduling&nbsp;and
                    grow your business
                  </h2>
                  <p className="text-light mb-4">
                    Our comprehensive solution facilitates your salon
                    operations, so you can focus on what truly matters.
                  </p>
                  <Link
                    href={routes.addFlight}
                    className="btn btn-dark d-inline-flex align-items-center"
                  >
                    <i className="isax isax-add-circle me-2" />
                    Add Flights
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="business-img">
                  <ImageWithBasePath
                    src="assets/img/flight/business.svg"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Business */}
        </div>
      </section>
      {/* /FAQ Section */}

      <BlogSection />
      <Footer />
    </>
  );
};

export default HomeFour;
