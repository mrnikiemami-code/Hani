"use client";
import Link from "next/link";
import CustomSelect from "../../../components/common-select/commonSelect";
import { GuideLanguageOptions, GuideSortOptions } from "../../../core/data/mock/selectOption";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";

const GuideList = () => {
  const routes = all_routes;

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
      to: routes.guideGrid,
      active: false,
    },
    {
      label: "Guide List",
      active: true,
    },
  ];
  return (
    <>
  <Breadcrumb
        title="Certified Tour Guides"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-09"
      />
  {/* Page Content */}
  <div className="content">
    <div className="container">
      {/* Quick Search Bar Banner */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row g-3 align-items-center">
              <div className="col-lg-4 col-md-6">
                <div className="input-icon">
                  <span className="input-icon-addon">
                    <i className="isax isax-location" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Where do you need a guide? (City, Country)"
                    defaultValue="Barcelona, Spain"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <CustomSelect
                  options={GuideLanguageOptions}
                  className="select"
                  defaultValue={GuideLanguageOptions[1]}
                />
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="input-icon-end position-relative">
                  <DatePicker
                    className="form-control datetimepicker"
                    placeholder="Select Tour Date"
                    defaultValue={new Date("2026-05-25")}
                    format="DD-MM-YYYY"
                  />
                  <span className="input-icon-addon">
                    <i className="isax isax-calendar" />
                  </span>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <button type="submit" className="btn btn-primary w-100">
                  <i className="isax isax-search-normal-1 me-1" />
                  Find Guides
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Main Layout */}
      <div className="row">
        {/* Left Filter Sidebar */}
        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
          <div className="card filter-sidebar mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="fs-16 mb-0">Filters</h5>
              <Link href={routes.guideList} className="fs-13 text-primary">
                Reset All
              </Link>
            </div>
            <div className="card-body p-0">
              {/* Filter Search */}
              <div className="p-3 border-bottom">
                <label className="form-label fs-14 fw-medium mb-1">
                  Guide Name or Keyword
                </label>
                <div className="input-icon">
                  <span className="input-icon-addon">
                    <i className="isax isax-search-normal" />
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Mateo, Historical..."
                  />
                </div>
              </div>
              {/* Accordion Filters */}
              <div
                className="accordion accordion-list"
                id="guide-filters-accordion"
              >
                {/* Specializations */}
                <div className="accordion-item border-bottom p-3">
                  <div className="accordion-header">
                    <div
                      className="accordion-button p-0 fs-14 fw-semibold text-dark"
                      data-bs-toggle="collapse"
                      data-bs-target="#filter-specialty"
                      aria-expanded="true"
                    >
                      <i className="isax isax-award text-primary me-2" />
                      Guide Specialty
                    </div>
                  </div>
                  <div
                    id="filter-specialty"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body pt-2 px-0 pb-0">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="spec-1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="spec-1"
                        >
                          Art &amp; History (24)
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="spec-2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="spec-2"
                        >
                          Gastronomy &amp; Wine (18)
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="spec-3"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="spec-3"
                        >
                          Outdoor &amp; Hiking (12)
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="spec-4"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="spec-4"
                        >
                          Architecture &amp; Design (15)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="spec-5"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="spec-5"
                        >
                          Family Friendly (10)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Languages */}
                <div className="accordion-item border-bottom p-3">
                  <div className="accordion-header">
                    <div
                      className="accordion-button p-0 fs-14 fw-semibold text-dark"
                      data-bs-toggle="collapse"
                      data-bs-target="#filter-languages"
                      aria-expanded="true"
                    >
                      <i className="isax isax-translate text-primary me-2" />
                      Spoken Languages
                    </div>
                  </div>
                  <div
                    id="filter-languages"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body pt-2 px-0 pb-0">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="lang-en"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="lang-en"
                        >
                          English (38)
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="lang-es"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="lang-es"
                        >
                          Spanish (29)
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="lang-fr"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="lang-fr"
                        >
                          French (14)
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="lang-it"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="lang-it"
                        >
                          Italian (11)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="lang-de"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="lang-de"
                        >
                          German (8)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hourly Rate Range */}
                <div className="accordion-item border-bottom p-3">
                  <div className="accordion-header">
                    <div
                      className="accordion-button p-0 fs-14 fw-semibold text-dark"
                      data-bs-toggle="collapse"
                      data-bs-target="#filter-pricing"
                      aria-expanded="true"
                    >
                      <i className="isax isax-dollar-circle text-primary me-2" />
                      Hourly Tariff
                    </div>
                  </div>
                  <div
                    id="filter-pricing"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body pt-2 px-0 pb-0">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rate-1"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="rate-1"
                        >
                          Under $30 / hr
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rate-2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="rate-2"
                        >
                          $30 - $60 / hr
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rate-3"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="rate-3"
                        >
                          $60 - $100 / hr
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rate-4"
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="rate-4"
                        >
                          $100+ / hr (Private VIP)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Experience & Rating */}
                <div className="accordion-item p-3">
                  <div className="accordion-header">
                    <div
                      className="accordion-button p-0 fs-14 fw-semibold text-dark"
                      data-bs-toggle="collapse"
                      data-bs-target="#filter-rating"
                      aria-expanded="true"
                    >
                      <i className="isax isax-star text-primary me-2" />
                      Ratings &amp; Trust
                    </div>
                  </div>
                  <div
                    id="filter-rating"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body pt-2 px-0 pb-0">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rate-star-5"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="rate-star-5"
                        >
                          <span className="text-warning">
                            <i className="fa-solid fa-star" /> 4.8 &amp; above
                          </span>{" "}
                          (31)
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rate-verified"
                          defaultChecked
                        />
                        <label
                          className="form-check-label fs-13 text-gray-7"
                          htmlFor="rate-verified"
                        >
                          <i className="isax isax-verify text-success me-1" />
                          Verified License Only
                        </label>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm w-100"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Left Filter Sidebar */}
        {/* Right Listings Column */}
        <div className="col-xl-9 col-lg-8">
          {/* Toolbar */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4 p-3 bg-white rounded border">
            <span className="fs-14 text-gray-6">
              Showing <strong className="text-dark">1–6</strong> of{" "}
              <strong>38</strong> Certified Guides in Barcelona
            </span>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-1">
                <span className="fs-13 text-gray-6 d-none d-sm-inline">
                  Sort by:
                </span>
                <CustomSelect
                  options={GuideSortOptions}
                  className="select"
                  defaultValue={GuideSortOptions[0]}
                />
              </div>
              <div className="btn-group btn-group-sm">
                <Link
                  href={routes.guideGrid}
                  className="btn btn-outline-secondary"
                  title="Grid View"
                >
                  <i className="ti ti-layout-grid" />
                </Link>
                <Link
                  href={routes.guideList}
                  className="btn btn-primary active"
                  title="List View"
                >
                  <i className="ti ti-layout-list" />
                </Link>
              </div>
            </div>
          </div>
          {/* Guide Item 1 */}
          <div className="guide-list-item">
            <div className="row g-0">
              <div className="col-md-4 col-sm-5">
                <div className="guide-list-img-wrap">
                  <Link href={routes.guideDetails}>
                    <ImageWithBasePath
                      src="assets/img/guide/guide-01.jpg"
                      alt="Micheal John"
                    />
                  </Link>
                  <span className="guide-badge-verified">
                    <i className="isax isax-verify" /> Certified Official
                  </span>
                </div>
              </div>
              <div className="col-md-8 col-sm-7">
                <div className="p-3 p-xl-4 d-flex flex-column h-100 justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="fs-18 mb-1">
                          <Link href={routes.guideDetails} className="text-dark">
                            Micheal John
                          </Link>
                        </h4>
                        <p className="fs-13 text-gray-6 mb-0">
                          <i className="isax isax-location text-primary me-1" />
                          Barcelona &amp; Girona, Spain · 9 Years Experience
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded">
                        <i className="fa-solid fa-star text-warning fs-12" />
                        <span className="fs-13 fw-bold text-dark">4.96</span>
                        <span className="fs-12 text-gray-5">(184 reviews)</span>
                      </div>
                    </div>
                    <p className="fs-13 text-gray-6 mb-3">
                      Licensed official tourist guide specializing in Gaudí
                      architecture, Gothic Quarter mysteries, and Catalan
                      history. Former lecturer at University of Barcelona.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> English (Native)
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Spanish (Fluent)
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Catalan
                      </span>
                      <span className="guide-specialty-pill">Architecture</span>
                      <span className="guide-specialty-pill">
                        Gaudí Specialist
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top flex-wrap gap-2">
                    <div>
                      <span className="fs-12 text-gray-5 d-block">
                        Starting from
                      </span>
                      <span className="fs-18 fw-bold text-primary">
                        $45{" "}
                        <small className="fs-12 text-gray-6 fw-normal">
                          / hour
                        </small>
                      </span>
                      <span className="fs-12 text-gray-6 ms-2">
                        · $280 / full day
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <Link
                        href={routes.guideDetails}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={routes.guideBooking}
                        className="btn btn-primary btn-sm"
                      >
                        Book Guide
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Guide Item 2 */}
          <div className="guide-list-item">
            <div className="row g-0">
              <div className="col-md-4 col-sm-5">
                <div className="guide-list-img-wrap">
                  <Link href={routes.guideDetails}>
                    <ImageWithBasePath
                      src="assets/img/guide/guide-02.jpg"
                      alt="Daiyanna Leo"
                    />
                  </Link>
                  <span className="guide-badge-verified">
                    <i className="isax isax-verify" /> Certified Sommelier
                  </span>
                </div>
              </div>
              <div className="col-md-8 col-sm-7">
                <div className="p-3 p-xl-4 d-flex flex-column h-100 justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="fs-18 mb-1">
                          <Link href={routes.guideDetails} className="text-dark">
                            Daiyanna Leo
                          </Link>
                        </h4>
                        <p className="fs-13 text-gray-6 mb-0">
                          <i className="isax isax-location text-primary me-1" />
                          Barcelona &amp; Penedès Wine Region · 7 Years
                          Experience
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded">
                        <i className="fa-solid fa-star text-warning fs-12" />
                        <span className="fs-13 fw-bold text-dark">4.92</span>
                        <span className="fs-12 text-gray-5">(142 reviews)</span>
                      </div>
                    </div>
                    <p className="fs-13 text-gray-6 mb-3">
                      Certified sommelier and culinary anthropologist offering
                      insider tapas crawl adventures, winery excursions, and
                      market tastings across Boqueria and Santa Caterina.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> English
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Spanish
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> French
                      </span>
                      <span className="guide-specialty-pill">Gastronomy</span>
                      <span className="guide-specialty-pill">Wine Tours</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top flex-wrap gap-2">
                    <div>
                      <span className="fs-12 text-gray-5 d-block">
                        Starting from
                      </span>
                      <span className="fs-18 fw-bold text-primary">
                        $50{" "}
                        <small className="fs-12 text-gray-6 fw-normal">
                          / hour
                        </small>
                      </span>
                      <span className="fs-12 text-gray-6 ms-2">
                        · $320 / full day
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <Link
                        href={routes.guideDetails}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={routes.guideBooking}
                        className="btn btn-primary btn-sm"
                      >
                        Book Guide
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Guide Item 3 */}
          <div className="guide-list-item">
            <div className="row g-0">
              <div className="col-md-4 col-sm-5">
                <div className="guide-list-img-wrap">
                  <Link href={routes.guideDetails}>
                    <ImageWithBasePath
                      src="assets/img/guide/guide-03.jpg"
                      alt="David Josebeb"
                    />
                  </Link>
                  <span className="guide-badge-verified">
                    <i className="isax isax-verify" /> Mountain Leader
                  </span>
                </div>
              </div>
              <div className="col-md-8 col-sm-7">
                <div className="p-3 p-xl-4 d-flex flex-column h-100 justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="fs-18 mb-1">
                          <Link href={routes.guideDetails} className="text-dark">
                            David Josebeb
                          </Link>
                        </h4>
                        <p className="fs-13 text-gray-6 mb-0">
                          <i className="isax isax-location text-primary me-1" />
                          Montserrat &amp; Pyrenees, Spain · 11 Years Experience
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded">
                        <i className="fa-solid fa-star text-warning fs-12" />
                        <span className="fs-13 fw-bold text-dark">4.98</span>
                        <span className="fs-12 text-gray-5">(215 reviews)</span>
                      </div>
                    </div>
                    <p className="fs-13 text-gray-6 mb-3">
                      UIMLA certified international mountain leader specializing
                      in Montserrat monastery treks, nature photography, and
                      sunrise hiking trails with scenic views.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> English
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> German
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Spanish
                      </span>
                      <span className="guide-specialty-pill">
                        Hiking &amp; Trekking
                      </span>
                      <span className="guide-specialty-pill">Photography</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top flex-wrap gap-2">
                    <div>
                      <span className="fs-12 text-gray-5 d-block">
                        Starting from
                      </span>
                      <span className="fs-18 fw-bold text-primary">
                        $40{" "}
                        <small className="fs-12 text-gray-6 fw-normal">
                          / hour
                        </small>
                      </span>
                      <span className="fs-12 text-gray-6 ms-2">
                        · $250 / full day
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <Link
                        href={routes.guideDetails}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={routes.guideBooking}
                        className="btn btn-primary btn-sm"
                      >
                        Book Guide
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Guide Item 4 */}
          <div className="guide-list-item">
            <div className="row g-0">
              <div className="col-md-4 col-sm-5">
                <div className="guide-list-img-wrap">
                  <Link href={routes.guideDetails}>
                    <ImageWithBasePath src="assets/img/guide/guide-04.jpg" alt="Campbell" />
                  </Link>
                  <span className="guide-badge-verified">
                    <i className="isax isax-verify" /> Historian
                  </span>
                </div>
              </div>
              <div className="col-md-8 col-sm-7">
                <div className="p-3 p-xl-4 d-flex flex-column h-100 justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="fs-18 mb-1">
                          <Link href={routes.guideDetails} className="text-dark">
                            Campbell Stewart
                          </Link>
                        </h4>
                        <p className="fs-13 text-gray-6 mb-0">
                          <i className="isax isax-location text-primary me-1" />
                          Barcelona &amp; Sitges, Spain · 6 Years Experience
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded">
                        <i className="fa-solid fa-star text-warning fs-12" />
                        <span className="fs-13 fw-bold text-dark">4.89</span>
                        <span className="fs-12 text-gray-5">(96 reviews)</span>
                      </div>
                    </div>
                    <p className="fs-13 text-gray-6 mb-3">
                      Expert in Mediterranean maritime heritage, Picasso's youth
                      in Barcelona, and contemporary street art movements across
                      Poblenou and El Raval.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> English (Native)
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Spanish
                      </span>
                      <span className="guide-specialty-pill">Street Art</span>
                      <span className="guide-specialty-pill">Museums</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top flex-wrap gap-2">
                    <div>
                      <span className="fs-12 text-gray-5 d-block">
                        Starting from
                      </span>
                      <span className="fs-18 fw-bold text-primary">
                        $38{" "}
                        <small className="fs-12 text-gray-6 fw-normal">
                          / hour
                        </small>
                      </span>
                      <span className="fs-12 text-gray-6 ms-2">
                        · $240 / full day
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <Link
                        href={routes.guideDetails}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={routes.guideBooking}
                        className="btn btn-primary btn-sm"
                      >
                        Book Guide
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Guide Item 5 */}
          <div className="guide-list-item">
            <div className="row g-0">
              <div className="col-md-4 col-sm-5">
                <div className="guide-list-img-wrap">
                  <Link href={routes.guideDetails}>
                    <ImageWithBasePath
                      src="assets/img/guide/guide-05.jpg"
                      alt="Ahmed Nijaz"
                    />
                  </Link>
                  <span className="guide-badge-verified">
                    <i className="isax isax-verify" /> Multilingual
                  </span>
                </div>
              </div>
              <div className="col-md-8 col-sm-7">
                <div className="p-3 p-xl-4 d-flex flex-column h-100 justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="fs-18 mb-1">
                          <Link href={routes.guideDetails} className="text-dark">
                            Ahmed Nijaz
                          </Link>
                        </h4>
                        <p className="fs-13 text-gray-6 mb-0">
                          <i className="isax isax-location text-primary me-1" />
                          Barcelona &amp; Costa Brava, Spain · 8 Years
                          Experience
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded">
                        <i className="fa-solid fa-star text-warning fs-12" />
                        <span className="fs-13 fw-bold text-dark">4.94</span>
                        <span className="fs-12 text-gray-5">(130 reviews)</span>
                      </div>
                    </div>
                    <p className="fs-13 text-gray-6 mb-3">
                      Family-friendly private guide with private luxury minivan
                      available for comfortable coastal excursions, medieval
                      village tours, and Dalí museum visits.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> English
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Arabic
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Spanish
                      </span>
                      <span className="guide-specialty-pill">
                        Private Minivan
                      </span>
                      <span className="guide-specialty-pill">Family Tours</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top flex-wrap gap-2">
                    <div>
                      <span className="fs-12 text-gray-5 d-block">
                        Starting from
                      </span>
                      <span className="fs-18 fw-bold text-primary">
                        $55{" "}
                        <small className="fs-12 text-gray-6 fw-normal">
                          / hour
                        </small>
                      </span>
                      <span className="fs-12 text-gray-6 ms-2">
                        · $350 / full day
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <Link
                        href={routes.guideDetails}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={routes.guideBooking}
                        className="btn btn-primary btn-sm"
                      >
                        Book Guide
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Guide Item 6 */}
          <div className="guide-list-item">
            <div className="row g-0">
              <div className="col-md-4 col-sm-5">
                <div className="guide-list-img-wrap">
                  <Link href={routes.guideDetails}>
                    <ImageWithBasePath
                      src="assets/img/guide/guide-06.jpg"
                      alt="Rachel Hosey"
                    />
                  </Link>
                  <span className="guide-badge-verified">
                    <i className="isax isax-verify" /> VIP Host
                  </span>
                </div>
              </div>
              <div className="col-md-8 col-sm-7">
                <div className="p-3 p-xl-4 d-flex flex-column h-100 justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="fs-18 mb-1">
                          <Link href={routes.guideDetails} className="text-dark">
                            Rachel Hosey
                          </Link>
                        </h4>
                        <p className="fs-13 text-gray-6 mb-0">
                          <i className="isax isax-location text-primary me-1" />
                          Barcelona &amp; Tarragona, Spain · 5 Years Experience
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded">
                        <i className="fa-solid fa-star text-warning fs-12" />
                        <span className="fs-13 fw-bold text-dark">4.91</span>
                        <span className="fs-12 text-gray-5">(88 reviews)</span>
                      </div>
                    </div>
                    <p className="fs-13 text-gray-6 mb-3">
                      Passionate Roman history specialist and archeologist.
                      Leads immersive excursions to Roman ruins, Sagrada Família
                      skip-the-line tours, and sunset rooftop walks.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> English
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Italian
                      </span>
                      <span className="guide-lang-tag">
                        <i className="isax isax-translate" /> Spanish
                      </span>
                      <span className="guide-specialty-pill">
                        Roman History
                      </span>
                      <span className="guide-specialty-pill">
                        Skip-the-Line
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top flex-wrap gap-2">
                    <div>
                      <span className="fs-12 text-gray-5 d-block">
                        Starting from
                      </span>
                      <span className="fs-18 fw-bold text-primary">
                        $42{" "}
                        <small className="fs-12 text-gray-6 fw-normal">
                          / hour
                        </small>
                      </span>
                      <span className="fs-12 text-gray-6 ms-2">
                        · $270 / full day
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <Link
                        href={routes.guideDetails}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={routes.guideBooking}
                        className="btn btn-primary btn-sm"
                      >
                        Book Guide
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <nav aria-label="Page navigation" className="pagination-nav mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <Link className="page-link" href="#" tabIndex={-1}>
                  <i className="isax isax-arrow-left-2" />
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" href="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  ...
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  7
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <i className="isax isax-arrow-right-3" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* /Right Listings Column */}
      </div>
    </div>
  </div>
  {/* /Page Content */}
</>

  )
}

export default GuideList