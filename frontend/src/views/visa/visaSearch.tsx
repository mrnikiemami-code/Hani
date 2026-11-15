"use client";
import Link from "next/link";
import BannerCounter from "../../components/banner-counter/counter";
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown";
import { useState } from "react";
type Mode =  "visa" ;

type BookingState = {
  
  visa: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
};

const VisaSearch = () => {
      const [formData, setFormData] = useState<BookingState>({
       
        visa: {
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
      const visaPassenger =
      appliedData.visa.rooms +
      appliedData.visa.adults +
      appliedData.visa.children +
      appliedData.visa.infants;
      const totalVisaPassengers = visaPassenger === 0 ? 4 : visaPassenger;
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

export default VisaSearch