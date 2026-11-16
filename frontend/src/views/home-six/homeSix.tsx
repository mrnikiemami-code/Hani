"use client";


import { useState } from "react";
import DestinationSection from "./destinationSection";
import PlaceSection from "./placeSection";
import ProviderSlick from "./providerSection";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import FooterSix from "./footer";
import { all_routes } from "../../routes/all_routes";
import type { IsoDate } from "@/lib/hani/calendar";
import CommonDateRange from "../../components/common-date-range-picker/CommonDateRange";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
import AppSwiper from '../../components/app-swiper'
import BannerCounter from "../../components/banner-counter/counter";
type Mode = "tour";

type BookingState = {
  tour: {
    adults: number;
    children: number;
    infants: number;
  };
};
const HomeSix = () => {
  const routes = all_routes;
  const [formData, setFormData] = useState<BookingState>({

    tour: {
      adults: 0,
      children: 0,
      infants: 0,
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
  const tourPassenger =
    appliedData.tour.adults +
    appliedData.tour.children +
    appliedData.tour.infants;
  const totalTourPassengers = tourPassenger === 0 ? 4 : tourPassenger;
  const handleCounter = (mode: "tour") => {
    setAppliedData((prev) => ({
      ...prev,
      [mode]: formData[mode],
    }));
  };
  const [_dates, setDates] = useState<{
    start: IsoDate | null;
    end: IsoDate | null;
  }>({
    start: null,
    end: null,
  });
  const handleApply = (start: IsoDate, end: IsoDate) => {
    setDates({ start, end });
    console.log("Selected:", start, end);
  };


  return (
    <>
      {/* Hero Section */}
      <section className="hero-sec-six">
        <div className="container">
          <div className="hero-content">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="banner-content aos mb-4" data-aos="fade-up">
                  <h1 className="text-white display-5 mb-2">
                    Booking a tour can be an exciting way to <br /> explore a
                    new destination!
                  </h1>
                  <p className="text-white">
                    Your ultimate destination for all things help you celebrate
                    &amp; remember tour experience.
                  </p>
                </div>
                <div className="banner-form card mb-0 active">
                  <div className="card-body">
                    <div className="tab-pane" id="Tour">
                      <form>
                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                          <h6 className="fw-medium fs-16 mb-2">
                            Search holiday packages &amp; trips
                          </h6>
                        </div>
                        <div className="d-lg-flex">
                          <div className="d-flex  form-info">
                            <div className="form-item dropdown">
                              <div
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                role="menu"
                              >
                                <BookingDropdown
                                  label="Where would like to go?"
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
                                role="menu"
                              >
                                <label className="form-label fs-14 text-default mb-1">
                                  Travellers
                                </label>
                                <h5>
                                  {totalTourPassengers}{" "}
                                  <span className="fw-normal fs-14">
                                    Persons
                                  </span>
                                </h5>
                                <p className="fs-12 mb-0">2 Adult</p>
                              </div>
                              <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                <h5 className="mb-3">Select Travelers</h5>
                                <div className="mb-3 border br-10 info-item pb-1">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label className="form-label text-gray-9 mb-2">
                                          Adult
                                        </label>
                                        <BannerCounter
                                          value={formData.tour.adults}
                                          setValue={(v) => updateField("tour", "adults", v)}
                                        />
                                      </div>
                                      <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label className="form-label text-gray-9 mb-2">
                                          Childrens
                                          <span className="text-default fw-normal">
                                            ( 12+ Yrs )
                                          </span>
                                        </label>
                                        <BannerCounter
                                          value={formData.tour.children}
                                          setValue={(v) => updateField("tour", "children", v)}
                                        />
                                      </div>
                                      <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label className="form-label text-gray-9 mb-2">
                                          Infants
                                          <span className="text-default fw-normal">
                                            ( 12+ Yrs )
                                          </span>
                                        </label>
                                        <BannerCounter
                                          value={formData.tour.infants}
                                          setValue={(v) => updateField("tour", "infants", v)}
                                        />
                                      </div>
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
                                    onClick={() => handleCounter("tour")}
                                    className="btn btn-primary btn-sm"
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link
                            href={all_routes.tourGrid}
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
      </section>
      {/* /Hero Section */}
      <DestinationSection />
      {/* Benefit Section */}
      <section className="section work-section-six">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xxl-3 col-lg-4">
              <div className="section-header-six mb-0 aos" data-aos="fade-up">
                <span className="badge badge-soft-primary rounded-pill mb-1">
                  How it Works
                </span>
                <h2>
                  Here’s a breakdown of how our services work
                  <span className="text-primary">.</span>
                </h2>
              </div>
            </div>
            <div className="col-xxl-9 col-lg-8">
              <div className="row align-items-center">
                <div className="col-md-4 col-sm-6">
                  <div className="bg-teal-trans mb-4 aos" data-aos="fade-up">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <span className="work-icon text-teal d-flex">
                            <i className="isax isax-buildings-25" />
                          </span>
                          <span className="work-avatar">01</span>
                        </div>
                        <div>
                          <h5 className="mb-2 text-truncate">
                            Checking Availability
                          </h5>
                          <p className="text-truncate line-clamb-3">
                            Ensure that the tour is available on the dates you
                            plan to travel. Browse available tours in your
                            destination.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="bg-prime-trans mb-4 aos" data-aos="fade-up">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <span className="work-icon text-primary d-flex">
                            <i className="isax isax-calendar-edit5" />
                          </span>
                          <span className="work-avatar">02</span>
                        </div>
                        <div>
                          <h5 className="mb-2 text-truncate">
                            Booking &amp; Confirmation
                          </h5>
                          <p className="text-truncate line-clamb-3">
                            Upon arrival, check in at our reception. Our
                            friendly staff will guide you through
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="bg-purple-trans mb-4 aos" data-aos="fade-up">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <span className="work-icon text-purple d-flex">
                            <i className="isax isax-direct-send5" />
                          </span>
                          <span className="work-avatar">03</span>
                        </div>
                        <div>
                          <h5 className="mb-2">Enjoy Your Stay</h5>
                          <p className="text-truncate line-clamb-3">
                            Make sure to be at the meeting point on time, Ask
                            questions and enjoy the experience!
                          </p>
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
      {/* /Benefit Section */}
      <PlaceSection />

      {/* Support Section */}
      <section className="support-section section-skew support-sec-two bg-primary">
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

      {/* About Section */}
      <section className="section adavantages-sec bg-light-200">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div>
                <div className="section-right-img-two aos" data-aos="fade-up">
                  <ImageWithBasePath
                    src="assets/img/section-img-02.png"
                    alt="Img"
                  />
                  <div className="card review-rate-top border-0 mb-0">
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
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/users/user-07.jpg"
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
            </div>
            <div className="col-lg-7">
              <div>
                <div className="section-header-six mb-4 aos" data-aos="fade-up">
                  <span className="badge badge-soft-primary rounded-pill mb-1">
                    Get to know about Us
                  </span>
                  <h2 className="mb-2">
                    Provide high-quality Accommodations &amp; service make
                    journeys seamless &amp; enjoyable.
                  </h2>
                  <p>
                    We offer a diverse range of Tours, from compact cars ideal
                    for city driving to spacious SUVs for family trips and
                    luxurious models for special events.
                  </p>
                </div>
                <div className="row g-2 mb-4">
                  <div className="col-md-6">
                    <span className="d-block mb-2">
                      <i className="isax isax-tick-circle5 text-teal fs-24" />
                    </span>
                    <h6 className="mb-1">Convenient Locations</h6>
                    <p>
                      Multiple pick-up and drop-off locations to suit your
                      travel plans.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <span className="d-block mb-2">
                      <i className="isax isax-tick-circle5 text-orange fs-24" />
                    </span>
                    <h6 className="mb-1">Customer-Centric Service</h6>
                    <p>
                      Our team is always ready to assist you with any inquiries
                      or needs.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <Link href={routes.about_us} className="btn btn-dark me-3">
                    Get Started
                    <i className="isax isax-arrow-right-3 ms-2" />
                  </Link>
                  <Link
                    data-fancybox=""
                    href="https://youtu.be/NSAOrGb9orM"
                    className="btn btn-white"
                  >
                    <i className="isax isax-play-circle5 me-2" />
                    Watch Video
                  </Link>
                </div>
                <div className="row g-4">
                  <div className="col-md-4 d-flex">
                    <div className="counter-item card shadow-none flex-fill mb-0">
                      <div className="card-body">
                        <h3 className="display-6 text-primary mb-2">
                          <span className="counter text-dark">57</span>+
                        </h3>
                        <p>Destinations Worldwide</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex">
                    <div className="counter-item card shadow-none flex-fill mb-0">
                      <div className="card-body">
                        <h3 className="display-6 text-primary mb-2">
                          <span className="counter text-dark">7098</span>+
                        </h3>
                        <p>Booking Completed</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex">
                    <div className="counter-item card shadow-none flex-fill mb-0">
                      <div className="card-body">
                        <h3 className="display-6 text-primary mb-2">
                          <span className="counter text-dark">67</span>+
                        </h3>
                        <p>Client Globally</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /About Section */}

      <ProviderSlick />

      {/* Testimonials Section */}
      <section className="section testi-sec-six pb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div>
                <ImageWithBasePath
                  src="assets/img/section-img-03.png"
                  alt="Img"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="testi-info-six">
                <div className="section-header-six mb-4">
                  <span className="badge badge-soft-primary rounded-pill mb-1">
                    Testimonials
                  </span>
                  <h2>What Our Clients Says</h2>
                </div>
                <div>
                  <div className="d-flex align-items-center fs-12 mb-4">
                    <i className="ti ti-star-filled text-primary" />
                    <i className="ti ti-star-filled text-primary" />
                    <i className="ti ti-star-filled text-primary" />
                    <i className="ti ti-star-filled text-primary" />
                    <i className="ti ti-star-filled  text-primary me-1" />
                    <p className="fs-14 text-gray-9">5.0</p>
                  </div>
                  <p className="mb-4 testi-para">
                    I had an I recently booked a flight through, and I couldn’t
                    be happier with the experience.After finally selecting a
                    flight, I was hit with unexpected fees during checkout that
                    weren’t clearly stated upfront.
                  </p>
                  <div className="bg-white rounded-pill p-3 d-inline-flex align-items-center">
                    <Link href="#" className="avatar avtar-lg me-2">
                      <ImageWithBasePath
                        src="assets/img/users/user-28.jpg"
                        className="rounded-circle"
                        alt="Img"
                      />
                    </Link>
                    <div>
                      <h6>
                        <Link href="#">Rachel Mariscal</Link>
                      </h6>
                      <span className="d-block">United States</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="client-logos-sec">
          <div className="container">
            <div>
              <h6 className="text-white mb-3">40+ Clients Around the Globe</h6>
            </div>
            
              <AppSwiper preset="client-slider">
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-01.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-02.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-03.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-04.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-05.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-06.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-07.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
                <div className="client-img">
                  <ImageWithBasePath
                    src="assets/img/clients/client-04.svg"
                    className="img-white"
                    alt="img"
                  />
                </div>
              </AppSwiper>
          </div>
        </div>
      </section>
      {/* /Testimonials Section */}

      {/* Experts Section */}
      <section className="section bg-light-200 faq-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="tourism-text-info">
                <div className="text-header">
                  <h2>
                    Trusted Solution Of Your{" "}
                    <span className="text-primary">
                      {" "}
                      <ImageWithBasePath
                        src="assets/img/tours/tour-img.jpg"
                        alt="Img"
                      />{" "}
                      Tourism
                    </span>{" "}
                    Services
                  </h2>
                </div>
                <div className="card border-secondary shadow-none bg-secondary-transparent">
                  <div className="card-body d-flex align-items-center">
                    <span className="avatar bg-secondary rounded-circle flex-shrink-0">
                      <i className="isax isax-lock-1 text-gray-9 fs-20" />
                    </span>
                    <div className="ms-3">
                      <h5 className="mb-1">Secure Booking</h5>
                      <p>
                        Encrypted payments and instant tour confirmation, with
                        no card fees.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card border-purple shadow-none bg-purple-transparent">
                  <div className="card-body d-flex align-items-center">
                    <span className="avatar bg-purple rounded-circle flex-shrink-0">
                      <i className="isax isax-receipt-add fs-20" />
                    </span>
                    <div className="ms-3">
                      <h5 className="mb-1">Curated Experiences</h5>
                      <p>
                        Every tour is inspected and rated by our team before it
                        is listed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card border-teal shadow-none bg-teal-transparent">
                  <div className="card-body d-flex align-items-center">
                    <span className="avatar bg-teal rounded-circle flex-shrink-0">
                      <i className="isax isax-location-tick fs-20" />
                    </span>
                    <div className="ms-3">
                      <h5 className="mb-1">Best Price Guarantee</h5>
                      <p>Find the same tour cheaper within 24 hours and we refund the difference.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-cards-six">
                <div className="section-header-six mb-4">
                  <span className="badge badge-soft-primary rounded-pill mb-1">
                    Most Popular Providers
                  </span>
                  <h2>Try Relaxing Accomodations.</h2>
                </div>
                <div className="accordion accordion-flush" id="accordionFaq">
                  <div className="accordion-item show aos" data-aos="fade-up">
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
                  <div className="accordion-item aos" data-aos="fade-up">
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
                  <div className="accordion-item aos" data-aos="fade-up">
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
                  <div className="accordion-item aos" data-aos="fade-up">
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
          </div>
        </div>
      </section>
      {/* /Experts Section */}

      {/* Blog Section */}
      <section className="section blog-section blog-sec-six">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 aos" data-aos="fade-up">
              <div className="section-header-six">
                <span className="badge badge-soft-primary rounded-pill mb-1">
                  Recent Blog
                </span>
                <h2>
                  Checkout our Recent Articles
                  <span className="text-primary">.</span>
                </h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-end">
                <Link
                  href={routes.blogGrid}
                  className="btn btn-dark sec-head-btn"
                >
                  View All Blogs
                  <i className="isax isax-arrow-right-3 ms-2" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="card shadow-none blog-grid-six">
                <div className="card-img">
                  <Link href={routes.blogDetails}>
                    <ImageWithBasePath
                      src="assets/img/blog/blog-30.jpg"
                      className="rounded"
                      alt="Img"
                    />
                  </Link>
                  <span className="badge bg-primary">Booking</span>
                </div>
                <div className="card-body">
                  <h5 className="mb-2">
                    <Link href={routes.blogDetails}>
                      Eight days in Peru: a first-timer's route through the
                      Sacred Valley
                    </Link>
                  </h5>
                  <p className="mb-4">
                    How to pace Cusco, Pisac and Rainbow Mountain so altitude
                    works for you rather than against you.
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <Link
                        href="#"
                        className="avatar avatar-md flex-shrink-0 me-2"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-01.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <h6 className="fs-16 fw-normal">
                        <Link href="#">Andrew</Link>
                      </h6>
                    </div>
                    <span className="d-inline-flex align-items-center">
                      <i className="isax isax-calendar me-2 fs-20" />
                      27 Sep 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card shadow-none blog-grid-six">
                <div className="row align-items-center">
                  <div className="col-md-6 d-flex">
                    <div className="card-img flex-fill">
                      <Link href={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-31.jpg"
                          className="rounded w-100 h-100"
                          alt="Img"
                        />
                      </Link>
                      <span className="badge bg-primary">Booking</span>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card-body ps-md-0 flex-fill">
                      <h5 className="mb-2">
                        <Link href={routes.blogDetails}>
                          What a checked bag really costs on long-haul economy
                        </Link>
                      </h5>
                      <p className="mb-4 text-truncate line-clamb-3">
                        Airline baggage fees vary more than the fare itself.
                        Here is how to compare them before you book.
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-01.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <h6 className="fs-16 fw-normal">
                            <Link href="#">Andrew</Link>
                          </h6>
                        </div>
                        <span className="d-inline-flex align-items-center">
                          <i className="isax isax-calendar me-2 fs-20" />
                          27 Sep 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow-none blog-grid-six">
                <div className="row align-items-center">
                  <div className="col-md-6 d-flex">
                    <div className="card-img flex-fill">
                      <Link href={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-32.jpg"
                          className="rounded w-100 h-100"
                          alt="Img"
                        />
                      </Link>
                      <span className="badge bg-primary">Booking</span>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card-body ps-md-0 flex-fill">
                      <h5 className="mb-2">
                        <Link href={routes.blogDetails}>
                          Booking a private guide: what to ask before you pay
                        </Link>
                      </h5>
                      <p className="mb-4 text-truncate line-clamb-3">
                        Languages, licensing and group size matter more than
                        price. A short checklist for hiring well.
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            className="avatar avatar-md flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-01.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <h6 className="fs-16 fw-normal">
                            <Link href="#">Andrew</Link>
                          </h6>
                        </div>
                        <span className="d-inline-flex align-items-center">
                          <i className="isax isax-calendar me-2 fs-20" />
                          27 Sep 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Blog Section */}

      <FooterSix />
    </>
  );
};

export default HomeSix;
