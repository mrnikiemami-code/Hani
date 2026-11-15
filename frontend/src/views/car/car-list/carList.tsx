"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import CarSearch from '../carSearch';
import AppSwiper from '../../../components/app-swiper'
import CarFilter from '../carFilter';

const CarList = () => {
    const routes = all_routes

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
            <Breadcrumb title="Car" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-03" />
            {/* Page Wrapper */}
            <div className="content">
                <div className="container">

                    <CarSearch />



                    <div className="row">

                        <CarFilter />

                        <div className="col-xl-9 col-lg-8">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-3">1920 Cars Found on Your Search</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="list-item d-flex align-items-center mb-3">
                                        <Link href={routes.carGrid} className="list-icon me-2"><i className="isax isax-grid-1"></i></Link>
                                        <Link href={routes.carList} className="list-icon active me-2"><i className="isax isax-firstline"></i></Link>
                                        <Link href={routes.carMap} className="list-icon me-2"><i className="isax isax-map-1"></i></Link>
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
                                                <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
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
                                                <div className="fav-item" key={2} onClick={() => handleItemClick(2)}>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
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
                                                <div className="fav-item" key={3} onClick={() => handleItemClick(3)}>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
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
                                                <div className="fav-item" key={4} onClick={() => handleItemClick(4)}>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[4] ? 'selected' : ''}`}>
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
                                                <div className="fav-item" key={5} onClick={() => handleItemClick(5)}>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[5] ? 'selected' : ''}`}>
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

                                        {/* Car List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
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
                                                                <ImageWithBasePath src="assets/img/cars/car-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={6} onClick={() => handleItemClick(6)}>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[6] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div className="">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h5 className="text-truncate border-end pe-2 me-2"><Link href={routes.carDetails}>Infiniti QX60 </Link></h5>
                                                            <span className="badge badge-secondary badge-sm d-flex align-items-center">Sedan</span>
                                                        </div>
                                                        <p className="d-flex align-items-center"><i className="isax isax-location5 me-2"></i>Bold Street, Liverpool</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" className="avatar avatar-sm flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/users/user-13.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.1</span>
                                                            <p className="fs-14">(450 Reviews)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="fs-14 mb-3">Spacious and versatile, this car is ideal for families, offering advanced safety features and a roomy interior for maximum comfort.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 me-1">
                                                    <div className="p-2 border rounded d-inline-flex align-items-center">
                                                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                                                            <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap me-1">
                                                                <i className="isax isax-gas-station me-1"></i>
                                                                Fuel :
                                                            </span>
                                                            <p className="fs-14 fw-medium">Diesel</p>
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
                                                            <p className="fs-14 fw-medium">13,500 KM</p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-primary text-md-end text-nowrap">$450 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>
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
                                                        <div className="slide-images">
                                                            <Link href={routes.carDetails}>
                                                                <ImageWithBasePath src="assets/img/cars/car-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={7} onClick={() => handleItemClick(7)}>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[7] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div className="">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h5 className="text-truncate border-end pe-2 me-2"><Link href={routes.carDetails}>Toyota 86 Sports</Link></h5>
                                                            <span className="badge badge-secondary badge-sm d-flex align-items-center">Sedan</span>
                                                        </div>
                                                        <p className="d-flex align-items-center"><i className="isax isax-location5 me-2"></i>Bold Street, Liverpool</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" className="avatar avatar-sm flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/users/user-14.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.6</span>
                                                            <p className="fs-14">(520 Reviews)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="fs-14 mb-3">Compact and efficient, perfect for city driving, this car boasts excellent fuel economy and easy maneuverability.</p>
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
                                                            <p className="fs-14 fw-medium">15,000 KM</p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-primary text-md-end text-nowrap">$350 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car List */}


                                    </div>

                                </div>

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
            {/* /Page Wrapper */}
        </>
    )
}

export default CarList