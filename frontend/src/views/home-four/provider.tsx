"use client";
import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path';
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';

function Provider() {


    const routes = all_routes





    return (
        <>
            {/* Provider Section */}
            <section className="section experts-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div
                            className="col-xl-5 col-lg-10 text-center aos"
                           data-aos="fade-up"
                        >
                            <div className="section-header section-header-four text-center">
                                <h2 className="mb-2">
                                    <span>Top</span> Rated Providers
                                </h2>
                                <p className="sub-title">
                                    Connecting Needs with Offers for the Professional Services.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                        <AppSwiper preset="experts-slider">
                            {/* Expert Item*/}
                            <div className="flight-expert mb-4">
                                <Link href="#" className="expert-img">
                                    <ImageWithBasePath src="assets/img/provider/provider-01.svg" alt="img" />
                                </Link>
                                <Link href="#" className="fav-icon selected">
                                    <i className="isax isax-heart5" />
                                </Link>
                                <div className="expert-content text-center">
                                    <h5 className="mb-1">
                                        <Link href={routes.flightDetails}>Delta Air Lines</Link>
                                    </h5>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                            4.5
                                        </span>
                                        <p>2000 Reviews</p>
                                    </div>
                                    <div className="d-flex border-top mt-3 pt-3">
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">12+</h6>
                                            <p className="fs-13">Flights</p>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">05+</h6>
                                            <p className="fs-13">Locations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Expert Item*/}
                            {/* Expert Item*/}
                            <div className="flight-expert mb-4">
                                <Link href={routes.flightDetails} className="expert-img">
                                    <ImageWithBasePath src="assets/img/provider/provider-02.svg" alt="img" />
                                </Link>
                                <Link href="#" className="fav-icon">
                                    <i className="isax isax-heart5" />
                                </Link>
                                <div className="expert-content text-center">
                                    <h5 className="mb-1">
                                        <Link href={routes.flightDetails}>Lufthansa</Link>
                                    </h5>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                            4.7
                                        </span>
                                        <p>1500 Reviews</p>
                                    </div>
                                    <div className="d-flex border-top mt-3 pt-3">
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">15+</h6>
                                            <p className="fs-13">Flights</p>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">25+</h6>
                                            <p className="fs-13">Locations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Expert Item*/}
                            {/* Expert Item*/}
                            <div className="flight-expert mb-4">
                                <Link href="#" className="expert-img">
                                    <ImageWithBasePath src="assets/img/provider/provider-03.svg" alt="img" />
                                </Link>
                                <Link href="#" className="fav-icon">
                                    <i className="isax isax-heart5" />
                                </Link>
                                <div className="expert-content text-center">
                                    <h5 className="mb-1">
                                        <Link href={routes.flightDetails}>Etihad Airways</Link>
                                    </h5>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                            4.5
                                        </span>
                                        <p>1000 Reviews</p>
                                    </div>
                                    <div className="d-flex border-top mt-3 pt-3">
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">12+</h6>
                                            <p className="fs-13">Flights</p>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">10+</h6>
                                            <p className="fs-13">Locations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Expert Item*/}
                            {/* Expert Item*/}
                            <div className="flight-expert mb-4">
                                <Link href="#" className="expert-img">
                                    <ImageWithBasePath src="assets/img/provider/provider-01.svg" alt="img" />
                                </Link>
                                <Link href="#" className="fav-icon selected">
                                    <i className="isax isax-heart5" />
                                </Link>
                                <div className="expert-content text-center">
                                    <h5 className="mb-1">
                                        <Link href={routes.flightDetails}>Kuwait Airways</Link>
                                    </h5>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                            4.5
                                        </span>
                                        <p>1500 Reviews</p>
                                    </div>
                                    <div className="d-flex border-top mt-3 pt-3">
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">05+</h6>
                                            <p className="fs-13">Flights</p>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">50+</h6>
                                            <p className="fs-13">Locations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Expert Item*/}
                            {/* Expert Item*/}
                            <div className="flight-expert mb-4">
                                <Link href="#" className="expert-img">
                                    <ImageWithBasePath src="assets/img/provider/provider-01.svg" alt="img" />
                                </Link>
                                <Link href="#" className="fav-icon selected">
                                    <i className="isax isax-heart5" />
                                </Link>
                                <div className="expert-content text-center">
                                    <h5 className="mb-1">
                                        <Link href={routes.flightDetails}>Delta Air Lines</Link>
                                    </h5>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                            4.5
                                        </span>
                                        <p>2000 Reviews</p>
                                    </div>
                                    <div className="d-flex border-top mt-3 pt-3">
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">12+</h6>
                                            <p className="fs-13">Flights</p>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <h6 className="fw-medium">05+</h6>
                                            <p className="fs-13">Locations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Expert Item*/}
                        </AppSwiper>
                    <div className="package-sec">
                        <div className="row justify-content-center g-4">
                            <div
                                className="col-lg-4 col-md-6 d-flex aos"
                               data-aos="fade-up"
                            >
                                <div className="card border-secondary shadow-none bg-secondary-transparent flex-fill mb-0">
                                    <div className="card-body d-flex align-items-center">
                                        <span className="avatar bg-secondary rounded-circle flex-shrink-0">
                                            <i className="isax isax-lock-1 text-gray-9 fs-20" />
                                        </span>
                                        <div className="ms-3">
                                            <h5 className="mb-1">Secure Booking</h5>
                                            <p>
                                                Encrypted payments, instant e-tickets and no hidden card fees.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-4 col-md-6 d-flex aos"
                                data-aos="fade-up"
                            >
                                <div className="card border-purple shadow-none bg-purple-transparent flex-fill mb-0">
                                    <div className="card-body d-flex align-items-center">
                                        <span className="avatar bg-purple rounded-circle flex-shrink-0">
                                            <i className="isax isax-receipt-add fs-20" />
                                        </span>
                                        <div className="ms-3">
                                            <h5 className="mb-1">Flight + Hotel Bundles</h5>
                                            <p>Book flights with a stay and transfer, and save up to 22%.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-4 col-md-6 d-flex aos"
                                data-aos="fade-up"
                            >
                                <div className="card border-teal shadow-none bg-teal-transparent flex-fill mb-0">
                                    <div className="card-body d-flex align-items-center">
                                        <span className="avatar bg-teal rounded-circle flex-shrink-0">
                                            <i className="isax isax-location-tick fs-20" />
                                        </span>
                                        <div className="ms-3">
                                            <h5 className="mb-1">Best Price Guarantee</h5>
                                            <p>Find the same fare cheaper within 24 hours and we refund the difference.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Provider Section */}
        </>

    )
}

export default Provider
