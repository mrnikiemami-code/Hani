"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import HomeTenCategories from "./homeTenCategories";
import HomeTenExperience from "./homeTenExperience";
import HomeTenPartners from "./homeTenPartners";
import HomeTenBlogs from "./homeTenBlogs";
import HomeTenFooter from "./homeTenFooter";
import { useState } from "react";
import CommonDateRange from "../../components/common-date-range-picker/CommonDateRange";
import BannerCounter from "../../components/banner-counter/counter";
import { all_routes } from "../../routes/all_routes";
import { useBodyClass } from '../../hooks/useBodyClass'
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
type Mode = "guide";

type BookingState = {
  guide: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
};
const HomeTen = () => {
  const [formData, setFormData] = useState<BookingState>({
    
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
  
  const handleCounter = (mode: Mode) => {
    setAppliedData((prev) => ({
      ...prev,
      [mode]: formData[mode],
    }));
  };
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
  useBodyClass('home-10')
  return (
    <>
      {/* Start Hero Section */}
      <section className="hero-section-ten">
        <div className="container">
          {/* Start Banner */}
          <div className="banner-ten">
            <div className="row">
              <div className="col-xl-6">
                <div
                  className="banner-content wow fadeInUp"
                  data-wow-delay="1.5"
                >
                  <div className="title">
                    Explore the
                    <div className="d-xxl-flex align-items-center gap-3">
                      World with
                      <div className="avatar-list-stacked">
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
                    </div>
                    <div> Expert Guides</div>
                  </div>
                  <p className="text">
                    Personalized tours, authentic experiences, unforgettable
                    journeys
                  </p>
                </div>
                <div className="banner-btn wow fadeInUp" data-wow-delay="1.5">
                  <Link href="#" className="btn btn-primary">
                    Book a Tour <i className="isax isax-arrow-right-3" />
                  </Link>
                  <Link href="#" className="btn btn-white">
                    Explore All Guides <i className="isax isax-arrow-right-3" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="banner-img">
                  <ImageWithBasePath
                    src="assets/img/banner/banner-img-1.png"
                    alt="banner"
                    className="img-fluid img-1"
                  />
                  <div className="statistics wow zoomIn" data-wow-delay="1.5">
                    <h2 className="amount">1500+</h2>
                    <p>Booking Completed</p>
                    <div className="wave-button" />
                  </div>
                </div>
              </div>
            </div>
            {/* Start search */}
            <div className="search">
              <div
                className="banner-form card mb-0 wow fadeInUp"
                data-wow-delay="1.5"
              >
                <div className="card-body">
                  <form>
                    <div className="normal-trip">
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
                                                                        { value: "New York", subValue: "John F. Kennedy International Airport" },
                                                                        { value: "Boston", subValue: "Boston Logan International Airport" },
                                                                        { value: "Northern Virginia", subValue: "Dulles International Airport" },
                                  { value: "Los Angeles", subValue: "Los Angeles International Airport" },
                                  { value: "Orlando", subValue: "Orlando International Airport" }
                                                                      ]}
                                                                    />
                            </div>
                          </div>
                          <CommonDateRange onApply={handleApply} fromLabel="Start Date" toLabel="End Date"/>
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
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* End Search */}
          </div>
          {/* End Banner */}
        </div>
      </section>
      {/* End Hero Section */}

      <HomeTenCategories />
      <HomeTenExperience />
      <HomeTenPartners />
      <HomeTenBlogs />
      <HomeTenFooter />
    </>
  );
};

export default HomeTen;
