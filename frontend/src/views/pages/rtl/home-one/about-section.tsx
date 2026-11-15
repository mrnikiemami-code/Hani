"use client";

import Link from "next/link";
import CountUp from 'react-countup'
import ImageWithBasePath from '../../../../components/image-with-base-path'
import { all_routes } from '../../../../routes/all_routes'
const AboutSection = () => {

    const routes = all_routes

  return (
    <>
        {/* About Section */}
        <section className="section about-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="about-image mb-4 mb-lg-0">
                            <div className="about-listing">
                                <i className="isax isax-calendar-add text-white mb-2"></i>
                                <h6 className="fs-16 mb-3 text-white">All Listings</h6>
                                <div className="listing-img">
                                    <div>
                                        <ImageWithBasePath src="assets/img/icons/listing.svg" alt="icon" />
                                    </div>
                                    <Link href={routes.addHotel} className="btn btn-warning text-gray-9">Add You Listings</Link>
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
                                <Link href={routes.userWallet} className="btn btn-teal btn-sm fw-normal me-4">Withdraw</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-content">
                            <h6 className="text-primary fs-14 fw-medium mb-2">About DreamsTour</h6>
                            <h2 className="display-6 mb-2">Explore Beyond the Horizon: Discover the World’s Wonders</h2>
                            <p className="mb-4">We pride themselves on offering personalized services for high-end clientele, with a commitment to crafting unique and unforgettable travel experiences​</p>
                            <div className="d-flex align-items-center mb-4">
                                <span className="avatar avatar-xl bg-primary rounded-circle flex-shrink-0 ms-3">
                                    <i className="isax isax-map5 fs-24"></i>
                                </span>
                                <p>Clients navigate their journeys, whether for travel or educational purposes, primarily in Canada, the U.S., and the U.K</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="avatar avatar-xl bg-secondary rounded-circle flex-shrink-0 ms-3">
                                    <i className="isax isax-trade5 fs-24 text-gray-9"></i>
                                </span>
                                <p>Provides a range of services from immigration advice to study-abroad support and vacation planning.</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap about-btn gap-2">
                            <Link href={routes.about_us} className="btn btn-white d-flex align-items-center">Learn More<i className="isax isax-arrow-circle-right ms-2"></i></Link>
                            <div className="avatar-list-stacked avatar-group-md ms-2">
                                <span className="avatar avatar-rounded">
                                    <ImageWithBasePath className="border border-white" src="assets/img/users/user-01.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-rounded">
                                    <ImageWithBasePath className="border border-white" src="assets/img/users/user-04.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-rounded">
                                    <ImageWithBasePath src="assets/img/users/user-05.jpg" alt="img" />
                                </span>
                                <span className="avatar avatar-rounded">
                                    <ImageWithBasePath src="assets/img/users/user-06.jpg" alt="img" />
                                </span>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <div className="rating d-flex align-items-center ms-2">
                                        <i className="fa-solid fa-star filled ms-1"></i>
                                        <i className="fa-solid fa-star filled ms-1"></i>
                                        <i className="fa-solid fa-star filled ms-1"></i>
                                        <i className="fa-solid fa-star filled ms-1"></i>
                                        <i className="fa-solid fa-star filled ms-1"></i>
                                        <span className="text-gray-9 fs-14">5.0</span>
                                    </div>
                                </div>
                                <p className="fs-14">2K+ Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="counter-wrap">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item mb-4">
                                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-teal"><i className="isax isax-global5 ms-2"></i>Destinations Worldwide</h6>
                                        <h3 className="display-6"><span className="counter"><CountUp end={50} /></span>+</h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item mb-4">
                                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-purple"><i className="isax isax-calendar-2 ms-2"></i>Booking Completed</h6>
                                        <h3 className="display-6"><span className="counter"><CountUp end={7000} /></span>+</h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item mb-4">
                                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-pink"><i className="isax isax-tag-user5 ms-2"></i>Client Globally</h6>
                                        <h3 className="display-6"><span className="counter"><CountUp end={100} /></span>+</h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item mb-4">
                                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-info"><i className="isax isax-status-up5 ms-2"></i>Providers Registered</h6>
                                        <h3 className="display-6"><span className="counter"><CountUp end={89} /></span>+</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-bg">
                    <ImageWithBasePath src="assets/img/bg/about-bg.png" alt="img" className="about-bg-01" />
                    <ImageWithBasePath src="assets/img/bg/about-bg-01.svg" alt="img" className="about-bg-02" />
                </div>
            </div>
        </section>
        {/* /About Section */}
    </>
  )
}

export default AboutSection