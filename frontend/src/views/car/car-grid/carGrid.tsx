"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import CarSearch from '../carSearch';
import AppSwiper from '../../../components/app-swiper'
import CarFilter from '../carFilter';

const CarGrid = () => {


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
            label: 'Car',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Car',
            active: false,
        },
        {
            label: 'Car Grid',
            active: true,
        },
    ];

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
                                        <Link href={routes.carGrid} className="list-icon active me-2"><i className="isax isax-grid-1"></i></Link>
                                        <Link href={routes.carList} className="list-icon me-2"><i className="isax isax-firstline"></i></Link>
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
                            <div className="row justify-content-center">

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
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
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-08.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Toyota Camry SE 400</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Hybrid</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Manual</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">14,000 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$500 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">5.0</span>
                                                        <p className="fs-14">(400 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            
                                                <AppSwiper preset="img-slider">
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
                                                            <ImageWithBasePath src="assets/img/cars/car-09.jpg" className="img-fluid" alt="img" />
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
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-09.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Ford Mustang 4.0 AT</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Oxford Street, London</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Diesel</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Manual</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">10,300 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$600 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.7</span>
                                                        <p className="fs-14">(300 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            
                                                <AppSwiper preset="img-slider">
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-08.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-09.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-10.jpg" className="img-fluid" alt="img" />
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
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-10.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Ferrari 458 MM Special</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Princes Street, Edinburgh</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Hybrid</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Auto</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">13,000 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$300 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.0</span>
                                                        <p className="fs-14">(320 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            
                                                <AppSwiper preset="img-slider">
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-09.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-10.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
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
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-11.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Mercedes-benz Convertible</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Princes Street, Edinburgh</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Hybrid</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Auto</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">10,000 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$400 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.0</span>
                                                        <p className="fs-14">(380 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            
                                                <AppSwiper preset="img-slider">
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-10.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-12.jpg" className="img-fluid" alt="img" />
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
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-12.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>BMW 3.0 Gran Turismo</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>King’s Road, Chelsea</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Petrol</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Manual</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">12,800 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$550 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.3</span>
                                                        <p className="fs-14">(300 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            
                                                <AppSwiper preset="img-slider">
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
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
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-13.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Infiniti QX60 </Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Bold Street, Liverpool</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Diesel</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Auto</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">13,500 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$450 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.1</span>
                                                        <p className="fs-14">(450 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
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
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-14.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Toyota 86 Sports</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Broad Street, Bristol</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Hybrid</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Auto</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">15,000 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$350 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.6</span>
                                                        <p className="fs-14">(520 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            
                                                <AppSwiper preset="img-slider">
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
                                                            <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                </AppSwiper>
                                            <div className="fav-item" key={8} onClick={() => handleItemClick(8)}>
                                                <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                    <i className="isax isax-arrange-square"></i>
                                                </Link>
                                                <Link href="#" className={`fav-icon ${selectedItems[8] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                            </div>

                                        </div>
                                        <div className="place-content">
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-15.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Jeep Wrangler</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Chapel Street, Salford</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Diesel</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Manual</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">10,300 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$700 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.2</span>
                                                        <p className="fs-14">(360 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

                                {/* Car Grid */}
                                <div className="col-xxl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            
                                                <AppSwiper preset="img-slider">
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-14.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-11.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link href={routes.carDetails}>
                                                            <ImageWithBasePath src="assets/img/cars/car-12.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                </AppSwiper>
                                            <div className="fav-item" key={9} onClick={() => handleItemClick(9)}>
                                                <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                    <i className="isax isax-arrange-square"></i>
                                                </Link>
                                                <Link href="#" className={`fav-icon ${selectedItems[9] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                            </div>

                                        </div>
                                        <div className="place-content">
                                            <Link href="#" className="avatar avatar-md ms-3 car-avatar-image">
                                                <ImageWithBasePath src="assets/img/users/user-16.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <span className="badge badge-secondary  fs-10 fw-medium me-1">Sedan</span>
                                                </div>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link href={routes.carDetails}>Jaguar XK</Link></h5>
                                            <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Castle Street, Cambridge</p>
                                            <div className="mb-3 p-2 border rounded">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                                        <p className="text-dark fs-14">Petrol</p>
                                                    </div>
                                                    <div className="col border-end">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                                        <p className="text-dark fs-14">Auto</p>
                                                    </div>
                                                    <div className="col">
                                                        <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                                        <p className="text-dark fs-14">13,800 KM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <div className="d-flex flex-wrap align-items-center me-2">
                                                    <h5 className="text-primary">$650 <span className="fs-14 text-gray-6 fw-normal">/ day</span></h5>

                                                </div>
                                                <div className="ms-2 d-flex align-items-center">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">4.8</span>
                                                        <p className="fs-14">(500 Reviews)</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Car Grid */}

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

export default CarGrid