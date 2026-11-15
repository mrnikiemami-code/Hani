"use client";
import { Fragment, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";

type StepStatus = "done" | "current" | "upcoming";
type CabinNote = "A" | "C" | "O";

interface BookingStep {
  label: string;
  status: StepStatus;
}

interface CabinCategory {
  id: string;
  name: string;
  icon: string;
  avatarClass: string;
  size: string;
  view: string;
  features: string[];
  image: string;
  pricePerPerson: number;
  availability?: string;
}

interface Cabin {
  number: string;
  booked?: boolean;
  note?: CabinNote;
}

interface Deck {
  id: string;
  number: number;
  name: string;
  description: string;
  portCabins: Cabin[];
  starboardCabins: Cabin[];
}

interface LegendItem {
  label: string;
  boxStyle?: CSSProperties;
  note?: CabinNote;
}

interface DeckBadge {
  label: string;
  className: string;
}

interface DeckLevel {
  number: number;
  name: string;
  badges: DeckBadge[];
  note?: string;
}

interface InfoItem {
  icon: string;
  text: string;
}

const sailingNights = 6;
const guestCount = 2;
const portCharges = 148;
const defaultCategoryId = "balcony";
const defaultCabin = "8012";
const defaultDeckId = "deck-8";

const cabinNoteTitles: Record<CabinNote, string> = {
  A: "Accessible cabin",
  C: "Connecting cabin",
  O: "Obstructed view",
};

const bookingSteps: BookingStep[] = [
  { label: "Sailing chosen", status: "done" },
  { label: "Cabin & deck", status: "current" },
  { label: "Guests & dining", status: "upcoming" },
  { label: "Deposit", status: "upcoming" },
];

const guestOptions = ["2 adults", "1 adult", "2 adults, 1 child", "4 adults"];

const diningOptions = ["Early · 18:00", "Late · 20:30", "Flexible"];

const sortOptions = ["Price, lowest first", "Cabin size", "Deck, highest first"];

const cabinCategories: CabinCategory[] = [
  {
    id: "interior",
    name: "Interior",
    icon: "isax-moon",
    avatarClass: "bg-dark-transparent text-dark",
    size: "16 m²",
    view: "No window",
    features: ["Twin beds convertible to queen", "Interactive TV", "Nightly turndown"],
    image: "assets/img/hotels/hotel-gallery-01.jpg",
    pricePerPerson: 595,
  },
  {
    id: "ocean-view",
    name: "Ocean View",
    icon: "isax-eye",
    avatarClass: "bg-info-transparent text-info",
    size: "19 m²",
    view: "Picture window",
    features: ["Picture window", "Sitting area", "Nightly turndown"],
    image: "assets/img/hotels/hotel-gallery-02.jpg",
    pricePerPerson: 745,
  },
  {
    id: "balcony",
    name: "Balcony",
    icon: "isax-sun-fog",
    avatarClass: "bg-teal-transparent text-teal",
    size: "24 m²",
    view: "Private balcony",
    features: ["Private balcony", "Sitting area", "Priority embarkation"],
    image: "assets/img/hotels/hotel-gallery-03.jpg",
    pricePerPerson: 960,
    availability: "Only 4 left",
  },
  {
    id: "suite",
    name: "Suite",
    icon: "isax-crown-1",
    avatarClass: "bg-secondary-transparent text-secondary",
    size: "46 m²",
    view: "Wraparound balcony",
    features: [
      "Wraparound balcony",
      "Butler service",
      "Speciality dining included",
      "Priority tender access",
    ],
    image: "assets/img/hotels/hotel-gallery-04.jpg",
    pricePerPerson: 1620,
    availability: "Only 2 left",
  },
];

const decks: Deck[] = [
  {
    id: "deck-9",
    number: 9,
    name: "Riviera",
    description: "Deck 9, Riviera. Forward of the atrium, quietest deck",
    portCabins: [
      { number: "9002" },
      { number: "9004", booked: true },
      { number: "9006", note: "C" },
      { number: "9008", note: "C" },
      { number: "9010", booked: true },
      { number: "9012" },
      { number: "9014", note: "A" },
      { number: "9016", booked: true },
      { number: "9018" },
      { number: "9020" },
    ],
    starboardCabins: [
      { number: "9001", booked: true },
      { number: "9003" },
      { number: "9005" },
      { number: "9007", booked: true },
      { number: "9009", note: "O" },
      { number: "9011" },
      { number: "9013", booked: true },
      { number: "9015" },
      { number: "9017", note: "C" },
      { number: "9019", note: "C" },
    ],
  },
  {
    id: "deck-8",
    number: 8,
    name: "Marina",
    description: "Deck 8, Marina. Midship — least motion felt",
    portCabins: [
      { number: "8002", booked: true },
      { number: "8004" },
      { number: "8006" },
      { number: "8008", note: "A" },
      { number: "8010" },
      { number: "8012" },
      { number: "8014", booked: true },
      { number: "8016", note: "C" },
      { number: "8018", note: "C" },
      { number: "8020" },
    ],
    starboardCabins: [
      { number: "8001" },
      { number: "8003", booked: true },
      { number: "8005" },
      { number: "8007" },
      { number: "8009", booked: true },
      { number: "8011" },
      { number: "8013" },
      { number: "8015" },
      { number: "8017", booked: true },
      { number: "8019" },
    ],
  },
  {
    id: "deck-7",
    number: 7,
    name: "Promenade",
    description: "Deck 7, Promenade. Above the theatre — some evening noise",
    portCabins: [
      { number: "7002", note: "O" },
      { number: "7004", note: "O" },
      { number: "7006", booked: true },
      { number: "7008" },
      { number: "7010" },
      { number: "7012", booked: true },
      { number: "7014" },
      { number: "7016" },
      { number: "7018", booked: true },
      { number: "7020" },
    ],
    starboardCabins: [
      { number: "7001" },
      { number: "7003" },
      { number: "7005" },
      { number: "7007", booked: true },
      { number: "7009" },
      { number: "7011", note: "A" },
      { number: "7013" },
      { number: "7015", booked: true },
      { number: "7017" },
      { number: "7019" },
    ],
  },
];

const cabinLegend: LegendItem[] = [
  { label: "Available" },
  { label: "Selected", boxStyle: { background: "#CF3425", borderColor: "#CF3425" } },
  { label: "Taken", boxStyle: { background: "#EEF2F6", borderColor: "#EEF2F6" } },
  { label: "Accessible", note: "A" },
  { label: "Connecting", note: "C" },
  { label: "Obstructed view", note: "O" },
];

const deckLevels: DeckLevel[] = [
  {
    number: 11,
    name: "Sun Deck",
    badges: [
      { label: "Pool", className: "bg-light text-gray-9" },
      { label: "Sports court", className: "bg-light text-gray-9" },
      { label: "Spa", className: "bg-light text-gray-9" },
    ],
  },
  {
    number: 10,
    name: "Panorama",
    badges: [{ label: "Suite · 2 available", className: "bg-secondary-transparent text-secondary" }],
  },
  {
    number: 9,
    name: "Riviera",
    badges: [
      { label: "Balcony · 2 available", className: "bg-teal-transparent text-teal" },
      { label: "Suite · sold out", className: "bg-light text-gray-6" },
    ],
  },
  {
    number: 8,
    name: "Marina",
    badges: [{ label: "Balcony · 2 available", className: "bg-teal-transparent text-teal" }],
  },
  {
    number: 7,
    name: "Promenade",
    badges: [
      { label: "Ocean View · 4 available", className: "bg-info-transparent text-info" },
      { label: "Balcony · sold out", className: "bg-light text-gray-6" },
    ],
  },
  {
    number: 6,
    name: "Atlantic",
    badges: [{ label: "Ocean View · 5 available", className: "bg-info-transparent text-info" }],
  },
  {
    number: 5,
    name: "Coral",
    badges: [
      { label: "Interior · 8 available", className: "bg-dark-transparent text-dark" },
      { label: "Ocean View · sold out", className: "bg-light text-gray-6" },
    ],
  },
  {
    number: 4,
    name: "Lagoon",
    badges: [{ label: "Interior · 6 available", className: "bg-dark-transparent text-dark" }],
  },
  {
    number: 3,
    name: "Crew & galley",
    badges: [],
    note: "Crew only — no guest cabins",
  },
];

const includedItems: InfoItem[] = [
  { icon: "isax-tick-circle text-success", text: "Main dining room and buffet, all meals" },
  { icon: "isax-tick-circle text-success", text: "Entertainment, pools and the sports deck" },
  { icon: "isax-tick-circle text-success", text: "Port charges and government taxes" },
  {
    icon: "isax-close-circle text-danger",
    text: "Shore excursions, drinks packages and gratuities are extra",
  },
];

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

/* Describes where a cabin sits, e.g. "Deck 8 Marina · midship, port side" */
const getCabinLocation = (cabinNumber: string) => {
  for (const deck of decks) {
    const isPort = deck.portCabins.some((cabin) => cabin.number === cabinNumber);
    const row = isPort ? deck.portCabins : deck.starboardCabins;
    const index = row.findIndex((cabin) => cabin.number === cabinNumber);
    if (index === -1) continue;
    const position = index < 3 ? "aft" : index > row.length - 4 ? "forward" : "midship";
    return `Deck ${deck.number} ${deck.name} · ${position}, ${isPort ? "port" : "starboard"} side`;
  }
  return "";
};

const CruiseCabinSelection = () => {
  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Home",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Cruise",
      active: false,
    },
    {
      label: "Select Your Cabin",
      active: true,
    },
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(defaultCategoryId);
  const [selectedCabin, setSelectedCabin] = useState<string>(defaultCabin);

  const selectedCategory =
    cabinCategories.find((category) => category.id === selectedCategoryId) ??
    cabinCategories[0];
  const cruiseTotal = selectedCategory.pricePerPerson * guestCount + portCharges;

  const deckPlanRef = useRef<HTMLDivElement>(null);
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    deckPlanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderCabin = (cabin: Cabin) => {
    if (cabin.booked) {
      return (
        <span
          key={cabin.number}
          className="cabin is-booked"
          role="img"
          aria-label={`Cabin ${cabin.number}, unavailable`}
        >
          {cabin.number}
        </span>
      );
    }

    const inputId = `cabin-${cabin.number}`;
    const noteTitle = cabin.note ? cabinNoteTitles[cabin.note] : undefined;
    return (
      <Fragment key={cabin.number}>
        <input
          className="cabin-input"
          type="radio"
          name="cabin"
          id={inputId}
          value={cabin.number}
          checked={selectedCabin === cabin.number}
          onChange={() => setSelectedCabin(cabin.number)}
        />
        <label
          className="cabin"
          htmlFor={inputId}
          title={noteTitle ? `Cabin ${cabin.number}, ${noteTitle}` : `Cabin ${cabin.number}`}
        >
          {cabin.number}
          {cabin.note && (
            <span className="cabin-note" title={noteTitle}>
              {cabin.note}
            </span>
          )}
        </label>
      </Fragment>
    );
  };

  return (
    <>
      <Breadcrumb
        title="Select Your Cabin"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-07"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <Link
            href={routes.cruiseDetails}
            className="fs-14 fw-medium d-inline-flex align-items-center gap-1 mb-4"
          >
            <i className="isax isax-arrow-left4 fw-semibold" />
            Back to Cruise Details
          </Link>
          {/* Steps */}
          <div className="card mb-4">
            <div className="card-body py-3">
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                {bookingSteps.map((step, index) => (
                  <Fragment key={step.label}>
                    {index > 0 && (
                      <span className="d-none d-lg-block flex-fill border-top mx-3" />
                    )}
                    <div className="d-flex align-items-center gap-2">
                      {step.status === "done" && (
                        <span className="avatar avatar-sm rounded-circle bg-success text-white flex-shrink-0">
                          <i className="isax isax-tick-circle5" />
                        </span>
                      )}
                      {step.status === "current" && (
                        <span className="avatar avatar-sm rounded-circle bg-primary text-white flex-shrink-0">
                          {index + 1}
                        </span>
                      )}
                      {step.status === "upcoming" && (
                        <span className="avatar avatar-sm rounded-circle bg-light text-gray-6 flex-shrink-0">
                          {index + 1}
                        </span>
                      )}
                      <span
                        className={
                          step.status === "upcoming"
                            ? "fs-14 text-gray-6"
                            : "fs-14 fw-medium text-dark"
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          {/* Sailing summary */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center row-gap-3">
                <div className="col-lg-6">
                  <h2 className="fs-18 mb-1">Coral Cruiser &mdash; Western Mediterranean</h2>
                  <p className="fs-13 text-gray-6 mb-0">
                    Round trip from Barcelona &middot; {sailingNights} nights &middot; 15
                    &ndash; 21 May 2025 &middot; 4 ports
                  </p>
                </div>
                <div className="col-lg-3 col-6">
                  <label className="form-label" htmlFor="cc-guests">
                    Guests
                  </label>
                  <select className="form-control" id="cc-guests" name="cc-guests">
                    {guestOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-3 col-6">
                  <label className="form-label" htmlFor="cc-dining">
                    Dining seating
                  </label>
                  <select className="form-control" id="cc-dining" name="cc-dining">
                    {diningOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* start row */}
          <div className="row">
            <div className="col-lg-8">
              {/* Stage 1 */}
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
                <div>
                  <h2 className="fs-18 mb-0">1. Choose a cabin category</h2>
                  <p className="fs-13 text-gray-6 mb-0">
                    Fares are per person, based on two guests sharing.
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0 fs-13 text-gray-6" htmlFor="cc-sort">
                    Sort by
                  </label>
                  <select
                    className="form-control form-control-sm w-auto"
                    id="cc-sort"
                    name="cc-sort"
                  >
                    {sortOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              {cabinCategories.map((category) => {
                const isSelected = category.id === selectedCategoryId;
                return (
                  <div
                    className={`card cabin-cat${isSelected ? " is-selected" : ""}`}
                    key={category.id}
                  >
                    <div className="card-body">
                      <div className="row row-gap-3 align-items-center">
                        <div className="col-lg-5">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span
                              className={`avatar avatar-md rounded-circle ${category.avatarClass} flex-shrink-0`}
                            >
                              <i className={`isax ${category.icon}`} />
                            </span>
                            <h3 className="fs-16 mb-0">
                              {category.name}
                              {isSelected && (
                                <span className="badge bg-primary fs-12 ms-2">Selected</span>
                              )}
                              {category.availability && (
                                <span className="badge bg-danger-transparent text-danger fs-12 ms-2">
                                  {category.availability}
                                </span>
                              )}
                            </h3>
                          </div>
                          <div className="d-flex align-items-center flex-wrap gap-3 mb-2">
                            <span className="fs-13 text-gray-6">
                              <i className="isax isax-maximize-3 me-1" />
                              {category.size}
                            </span>
                            <span className="fs-13 text-gray-6">
                              <i className="isax isax-eye me-1" />
                              {category.view}
                            </span>
                          </div>
                          <ul className="list-unstyled mb-0">
                            {category.features.map((feature) => (
                              <li className="fs-13 text-gray-6 mb-1" key={feature}>
                                <i className="isax isax-tick-circle text-success me-1" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-lg-4">
                          <ImageWithBasePath
                            src={category.image}
                            className="img-fluid rounded w-100"
                            alt={`${category.name} cabin interior`}
                            style={{ height: "130px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-lg-3 text-lg-end">
                          <p className="fs-20 fw-semibold text-dark mb-0">
                            {formatPrice(category.pricePerPerson)}
                          </p>
                          <p className="fs-13 text-gray-6 mb-0">per person</p>
                          <p className="fs-13 text-gray-6 mb-1">
                            {formatPrice(Math.round(category.pricePerPerson / sailingNights))} per
                            night
                          </p>
                          <p className="fs-13 text-gray-6 mb-3">
                            {formatPrice(category.pricePerPerson * guestCount)} for {guestCount}{" "}
                            guests
                          </p>
                          <Link
                            href="#deckPlan"
                            className={`btn ${isSelected ? "btn-primary" : "btn-light"} btn-sm w-100`}
                            onClick={() => handleCategorySelect(category.id)}
                          >
                            {isSelected ? "Change deck" : "Select cabin"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Stage 2 */}
              <div className="card" id="deckPlan" ref={deckPlanRef}>
                <div className="card-header">
                  <h2 className="fs-18 mb-1">2. Pick your stateroom</h2>
                  <p className="fs-13 text-gray-6 mb-0">
                    Balcony cabins sit on decks 7 to 9. Position matters &mdash; midship
                    cabins feel the least motion.
                  </p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-pills gap-2 mb-3" role="tablist">
                    {decks.map((deck) => {
                      const isActive = deck.id === defaultDeckId;
                      return (
                        <li className="nav-item" role="presentation" key={deck.id}>
                          <button
                            className={`nav-link${isActive ? " active" : ""}`}
                            data-bs-toggle="pill"
                            data-bs-target={`#${deck.id}`}
                            type="button"
                            role="tab"
                            aria-controls={deck.id}
                            aria-selected={isActive ? "true" : "false"}
                          >
                            Deck {deck.number} &middot; {deck.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
                    {cabinLegend.map((item) => (
                      <span className="legend-key" key={item.label}>
                        {item.note ? (
                          <>
                            <strong className="text-teal">{item.note}</strong> {item.label}
                          </>
                        ) : (
                          <>
                            <span className="legend-box" style={item.boxStyle} />
                            {item.label}
                          </>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="tab-content">
                    {decks.map((deck) => (
                      <div
                        className={`tab-pane fade${deck.id === defaultDeckId ? " show active" : ""}`}
                        id={deck.id}
                        role="tabpanel"
                        key={deck.id}
                      >
                        <p className="fs-13 text-gray-6 mb-3">
                          <i className="isax isax-info-circle me-1" />
                          {deck.description}
                        </p>
                        <div className="deck-plan">
                          <p className="deck-side">Port side</p>
                          <div className="cabin-row">
                            {deck.portCabins.map((cabin) => renderCabin(cabin))}
                          </div>
                          <p className="deck-corridor">
                            Corridor &mdash; forward <i className="isax isax-arrow-right-3" />
                          </p>
                          <div className="cabin-row">
                            {deck.starboardCabins.map((cabin) => renderCabin(cabin))}
                          </div>
                          <p className="deck-side">Starboard side</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4 theiaStickySidebar">
              {/* Selection */}
              <div className="card">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Your cabin</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="avatar avatar-lg rounded flex-shrink-0">
                      <ImageWithBasePath
                        src={selectedCategory.image}
                        className="rounded"
                        alt={`${selectedCategory.name} cabin interior`}
                      />
                    </span>
                    <div>
                      <p className="fs-14 fw-medium text-dark mb-0">
                        {selectedCategory.name} &middot; Cabin {selectedCabin}
                      </p>
                      <p className="fs-13 text-gray-6 mb-0">{getCabinLocation(selectedCabin)}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-14">Fare, per person</span>
                    <span className="fs-14 fw-medium text-dark">
                      {formatPrice(selectedCategory.pricePerPerson)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-14">Guests</span>
                    <span className="fs-14 fw-medium text-dark">{guestCount} adults</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-14">Port charges &amp; taxes</span>
                    <span className="fs-14 fw-medium text-dark">{formatPrice(portCharges)}</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-3 mt-3">
                    <span className="fs-16 fw-semibold text-dark">Cruise total</span>
                    <span className="fs-20 fw-semibold text-primary">
                      {formatPrice(cruiseTotal)}
                    </span>
                  </div>
                  <div className="alert alert-warning d-flex gap-2 mt-3 mb-3">
                    <i className="isax isax-info-circle flex-shrink-0 mt-1" />
                    <span className="fs-13">
                      Hold this cabin with a <strong>$452 deposit</strong>. The balance is due
                      14 Feb 2025.
                    </span>
                  </div>
                  <Link href={routes.cruiseBooking} className="btn btn-primary w-100">
                    Continue to guest details
                  </Link>
                </div>
              </div>
              {/* Deck plan */}
              <div className="card">
                <div className="card-header">
                  <h3 className="fs-16 mb-0">Deck plan</h3>
                </div>
                <div className="card-body">
                  {deckLevels.map((level, index) => (
                    <div
                      className={`d-flex align-items-center gap-3${index > 0 ? " border-top pt-3 mt-3" : ""}`}
                      key={level.number}
                    >
                      <span className="avatar avatar-md rounded bg-light text-gray-9 flex-shrink-0 fw-semibold">
                        {level.number}
                      </span>
                      <div>
                        <p className="fs-14 fw-medium text-dark mb-1">{level.name}</p>
                        <div>
                          {level.note ? (
                            <span className="fs-13 text-gray-6">{level.note}</span>
                          ) : (
                            level.badges.map((badge) => (
                              <span
                                className={`badge ${badge.className} fs-12 me-1`}
                                key={badge.label}
                              >
                                {badge.label}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card mb-0">
                <div className="card-header">
                  <h4 className="fs-16 mb-0">Included in every cabin</h4>
                </div>
                <div className="card-body">
                  {includedItems.map((item, index) => (
                    <div
                      className={`d-flex gap-2 ${index === includedItems.length - 1 ? "mb-0" : "mb-2"}`}
                      key={item.text}
                    >
                      <i className={`isax ${item.icon} flex-shrink-0 mt-1`} />
                      <span className="fs-13">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default CruiseCabinSelection;
