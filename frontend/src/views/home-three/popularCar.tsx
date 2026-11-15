"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';

const PopularCar = () => {

    const routes = all_routes


  return (
    <>
    {/* Place Section */}
    <section className="section place-section bg-white">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-10 text-center aos"data-aos="fade-up">
                    <div className="section-header text-center">
                        <span className="car-icon mb-1">
                            <ImageWithBasePath src="assets/img/icons/car-icon.svg" alt="img" />
                        </span>
                        <h2 className="mb-2">Popular Cars</h2>
                        <p className="sub-title">Gaining popularity due to advancements in battery technology and growing environmental awareness</p>
                    </div>
                </div>
            </div>

            
            <AppSwiper preset="cars-slider" className="place-slider categories-slider-six">
                {/* Car Item*/}
                <div className="place-item mb-4 flex-fill">
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
                        <div className="fav-item">
                            <Link href="#" className="fav-icon selected">
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
                        <div className="mb-3 p-2 border rounded d-flex align-items-center justify-content-between">
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                <p className="text-dark fs-14">Hybrid</p>
                            </div>
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                <p className="text-dark fs-14">Manual</p>
                            </div>
                            <div>
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                <p className="text-dark fs-14">14,000 KM</p>
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
                {/* /Car Item*/}

                {/* Car Item*/}
                <div className="place-item mb-4 flex-fill">
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
                        <div className="fav-item">
                            <Link href="#" className="fav-icon">
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
                        <div className="mb-3 p-2 border rounded d-flex align-items-center justify-content-between">
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                <p className="text-dark fs-14">Hybrid</p>
                            </div>
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                <p className="text-dark fs-14">Auto</p>
                            </div>
                            <div>
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                <p className="text-dark fs-14">12,000 KM</p>
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
                {/* /Car Item*/}

                {/* Car Item*/}
                <div className="place-item mb-4 flex-fill">
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
                        <div className="fav-item">
                            <Link href="#" className="fav-icon">
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
                        <div className="mb-3 p-2 border rounded d-flex align-items-center justify-content-between">
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                <p className="text-dark fs-14">Hybrid</p>
                            </div>
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                <p className="text-dark fs-14">Auto</p>
                            </div>
                            <div>
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                <p className="text-dark fs-14">13,000 KM</p>
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
                {/* /Car Item*/}

                {/* Car Item*/}
                <div className="place-item mb-4 flex-fill">
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
                        <div className="fav-item">
                            <Link href="#" className="fav-icon">
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
                        <div className="mb-3 p-2 border rounded d-flex align-items-center justify-content-between">
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                <p className="text-dark fs-14">Petrol</p>
                            </div>
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                <p className="text-dark fs-14">Manual</p>
                            </div>
                            <div>
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                <p className="text-dark fs-14">12,800 KM</p>
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
                {/* /Car Item*/}

                {/* Car Item*/}
                <div className="place-item mb-4 flex-fill">
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
                        <div className="fav-item">
                            <Link href="#" className="fav-icon">
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
                        <div className="mb-3 p-2 border rounded d-flex align-items-center justify-content-between">
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-gas-station me-1"></i>Fuel</span>
                                <p className="text-dark fs-14">Diesel</p>
                            </div>
                            <div className="pe-4 border-end">
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-kanban me-1"></i>Gear</span>
                                <p className="text-dark fs-14">Auto</p>
                            </div>
                            <div>
                                <span className="fs-14 d-flex align-items-center text-dark"><i className="isax isax-routing-2 me-1"></i>Travelled</span>
                                <p className="text-dark fs-14">13,500 KM</p>
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
                {/* /Car Item*/}
            </AppSwiper>
        </div>
    </section>
    {/* /Place Section */}

    {/* Work Section */}
    <section className="section work-section-three bg-light-200">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-12 text-center aos" data-aos="fade-up">
                    <div className="section-header text-center">
                        <span className="car-icon mb-1">
                            <ImageWithBasePath src="assets/img/icons/car-icon.svg" alt="img" />
                        </span>
                        <h2 className="mb-2">How it Works</h2>
                        <p className="sub-title">Here’s a simple breakdown of how our services work</p>
                    </div>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-xxl-3 col-lg-4">
                    <div className="d-flex align-items-center flex-lg-row-reverse work-item gap-3 aos "data-aos="fade-up">
                        <span className="avatar avatar-lg flex-shrink-0 rounded-circle bg-primary">
                            <i className="isax isax-additem5 fs-24"></i>
                        </span>
                        <div className="text-lg-end">
                            <h6 className="fw-medium text-default mb-1">Step 1</h6>
                            <h5 className="mb-1">Choose a Rental Service</h5>
                            <p>Select a car rental company (like Hertz, Enterprise, or Budget).</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-lg-row-reverse work-item gap-3 aos" data-aos="fade-up">
                        <span className="avatar avatar-lg flex-shrink-0 rounded-circle bg-primary">
                            <i className="isax isax-calendar-search5 fs-24"></i>
                        </span>
                        <div className="text-lg-end">
                            <h6 className="fw-medium text-default mb-1">Step 2</h6>
                            <h5 className="mb-1">Select Dates and Location</h5>
                            <p>Enter your pick-up and drop-off dates and locations.</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-lg-row-reverse work-item gap-3 aos" data-aos="fade-up">
                        <span className="avatar avatar-lg flex-shrink-0 rounded-circle bg-primary">
                            <i className="isax isax-car5 fs-24"></i>
                        </span>
                        <div className="text-lg-end">
                            <h6 className="fw-medium text-default mb-1">Step 3</h6>
                            <h5 className="mb-1">Choose a Vehicle</h5>
                            <p>Browse available cars based on your needs (size, type, etc.).</p>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-6 col-lg-4 d-none d-lg-flex">
                    <div className="text-center flex-fill d-flex align-items-center justify-content-center aos" data-aos="fade-up">
                        <div className="work-img">
                            <ImageWithBasePath src="assets/img/cars/work-img.png" alt="img" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-lg-4">
                    <div className="d-flex align-items-center work-item gap-3 aos" data-aos="fade-up">
                        <span className="avatar avatar-lg flex-shrink-0 rounded-circle bg-primary">
                            <i className="isax isax-add5 fs-24"></i>
                        </span>
                        <div>
                            <h6 className="fw-medium text-default mb-1">Step 4</h6>
                            <h5 className="mb-1">Add Extras</h5>
                            <p>Consider adding insurance, GPS, or child seats if needed.</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center work-item gap-3 aos" data-aos="fade-up">
                        <span className="avatar avatar-lg flex-shrink-0 rounded-circle bg-primary">
                            <i className="isax isax-user-edit fs-24"></i>
                        </span>
                        <div>
                            <h6 className="fw-medium text-default mb-1">Step 5</h6>
                            <h5 className="mb-1">Information</h5>
                            <p>Fill in your personal details, such as name, contact info & payment </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center work-item gap-3 aos" data-aos="fade-up">
                        <span className="avatar avatar-lg flex-shrink-0 rounded-circle bg-primary">
                            <i className="isax isax-tick-circle5 fs-24"></i>
                        </span>
                        <div>
                            <h6 className="fw-medium text-default mb-1">Step 6</h6>
                            <h5 className="mb-1">Confirm Booking</h5>
                            <p>Review the terms and finalize your reservation. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* /Work Section */}
    </>
  )
}

export default PopularCar