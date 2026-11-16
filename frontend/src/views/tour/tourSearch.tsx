"use client";
import { useState } from "react";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
import CommonDateRange from "../../components/common-date-range-picker/CommonDateRange";
import BannerCounter from "../../components/banner-counter/counter";
import Link from "next/link";

type Mode = "tour";

type BookingState = {
  tour: {
    adults: number;
    children: number;
    infants: number;
  };
};
const TourSearch = () => {
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
  return (
    <div className="card">
                        <div className="card-body">
                            <div className="banner-form">
                                <form className="d-lg-flex">
                                    <div className="d-flex  form-info">
                            <div className="form-item dropdown">
                              <div
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
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
                              >
                                <label className="form-label fs-14 text-default mb-1">
                                  Travellers
                                </label>
                                <div className="h5 mb-0">
                                  {totalTourPassengers}{" "}
                                  <span className="fw-normal fs-14">
                                    Persons
                                  </span>
                                </div>
                                <p className="fs-12 mb-0">2 Adult</p>
                              </div>
                              <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                <div className="h5 mb-3">Select Travelers</div>
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
  )
}

export default TourSearch