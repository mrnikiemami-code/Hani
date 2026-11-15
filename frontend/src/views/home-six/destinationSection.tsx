"use client";

import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path';
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';

const DestinationSection = () => {

    const routes = all_routes

    return (
        <>
            {/* Destination Section */}
            <section className="section destination-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 aos" data-aos="fade-up">
                            <div className="section-header-six">
                                <span className="badge badge-soft-primary rounded-pill mb-1">
                                    Featured Categories
                                </span>
                                <h2>
                                    Travelers &amp; Preferences<span className="text-primary">.</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-end">
                                <Link href={routes.tourGrid} className="btn btn-dark sec-head-btn">
                                    View All Categories
                                    <i className="isax isax-arrow-right-3 ms-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                        <AppSwiper preset="categories-slider-six">
                            <div className="categories-card aos" data-aos="fade-up">
                                <Link href={routes.tourGrid}>
                                    <ImageWithBasePath src="assets/img/tours/tours-30.jpg" alt="Img" />
                                </Link>
                                <div className="cat-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="text-white mb-1">Ecotourism</h5>
                                        <span className="text-white">25 Tours</span>
                                    </div>
                                    <Link href={routes.tourGrid} className="loc-view-bottom">
                                        <i className="isax isax-arrow-right-1" />
                                    </Link>
                                </div>
                            </div>
                            <div className="categories-card aos" data-aos="fade-up">
                                <Link href={routes.tourGrid}>
                                    <ImageWithBasePath src="assets/img/tours/tours-31.jpg" alt="Img" />
                                </Link>
                                <div className="cat-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="text-white mb-1">Adventure Tour</h5>
                                        <span className="text-white">47 Tours</span>
                                    </div>
                                    <Link href={routes.tourGrid} className="loc-view-bottom">
                                        <i className="isax isax-arrow-right-1" />
                                    </Link>
                                </div>
                            </div>
                            <div className="categories-card aos"data-aos="fade-up">
                                <Link href={routes.tourGrid}>
                                    <ImageWithBasePath src="assets/img/tours/tours-32.jpg" alt="Img" />
                                </Link>
                                <div className="cat-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="text-white mb-1">Group Tours</h5>
                                        <span className="text-white">38 Tours</span>
                                    </div>
                                    <Link href={routes.tourGrid} className="loc-view-bottom">
                                        <i className="isax isax-arrow-right-1" />
                                    </Link>
                                </div>
                            </div>
                            <div className="categories-card aos" data-aos="fade-up">
                                <Link href={routes.tourGrid}>
                                    <ImageWithBasePath src="assets/img/tours/tours-33.jpg" alt="Img" />
                                </Link>
                                <div className="cat-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="text-white mb-1">Beach Tours</h5>
                                        <span className="text-white">54 Tours</span>
                                    </div>
                                    <Link href={routes.tourGrid} className="loc-view-bottom">
                                        <i className="isax isax-arrow-right-1" />
                                    </Link>
                                </div>
                            </div>
                            <div className="categories-card aos" data-aos="fade-up">
                                <Link href={routes.tourGrid}>
                                    <ImageWithBasePath src="assets/img/tours/tours-34.jpg" alt="Img" />
                                </Link>
                                <div className="cat-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="text-white mb-1">Honey Moon</h5>
                                        <span className="text-white">22 Tours</span>
                                    </div>
                                    <Link href={routes.tourGrid} className="loc-view-bottom">
                                        <i className="isax isax-arrow-right-1" />
                                    </Link>
                                </div>
                            </div>
                            <div className="categories-card aos " data-aos="fade-up">
                                <Link href={routes.tourGrid}>
                                    <ImageWithBasePath src="assets/img/tours/tours-30.jpg" alt="Img" />
                                </Link>
                                <div className="cat-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="text-white mb-1">Ecotourism</h5>
                                        <span className="text-white">25 Tours</span>
                                    </div>
                                    <Link href={routes.tourGrid} className="loc-view-bottom">
                                        <i className="isax isax-arrow-right-1" />
                                    </Link>
                                </div>
                            </div>
                            <div className="categories-card aos" data-aos="fade-up">
                                <Link href={routes.tourGrid}>
                                    <ImageWithBasePath src="assets/img/tours/tours-31.jpg" alt="Img" />
                                </Link>
                                <div className="cat-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="text-white mb-1">Adventure Tour</h5>
                                        <span className="text-white">47 Tours</span>
                                    </div>
                                    <Link href={routes.tourGrid} className="loc-view-bottom">
                                        <i className="isax isax-arrow-right-1" />
                                    </Link>
                                </div>
                            </div>
                        </AppSwiper>
                </div>
            </section>
            {/* /Destination Section */}
        </>

    )
}

export default DestinationSection
