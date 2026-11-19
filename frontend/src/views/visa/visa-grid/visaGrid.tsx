"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";
import VisaSearch from "../visaSearch";
import { VisaFilters, type VisaFilterValues } from "@/features/visa/ui/VisaFilters";
import { useState } from "react";
import type { VisaSearchItem } from "@/features/visa/domain/visa-search";
import { formatMoney } from "@/lib/hani/money";
import { useTranslations } from "next-intl";


const VisaGrid = ({
  visas = [],
  locale,
  filters = {},
}: {
  visas?: VisaSearchItem[];
  locale?: string;
  filters?: VisaFilterValues;
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
            <VisaFilters locale={locale ?? "fa"} filters={filters} />
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
                    <p className="text-center text-gray-6">{t("noVisas")}</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

    </>
  )
}

export default VisaGrid
