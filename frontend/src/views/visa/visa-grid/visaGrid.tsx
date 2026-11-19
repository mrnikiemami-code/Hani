"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";
import VisaSearch from "../visaSearch";
import VisaFilter from "../visaFilter";
import { useState } from "react";
import type { VisaSearchItem } from "@/features/visa/domain/visa-search";
import { formatMoney } from "@/lib/hani/money";
import { useTranslations } from "next-intl";


const VisaGrid = ({
  visas = [],
  locale,
}: {
  visas?: VisaSearchItem[];
  locale?: string;
}) => {
  const routes = all_routes;
  const t = useTranslations("common");
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
                  <h6 className="me-1">{t("visasCount", { count: visas.length })}</h6>
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
                {visas.map((visa, index) => {
                  const image = `assets/img/visa/visa-0${(index % 6) + 1}.jpg`;
                  const detailHref = `/visa/${encodeURIComponent(visa.slug)}`;

                  return (
                    <div className="col-xxl-4 col-md-6 d-flex" key={visa.countryId}>
                      <div className="place-item mb-4 flex-fill">
                        <div className="place-img">
                          <div className="slide-images">
                            <Link href={detailHref}>
                              <ImageWithBasePath
                                src={image}
                                className="img-fluid w-100"
                                alt={visa.name}
                              />
                            </Link>
                          </div>
                          <div className="fav-item">
                            <button
                              className={`fav-icon p-2 border-0 ${fav[index] ? "selected" : ""}`}
                              onClick={() => handleFav(index)}
                            >
                              <i className="isax isax-heart5" />
                            </button>
                            <span className="badge bg-white text-dark d-inline-flex align-items-center">
                              {visa.countryCode}
                            </span>
                          </div>
                        </div>
                        <div className="place-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex flex-wrap align-items-center me-2">
                              <span className="me-1">
                                <i className="isax isax-clock text-gray-6" />
                              </span>
                              <p className="fs-14 text-gray-9">
                                {t("visaTypesCount", { count: visa.typeCount })}
                              </p>
                            </div>
                          </div>
                          <h5 className="mb-2">
                            <Link href={detailHref}>{visa.name}</Link>
                          </h5>
                          <div className="d-flex align-items-center gap-0 mb-3">
                            <p className="d-flex align-items-center fs-14 mb-0 me-2">
                              {t("haniVisaServices")}
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="mb-0">
                              <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                                From{" "}
                                <span className="ms-1 fs-18 fw-semibold text-primary">
                                  {formatMoney(
                                    visa.minimumPrice,
                                    visa.minimumPriceCurrency,
                                    locale ?? "fa"
                                  )}
                                </span>
                                <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                              </h6>
                            </div>
                            <div className="ms-2 d-flex align-items-center">
                              <p className="d-flex align-items-center fs-14 mb-0">
                                <i className="isax isax-location5 me-1" />
                                {visa.countryCode}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {visas.length === 0 && (
                  <div className="col-12">
                    <p className="text-center text-gray-6">No visas found.</p>
                  </div>
                )}
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
