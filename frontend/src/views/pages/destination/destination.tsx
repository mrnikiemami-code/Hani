"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';

const Destination = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Destinations',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Destinations',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb
                title="Destinations"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-01"
            />
            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-01.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Turkey</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">452 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-02.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Thailand</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">400 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-03.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Australia</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">400 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-04.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Brazil</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">422 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-40.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Azerbaijan</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">340 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-41.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Russia</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">410 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-42.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Indonesia</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">280 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-43.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Belgium </h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">380 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-44.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Denmark</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">460 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-45.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Germany</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">370 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-46.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Canada</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">550 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                {/* Destination Item*/}
                                <div className="destination-item wow fadeInUp" data-wow-delay="0.2s">
                                    <ImageWithBasePath src="assets/img/destination/destination-47.jpg" alt="img" />
                                    <div className="destination-info text-center">
                                        <div className="destination-content">
                                            <h5 className="mb-1 text-white">Japan</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="rating d-flex align-items-center me-2">
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled me-1" />
                                                    <i className="fa-solid fa-star filled" />
                                                </div>
                                                <p className="fs-14 text-white">580 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="destination-overlay bg-white mt-2">
                                            <div className="d-flex">
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-indigo">
                                                            <i className="isax isax-airplane" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">21 Flights</h6>
                                                    </div>
                                                </div>
                                                <div className="col border-end">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-cyan">
                                                            <i className="isax isax-buildings" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">15 Hotels</h6>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="count-info text-center">
                                                        <span className="d-block mb-1 text-success">
                                                            <i className="isax isax-ship" />
                                                        </span>
                                                        <h6 className="fs-13 fw-medium">06 Cruises</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Destination Item*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>

        </div>
    )
}

export default Destination
