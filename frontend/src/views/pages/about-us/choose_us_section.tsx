"use client";

import ImageWithBasePath from '../../../components/image-with-base-path'

const ChooseUsSection = () => {
    return (
        <>
            {/* Why Choose Us */}
            <section className="section choose-us-section">
                <div className="container">
                    <div className="choose-title">
                        <h2>
                            Why Choose <span className="text-primary">Us?</span>
                        </h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <div className="choose-card">
                                <div className="choose-icon mb-3">
                                    <span className="rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="isax isax-archive-tick text-white" />
                                    </span>
                                </div>
                                <div className="card-content">
                                    <h6 className="mb-2">Convenience</h6>
                                    <p className="fs-16 text-gray-6">
                                        Plan your entire trip from one platform, saving you time and
                                        effort. No more hopping between different websites .
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="choose-card">
                                <div className="choose-icon mb-3">
                                    <span className="rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="isax isax-dollar-square text-white" />
                                    </span>
                                </div>
                                <div className="card-content">
                                    <h6 className="mb-2">Best Price Guarantee</h6>
                                    <p className="fs-16 text-gray-6">
                                        We work with trusted travel partners to bring you the best
                                        deals, whether you're booking a flight, hotel, or car rental.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="choose-card">
                                <div className="choose-icon mb-3">
                                    <span className="rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="isax isax-headphone text-white" />
                                    </span>
                                </div>
                                <div className="card-content">
                                    <h6 className="mb-2">Customer Support</h6>
                                    <p className="fs-16 text-gray-6">
                                        Our dedicated support team is here for you 24/7, ensuring your
                                        travel plans go smoothly from start to finish.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="choose-card">
                                <div className="choose-icon mb-3">
                                    <span className="rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="isax isax-map text-white" />
                                    </span>
                                </div>
                                <div className="card-content">
                                    <h6 className="mb-2">Tailored Travel Experiences</h6>
                                    <p className="fs-16 text-gray-6">
                                        Whether you're traveling for business, family vacations, or a
                                        solo adventure, we provide options that suit every needs
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="choose-bg-01">
                        <ImageWithBasePath
                            src="assets/img/bg/about-bg-stars-bottom.png"
                            alt="image"
                            className="img-fluid"
                        />
                    </div>
                    <div className="choose-bg-01">
                        <ImageWithBasePath
                            src="assets/img/bg/about-bg-stars-bottom.png"
                            alt="image"
                            className="img-fluid"
                        />
                    </div>
                    <div className="choose-bg-02">
                        <ImageWithBasePath
                            src="assets/img/bg/about-bg-stars-top.png"
                            alt="image"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </section>
            {/* /Why Choose Us */}
        </>

    )
}

export default ChooseUsSection
