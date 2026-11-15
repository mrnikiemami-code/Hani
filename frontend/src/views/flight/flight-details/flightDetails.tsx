"use client";
import AppSwiper from '../../../components/app-swiper'
import type { Swiper as SwiperClass } from 'swiper'
import { img_path } from "../../../environment";
import React, { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import CustomSelect from '../../../components/common-select/commonSelect';
import { PreferredClass } from '../../../core/data/mock/selectOption';
import BannerCounter from '../../../components/banner-counter/counter';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Lightbox from "yet-another-react-lightbox";
import Reviews from '../../../components/reviews/reviews';

const FlightDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    const routes = all_routes

    const [gallery, setGallery] = React.useState(false);

    const [flightRadio, setFlightRadio] = useState<string>('oneway');


    const [defaultDate] = useState(new Date());

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Flight Details',
            active: false,
            link: routes.home1
        },
        {
            label: 'Flight',
            active: false,
        },
        {
            label: 'Flight Details',
            active: true,
        },
    ];







    const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
    const handleItemClick = (index: number) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = !updatedSelectedItems[index];
            return updatedSelectedItems;
        });
    };

    return (
        <div>
            <Breadcrumb title="Flight" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-05" />

            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8">
                                {/* Slider */}
                                <div>
                                    <div className="service-wrap slider-wrap-five mb-4">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                            <div className="mb-2">
                                                <h4 className="mb-1 d-flex align-items-center flex-wrap">
                                                    Delhi (DEL) to Barcelona (BCN)
                                                    <span className="badge badge-xs bg-success rounded-pill ms-2">
                                                        <i className="isax isax-ticket-star5 me-1" />
                                                        Verified
                                                    </span>
                                                    <span className="badge badge-xs bg-indigo rounded-pill ms-2">
                                                        Cheapest
                                                    </span>
                                                </h4>
                                                <div className="d-flex align-items-center flex-wrap">
                                                    <p className="fs-14 mb-2 me-3 pe-3 border-end d-flex align-items-center">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/airindia.svg"
                                                            className="me-2"
                                                            alt="Air India logo"
                                                        />{" "}
                                                        Air India &middot; AI 191
                                                        <span className="bg-primary divide-point mx-2" /> 1 stop
                                                        &middot; Dubai (DXB) &middot; 13h 45m
                                                    </p>
                                                    <p className="fs-14 mb-2 me-3 pe-3 border-end">
                                                        <i className="isax isax-airplane5 me-2" />
                                                        Departs Terminal 3, Indira Gandhi Intl
                                                        <Link
                                                            href="#location"
                                                            className="link-primary text-decoration-underline fw-medium ms-2"
                                                        >
                                                            View Airport
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
                                                    href={routes.compare}
                                                    className="btn btn-outline-light btn-sm d-inline-flex align-items-center me-2"
                                                >
                                                    <i className="isax isax-arrange-square me-1" />
                                                    Compare
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
                                        <div className="service-wrap mb-4">
                                            <div className="slider-wrap">
                                                <div
                                                    className="owl-carousel service-carousel nav-center mb-4"
                                                    id="large-img"
                                                >
                                                    <AppSwiper preset="service-carousel" thumbsSwiper={thumbsSwiper}>
                                                        <div className="service-img">
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-large-01.jpg"
                                                                className="img-fluid"
                                                                alt="Slider Img"
                                                            />
                                                        </div>
                                                        <div className="service-img">
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-large-02.jpg"
                                                                className="img-fluid"
                                                                alt="Slider Img"
                                                            />
                                                        </div>
                                                        <div className="service-img">
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-large-03.jpg"
                                                                className="img-fluid"
                                                                alt="Slider Img"
                                                            />
                                                        </div>
                                                        <div className="service-img">
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-large-04.jpg"
                                                                className="img-fluid"
                                                                alt="Slider Img"
                                                            />
                                                        </div>
                                                        <div className="service-img">
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-large-05.jpg"
                                                                className="img-fluid"
                                                                alt="Slider Img"
                                                            />
                                                        </div>
                                                        <div className="service-img">
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-large-06.jpg"
                                                                className="img-fluid"
                                                                alt="Slider Img"
                                                            />
                                                        </div>
                                                    </AppSwiper>

                                                </div>
                                                <Lightbox
                                                    open={gallery}
                                                    close={() => setGallery(false)}
                                                    slides={[
                                                        { src: `${img_path}assets/img/flight/flight-large-01.jpg` },
                                                        { src: `${img_path}assets/img/flight/flight-large-02.jpg` },
                                                        { src: `${img_path}assets/img/flight/flight-large-03.jpg` },
                                                        { src: `${img_path}assets/img/flight/flight-large-04.jpg` },
                                                        { src: `${img_path}assets/img/flight/flight-large-05.jpg` },
                                                        { src: `${img_path}assets/img/flight/flight-large-06.jpg` },
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
                                            <div
                                                className="owl-carousel slider-nav-thumbnails nav-center"
                                                id="small-img"
                                            >
                                                <AppSwiper preset="slider-nav-thumbnails" onSwiper={setThumbsSwiper}>
                                                    <div>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-thumb-01.jpg"
                                                            className="img-fluid"
                                                            alt="Slider Img"
                                                        />
                                                    </div>
                                                    <div>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-thumb-02.jpg"
                                                            className="img-fluid"
                                                            alt="Slider Img"
                                                        />
                                                    </div>
                                                    <div>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-thumb-03.jpg"
                                                            className="img-fluid"
                                                            alt="Slider Img"
                                                        />
                                                    </div>
                                                    <div>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-thumb-04.jpg"
                                                            className="img-fluid"
                                                            alt="Slider Img"
                                                        />
                                                    </div>
                                                    <div>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-thumb-05.jpg"
                                                            className="img-fluid"
                                                            alt="Slider Img"
                                                        />
                                                    </div>
                                                    <div>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-thumb-06.jpg"
                                                            className="img-fluid"
                                                            alt="Slider Img"
                                                        />
                                                    </div>
                                                </AppSwiper>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Slider */}
                                <div className="card shadow-none bg-light-200">
                                    <div className="card-body pb-1">
                                        <h5 className="d-flex align-items-center fs-18 mb-3">
                                            <span className="avatar avatar-md rounded-circle bg-primary me-2">
                                                <i className="isax isax-airplane5" />
                                            </span>
                                            Flight Information
                                        </h5>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Airline</h6>
                                                    <p>Air India</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Flight Number</h6>
                                                    <p>AI 191</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Aircraft Type</h6>
                                                    <p>Boeing 787-9 Dreamliner</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Cabin Class</h6>
                                                    <p>Economy</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Departure</h6>
                                                    <p>DEL &middot; 25 May 2025, 04:45</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Arrival</h6>
                                                    <p>BCN &middot; 25 May 2025, 14:30</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Total Duration</h6>
                                                    <p>13h 45m &middot; 1 stop</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <div className="mb-3">
                                                    <h6 className="mb-1">Layover</h6>
                                                    <p>Dubai (DXB) &middot; 2h 10m</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion custom-accordion accordion-shadow-none">
                                    <div className="accordion-item border-0 mb-4">
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_two"
                                                aria-expanded="true"
                                            >
                                                Description
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_two"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <p className="mb-2">
                                                    Air India AI 191 departs Delhi Terminal 3 at 04:45 and
                                                    arrives into Barcelona El Prat Terminal 1 at 14:30 local
                                                    time, with a single 2h 10m connection in Dubai. Total
                                                    journey time is 13h 45m.
                                                </p>
                                                <div className="read-more">
                                                    <div className="more-text">
                                                        <p>
                                                            Both legs are operated by a Boeing 787-9 Dreamliner in a
                                                            3-3-3 economy configuration. Seat selection opens at
                                                            booking, and online check-in opens 48 hours before
                                                            departure.
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href="#"
                                                        className="fs-14 fw-medium more-link text-decoration-underline mb-2"
                                                    >
                                                        Show More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 mb-4">
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_itinerary"
                                                aria-expanded="true"
                                            >
                                                Flight Itinerary
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_itinerary"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <div className="card shadow-none mb-3">
                                                    <div className="card-body p-3">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                                            <p className="fs-14 fw-medium text-dark mb-0">
                                                                Leg 1 &middot; AI 191 &middot; Boeing 787-9
                                                            </p>
                                                            <span className="badge badge-xs bg-light text-dark">
                                                                Economy
                                                            </span>
                                                        </div>
                                                        <div className="row row-gap-3">
                                                            <div className="col-md-4">
                                                                <h6 className="mb-1">04:45 &middot; DEL</h6>
                                                                <p className="fs-14 mb-0">Delhi, Terminal 3</p>
                                                                <p className="fs-14 mb-0">25 May 2025</p>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h6 className="mb-1">4h 20m</h6>
                                                                <p className="fs-14 mb-0">Non-stop</p>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h6 className="mb-1">07:05 &middot; DXB</h6>
                                                                <p className="fs-14 mb-0">Dubai, Terminal 1</p>
                                                                <p className="fs-14 mb-0">25 May 2025</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center bg-light-200 p-3 mb-3">
                                                    <i className="isax isax-clock text-primary me-2 fs-16" />
                                                    <p className="fs-14 mb-0">
                                                        Layover in Dubai (DXB) &middot; 2h 10m &middot; Change of
                                                        gate, no terminal change
                                                    </p>
                                                </div>
                                                <div className="card shadow-none mb-0">
                                                    <div className="card-body p-3">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                                            <p className="fs-14 fw-medium text-dark mb-0">
                                                                Leg 2 &middot; AI 193 &middot; Boeing 787-9
                                                            </p>
                                                            <span className="badge badge-xs bg-light text-dark">
                                                                Economy
                                                            </span>
                                                        </div>
                                                        <div className="row row-gap-3">
                                                            <div className="col-md-4">
                                                                <h6 className="mb-1">09:15 &middot; DXB</h6>
                                                                <p className="fs-14 mb-0">Dubai, Terminal 1</p>
                                                                <p className="fs-14 mb-0">25 May 2025</p>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h6 className="mb-1">7h 15m</h6>
                                                                <p className="fs-14 mb-0">Non-stop</p>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h6 className="mb-1">14:30 &middot; BCN</h6>
                                                                <p className="fs-14 mb-0">
                                                                    Barcelona El Prat, Terminal 1
                                                                </p>
                                                                <p className="fs-14 mb-0">25 May 2025</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-0 border-0 pb-1">
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_three"
                                                aria-expanded="true"
                                            >
                                                Amenities
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_three"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <h6 className="mb-2">Onboard Dining</h6>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Complimentary hot meal</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Snacks and soft drinks</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Special meal requests</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Vegetarian and Jain options</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <h6 className="mb-2">In-flight Entertainment</h6>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Seat-back touchscreen</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Films and TV series</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Music and podcasts</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Noise-reducing headset</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <h6 className="mb-2">Seat &amp; Comfort</h6>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>31" seat pitch</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Adjustable headrest</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Blanket and pillow</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Extra legroom seats available</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <h6 className="mb-2">Connectivity &amp; Power</h6>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Wi-Fi (paid, from $12)</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>USB-A charging at every seat</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Universal power outlet</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <h6 className="mb-2">Travelling with Family</h6>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Bassinet seats on request</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Priority family boarding</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Child and infant meals</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <h6 className="mb-2">Baggage Allowance</h6>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Cabin bag 7 kg + personal item</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Checked bag 25 kg included</p>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="isax isax-verify text-primary me-2 fs-16" />
                                                                <p>Extra bag from $60</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 mb-4">
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_fare"
                                                aria-expanded="true"
                                            >
                                                Baggage &amp; Fare Rules
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_fare"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <div className="table-responsive mb-3">
                                                    <table className="table table-borderless mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="fs-14">Allowance</th>
                                                                <th scope="col" className="fs-14">Economy</th>
                                                                <th scope="col" className="fs-14">Premium Economy</th>
                                                                <th scope="col" className="fs-14">Business</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="fs-14">Cabin baggage</td>
                                                                <td className="fs-14">7 kg</td>
                                                                <td className="fs-14">10 kg</td>
                                                                <td className="fs-14">2 &times; 10 kg</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="fs-14">Checked baggage</td>
                                                                <td className="fs-14">25 kg</td>
                                                                <td className="fs-14">35 kg</td>
                                                                <td className="fs-14">2 &times; 32 kg</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="fs-14">Seat selection</td>
                                                                <td className="fs-14">From $9</td>
                                                                <td className="fs-14">Free</td>
                                                                <td className="fs-14">Free</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="fs-14">Date change</td>
                                                                <td className="fs-14">$85 + fare difference</td>
                                                                <td className="fs-14">$45 + fare difference</td>
                                                                <td className="fs-14">Free</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="fs-14">Refund</td>
                                                                <td className="fs-14">Non-refundable</td>
                                                                <td className="fs-14">Partial</td>
                                                                <td className="fs-14">Fully refundable</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <h6 className="mb-2">Passenger information required</h6>
                                                <div className="row row-gap-2">
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16" />
                                                            <p>Full name exactly as printed in the passport</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16" />
                                                            <p>Date of birth and nationality</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16" />
                                                            <p>Passport number and expiry, valid 6 months beyond travel</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16" />
                                                            <p>Contact email and mobile for airline notifications</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 mb-4">
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_policy"
                                                aria-expanded="true"
                                            >
                                                Cancellation &amp; Change Policy
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_policy"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <div className="d-flex align-items-start mb-2">
                                                    <i className="isax isax-tick-square5 text-success me-2 fs-16 mt-1" />
                                                    <p>
                                                        Free cancellation within 24 hours of booking, provided
                                                        departure is more than 7 days away.
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-start mb-2">
                                                    <i className="isax isax-tick-square5 text-success me-2 fs-16 mt-1" />
                                                    <p>
                                                        Date changes permitted up to 4 hours before departure,
                                                        subject to the fee and fare difference shown above.
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-start mb-2">
                                                    <i className="isax isax-close-square5 text-danger me-2 fs-16 mt-1" />
                                                    <p>
                                                        Name changes are not permitted after ticketing. A new
                                                        booking is required.
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-start mb-2">
                                                    <i className="isax isax-close-square5 text-danger me-2 fs-16 mt-1" />
                                                    <p>
                                                        No-show bookings forfeit the fare. Government taxes
                                                        remain refundable on request.
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-start mb-0">
                                                    <i className="isax isax-info-circle text-primary me-2 fs-16 mt-1" />
                                                    <p>
                                                        Refunds are processed to the original payment method
                                                        within 7&ndash;14 business days of approval.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-0 border-0 pb-1">
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_six"
                                                aria-expanded="true"
                                            >
                                                Available Seats
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_six"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <div className="banner-form">
                                                    <form >
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                                                    <input
                                                                        className="form-check-input mt-0"
                                                                        type="radio"
                                                                        name="Radio"
                                                                        id="oneway"
                                                                        onChange={() => setFlightRadio('oneway')}
                                                                        checked={flightRadio === 'oneway' ? true : false}
                                                                    />
                                                                    <label
                                                                        className="form-check-label fs-14 ms-2"
                                                                        htmlFor="oneway"
                                                                    >
                                                                        Oneway
                                                                    </label>
                                                                </div>
                                                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                                                    <input
                                                                        className="form-check-input mt-0"
                                                                        type="radio"
                                                                        name="Radio"
                                                                        id="roundtrip"
                                                                        onChange={() => setFlightRadio('roundtrip')}
                                                                        checked={flightRadio === 'roundtrip' ? true : false}
                                                                    />
                                                                    <label
                                                                        className="form-check-label fs-14 ms-2"
                                                                        htmlFor="roundtrip"
                                                                    >
                                                                        Round Trip
                                                                    </label>
                                                                </div>
                                                                <div className="form-check d-flex align-items-center me-3 mb-2">
                                                                    <input
                                                                        className="form-check-input mt-0"
                                                                        type="radio"
                                                                        name="Radio"
                                                                        id="multiway"
                                                                        defaultValue="multiway"
                                                                        onChange={() => setFlightRadio('multiway')}
                                                                        checked={flightRadio === 'multiway' ? true : false}
                                                                    />
                                                                    <label
                                                                        className="form-check-label fs-14 ms-2"
                                                                        htmlFor="multiway"
                                                                    >
                                                                        Multi Trip
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <h6 className="fw-medium fs-16 mb-2">
                                                                Millions of cheap flights. One simple search
                                                            </h6>
                                                        </div>
                                                        <div className="normal-trip mb-4" style={{ display: flightRadio === 'multiway' ? 'none' : 'block' }}>
                                                            <div className="d-lg-flex">
                                                                <div className="d-flex  form-info">
                                                                    <div className="form-item dropdown">
                                                                        <div
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="outside"

                                                                            role="menu"
                                                                        >
                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                From
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue="New York"
                                                                            />
                                                                            <p className="fs-12 mb-0">
                                                                                John F. Kennedy International Airport
                                                                            </p>
                                                                        </div>
                                                                        <div className="dropdown-menu dropdown-md p-0">
                                                                            <div className="input-search p-3 border-bottom">
                                                                                <div className="input-group">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Search airport or city"
                                                                                    />
                                                                                    <span className="input-group-text px-2 border-start-0">
                                                                                        <i className="isax isax-search-normal" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <ul>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            New York
                                                                                        </h6>
                                                                                        <p>John F. Kennedy International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Boston
                                                                                        </h6>
                                                                                        <p>
                                                                                            Boston Logan International Airport
                                                                                        </p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Northern Virginia
                                                                                        </h6>
                                                                                        <p>Dulles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Los Angeles
                                                                                        </h6>
                                                                                        <p>Los Angeles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Orlando
                                                                                        </h6>
                                                                                        <p>Orlando International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-item dropdown ps-2 ps-sm-3">
                                                                        <div
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="outside"

                                                                            role="menu"
                                                                        >
                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                To
                                                                            </label>
                                                                            <h5>Las Vegas</h5>
                                                                            <p className="fs-12 mb-0">
                                                                                Harry Reid International Airport
                                                                            </p>
                                                                            <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                                                                <i className="fa-solid fa-arrow-right-arrow-left" />
                                                                            </span>
                                                                        </div>
                                                                        <div className="dropdown-menu dropdown-md p-0">
                                                                            <div className="input-search p-3 border-bottom">
                                                                                <div className="input-group">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Search airport or city"
                                                                                    />
                                                                                    <span className="input-group-text px-2 border-start-0">
                                                                                        <i className="isax isax-search-normal" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <ul>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            New York
                                                                                        </h6>
                                                                                        <p>John F. Kennedy International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Boston
                                                                                        </h6>
                                                                                        <p>
                                                                                            Boston Logan International Airport
                                                                                        </p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Northern Virginia
                                                                                        </h6>
                                                                                        <p>Dulles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Los Angeles
                                                                                        </h6>
                                                                                        <p>Los Angeles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Orlando
                                                                                        </h6>
                                                                                        <p>Orlando International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-item">
                                                                        <label className="form-label fs-14 text-default mb-1">
                                                                            Departure
                                                                        </label>
                                                                        <DatePicker
                                                                            className="form-control datetimepicker"
                                                                            placeholder="dd/mm/yyyy"
                                                                            defaultValue={defaultDate}
                                                                            format="DD-MM-YYYY"
                                                                        />
                                                                        <p className="fs-12 mb-0">Monday</p>
                                                                    </div>
                                                                    <div className="form-item round-drip" style={{ display: flightRadio === 'roundtrip' ? 'block' : 'none' }}>
                                                                        <label className="form-label fs-14 text-default mb-1">
                                                                            Return
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control datetimepicker"
                                                                            defaultValue="23-10-2024"
                                                                        />
                                                                        <p className="fs-12 mb-0">Wednesday</p>
                                                                    </div>
                                                                    <div className="form-item dropdown">
                                                                        <div
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="outside"

                                                                            role="menu"
                                                                        >
                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                Travellers and cabin class
                                                                            </label>
                                                                            <h5>
                                                                                4{" "}
                                                                                <span className="fw-normal fs-14">
                                                                                    Persons
                                                                                </span>
                                                                            </h5>
                                                                            <p className="fs-12 mb-0">1 Adult, Economy</p>
                                                                        </div>
                                                                        <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                                                            <h5 className="mb-3">
                                                                                Select Travelers &amp; Class
                                                                            </h5>
                                                                            <div className="mb-3 border br-10 info-item pb-1">
                                                                                <h6 className="fs-16 fw-medium mb-2">
                                                                                    Travellers
                                                                                </h6>
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label text-gray-9 mb-2">
                                                                                                Adults{" "}
                                                                                                <span className="text-default fw-normal">
                                                                                                    ( 12+ Yrs )
                                                                                                </span>
                                                                                            </label>
                                                                                            <BannerCounter />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label text-gray-9 mb-2">
                                                                                                Childrens{" "}
                                                                                                <span className="text-default fw-normal">
                                                                                                    ( 2-12 Yrs )
                                                                                                </span>
                                                                                            </label>
                                                                                            <BannerCounter />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label text-gray-9 mb-2">
                                                                                                Infants
                                                                                                <span className="text-default fw-normal">
                                                                                                    ( 0-12 Yrs )
                                                                                                </span>
                                                                                            </label>
                                                                                            <BannerCounter />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 border br-10 info-item pb-1">
                                                                                <h6 className="fs-16 fw-medium mb-2">
                                                                                    Travellers
                                                                                </h6>
                                                                                <div className="d-flex align-items-center flex-wrap">
                                                                                    <div className="form-check me-3 mb-3">
                                                                                        <input
                                                                                            className="form-check-input"
                                                                                            type="radio"
                                                                                            defaultValue="Economy"
                                                                                            name="cabin-class"
                                                                                            id="economy"
                                                                                            defaultChecked
                                                                                        />
                                                                                        <label
                                                                                            className="form-check-label"
                                                                                            htmlFor="economy"
                                                                                        >
                                                                                            Economy
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="form-check me-3 mb-3">
                                                                                        <input
                                                                                            className="form-check-input"
                                                                                            type="radio"
                                                                                            defaultValue="Economy"
                                                                                            name="cabin-class"
                                                                                            id="premium-economy"
                                                                                        />
                                                                                        <label
                                                                                            className="form-check-label"
                                                                                            htmlFor="premium-economy"
                                                                                        >
                                                                                            Premium Economy
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="form-check me-3 mb-3">
                                                                                        <input
                                                                                            className="form-check-input"
                                                                                            type="radio"
                                                                                            defaultValue="Business"
                                                                                            name="cabin-class"
                                                                                            id="business"
                                                                                        />
                                                                                        <label
                                                                                            className="form-check-label"
                                                                                            htmlFor="business"
                                                                                        >
                                                                                            Business
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="form-check mb-3">
                                                                                        <input
                                                                                            className="form-check-input"
                                                                                            type="radio"
                                                                                            defaultValue="First Class"
                                                                                            name="cabin-class"
                                                                                            id="first-class"
                                                                                        />
                                                                                        <label
                                                                                            className="form-check-label"
                                                                                            htmlFor="first-class"
                                                                                        >
                                                                                            First Class
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex justify-content-end">
                                                                                <Link
                                                                                    href="#"
                                                                                    className="btn btn-light btn-sm me-2"
                                                                                >
                                                                                    Cancel
                                                                                </Link>

                                                                                <Link
                                                                                    href={all_routes.flightGrid}
                                                                                    className="btn btn-primary btn-sm"
                                                                                >
                                                                                    Apply
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <Link
                                                                    href={all_routes.flightGrid}
                                                                    className="btn btn-primary search-btn rounded"
                                                                >
                                                                    Search
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="multi-trip mb-4" style={{ display: flightRadio === 'multiway' ? 'block' : 'none' }}>
                                                            <div className="d-lg-flex">
                                                                <div className="d-flex  form-info">
                                                                    <div className="form-item dropdown">
                                                                        <div
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="outside"
                                                                            role="menu"
                                                                        >
                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                From
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue="New York"
                                                                            />
                                                                            <p className="fs-12 mb-0">
                                                                                John F. Kennedy International Airport
                                                                            </p>
                                                                        </div>
                                                                        <div className="dropdown-menu dropdown-md p-0">
                                                                            <div className="input-search p-3 border-bottom">
                                                                                <div className="input-group">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Search airport or city"
                                                                                    />
                                                                                    <span className="input-group-text px-2 border-start-0">
                                                                                        <i className="isax isax-search-normal" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <ul>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            New York
                                                                                        </h6>
                                                                                        <p>John F. Kennedy International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Boston
                                                                                        </h6>
                                                                                        <p>
                                                                                            Boston Logan International Airport
                                                                                        </p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Northern Virginia
                                                                                        </h6>
                                                                                        <p>Dulles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Los Angeles
                                                                                        </h6>
                                                                                        <p>Los Angeles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Orlando
                                                                                        </h6>
                                                                                        <p>Orlando International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-item dropdown ps-2 ps-sm-3">
                                                                        <div
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="outside"
                                                                            role="menu"
                                                                        >
                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                To
                                                                            </label>
                                                                            <h5>Las Vegas</h5>
                                                                            <p className="fs-12 mb-0">
                                                                                Harry Reid International Airport
                                                                            </p>
                                                                            <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                                                                <i className="fa-solid fa-arrow-right-arrow-left" />
                                                                            </span>
                                                                        </div>
                                                                        <div className="dropdown-menu dropdown-md p-0">
                                                                            <div className="input-search p-3 border-bottom">
                                                                                <div className="input-group">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Search airport or city"
                                                                                    />
                                                                                    <span className="input-group-text px-2 border-start-0">
                                                                                        <i className="isax isax-search-normal" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <ul>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            New York
                                                                                        </h6>
                                                                                        <p>John F. Kennedy International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Boston
                                                                                        </h6>
                                                                                        <p>
                                                                                            Boston Logan International Airport
                                                                                        </p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Northern Virginia
                                                                                        </h6>
                                                                                        <p>Dulles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="border-bottom">
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Los Angeles
                                                                                        </h6>
                                                                                        <p>Los Angeles International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <Link
                                                                                        className="dropdown-item"
                                                                                        href="#"
                                                                                    >
                                                                                        <h6 className="fs-16 fw-medium">
                                                                                            Orlando
                                                                                        </h6>
                                                                                        <p>Orlando International Airport</p>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-item">
                                                                        <label className="form-label fs-14 text-default mb-1">
                                                                            Departure
                                                                        </label>
                                                                        <DatePicker
                                                                            className="form-control datetimepicker"
                                                                            placeholder="dd/mm/yyyy"
                                                                            defaultValue={defaultDate}
                                                                            format="DD-MM-YYYY"
                                                                        />
                                                                        <p className="fs-12 mb-0">Monday</p>
                                                                    </div>
                                                                </div>
                                                                <Link
                                                                    href={all_routes.flightGrid}
                                                                    className="btn btn-primary search-btn rounded"
                                                                >
                                                                    Search
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/* Flight List */}
                                                <div className="hotel-list flight-details-list">
                                                    <div className="place-item mb-4">
                                                        <div className="place-img">
                                                            
                                                                <AppSwiper preset="img-slider">
                                                                    <div className="slide-images">
                                                                        <Link href={routes.flightDetails}>
                                                                            <ImageWithBasePath
                                                                                src="assets/img/flight/flight-01.jpg"
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="slide-images">
                                                                        <Link href={routes.flightDetails}>
                                                                            <ImageWithBasePath
                                                                                src="assets/img/flight/flight-02.jpg"
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                </AppSwiper>
                                                            <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                                <span className="badge bg-pink">Popular</span>
                                                                <Link href="#" className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
                                                                    <i className="isax isax-heart5" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="place-content pb-1">
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                                <div className="overflow-hidden">
                                                                    <h5 className="mb-2 d-inline-flex align-items-center text-truncate">
                                                                        <Link href={routes.flightDetails}>Economy Class</Link>
                                                                    </h5>
                                                                </div>
                                                                <div className="d-flex align-items-center text-nowrap mb-2">
                                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                        4.3
                                                                    </span>
                                                                    <p className="fs-14">(380 Reviews)</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <p className="me-3 mb-3 d-inline-flex align-items-center">
                                                                    <i className="isax isax-tick-circle5 text-success me-1" />
                                                                    Excess Baggage
                                                                </p>
                                                                <p className="mb-3 d-inline-flex align-items-center">
                                                                    <i className="isax isax-tick-circle5 text-success me-1" />
                                                                    Priority Boarding
                                                                </p>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    &nbsp;LED TV 2
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    15 m²
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    Free WiFi
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    Private Safe
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                                <h5 className="text-primary me-2">
                                                                    $500{" "}
                                                                    <span className="text-default text-decoration-line-through">
                                                                        $252
                                                                    </span>{" "}
                                                                    <span className="fs-14 fw-normal text-default">
                                                                        / Person ( $759 total includes taxes &amp; fees )
                                                                    </span>
                                                                </h5>
                                                                <div className="btn btn-primary btn-md">
                                                                    <div className="form-check d-flex align-items-center ps-0">
                                                                        <input
                                                                            className="form-check-input ms-0 mt-0 border border-white"
                                                                            name="book"
                                                                            type="checkbox"
                                                                            id="book1"
                                                                            defaultChecked
                                                                        />
                                                                        <label
                                                                            className="form-check-label fs-13 text-white ms-2"
                                                                            htmlFor="book1"
                                                                        >
                                                                            Select
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="place-item mb-4">
                                                        <div className="place-img">
                                                            
                                                                <AppSwiper preset="img-slider">
                                                                    <div className="slide-images">
                                                                        <Link href={routes.flightDetails}>
                                                                            <ImageWithBasePath
                                                                                src="assets/img/flight/flight-03.jpg"
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="slide-images">
                                                                        <Link href={routes.flightDetails}>
                                                                            <ImageWithBasePath
                                                                                src="assets/img/flight/flight-04.jpg"
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                </AppSwiper>
                                                            <div className="fav-item justify-content-end" key={2} onClick={() => handleItemClick(2)}>
                                                                <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                                                    <i className="isax isax-heart5" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="place-content pb-1">
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                                <div className="overflow-hidden">
                                                                    <h5 className="mb-2 d-inline-flex align-items-center text-truncate">
                                                                        <Link href={routes.flightDetails}>Business Class</Link>
                                                                    </h5>
                                                                </div>
                                                                <div className="d-flex align-items-center text-nowrap mb-2">
                                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                        4.3
                                                                    </span>
                                                                    <p className="fs-14">(380 Reviews)</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <p className="me-3 mb-3 d-inline-flex align-items-center">
                                                                    <i className="isax isax-tick-circle5 text-success me-1" />
                                                                    Excess Baggage
                                                                </p>
                                                                <p className="mb-3 d-inline-flex align-items-center">
                                                                    <i className="isax isax-tick-circle5 text-success me-1" />
                                                                    Priority Boarding
                                                                </p>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    &nbsp;LED TV 2
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    15 m²
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    Free WiFi
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    Private Safe
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                                <h5 className="text-primary me-2">
                                                                    $500{" "}
                                                                    <span className="text-default text-decoration-line-through">
                                                                        $658
                                                                    </span>{" "}
                                                                    <span className="fs-14 fw-normal text-default">
                                                                        / Person ( $756 total includes taxes &amp; fees )
                                                                    </span>
                                                                </h5>
                                                                <div className="btn btn-primary btn-md">
                                                                    <div className="form-check d-flex align-items-center ps-0">
                                                                        <input
                                                                            className="form-check-input ms-0 mt-0 border border-white"
                                                                            name="book"
                                                                            type="checkbox"
                                                                            id="book2"
                                                                        />
                                                                        <label
                                                                            className="form-check-label fs-13 text-white ms-2"
                                                                            htmlFor="book2"
                                                                        >
                                                                            Select
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="place-item mb-4">
                                                        <div className="place-img">
                                                            
                                                                <AppSwiper preset="img-slider">
                                                                    <div className="slide-images">
                                                                        <Link href={routes.flightDetails}>
                                                                            <ImageWithBasePath
                                                                                src="assets/img/flight/flight-13.jpg"
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="slide-images">
                                                                        <Link href={routes.flightDetails}>
                                                                            <ImageWithBasePath
                                                                                src="assets/img/flight/flight-12.jpg"
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                </AppSwiper>
                                                            <div className="fav-item justify-content-end" key={3} onClick={() => handleItemClick(3)}>
                                                                <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                                                    <i className="isax isax-heart5" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="place-content pb-1">
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                                <div className="overflow-hidden">
                                                                    <h5 className="mb-2 d-inline-flex align-items-center text-truncate">
                                                                        <Link href={routes.flightDetails}>Regular</Link>
                                                                    </h5>
                                                                </div>
                                                                <div className="d-flex align-items-center text-nowrap mb-2">
                                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                        4.3
                                                                    </span>
                                                                    <p className="fs-14">(380 Reviews)</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <p className="me-3 mb-3 d-inline-flex align-items-center">
                                                                    <i className="isax isax-tick-circle5 text-success me-1" />
                                                                    Excess Baggage
                                                                </p>
                                                                <p className="mb-3 d-inline-flex align-items-center">
                                                                    <i className="isax isax-tick-circle5 text-success me-1" />
                                                                    Priority Boarding
                                                                </p>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    &nbsp;LED TV 2
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    15 m²
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    Free WiFi
                                                                </span>
                                                                <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                                                    Private Safe
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3 gap-2">
                                                                <h5 className="text-primary me-2">
                                                                    $500{" "}
                                                                    <span className="text-default text-decoration-line-through">
                                                                        $989
                                                                    </span>{" "}
                                                                    <span className="fs-14 fw-normal text-default">
                                                                        / Person ( $1059 total includes taxes &amp; fees )
                                                                    </span>
                                                                </h5>
                                                                <div className="btn btn-primary btn-md">
                                                                    <div className="form-check d-flex align-items-center ps-0">
                                                                        <input
                                                                            className="form-check-input ms-0 mt-0 border border-white"
                                                                            name="book"
                                                                            type="checkbox"
                                                                            id="book3"
                                                                            defaultChecked
                                                                        />
                                                                        <label
                                                                            className="form-check-label fs-13 text-white ms-2"
                                                                            htmlFor="book3"
                                                                        >
                                                                            Select
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* /Flight List */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-4 border-0">

                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_four"
                                                aria-expanded="true"

                                            >
                                                Gallery
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_four"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <div className="row row-cols-lg-6 row-cols-sm-4 row-cols-2 g-2">
                                                    <div className="col">
                                                        <Link
                                                            className="galley-wrap"
                                                            data-fancybox="gallery"

                                                            onClick={() => setGallery(true)} href="#" title="Demo 01"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-thumb-01.jpg"
                                                                alt="img"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="col">
                                                        <Link
                                                            className="galley-wrap"
                                                            data-fancybox="gallery"

                                                            onClick={() => setGallery(true)} href="#" title="Demo 01"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-thumb-02.jpg"
                                                                alt="img"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="col">
                                                        <Link
                                                            className="galley-wrap"
                                                            data-fancybox="gallery"
                                                            onClick={() => setGallery(true)} href="#" title="Demo 01"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-thumb-03.jpg"
                                                                alt="img"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="col">
                                                        <Link
                                                            className="galley-wrap"
                                                            data-fancybox="gallery"
                                                            onClick={() => setGallery(true)} href="#" title="Demo 01"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-thumb-04.jpg"
                                                                alt="img"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="col">
                                                        <Link
                                                            className="galley-wrap"
                                                            data-fancybox="gallery"
                                                            onClick={() => setGallery(true)} href="#" title="Demo 01"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-thumb-05.jpg"
                                                                alt="img"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="col">
                                                        <div className="galley-wrap more-gallery d-flex align-items-center justify-content-center">
                                                            <Link
                                                                data-fancybox="gallery"
                                                                onClick={() => setGallery(true)} href="#" title="Demo 01"
                                                                className="btn btn-white btn-xs"
                                                            >
                                                                <i className="isax isax-image5 me-1" />
                                                                See All
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-4 border-0">
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_eight"
                                                aria-expanded="true"
                                            >
                                                Frequently Asked Questions
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_eight"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body pt-0">
                                                <div className="accordion faq-accordion" id="accordionFaq">
                                                    <div className="accordion-item show mb-2">
                                                        <div className="accordion-header">
                                                            <button
                                                                className="accordion-button fw-medium"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#faq-collapseOne"

                                                                aria-controls="faq-collapseOne"
                                                            >
                                                                How early should I arrive at the airport?
                                                            </button>
                                                        </div>
                                                        <div
                                                            id="faq-collapseOne"
                                                            className="accordion-collapse collapse show"
                                                            data-bs-parent="#accordionFaq"
                                                        >
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    Check-in counters open three hours before departure
                                                                    and close 60 minutes prior. For international routes
                                                                    we recommend arriving three hours ahead to allow for
                                                                    security and immigration.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item mb-2">
                                                        <div className="accordion-header">
                                                            <button
                                                                className="accordion-button fw-medium collapsed"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#faq-two"

                                                                aria-controls="faq-two"
                                                            >
                                                                What documents do I need to board?
                                                            </button>
                                                        </div>
                                                        <div
                                                            id="faq-two"
                                                            className="accordion-collapse collapse"
                                                            data-bs-parent="#accordionFaq"
                                                        >
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    A passport valid for at least six months beyond your
                                                                    travel date, plus any visa or transit permit required
                                                                    for your destination and layover country.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item mb-2">
                                                        <div className="accordion-header">
                                                            <button
                                                                className="accordion-button fw-medium collapsed"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#faq-three"

                                                                aria-controls="faq-three"
                                                            >
                                                                What cabin classes are available on this route?
                                                            </button>
                                                        </div>
                                                        <div
                                                            id="faq-three"
                                                            className="accordion-collapse collapse"
                                                            data-bs-parent="#accordionFaq"
                                                        >
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    This route is sold in Economy, Premium Economy and
                                                                    Business. Baggage, seat selection and change rules
                                                                    differ by class, as set out in the fare rules above.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <div className="accordion-header">
                                                            <button
                                                                className="accordion-button fw-medium collapsed"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#faq-four"

                                                                aria-controls="faq-four"
                                                            >
                                                                Can I pay for my ticket with a debit card?
                                                            </button>
                                                        </div>
                                                        <div
                                                            id="faq-four"
                                                            className="accordion-collapse collapse"
                                                            data-bs-parent="#accordionFaq"
                                                        >
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    Yes. We accept Visa, Mastercard and Amex debit and
                                                                    credit cards, along with PayPal and Stripe. The card
                                                                    holder does not need to be a passenger.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="accordion-item mb-xl-0 mb-4 shadow-sm p-3 border-0"
                                        id="reviews"
                                    >
                                        <div className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#accordion_collapse_nine"
                                                aria-expanded="true"
                                            >
                                                Reviews
                                            </button>
                                        </div>
                                        <div
                                            id="accordion_collapse_nine"
                                            className="accordion-collapse collapse show"
                                        >
                                            <div className="accordion-body border-top mt-3 pt-3">
                                                <Reviews />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 ">
                                <div className="">
                                    <div className="card shadow-none ">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-4">
                                                <span className="btn btn-outline-light flex-fill">
                                                    <span className="icon-rotate-up me-2">
                                                        <i className="isax isax-airplane" />
                                                    </span>
                                                    New York
                                                </span>
                                                <Link
                                                    href="#"
                                                    className="way-icon badge badge-primary rounded-pill mx-2"
                                                >
                                                    <i className="fa-solid fa-arrow-right-arrow-left" />
                                                </Link>
                                                <span className="btn btn-outline-light flex-fill">
                                                    <span className="icon-rotate-down me-2">
                                                        <i className="isax isax-airplane" />
                                                    </span>
                                                    Sydney
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between bg-light-200 rounded p-3 mb-3">
                                                <p className="fs-13 fw-medium mb-0">Economy from</p>
                                                <h5 className="text-primary">
                                                    $624{" "}
                                                    <span className="fs-14 text-default fw-normal">per person</span>
                                                </h5>
                                            </div>
                                            <h5 className="fs-18 mb-3">Check Availability</h5>
                                            <div className="banner-form">
                                                <form

                                                    className="form-info border-0"
                                                >
                                                    <div className="form-info border-0">
                                                        <div className="form-item dropdown border rounded p-3 mb-3 w-100">
                                                            <div
                                                                data-bs-toggle="dropdown"
                                                                data-bs-auto-close="outside"

                                                                role="menu"
                                                            >
                                                                <label className="form-label fs-14 text-default mb-1">
                                                                    From
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue="Delhi"
                                                                />
                                                                <p className="fs-12 mb-0">Indira Gandhi International (DEL)</p>
                                                            </div>
                                                            <div className="dropdown-menu dropdown-md p-0">
                                                                <div className="input-search p-3 border-bottom">
                                                                    <div className="input-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Search airport or city"
                                                                        />
                                                                        <span className="input-group-text px-2 border-start-0">
                                                                            <i className="isax isax-search-normal" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">New York</h6>
                                                                            <p>John F. Kennedy International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">Boston</h6>
                                                                            <p>Boston Logan International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">
                                                                                Northern Virginia
                                                                            </h6>
                                                                            <p>Dulles International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">Los Angeles</h6>
                                                                            <p>Los Angeles International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">Orlando</h6>
                                                                            <p>Orlando International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="form-item dropdown border rounded p-2 mb-3 w-100">
                                                            <div
                                                                data-bs-toggle="dropdown"
                                                                data-bs-auto-close="outside"

                                                                role="menu"
                                                            >
                                                                <label className="form-label fs-14 text-default mb-1">
                                                                    To
                                                                </label>
                                                                <h5>Barcelona</h5>
                                                                <p className="fs-12 mb-0">
                                                                    Josep Tarradellas El Prat (BCN)
                                                                </p>
                                                            </div>
                                                            <div className="dropdown-menu dropdown-md p-0">
                                                                <div className="input-search p-3 border-bottom">
                                                                    <div className="input-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Search airport or city"
                                                                        />
                                                                        <span className="input-group-text px-2 border-start-0">
                                                                            <i className="isax isax-search-normal" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">New York</h6>
                                                                            <p>John F. Kennedy International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">Boston</h6>
                                                                            <p>Boston Logan International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">
                                                                                Northern Virginia
                                                                            </h6>
                                                                            <p>Dulles International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="border-bottom">
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">Los Angeles</h6>
                                                                            <p>Los Angeles International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            <h6 className="fs-16 fw-medium">Orlando</h6>
                                                                            <p>Orlando International Airport</p>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="form-item border rounded p-3 mb-3 w-100">
                                                            <label className="form-label fs-14 text-default mb-1">
                                                                Departure
                                                            </label>
                                                            <DatePicker
                                                                className="form-control datetimepicker"
                                                                placeholder="dd/mm/yyyy"
                                                                defaultValue={defaultDate}
                                                                format="DD-MM-YYYY"
                                                            />
                                                            <p className="fs-12 mb-0">Monday</p>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-14 text-default mb-1">
                                                                Preferred Class
                                                            </label>
                                                            <CustomSelect
                                                                options={PreferredClass}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                            />
                                                        </div>
                                                        <div className="card shadow-none mb-3">
                                                            <div className="card-body p-3 pb-0">
                                                                <div className="border-bottom pb-2 mb-2">
                                                                    <h6>Details</h6>
                                                                </div>
                                                                <div className="custom-increment">
                                                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                                                        <label className="form-label text-gray-9 mb-0">
                                                                            Adults
                                                                        </label>
                                                                        <BannerCounter />
                                                                    </div>
                                                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                                                        <label className="form-label text-gray-9 mb-0">
                                                                            Infants{" "}
                                                                            <span className="text-default fw-normal">
                                                                                ( 0-12 Yrs )
                                                                            </span>
                                                                        </label>
                                                                        <BannerCounter />
                                                                    </div>
                                                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                                                        <label className="form-label text-gray-9 mb-0">
                                                                            Children{" "}
                                                                            <span className="text-default fw-normal">
                                                                                ( 2-12 Yrs )
                                                                            </span>
                                                                        </label>
                                                                        <BannerCounter />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={routes.flightSeatSelection}
                                                        className="btn btn-primary btn-lg search-btn ms-0 w-100 mb-3 fs-14 justify-content-center"
                                                    >
                                                        Select Seats
                                                    </Link>
                                                    <div className="d-flex align-items-center justify-content-between mt-1">
                                                        <h6 className="fs-14 fw-medium text-success">
                                                            40 seats available in Economy
                                                        </h6>
                                                        <Link
                                                            href={routes.flightSeatSelection}
                                                            className="link-primary text-decoration-underline fs-14"
                                                        >
                                                            View seat map
                                                        </Link>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Map */}
                                    <div className="card shadow-none" id="location">
                                        <div className="d-flex">
                                            <iframe
                                                src="https://www.google.com/maps?q=Indira%20Gandhi%20International%20Airport%2C%20Delhi&output=embed"
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="contact-map"
                                            />
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="isax isax-location5 me-2" />
                                                    15,Adri Street,Ciutat Vella,Barcelona
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Map */}
                                    {/* Enquiry */}
                                    <div className="card shadow-none">
                                        <div className="card-body">
                                            <form action={routes.flightDetails}>
                                                <h5 className="mb-3 fs-18">Enquire Us</h5>
                                                <div className="py-1">
                                                    <div className="mb-3">
                                                        <label className="form-label">Name</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" className="form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Phone</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Message</label>
                                                        <textarea
                                                            className="form-control"
                                                            rows={3}
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 btn-lg d-flex align-items-center justify-content-center"
                                                >
                                                    Submit Enquiry
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    {/* /Enquiry */}
                                    <div className="card shadow-none">
                                        <div className="card-body">
                                            <h5 className="fs-18 mb-3">Why Book With Us</h5>
                                            <div>
                                                <p className="d-flex align-items-center mb-3">
                                                    <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                                                        <i className="isax isax-medal-star" />
                                                    </span>
                                                    Expertise and Experience
                                                </p>
                                                <p className="d-flex align-items-center mb-3">
                                                    <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                                                        <i className="isax isax-menu" />
                                                    </span>
                                                    Tailored Services
                                                </p>
                                                <p className="d-flex align-items-center mb-3">
                                                    <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                                                        <i className="isax isax-message-minus" />
                                                    </span>
                                                    Comprehensive Planning
                                                </p>
                                                <p className="d-flex align-items-center mb-3">
                                                    <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                                                        <i className="isax isax-user-add" />
                                                    </span>
                                                    Client Satisfaction
                                                </p>
                                                <p className="d-flex align-items-center">
                                                    <span className="avatar avatar-md bg-light rounded-circle text-dark me-2">
                                                        <i className="isax isax-grammerly" />
                                                    </span>
                                                    24/7 Support
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-none mb-0">
                                        <div className="card-body">
                                            <h5 className="fs-18 mb-3">Provider Details</h5>
                                            <div className="py-1">
                                                <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
                                                    <Link
                                                        href="#"
                                                        className="avatar avatar-lg flex-shrink-0"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-05.jpg"
                                                            alt="img"
                                                            className="rounded-circle"
                                                        />
                                                    </Link>
                                                    <div className="ms-2 overflow-hidden">
                                                        <h6 className="fw-medium text-truncate">
                                                            <Link href="#">Adrian Hendriques</Link>
                                                        </h6>
                                                        <p className="fs-14">Member Since : 14 May 2024</p>
                                                    </div>
                                                </div>
                                                <div className="border br-10 mb-3 p-3">
                                                    <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                                                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                                                            <i className="isax isax-call-outgoing5" />
                                                        </span>
                                                        <p>+1 12545 45548</p>
                                                    </div>
                                                    <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                                                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                                                            <i className="isax isax-message-search5" />
                                                        </span>
                                                        <p>Info@example.com</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                                                            <i className="isax isax-location-tick5" />
                                                        </span>
                                                        <p>4635 Pheasant Ridge Road, USA</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-2">
                                                <div className="col-sm-6">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-light d-flex align-items-center justify-content-center"
                                                    >
                                                        <i className="isax isax-messages5 me-2" />
                                                        Whatsapp Us
                                                    </Link>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Link
                                                        href={routes.userChat}
                                                        className="btn btn-primary d-flex align-items-center justify-content-center"
                                                    >
                                                        <i className="isax isax-message-notif5 me-2" />
                                                        Chat Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>


        </div>
    )
}

export default FlightDetails
