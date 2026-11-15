"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';
const BlogThree = () => {


    const routes = all_routes

  return (
    <>
        {/* FAQ Section */}
        <section className="faq-section-three section">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="plan-sec mb-4 mb-lg-0">
                        <div className="plan-card">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="text-primary mb-2">$199<span className="fs-14 fw-normal"> / Month</span></h2>
                                <Link href="#" className="btn btn-dark mb-2">Buy Now</Link>
                            </div>
                            <h5>Basic Plan</h5>
                            <p>Add more than 20 Cars, Get Booked around 200 Customers</p>
                        </div>
                        <div className="plan-card active">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="text-white mb-2">$399<span className="fs-14 fw-normal"> / Month</span></h2>
                                <Link href="#" className="btn btn-dark mb-2">Buy Now</Link>
                            </div>
                            <h5>Enterprise</h5>
                            <p>Add more than 20 Cars, Get Booked around 200 Customers</p>
                        </div>
                        <div className="plan-card bg-white">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="text-primary mb-2">$899<span className="fs-14 fw-normal"> / Month</span></h2>
                                <Link href="#" className="btn btn-dark mb-2">Buy Now</Link>
                            </div>
                            <h5>Premium</h5>
                            <p>Add more than 50 Cars, Get Booked around 500 Customers</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="section-header mb-4 aos" data-aos="fade-up">
                        <h2 className="text-white mb-2">Start Adding Cars With Our Exclusive & Updated Pricing Plans only for you</h2>
                        <p className="text-light sub-title">Ask a Question To get Your Answers from Our DreamsTour Management</p>
                    </div>
                    <div className="accordion accordion-flush faq-three" id="accordionFaq">
                        <div className="accordion-item show mb-2 aos fadeInUp" data-aos="fade-up">
                            <h2 className="accordion-header">
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne"  aria-controls="faq-collapseOne">
									How do I book a car?
								</button>
							</h2>
                            <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p className="mb-0">Simply enter your location, pick-up and drop-off dates, and search through the available options. Choose the car that fits your needs, and follow the steps to complete the booking. </p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-2 aos" data-aos="fade-up">
                            <h2 className="accordion-header">
								 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsetwo"  aria-controls="faq-collapsetwo">
									Are the tours customizable?
							  </button>
							</h2>
                            <div id="faq-collapsetwo" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-2 aos" data-aos="fade-up">
                            <h2 className="accordion-header">
								  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsthree"  aria-controls="faq-collapsthree">
									What safety measures do you follow?
								  </button>
							</h2>
                            <div id="faq-collapsthree" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-2 aos"data-aos="fade-up">
                            <h2 className="accordion-header">
								  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsefour"  aria-controls="faq-collapsefour">
									How far in advance should I book?
								  </button>
							</h2>
                            <div id="faq-collapsefour" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item aos" data-aos="fade-up">
                            <h2 className="accordion-header">
								  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsefive"  aria-controls="faq-collapsefive">
									What is your cancellation policy?
								  </button>
							</h2>
                            <div id="faq-collapsefive" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="faq-bg">
            <ImageWithBasePath src="assets/img/icons/circle-shape.svg" alt="img" className="faq-shape" />
        </div>
    </section>
    {/* /FAQ Section */}

    {/* Blog Section */}
    <section className="section blog-section">
        <div className="container">
            <div className="row">
                <div className="col-xl-12 text-center aos" data-aos="fade-up">
                    <div className="section-header text-center">
                        <span className="car-icon mb-1">
							<ImageWithBasePath src="assets/img/icons/car-icon.svg" alt="img" />
						</span>
                        <h2 className="mb-2">Read Our Latest Stories & Tips Here</h2>
                        <p className="sub-title">Stay Updated on the Stories & Stay Updated </p>
                    </div>
                </div>
            </div>
            <div className="row g-4 justify-content-center">

                {/* Blog Item*/}
                <div className="col-lg-4 col-md-6 d-flex">
                    <div className="blog-item blog-wrap flex-fill aos" data-aos="fade-up">
                        <Link href={routes.blogDetails} className="blog-img">
                            <ImageWithBasePath src="assets/img/blog/blog-18.jpg" alt="img" />
                            <span className="badge bg-white text-gray-9 fs-14 fw-medium">Booking</span>
                        </Link>
                        <div className="blog-content">
                            <div className="d-flex align-items-center justify-content-between">
                                <Link href="#" className="d-flex align-items-center mb-2">
                                    <span className="avatar avatar-md flex-shrink-0 me-2">
										<ImageWithBasePath src="assets/img/users/user-01.jpg" alt="img" className="rounded-circle" />
									</span>
                                    <p className="fs-14">Merkel James</p>
                                </Link>
                                <p className="fs-13 fw-medium d-flex align-items-center mb-2"><i className="isax isax-calendar-1 text-gray-9 fs-20 me-2"></i>27 Sep 2025</p>
                            </div>
                            <h5><Link href={routes.blogDetails}>It empowers designers to swiftly created informative landing pages</Link></h5>
                        </div>
                    </div>
                </div>
                {/* /Blog Item*/}

                {/* Blog Item*/}
                <div className="col-lg-4 col-md-6">
                    <div className="blog-item blog-wrap flex-fill aos" data-aos="fade-up">
                        <Link href={routes.blogDetails} className="blog-img">
                            <ImageWithBasePath src="assets/img/blog/blog-19.jpg" alt="img" />
                            <span className="badge bg-white text-gray-9 fs-14 fw-medium">News</span>
                        </Link>
                        <div className="blog-content">
                            <div className="d-flex align-items-center justify-content-between">
                                <Link href="#" className="d-flex align-items-center mb-2">
                                    <span className="avatar avatar-md flex-shrink-0 me-2">
										<ImageWithBasePath src="assets/img/users/user-02.jpg" alt="img" className="rounded-circle" />
									</span>
                                    <p className="fs-14">Harriet Collins</p>
                                </Link>
                                <p className="fs-13 fw-medium d-flex align-items-center mb-2"><i className="isax isax-calendar-1 text-gray-9 fs-20 me-2"></i>27 Sep 2025</p>
                            </div>
                            <h5><Link href={routes.blogDetails}>Want to be notified about new post and news from our Portal ?</Link></h5>
                        </div>
                    </div>
                </div>
                {/* /Blog Item*/}

                {/* Blog Item*/}
                <div className="col-lg-4 col-md-6">
                    <div className="blog-item blog-wrap flex-fill aos" data-aos="fade-up">
                        <Link href={routes.blogDetails} className="blog-img">
                            <ImageWithBasePath src="assets/img/blog/blog-20.jpg" alt="img" />
                            <span className="badge bg-white text-gray-9 fs-14 fw-medium">Tips</span>
                        </Link>
                        <div className="blog-content">
                            <div className="d-flex align-items-center justify-content-between">
                                <Link href="#" className="d-flex align-items-center mb-2">
                                    <span className="avatar avatar-md flex-shrink-0 me-2">
										<ImageWithBasePath src="assets/img/users/user-03.jpg" alt="img" className="rounded-circle" />
									</span>
                                    <p className="fs-14">Rachel Mariscal</p>
                                </Link>
                                <p className="fs-13 fw-medium d-flex align-items-center mb-2"><i className="isax isax-calendar-1 text-gray-9 fs-20 me-2"></i>27 Sep 2025</p>
                            </div>
                            <h5><Link href={routes.blogDetails}>It empowers designers to swiftly created informative landing pages</Link></h5>
                        </div>
                    </div>
                </div>
                {/* /Blog Item*/}

            </div>

            {/* Business*/}
            <div className="app-wrap bg-light">
                <div className="row">
                    <div className="col-lg-6 d-flex">
                        <div className="app-info flex-fill  aos" data-aos="fade-up">
                            <h2 className="display-5 mb-3">Download Our App to Enjoy Unlimited Services</h2>
                            <p className="mb-3">Out App Available iin all Platforms</p>
                            <div className="d-flex align-items-center">
                                <Link href="#" className="me-3">
                                    <ImageWithBasePath src="assets/img/icons/googleplay.svg" alt="img" />
                                </Link>
                                <Link href="#">
                                    <ImageWithBasePath src="assets/img/icons/appstore.svg" alt="img" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex">
                        <div className="app-img flex-fill aos" data-aos="fade-up">
                            <ImageWithBasePath src="assets/img/cars/car.png" alt="img" />
                        </div>
                    </div>
                </div>
                <div className="app-bg">
                    <ImageWithBasePath src="assets/img/bg/app-bg-01.png" alt="img" className="app-bg-01" />
                    <ImageWithBasePath src="assets/img/bg/app-bg-02.png" alt="img" className="app-bg-02" />
                </div>
            </div>
            {/* /Business */}

            {/* Client Section */}
            <div className="client-section-three">
                <div className="container">
                    
                    <AppSwiper preset="client-slider">
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-01.svg" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-02.svg" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-03.svg" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-04.svg" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-05.svg" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-06.svg" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-07.svg" alt="img" />
                        </div>
                        </AppSwiper>
                </div>
            </div>
            {/* /Client Section */}

        </div>
    </section>
    {/* /Blog Section */}
    </>
  )
}

export default BlogThree