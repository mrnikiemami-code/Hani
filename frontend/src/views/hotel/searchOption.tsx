"use client";
import  { useState } from 'react'
import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path'
import BannerCounter from '../../components/banner-counter/counter';
import { all_routes } from '../../routes/all_routes';
import BookingDropdown from '../../components/booking-dropdown/bookingDropdown';
import CommonDateRange from '../../components/common-date-range-picker/CommonDateRange';
import type { IsoDate } from "@/lib/hani/calendar";
type Mode = "hotel";
type BookingState = {
  hotel: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  }
};
const SearchOption = () => {
    const routes = all_routes
        const [formData, setFormData] = useState<BookingState>({
        hotel: {
          rooms: 0,
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
      
      const handleCounter = (mode: "hotel") => {
        setAppliedData((prev) => ({
          ...prev,
          [mode]: formData[mode],
        }));
      };
      const hotelGuests =
        appliedData.hotel.rooms +
        appliedData.hotel.adults +
        appliedData.hotel.children +
        appliedData.hotel.infants;
        const totalHotelGuest = hotelGuests === 0 ? 4 : hotelGuests;
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
                {/* Hotel Search */}
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
                            <button type="submit" className="btn btn-primary search-btn rounded">Search</button>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Hotel Search */}

            {/* Hotel Types */}
            <div className="mb-2">
                <div className="mb-3">
                    <h5 className="mb-2">Choose type of Hotels you are interested</h5>
                </div>
                <div className="row">
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center hotel-type-item mb-3">
                            <Link href={routes.hotelGrid} className="avatar avatar-lg">
                                <ImageWithBasePath src="assets/img/hotels/hotel-model-01.jpg" className="rounded-circle" alt="img" />
                            </Link>
                            <div className="ms-2">
                                <h6 className="fs-16 fw-medium"><Link href={routes.hotelGrid}>Condos</Link></h6>
                                <p className="fs-14">216 Hotels</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center hotel-type-item mb-3">
                            <Link href={routes.hotelGrid} className="avatar avatar-lg">
                                <ImageWithBasePath src="assets/img/hotels/hotel-model-02.jpg" className="rounded-circle" alt="img" />
                            </Link>
                            <div className="ms-2">
                                <h6 className="fs-16 fw-medium"><Link href={routes.hotelGrid}>Apartments</Link></h6>
                                <p className="fs-14">569 Hotels</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center hotel-type-item mb-3">
                            <Link href={routes.hotelGrid} className="avatar avatar-lg">
                                <ImageWithBasePath src="assets/img/hotels/hotel-model-03.jpg" className="rounded-circle" alt="img" />
                            </Link>
                            <div className="ms-2">
                                <h6 className="fs-16 fw-medium"><Link href={routes.hotelGrid}>Villas</Link></h6>
                                <p className="fs-14">129 Hotels</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center hotel-type-item mb-3">
                            <Link href={routes.hotelGrid} className="avatar avatar-lg">
                                <ImageWithBasePath src="assets/img/hotels/hotel-model-04.jpg" className="rounded-circle" alt="img" />
                            </Link>
                            <div className="ms-2">
                                <h6 className="fs-16 fw-medium"><Link href={routes.hotelGrid}>5 Star Hotels</Link></h6>
                                <p className="fs-14">600 Hotels</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center hotel-type-item mb-3">
                            <Link href={routes.hotelGrid} className="avatar avatar-lg">
                                <ImageWithBasePath src="assets/img/hotels/hotel-model-01.jpg" className="rounded-circle" alt="img" />
                            </Link>
                            <div className="ms-2">
                                <h6 className="fs-16 fw-medium"><Link href={routes.hotelGrid}>3 Start Hotels</Link></h6>
                                <p className="fs-14">200 Hotels</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center hotel-type-item mb-3">
                            <Link href={routes.hotelGrid} className="avatar avatar-lg">
                                <ImageWithBasePath src="assets/img/hotels/hotel-model-06.jpg" className="rounded-circle" alt="img" />
                            </Link>
                            <div className="ms-2">
                                <h6 className="fs-16 fw-medium"><Link href={routes.hotelGrid}>2 Start Hotels</Link></h6>
                                <p className="fs-14">180 Hotels</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Hotel Types */}
    </>
  )
}

export default SearchOption
