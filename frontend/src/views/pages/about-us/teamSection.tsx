"use client";

import ImageWithBasePath from '../../../components/image-with-base-path'
import Link from "next/link";
import { all_routes } from '../../../routes/all_routes'

const TeamSection = () => {

    const routes = all_routes

    return (
        <>
            {/* Our Team */}
            <section className="section team-section">
                <div className="container">
                    <div>
                        <div className="row justify-content-center">
                            <div className="col-md-7 d-flex justify-content-center">
                                <div className="header-section text-center">
                                    <h2 className="mb-2">
                                        Our <span className="text-primary">Team</span>
                                    </h2>
                                    <p className="fs-16 text-gray-6">
                                        We’re a team of explorers, innovators, and customer-focused
                                        professionals who are passionate about making travel easy and
                                        accessible for everyone.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                {/* Team Item*/}
                                <div className="team-item wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="card">
                                        <div className="card-body">
                                            <ImageWithBasePath
                                                src="assets/img/users/user-17.jpg"
                                                alt="Img"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="team-overlay ">
                                            <div className="bg-white py-2 px-3  rounded-pill  text-center">
                                                <h5>James Parker</h5>
                                                <p className="fs-16 text-gray-6">Chief Executive Officer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Team Item*/}
                            </div>
                            <div className="col-xl-3 col-md-6">
                                {/* Team Item*/}
                                <div className="team-item wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="card">
                                        <div className="card-body">
                                            <ImageWithBasePath
                                                src="assets/img/users/user-18.jpg"
                                                alt="Img"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="team-overlay">
                                            <div className="bg-white py-2 px-3 rounded-pill  text-center">
                                                <h5>Morgan Owen</h5>
                                                <p className="fs-16 text-gray-6">
                                                    Chief Operations Officer
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Team Item*/}
                            </div>
                            <div className="col-xl-3 col-md-6">
                                {/* Team Item*/}
                                <div className="team-item wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="card">
                                        <div className="card-body">
                                            <ImageWithBasePath
                                                src="assets/img/users/user-19.jpg"
                                                alt="Img"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="team-overlay">
                                            <div className="bg-white py-2 px-3 rounded-pill  text-center">
                                                <h5>Richard Dolen</h5>
                                                <p className="fs-16 text-gray-6">Chief Marketing Officer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Team Item*/}
                            </div>
                            <div className="col-xl-3 col-md-6">
                                {/* Team Item*/}
                                <div className="team-item wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="card">
                                        <div className="card-body">
                                            <ImageWithBasePath
                                                src="assets/img/users/user-20.jpg"
                                                alt="Img"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="team-overlay">
                                            <div className="bg-white py-2 px-3 rounded-pill  text-center">
                                                <h5>Linday Brookins</h5>
                                                <p className="fs-16 text-gray-6">Technology Officer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Team Item*/}
                            </div>
                        </div>
                        <div className="text-center view-all wow fadeInUp">
                            <Link href={routes.teams} className="btn btn-dark">
                                View All Experts
                                <i className="isax isax-arrow-right-3 ms-2" />
                            </Link>
                        </div>
                        <div className="col-md-12">
                            <div className="counter-wrap">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <div className="counter-item mb-4">
                                            <h6 className="mb-1 d-flex align-items-center justify-content-center text-teal">
                                                <i className="isax isax-global5 me-2" />
                                                Destinations Worldwide
                                            </h6>
                                            <h3 className="display-6">
                                                <span className="counter">50</span>+
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="counter-item mb-4">
                                            <h6 className="mb-1 d-flex align-items-center justify-content-center text-purple">
                                                <i className="isax isax-calendar-2 me-2" />
                                                Booking Completed
                                            </h6>
                                            <h3 className="display-6">
                                                <span className="counter">7000</span>+
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="counter-item mb-4">
                                            <h6 className="mb-1 d-flex align-items-center justify-content-center text-pink">
                                                <i className="isax isax-tag-user5 me-2" />
                                                Client Globally
                                            </h6>
                                            <h3 className="display-6">
                                                <span className="counter">100</span>+
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="counter-item mb-4">
                                            <h6 className="mb-1 d-flex align-items-center justify-content-center text-info">
                                                <i className="isax isax-status-up5 me-2" />
                                                Providers Registered
                                            </h6>
                                            <h3 className="display-6">
                                                <span className="counter">89</span>+
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-bg">
                        <ImageWithBasePath
                            src="assets/img/bg/about-bg-01.svg"
                            alt="img"
                            className="about-bg-02"
                        />
                    </div>
                </div>
            </section>
            {/* /Our Team */}
        </>

    )
}

export default TeamSection
