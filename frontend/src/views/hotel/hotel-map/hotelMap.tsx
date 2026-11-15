"use client";
import React, { useState } from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";
import ImageWithBasePath from "../../../components/image-with-base-path";
import Link from "next/link";
import { all_routes } from "../../../routes/all_routes";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import SearchOption from "../searchOption";
import AppSwiper from '../../../components/app-swiper'
import HotelFilterModal from "../../../components/modals/hotelFilterModal";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 53.470692,
    lng: -2.220328,
};

// Define the type for location data
interface Location {
    id: number;
    lat: number;
    lng: number;
    grid_name: string;
    grid_address: string;
    grid_day: string;
    grid_rate: string;
    image: string;
    grid_star: string;
}

const locations: Location[] = [
    {
        id: 1,
        lat: 53.470692,
        lng: -2.220328,
        grid_name: "Rainbow Mountain Valley",
        grid_address: "Ciutat Vella, Barcelona",
        grid_day: "4 Day, 3 Night",
        grid_rate: "$500",
        image: "assets/img/hotels/hotel-01.jpg",
        grid_star: "5.0",
    },
    {
        id: 2,
        lat: 53.469189,
        lng: -2.199262,
        grid_name: "The Luxe Haven",
        grid_address: "Oxford Street, London",
        grid_day: "4 Day, 3 Night",
        grid_rate: "$600",
        image: "assets/img/hotels/hotel-02.jpg",
        grid_star: "5.0",
    },
    {
        id: 3,
        lat: 53.468665,
        lng: -2.189269,
        grid_name: "The Urban Retreat",
        grid_address: "Princes Street, Edinburgh",
        grid_day: "4 Day, 3 Night",
        grid_rate: "$700",
        image: "assets/img/hotels/hotel-06.jpg",
        grid_star: "5.0",
    },
];

