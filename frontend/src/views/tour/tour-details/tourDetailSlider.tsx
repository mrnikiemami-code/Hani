"use client";
import AppSwiper from '../../../components/app-swiper'
import type { Swiper as SwiperClass } from 'swiper'
import { img_path } from "../../../environment";
import React, { useEffect, useRef, useState } from 'react'
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import Lightbox from "yet-another-react-lightbox";

const TourDetailSlick = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    const [main, setMain] = React.useState(false);

    const sliderForRef = useRef<any>(null);
    const sliderNavRef = useRef<any>(null);
    const [_navSync, setNavSync] = useState<any>({ sliderFor: null, sliderNav: null });


    useEffect(() => {
        setNavSync({
            sliderFor: sliderNavRef.current,
            sliderNav: sliderForRef.current,
        });
    }, []);



    return (
        <div>
            {/* Slider */}
            <div className='tour-details-slider'>
                <div className="service-wrap mb-4">
                    <div className="slider-wrap vertical-slider tour-vertical-slide d-flex align-items-center">
                        <div className="slider-for nav-center" id="large-img">
                            <AppSwiper preset="vertical-for" thumbsSwiper={thumbsSwiper}>
                                <div className="service-img">
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-large-01.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div className="service-img">
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-large-02.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div className="service-img">
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-large-03.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div className="service-img">
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-large-04.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div className="service-img">
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-large-05.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                            </AppSwiper>

                        </div>
                        <Lightbox
                            open={main}
                            close={() => setMain(false)}
                            slides={[
                                { src: `${img_path}assets/img/tours/tour-large-01.jpg` },
                                { src: `${img_path}assets/img/tours/tour-large-02.jpg` },
                                { src: `${img_path}assets/img/tours/tour-large-03.jpg` },
                                { src: `${img_path}assets/img/tours/tour-large-04.jpg` },
                                { src: `${img_path}assets/img/tours/tour-large-05.jpg` },
                            ]}
                        />
                        <Link
                            data-fancybox="gallery"
                            className="btn btn-white btn-xs view-btn"
                            onClick={() => setMain(true)} href="#" title="Demo 01"
                        >
                            <i className="isax isax-image me-1" />
                            See All
                        </Link>
                        <div className="slider-nav nav-center" id="small-img">
                            <AppSwiper preset="vertical-nav" onSwiper={setThumbsSwiper}>
                                <div>
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-thumb-01.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div>
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-thumb-02.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div>
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-thumb-03.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div>
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-thumb-04.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                                <div>
                                    <ImageWithBasePath
                                        src="assets/img/tours/tour-thumb-05.jpg"
                                        className="img-fluid"
                                        alt="Slider Img"
                                    />
                                </div>
                            </AppSwiper>

                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="mb-2">
                        <h4 className="mb-1 d-flex align-items-center flex-wrap mb-2">
                            Rainbow Mountain Valley
                            <span className="badge badge-xs bg-success rounded-pill ms-2">
                                <i className="isax isax-ticket-star me-1" />
                                Verified
                            </span>
                        </h4>
                        <div className="d-flex align-items-center flex-wrap">
                            <p className="fs-14 mb-2 me-3 pe-3 border-end">
                                <i className="isax isax-receipt text-primary me-2" />
                                Adventure Tour
                            </p>
                            <p className="fs-14 mb-2 me-3 pe-3 border-end">
                                <i className="isax isax-location5 me-2" />
                                Cusco Region, Peru
                                <Link
                                    href="#location"
                                    className="link-primary text-decoration-underline fw-medium ms-2"
                                >
                                    View Location
                                </Link>
                            </p>
                            <div className="d-flex align-items-center mb-2">
                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                    5.0
                                </span>
                                <p className="fs-14">
                                    <Link href="#reviews">(400 Reviews)</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <Link
                            href="#"
                            className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"
                        >
                            <i className="isax isax-share" />
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-outline-light btn-sm d-inline-flex align-items-center"
                        >
                            <i className="isax isax-heart5 text-danger me-1" />
                            Save
                        </Link>
                    </div>
                </div>
            </div>
            {/* /Slider */}
        </div>
    )
}

export default TourDetailSlick
