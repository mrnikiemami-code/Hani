"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';
const PopularFive = () => {

    const routes = all_routes

  return (
    <>
        <section className="section place-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-10 text-center aos" data-aos="fade-up">
                    <div className="section-header text-center">
                        <h2 className="mb-2">Popular  <span className="text-primary  text-decoration-underline">Destinations</span></h2>
                        <p className="sub-title">Embark on unforgettable journeys to the world's most sought-after cruise ports</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 col-12 ">
                    <div className="destination-set  aos" data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-07.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1">Caribbean</h5>
                            <h6 className="text-light fs-16 fw-normal">100 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="destination-set  aos" data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-08.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1"> Canary Islands</h5>
                            <h6 className="text-light fs-16 fw-normal">300 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="destination-set aos" data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-09.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1">Mediterranean</h5>
                            <h6 className="text-light fs-16 fw-normal">200 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="destination-set aos" data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-10.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1">Northern Europe</h5>
                            <h6 className="text-light fs-16 fw-normal">250 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="destination-set aos " data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-11.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1">Alaska</h5>
                            <h6 className="text-light fs-16 fw-normal">370 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="destination-set aos" data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-12.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1">Panama Canal</h5>
                            <h6 className="text-light fs-16 fw-normal">180 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="destination-set aos " data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-13.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1">Hawaiian Islands</h5>
                            <h6 className="text-light fs-16 fw-normal">400 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="destination-set aos" data-aos="fade-up">
                        <div className="destination-img">
                            <ImageWithBasePath src="assets/img/destination/destination-14.jpg" alt="Img" />
                        </div>
                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                            <h5 className="text-white fs-20 fw-semibold mb-1">British Isles</h5>
                            <h6 className="text-light fs-16 fw-normal">120 Cruises</h6>
                        </div>
                        <div className="destination-btn">
                            <Link href={routes.cruiseGrid}> <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Place Section */}

    {/* Client Section */}
    <section className="support-company-section bg-primary support-section-five  aos" data-aos="fade-up">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    
                    <AppSwiper preset="client-slider">
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-01.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-02.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-03.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-04.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-05.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-06.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-07.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-04.svg" className="img-white" alt="img" />
                        </div>
                        </AppSwiper>
                </div>
            </div>
        </div>
    </section>
    {/* /Client Section */}
    </>
  )
}

export default PopularFive