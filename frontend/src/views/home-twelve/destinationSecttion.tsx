"use client";
import Link from "next/link";
import BannerCounter from "../../components/banner-counter/counter"
import ImageWithBasePath from "../../components/image-with-base-path"
import { all_routes } from "../../routes/all_routes"
import BookingDropdown from "../../components/booking-dropdown/bookingDropdown"
import { useState } from "react"
type Mode =  "visa" ;

type BookingState = {
  
  visa: {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
  };
};

const DestinationSecttion = () => {
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
    <>
  {/* Start Destinations Section */}
  <section className="section destination-section-twelve">
    <div className="container">
      <div
        className="banner-form card mb-0 wow fadeInDown"
        data-wow-delay="1.5"
      >
        <div className="card-body">
          <p className="fw-medium mb-2 text-dark">Check Eligibility</p>
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
                                                      defaultSubValue=""
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
            </div>
          </form>
        </div>
      </div>
      <div
        className="section-header-twelve wow fadeInDown"
        data-wow-delay="0.3"
        data-wow-duration="1s"
      >
        <div className="subtitle">
          {" "}
          <ImageWithBasePath
            src="assets/img/icons/flight-icon-1.svg"
            alt="flight"
            className="img-fluid img-1"
          />{" "}
          Destinations
        </div>
        <h2 className="section-title">
          {" "}
          Explore Visa Services by <span>Country</span>{" "}
        </h2>
      </div>
      {/* Start row */}
      <div className="row row-cols-lg-5 row-cols-md-2 row-cols-sm-2 row-cols-1 g-4 justify-content-center destination-twelve">
        <div className="col">
          {/* Item 1 */}
          <div
            className="destination-item-twelve item-1 wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1s"
          >
            <div className="destination-overlay">
              <ImageWithBasePath
                src="assets/img/destination/destination-img-5.jpg"
                alt="destination"
                className="img-fluid img-1"
              />
              <Link href="#" className="link-icon">
                {" "}
                <i className="isax isax-arrow-right-1" />{" "}
              </Link>
            </div>
            <div className="destination-content">
              <div className="title">
                <h3 className="custom-title">Denmark</h3>
                <p> 20 Services </p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End col */}
        <div className="col">
          {/* Item 1 */}
          <div
            className="destination-item-twelve item-2 wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1.5s"
          >
            <div className="destination-overlay">
              <ImageWithBasePath
                src="assets/img/destination/destination-img-6.jpg"
                alt="destination"
                className="img-fluid img-1"
              />
              <Link href="#" className="link-icon">
                {" "}
                <i className="isax isax-arrow-right-1" />{" "}
              </Link>
            </div>
            <div className="destination-content">
              <div className="title">
                <h3 className="custom-title">Canada</h3>
                <p> 12 Services </p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End col */}
        <div className="col">
          {/* Item 1 */}
          <div
            className="destination-item-twelve item-3 wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2s"
          >
            <div className="destination-overlay">
              <ImageWithBasePath
                src="assets/img/destination/destination-img-7.jpg"
                alt="destination"
                className="img-fluid img-1"
              />
              <Link href="#" className="link-icon">
                {" "}
                <i className="isax isax-arrow-right-1" />{" "}
              </Link>
            </div>
            <div className="destination-content">
              <div className="title">
                <h3 className="custom-title">Spain</h3>
                <p> 17 Services </p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End col */}
        <div className="col">
          {/* Item 1 */}
          <div
            className="destination-item-twelve item-4 wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2.5s"
          >
            <div className="destination-overlay">
              <ImageWithBasePath
                src="assets/img/destination/destination-img-8.jpg"
                alt="destination"
                className="img-fluid img-1"
              />
              <Link href="#" className="link-icon">
                {" "}
                <i className="isax isax-arrow-right-1" />{" "}
              </Link>
            </div>
            <div className="destination-content">
              <div className="title">
                <h3 className="custom-title">Denmark</h3>
                <p> 25 Services </p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End col */}
        <div className="col">
          {/* Item 1 */}
          <div
            className="destination-item-twelve item-5 wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="3s"
          >
            <div className="destination-overlay">
              <ImageWithBasePath
                src="assets/img/destination/destination-img-9.jpg"
                alt="destination"
                className="img-fluid img-1"
              />
              <Link href="#" className="link-icon">
                {" "}
                <i className="isax isax-arrow-right-1" />{" "}
              </Link>
            </div>
            <div className="destination-content">
              <div className="title">
                <h3 className="custom-title">UAE</h3>
                <p> 31 Services </p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End col */}
      </div>
      {/* End row */}
      {/* Start row */}
      <div className="row row-gap-4 pack-section">
        <div className="col-lg-4 col-md-4 d-flex">
          <div
            className="pack-item-twelve flex-fill wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1s"
          >
            <div>
              <h3 className="custom-title">Secure Document Handling</h3>
              <p>Passports and supporting documents held in encrypted, audited custody.</p>
            </div>
            <div className="pack-icon bg-secondary">
              <i className="isax isax-lock-1" />
            </div>
          </div>
        </div>{" "}
        {/* End col */}
        <div className="col-lg-4 col-md-4 d-flex">
          <div
            className="pack-item-twelve flex-fill wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1.5s"
          >
            <div>
              <h3 className="custom-title">Transparent Visa Fees</h3>
              <p>Government charges and service fees itemised in full before you pay</p>
            </div>
            <div className="pack-icon bg-purple">
              <i className="isax isax-receipt-add" />
            </div>
          </div>
        </div>{" "}
        {/* End col */}
        <div className="col-lg-4 col-md-4 d-flex">
          <div
            className="pack-item-twelve flex-fill wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2s"
          >
            <div>
              <h3 className="custom-title">Verified Visa Partners</h3>
              <p>Applications filed by accredited agents in each destination country</p>
            </div>
            <div className="pack-icon bg-teal">
              <i className="isax isax-location-tick" />
            </div>
          </div>
        </div>{" "}
        {/* End col */}
      </div>
      {/* End row */}
    </div>
    <ImageWithBasePath
      src="assets/img/bg/destination-bg-1.png"
      alt="destination"
      className="img-fluid element-1 d-none d-lg-block"
    />
  </section>
  {/* End Destinations Section */}
  <>
  {/* Start why Choose Section */}
  <section className="section whychoose-section-twelve">
    <div className="container">
      {/* Start row */}
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div
            className="why-choose-img wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1.5s"
          >
            <div className="choose-imgs-1">
              <ImageWithBasePath
                src="assets/img/provider/choose-img-1.jpg"
                alt="choose"
                className="img-fluid img-1"
              />
              <ImageWithBasePath
                src="assets/img/provider/choose-img-2.jpg"
                alt="choose"
                className="img-fluid img-1"
              />
            </div>
            <div className="choose-imgs-2">
              <ImageWithBasePath
                src="assets/img/provider/choose-img-3.jpg"
                alt="choose"
                className="img-fluid img-1"
              />
              <ImageWithBasePath
                src="assets/img/provider/choose-img-4.jpg"
                alt="choose"
                className="img-fluid img-1"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="why-choose-details">
            <div
              className="section-header-twelve wow fadeInDown"
              data-wow-delay="0.3"
              data-wow-duration="1s"
            >
              <div className="subtitle">
                {" "}
                <ImageWithBasePath
                  src="assets/img/icons/flight-icon-1.svg"
                  alt="flight"
                  className="img-fluid img-1"
                />{" "}
                100% Trusted Agency
              </div>
              <h2 className="section-title">
                {" "}
                Why Choose Our <span>Visa Agency?</span>{" "}
              </h2>
              <p className="para">
                We believe in creating immersive experiences that connect you
                with local culture, nature, and unforgettable moments. Every
                activity is carefully selected to ensure authenticity, safety,
                and the magic that makes travel truly special.From
                adrenaline-pumping adventures to peaceful cultural discoveries,
                we've got something for every type of traveler. Let us help you
                create memories that last a lifetime.
              </p>
            </div>
            <div className="choose-content">
              {/* Item 1  */}
              <div
                className="choose-item-twelve wow fadeInDown"
                data-wow-delay="0.3"
                data-wow-duration="1.5s"
              >
                <div className="choose-icon bg-secondary">
                  <i className="isax isax-like-1" />
                </div>
                <h3>High Visa Approval Rate &amp; it’s 99%.</h3>
              </div>
              {/* Item 2  */}
              <div
                className="choose-item-twelve wow fadeInDown"
                data-wow-delay="0.3"
                data-wow-duration="1.5s"
              >
                <div className="choose-icon bg-danger">
                  <i className="isax isax-timer" />
                </div>
                <h3>Fast &amp; Reliable Visa Processing.</h3>
              </div>
              {/* Item 3  */}
              <div
                className="choose-item-twelve mb-0 wow fadeInDown"
                data-wow-delay="0.3"
                data-wow-duration="1.5s"
              >
                <div className="choose-icon bg-cyan">
                  <i className="isax isax-security-safe4" />
                </div>
                <h3>100% Secure &amp; Confidential.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End row */}
    </div>
    <ImageWithBasePath
      src="assets/img/provider/why-choose-img.png"
      alt="why"
      className="img-fluid shadow-1"
    />
  </section>
  {/* End why Choose Section */}
</>

</>

  )
}

export default DestinationSecttion