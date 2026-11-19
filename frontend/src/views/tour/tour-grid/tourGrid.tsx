"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb'
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import { all_routes } from '../../../routes/all_routes';
import AppSwiper from '../../../components/app-swiper'
import type {
    TourScopeValue,
    TourSearchFilters,
    TourSearchItem,
} from "@/features/tours/domain/tour-search";
import { TourFilters } from "@/features/tours/ui/TourFilters";
import { Link as LocaleLink } from "@/i18n/navigation";
import { formatMoney } from "@/lib/hani/money";
import { formatIsoDate } from "@/lib/hani/calendar";
import { useTranslations } from "next-intl";
import TourSearch from '../tourSearch';

const TourGrid = ({
    tours = [],
    totalCount,
    page,
    locale,
    scope,
    filters = {},
    tourTypes = [],
    isLoading,
    onScopeSelect,
}: {
    tours?: TourSearchItem[];
    totalCount?: number;
    page?: number;
    locale?: string;
    scope?: TourScopeValue;
    filters?: TourSearchFilters;
    tourTypes?: string[];
    isLoading?: boolean;
    onScopeSelect?: (scope?: TourScopeValue) => void;
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
                                    prefetch
                                    scroll={false}
                                    className={`nav-link ${scope ? "" : "active text-dark"}`}
                                    aria-current={scope ? undefined : "page"}
                                    onClick={(event) => {
                                        if (onScopeSelect) {
                                            event.preventDefault();
                                            onScopeSelect(undefined);
                                        }
                                    }}
                                >
                                    {t("scopeAll")}
                                </LocaleLink>
                            </li>
                            <li>
                                <LocaleLink
                                    href="/tours?scope=domestic"
                                    prefetch
                                    scroll={false}
                                    className={`nav-link ${scope === "Domestic" ? "active text-dark" : ""}`}
                                    aria-current={scope === "Domestic" ? "page" : undefined}
                                    onClick={(event) => {
                                        if (onScopeSelect) {
                                            event.preventDefault();
                                            onScopeSelect("Domestic");
                                        }
                                    }}
                                >
                                    {t("scopeDomestic")}
                                </LocaleLink>
                            </li>
                            <li>
                                <LocaleLink
                                    href="/tours?scope=foreign"
                                    prefetch
                                    scroll={false}
                                    className={`nav-link ${scope === "Foreign" ? "active text-dark" : ""}`}
                                    aria-current={scope === "Foreign" ? "page" : undefined}
                                    onClick={(event) => {
                                        if (onScopeSelect) {
                                            event.preventDefault();
                                            onScopeSelect("Foreign");
                                        }
                                    }}
                                >
                                    {t("scopeForeign")}
                                </LocaleLink>
                            </li>
                        </ul>
                        {/* Tour Search */}
                        <TourSearch/>
                        {/* /Tour Search */}
                        {/* Tour Types */}
                        {tourTypes.length > 0 ? (
                            <div className="mb-2">
                                <div className="mb-3">
                                    <h3 className="h5 mb-2">{t("tourTypesTitle")}</h3>
                                </div>
                                <div className="row">
                                    {tourTypes.slice(0, 6).map((type, index) => (
                                        <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6" key={type}>
                                            <div className="d-flex align-items-center hotel-type-item mb-3">
                                                <LocaleLink
                                                    href={`/tours?tourType=${encodeURIComponent(type)}`}
                                                    className="avatar avatar-lg"
                                                >
                                                    <ImageWithBasePath
                                                        src={`assets/img/tours/tours-0${(index % 6) + 1}.jpg`}
                                                        className="rounded-circle"
                                                        alt={type}
                                                    />
                                                </LocaleLink>
                                                <div className="ms-2">
                                                    <div className="fs-16 fw-medium">
                                                        <LocaleLink href={`/tours?tourType=${encodeURIComponent(type)}`}>
                                                            {type}
                                                        </LocaleLink>
                                                    </div>
                                                    <p className="fs-14 mb-0">{t("tourTypeFilterHint")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {/* /Tour Types */}
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                                <TourFilters
                                    locale={locale ?? "fa"}
                                    filters={filters}
                                    tourTypes={tourTypes}
                                />
                            </div>
                            {/* /Sidebar */}
                            <div className="col-xl-9 col-lg-8 theiaStickySidebar">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="mb-3">
                                        {t("toursFound", { count: totalCount ?? tours.length })}
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="list-item d-flex align-items-center mb-3">
                                            <Link
                                                href={routes.tourGrid}
                                                className="list-icon active me-2"
                                                aria-label={t("gridView")}
                                            >
                                                <i className="isax isax-grid-1" />
                                            </Link>
                                            <Link
                                                href={routes.tourList}
                                                className="list-icon me-2"
                                                aria-label={t("listView")}
                                            >
                                                <i className="isax isax-firstline" />
                                            </Link>
                                            <Link
                                                href={routes.tourMap}
                                                className="list-icon me-2"
                                                aria-label={t("mapView")}
                                            >
                                                <i className="isax isax-map-1" />
                                            </Link>
                                        </div>
                                        <div className="mb-3" />
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
                                <div className="row justify-content-center" aria-busy={isLoading}>
                                    {tours.map((tour, index) => {
                                        const image =
                                            tour.coverImageUrl ??
                                            `assets/img/tours/tours-0${(index % 3) + 7}.jpg`;
                                        const destination = tour.destinationNames?.[0] ?? tour.tourType;
                                        const departure = tour.nextDepartureDate
                                            ? formatIsoDate(
                                                  tour.nextDepartureDate,
                                                  locale ?? "fa",
                                                  "medium"
                                              )
                                            : null;

                                        return (
                                            <div className="col-xxl-4 col-md-6 d-flex" key={tour.productId}>
                                                <div className="place-item common-grid-slider mb-4 flex-fill">
                                                    <div className="place-img">
                                                        <Link href={`/tours/${encodeURIComponent(tour.slug)}`}>
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
                                                                aria-label={t("addToWishlist")}
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
                                                        <h3 className="h5 mb-1 text-truncate">
                                                            <Link href={`/tours/${encodeURIComponent(tour.slug)}`}>
                                                                {tour.title}
                                                            </Link>
                                                        </h3>
                                                        <p className="d-flex align-items-center mb-3">
                                                            <i className="isax isax-location5 me-2" />
                                                            {destination}
                                                        </p>
                                                        <div className="mb-3">
                                                            <div className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                                                                Starts From{" "}
                                                                <span className="ms-1 fs-18 fw-semibold text-primary">
                                                                    {formatMoney(tour.minPrice, tour.currency, locale ?? "fa")}
                                                                </span>
                                                            </div>
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
