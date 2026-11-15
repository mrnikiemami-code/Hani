"use client";
import { useState } from "react";
import Link from "next/link";
import CustomSelect from "../../../components/common-select/commonSelect";
import { PackageAdultOptions, PackageChildOptions } from "../../../core/data/mock/selectOption";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import CustomPackageBuilderModal from "./customPackageBuilderModal";
import { all_routes } from "../../../routes/all_routes";

interface PackageItem {
  name: string;
  price: number;
  group: string | null;
  selected: boolean;
}

const BASE_PRICE = 750;

const PACKAGE_ITEMS: PackageItem[] = [
  { name: "Destination: Barcelona, Spain", price: 0, group: "dest_choice", selected: true },
  { name: "Destination: Amalfi Coast, Italy", price: 120, group: "dest_choice", selected: false },
  { name: "Destination: Tokyo & Kyoto, Japan", price: 250, group: "dest_choice", selected: false },
  { name: "Destination: Paris & French Riviera", price: 180, group: "dest_choice", selected: false },
  { name: "Non-Stop Roundtrip Flight (Delta)", price: 620, group: "flight_choice", selected: true },
  { name: "Connecting Economy Flight (Lufthansa)", price: 480, group: "flight_choice", selected: false },
  { name: "Flights Self-Arranged", price: 0, group: "flight_choice", selected: false },
  { name: "Private Mercedes Airport Transfer", price: 90, group: null, selected: true },
  { name: "Unlimited Regional Metro & Rail Pass", price: 60, group: null, selected: false },
  { name: "Hotel Miravent Barcelona (5-Star Suite)", price: 850, group: "hotel_choice", selected: true },
  { name: "Boutique Hotel Casa Gracia (4-Star)", price: 550, group: "hotel_choice", selected: false },
  { name: "Marina Port Beach Resort (3-Star)", price: 390, group: "hotel_choice", selected: false },
  { name: "Mediterranean Scuba Diving Experience", price: 95, group: null, selected: true },
  { name: "Sagrada Família Skip-The-Line VIP", price: 75, group: null, selected: true },
  { name: "Montserrat Monastery & Wine Tour", price: 120, group: null, selected: false },
  { name: "Sunset Catamaran Cruise with Cava", price: 65, group: null, selected: false },
  { name: "Full-Day Official Guide (Micheal John)", price: 280, group: null, selected: false },
  { name: "DreamsTour Premium Travel Insurance", price: 85, group: null, selected: true },
  { name: "Expedited Visa Pre-Check", price: 50, group: null, selected: false },
];

