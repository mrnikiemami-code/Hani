"use client";
import { format } from "date-fns";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomSelect from "../../../components/common-select/commonSelect";
import { ActivityCancellationOptions, ActivityCategoryOptions, ActivityDifficultyOptions } from "../../../core/data/mock/selectOption";
import { TimePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { useSectionSpy } from '../../../hooks/useSectionSpy'
import { all_routes } from "../../../routes/all_routes";

interface ItineraryStep {
  id: number;
  duration: string;
  title: string;
  description: string;
}

const initialItinerary: ItineraryStep[] = [
  {
    id: 1,
    duration: "30 Mins",
    title: "Safety Briefing & Equipment Fitting",
    description:
      "Meet your PADI certified divemaster, complete paperwork, and get fitted for high-grade wetsuits, BCDs, regulators, and masks.",
  },
  {
    id: 2,
    duration: "45 Mins",
    title: "Speedboat Cruise to Montgrí Marine Reserve",
    description:
      "Scenic coastal boat ride admiring cliffs and coves with refreshing mineral water and fruit snacks provided onboard.",
  },
  {
    id: 3,
    duration: "2 Hours",
    title: "Two Immersion Dives & Underwater Photography",
    description:
      "Explore underwater coral arches, octopus gardens, and schools of Mediterranean seabream accompanied by guide and 4K action cam.",
  },
];

const SECTION_IDS = [
  "#activity-details",
  "#location",
  "#timeslots",
  "#itinerary",
  "#inclusions",
  "#faq",
  "#gallery",
  "#description",
];

const EditActivity = () => {
  const routes = all_routes;
  const nextRouter = useRouter();
  const navigate = (to: string) => nextRouter.push(to);
  const addSlotRowRef = useRef<HTMLDivElement>(null);
  const [timeslots, setTimeslots] = useState<string[]>([
    "09:00 AM – 01:00 PM",
    "02:00 PM – 06:00 PM",
  ]);
  const [slotStart, setSlotStart] = useState<Date | null>(
    new Date("2026-01-01T10:00")
  );
  const [slotEnd, setSlotEnd] = useState<Date | null>(
    new Date("2026-01-01T14:00")
  );
  const [itinerary, setItinerary] = useState<ItineraryStep[]>(initialItinerary);

  const handleAddSlot = () => {
    if (!slotStart || !slotEnd) return;
    setTimeslots((prev) => [
      ...prev,
      `${format(slotStart, "hh:mm a")} – ${format(slotEnd, "hh:mm a")}`,
    ]);
    setSlotStart(null);
    setSlotEnd(null);
  };

  const handleAddStop = () => {
    setItinerary((prev) => [
      ...prev,
      { id: Date.now(), duration: "30 Mins", title: "", description: "" },
    ]);
  };
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
      label: "Activity",
      to: routes.tourList,
      active: false,
    },
    {
      label: "Edit Activity",
      active: true,
    },
  ];
  return (
   <>
  <Breadcrumb
        title="Edit Activity"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-09"
      />
  {/* Page Wrapper */}
  <div className="content">
    <div className="container">
      <div className="row">
        {/* Sticky Step Sidebar */}
        <div className="col-lg-3 theiaStickySidebar">
          <div className="card border-0 mb-4 mb-lg-0 sticky-card">
            <div className="card-body">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="fs-16 mb-0">Edit Sections</h5>
                  <span className="badge bg-success-transparent text-success fs-11">
                    Published
                  </span>
                </div>
                <ul className="add-tab-list">
                  <li>
                    <Link
                      href="#activity-details"
                      className={activeId === "#activity-details" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#activity-details")}
                    >
                      Activity Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#location"
                      className={activeId === "#location" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#location")}
                    >
                      Location &amp; Meeting Point
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#timeslots"
                      className={activeId === "#timeslots" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#timeslots")}
                    >
                      Timeslots &amp; Capacity
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#itinerary"
                      className={activeId === "#itinerary" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#itinerary")}
                    >
                      Experience Itinerary
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#inclusions"
                      className={activeId === "#inclusions" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#inclusions")}
                    >
                      Inclusions &amp; Extras
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#faq"
                      className={activeId === "#faq" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#faq")}
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#gallery"
                      className={activeId === "#gallery" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#gallery")}
                    >
                      Media &amp; Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#description"
                      className={activeId === "#description" ? "active" : ""}
                      onClick={(e) => onNavClick(e, "#description")}
                    >
                      Description &amp; Safety
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /Sticky Step Sidebar */}
        {/* Main Form Column */}
        <div className="col-lg-9">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(routes.tourList);
            }}
          >
            {/* Top Status Alert */}
            <div className="alert alert-info d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
              <div className="d-flex align-items-center gap-2">
                <i className="isax isax-info-circle fs-20 text-info" />
                <span className="fs-13">
                  You are editing{" "}
                  <strong>
                    Mediterranean Scuba Diving Experience &amp; Marine Reserve
                  </strong>
                  . Last updated on May 16, 2026.
                </span>
              </div>
              <Link
                href={routes.tourDetails}
                className="btn btn-sm btn-info text-white d-flex align-items-center"
                target="_blank"
              >
                <i className="isax isax-eye me-1" />
                Preview Live
              </Link>
            </div>
            {/* Section 1: Activity Details */}
            <div className="card mb-4" id="activity-details" ref={registerSection("#activity-details")}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="fs-16 mb-0">1. Activity Details</h5>
                <span className="fs-12 text-gray-5">Basic Information</span>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Activity Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="activity_name"
                      defaultValue="Mediterranean Scuba Diving Experience & Marine Reserve"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Category
                    </label>
                    <CustomSelect
                      options={ActivityCategoryOptions}
                      className="select"
                      defaultValue={ActivityCategoryOptions[0]}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Activity Difficulty
                    </label>
                    <CustomSelect
                      options={ActivityDifficultyOptions}
                      className="select"
                      defaultValue={ActivityDifficultyOptions[1]}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Duration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="4 Hours (Half Day)"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Max Group Capacity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={12}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Regular Price (USD) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={120.0}
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Offer / Promo Price (USD)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={95.0}
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Minimum Age
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={14}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Primary Language of Instruction
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="English, Spanish, French"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Section 2: Location */}
            <div className="card mb-4" id="location" ref={registerSection("#location")}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fs-16 mb-0">2. Location &amp; Meeting Point</h5>
                <span className="fs-12 text-gray-5">GPS &amp; Directions</span>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Moll de Marina, Pier 14, Port Olímpic"
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
                  <div className="col-md-6">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Latitude
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="41.3851"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Longitude
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="2.1934"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fs-14 fw-medium text-dark">
                      Meeting Point Instructions
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      defaultValue={
                        "Meet directly at the Blue Wave Dive Center dock gate 15 minutes before the booked timeslot. Look for instructors in blue DreamsTour polo shirts."
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Section 3: Timeslots */}
            <div className="card mb-4" id="timeslots" ref={registerSection("#timeslots")}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fs-16 mb-0">3. Timeslots &amp; Availability</h5>
                <button
                  type="button"
                  id="btn-add-timeslot"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() =>
                    addSlotRowRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }
                >
                  + Add Timeslot
                </button>
              </div>
              <div className="card-body">
                <label className="form-label fs-14 fw-medium text-dark mb-2">
                  Active Daily Departures
                </label>
                <div
                  id="timeslot-chips"
                  className="d-flex flex-wrap gap-2 mb-3"
                >
                  {timeslots.map((slot, idx) => (
                    <div className="timeslot-chip" key={`${slot}-${idx}`}>
                      <i className="isax isax-clock text-primary" />
                      <span className="fw-medium text-dark">{slot}</span>
                      <span className="badge bg-light text-dark fs-11">
                        Max 12 Pax
                      </span>
                      <button
                        type="button"
                        className="btn-close fs-10"
                        aria-label="Remove"
                        onClick={() =>
                          setTimeslots((prev) => prev.filter((_, i) => i !== idx))
                        }
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="row g-3 align-items-end pt-2 border-top"
                  ref={addSlotRowRef}
                >
                  <div className="col-md-4">
                    <label className="form-label fs-13 text-gray-6 mb-1">
                      Start Time
                    </label>
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        id="timeslot-start"
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        value={slotStart}
                        onChange={(value) => setSlotStart(value)}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-13 text-gray-6 mb-1">
                      End Time
                    </label>
                    <div className="input-icon-end position-relative">
                      <TimePicker
                        id="timeslot-end"
                        className="form-control form-control-sm timepicker"
                        placeholder="-- : -- AM/PM"
                        value={slotEnd}
                        onChange={(value) => setSlotEnd(value)}
                        format="hh:mm A"
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <button
                      type="button"
                      id="btn-add-slot"
                      className="btn btn-primary w-100"
                      onClick={handleAddSlot}
                    >
                      Add New Slot
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Section 4: Itinerary */}
            <div className="card mb-4" id="itinerary" ref={registerSection("#itinerary")}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="fs-16 mb-0">4. Experience Itinerary</h5>
                <button
                  type="button"
                  id="btn-add-stop"
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleAddStop}
                >
                  + Add Stop
                </button>
              </div>
              <div id="itinerary-steps" className="card-body">
                {itinerary.map((step, idx) => (
                  <div
                    className={`border rounded p-3${
                      idx < itinerary.length - 1 ? " mb-3" : ""
                    }`}
                    key={step.id}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-primary text-white fs-12">
                        Step {idx + 1} · {step.duration}
                      </span>
                      <button
                        type="button"
                        className="btn btn-xs btn-outline-danger"
                        onClick={() =>
                          setItinerary((prev) =>
                            prev.filter((item) => item.id !== step.id)
                          )
                        }
                      >
                        <i className="isax isax-trash" />
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Stop title..."
                      defaultValue={step.title}
                    />
                    <textarea
                      className="form-control fs-13"
                      rows={2}
                      placeholder="Stop description..."
                      defaultValue={step.description}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Section 5: Inclusions */}
            <div className="card mb-4" id="inclusions" ref={registerSection("#inclusions")}>
              <div className="card-header">
                <h5 className="fs-16 mb-0">5. Inclusions &amp; Exclusions</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <h6 className="fs-14 fw-semibold text-success mb-3">
                      <i className="isax isax-tick-circle me-1" />
                      What is Included
                    </h6>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inc-1"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="inc-1"
                      >
                        Complete scuba diving equipment (tank, regulator, BCD)
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inc-2"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="inc-2"
                      >
                        PADI Certified English/Spanish dive instructor
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inc-3"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="inc-3"
                      >
                        Marine Reserve entry permits &amp; insurance
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inc-4"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="inc-4"
                      >
                        Onboard bottled water and energy snacks
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fs-14 fw-semibold text-danger mb-3">
                      <i className="isax isax-close-circle me-1" />
                      What is NOT Included
                    </h6>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="exc-1"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="exc-1"
                      >
                        Hotel pickup and drop-off
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="exc-2"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="exc-2"
                      >
                        Personal swimwear and towel
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="exc-3"
                        defaultChecked
                      />
                      <label
                        className="form-check-label fs-13 text-dark"
                        htmlFor="exc-3"
                      >
                        Gratuities / Tips for the boat crew
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section 6: Media & Gallery */}
            <div className="card mb-4" id="gallery" ref={registerSection("#gallery")}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="fs-16 mb-0">6. Media &amp; Photos</h5>
                <span className="fs-12 text-gray-5">6 Images Uploaded</span>
              </div>
              <div className="card-body">
                <label className="form-label fs-14 fw-medium text-dark mb-2">
                  Current Activity Gallery
                </label>
                <div className="edit-activity-gallery-preview">
                  <div className="gallery-thumb-item">
                    <ImageWithBasePath
                      src="assets/img/tours/gallery-tour-01.jpg"
                      alt="Dive 1"
                    />
                    <button
                      type="button"
                      className="delete-thumb-btn"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                  <div className="gallery-thumb-item">
                    <ImageWithBasePath
                      src="assets/img/tours/gallery-tour-02.jpg"
                      alt="Dive 2"
                    />
                    <button
                      type="button"
                      className="delete-thumb-btn"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                  <div className="gallery-thumb-item">
                    <ImageWithBasePath
                      src="assets/img/tours/gallery-tour-03.jpg"
                      alt="Dive 3"
                    />
                    <button
                      type="button"
                      className="delete-thumb-btn"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                  <div className="gallery-thumb-item">
                    <ImageWithBasePath
                      src="assets/img/tours/gallery-tour-04.jpg"
                      alt="Dive 4"
                    />
                    <button
                      type="button"
                      className="delete-thumb-btn"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                  <div className="gallery-thumb-item">
                    <ImageWithBasePath
                      src="assets/img/tours/gallery-tour-05.jpg"
                      alt="Dive 5"
                    />
                    <button
                      type="button"
                      className="delete-thumb-btn"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                  <div className="gallery-thumb-item">
                    <ImageWithBasePath
                      src="assets/img/tours/gallery-tour-06.jpg"
                      alt="Dive 6"
                    />
                    <button
                      type="button"
                      className="delete-thumb-btn"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                </div>
                {/* Upload Area */}
                <div className="border border-dashed rounded p-4 text-center bg-light">
                  <i className="isax isax-document-upload text-primary fs-36 mb-2" />
                  <h6 className="fs-15 mb-1">
                    Drag and drop additional photos here
                  </h6>
                  <p className="fs-12 text-gray-5 mb-3">
                    PNG, JPG, WEBP up to 5MB each. Recommended 1200x800
                    resolution.
                  </p>
                  <label className="btn btn-outline-primary btn-sm mb-0">
                    Browse Files{" "}
                    <input type="file" hidden multiple accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
            {/* Section 7: Description */}
            <div className="card mb-4" id="description" ref={registerSection("#description")}>
              <div className="card-header">
                <h5 className="fs-16 mb-0">
                  7. Full Description &amp; Health Rules
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fs-14 fw-medium text-dark">
                    Activity Overview
                  </label>
                  <textarea
                    className="form-control"
                    rows={5}
                    defaultValue={
                      "Discover the rich underwater biodiversity of Catalonia's protected marine reserves with our premier Mediterranean Scuba Diving experience. Led by veteran PADI-certified divemasters, this four-hour excursion takes you to submerged sea caves, crystalline coral formations, and abundant marine flora. Whether completing a refresher or exploring Spanish waters for the first time, our small-group cap ensures personalized safety and guidance."
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fs-14 fw-medium text-dark">
                    Health &amp; Medical Prerequisites
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    defaultValue={
                      "Participants must fill out a standard RSTC medical questionnaire. Not recommended for pregnant travelers or individuals with respiratory/cardiac conditions. Flying within 18 hours of scuba diving is strictly discouraged."
                    }
                  />
                </div>
                <div>
                  <label className="form-label fs-14 fw-medium text-dark">
                    Cancellation Policy
                  </label>
                  <CustomSelect
                    options={ActivityCancellationOptions}
                    className="select"
                    defaultValue={ActivityCancellationOptions[0]}
                  />
                </div>
              </div>
            </div>
            {/* Action Bottom Bar */}
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-2">
                <Link href={routes.tourList} className="btn btn-outline-secondary">
                  <i className="isax isax-close-circle me-1" />
                  Discard Changes
                </Link>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button type="button" className="btn btn-light">
                    Save as Draft
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="isax isax-tick-circle me-1" />
                    Save &amp; Update Activity
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

export default EditActivity