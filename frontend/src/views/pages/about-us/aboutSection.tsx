"use client";

import ImageWithBasePath from '../../../components/image-with-base-path'
import Link from "next/link";
import { all_routes } from '../../../routes/all_routes'

const AboutSection = () => {
 const routes = all_routes

    return (
        <>
            {/* About Section */}
            <section className="section about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-image mb-4 mb-lg-0">
                                <div className="about-listing">
                                    <i className="isax isax-calendar-add text-white mb-2" />
                                    <h6 className="fs-16 mb-3 text-white">All Listings</h6>
                                    <div className="listing-img">
                                        <div>
                                            <ImageWithBasePath src="assets/img/icons/listing.svg" alt="icon" />
                                        </div>
                                        <Link
                                            href={routes.addHotel}
                                            className="btn btn-warning text-gray-9"
                                        >
                                            Add You Listings
                                        </Link>
                                    </div>
                                </div>
                                <div className="about-img">
                                    <ImageWithBasePath src="assets/img/about.png" alt="about" />
                                </div>
                                <div className="about-progress d-inline-flex align-items-center">
                                    <ImageWithBasePath src="assets/img/icons/progress-icon.svg" alt="icon" />
                                    <div className="ms-2">
                                        <p className="fs-10 mb-1">Today’s Earnings</p>
                                        <h6 className="fs-13">$2500</h6>
                                    </div>
                                    <Link
                                        href={routes.userWallet}
                                        className="btn btn-teal btn-sm fw-normal ms-4"
                                    >
                                        Withdraw
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content mb-4">
                                <h6 className="text-primary fs-14 fw-medium mb-2">
                                    About DreamsTour
                                </h6>
                                <h2 className="display-6 mb-2">
                                    All-in-one platform for unforgettable travel experiences!
                                </h2>
                                <p className="mb-4">
                                    At DreamsTour, we believe that travel should be simple, seamless,
                                    and tailored to your needs. Whether you're dreaming of an exotic
                                    beach getaway, a cultural city tour, or a luxury cruise, we are
                                    here to turn your travel dreams into reality.
                                </p>
                                <div className="d-flex align-items-center mb-4">
                                    <span className="avatar avatar-xl bg-primary rounded-circle flex-shrink-0 me-3">
                                        <i className="isax isax-map5 fs-24" />
                                    </span>
                                    <p>
                                        Clients navigate their journeys, whether for travel or
                                        educational purposes, primarily in Canada, the U.S., and the U.K
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="avatar avatar-xl bg-secondary rounded-circle flex-shrink-0 me-3">
                                        <i className="isax isax-trade5 fs-24 text-gray-9" />
                                    </span>
                                    <p>
                                        Provides a range of services from immigration advice to
                                        study-abroad support and vacation planning.
                                    </p>
                                </div>
                            </div>
                            <div className="about-mission">
                                <h6 className="text-primary fs-14 fw-medium mb-3">Our Mission</h6>
                                <p className="fs-16 text-gray-6">
                                    Our mission is to make travel more accessible, enjoyable, and
                                    hassle-free for everyone. With our range of services
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="about-bg d-none d-md-block">
                        <ImageWithBasePath
                            src="assets/img/bg/about-bg.png"
                            alt="img"
                            className="about-bg-01"
                        />
                    </div>
                    <div className="about-bg-1 d-none d-md-block">
                        <ImageWithBasePath
                            src="assets/img/bg/about-arrow.png"
                            alt="img"
                            className="about-bg-01"
                        />
                    </div>
                </div>
            </section>
            {/* /About Section */}
        </>

    )
}

export default AboutSection
