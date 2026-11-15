"use client";
import { useState } from 'react'
import ImageWithBasePath from '../../../components/image-with-base-path'
import Link from "next/link";
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import SearchOption from './searchOption';
import CruiseFilter from './cruiseFilter';
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";
import { all_routes } from '../../../routes/all_routes';
import AppSwiper from '../../../components/app-swiper'

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
    grid_rate: string;
    image: string;
    grid_star: string;
}

const locations: Location[] = [
    {
        id: 1,
        lat: 53.470692,
        lng: -2.220328,
        grid_name: "Bonnie Yacht",
        grid_address: "Princess Street,Edinburgh",
        grid_rate: "$300",
        image: "assets/img/cruise/cruise-06.jpg",
        grid_star: "4.9",
    },
    {
        id: 2,
        lat: 53.469189,
        lng: -2.199262,
        grid_name: "Coral Cruiser",
        grid_address: "Deansgate,Manchester",
        grid_rate: "$400",
        image: "assets/img/cruise/cruise-07.jpg",
        grid_star: "5.0",
    },
    {
        id: 3,
        lat: 53.468665,
        lng: -2.189269,
        grid_name: "Super Aquamarine",
        grid_address: "Ciutat Vella, Barcelona",
        grid_rate: "$500",
        image: "assets/img/cruise/cruise-08.jpg",
        grid_star: "5.0",
    },
];

const CruiseMap = () => {

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
            label: 'Cruise',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Cruise',
            active: true,
        },
        {
            label: 'Cruise List',
            active: true,
        },
    ];



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD6adZVdzTvBpE2yBRK8cDfsss8QXChK0I", // Replace with your API key
    });

    const [selectedMarker, setSelectedMarker] = useState<Location | null>(locations[0]);


    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <>

            <Breadcrumb
                title="Cruise"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-06"
            />

            {/* Page Wrapper */}
            <div className="content pb-0">
                <div className="map-content">
                    {/* Cruise Search */}
                    <SearchOption />
                    {/* /Cruise Search */}

                    <div className="d-flex align-items-center justify-content-between flex-wrap recommend-wrap mb-2">
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="dropdown mb-3">
                                <Link
                                    href="#"
                                    className="dropdown-toggle btn btn-white btn-sm border rounded"
                                    data-bs-toggle="modal"
                                    data-bs-target="#filter_modal"
                                >
                                    <i className="isax isax-filter-add me-1" /> Filters
                                </Link>
                            </div>
                            <div className="dropdown mb-3">
                                <Link
                                    href="#"
                                    className="dropdown-toggle btn btn-white btn-sm border rounded"
                                    data-bs-toggle="dropdown"

                                >
                                    Pricing
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form>
                                        <h6 className="fw-medium fs-16 mb-3">Pricing</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing1"
                                                type="checkbox"
                                                id="pricing1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing1">
                                                $50 - $100
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing2"
                                                type="checkbox"
                                                id="pricing2"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing2">
                                                $100 - $1000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing3"
                                                type="checkbox"
                                                id="pricing3"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing3">
                                                $1000 - $5000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing4"
                                                type="checkbox"
                                                id="pricing4"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing4">
                                                $10000 - $2000
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
                            <div className="dropdown mb-3">
                                <Link
                                    href="#"
                                    className="dropdown-toggle btn btn-white btn-sm border rounded"
                                    data-bs-toggle="dropdown"

                                >
                                    Cabin Types
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form>
                                        <h6 className="fw-medium fs-16 mb-3">Cabin type</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="review01"
                                                type="checkbox"
                                                id="review01"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="review01">
                                                Inside
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="review02"
                                                type="checkbox"
                                                id="review02"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="review02">
                                                Oceanview
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="review03"
                                                type="checkbox"
                                                id="review03"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="review03">
                                                Balcony
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="review04"
                                                type="checkbox"
                                                id="review04"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="review04">
                                                Suite
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="review05"
                                                type="checkbox"
                                                id="review05"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="review05">
                                                Mini-Suite
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
                            <div className="dropdown mb-3">
                                <Link
                                    href="#"
                                    className="dropdown-toggle btn btn-white btn-sm border rounded"
                                    data-bs-toggle="dropdown"

                                >
                                    Amenities
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form>
                                        <h6 className="fw-medium fs-16 mb-3">Amenities</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities1"
                                                type="checkbox"
                                                id="amenities1"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities1">
                                                Free Wifi
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities2"
                                                type="checkbox"
                                                id="amenities2"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities2">
                                                Casinos
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities3"
                                                type="checkbox"
                                                id="amenities3"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities3">
                                                Pool
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities4"
                                                type="checkbox"
                                                id="amenities4"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities3">
                                                Fitness Centers
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities5"
                                                type="checkbox"
                                                id="amenities5"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities5">
                                                Theaters
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities6"
                                                type="checkbox"
                                                id="amenities6"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities6">
                                                Complimentary meals
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities7"
                                                type="checkbox"
                                                id="amenities7"
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities7">
                                                Air conditioned
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities8"
                                                type="checkbox"
                                                id="amenities8"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="amenities8">
                                                Play Areas
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="amenities11"
                                                type="checkbox"
                                                id="amenities11"
                                                defaultChecked
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor="amenities11"
                                            >
                                                Wheelchair access
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="input-icon mb-3 me-3">
                                <span className="input-icon-addon">
                                    <i className="isax isax-search-normal" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Cruise Name"
                                />
                            </div>
                            <div className="list-item d-flex align-items-center mb-3">
                                <Link href={routes.cruiseGrid} className="list-icon me-2">
                                    <i className="isax isax-grid-1" />
                                </Link>
                                <Link href={routes.cruiseList} className="list-icon me-2">
                                    <i className="isax isax-firstline" />
                                </Link>
                                <Link href={routes.cruiseMap} className="list-icon active  me-2">
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
                                    <form action={routes.cruiseMap}>
                                        <h6 className="fw-medium fs-16 mb-3">Pricing</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing01"
                                                type="checkbox"
                                                id="pricing01"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing01">
                                                $50 - $100
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing02"
                                                type="checkbox"
                                                id="pricing02"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing02">
                                                $100 - $1000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing03"
                                                type="checkbox"
                                                id="pricing03"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing03">
                                                $1000 - $5000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input
                                                className="form-check-input ms-0 mt-0"
                                                name="pricing04"
                                                type="checkbox"
                                                id="pricing04"
                                                defaultChecked
                                            />
                                            <label className="form-check-label ms-2" htmlFor="pricing04">
                                                $10000 - $2000
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
                </div>
                <div className="row">
                    <div className="col-xl-8">
                        <div className="map-lists-widget border-top">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-4">1920 Cruises Found on Your Search</h6>
                                <div className="list-item d-flex align-items-center shadow-md bg-white rounded-3 p-2 mb-4">
                                    <Link href={routes.cruiseGrid} className="list-icon me-2">
                                        <i className="isax isax-grid-1" />
                                    </Link>
                                    <Link href={routes.cruiseList} className="list-icon active">
                                        <i className="isax isax-firstline" />
                                    </Link>
                                </div>
                            </div>
                            <div className="hotel-list">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        {/* Cruise Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-05.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-02.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-04.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-03.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                    <Link
                                                        href="#"
                                                        className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}
                                                    >
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate">
                                                            <Link href={routes.cruiseDetails}>Super Aquamarine</Link>
                                                        </h5>
                                                        <p className="d-flex align-items-center fs-14">
                                                            <i className="isax isax-location5 me-2" />
                                                            Ciutat Vella, Barcelona
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href="#"
                                                            className="d-flex align-items-center overflow-hidden border-end pe-2 me-2"
                                                        >
                                                            <span className="avatar avatar-sm flex-shrink-0 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/users/user-08.jpg"
                                                                    className="rounded-circle"
                                                                    alt="img"
                                                                />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Beth Williams</p>
                                                        </Link>
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.9
                                                        </span>
                                                        <p className="fs-14 text-truncate">(400 Reviews)</p>
                                                    </div>
                                                </div>
                                                <p className="fs-14 line-ellipsis mb-3">
                                                    Embark on a luxurious cruise where breathtaking
                                                    destinations meet world-class comfort and entertainment.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between cruise-list-item border-top flex-wrap row-gap-2 pt-3 mb-3">
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                        Year : <span className="text-dark fw-medium">2021</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-user me-1" />
                                                        Guests : <span className="text-dark fw-medium">4</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-fatrows text-gray-6 me-1" />
                                                        Width :{" "}
                                                        <span className="text-dark fw-medium">88.47 m</span>
                                                    </p>
                                                    <p className="fs-14">
                                                        <i className="isax isax-flash-1 me-1" />
                                                        Speed :{" "}
                                                        <span className="text-dark fw-medium">19 Knots</span>
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $500{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-12.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-09.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-07.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-03.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={2} onClick={() => handleItemClick(2)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate">
                                                            <Link href={routes.cruiseDetails}>Bonnie Yacht</Link>
                                                        </h5>
                                                        <p className="d-flex align-items-center fs-14">
                                                            <i className="isax isax-location5 me-2" />
                                                            Oxford Street, London
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href="#"
                                                            className="d-flex align-items-center overflow-hidden border-end pe-2  me-2"
                                                        >
                                                            <span className="avatar avatar-sm flex-shrink-0 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/users/user-09.jpg"
                                                                    className="rounded-circle"
                                                                    alt="img"
                                                                />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Tom Andrews</p>
                                                        </Link>
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.7
                                                        </span>
                                                        <p className="fs-14 text-truncate">(300 Reviews)</p>
                                                    </div>
                                                </div>
                                                <p className="fs-14 line-ellipsis mb-3">
                                                    Embark on a luxurious cruise where breathtaking
                                                    destinations meet world-class comfort and entertainment.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between cruise-list-item border-top flex-wrap row-gap-2 pt-3 mb-3">
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                        Year : <span className="text-dark fw-medium">2020</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-user me-1" />
                                                        Guests : <span className="text-dark fw-medium">3</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-fatrows text-gray-6 me-1" />
                                                        Width :{" "}
                                                        <span className="text-dark fw-medium">70.63 m</span>
                                                    </p>
                                                    <p className="fs-14">
                                                        <i className="isax isax-flash-1 me-1" />
                                                        Speed :{" "}
                                                        <span className="text-dark fw-medium">17 Knots</span>
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $400{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider" className="h-100">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-09.jpg"
                                                                    className="img-fluid h-100"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-01.jpg"
                                                                    className="img-fluid h-100"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-08.jpg"
                                                                    className="img-fluid h-100"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-07.jpg"
                                                                    className="img-fluid h-100"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={3} onClick={() => handleItemClick(3)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate">
                                                            <Link href={routes.cruiseDetails}>Coral Cruiser</Link>
                                                        </h5>
                                                        <p className="d-flex align-items-center fs-14">
                                                            <i className="isax isax-location5 me-2" />
                                                            Princes Street, Edinburgh
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href="#"
                                                            className="d-flex align-items-center overflow-hidden border-end pe-2  me-2"
                                                        >
                                                            <span className="avatar avatar-sm flex-shrink-0 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/users/user-10.jpg"
                                                                    className="rounded-circle"
                                                                    alt="img"
                                                                />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Robert Cogswell</p>
                                                        </Link>
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.5
                                                        </span>
                                                        <p className="fs-14 text-truncate">(320 Reviews)</p>
                                                    </div>
                                                </div>
                                                <p className="fs-14 line-ellipsis mb-3">
                                                    Embark on a luxurious cruise where breathtaking
                                                    destinations meet world-class comfort and entertainment.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between cruise-list-item border-top flex-wrap row-gap-2 pt-3 mb-3">
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                        Year : <span className="text-dark fw-medium">2017</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-user me-1" />
                                                        Guests : <span className="text-dark fw-medium">4</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-fatrows text-gray-6 me-1" />
                                                        Width :{" "}
                                                        <span className="text-dark fw-medium">75.12 m</span>
                                                    </p>
                                                    <p className="fs-14">
                                                        <i className="isax isax-flash-1 me-1" />
                                                        Speed :{" "}
                                                        <span className="text-dark fw-medium">20 Knots</span>
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $550{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-10.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-05.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-04.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-06.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={4} onClick={() => handleItemClick(4)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[4] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate">
                                                            <Link href={routes.cruiseDetails}>Harbor Haven</Link>
                                                        </h5>
                                                        <p className="d-flex align-items-center fs-14">
                                                            <i className="isax isax-location5 me-2" />
                                                            Princes Street, Edinburgh
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href="#"
                                                            className="d-flex align-items-center overflow-hidden border-end pe-2  me-2"
                                                        >
                                                            <span className="avatar avatar-sm flex-shrink-0 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/users/user-11.jpg"
                                                                    className="rounded-circle"
                                                                    alt="img"
                                                                />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Kenneth Palmer</p>
                                                        </Link>
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.3
                                                        </span>
                                                        <p className="fs-14 text-truncate">(380 Reviews)</p>
                                                    </div>
                                                </div>
                                                <p className="fs-14 line-ellipsis mb-3">
                                                    Embark on a luxurious cruise where breathtaking
                                                    destinations meet world-class comfort and entertainment.
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between cruise-list-item border-top flex-wrap row-gap-2 pt-3 mb-3">
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                        Year : <span className="text-dark fw-medium">2016</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-user me-1" />
                                                        Guests : <span className="text-dark fw-medium">6</span>
                                                    </p>
                                                    <p className="fs-14 mb-0">
                                                        <i className="isax isax-fatrows text-gray-6 me-1" />
                                                        Width :{" "}
                                                        <span className="text-dark fw-medium">98.15 m</span>
                                                    </p>
                                                    <p className="fs-14">
                                                        <i className="isax isax-flash-1 me-1" />
                                                        Speed :{" "}
                                                        <span className="text-dark fw-medium">14 Knots</span>
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $450{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <Link href="#" className="btn btn-primary">
                                    Load More
                                </Link>
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
            <CruiseFilter />
        </>

    )
}

export default CruiseMap
