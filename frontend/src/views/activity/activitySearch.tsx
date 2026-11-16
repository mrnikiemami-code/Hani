"use client";

import { useState } from "react";
import BannerCounter from "../../components/banner-counter/counter";
import Link from "next/link";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
import CommonDateRange from "../../components/common-date-range-picker/CommonDateRange";
import type { IsoDate } from "@/lib/hani/calendar";
type Mode = "activity";

type BookingState = {
  
  activity: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
};
const ActivitySearch = () => {
   const [formData, setFormData] = useState<BookingState>({
      
      activity: {
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
    const activityPassenger =
    appliedData.activity.rooms +
    appliedData.activity.adults +
    appliedData.activity.children +
    appliedData.activity.infants;
    const totalActivityPassengers = activityPassenger === 0 ? 4 : activityPassenger;
    const handleCounter = (mode: Mode) => {
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
    <div className="card">
      <div className="card-body">
        <div className="banner-form">
          <form className="d-lg-flex">
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
            <button
              type="submit"
              className="btn btn-primary search-btn rounded"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivitySearch;
