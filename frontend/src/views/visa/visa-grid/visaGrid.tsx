"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";
import VisaSearch from "../visaSearch";
import VisaFilter from "../visaFilter";
import { useState } from "react";


const VisaGrid = () => {
  const routes = all_routes;
  const [fav, setFav] = useState<boolean[]>([]);
  const handleFav = (i: number) => {
    setFav((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    })
  }

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Visa",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Visa",
      active: true,
    },
    {
      label: "Visa Grid",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Visa"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-08"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          {/* Tour Search */}
          <VisaSearch />
          {/* /Tour Search */}
          <div className="row">
            {/* Sidebar */}
            <VisaFilter />
            {/* /Sidebar */}
            <div className="col-xl-9 col-lg-8 theiaStickySidebar">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center mb-3">
                  <h6 className="me-1">689 Visa</h6>
                  <p> Found on Your Search</p>
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  <div className="list-item d-flex align-items-center mb-3">
                    <Link href={routes.visaGrid} className="list-icon active me-2">
                      <i className="isax isax-grid-1" />
                    </Link>
                    <Link href={routes.visaList} className="list-icon me-2">
                      <i className="isax isax-firstline" />
                    </Link>
                  </div>
                  <div className="dropdown mb-3">
                    <Link
                      href="#"
                      className="dropdown-toggle py-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="fw-medium text-gray-9">Sort By : </span>
                      Recommended
                    </Link>
                    <div className="dropdown-menu dropdown-sm">
                      <form>
                        <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend1"
                          >
                            Recommended
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend2"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend2"
                          >
                            Price: low to high
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend3"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend3"
                          >
                            Price: high to low
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend4"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend4"
                          >
                            Newest
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend5"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend5"
                          >
                            Ratings
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend6"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend6"
                          >
                            Reviews
                          </label>
                        </div>
                        <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                          <Link href="#" className="btn btn-light btn-sm me-2">
                            Reset
                          </Link>
                          <button type="submit" className="btn btn-primary btn-sm">
                            Apply
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-01.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[1] ? '' : 'selected'}`} onClick={() => handleFav(1)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Business Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">5-7 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Electronic Visa for Tourism and Recreation
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 90 Days
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $500
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            USA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-02.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[2] ? 'selected' : ''}`} onClick={() => handleFav(2)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Student Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">2-4 Weeks</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Long term for Academic with Health Insurance
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Consular Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $300
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Egypt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-03.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[3] ? 'selected' : ''}`} onClick={() => handleFav(3)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Work Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">15-20 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Work Visa for Employment Opportunities
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Paper
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 2 Years
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $800
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Spain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-04.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[4] ? 'selected' : ''}`} onClick={() => handleFav(4)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Transit Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3-5 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Short term Visa for Travelers with Layovers
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 72 Hours
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $100
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Qatar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-05.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[5] ? '' : 'selected'}`} onClick={() => handleFav(5)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Family Reunion Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">8-12 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Family Members to Join Relatives
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Paper
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $600
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Spain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-06.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[6] ? 'selected' : ''}`} onClick={() => handleFav(6)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Cultural Exchange Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">10-15 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Cultural Programs and Exchanges
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 6 Months
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $400
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            USA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-07.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[7] ? 'selected' : ''}`} onClick={() => handleFav(7)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Research Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">4-6 Weeks</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Grown up E-visa with Cooling and Assurance.
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : e-Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $900
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Qatar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-08.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[8] ? 'selected' : ''}`} onClick={() => handleFav(8)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Volunteer Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">6-8 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Voluntary Work with Medical Coverage Included
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Sticker Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 6 Months
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $350
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Spain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-09.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[9] ? 'selected' : ''}`} onClick={() => handleFav(9)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Skilled Worker Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">10-14 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Skilled Workers with Comprehensive Insurance
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Embassy Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 3 Years
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $1200
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Australia
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-10.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[10] ? 'selected' : ''}`} onClick={() => handleFav(10)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Research Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">15-20 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Work Visa for Employment Opportunities
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 2 Years
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $800
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Turkey
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-11.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[9] ? 'selected' : ''}`} onClick={() => handleFav(9)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Tourist Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">5-7 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Electronic Visa for Tourism and Recreation
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 90 Days
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $700
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Egypt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-4 col-md-6 d-flex">
                  <div className="place-item mb-4 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-12.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[10] ? 'selected' : ''}`} onClick={() => handleFav(10)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Business Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">2-4 Weeks</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={routes.visaDetails}>
                          Long-term for Academic with Health Insurance
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Paper
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $300
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            USA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
              </div>
              {/* Pagination */}
              <nav className="pagination-nav">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">
                        <i className="fa-solid fa-chevron-left" />
                      </span>
                    </Link>
                  </li>
                  <li className="page-item">
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
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* /Pagination */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

    </>
  )
}

export default VisaGrid