const CustomPackageBuilder = () => {
  const routes = all_routes;
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(
    PACKAGE_ITEMS.filter((item) => item.selected).map((item) => item.name)
  );

  const isSelected = (name: string) => selected.includes(name);

  const toggleItem = (name: string) => {
    const item = PACKAGE_ITEMS.find((i) => i.name === name);
    if (!item) return;
    setSelected((prev) => {
      if (item.group) {
        const others = PACKAGE_ITEMS.filter((i) => i.group === item.group).map(
          (i) => i.name
        );
        return [...prev.filter((n) => !others.includes(n)), name];
      }
      return prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
    });
  };

  const selectedItems = PACKAGE_ITEMS.filter((item) =>
    selected.includes(item.name)
  );
  const addonsTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const goToStep = (index: number) => {
    setStep(index);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Tours",
      to: routes.tourGrid,
      active: false,
    },
    {
      label: "Custom Package Builder",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Custom Package Builder"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-02"
      />
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Stepper Progress Header */}
          <div className="package-builder-stepper mb-5">
            <div
              className={`step-item${step === 0 ? " active" : ""}${
                step > 0 ? " completed" : ""
              }`}
              onClick={() => goToStep(0)}
            >
              <div className="step-circle">1</div>
              <span className="step-title">Destination &amp; Dates</span>
            </div>
            <div
              className={`step-item${step === 1 ? " active" : ""}${
                step > 1 ? " completed" : ""
              }`}
              onClick={() => goToStep(1)}
            >
              <div className="step-circle">2</div>
              <span className="step-title">Flights &amp; Transfers</span>
            </div>
            <div
              className={`step-item${step === 2 ? " active" : ""}${
                step > 2 ? " completed" : ""
              }`}
              onClick={() => goToStep(2)}
            >
              <div className="step-circle">3</div>
              <span className="step-title">Accommodation</span>
            </div>
            <div
              className={`step-item${step === 3 ? " active" : ""}${
                step > 3 ? " completed" : ""
              }`}
              onClick={() => goToStep(3)}
            >
              <div className="step-circle">4</div>
              <span className="step-title">Activities &amp; Guides</span>
            </div>
            <div
              className={`step-item${step === 4 ? " active" : ""}${
                step > 4 ? " completed" : ""
              }`}
              onClick={() => goToStep(4)}
            >
              <div className="step-circle">5</div>
              <span className="step-title">Review &amp; Summary</span>
            </div>
          </div>
          <div className="row">
            {/* Left Multi-Step Panes Column */}
            <div className="col-lg-8">
              {/* ============================================== */}
              {/* STEP 1: Destination & Dates Pane */}
              {/* ============================================== */}
              <div className={`package-step-pane${step === 0 ? "" : " d-none"}`}>
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="fs-16 mb-0">
                      Step 1: Choose Destination &amp; Travel Dates
                    </h5>
                  </div>
                  <div className="card-body">
                    <label className="form-label fs-14 fw-semibold text-dark mb-2">
                      Select Your Primary Travel Destination
                    </label>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Destination: Barcelona, Spain") ? " selected" : ""
                          }`}
                          data-price={0}
                          data-item-name="Destination: Barcelona, Spain"
                          onClick={() => toggleItem("Destination: Barcelona, Spain")}
                        >
                          <div className="d-flex align-items-center gap-3 flex-wrap">
                            <input
                              type="radio"
                              name="dest_choice"
                              className="form-check-input"
                              checked={isSelected("Destination: Barcelona, Spain")}
                              readOnly
                            />
                            <ImageWithBasePath
                              src="assets/img/tours/tours-01.jpg"
                              alt="Barcelona"
                              className="avatar avatar-lg rounded"
                            />
                            <div>
                              <h6 className="fs-15 mb-1">
                                Barcelona &amp; Catalonia
                              </h6>
                              <span className="fs-12 text-gray-6">
                                Spain · Cultural &amp; Mediterranean
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Destination: Amalfi Coast, Italy") ? " selected" : ""
                          }`}
                          data-price={120}
                          data-item-name="Destination: Amalfi Coast, Italy"
                          onClick={() => toggleItem("Destination: Amalfi Coast, Italy")}
                        >
                          <div className="d-flex align-items-center gap-3 flex-wrap">
                            <input
                              type="radio"
                              name="dest_choice"
                              className="form-check-input"
                              checked={isSelected("Destination: Amalfi Coast, Italy")}
                              readOnly
                            />
                            <ImageWithBasePath
                              src="assets/img/tours/tours-02.jpg"
                              alt="Amalfi Coast"
                              className="avatar avatar-lg rounded"
                            />
                            <div>
                              <h6 className="fs-15 mb-1">
                                Amalfi Coast &amp; Rome
                              </h6>
                              <span className="fs-12 text-gray-6">
                                Italy · Scenic Coastal (+$120)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Destination: Tokyo & Kyoto, Japan") ? " selected" : ""
                          }`}
                          data-price={250}
                          data-item-name="Destination: Tokyo & Kyoto, Japan"
                          onClick={() => toggleItem("Destination: Tokyo & Kyoto, Japan")}
                        >
                          <div className="d-flex align-items-center gap-3 flex-wrap">
                            <input
                              type="radio"
                              name="dest_choice"
                              className="form-check-input"
                              checked={isSelected("Destination: Tokyo & Kyoto, Japan")}
                              readOnly
                            />
                            <ImageWithBasePath
                              src="assets/img/tours/tours-03.jpg"
                              alt="Tokyo"
                              className="avatar avatar-lg rounded"
                            />
                            <div>
                              <h6 className="fs-15 mb-1">
                                Tokyo &amp; Kyoto Highlights
                              </h6>
                              <span className="fs-12 text-gray-6">
                                Japan · Heritage &amp; Modern (+$250)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Destination: Paris & French Riviera") ? " selected" : ""
                          }`}
                          data-price={180}
                          data-item-name="Destination: Paris & French Riviera"
                          onClick={() => toggleItem("Destination: Paris & French Riviera")}
                        >
                          <div className="d-flex align-items-center gap-3 flex-wrap">
                            <input
                              type="radio"
                              name="dest_choice"
                              className="form-check-input"
                              checked={isSelected("Destination: Paris & French Riviera")}
                              readOnly
                            />
                            <ImageWithBasePath
                              src="assets/img/tours/tours-04.jpg"
                              alt="Paris"
                              className="avatar avatar-lg rounded"
                            />
                            <div>
                              <h6 className="fs-15 mb-1">
                                Paris &amp; French Riviera
                              </h6>
                              <span className="fs-12 text-gray-6">
                                France · Romance &amp; Luxury (+$180)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fs-14 fw-medium text-dark">
                          Departure Date
                        </label>
                        <div className="input-icon-end position-relative">
                          <DatePicker
                            className="form-control datetimepicker"
                            placeholder="dd/mm/yyyy"
                            defaultValue={new Date("2026-05-20")}
                            format="DD-MM-YYYY"
                          />
                          <span className="input-icon-addon">
                            <i className="isax isax-calendar" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fs-14 fw-medium text-dark">
                          Return Date
                        </label>
                        <div className="input-icon-end position-relative">
                          <DatePicker
                            className="form-control datetimepicker"
                            placeholder="dd/mm/yyyy"
                            defaultValue={new Date("2026-05-25")}
                            format="DD-MM-YYYY"
                          />
                          <span className="input-icon-addon">
                            <i className="isax isax-calendar" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fs-14 fw-medium text-dark">
                          Number of Adults (12+ yrs)
                        </label>
                        <CustomSelect
                          options={PackageAdultOptions}
                          className="select"
                          defaultValue={PackageAdultOptions[1]}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fs-14 fw-medium text-dark">
                          Children (0-11 yrs)
                        </label>
                        <CustomSelect
                          options={PackageChildOptions}
                          className="select"
                          defaultValue={PackageChildOptions[0]}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-next-step"
                        data-next-step={1}
                        onClick={() => goToStep(1)}
                      >
                        Next: Flights &amp; Transfers{" "}
                        <i className="isax isax-arrow-right-3 ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ============================================== */}
              {/* STEP 2: Flights & Transport Pane */}
              {/* ============================================== */}
              <div className={`package-step-pane${step === 1 ? "" : " d-none"}`}>
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="fs-16 mb-0">
                      Step 2: Flights &amp; Ground Transportation
                    </h5>
                  </div>
                  <div className="card-body">
                    <label className="form-label fs-14 fw-semibold text-dark mb-2">
                      Round-Trip Air Travel
                    </label>
                    <div className="row g-3 mb-4">
                      <div className="col-md-12">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Non-Stop Roundtrip Flight (Delta)") ? " selected" : ""
                          }`}
                          data-price={620}
                          data-item-name="Non-Stop Roundtrip Flight (Delta)"
                          onClick={() => toggleItem("Non-Stop Roundtrip Flight (Delta)")}
                        >
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                              <input
                                type="radio"
                                name="flight_choice"
                                className="form-check-input"
                                checked={isSelected("Non-Stop Roundtrip Flight (Delta)")}
                                readOnly
                              />
                              <i className="isax isax-airplane text-primary fs-28" />
                              <div>
                                <h6 className="fs-15 mb-0">
                                  Delta Air Lines / Air France (Non-Stop)
                                </h6>
                                <span className="fs-12 text-gray-6">
                                  JFK ↔ BCN · 7h 45m · Checked Bag &amp; Meals
                                  Included
                                </span>
                              </div>
                            </div>
                            <span className="fs-16 fw-bold text-primary">
                              +$620 / person
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Connecting Economy Flight (Lufthansa)") ? " selected" : ""
                          }`}
                          data-price={480}
                          data-item-name="Connecting Economy Flight (Lufthansa)"
                          onClick={() => toggleItem("Connecting Economy Flight (Lufthansa)")}
                        >
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                              <input
                                type="radio"
                                name="flight_choice"
                                className="form-check-input"
                                checked={isSelected("Connecting Economy Flight (Lufthansa)")}
                                readOnly
                              />
                              <i className="isax isax-airplane text-secondary fs-28" />
                              <div>
                                <h6 className="fs-15 mb-0">
                                  Lufthansa (1 Stop via Frankfurt)
                                </h6>
                                <span className="fs-12 text-gray-6">
                                  JFK → FRA → BCN · 10h 15m · Saver Economy
                                </span>
                              </div>
                            </div>
                            <span className="fs-16 fw-bold text-dark">
                              +$480 / person
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Flights Self-Arranged") ? " selected" : ""
                          }`}
                          data-price={0}
                          data-item-name="Flights Self-Arranged"
                          onClick={() => toggleItem("Flights Self-Arranged")}
                        >
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                              <input
                                type="radio"
                                name="flight_choice"
                                className="form-check-input"
                                checked={isSelected("Flights Self-Arranged")}
                                readOnly
                              />
                              <i className="isax isax-ticket text-gray-5 fs-28" />
                              <div>
                                <h6 className="fs-15 mb-0">
                                  I will arrange my own flights
                                </h6>
                                <span className="fs-12 text-gray-6">
                                  No airfare added to package total
                                </span>
                              </div>
                            </div>
                            <span className="badge bg-light text-dark fs-12">
                              $0.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label className="form-label fs-14 fw-semibold text-dark mb-2">
                      Ground Transport &amp; Airport Pickups
                    </label>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Private Mercedes Airport Transfer") ? " selected" : ""
                          }`}
                          data-price={90}
                          data-item-name="Private Mercedes Airport Transfer"
                          onClick={() => toggleItem("Private Mercedes Airport Transfer")}
                        >
                          <div className="d-flex align-items-center gap-3 flex-wrap">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isSelected("Private Mercedes Airport Transfer")}
                              readOnly
                            />
                            <i className="isax isax-car text-primary fs-24" />
                            <div>
                              <h6 className="fs-14 mb-0">
                                Private Mercedes Transfer
                              </h6>
                              <span className="fs-12 text-gray-6">
                                Roundtrip airport meet &amp; greet (+$90)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Unlimited Regional Metro & Rail Pass") ? " selected" : ""
                          }`}
                          data-price={60}
                          data-item-name="Unlimited Regional Metro & Rail Pass"
                          onClick={() => toggleItem("Unlimited Regional Metro & Rail Pass")}
                        >
                          <div className="d-flex align-items-center gap-3 flex-wrap">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isSelected("Unlimited Regional Metro & Rail Pass")}
                              readOnly
                            />
                            <i className="isax isax-bus text-info fs-24" />
                            <div>
                              <h6 className="fs-14 mb-0">
                                Hola Barcelona 5-Day Transit
                              </h6>
                              <span className="fs-12 text-gray-6">
                                Unlimited metro, bus &amp; tram (+$60)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-prev-step"
                        data-prev-step={0}
                        onClick={() => goToStep(0)}
                      >
                        <i className="isax isax-arrow-left-2 me-1" />
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-next-step"
                        data-next-step={2}
                        onClick={() => goToStep(2)}
                      >
                        Next: Hotel &amp; Lodging{" "}
                        <i className="isax isax-arrow-right-3 ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ============================================== */}
              {/* STEP 3: Accommodation Pane */}
              {/* ============================================== */}
              <div className={`package-step-pane${step === 2 ? "" : " d-none"}`}>
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="fs-16 mb-0">
                      Step 3: Select Hotel Accommodation
                    </h5>
                  </div>
                  <div className="card-body">
                    <label className="form-label fs-14 fw-semibold text-dark mb-2">
                      Choose Your Stay (5 Nights Included)
                    </label>
                    <div className="row g-3 mb-4">
                      {/* Hotel 1 */}
                      <div className="col-md-12">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Hotel Miravent Barcelona (5-Star Suite)") ? " selected" : ""
                          }`}
                          data-price={850}
                          data-item-name="Hotel Miravent Barcelona (5-Star Suite)"
                          onClick={() => toggleItem("Hotel Miravent Barcelona (5-Star Suite)")}
                        >
                          <div className="row align-items-center g-3">
                            <div className="col-auto">
                              <input
                                type="radio"
                                name="hotel_choice"
                                className="form-check-input"
                                checked={isSelected("Hotel Miravent Barcelona (5-Star Suite)")}
                                readOnly
                              />
                            </div>
                            <div className="col-md-3">
                              <ImageWithBasePath
                                src="assets/img/hotels/hotel-01.jpg"
                                alt="Hotel Miravent"
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="col-md-5">
                              <div className="d-flex align-items-center gap-1 mb-1">
                                <span className="badge bg-warning text-white fs-10">
                                  <i className="fa-solid fa-star" /> 5-Star
                                  Luxury
                                </span>
                                <span className="badge bg-success-transparent text-success fs-10">
                                  Breakfast Included
                                </span>
                              </div>
                              <h6 className="fs-16 mb-1">
                                Hotel Miravent Barcelona
                              </h6>
                              <p className="fs-12 text-gray-6 mb-0">
                                Gothic Quarter · Rooftop Infinity Pool · Spa
                              </p>
                            </div>
                            <div className="col-md-3 text-md-end">
                              <span className="fs-18 fw-bold text-primary d-block">
                                +$850
                              </span>
                              <span className="fs-12 text-gray-5">
                                Total for 5 Nights
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Hotel 2 */}
                      <div className="col-md-12">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Boutique Hotel Casa Gracia (4-Star)") ? " selected" : ""
                          }`}
                          data-price={550}
                          data-item-name="Boutique Hotel Casa Gracia (4-Star)"
                          onClick={() => toggleItem("Boutique Hotel Casa Gracia (4-Star)")}
                        >
                          <div className="row align-items-center g-3">
                            <div className="col-auto">
                              <input
                                type="radio"
                                name="hotel_choice"
                                className="form-check-input"
                                checked={isSelected("Boutique Hotel Casa Gracia (4-Star)")}
                                readOnly
                              />
                            </div>
                            <div className="col-md-3">
                              <ImageWithBasePath
                                src="assets/img/hotels/hotel-02.jpg"
                                alt="Casa Gracia"
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="col-md-5">
                              <div className="d-flex align-items-center gap-1 mb-1">
                                <span className="badge bg-primary text-white fs-10">
                                  <i className="fa-solid fa-star" /> 4-Star
                                  Boutique
                                </span>
                              </div>
                              <h6 className="fs-16 mb-1">
                                Casa Gracia Barcelona
                              </h6>
                              <p className="fs-12 text-gray-6 mb-0">
                                Passeig de Gràcia · Artistic Lounge · Terrace
                              </p>
                            </div>
                            <div className="col-md-3 text-md-end">
                              <span className="fs-18 fw-bold text-dark d-block">
                                +$550
                              </span>
                              <span className="fs-12 text-gray-5">
                                Total for 5 Nights
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Hotel 3 */}
                      <div className="col-md-12">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Marina Port Beach Resort (3-Star)") ? " selected" : ""
                          }`}
                          data-price={390}
                          data-item-name="Marina Port Beach Resort (3-Star)"
                          onClick={() => toggleItem("Marina Port Beach Resort (3-Star)")}
                        >
                          <div className="row align-items-center g-3">
                            <div className="col-auto">
                              <input
                                type="radio"
                                name="hotel_choice"
                                className="form-check-input"
                                checked={isSelected("Marina Port Beach Resort (3-Star)")}
                                readOnly
                              />
                            </div>
                            <div className="col-md-3">
                              <ImageWithBasePath
                                src="assets/img/hotels/hotel-03.jpg"
                                alt="Marina Port"
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="col-md-5">
                              <div className="d-flex align-items-center gap-1 mb-1">
                                <span className="badge bg-secondary text-white fs-10">
                                  <i className="fa-solid fa-star" /> 3-Star
                                  Resort
                                </span>
                              </div>
                              <h6 className="fs-16 mb-1">
                                Marina Port Beachfront Inn
                              </h6>
                              <p className="fs-12 text-gray-6 mb-0">
                                Barceloneta Beach · Sea View Balconies
                              </p>
                            </div>
                            <div className="col-md-3 text-md-end">
                              <span className="fs-18 fw-bold text-dark d-block">
                                +$390
                              </span>
                              <span className="fs-12 text-gray-5">
                                Total for 5 Nights
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-prev-step"
                        data-prev-step={1}
                        onClick={() => goToStep(1)}
                      >
                        <i className="isax isax-arrow-left-2 me-1" />
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-next-step"
                        data-next-step={3}
                        onClick={() => goToStep(3)}
                      >
                        Next: Activities &amp; Guides{" "}
                        <i className="isax isax-arrow-right-3 ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ============================================== */}
              {/* STEP 4: Activities & Guides Pane */}
              {/* ============================================== */}
              <div className={`package-step-pane${step === 3 ? "" : " d-none"}`}>
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="fs-16 mb-0">
                      Step 4: Excursions, Certified Guides &amp; Extras
                    </h5>
                  </div>
                  <div className="card-body">
                    <label className="form-label fs-14 fw-semibold text-dark mb-2">
                      Add Excursions &amp; Local Experiences
                    </label>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Mediterranean Scuba Diving Experience") ? " selected" : ""
                          }`}
                          data-price={95}
                          data-item-name="Mediterranean Scuba Diving Experience"
                          onClick={() => toggleItem("Mediterranean Scuba Diving Experience")}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <input
                              type="checkbox"
                              className="form-check-input mt-1"
                              checked={isSelected("Mediterranean Scuba Diving Experience")}
                              readOnly
                            />
                            <div>
                              <h6 className="fs-14 mb-1">
                                Mediterranean Scuba Diving Experience
                              </h6>
                              <p className="fs-12 text-gray-6 mb-1">
                                PADI certified dive at Marine Reserve.
                              </p>
                              <span className="fs-13 fw-bold text-primary">
                                +$95.00
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Sagrada Família Skip-The-Line VIP") ? " selected" : ""
                          }`}
                          data-price={75}
                          data-item-name="Sagrada Família Skip-The-Line VIP"
                          onClick={() => toggleItem("Sagrada Família Skip-The-Line VIP")}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <input
                              type="checkbox"
                              className="form-check-input mt-1"
                              checked={isSelected("Sagrada Família Skip-The-Line VIP")}
                              readOnly
                            />
                            <div>
                              <h6 className="fs-14 mb-1">
                                Sagrada Família &amp; Tower VIP Access
                              </h6>
                              <p className="fs-12 text-gray-6 mb-1">
                                Skip-the-line priority ticket + audio guide.
                              </p>
                              <span className="fs-13 fw-bold text-primary">
                                +$75.00
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Montserrat Monastery & Wine Tour") ? " selected" : ""
                          }`}
                          data-price={120}
                          data-item-name="Montserrat Monastery & Wine Tour"
                          onClick={() => toggleItem("Montserrat Monastery & Wine Tour")}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <input
                              type="checkbox"
                              className="form-check-input mt-1"
                              checked={isSelected("Montserrat Monastery & Wine Tour")}
                              readOnly
                            />
                            <div>
                              <h6 className="fs-14 mb-1">
                                Montserrat Monastery &amp; Organic Wine
                              </h6>
                              <p className="fs-12 text-gray-6 mb-1">
                                Full-day guided mountain trip with lunch.
                              </p>
                              <span className="fs-13 fw-bold text-primary">
                                +$120.00
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Sunset Catamaran Cruise with Cava") ? " selected" : ""
                          }`}
                          data-price={65}
                          data-item-name="Sunset Catamaran Cruise with Cava"
                          onClick={() => toggleItem("Sunset Catamaran Cruise with Cava")}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <input
                              type="checkbox"
                              className="form-check-input mt-1"
                              checked={isSelected("Sunset Catamaran Cruise with Cava")}
                              readOnly
                            />
                            <div>
                              <h6 className="fs-14 mb-1">
                                Sunset Catamaran Cruise &amp; Live Music
                              </h6>
                              <p className="fs-12 text-gray-6 mb-1">
                                2-hour coastal sail with Spanish Cava.
                              </p>
                              <span className="fs-13 fw-bold text-primary">
                                +$65.00
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label className="form-label fs-14 fw-semibold text-dark mb-2">
                      Certified Personal Guide Service
                    </label>
                    <div className="row g-3 mb-4">
                      <div className="col-md-12">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Full-Day Official Guide (Micheal John)") ? " selected" : ""
                          }`}
                          data-price={280}
                          data-item-name="Full-Day Official Guide (Micheal John)"
                          onClick={() => toggleItem("Full-Day Official Guide (Micheal John)")}
                        >
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-3 flex-wrap gap-2">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={isSelected("Full-Day Official Guide (Micheal John)")}
                                readOnly
                              />
                              <ImageWithBasePath
                                src="assets/img/guide/guide-01.jpg"
                                alt="Micheal John"
                                className="avatar avatar-md rounded-circle"
                              />
                              <div>
                                <div className="d-flex align-items-center gap-2">
                                  <h6 className="fs-14 mb-0">
                                    Micheal John · Official Licensed Guide
                                  </h6>
                                  <span className="badge bg-success-transparent text-success fs-10">
                                    Verified
                                  </span>
                                </div>
                                <p className="fs-12 text-gray-6 mb-0">
                                  Full day private walking tour tailored to your
                                  party (8 Hours)
                                </p>
                              </div>
                            </div>
                            <span className="fs-15 fw-bold text-primary">
                              +$280.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label className="form-label fs-14 fw-semibold text-dark mb-2">
                      Travel Protection &amp; Visa Assistance
                    </label>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("DreamsTour Premium Travel Insurance") ? " selected" : ""
                          }`}
                          data-price={85}
                          data-item-name="DreamsTour Premium Travel Insurance"
                          onClick={() => toggleItem("DreamsTour Premium Travel Insurance")}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isSelected("DreamsTour Premium Travel Insurance")}
                              readOnly
                            />
                            <i className="isax isax-shield-tick text-success fs-24" />
                            <div>
                              <h6 className="fs-14 mb-0">
                                Comprehensive Travel Insurance
                              </h6>
                              <span className="fs-12 text-gray-6">
                                Trip cancellation, medical &amp; baggage (+$85)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`builder-component-card builder-selectable-item${
                            isSelected("Expedited Visa Pre-Check") ? " selected" : ""
                          }`}
                          data-price={50}
                          data-item-name="Expedited Visa Pre-Check"
                          onClick={() => toggleItem("Expedited Visa Pre-Check")}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isSelected("Expedited Visa Pre-Check")}
                              readOnly
                            />
                            <i className="isax isax-global text-info fs-24" />
                            <div>
                              <h6 className="fs-14 mb-0">
                                Schengen Visa Consultation
                              </h6>
                              <span className="fs-12 text-gray-6">
                                Document pre-check &amp; embassy booking (+$50)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-prev-step"
                        data-prev-step={2}
                        onClick={() => goToStep(2)}
                      >
                        <i className="isax isax-arrow-left-2 me-1" />
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-next-step"
                        data-next-step={4}
                        onClick={() => goToStep(4)}
                      >
                        Next: Review &amp; Book{" "}
                        <i className="isax isax-arrow-right-3 ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ============================================== */}
              {/* STEP 5: Review & Confirmation Pane */}
              {/* ============================================== */}
              <div className={`package-step-pane${step === 4 ? "" : " d-none"}`}>
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="fs-16 mb-0">
                      Step 5: Review Your Custom Itinerary
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                      <i className="isax isax-tick-circle fs-20 text-success" />
                      <span className="fs-14">
                        Your tailor-made itinerary for{" "}
                        <strong>
                          Barcelona &amp; Catalonia (May 20–25, 2026)
                        </strong>{" "}
                        is ready for reservation!
                      </span>
                    </div>
                    <h6 className="fs-15 fw-semibold mb-3">
                      Day-by-Day Summary Preview
                    </h6>
                    <div className="border rounded p-3 mb-3">
                      <span className="badge bg-primary text-white fs-11 mb-2">
                        Day 1 · May 20
                      </span>
                      <h6 className="fs-14 mb-1">
                        Arrival at Barcelona El Prat &amp; Private Hotel
                        Transfer
                      </h6>
                      <p className="fs-12 text-gray-6 mb-0">
                        Meet your driver at Terminal 1, transfer to Hotel
                        Miravent Barcelona, check-in to Suite Room 402, welcome
                        tapas drink.
                      </p>
                    </div>
                    <div className="border rounded p-3 mb-3">
                      <span className="badge bg-primary text-white fs-11 mb-2">
                        Day 2 · May 21
                      </span>
                      <h6 className="fs-14 mb-1">
                        Sagrada Família VIP Access &amp; Gothic Quarter
                        Exploration
                      </h6>
                      <p className="fs-12 text-gray-6 mb-0">
                        Skip-the-line entrance with Passion Tower elevator
                        access followed by independent afternoon stroll through
                        El Born.
                      </p>
                    </div>
                    <div className="border rounded p-3 mb-3">
                      <span className="badge bg-primary text-white fs-11 mb-2">
                        Day 3 · May 22
                      </span>
                      <h6 className="fs-14 mb-1">
                        Mediterranean Scuba Diving Experience
                      </h6>
                      <p className="fs-12 text-gray-6 mb-0">
                        Morning immersion with PADI instructor exploring
                        Catalonia marine reserves and coral reef formations.
                      </p>
                    </div>
                    <div className="border rounded p-3 mb-3">
                      <span className="badge bg-primary text-white fs-11 mb-2">
                        Day 4 · May 23
                      </span>
                      <h6 className="fs-14 mb-1">
                        Leisure Day &amp; Shopping / Optional Montserrat
                        Excursion
                      </h6>
                      <p className="fs-12 text-gray-6 mb-0">
                        Free day for Passeig de Gràcia designer shopping,
                        Barceloneta beach dining, and sunset rooftop drinks.
                      </p>
                    </div>
                    <div className="border rounded p-3 mb-4">
                      <span className="badge bg-primary text-white fs-11 mb-2">
                        Day 5 · May 25
                      </span>
                      <h6 className="fs-14 mb-1">
                        Checkout &amp; Return Flight Departure
                      </h6>
                      <p className="fs-12 text-gray-6 mb-0">
                        Breakfast at Hotel Miravent, private airport transfer to
                        BCN Terminal 1 for outbound Delta flight.
                      </p>
                    </div>
                    <h6 className="fs-15 fw-semibold mb-3">
                      Lead Traveler Details
                    </h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fs-13 text-gray-6 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Jeffrey Wilson"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fs-13 text-gray-6 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue="jeffrey.wilson@example.com"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fs-13 text-gray-6 mb-1">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="+1 (555) 392-1049"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fs-13 text-gray-6 mb-1">
                          Special Requests
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Dietary preferences, anniversary setup"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-prev-step"
                        data-prev-step={3}
                        onClick={() => goToStep(3)}
                      >
                        <i className="isax isax-arrow-left-2 me-1" />
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        data-bs-toggle="modal"
                        data-bs-target="#package-success-modal"
                      >
                        <i className="isax isax-tick-circle me-1" />
                        Confirm &amp; Reserve Package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Left Multi-Step Panes Column */}
            {/* Right Sticky Price Summary Column */}
            <div className="col-lg-4 theiaStickySidebar">
              <div className="builder-summary-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <h5 className="fs-16 mb-0">Live Package Summary</h5>
                  <span className="badge bg-primary-transparent text-primary fs-11">
                    Custom Trip
                  </span>
                </div>
                <div className="mb-3">
                  <span className="fs-12 text-gray-5 d-block">
                    Destination &amp; Timing:
                  </span>
                  <h6 className="fs-14 mb-0 text-dark">
                    Barcelona, Spain (5 Nights)
                  </h6>
                  <span className="fs-12 text-gray-6">
                    20 May 2026 – 25 May 2026 · 2 Adults
                  </span>
                </div>
                <hr className="my-2" />
                {/* Dynamic List of Components */}
                <div className="mb-3" id="pkg-summary-items">
                  <div className="package-item-row">
                    <span className="fs-14">
                      Base Destination &amp; Transfers
                    </span>
                    <span className="fs-14 fw-medium" id="pkg-base-price">
                      ${BASE_PRICE.toLocaleString()}
                    </span>
                  </div>
                  {selectedItems.map((item) => (
                    <div className="package-item-row" key={item.name}>
                      <span className="fs-14 text-truncate pe-2">
                        {item.name}
                      </span>
                      <span className="fs-14 fw-medium text-nowrap">
                        +${item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between mb-2">
                  <span className="fs-13 text-gray-6">Add-ons Subtotal:</span>
                  <span
                    className="fs-13 fw-semibold text-dark"
                    id="pkg-addons-price"
                  >
                    ${addonsTotal.toLocaleString()}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="fs-13 text-gray-6">
                    Taxes, VAT &amp; City Fees:
                  </span>
                  <span className="fs-13 fw-medium text-dark">$95.00</span>
                </div>
                <div className="p-3 bg-light rounded mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fs-12 text-gray-6 d-block">
                        Total Estimated Price:
                      </span>
                      <h3
                        className="text-primary fw-bold mb-0"
                        id="pkg-total-price"
                      >
                        ${(BASE_PRICE + addonsTotal).toLocaleString()}
                      </h3>
                    </div>
                    <span className="badge bg-success text-white fs-11">
                      Best Value
                    </span>
                  </div>
                </div>
                <ul className="list-unstyled fs-12 text-gray-6 mb-4">
                  <li className="mb-1">
                    <i className="isax isax-tick-circle text-success me-1" />
                    Free cancellation up to 7 days before
                  </li>
                  <li className="mb-1">
                    <i className="isax isax-tick-circle text-success me-1" />
                    Instant travel voucher issuance
                  </li>
                  <li>
                    <i className="isax isax-tick-circle text-success me-1" />
                    24/7 multilingual trip concierge
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mb-2 btn-print-voucher"
                  onClick={() => window.print()}
                >
                  <i className="isax isax-printer me-1" />
                  Print Quote Itinerary
                </button>
                <Link
                  href={routes.tourGrid}
                  className="btn btn-light text-gray-6 w-100 text-center"
                >
                  Cancel Builder
                </Link>
              </div>
            </div>
            {/* /Right Sticky Price Summary Column */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <CustomPackageBuilderModal />
    </>
  );
};

export default CustomPackageBuilder;
