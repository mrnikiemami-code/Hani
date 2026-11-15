"use client";

import ImageWithBasePath from '../../../../components/image-with-base-path'
import Link from "next/link";
import { all_routes } from '../../../../routes/all_routes'

const UpdateSection = () => {

    const routes = all_routes

  return (
    <>
        {/* Update Section */}
    <section className="update-section">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="update-sec">
                        <div className="section-header text-center">
                            <h2 className="mb-1">Stay Updated</h2>
                            <p className="sub-title">Signup for New Offers & Updates from DreamsTour </p>
                        </div>
                        <div className="input-group justify-content-center mx-auto">
                            <span className="input-group-text px-1"><i className="isax isax-message-favorite5"></i></span>
                            <input type="email" className="form-control" placeholder="Enter Email Address" />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </div>
                        <div className="update-bg">
                            <ImageWithBasePath src="assets/img/bg/update-bg.png" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* /Update Section */}

    {/* FAQ Section */}
    <section className="faq-section section">
        <div className="container">
            <div className="faq-sec">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-10 text-center wow fadeInUp" data-wow-delay="0.2s">
                        <div className="section-header text-center">
                            <h2 className="mb-2">Frequently Asked <span className="text-primary  text-decoration-underline">Questions</span></h2>
                            <p className="sub-title">DreamsTour, a tour operator specializing in dream destinations, offers a variety of benefits for travelers.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="accordion accordion-flush" id="accordionFaq">
                            <div className="accordion-item show mb-3 pb-3 wow fadeInUp" data-wow-delay="0.2s">
                                <h2 className="accordion-header">
									<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne"  aria-controls="faq-collapseOne">
										What types of tours do you offer?
									</button>
								</h2>
                                <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                    <div className="accordion-body">
                                        <p className="mb-0">We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                        <p>Popular destinations include Europe, Africa (e.g., Morocco), </p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item mb-3 pb-3 wow fadeInUp" data-wow-delay="0.4s">
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
                            <div className="accordion-item mb-3 pb-3 wow fadeInUp" data-wow-delay="0.6s">
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
                            <div className="accordion-item mb-3 pb-3 wow fadeInUp" data-wow-delay="0.8s">
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
                            <div className="accordion-item wow fadeInUp" data-wow-delay="1.0s">
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
        </div>
    </section>
    {/* /FAQ Section */}

    {/* Blog Section */}
    <section className="section blog-section pt-0">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-10 text-center wow fadeInUp" data-wow-delay="0.2s">
                    <div className="section-header text-center">
                        <h2 className="mb-2">Recent <span className="text-primary text-decoration-underline">Articles</span></h2>
                        <p className="sub-title">DreamsTour offers various blog resources that cater to travel enthusiasts, with a focus on adventure, gear reviews, and travel tips.</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">

                {/* Blog Item*/}
                <div className="col-lg-4 col-md-6">
                    <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                        <Link href={routes.blogDetails} className="blog-img">
                            <ImageWithBasePath src="assets/img/blog/blog-01.jpg" alt="img" />
                        </Link>
                        <span className="badge bg-primary fs-13 fw-medium">Travel</span>
                        <div className="blog-info text-center">
                            <div className="d-inline-flex align-items-center justify-content-center">
                                <div className="d-inline-flex align-items-center border-end ps-3 ms-3 mb-2">
                                    <Link href="#" className="d-flex align-items-center">
                                        <span className="avatar avatar-sm flex-shrink-0 ms-2">
											<ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle border border-white" alt="img" />
										</span>
                                        <p>Bryan Bradfield</p>
                                    </Link>
                                </div>
                                <p className="d-inline-flex align-items-center text-white mb-2"><i className="isax isax-calendar-2 ms-2"></i>14 May 2025</p>
                            </div>
                            <h5><Link href={routes.blogDetails}>Top 10 Hidden Gems places in Central Europe in 2025</Link></h5>
                        </div>
                    </div>
                </div>
                {/* /Blog Item*/}

                {/* Blog Item*/}
                <div className="col-lg-4 col-md-6">
                    <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                        <Link href={routes.blogDetails} className="blog-img">
                            <ImageWithBasePath src="assets/img/blog/blog-02.jpg" alt="img" />
                        </Link>
                        <span className="badge bg-primary fs-13 fw-medium">Guide</span>
                        <div className="blog-info text-center">
                            <div className="d-inline-flex align-items-center justify-content-center">
                                <div className="d-inline-flex align-items-center border-end ps-3 ms-3 mb-2">
                                    <Link href="#" className="d-flex align-items-center">
                                        <span className="avatar avatar-sm flex-shrink-0 ms-2">
											<ImageWithBasePath src="assets/img/users/user-02.jpg" className="rounded-circle border border-white" alt="img" />
										</span>
                                        <p>Michell West</p>
                                    </Link>
                                </div>
                                <p className="d-inline-flex align-items-center text-white mb-2"><i className="isax isax-calendar-2 ms-2"></i>12 May 2025</p>
                            </div>
                            <h5><Link href={routes.blogDetails}>Exploring the World: Your Ultimate Dream Tour Itinerary</Link></h5>
                        </div>
                    </div>
                </div>
                {/* /Blog Item*/}

                {/* Blog Item*/}
                <div className="col-lg-4 col-md-6">
                    <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                        <Link href={routes.blogDetails} className="blog-img">
                            <ImageWithBasePath src="assets/img/blog/blog-03.jpg" alt="img" />
                        </Link>
                        <span className="badge bg-primary fs-13 fw-medium">Rental</span>
                        <div className="blog-info text-center">
                            <div className="d-inline-flex align-items-center justify-content-center">
                                <div className="d-inline-flex align-items-center border-end ps-3 ms-3 mb-2">
                                    <Link href="#" className="d-flex align-items-center">
                                        <span className="avatar avatar-sm flex-shrink-0 ms-2">
											<ImageWithBasePath src="assets/img/users/user-03.jpg" className="rounded-circle border border-white" alt="img" />
										</span>
                                        <p>Patricia Hasbro</p>
                                    </Link>
                                </div>
                                <p className="d-inline-flex align-items-center text-white mb-2"><i className="isax isax-calendar-2 ms-2"></i>14 May 2025</p>
                            </div>
                            <h5><Link href={routes.blogDetails}>New York City, USA - The City That  Never Sleeps</Link></h5>
                        </div>
                    </div>
                </div>
                {/* /Blog Item*/}

            </div>
            <div className="text-center view-all wow fadeInUp">
                <Link href={routes.blogGrid} className="btn btn-dark d-inline-flex align-items-center">View All Articles<i className="isax isax-arrow-right-3 me-2"></i></Link>
            </div>
        </div>
    </section>
    {/* /Blog Section */}

    {/* Support Section */}
    <section className="support-section bg-primary">
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
    </>
  )
}

export default UpdateSection