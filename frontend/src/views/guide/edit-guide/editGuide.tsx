"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomSelect from "../../../components/common-select/commonSelect";
import { GuideGenderOptions, GuideMinBookingOptions } from "../../../core/data/mock/selectOption";
import { DatePicker, TimePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { useSectionSpy } from '../../../hooks/useSectionSpy'
import { all_routes } from "../../../routes/all_routes";

const SECTION_IDS = [
  "#basic_info",
  "#location",
  "#pricing",
  "#availability",
  "#language_skills",
  "#certifications",
  "#description",
];

const EditGuide = () => {
  const routes = all_routes;
  const nextRouter = useRouter();
  const navigate = (to: string) => nextRouter.push(to);
  const { activeId, registerSection, onNavClick } = useSectionSpy(SECTION_IDS);

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      showLabel: true,
      active: false,
    },
    {
      label: "Guides",
      to: routes.guideList,
      active: false,
    },
    {
      label: "Edit Guide Profile",
      active: true,
    },
  ];
  return (
    <>
  <Breadcrumb
        title="Edit Guide Profile"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-10"
      />
  {/* Page Wrapper */}
  <div className="content">
    <div className="container">
      <div className="row">
        {/* Sticky Sidebar */}
        <div className="col-lg-3 theiaStickySidebar">
          <div className="card border-0 mb-4 mb-lg-0">
            <div className="card-body">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="fs-16 mb-0">Guide Sections</h5>
                  <span className="badge bg-success-transparent text-success fs-11">
                    Verified
                  </span>
                </div>
                <ul className="add-tab-list">
                  <li>
                    <Link
                      href="#basic_info"
                      className={activeId === "#basic_info" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#basic_info")}
                    >
                      Basic Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#location"
                      className={activeId === "#location" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#location")}
                    >
                      Service Areas &amp; Base
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className={activeId === "#pricing" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#pricing")}
                    >
                      Tariffs &amp; Hourly Rates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#availability"
                      className={activeId === "#availability" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#availability")}
                    >
                      Weekly Schedule
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#language_skills"
                      className={activeId === "#language_skills" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#language_skills")}
                    >
                      Languages &amp; Specialty
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#certifications"
                      className={activeId === "#certifications" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#certifications")}
                    >
                      Certifications &amp; Licenses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#description"
                      className={activeId === "#description" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#description")}
                    >
                      Biography &amp; Guarantees
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /Sticky Sidebar */}
        {/* Main Form Column */}
        <div className="col-lg-9">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(routes.guideDetails);
            }}
          >
            {/* Verification Banner */}
            <div className="guide-license-badge w-100 mb-4 justify-content-between flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <i className="isax isax-verify fs-22" />
                <div>
                  <strong className="d-block fs-14">
                    Official Tourism Authority License Verified
                  </strong>
                  <span className="fs-12 text-gray-7">
                    License ID: #CAT-ES-88491 · Expiry: Dec 2028 · Issued by
                    Generalitat de Catalunya
                  </span>
                </div>
              </div>
              <span className="badge bg-success text-white fs-11 px-2 py-1">
                Active Status
              </span>
            </div>
            {/* Section 1: Basic Information */}
            <div className="card mb-4" id="basic_info" ref={registerSection("#basic_info")}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fs-16 mb-0">1. Basic Guide Details</h5>
                <span className="fs-12 text-gray-5">Personal Information</span>
              </div>
              <div className="card-body">
                {/* Avatar Upload / Change Area */}
                <div className="d-flex align-items-center gap-4 mb-4 pb-3 border-bottom flex-wrap">
                  <ImageWithBasePath
                    src="assets/img/guide/guide-01.jpg"
                    alt="Micheal John"
                    className="guide-avatar-preview"
                  />
                  <div>
                    <h6 className="fs-15 mb-1">Profile Photo</h6>
                    <p className="fs-12 text-gray-5 mb-2">
                      High resolution square portrait recommended (minimum
                      400x400px, PNG or JPG).
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <label className="btn btn-outline-primary btn-sm mb-0">
                        Change Photo{" "}
                        <input type="file" hidden accept="image/*" />
                      </label>
                      <button
                        type="button"
                        className="btn btn-light btn-sm text-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Micheal"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="John"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Official Licensed Guide & Art Historian"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue="micheal.john@barcelonaguides.com"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Direct Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="+34 612 849 201"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Date of Birth
                    </label>
                    <div className="input-icon-end position-relative">
                      <DatePicker
                        className="form-control datetimepicker"
                        placeholder="dd/mm/yyyy"
                        defaultValue={new Date("1988-08-15")}
                        format="DD-MM-YYYY"
                      />
                      <span className="input-icon-addon">
                        <i className="isax isax-calendar" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Gender
                    </label>
                    <CustomSelect
                      options={GuideGenderOptions}
                      className="select"
                      defaultValue={GuideGenderOptions[0]}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Years of Professional Experience
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={9}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Badge / Level
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Master Guide (Tier 1)"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Section 2: Location & Service Areas */}
            <div className="card mb-4" id="location" ref={registerSection("#location")}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fs-16 mb-0">
                  2. Service Areas &amp; Operating Base
                </h5>
                <span className="fs-12 text-gray-5">Geographic Coverage</span>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Resident Base Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Carrer de Mallorca 401, Eixample"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Barcelona"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      State / Region
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Catalonia"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Spain"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Primary Operating Areas (Cities / Districts)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Barcelona Old Town, Gothic Quarter, Eixample, Park Güell, Montserrat Mountain, Girona Historic Jewish Quarter"
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="travel-radius"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-gray-7"
                        htmlFor="travel-radius"
                      >
                        Willing to travel for full-day private tours up to 100km
                        radius (travel reimbursement applies).
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section 3: Pricing & Tariffs */}
            <div className="card mb-4" id="pricing" ref={registerSection("#pricing")}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fs-16 mb-0">3. Tariffs &amp; Rates</h5>
                <span className="fs-12 text-gray-5">Pricing Structure</span>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Hourly Rate (USD) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={45.0}
                        step={1.0}
                      />
                      <span className="input-group-text fs-12">/ hr</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Full Day Rate (8 Hours)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={280.0}
                        step={5.0}
                      />
                      <span className="input-group-text fs-12">/ day</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Overtime Rate (USD / hour)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={60.0}
                        step={1.0}
                      />
                      <span className="input-group-text fs-12">/ hr</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Minimum Booking Duration
                    </label>
                    <CustomSelect
                      options={GuideMinBookingOptions}
                      className="select"
                      defaultValue={GuideMinBookingOptions[1]}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Maximum Party Size
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={15}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Section 4: Availability Schedule */}
            <div className="card mb-4" id="availability" ref={registerSection("#availability")}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fs-16 mb-0">4. Weekly Availability</h5>
                <span className="fs-12 text-gray-5">
                  Standard Operating Hours
                </span>
              </div>
              <div className="card-body">
                {/* Monday */}
                <div className="row align-items-center mb-3">
                  <div className="col-md-3">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        id="day-mon"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fw-medium text-dark"
                        htmlFor="day-mon"
                      >
                        Monday
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T09:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 text-center text-gray-5">to</div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T18:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* Tuesday */}
                <div className="row align-items-center mb-3">
                  <div className="col-md-3">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        id="day-tue"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fw-medium text-dark"
                        htmlFor="day-tue"
                      >
                        Tuesday
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T09:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 text-center text-gray-5">to</div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T18:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* Wednesday */}
                <div className="row align-items-center mb-3">
                  <div className="col-md-3">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        id="day-wed"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fw-medium text-dark"
                        htmlFor="day-wed"
                      >
                        Wednesday
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T09:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 text-center text-gray-5">to</div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T18:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* Thursday */}
                <div className="row align-items-center mb-3">
                  <div className="col-md-3">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        id="day-thu"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fw-medium text-dark"
                        htmlFor="day-thu"
                      >
                        Thursday
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T09:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 text-center text-gray-5">to</div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T18:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* Friday */}
                <div className="row align-items-center mb-3">
                  <div className="col-md-3">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        id="day-fri"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fw-medium text-dark"
                        htmlFor="day-fri"
                      >
                        Friday
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T09:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 text-center text-gray-5">to</div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T20:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* Saturday */}
                <div className="row align-items-center mb-3">
                  <div className="col-md-3">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        id="day-sat"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fw-medium text-dark"
                        htmlFor="day-sat"
                      >
                        Saturday
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T09:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 text-center text-gray-5">to</div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        defaultValue={new Date("2026-01-01T20:00")}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* Sunday (Off) */}
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        id="day-sun"
                      />
                      <label
                        className="form-check-label text-gray-6"
                        htmlFor="day-sun"
                      >
                        Sunday (Day Off)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        format="hh:mm A"
                        disabled
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1 text-center text-gray-5">to</div>
                  <div className="col-md-4">
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        format="hh:mm A"
                        disabled
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section 5: Languages & Skills */}
            <div className="card mb-4" id="language_skills" ref={registerSection("#language_skills")}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fs-16 mb-0">
                  5. Languages &amp; Specializations
                </h5>
                <span className="fs-12 text-gray-5">Proficiency Tiers</span>
              </div>
              <div className="card-body">
                <label className="form-label fs-14 fw-medium text-dark mb-2">
                  Spoken Languages
                </label>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="language-level-badge">
                    <i className="isax isax-translate text-primary" />
                    English{" "}
                    <span className="badge bg-primary text-white fs-10">
                      Native C2
                    </span>
                    <button
                      type="button"
                      className="btn-close fs-10"
                      aria-label="Remove"
                    />
                  </span>
                  <span className="language-level-badge">
                    <i className="isax isax-translate text-primary" />
                    Spanish{" "}
                    <span className="badge bg-info text-white fs-10">
                      Fluent C2
                    </span>
                    <button
                      type="button"
                      className="btn-close fs-10"
                      aria-label="Remove"
                    />
                  </span>
                  <span className="language-level-badge">
                    <i className="isax isax-translate text-primary" />
                    Catalan{" "}
                    <span className="badge bg-success text-white fs-10">
                      Advanced C1
                    </span>
                    <button
                      type="button"
                      className="btn-close fs-10"
                      aria-label="Remove"
                    />
                  </span>
                  <span className="language-level-badge">
                    <i className="isax isax-translate text-primary" />
                    French{" "}
                    <span className="badge bg-secondary text-white fs-10">
                      Conversational B2
                    </span>
                    <button
                      type="button"
                      className="btn-close fs-10"
                      aria-label="Remove"
                    />
                  </span>
                </div>
                <label className="form-label fs-14 fw-medium text-dark mb-2">
                  Specialty Tags
                </label>
                <div className="row g-2">
                  <div className="col-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tag-1"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="tag-1"
                      >
                        Gaudí Architecture
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tag-2"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="tag-2"
                      >
                        Gothic Quarter History
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tag-3"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="tag-3"
                      >
                        Sagrada Família Skip-Line
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tag-4"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="tag-4"
                      >
                        Wine &amp; Tapas Insider
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tag-5"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="tag-5"
                      >
                        Montserrat Day Excursions
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tag-6"
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="tag-6"
                      >
                        Photography Workshops
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section 6: Certifications */}
            <div className="card mb-4" id="certifications" ref={registerSection("#certifications")}>
              <div className="card-header">
                <h5 className="fs-16 mb-0">
                  6. Certifications &amp; Accreditations
                </h5>
              </div>
              <div className="card-body">
                <div className="border rounded p-3 mb-3 bg-light">
                  <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className="isax isax-award text-success fs-20" />
                      <h6 className="fs-14 mb-0">
                        Official Tour Guide License (Guia Oficial de Turisme de
                        Catalunya)
                      </h6>
                    </div>
                    <span className="badge bg-success text-white fs-11">
                      Verified
                    </span>
                  </div>
                  <p className="fs-12 text-gray-6 mb-0">
                    Credential granting legal access to explain inside UNESCO
                    heritage sites including Sagrada Família, Casa Batlló, and
                    Picasso Museum.
                  </p>
                </div>
                <div className="border rounded p-3 mb-3 bg-light">
                  <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className="isax isax-shield-tick text-primary fs-20" />
                      <h6 className="fs-14 mb-0">
                        Red Cross Emergency First Aid &amp; CPR Certified
                      </h6>
                    </div>
                    <span className="badge bg-success text-white fs-11">
                      Verified
                    </span>
                  </div>
                  <p className="fs-12 text-gray-6 mb-0">
                    Recertified March 2025. Standard wilderness &amp; urban
                    emergency response certification.
                  </p>
                </div>
              </div>
            </div>
            {/* Section 7: Biography & Guarantees */}
            <div className="card mb-4" id="description" ref={registerSection("#description")}>
              <div className="card-header">
                <h5 className="fs-16 mb-0">
                  7. Biography &amp; Traveler Promise
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fs-14 fw-medium text-dark">
                    About Me (Bio)
                  </label>
                  <textarea
                    className="form-control"
                    rows={5}
                    defaultValue={
                      "Born and raised in the heart of Barcelona, I have spent the last nine years sharing the passion, myths, and architectural marvels of Catalonia with travelers from across the globe. Holding a Master's degree in Catalan Art History from the University of Barcelona, I bridge the gap between academic depth and lively, fun storytelling. My tours are always paced to your rhythm, whether you're traveling as a couple, with curious young children, or as an architecture enthusiast."
                    }
                  />
                </div>
                <div>
                  <label className="form-label fs-14 fw-medium text-dark">
                    Special Message to Guests
                  </label>
                  <textarea
                    className="form-control"
                    rows={2}
                    defaultValue={
                      "Skip the cookie-cutter group scripts! Every tour with me is tailored to what you love most—from hidden medieval courtyards to where to find the crispiest patatas bravas in El Born."
                    }
                  />
                </div>
              </div>
            </div>
            {/* Bottom Action Card */}
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-2">
                <Link
                  href={routes.guideDetails}
                  className="btn btn-outline-secondary"
                >
                  <i className="isax isax-close-circle me-1" />
                  Cancel &amp; Discard
                </Link>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button type="button" className="btn btn-light">
                    Save Draft
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="isax isax-tick-circle me-1" />
                    Save &amp; Update Profile
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* /Main Form Column */}
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
</>

  )
}

export default EditGuide