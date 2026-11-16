"use client";
import { useState } from "react";
import Link from "next/link";
import { all_routes } from "../../routes/all_routes";
import BannerCounter from "../../components/banner-counter/counter";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
import CommonDateRange from "../../components/common-date-range-picker/CommonDateRange";
import type { IsoDate } from "@/lib/hani/calendar";
type Mode = "cruise";

type BookingState = {
  cruise: {
    adults: number;
    children: number;
    infants: number;
  };
};
const BannerFive = () => {
  const [formData, setFormData] = useState<BookingState>({
    cruise: {
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
  const cruisePassenger =
    appliedData.cruise.adults +
    appliedData.cruise.children +
    appliedData.cruise.infants;
  const totalCruisePassengers = cruisePassenger === 0 ? 4 : cruisePassenger;

  const handleCounter = (mode: "cruise") => {
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
    <section className="hero-section-five">
      <div className="container">
        <div className="hero-content">
          <div className="row align-items-center">
            <div className="col-md-12 mx-auto">
              <div></div>
              <div className="banner-content">
                <h1 className="text-white display-5">
                  Discover the World's Most Breathtaking Cruises
                </h1>
                <h6 className="text-white mx-auto">
                  Explore stunning destinations and world-class experiences
                  aboard our award-winning ships
                </h6>
              </div>
              <div className="banner-form card mb-0">
                <div className="card-body">
                  <div className="tab-pane" id="Cruise">
                    <form>
                      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                        <h6 className="fw-medium fs-16 mb-2">
                          Search For Cruise
                        </h6>
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
                                  { value: "New York", subValue: "John F. Kennedy International Airport" },
                                  { value: "Boston", subValue: "Boston Logan International Airport" },
                                  { value: "Northern Virginia", subValue: "Dulles International Airport" },
                                  { value: "Los Angeles", subValue: "Los Angeles International Airport" },
                                  { value: "Orlando", subValue: "Orlando International Airport" }
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
                                  onClick={() => handleCounter("cruise")}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerFive;