const HotelMap: React.FC = () => {


    const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
    const handleItemClick = (index: number) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = !updatedSelectedItems[index];
            return updatedSelectedItems;
        });
    };
    const routes = all_routes
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Hotels',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Hotels',
            active: false,
        },
        {
            label: 'Hotel List',
            active: true,
        },
    ];
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD6adZVdzTvBpE2yBRK8cDfsss8QXChK0I", // Replace with your API key
    });

    const [selectedMarker, setSelectedMarker] = useState<Location | null>(locations[0]);
    // const [current, setCurrent] = useState<number>(0);

    //   useEffect(() => {
    //     const slider = setInterval(() => {
    //       const next = (current + 1) % locations.length;
    //       setSelectedMarker(locations[next]);
    //       console.log(locations[next],22);

    //       setCurrent(next);
    //     }, 3000);

    //     return () => clearInterval(slider);
    //   }, [current]);

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <>
            <Breadcrumb
                title="Hotels"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-01"
            />
            {/* Page Wrapper */}
            <div className="content pb-0">
                <div className="map-content">
                    <SearchOption />
                    <div className="d-flex align-items-center justify-content-between flex-wrap recommend-wrap mb-2">
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="dropdown mb-3">
                                <Link href="#" className="dropdown-toggle btn btn-white btn-sm border rounded" data-bs-toggle="modal" data-bs-target="#filter_modal">
                                    <i className="isax isax-filter-add me-1"></i> Filters
                                </Link>
                            </div>
                            <div className="dropdown mb-3">
                                <Link href="#" className="dropdown-toggle btn btn-white btn-sm border rounded" data-bs-toggle="dropdown" >
                                    Pricing
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form action={routes.hotelGrid}>
                                        <h6 className="fw-medium fs-16 mb-3">Pricing</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="pricing1" type="checkbox" id="pricing1" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing1">
                                                $50 - $100
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="pricing2" type="checkbox" id="pricing2" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing2">
                                                $100 - $1000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="pricing3" type="checkbox" id="pricing3" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing3">
                                                $1000 - $5000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input className="form-check-input ms-0 mt-0" name="pricing4" type="checkbox" id="pricing4" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing4">
                                                $10000 - $2000
                                            </label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                                            <Link href="#" className="btn btn-light btn-sm me-2">Reset</Link>
                                            <button type="button" className="btn btn-primary btn-sm">Apply</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="dropdown mb-3">
                                <Link href="#" className="dropdown-toggle btn btn-white btn-sm border rounded" data-bs-toggle="dropdown" >
                                    Guest Ratings
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form action={routes.hotelGrid}>
                                        <h6 className="fw-medium fs-16 mb-3">Ratings</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review01" type="checkbox" id="review01" />
                                            <label className="form-check-label ms-2" htmlFor="review01">
                                                <span className="rating d-flex align-items-center">
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary"></i>
                                                    <span className="ms-2">5 Star</span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review02" type="checkbox" id="review02" />
                                            <label className="form-check-label ms-2" htmlFor="review02">
                                                <span className="rating d-flex align-items-center">
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary"></i>
                                                    <span className="ms-2">4 Star</span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review03" type="checkbox" id="review03" />
                                            <label className="form-check-label ms-2" htmlFor="review03">
                                                <span className="rating d-flex align-items-center">
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary"></i>
                                                    <span className="ms-2">3 Star</span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review04" type="checkbox" id="review04" />
                                            <label className="form-check-label ms-2" htmlFor="review04">
                                                <span className="rating d-flex align-items-center">
                                                    <i className="fas fa-star filled text-primary me-1"></i>
                                                    <i className="fas fa-star filled text-primary"></i>
                                                    <span className="ms-2">2 Star</span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input className="form-check-input ms-0 mt-0" name="review05" type="checkbox" id="review05" />
                                            <label className="form-check-label ms-2" htmlFor="review05">
                                                <span className="rating d-flex align-items-center">
                                                    <i className="fas fa-star filled text-primary"></i>
                                                    <span className="ms-2">1 Star</span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                                            <Link href="#" className="btn btn-light btn-sm me-2">Reset</Link>
                                            <button type="button" className="btn btn-primary btn-sm">Apply</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="dropdown mb-3">
                                <Link href="#" className="dropdown-toggle btn btn-white btn-sm border rounded" data-bs-toggle="dropdown" >
                                    Amenities
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form action={routes.hotelGrid}>
                                        <h6 className="fw-medium fs-16 mb-3">Amenities</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities1" type="checkbox" id="amenities1" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="amenities1">Pet friendly</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities2" type="checkbox" id="amenities2" />
                                            <label className="form-check-label ms-2" htmlFor="amenities2">Airport shuttle included</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities3" type="checkbox" id="amenities3" />
                                            <label className="form-check-label ms-2" htmlFor="amenities3">Spa</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities4" type="checkbox" id="amenities4" />
                                            <label className="form-check-label ms-2" htmlFor="amenities4">Hot tub</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities5" type="checkbox" id="amenities5" />
                                            <label className="form-check-label ms-2" htmlFor="amenities5">Parking</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities6" type="checkbox" id="amenities6" />
                                            <label className="form-check-label ms-2" htmlFor="amenities6">Kitchen</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities7" type="checkbox" id="amenities7" />
                                            <label className="form-check-label ms-2" htmlFor="amenities7">Air conditioned</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities8" type="checkbox" id="amenities8" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="amenities8">Cribs</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities9" type="checkbox" id="amenities9" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="amenities9">Gym</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="amenities10" type="checkbox" id="amenities10" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="amenities10">Wifi Included</label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input className="form-check-input ms-0 mt-0" name="amenities11" type="checkbox" id="amenities11" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="amenities11">Ocean view</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="input-icon mb-3 me-3">
                                <span className="input-icon-addon">
                                    <i className="isax isax-search-normal"></i>
                                </span>
                                <input type="text" className="form-control" placeholder="Search by Hotel Name" />
                            </div>
                            <div className="list-item d-flex align-items-center mb-3">
                                <Link href={routes.hotelGrid} className="list-icon me-2"><i className="isax isax-grid-1"></i></Link>
                                <Link href={routes.hotelList} className="list-icon me-2"><i className="isax isax-firstline"></i></Link>
                                <Link href={routes.hotelMap} className="list-icon active  me-2"><i className="isax isax-map-1"></i></Link>
                            </div>
                            <div className="dropdown mb-3">
                                <Link href="#" className="dropdown-toggle py-2" data-bs-toggle="dropdown" >
                                    <span className="fw-medium text-gray-9">Sort By : </span>Recommended
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form >
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
                </div>
                <div className="row">
                    <div className="col-xl-8">
                        <div className="map-lists-widget border-top">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-4">1920 Hotels Found on Your Search</h6>
                                <div className="list-item d-flex align-items-center shadow-md bg-white rounded-3 p-2 mb-4">
                                    <Link href={routes.hotelGrid} className="list-icon me-2"><i className="isax isax-grid-1"></i></Link>
                                    <Link href={routes.hotelList} className="list-icon active"><i className="isax isax-firstline"></i></Link>
                                </div>
                            </div>
                            <div className="hotel-list">
                                <div className="row justify-content-center">

                                    <div className="col-md-12">

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-01.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>Hotel Miravent Barcelona</Link></h5>
                                                        <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Beth Williams</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                                            <p className="fs-14">(400)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Experience luxury and comfort at our centrally located hotel, featuring modern amenities, spacious rooms, and exceptional service.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$500 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                <Link href={routes.hotelDetails}>
                                                    <ImageWithBasePath src="assets/img/hotels/hotel-05.jpg" className="img-fluid" alt="img" />
                                                </Link>
                                                <div className="fav-item" key={2} onClick={() => handleItemClick(2)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>The Luxe Haven</Link></h5>
                                                        <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Oxford Street, London</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Tom Andrews</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.7</span>
                                                            <p className="fs-14">(360)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Stay in luxury at our hotel, featuring premium amenities, stunning cityscape views, and an on-site spa for the ultimate relaxation experience</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$600 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                <Link href={routes.hotelDetails}>
                                                    <ImageWithBasePath src="assets/img/hotels/hotel-06.jpg" className="img-fluid" alt="img" />
                                                </Link>
                                                <div className="fav-item" key={3} onClick={() => handleItemClick(3)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>The Urban Retreat</Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>Princes Street, Edinburgh</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-03.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Rober Cowell</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.5</span>
                                                            <p className="fs-14">(500)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Conveniently located near top attractions, our hotel offers modern rooms, free parking, and a complimentary breakfast to start your day right.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$300 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={4} onClick={() => handleItemClick(4)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[4] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>The Grand Horizon</Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>Deansgate, Manchester</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-05.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Timothy Brewer</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                                            <p className="fs-14">(450)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Discover the perfect balance of luxury and affordability at our hotel, with a 24-hour concierge, free Wi-Fi, and easy access to local hotspots.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$400 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={5} onClick={() => handleItemClick(5)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[5] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>Hotel Evergreen </Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>King’s Road, Chelsea</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-06.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Timothy Rio</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.5</span>
                                                            <p className="fs-14">(500)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Our hotel offers pet-friendly rooms, complimentary shuttle service, and comfortable accommodations just minutes from key attractions and business centers.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$300 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                    </div>

                                </div>

                            </div>
                            <div className="text-center">
                                <Link href="#" className="btn btn-primary">Load More</Link>
                            </div>
                        </div>
                    </div>
                    {/* Map */}
                    <div className="col-xl-4 map-right grid-map">
                        <div id="map" className="map-listing">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={14}
                                options={{
                                    scrollwheel: false,
                                    mapTypeId: "roadmap",
                                }}
                            >
                                {locations.map((location) => (
                                    <Marker
                                        key={location.id}
                                        position={{ lat: location.lat, lng: location.lng }}
                                        onClick={() => setSelectedMarker(location)}
                                    />
                                ))}

                                {selectedMarker && (
                                    <InfoWindow
                                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                                        onCloseClick={() => setSelectedMarker(null)}
                                    >
                                        <div>
                                            <div className="card">
                                                <div className="card-img">
                                                    <Link href="#" className="property-img">
                                                        <ImageWithBasePath
                                                            className="img-fluid w-100"
                                                            alt="img"
                                                            src={selectedMarker.image}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="title mb-2">
                                                        <Link href="#" tabIndex={-1}>
                                                            {selectedMarker.grid_name}
                                                        </Link>
                                                    </h5>
                                                    <p className="mb-3">
                                                        <i className="isax isax-location"></i>{" "}
                                                        {selectedMarker.grid_address}
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <h4 className="text-primary border-end pe-2 me-2">
                                                                {selectedMarker.grid_rate}
                                                            </h4>
                                                            <p>{selectedMarker.grid_day}</p>
                                                        </div>
                                                        <span className="badge badge-warning text-dark">
                                                            {selectedMarker.grid_star}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        </div>
                    </div>
                    {/* /Map */}
                </div>
            </div>
            {/* /Page Wrapper */}

            <HotelFilterModal />

        </>
    );
};

export default HotelMap;
