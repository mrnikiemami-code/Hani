"use client";

import ImageWithBasePath from '../../components/image-with-base-path';
import Link from "next/link";
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';

const ProviderSlick = () => {

     const routes = all_routes;


    return (
        <>
            {/* Providers Section */}
            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 aos" data-aos="fade-up">
                            <div className="section-header-six">
                                <span className="badge badge-soft-primary rounded-pill mb-1">
                                    Most Popular Providers
                                </span>
                                <h2>
                                    Try Relaxing Accomodations<span className="text-primary">.</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-end">
                                <Link href={routes.teams} className="btn btn-dark sec-head-btn">
                                    View All Providers
                                    <i className="isax isax-arrow-right-3 ms-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                        <AppSwiper preset="providers-slider">
                            <div className="card">
                                <div className="card-body text-center">
                                    <Link href={routes.tourDetails} className="d-block mb-3">
                                        <ImageWithBasePath
                                            src="assets/img/icons/hotel-logo-02.svg"
                                            className="rounded-circle w-auto m-auto"
                                            alt="Img"
                                        />
                                    </Link>
                                    <h5 className="mb-2">
                                        <Link href={routes.tourDetails}>Mystery Manor</Link>
                                    </h5>
                                    <div className="d-flex align-items-center seperate-dot justify-content-center">
                                        <span>Eco Tours</span>
                                        <span>Ukraine</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                4.9
                                            </span>
                                            <p>(450 Reviews)</p>
                                        </div>
                                        <span className="badge bg-teal">150 Tours</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body text-center">
                                    <Link href={routes.tourDetails} className="d-block mb-3">
                                        <ImageWithBasePath
                                            src="assets/img/icons/hotel-logo-01.svg"
                                            className="rounded-circle w-auto m-auto"
                                            alt="Img"
                                        />
                                    </Link>
                                    <h5 className="mb-2">
                                        <Link href={routes.tourDetails}>Adventure Suites</Link>
                                    </h5>
                                    <div className="d-flex align-items-center seperate-dot justify-content-center">
                                        <span>Beach Tours</span>
                                        <span>Bali</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                4.9
                                            </span>
                                            <p>(350 Reviews)</p>
                                        </div>
                                        <span className="badge bg-teal">145 Tours</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body text-center">
                                    <Link href={routes.tourDetails} className="d-block mb-3">
                                        <ImageWithBasePath
                                            src="assets/img/icons/hotel-logo-03.svg"
                                            className="rounded-circle w-auto m-auto"
                                            alt="Img"
                                        />
                                    </Link>
                                    <h5 className="mb-2">
                                        <Link href={routes.tourDetails}>Harmony Retreat</Link>
                                    </h5>
                                    <div className="d-flex align-items-center seperate-dot justify-content-center">
                                        <span>Honeymoon Tours</span>
                                        <span>Poland</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                4.9
                                            </span>
                                            <p>(120 Reviews)</p>
                                        </div>
                                        <span className="badge bg-teal">221 Tours</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body text-center">
                                    <Link href={routes.tourDetails} className="d-block mb-3">
                                        <ImageWithBasePath
                                            src="assets/img/icons/hotel-logo-04.svg"
                                            className="rounded-circle w-auto m-auto"
                                            alt="Img"
                                        />
                                    </Link>
                                    <h5 className="mb-2">
                                        <Link href={routes.tourDetails}>Tranquil Spa</Link>
                                    </h5>
                                    <div className="d-flex align-items-center seperate-dot justify-content-center">
                                        <span>Adventure Tours</span>
                                        <span>Brazil</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                4.9
                                            </span>
                                            <p>(130 Reviews)</p>
                                        </div>
                                        <span className="badge bg-teal">178 Tours</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body text-center">
                                    <Link href={routes.tourDetails} className="d-block mb-3">
                                        <ImageWithBasePath
                                            src="assets/img/icons/providers-logo.svg"
                                            className="rounded-circle w-auto m-auto"
                                            alt="Img"
                                        />
                                    </Link>
                                    <h5 className="mb-2">
                                        <Link href={routes.tourDetails}>Mystery Manor</Link>
                                    </h5>
                                    <div className="d-flex align-items-center seperate-dot justify-content-center">
                                        <span>Adventure Tours</span>
                                        <span>Brazil</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                4.9
                                            </span>
                                            <p>(130 Reviews)</p>
                                        </div>
                                        <span className="badge bg-teal">178 Tours</span>
                                    </div>
                                </div>
                            </div>
                        </AppSwiper>
                </div>
            </section>
            {/* /Providers Section */}
        </>

    )
}

export default ProviderSlick
