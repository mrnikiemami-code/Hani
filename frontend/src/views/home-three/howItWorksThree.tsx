"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import CountUp from 'react-countup';
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';

const HowItWorksThree = () => {

        const routes = all_routes

  return (
    <>
        {/* Location Section */}
        <section className="section location-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-10 text-center aos" data-aos="fade-up">
                    <div className="section-header text-center">
                        <span className="car-icon mb-1">
							<ImageWithBasePath src="assets/img/icons/car-icon.svg" alt="img" />
						</span>
                        <h2 className="mb-2">Popular Locations</h2>
                        <p className="sub-title">Discover the most popular locations for car rentals and find the perfect destinations to suit your travel needs.</p>
                    </div>
                </div>
            </div>

            {/* Location Slider */}
            
            <AppSwiper preset="location-slider" className="categories-slider-six">
                <div className="location-item">
                    <Link href={routes.carGrid} className="location-img">
                        <ImageWithBasePath src="assets/img/destination/destination-35.jpg" alt="img" />
                        <div className="location-name">
                            <h5 className="mb-1">Indonesia</h5>
                            <p>(Jakarta)</p>
                        </div>
                    </Link>
                    <div className="location-info d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="fw-medium mb-1">28 Cars</h6>
                            <p className="fs-14">Starts From <span className="text-primary">$200</span></p>
                        </div>
                        <Link href={routes.carGrid} className="location-view"><i className="isax isax-arrow-right-3"></i></Link>
                    </div>
                </div>
                <div className="location-item">
                    <Link href={routes.carGrid} className="location-img">
                        <ImageWithBasePath src="assets/img/destination/destination-36.jpg" alt="img" />
                        <div className="location-name">
                            <h5 className="mb-1">Romania</h5>
                            <p>(Bucharest)</p>
                        </div>
                    </Link>
                    <div className="location-info d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="fw-medium mb-1">60 Cars</h6>
                            <p className="fs-14">Starts From <span className="text-primary">$300</span></p>
                        </div>
                        <Link href={routes.carGrid} className="location-view"><i className="isax isax-arrow-right-3"></i></Link>
                    </div>
                </div>
                <div className="location-item">
                    <Link href={routes.carGrid} className="location-img">
                        <ImageWithBasePath src="assets/img/destination/destination-37.jpg" alt="img" />
                        <div className="location-name">
                            <h5 className="mb-1">India</h5>
                            <p>(Mumbai)</p>
                        </div>
                    </Link>
                    <div className="location-info d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="fw-medium mb-1">50 Cars</h6>
                            <p className="fs-14">Starts From <span className="text-primary">$250</span></p>
                        </div>
                        <Link href={routes.carGrid} className="location-view"><i className="isax isax-arrow-right-3"></i></Link>
                    </div>
                </div>
                <div className="location-item">
                    <Link href={routes.carGrid} className="location-img">
                        <ImageWithBasePath src="assets/img/destination/destination-38.jpg" alt="img" />
                        <div className="location-name">
                            <h5 className="mb-1">Denmark</h5>
                            <p>(Copenhagen)</p>
                        </div>
                    </Link>
                    <div className="location-info d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="fw-medium mb-1">67 Cars</h6>
                            <p className="fs-14">Starts From <span className="text-primary">$400</span></p>
                        </div>
                        <Link href={routes.carGrid} className="location-view"><i className="isax isax-arrow-right-3"></i></Link>
                    </div>
                </div>
                <div className="location-item">
                    <Link href={routes.carGrid} className="location-img">
                        <ImageWithBasePath src="assets/img/destination/destination-39.jpg" alt="img" />
                        <div className="location-name">
                            <h5 className="mb-1">Belgium</h5>
                            <p>(Brussels)</p>
                        </div>
                    </Link>
                    <div className="location-info d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="fw-medium mb-1">45 Cars</h6>
                            <p className="fs-14">Starts From <span className="text-primary">$150</span></p>
                        </div>
                        <Link href={routes.carGrid} className="location-view"><i className="isax isax-arrow-right-3"></i></Link>
                    </div>
                </div>
                <div className="location-item">
                    <Link href={routes.carGrid} className="location-img">
                        <ImageWithBasePath src="assets/img/destination/destination-37.jpg" alt="img" />
                        <div className="location-name">
                            <h5 className="mb-1">Indonesia</h5>
                            <p>(Jakarta)</p>
                        </div>
                    </Link>
                    <div className="location-info d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="fw-medium mb-1">12 Cars</h6>
                            <p className="fs-14">Starts From <span className="text-primary">$230</span></p>
                        </div>
                        <Link href={routes.carGrid} className="location-view"><i className="isax isax-arrow-right-3"></i></Link>
                    </div>
                </div>
                </AppSwiper>
            {/* /Location Slider */}

        </div>
    </section>
    {/* /Location Section */}

    {/* Feedback Section */}
    <section className="feeback-section">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="rating-feedback aos" data-aos="fade-up">
                        <div className="bg-div">
                            <ImageWithBasePath src="assets/img/bg/bg-02.png" className="bg-2" alt="img" />
                        </div>
                        <ul>
                            <li>
                                <h6><i className="isax isax-global5 me-2"></i>Destinations Worldwide</h6>
                                <h4><span className="counter"><CountUp end={50} /></span>+</h4>
                            </li>
                            <li>
                                <h6><i className="isax isax-calendar-2  me-2"></i>Booking Completed</h6>
                                <h4><span className="counter"><CountUp end={7000} /></span> +</h4>
                            </li>
                            <li>
                                <h6><i className="isax isax-tag-user5 me-2"></i>Client Globally</h6>
                                <h4><span className="counter"><CountUp end={100} /></span> +</h4>
                            </li>
                            <li>
                                <h6><i className="isax isax-status-up5 me-2"></i>Providers Registered</h6>
                                <h4><span className="counter"><CountUp end={89} /></span> +</h4>
                            </li>
                        </ul>
                        <div className="bg-div">
                            <ImageWithBasePath src="assets/img/bg/bg-01.png" className="bg-1" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* /Feedback Section */}
    </>
  )
}

export default HowItWorksThree