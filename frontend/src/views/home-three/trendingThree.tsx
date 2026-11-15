"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import { all_routes } from '../../routes/all_routes'

const TrendingThree = () => {

    const routes = all_routes;

  return (
    <>
    {/* Support Section */}
    <section className="support-section bg-dark support-section-five support-three">
        <div className="horizontal-slide d-flex" data-direction="left" data-speed="slow">
            <div className="slide-list d-flex">
                <div className="support-item">
                    <h5>Personalized Itineraries</h5>
                </div>
                <div className="support-item">
                    <h5>Comprehensive Planning</h5>
                </div>
                <div className="support-item">
                    <h5>Expert Guidance</h5>
                </div>
                <div className="support-item">
                    <h5>Local Experience</h5>
                </div>
                <div className="support-item">
                    <h5>Customer Support</h5>
                </div>
                <div className="support-item">
                    <h5>Sustainability Efforts</h5>
                </div>
                <div className="support-item">
                    <h5>Multiple Regions</h5>
                </div>
            </div>
        </div>
    </section>
    {/* /Support Section */}

    {/* Category Section */}
    <section className="section">
        <div className="container">

            <div className="row justify-content-center g-4">

                {/* Pick-Up & Drop-Off */}
                <div className="col-lg-4 col-md-6 d-flex">
                    <div className="card border-0 shadow-none pickup-card bg-secondary-100 flex-fill">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5>Flexible Pick-Up & Drop-Off</h5>
                                <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0 ms-3">
									<i className="isax isax-card-coin fs-24"></i>
								</span>
                            </div>
                            <p>Choose locations and times that suit your schedule. Well-maintained, modern vehicles equipped with the latest features.</p>
                        </div>
                    </div>
                </div>
                {/* /Pick-Up & Drop-Off */}

                {/* Business Travel */}
                <div className="col-lg-4 col-md-6 d-flex">
                    <div className="card border-0 shadow-none pickup-card bg-purple-100 flex-fill">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5>Business Travel Solutions</h5>
                                <span className="avatar avatar-lg bg-purple rounded-circle flex-shrink-0 ms-3">
									<i className="isax isax-chart fs-24"></i>
								</span>
                            </div>
                            <p>Special rates and services for businesses, making travel easier for employe.Streamlined invoicing for business rentals.</p>
                        </div>
                    </div>
                </div>
                {/* /Business Travel */}

                {/* Pick-Up & Drop-Off */}
                <div className="col-lg-4 col-md-6 d-flex">
                    <div className="card border-0 shadow-none pickup-card bg-teal-100 flex-fill">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5>Flexible Rental Periods</h5>
                                <span className="avatar avatar-lg bg-teal rounded-circle flex-shrink-0 ms-3">
									<i className="isax isax-coin fs-24"></i>
								</span>
                            </div>
                            <p>Rent by the hour, day, week, or month, depending on your needs. Availability for spontaneous trips or urgent needs.</p>
                        </div>
                    </div>
                </div>
                {/* /Pick-Up & Drop-Off */}

            </div>

            <div className="category-wrapper">

                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-10 text-center aos" data-aos="fade-up">
                        <div className="section-header text-center">
                            <span className="car-icon mb-1">
								<ImageWithBasePath src="assets/img/icons/car-icon.svg" alt="img" />
							</span>
                            <h2 className="mb-2">Trending Categories</h2>
                            <p className="sub-title">Gaining popularity due to advancements in battery technology and growing environmental awareness</p>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 justify-content-center">

                    {/* Category Item*/}
                    <div className="col">
                        <div className="category-wrap aos" data-aos="fade-up">
                            <Link href={routes.carDetails} className="category-img">
                                <ImageWithBasePath src="assets/img/cars/car-01.png" className="img-fluid" alt="img" />
                            </Link>
                            <h6 className="fw-medium"><Link href={routes.carDetails}>Sedan</Link></h6>
                        </div>
                    </div>
                    {/* /Category Item*/}

                    {/* Category Item*/}
                    <div className="col">
                        <div className="category-wrap aos" data-aos="fade-up">
                            <Link href={routes.carDetails} className="category-img">
                                <ImageWithBasePath src="assets/img/cars/car-02.png" className="img-fluid" alt="img" />
                            </Link>
                            <h6 className="fw-medium"><Link href={routes.carDetails}>SUV</Link></h6>
                        </div>
                    </div>
                    {/* /Category Item*/}

                    {/* Category Item*/}
                    <div className="col">
                        <div className="category-wrap aos" data-aos="fade-up">
                            <Link href={routes.carDetails} className="category-img">
                                <ImageWithBasePath src="assets/img/cars/car-03.png" className="img-fluid" alt="img" />
                            </Link>
                            <h6 className="fw-medium"><Link href={routes.carDetails}>Crossover</Link></h6>
                        </div>
                    </div>
                    {/* /Category Item*/}

                    {/* Category Item*/}
                    <div className="col">
                        <div className="category-wrap aos" data-aos="fade-up">
                            <Link href={routes.carDetails} className="category-img">
                                <ImageWithBasePath src="assets/img/cars/car-04.png" className="img-fluid" alt="img" />
                                <span className="badge badge-secondary">Popular</span>
                            </Link>
                            <h6 className="fw-medium"><Link href={routes.carDetails}>Electric Vehicle</Link></h6>
                        </div>
                    </div>
                    {/* /Category Item*/}

                    {/* Category Item*/}
                    <div className="col">
                        <div className="category-wrap aos" data-aos="fade-up">
                            <Link href={routes.carDetails} className="category-img">
                                <ImageWithBasePath src="assets/img/cars/car-05.png" className="img-fluid" alt="img" />
                            </Link>
                            <h6 className="fw-medium"><Link href={routes.carDetails}>Luxury Car</Link></h6>
                        </div>
                    </div>
                    {/* /Category Item*/}

                </div>

                <div className="text-center view-all aos" data-aos="fade-up">
                    <Link href={routes.carGrid} className="btn btn-dark">View All<i className="isax isax-arrow-right-3 ms-2"></i></Link>
                </div>

            </div>
        </div>
    </section>
    {/* /Category Section */}

    {/* About Section */}
    <section className="section about-section-three bg-light-200">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="about-car mb-4 mb-lg-0 aos" data-aos="fade-up">
                        <div className="row align-items-center gx-0">
                            <div className="col-6">
                                <div className="about-img-01">
                                    <ImageWithBasePath src="assets/img/cars/about-01.jpg" alt="img" className="img-fluid" />
                                </div>
                                <div className="about-img-03">
                                    <ImageWithBasePath src="assets/img/cars/about-02.jpg" alt="img" className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="about-img-02">
                                    <ImageWithBasePath src="assets/img/cars/about-03.jpg" alt="img" className="img-fluid" />
                                </div>
                                <div className="about-img-04">
                                    <ImageWithBasePath src="assets/img/cars/about-04.jpg" alt="img" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="about-exp">
                            <h2>10+</h2>
                            <p>Years of Experience</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 aos" data-aos="fade-up">
                    <div className="section-header mb-4">
                        <h6 className="fs-14 fw-medium text-primary d-flex align-items-center mb-2"><i className="isax isax-trend-up me-1"></i>Get to know about Us</h6>
                        <h2 className="mb-2">Provide high-quality vehicles & service to make your journeys seamless & enjoyable.</h2>
                        <p className="sub-title">We offer a diverse range of vehicles, from compact cars ideal for city driving to spacious SUVs for family trips and luxurious models for special events. All our cars are well-maintained, regularly serviced</p>
                    </div>
                    <div className="mb-3 border-bottom">
                        <div className="mb-3">
                            <h6 className="d-flex align-items-center"><i className="isax isax-tick-circle5 text-teal fs-24 me-2"></i>Convenient Locations</h6>
                            <p>Multiple pick-up and drop-off locations to suit your travel plans.</p>
                        </div>
                        <div className="mb-3">
                            <h6 className="d-flex align-items-center"><i className="isax isax-tick-circle5 text-orange fs-24 me-2"></i>Customer-Centric Service</h6>
                            <p>Our team is always ready to assist you with any inquiries or needs.</p>
                        </div>
                        <div className="mb-3">
                            <h6 className="d-flex align-items-center"><i className="isax isax-tick-circle5 text-purple fs-24 me-2"></i>Safety First</h6>
                            <p>All vehicles undergo thorough cleaning and maintenance to ensure your safety.</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-wrap gap-3 mb-0 mb-md-4 mb-lg-0">
                        <Link href={routes.addCar} className="btn btn-dark d-inline-flex align-items-center"><i className="isax isax-add-circle5 me-2"></i>Add Your Car</Link>
                        <Link href={routes.carGrid} className="btn btn-primary d-inline-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Book a Car</Link>
                        <div className="card border-0 mb-0">
                            <div className="card-body d-flex align-items-center">
                                <div className="avatar-list-stacked avatar-group-md me-2">
                                    <span className="avatar avatar-rounded">
										<ImageWithBasePath className="border border-white" src="assets/img/users/user-01.jpg" alt="img" />
									</span>
                                    <span className="avatar avatar-rounded">
										<ImageWithBasePath className="border border-white" src="assets/img/users/user-04.jpg" alt="img" />
									</span>
                                    <span className="avatar avatar-rounded">
										<ImageWithBasePath className="border border-white" src="assets/img/users/user-05.jpg" alt="img" />
									</span>
                                    <span className="avatar avatar-rounded">
										<ImageWithBasePath className="border border-white" src="assets/img/users/user-06.jpg" alt="img" />
									</span>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center fs-12">
                                        <i className="ti ti-star-filled text-warning"></i>
                                        <i className="ti ti-star-filled text-warning"></i>
                                        <i className="ti ti-star-filled text-warning"></i>
                                        <i className="ti ti-star-filled text-warning"></i>
                                        <i className="ti ti-star-filled text-warning me-1"></i>
                                        <p className="fs-14 text-gray-9">5.0</p>
                                    </div>
                                    <p className="fs-14">2K+ Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* /About Section */}
    </>
  )
}

export default TrendingThree