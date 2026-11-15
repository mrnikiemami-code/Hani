"use client";
import AppSwiper from '../../../components/app-swiper'
import type { Swiper as SwiperClass } from 'swiper'
import { img_path } from "../../../environment";
import React, { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import Reviews from '../../../components/reviews/reviews';
import Lightbox from "yet-another-react-lightbox";
import VideoModal from '../../../components/video-modal/videoModal';
import CarInfo from './carInfo';

const CarDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const routes = all_routes
    const [showModal, setShowModal] = React.useState(false);
    const videoUrl = 'https://www.youtube.com/watch?v=4fMuE_t5YL4';

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const [gallery, setGallery] = React.useState(false);
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Car',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Car',
            active: false,
        },
        {
            label: 'Car Details',
            active: true,
        },
    ];
    return (
        <>
            <Breadcrumb title="Car" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-03" />
            <div className="card-top-head">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                        <div>
                            <div className="d-flex align-items-center mb-2">
                                <h4 className="d-flex align-items-center flex-wrap fw-bold">Audi A3 2019</h4>
                                <div className="d-flex align-items-center ms-2">
                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.5</span>
                                    <p className="fs-14"><Link href="#field_nine">(500 Reviews)</Link></p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap row-gap-2">
                                <p className="fs-14 mb-0 me-3 pe-3 border-end d-inline-flex align-items-center"><span><i className="isax isax-smart-car text-primary me-2"></i></span>Sedan</p>
                                <p className="fs-14 mb-0 me-3 pe-3 border-end"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona
                                    <Link href="#field_seven" className="link-primary text-decoration-underline fw-medium ms-2">View Location</Link>
                                </p>
                                <div className="d-flex align-items-center flex-wrap row-gap-2">
                                    <p className="fs-14 me-3 mb-0 d-inline-flex align-items-center"><span><i className="isax isax-tick-circle5 text-success me-1"></i></span>Dropoff</p>
                                    <p className="fs-14 me-3 mb-0 d-inline-flex align-items-center"><span><i className="isax isax-tick-circle5 text-success me-1"></i></span>Airport Pickup</p>
                                    <p className="fs-14 mb-0 d-inline-flex align-items-center"><span><i className="isax isax-tick-circle5 text-success me-1"></i></span>Hourly Package</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2">
                            <Link href="#" className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"><i className="isax isax-share"></i></Link>
                            <Link href={routes.compare} className="btn btn-outline-light btn-sm d-inline-flex align-items-center me-2"><i className="isax isax-arrange-square me-1"></i>Compare</Link>
                            <Link href="#" className="btn btn-outline-light btn-sm d-inline-flex align-items-center me-2"><i className="isax isax-heart5 text-danger me-1"></i>Save</Link>
                            <span className="badge badge-light text-gray-9 badge-md fs-13 fw-medium rounded-pill me-4">No of Bookings : 96</span>
                            <div>
                                <p className="fs-13 fw-medium mb-1">Starts From</p>
                                <h5 className="text-primary">$500 <span className="fs-14 text-default fw-normal">/ Night</span></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Page Wrapper */}
            <div className="content">
                <div className="container">

                    <div className="row">
                        <div className="col-xl-8">

                            {/*  Slider */}
                            <div>
                                <div className="service-wrap vertical-slicks card border-0 mb-4">
                                    <div className="card-body">
                                        <div className="slider-wrap list-full vertical-slider vertical-slider-two d-flex align-items-center">
                                            <AppSwiper preset="vertical-nav" className="small-slick" onSwiper={setThumbsSwiper}>
                                                <div><ImageWithBasePath src="assets/img/cars/car-thumb-01.jpg" className="img-fluid" alt="Slider Img" /></div>
                                                <div><ImageWithBasePath src="assets/img/cars/car-thumb-02.jpg" className="img-fluid" alt="Slider Img" /></div>
                                                <div><ImageWithBasePath src="assets/img/cars/car-thumb-03.jpg" className="img-fluid" alt="Slider Img" /></div>
                                                <div><ImageWithBasePath src="assets/img/cars/car-thumb-04.jpg" className="img-fluid" alt="Slider Img" /></div>
                                                <div><ImageWithBasePath src="assets/img/cars/car-thumb-05.jpg" className="img-fluid" alt="Slider Img" /></div>
                                            </AppSwiper>
                                            <AppSwiper preset="vertical-for" thumbsSwiper={thumbsSwiper}>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cars/car-large-01.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cars/car-large-02.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cars/car-large-03.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cars/car-large-04.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cars/car-large-05.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                            </AppSwiper>
                                            <Lightbox
                                                open={gallery}
                                                close={() => setGallery(false)}
                                                slides={[
                                                    { src: `${img_path}assets/img/cars/car-large-01.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-02.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-03.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-04.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-05.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-06.jpg` },
                                                ]}
                                            />
                                            <Link
                                                data-fancybox="gallery"
                                                className="btn btn-white btn-xs view-btn"
                                                onClick={() => setGallery(true)} href="#" title="Demo 01"
                                            >
                                                <i className="isax isax-image me-1" />
                                                See All
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  /Slider */}
                            <ul id="list-example" className="active-tab-list d-flex align-items-center flex-wrap mb-4">
                                <li><Link href="#field_one" className="btn active">Description</Link></li>
                                <li><Link href="#field_two" className="btn">Specification</Link></li>
                                <li><Link href="#field_three" className="btn">Services</Link></li>
                                <li><Link href="#field_four" className="btn">Gallery</Link></li>
                                <li><Link href="#field_five" className="btn">Video</Link></li>
                                <li><Link href="#field_six" className="btn">Features</Link></li>
                                <li><Link href="#field_seven" className="btn">Location</Link></li>
                                <li><Link href="#field_eight" className="btn">FAQ</Link></li>
                                <li><Link href="#field_nine" className="btn">Reviews</Link></li>
                            </ul>
                            <div className="accordion custom-accordion" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" tabIndex={0}>
                                <div className="accordion-item mb-4" id="field_three">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_one" aria-expanded="true">
                                            Extra Services
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_one" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="row gy-3">
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-gps fs-16"></i>
                                                        </span>
                                                        <p>GPS Navigation Systems</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-wifi fs-16"></i>
                                                        </span>
                                                        <p>Wi-Fi Hotspot</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-check fs-16"></i>
                                                        </span>
                                                        <p>Express Check-in/out</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-wind-2 fs-16"></i>
                                                        </span>
                                                        <p>Roadside Assistance</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-security-user fs-16"></i>
                                                        </span>
                                                        <p>Child Safety Seats</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-gas-station fs-16"></i>
                                                        </span>
                                                        <p>Fuel Options</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_one">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_two" aria-expanded="true">
                                            Description
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_two" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <p className="mb-2">The Audi A3 2019 is a four-door diesel sedan with automatic transmission, ABS braking and air conditioning, seating four comfortably with room for two large cases in the boot. It is a steady choice for city driving and longer motorway runs alike.
                                            </p>
                                            <div className="read-more">
                                                <div className="more-text">
                                                    <p>Rental includes unlimited mileage, third-party insurance and 24/7 roadside assistance. Collection and return are at the same branch, and the vehicle is supplied with a full tank on a like-for-like fuel policy.
                                                    </p>
                                                </div>
                                                <Link href="#" className="fs-14 fw-medium more-link text-decoration-underline mb-2">Show More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_two">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_three" aria-expanded="true">
                                            Specification
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_three" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="row gy-3">
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-data fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Transmission</h6>
                                                            <span>Auto</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-driving fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Mileage</h6>
                                                            <span>24 KMS</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-story fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Steering</h6>
                                                            <span>Auto</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-car fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Make</h6>
                                                            <span>Audi</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-calendar fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Model Year</h6>
                                                            <span>2019</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-weight fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Brake</h6>
                                                            <span>ABS</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-cente">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-car fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Body</h6>
                                                            <span>Sedan</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-wind fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">AC</h6>
                                                            <span>Air Conditioned</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-sun fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Engine (Hp)</h6>
                                                            <span>3,000</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-drop3 fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Fuel Type</h6>
                                                            <span>Diesel</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-screenmirroring fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Doors</h6>
                                                            <span>4</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-flash fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Access</h6>
                                                            <span>Remote</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_six">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_six" aria-expanded="true">
                                            Features
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_six" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="row gy-3">
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Multi-zone A/C</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Heated front seats</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Andriod Auto</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Navigation system</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Premium sound system</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Bluetooth</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Keyles Start</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Memory seat</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>6 Cylinders</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Adaptive Control</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>Intermittent wipers</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-verify fs-16"></i>
                                                        </span>
                                                        <p>4 power windows</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_four">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_four" aria-expanded="true">
                                            Gallery
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_four" className="accordion-collapse collapse show">
                                        <Lightbox
                                            open={open}
                                            close={() => setOpen(false)}
                                            slides={[
                                                { src: `${img_path}assets/img/cars/gallery-car-lg-01.jpg` },
                                                { src: `${img_path}assets/img/cars/gallery-car-lg-02.jpg` },
                                                { src: `${img_path}assets/img/cars/gallery-car-lg-03.jpg` },
                                                { src: `${img_path}assets/img/cars/gallery-car-lg-04.jpg` },
                                                { src: `${img_path}assets/img/cars/gallery-car-lg-05.jpg` },
                                            ]}
                                        />
                                        <div className="accordion-body">
                                            <AppSwiper preset="tour-gallery-slider">
                                                <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/cars/gallery-car-01.jpg" alt="img" />
                                                </Link>
                                                <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/cars/gallery-car-02.jpg" alt="img" />
                                                </Link>
                                                <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/cars/gallery-car-03.jpg" alt="img" />
                                                </Link>
                                                <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/cars/gallery-car-04.jpg" alt="img" />
                                                </Link>
                                                <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/cars/gallery-car-05.jpg" alt="img" />
                                                </Link>
                                                <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/cars/gallery-car-06.jpg" alt="img" />
                                                </Link>
                                            </AppSwiper>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_five">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_five" aria-expanded="true">
                                            Video
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_five" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="position-relative">
                                                <Link href="#">
                                                    <ImageWithBasePath src="assets/img/cars/car-large-01.jpg" className="rounded" alt="Img" />
                                                </Link>
                                                <Link href="# " onClick={handleOpenModal} data-fancybox="" className="avatar avatar-lg rounded-circle bg-white circle-middle">
                                                    <i className="isax isax-play-circle5 fs-24"></i>
                                                </Link>
                                                <VideoModal show={showModal} handleClose={handleCloseModal} videoUrl={videoUrl} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_seven">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_seven" aria-expanded="true">
                                            Location
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_seven" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            {/*  Map */}
                                            <div>
                                                <iframe src="https://www.google.com/maps?q=Ciutat%20Vella%2C%20Barcelona%2C%20Spain&output=embed"
                                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="tour-detail-map w-100"></iframe>
                                            </div>
                                            {/*  /Map */}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_eight">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_eight" aria-expanded="true">
                                            Frequently Asked Questions
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_eight" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="accordion faq-accordion" id="accordionFaq">
                                                <div className="accordion-item show mb-2">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne" aria-controls="faq-collapseOne">
                                                            How old do I need to be to rent a car?
                                                        </button>
                                                    </div>
                                                    <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item mb-2">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-two" aria-controls="faq-two">
                                                            What documents do I need to rent a car?
                                                        </button>
                                                    </div>
                                                    <div id="faq-two" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item mb-2">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-three" aria-controls="faq-three">
                                                            What types of vehicles are available for rent?
                                                        </button>
                                                    </div>
                                                    <div id="faq-three" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-four" aria-controls="faq-four">
                                                            Can I rent a car with a debit card?
                                                        </button>
                                                    </div>
                                                    <div id="faq-four" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="field_nine">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_nine" aria-expanded="true">
                                            Reviews
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_nine" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <Reviews />
                                            <Lightbox
                                                open={open2}
                                                close={() => setOpen2(false)}
                                                slides={[
                                                    { src: `${img_path}assets/img/cars/car-large-01.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-02.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-03.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-04.jpg` },
                                                    { src: `${img_path}assets/img/cars/car-large-05.jpg` },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 mb-xl-0">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_ten" aria-expanded="true">
                                            Leave A Review
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_ten" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <form >
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Your Rating <span className="text-danger">*</span></label>
                                                            <div className="selection-wrap">
                                                                <div className="d-inline-block">
                                                                    <div className="rating-selction">
                                                                        <input type="radio" name="rating" defaultValue="5" id="rating05" />
                                                                        <label htmlFor="rating05"><i className="fa-solid fa-star"></i></label>
                                                                        <input type="radio" name="rating" defaultValue="4" id="rating04" />
                                                                        <label htmlFor="rating04"><i className="fa-solid fa-star"></i></label>
                                                                        <input type="radio" name="rating" defaultValue="3" id="rating03" />
                                                                        <label htmlFor="rating03"><i className="fa-solid fa-star"></i></label>
                                                                        <input type="radio" name="rating" defaultValue="2" id="rating02" />
                                                                        <label htmlFor="rating02"><i className="fa-solid fa-star"></i></label>
                                                                        <input type="radio" name="rating" defaultValue="1" id="rating01" />
                                                                        <label htmlFor="rating01"><i className="fa-solid fa-star"></i></label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Name <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Email <span className="text-danger">*</span></label>
                                                            <input type="email" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Write Your Review <span className="text-danger">*</span></label>
                                                            <textarea className="form-control" rows={3}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 text-center">
                                                        <button type="submit" className="btn btn-primary btn-md">
                                                            <i className="isax isax-edit-2 me-1"></i>Submit Review
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <CarInfo />
                        </div>
                    </div>
                </div>
            </div>
            {/*  /Page Wrapper */}
        </>
    )
}

export default CarDetails