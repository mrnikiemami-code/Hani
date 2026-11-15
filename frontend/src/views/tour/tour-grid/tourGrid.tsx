"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb'
import FliterSidebar from './filterSidebar';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import { all_routes } from '../../../routes/all_routes';
import AppSwiper from '../../../components/app-swiper'
import type {
    TourScopeValue,
    TourSearchItem,
} from "@/features/tours/domain/tour-search";
import { Link as LocaleLink } from "@/i18n/navigation";
import { formatMoney } from "@/lib/hani/money";
import { useTranslations } from "next-intl";
import TourSearch from '../tourSearch';

const TourGrid = ({
    tours = [],
    totalCount,
    page,
    locale,
    scope,
}: {
    tours?: TourSearchItem[];
    totalCount?: number;
    page?: number;
    locale?: string;
    scope?: TourScopeValue;
}) => {

    const routes = all_routes;
    const t = useTranslations("common");

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Tours',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Tours',
            active: true,
        },
        {
            label: 'TourGrid',
            active: true,
        },
    ];



    const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
    const handleItemClick = (index: number) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = !updatedSelectedItems[index];
            return updatedSelectedItems;
        });
    };

    return (
        <div>
            <Breadcrumb
                title="Tours"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />

            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <ul className="nav mb-4">
                            <li>
                                <LocaleLink
                                    href="/tours"
                                    className={`nav-link ${scope ? "" : "active"}`}
                                    aria-current={scope ? undefined : "page"}
                                >
                                    {t("scopeAll")}
                                </LocaleLink>
                            </li>
                            <li>
                                <LocaleLink
                                    href="/tours/domestic"
                                    className={`nav-link ${scope === "Domestic" ? "active" : ""}`}
                                    aria-current={scope === "Domestic" ? "page" : undefined}
                                >
                                    {t("scopeDomestic")}
                                </LocaleLink>
                            </li>
                            <li>
                                <LocaleLink
                                    href="/tours/foreign"
                                    className={`nav-link ${scope === "Foreign" ? "active" : ""}`}
                                    aria-current={scope === "Foreign" ? "page" : undefined}
                                >
                                    {t("scopeForeign")}
                                </LocaleLink>
                            </li>
                        </ul>
                        {/* Tour Search */}
                        <TourSearch/>
                        {/* /Tour Search */}
                        {/* Tour Types */}
                        <div className="mb-2">
                            <div className="mb-3">
                                <h5 className="mb-2">Choose type of Tours you are interested</h5>
                            </div>
                            <div className="row">
                                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="d-flex align-items-center hotel-type-item mb-3">
                                        <Link href={routes.tourGrid} className="avatar avatar-lg">
                                            <ImageWithBasePath
                                                src="assets/img/tours/tours-01.jpg"
                                                className="rounded-circle"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="ms-2">
                                            <h6 className="fs-16 fw-medium">
                                                <Link href={routes.tourGrid}>Ecotourism</Link>
                                            </h6>
                                            <p className="fs-14">216 Hotels</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="d-flex align-items-center hotel-type-item mb-3">
                                        <Link href={routes.tourGrid} className="avatar avatar-lg">
                                            <ImageWithBasePath
                                                src="assets/img/tours/tours-02.jpg"
                                                className="rounded-circle"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="ms-2">
                                            <h6 className="fs-16 fw-medium">
                                                <Link href={routes.tourGrid}>Adventure Tour</Link>
                                            </h6>
                                            <p className="fs-14">569 tours</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="d-flex align-items-center hotel-type-item mb-3">
                                        <Link href={routes.tourGrid} className="avatar avatar-lg">
                                            <ImageWithBasePath
                                                src="assets/img/tours/tours-03.jpg"
                                                className="rounded-circle"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="ms-2">
                                            <h6 className="fs-16 fw-medium">
                                                <Link href={routes.tourGrid}>Group Tours</Link>
                                            </h6>
                                            <p className="fs-14">129 tours</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="d-flex align-items-center hotel-type-item mb-3">
                                        <Link href={routes.tourGrid} className="avatar avatar-lg">
                                            <ImageWithBasePath
                                                src="assets/img/tours/tours-04.jpg"
                                                className="rounded-circle"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="ms-2">
                                            <h6 className="fs-16 fw-medium">
                                                <Link href={routes.tourGrid}>Beach Tours</Link>
                                            </h6>
                                            <p className="fs-14">600 tours</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="d-flex align-items-center hotel-type-item mb-3">
                                        <Link href={routes.tourGrid} className="avatar avatar-lg">
                                            <ImageWithBasePath
                                                src="assets/img/tours/tours-05.jpg"
                                                className="rounded-circle"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="ms-2">
                                            <h6 className="fs-16 fw-medium">
                                                <Link href={routes.tourGrid}>Historical Tours</Link>
                                            </h6>
                                            <p className="fs-14">200 tours</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="d-flex align-items-center hotel-type-item mb-3">
                                        <Link href={routes.tourGrid} className="avatar avatar-lg">
                                            <ImageWithBasePath
                                                src="assets/img/tours/tours-06.jpg"
                                                className="rounded-circle"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="ms-2">
                                            <h6 className="fs-16 fw-medium">
                                                <Link href={routes.tourGrid}>Summer Trip</Link>
                                            </h6>
                                            <p className="fs-14">200 tours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Tour Types */}
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                                <FliterSidebar />
                            </div>
                            {/* /Sidebar */}
                            <div className="col-xl-9 col-lg-8 theiaStickySidebar">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h6 className="mb-3">
                                        {t("toursFound", { count: totalCount ?? tours.length })}
                                    </h6>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="list-item d-flex align-items-center mb-3">
                                            <Link href={routes.tourGrid} className="list-icon active me-2">
                                                <i className="isax isax-grid-1" />
                                            </Link>
                                            <Link href={routes.tourList} className="list-icon me-2">
                                                <i className="isax isax-firstline" />
                                            </Link>
                                            <Link href={routes.tourMap} className="list-icon me-2">
                                                <i className="isax isax-map-1" />
                                            </Link>
                                        </div>
                                        <div className="dropdown mb-3">
                                            <Link
                                                href="#"
                                                className="dropdown-toggle py-2"
                                                data-bs-toggle="dropdown"

                                            >
                                                <span className="fw-medium text-gray-9">Sort By : </span>
                                                Recommended
                                            </Link>
                                            <div className="dropdown-menu dropdown-sm">
                                                <form action={routes.tourGrid}>
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
                                                        <Link
                                                            href="#"
                                                            className="btn btn-light btn-sm me-2"
                                                        >
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
                                <div className="bg-info br-10 p-3 pb-2 mb-4">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center">
                                            <i className="isax isax-info-circle me-2" />
                                            Save an average of 15% on thousands of hotels when you're signed
                                            in
                                        </p>
                                        <Link href={routes.login} className="btn btn-white btn-sm mb-2">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {tours.map((tour, index) => {
                                        const image = `assets/img/tours/tours-0${(index % 3) + 7}.jpg`;
                                        const destination = tour.destinationNames?.[0] ?? tour.tourType;
                                        const departure = tour.nextDepartureDate
                                            ? new Intl.DateTimeFormat(locale ?? "fa").format(
                                                  new Date(tour.nextDepartureDate)
                                              )
                                            : null;

                                        return (
                                            <div className="col-xxl-4 col-md-6 d-flex" key={tour.productId}>
                                                <div className="place-item common-grid-slider mb-4 flex-fill">
                                                    <div className="place-img">
                                                        <Link href={`${routes.tourDetails}?slug=${encodeURIComponent(tour.slug)}`}>
                                                            <ImageWithBasePath
                                                                src={image}
                                                                className="img-fluid"
                                                                alt={tour.title}
                                                            />
                                                        </Link>
                                                        <div className="fav-item" onClick={() => handleItemClick(index)}>
                                                            <Link
                                                                href="#"
                                                                className={`fav-icon ${selectedItems[index] ? "selected" : ""}`}
                                                            >
                                                                <i className="isax isax-heart5" />
                                                            </Link>
                                                            <span className="badge bg-info d-inline-flex align-items-center">
                                                                <i className="isax isax-ranking me-1" />
                                                                {t("offersCount", { count: tour.offerCount })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="place-content">
                                                        <div className="d-flex align-items-center justify-content-between mb-1">
                                                            <div className="d-flex flex-wrap align-items-center">
                                                                <span className="me-1">
                                                                    <i className="ti ti-receipt text-primary" />
                                                                </span>
                                                                <p className="fs-14 text-gray-9">{tour.tourType}</p>
                                                            </div>
                                                            <span className="d-inline-block border vertical-splits">
                                                                <span className="bglight text-light d-flex align-items-center justify-content-center" />
                                                            </span>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                                                                    {tour.averageRating?.toFixed(1) ?? "-"}
                                                                </span>
                                                                <p className="fs-14">({t("reviewsCount", { count: tour.reviewCount })})</p>
                                                            </div>
                                                        </div>
                                                        <h5 className="mb-1 text-truncate">
                                                            <Link href={`${routes.tourDetails}?slug=${encodeURIComponent(tour.slug)}`}>
                                                                {tour.title}
                                                            </Link>
                                                        </h5>
                                                        <p className="d-flex align-items-center mb-3">
                                                            <i className="isax isax-location5 me-2" />
                                                            {destination}
                                                        </p>
                                                        <div className="mb-3">
                                                            <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                                                                Starts From{" "}
                                                                <span className="ms-1 fs-18 fw-semibold text-primary">
                                                                    {formatMoney(tour.minPrice, tour.currency, locale ?? "fa")}
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                            <div className="d-flex flex-wrap align-items-center me-2">
                                                                <span className="me-1">
                                                                    <i className="isax isax-calendar-tick text-gray-6" />
                                                                </span>
                                                                <p className="fs-14 text-gray-9">
                                                                    {t("daysCount", { count: tour.durationDays })}
                                                                </p>
                                                            </div>
                                                            <span className="d-inline-block border vertical-splits">
                                                                <span className="bglight text-light d-flex align-items-center justify-content-center" />
                                                            </span>
                                                            <div className="ms-2 d-flex align-items-center">
                                                                <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                                                                    <i className="isax isax-calendar me-1" />
                                                                    {departure ?? tour.agencyName ?? ""}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {tours.length === 0 && (
                                        <div className="col-12">
                                            <p className="text-center text-gray-6">{t("noResults")}</p>
                                        </div>
                                    )}
                                </div>
                                {/* Pagination */}
                                <nav className="pagination-nav">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                            <Link
                                                className="page-link"
                                                href="#"
                                                aria-label="Previous"
                                            >
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
                                            <Link
                                                className="page-link"
                                                href="#"
                                                aria-label="Next"
                                            >
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

        </div>

    )
}

export default TourGrid
