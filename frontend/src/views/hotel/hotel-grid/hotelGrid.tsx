"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import SearchOption from '../searchOption';
import AppSwiper from '../../../components/app-swiper'
import type { HotelSearchItem } from "@/features/hotels/domain/hotel-search";
import { useTranslations } from "next-intl";
import { formatMoney } from "@/lib/hani/money";
import HotelFilter from '../hotelFilter';

const HotelGrid = ({
    hotels = [],
    totalCount,
    page,
    locale,
}: {
    hotels?: HotelSearchItem[];
    totalCount?: number;
    page?: number;
    locale?: string;
}) => {
    const routes = all_routes
    const t = useTranslations("common");

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Hotel',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Hotels',
            active: false,
        },
        {
            label: 'Hotel Grid',
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
        <>
            <Breadcrumb title="Hotel" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
            <div className="content">
                <div className="container">

                    <SearchOption />

                    <div className="row">

                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-3 ">
                            <HotelFilter />
                        </div>
                        {/* /Sidebar */}

                        <div className="col-xl-9 col-lg-8 theiaStickySidebar">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-3">1920 Hotels Found on Your Search</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="list-item d-flex align-items-center mb-3">
                                        <Link href={routes.hotelGrid} className="list-icon active me-2"><i className="isax isax-grid-1"></i></Link>
                                        <Link href={routes.hotelList} className="list-icon me-2"><i className="isax isax-firstline"></i></Link>
                                        <Link href={routes.hotelMap} className="list-icon me-2"><i className="isax isax-map-1"></i></Link>
                                    </div>
                                    <div className="dropdown mb-3">
                                        <Link href="#" className="dropdown-toggle py-2" data-bs-toggle="dropdown" >
                                            <span className="fw-medium text-gray-9">Sort By : </span>Recommended
                                        </Link>
                                        <div className="dropdown-menu dropdown-sm">
                                            <form>
                                                <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend1" defaultChecked />
                                                    <label className="form-check-label ms-2" htmlFor="recommend1">Recommended</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend2" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend2">Price: low to high</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend3" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend3">Price: high to low</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend4" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend4">Newest</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend5" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend5">Ratings</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-0">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend6" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend6">Reviews</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                                                    <Link href="#" className="btn btn-light btn-sm me-2">Reset</Link>
                                                    <button type="button" className="btn btn-primary btn-sm">Apply</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-info br-10 p-3 pb-2 mb-4">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center"><i className="isax isax-info-circle me-2"></i>Save an average of 15% on thousands of hotels when you're signed in</p>
                                    <Link href={routes.login} className="btn btn-white btn-sm mb-2">Sign In</Link>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                {hotels.map((hotel, index) => {
                                    const detailHref = `${routes.hotelDetails}?slug=${encodeURIComponent(hotel.slug)}`;

                                    return (
                                        <div className="col-xl-4 col-md-6 d-flex" key={hotel.hotelId}>
                                            <div className="place-item common-grid-slider mb-4 flex-fill">
                                                <div className="place-img">
                                                    <AppSwiper preset="img-slider">
                                                        {[1, 2, 3].map((offset) => (
                                                            <div className="slide-images" key={offset}>
                                                                <Link href={detailHref}>
                                                                    <ImageWithBasePath
                                                                        src={`assets/img/hotels/hotel-0${((index + offset) % 6) + 1}.jpg`}
                                                                        className="img-fluid"
                                                                        alt={hotel.name}
                                                                    />
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </AppSwiper>
                                                    <div className="fav-item" onClick={() => handleItemClick(index)}>
                                                        <span className="badge bg-info d-inline-flex align-items-center">
                                                            <i className="isax isax-ranking me-1" />
                                                            {hotel.stars} {t("star")}
                                                        </span>
                                                        <Link
                                                            href="#"
                                                            className={`fav-icon ${selectedItems[index] ? "selected" : ""}`}
                                                        >
                                                            <i className="isax isax-heart5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            {hotel.averageRating?.toFixed(1) ?? "-"}
                                                        </span>
                                                        <p className="fs-14">
                                                            ({t("reviewsCount", { count: hotel.reviewCount })})
                                                        </p>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link href={detailHref}>{hotel.name}</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        {hotel.address ?? hotel.destinationId}
                                                    </p>
                                                    <div className="border-top pt-2 mb-2">
                                                        <h6 className="d-flex align-items-center">
                                                            {t("amenitiesCount", { count: hotel.amenityCount })}
                                                            {hotel.rankInCity ? ` | ${t("rankLabel")} ${hotel.rankInCity}` : ""}
                                                        </h6>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            {formatMoney(hotel.priceFrom, hotel.priceCurrency, locale ?? "fa")}
                                                            <span className="fs-14 fw-normal text-default"> / night</span>
                                                        </h5>
                                                        <Link href={detailHref} className="btn btn-sm btn-outline-primary">
                                                            {t("view")}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {hotels.length === 0 && (
                                    <div className="col-12">
                                        <p className="text-center text-gray-6">No hotels found.</p>
                                    </div>
                                )}
                            </div>
                            {/* Pagination */}
                            <nav className="pagination-nav">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <Link className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                                    <li className="page-item active"><Link className="page-link" href="#">4</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">5</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            {/* /Pagination */}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelGrid
