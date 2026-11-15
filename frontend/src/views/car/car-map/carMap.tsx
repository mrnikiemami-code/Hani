"use client";
import { useState } from 'react'
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import CarSearch from '../carSearch';
import AppSwiper from '../../../components/app-swiper'
import CarFilterModal from '../../../components/modals/carFilterModal';

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
        grid_name: "Toyota Camry SE 400",
        grid_address: "Ciutat Vella, Barcelona",
        grid_day: "/Day",
        grid_rate: "$500",
        image: "assets/img/cars/car-06.jpg",
        grid_star: "5.0",
    },
    {
        id: 2,
        lat: 53.469189,
        lng: -2.199262,
        grid_name: "Ford Mustang 4.0 AT",
        grid_address: "Oxford Street, London",
        grid_day: "/Day",
        grid_rate: "$600",
        image: "assets/img/cars/car-07.jpg",
        grid_star: "5.0",
    },
    {
        id: 3,
        lat: 53.468665,
        lng: -2.189269,
        grid_name: "Ferrari 458 MM Special",
        grid_address: "Princes Street, Edinburgh",
        grid_day: "/Day",
        grid_rate: "$700",
        image: "assets/img/cars/car-08.jpg",
        grid_star: "5.0",
    },
];
const CarMap = () => {
    const routes = all_routes
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
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Car',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Car',
            active: false,
        },
        {
            label: 'Car List',
            active: true,
        },
    ];

    return (
        <>
            <Breadcrumb title="Car" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-03" />
            {/* Page Wrapper */}
            <div className="content pb-0">
                <div className="map-content">

                    <CarSearch />

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
                                    <form >
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
                                    Car Types
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form >
                                        <h6 className="fw-medium fs-16 mb-3">Types</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review1" type="checkbox" id="review1" />
                                            <label className="form-check-label ms-2" htmlFor="review1">
                                                Sedan
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review2" type="checkbox" id="review2" />
                                            <label className="form-check-label ms-2" htmlFor="review2">
                                                EV
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review3" type="checkbox" id="review3" />
                                            <label className="form-check-label ms-2" htmlFor="review3">
                                                Crossover
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review4" type="checkbox" id="review4" />
                                            <label className="form-check-label ms-2" htmlFor="review4">
                                                Sports
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review5" type="checkbox" id="review5" />
                                            <label className="form-check-label ms-2" htmlFor="review5">
                                                Van
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review6" type="checkbox" id="review6" />
                                            <label className="form-check-label ms-2" htmlFor="review6">
                                                Wagon
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input className="form-check-input ms-0 mt-0" name="review7" type="checkbox" id="review7" />
                                            <label className="form-check-label ms-2" htmlFor="review7">
                                                SUV
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
                                    Car Brands
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form >
                                        <h6 className="fw-medium fs-16 mb-3">Car Brands</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review01" type="checkbox" id="review01" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="review01">
                                                Toyota
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review02" type="checkbox" id="review02" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="review02">
                                                Ford
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review03" type="checkbox" id="review03" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="review03">
                                                Honda
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review04" type="checkbox" id="review04" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="review04">
                                                BMW
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review05" type="checkbox" id="review05" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="review05">
                                                Mercedes-Benz
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="review06" type="checkbox" id="review06" />
                                            <label className="form-check-label ms-2" htmlFor="review06">
                                                Tesla
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input className="form-check-input ms-0 mt-0" name="review07" type="checkbox" id="review07" />
                                            <label className="form-check-label ms-2" htmlFor="review07">
                                                Audi
                                            </label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                                            <Link href="#" className="btn btn-light btn-sm me-2">Reset</Link>
                                            <button type="button" className="btn btn-primary btn-sm">Apply</button>
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
                                <input type="text" className="form-control" placeholder="Search by Car Name" />
                            </div>
                            <div className="list-item d-flex align-items-center mb-3">
                                <Link href={routes.carGrid} className="list-icon me-2"><i className="isax isax-grid-1"></i></Link>
                                <Link href={routes.carList} className="list-icon me-2"><i className="isax isax-firstline"></i></Link>
                                <Link href={routes.carMap} className="list-icon active  me-2"><i className="isax isax-map-1"></i></Link>
                            </div>
                            <div className="dropdown mb-3">
                                <Link href="#" className="dropdown-toggle py-2" data-bs-toggle="dropdown" >
                                    <span className="fw-medium text-gray-9">Sort By : </span>Recommended
                                </Link>
                                <div className="dropdown-menu dropdown-sm">
                                    <form>
                                        <h6 className="fw-medium fs-16 mb-3">Pricing</h6>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="pricing01" type="checkbox" id="pricing01" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing01">
                                                $50 - $100
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="pricing02" type="checkbox" id="pricing02" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing02">
                                                $100 - $1000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                            <input className="form-check-input ms-0 mt-0" name="pricing03" type="checkbox" id="pricing03" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing03">
                                                $1000 - $5000
                                            </label>
                                        </div>
                                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                                            <input className="form-check-input ms-0 mt-0" name="pricing04" type="checkbox" id="pricing04" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="pricing04">
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
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-8">
                        <div className="map-lists-widget border-top">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-4">1920 Cars Found on Your Search</h6>
                                <div className="list-item d-flex align-items-center shadow-md bg-white rounded-3 p-2 mb-4">
                                    <Link href={routes.carGrid} className="list-icon me-2"><i className="isax isax-grid-1"></i></Link>
                                    <Link href={routes.carList} className="list-icon active"><i className="isax isax-firstline"></i></Link>
                                </div>
                            </div>
                            <div className="hotel-list">
                                <div className="row justify-content-center">

                                    <div className="col-md-12">

                                        {/* Car List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item">
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className="fav-icon selected">
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                </div>

                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div className="">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h5 className="text-truncate border-end pe-2 me-2"><Link href={routes.carDetails}>Toyota Camry SE 400</Link></h5>
                                                            <span className="badge badge-secondary badge-sm d-flex align-items-center">Sedan</span>
                                                        </div>
                                                        <p className="d-flex align-items-center"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" className="avatar avatar-sm flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/users/user-08.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">5.0</span>
                                                            <p className="fs-14">(400 Reviews)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="fs-14 mb-3">Enjoy modern comfort, cutting-edge technology, and exceptional handling for every journey, from city streets to off-road adventures.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 me-1">
                                                    <div className="p-2 border rounded d-inline-flex align-items-center">
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-gas-station me-1"></i>
                                                                Fuel :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Hybrid</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-kanban me-1"></i>
                                                                Gear :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Manual</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-routing-2 me-1"></i>
                                                                Travelled :
                                                            </span>
                                                            <p className="fs-14 fw-medium">14,000 KM</p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-primary text-md-end text-nowrap">$500 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car List */}

                                        {/* Car List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-09.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item">
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className="fav-icon selected">
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                </div>

                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div className="">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h5 className="text-truncate border-end pe-2 me-2"><Link href={routes.carDetails}>Ford Mustang 4.0 AT</Link></h5>
                                                            <span className="badge badge-secondary badge-sm d-flex align-items-center">Sedan</span>
                                                        </div>
                                                        <p className="d-flex align-items-center"><i className="isax isax-location5 me-2"></i>Oxford Street, London</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" className="avatar avatar-sm flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/users/user-09.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">5.0</span>
                                                            <p className="fs-14">(300 Reviews)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="fs-14 mb-3">A powerful and dynamic vehicle, built for those who crave adventure with a smooth ride and impressive handling.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 me-1">
                                                    <div className="p-2 border rounded d-inline-flex align-items-center">
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-gas-station me-1"></i>
                                                                Fuel :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Hybrid</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-kanban me-1"></i>
                                                                Gear :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Auto</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-routing-2 me-1"></i>
                                                                Travelled :
                                                            </span>
                                                            <p className="fs-14 fw-medium">12,000 KM</p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-primary text-md-end text-nowrap">$600 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car List */}

                                        {/* Car List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-09.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-12.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item">
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className="fav-icon">
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div className="">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h5 className="text-truncate border-end pe-2 me-2"><Link href={routes.carDetails}>Ferrari 458 MM Special</Link></h5>
                                                            <span className="badge badge-secondary badge-sm d-flex align-items-center">Sedan</span>
                                                        </div>
                                                        <p className="d-flex align-items-center"><i className="isax isax-location5 me-2"></i>Princes Street, Edinburgh</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" className="avatar avatar-sm flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/users/user-10.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.0</span>
                                                            <p className="fs-14">(320 Reviews)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="fs-14 mb-3">Modern and elegant, this car combines innovative features with a sleek design, offering a premium driving experience.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 me-1">
                                                    <div className="p-2 border rounded d-inline-flex align-items-center">
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-gas-station me-1"></i>
                                                                Fuel :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Hybrid</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-kanban me-1"></i>
                                                                Gear :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Manual</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-routing-2 me-1"></i>
                                                                Travelled :
                                                            </span>
                                                            <p className="fs-14 fw-medium">13,000 KM</p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-primary text-md-end text-nowrap">$300 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car List */}

                                        {/* Car List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-09.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-12.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item">
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className="fav-icon">
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div className="">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h5 className="text-truncate border-end pe-2 me-2"><Link href={routes.carDetails}>Mercedes-benz Convertible</Link></h5>
                                                            <span className="badge badge-secondary badge-sm d-flex align-items-center">Sedan</span>
                                                        </div>
                                                        <p className="d-flex align-items-center"><i className="isax isax-location5 me-2"></i>Princes Street, Edinburgh</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" className="avatar avatar-sm flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/users/user-11.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.0</span>
                                                            <p className="fs-14">(380 Reviews)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="fs-14 mb-3">Sleek and stylish, this car offers a blend of performance and luxury, with cutting-edge technology and a comfortable interior</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 me-1">
                                                    <div className="p-2 border rounded d-inline-flex align-items-center">
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-gas-station me-1"></i>
                                                                Fuel :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Petrol</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-kanban me-1"></i>
                                                                Gear :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Auto</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-routing-2 me-1"></i>
                                                                Travelled :
                                                            </span>
                                                            <p className="fs-14 fw-medium">10,000 KM</p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-primary text-md-end text-nowrap">$400 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car List */}

                                        {/* Car List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-10.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-12.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-13.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-14.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item">
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className="fav-icon">
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div className="">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h5 className="text-truncate border-end pe-2 me-2"><Link href={routes.carDetails}>BMW 3.0 Gran Turismo</Link></h5>
                                                            <span className="badge badge-secondary badge-sm d-flex align-items-center">Sedan</span>
                                                        </div>
                                                        <p className="d-flex align-items-center"><i className="isax isax-location5 me-2"></i>King’s Road, Chelsea</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" className="avatar avatar-sm flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/users/user-12.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.3</span>
                                                            <p className="fs-14">(300 Reviews)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="fs-14 mb-3">Reliable and fuel-efficient, perfect for daily commutes or long drives, this car is designed for both convenience and economy.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 me-1">
                                                    <div className="p-2 border rounded d-inline-flex align-items-center">
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-gas-station me-1"></i>
                                                                Fuel :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Petrol</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-kanban me-1"></i>
                                                                Gear :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Manual</p>
                                                        </div>
                                                        <div className="d-flex flex-wrap">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-routing-2 me-1"></i>
                                                                Travelled :
                                                            </span>
                                                            <p className="fs-14 fw-medium">12,800 KM</p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-primary text-md-end text-nowrap">$500 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car List */}
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
                                                            <h4 className="text-primary me-1">
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

            <CarFilterModal />
        </>
    )
}

export default CarMap