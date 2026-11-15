"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';
const CruiseType = () => {

    const routes = all_routes
      
  return (
    <>
      {/* type Section */}
    <section className="section destination-section blog-section ">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-10 text-center aos" data-aos="fade-up">
                    <div className="section-header text-center">
                        <h2 className="mb-2">Explore Our <span className="text-primary  text-decoration-underline">Cruise Types</span>  </h2>
                        <p className="sub-title">Find the perfect cruise experience tailored to your unique interests and travel style.</p>
                    </div>
                </div>
            </div>
            <div >
            <AppSwiper preset="cruise-slider">
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-15.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>Luxury Cruise</Link></h6>
                </div>
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-18.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>Adventure Cruise</Link></h6>
                </div>
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-17.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>Expedition Cruise</Link></h6>
                </div>
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-19.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>Family Cruise</Link></h6>
                </div>
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-16.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>River Cruises</Link></h6>
                </div>
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-20.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>World Cruises</Link></h6>
                </div>
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-15.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>Luxury Cruise</Link></h6>
                </div>
                <div className="cruise-type">
                    <ImageWithBasePath src="assets/img/cruise/cruise-18.jpg" alt="img" />
                    <h6><Link href={routes.cruiseGrid}>Adventure Cruise</Link></h6>
                </div>
                </AppSwiper>
            </div>
            <div className="text-center view-all aos" data-aos="fade-up">
                <Link href={routes.cruiseGrid} className="btn btn-primary">More Categories<i className="isax isax-arrow-right-3 ms-2"></i></Link>
            </div>
        </div>
    </section>
    {/* /type Section */}

    <section className="support-section bg-dark support-section-five  aos" data-aos="fade-up">
        <div className="horizontal-slide d-flex" data-direction="left" data-speed="slow" data-animated="true">
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
                <div className="support-item" aria-hidden="true">
                    <h5>Personalized Itineraries</h5>
                </div>
                <div className="support-item" aria-hidden="true">
                    <h5>Comprehensive Planning</h5>
                </div>
                <div className="support-item" aria-hidden="true">
                    <h5>Expert Guidance</h5>
                </div>
                <div className="support-item" aria-hidden="true">
                    <h5>Local Experience</h5>
                </div>
                <div className="support-item" aria-hidden="true">
                    <h5>Customer Support</h5>
                </div>
                <div className="support-item" aria-hidden="true">
                    <h5>Sustainability Efforts</h5>
                </div>
                <div className="support-item" aria-hidden="true">
                    <h5>Multiple Regions</h5>
                </div>
            </div>
        </div>
    </section>

    {/* who we are */}
    <section className="section">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="years-off  aos" data-aos="fade-up">
                                <h4 className="text-light"> 15 Years of Experience</h4>
                            </div>
                            <div className="discover-set-img-left  aos "data-aos="fade-up">
                                <ImageWithBasePath src="assets/img/cruise/cruise-22.jpg" alt="Img" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="discover-set-img-right aos" data-aos="fade-up">
                                <ImageWithBasePath src="assets/img/cruise/cruise-21.jpg" alt="Img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="section-header mb-4  aos" data-aos="fade-up">
                        <h2 className="mb-2">Discover  <span className="text-primary  text-decoration-underline">Who We Are</span></h2>
                        <p className="sub-title">At DreamsTour, we are passionate about turning your dream vacation into a reality. With years of experience in the cruise industry, we specialize in offering a wide range of cruise options tailored to meet your preferences, whether
                            you’re seeking adventure, relaxation, or family fun. </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6  mb-3  aos" data-aos="fade-up">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <ImageWithBasePath src="assets/img/icons/extensive.svg" alt="Img" />
                                        <div className="ms-2">
                                            <h6 className="fs-16 mb-2">Extensive Cruise Options</h6>
                                            <p>We partner with top cruise lines to offer a diverse selection of cruise</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6  mb-3  aos" data-aos="fade-up">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <ImageWithBasePath src="assets/img/icons/trust.svg" alt="Img" />
                                        <div className="ms-2">
                                            <h6 className="fs-16  mb-2">Trust and Expertise</h6>
                                            <p>With years of industry expertise and a passion for travel</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12  aos" data-aos="fade-up">
                            <Link href={routes.about_us} className="btn btn-primary">More About Us <i className="isax isax-arrow-right-3 ms-2"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* who we are */}
    </>
  )
}

export default CruiseType