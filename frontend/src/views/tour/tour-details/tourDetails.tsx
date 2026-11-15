"use client";
import { img_path } from "../../../environment";
import React from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import TourDetailSlick from './tourDetailSlider';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import Lightbox from "yet-another-react-lightbox";
import Reviews from '../../../components/reviews/reviews';
import AppSwiper from '../../../components/app-swiper'
import StickyContent from './stickyContent';


const TourDetails = () => {

    const routes = all_routes

    const [gallery, setGallery] = React.useState(false);

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Tour Details',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Tours',
            active: true,
        },
        {
            label: 'Tour Details',
            active: true,
        },
    ];



    return (
        <div>
            <Breadcrumb
                title="Tour Details"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8">
                            <TourDetailSlick />
                            {/* Description */}
                            <div className="bg-light-200 card-bg-light mb-4">
                                <h5 className="fs-18 mb-3">Description</h5>
                                <div className="mb-2">
                                    <p>
                                        A four-day guided trek from Cusco to Vinicunca, the mineral-striped
                                        ridge better known as Rainbow Mountain. The route is paced for
                                        acclimatisation, with two lower-altitude days in the Sacred Valley
                                        before the 5,036 m summit walk, so you reach the viewpoint rested
                                        rather than rushed.
                                    </p>
                                </div>
                                <div className="read-more">
                                    <div className="more-text">
                                        <p>
                                            Group sizes are capped at 12 walkers with a licensed mountain
                                            guide and a support horse on the ascent day. Hotel nights in
                                            Cusco, all ground transfers, park fees and three breakfasts are
                                            included.
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
                            {/* /Description */}
                            {/* Highlights */}
                            <div className="bg-light-200 card-bg-light mb-4">
                                <h5 className="fs-18 mb-3">Highlights</h5>
                                <div>
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                            <i className="isax isax-send-sqaure-2 fs-16" />
                                        </span>
                                        <p>Summit the 5,036 m Vinicunca viewpoint with a licensed mountain guide</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                            <i className="isax isax-send-sqaure-2 fs-16" />
                                        </span>
                                        <p>Two acclimatisation days in the Sacred Valley before the ascent</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                            <i className="isax isax-send-sqaure-2 fs-16" />
                                        </span>
                                        <p>Small groups of 12 walkers, with support horses available on the climb</p>
                                    </div>
                                </div>
                            </div>
                            {/* /Highlights */}
                            {/* Itinerary */}
                            <div className="bg-light-200 card-bg-light mb-4">
                                <h5 className="fs-18 mb-3">Itinerary</h5>
                                <div className="card shadow-none mb-0">
                                    <div className="card-body p-3">
                                        <div className="stage-flow">
                                            <div className="d-flex align-items-center flows-step">
                                                <span className="flow-step">01</span>
                                                <div className="flow-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <div>
                                                            <h6 className="fw-medium mb-1">
                                                                Day 1, Arrival in Cusco
                                                            </h6>
                                                            <p>25 May 2025, 04:45 AM</p>
                                                        </div>
                                                        <span className="avatar avatar-lg avatar-rounded flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/tours/tours-16.jpg" alt="Img" />
                                                        </span>
                                                    </div>
                                                    <p>
                                                        Airport transfer to your hotel in the San Blas quarter,
                                                        followed by a short guided walk through Qorikancha and the
                                                        artisan streets. The afternoon is kept light so you begin
                                                        acclimatising to 3,400 m.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center flows-step">
                                                <span className="flow-step">02</span>
                                                <div className="flow-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <div>
                                                            <h6 className="fw-medium mb-1">
                                                                Day 2, Sacred Valley
                                                            </h6>
                                                            <p>26 May 2025, 07:30 AM</p>
                                                        </div>
                                                        <span className="avatar avatar-lg avatar-rounded flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/tours/tours-17.jpg" alt="Img" />
                                                        </span>
                                                    </div>
                                                    <p>
                                                        A full day at lower altitude visiting the agricultural
                                                        terraces at Pisac and the salt pans at Maras, with lunch in
                                                        Urubamba before returning to Cusco for an early night.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center flows-step">
                                                <span className="flow-step">03</span>
                                                <div className="flow-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <div>
                                                            <h6 className="fw-medium mb-1">
                                                                Day 3, Vinicunca &amp; Red Valley
                                                            </h6>
                                                            <p>27 May 2025, 03:30 AM</p>
                                                        </div>
                                                        <span className="avatar avatar-lg avatar-rounded flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/tours/tours-18.jpg" alt="Img" />
                                                        </span>
                                                    </div>
                                                    <p>
                                                        Pre-dawn departure for the Phulawasipata trailhead. The 5 km
                                                        ascent to the 5,036 m viewpoint takes around three hours at a
                                                        steady pace, with an optional detour into the Red Valley on
                                                        the descent.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center flows-step">
                                                <span className="flow-step">04</span>
                                                <div className="flow-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <div>
                                                            <h6 className="fw-medium mb-1">
                                                                Day 4, Sacsayhuam&aacute;n &amp; Departure
                                                            </h6>
                                                            <p>28 May 2025, 08:00 AM</p>
                                                        </div>
                                                        <span className="avatar avatar-lg avatar-rounded flex-shrink-0">
                                                            <ImageWithBasePath src="assets/img/tours/tours-19.jpg" alt="Img" />
                                                        </span>
                                                    </div>
                                                    <p>
                                                        A morning at the Sacsayhuam&aacute;n ruins above the city,
                                                        then free time in the San Pedro market before your airport
                                                        transfer. Onward flights after 6:00 PM are recommended.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Itinerary */}
                            {/* Includes & Excludes */}
                            <div className="bg-light-200 card-bg-light mb-4">
                                <h5 className="fs-18 mb-3">Includes &amp; Excludes</h5>
                                <div className="row gy-2">
                                    <div className="col-md-6">
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-tick-square5 text-success me-2" />{" "}
                                            Licensed mountain guide
                                        </p>
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-tick-square5 text-success me-2" />{" "}
                                            Vinicunca park entrance fees
                                        </p>
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-tick-square5 text-success me-2" />{" "}
                                            3 nights hotel in Cusco
                                        </p>
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-tick-square5 text-success me-2" />{" "}
                                            Daily breakfast
                                        </p>
                                        <p className="d-flex align-items-center">
                                            <i className="isax isax-tick-square5 text-success me-2" />{" "}
                                            All ground transfers
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-close-square5 text-danger me-2" />{" "}
                                            International flights
                                        </p>
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-close-square5 text-danger me-2" />{" "}
                                            Travel insurance
                                        </p>
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-close-square5 text-danger me-2" />{" "}
                                            Lunch and dinner
                                        </p>
                                        <p className="d-flex align-items-center mb-2">
                                            <i className="isax isax-close-square5 text-danger me-2" />{" "}
                                            Support horse on ascent day
                                        </p>
                                        <p className="d-flex align-items-center">
                                            <i className="isax isax-close-square5 text-danger me-2" />{" "}
                                            Tips and personal expenses
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* /Includes & Excludes */}
                            {/* Gallery */}
                            <div className="bg-light-200 card-bg-light mb-4">
                                <h5 className="fs-18 mb-3">Gallery</h5>
                                <div className="tour-gallery-slider owl-carousel">
                                    <Lightbox
                                        open={gallery}
                                        close={() => setGallery(false)}
                                        slides={[
                                            { src: `${img_path}assets/img/tours/gallery-tour-01.jpg` },
                                            { src: `${img_path}assets/img/tours/gallery-tour-02.jpg` },
                                            { src: `${img_path}assets/img/tours/gallery-tour-03.jpg` },
                                            { src: `${img_path}assets/img/tours/gallery-tour-04.jpg` },
                                            { src: `${img_path}assets/img/tours/gallery-tour-05.jpg` },
                                            { src: `${img_path}assets/img/tours/gallery-tour-06.jpg` },
                                        ]}
                                    />
                                    <AppSwiper preset="tour-gallery-slider">
                                        <Link
                                            className="galley-wrap"
                                            data-fancybox="gallery"
                                            onClick={() => setGallery(true)} href="#" title="Demo 01"
                                        >
                                            <ImageWithBasePath src="assets/img/tours/gallery-tour-01.jpg" alt="img" />
                                        </Link>
                                        <Link
                                            className="galley-wrap"
                                            data-fancybox="gallery"
                                            onClick={() => setGallery(true)} href="#" title="Demo 02"
                                        >
                                            <ImageWithBasePath src="assets/img/tours/gallery-tour-02.jpg" alt="img" />
                                        </Link>
                                        <Link
                                            className="galley-wrap"
                                            data-fancybox="gallery"
                                            onClick={() => setGallery(true)} href="#" title="Demo 03"
                                        >
                                            <ImageWithBasePath src="assets/img/tours/gallery-tour-03.jpg" alt="img" />
                                        </Link>
                                        <Link
                                            className="galley-wrap"
                                            data-fancybox="gallery"
                                            onClick={() => setGallery(true)} href="#" title="Demo 04"
                                        >
                                            <ImageWithBasePath src="assets/img/tours/gallery-tour-04.jpg" alt="img" />
                                        </Link>
                                        <Link
                                            className="galley-wrap"
                                            data-fancybox="gallery"
                                            onClick={() => setGallery(true)} href="#" title="Demo 05"
                                        >
                                            <ImageWithBasePath src="assets/img/tours/gallery-tour-05.jpg" alt="img" />
                                        </Link>
                                        <Link
                                            className="galley-wrap"
                                            data-fancybox="gallery"
                                            onClick={() => setGallery(true)} href="#" title="Demo 06"
                                        >
                                            <ImageWithBasePath src="assets/img/tours/gallery-tour-06.jpg" alt="img" />
                                        </Link>
                                    </AppSwiper>

                                </div>
                            </div>
                            {/* /Gallery */}
                            <div className="bg-light-200 card-bg-light mb-4" id="location">
                                <h5 className="fs-18 mb-3">Location</h5>
                                {/* Map */}
                                <div>
                                    <iframe
                                        title='mapw'
                                        src="https://www.google.com/maps?q=Vinicunca%20Rainbow%20Mountain%2C%20Cusco%2C%20Peru&output=embed"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="tour-detail-map w-100"
                                    />
                                </div>
                                {/* /Map */}
                            </div>
                            {/* FAQ */}
                            <div className="bg-light-200 card-bg-light mb-4">
                                <h5 className="fs-18 mb-3">Frequently Asked Questions</h5>
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
                                                Does offer free cancellation for a full refund?
                                            </button>
                                        </div>
                                        <div
                                            id="faq-collapseOne"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    Does have fully refundable room rates available to book on
                                                    our site. If you’ve booked a fully refundable room rate,
                                                    this can be cancelled up to a few days before check-in
                                                    depending on the property's cancellation policy. Just make
                                                    sure to check this property's cancellation policy for the
                                                    exact terms and conditions.
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
                                                Is there a pool?
                                            </button>
                                        </div>
                                        <div
                                            id="faq-two"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    Does have fully refundable room rates available to book on
                                                    our site. If you’ve booked a fully refundable room rate,
                                                    this can be cancelled up to a few days before check-in
                                                    depending on the property's cancellation policy. Just make
                                                    sure to check this property's cancellation policy for the
                                                    exact terms and conditions.
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
                                                Are pets allowed?
                                            </button>
                                        </div>
                                        <div
                                            id="faq-three"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    Does have fully refundable room rates available to book on
                                                    our site. If you’ve booked a fully refundable room rate,
                                                    this can be cancelled up to a few days before check-in
                                                    depending on the property's cancellation policy. Just make
                                                    sure to check this property's cancellation policy for the
                                                    exact terms and conditions.
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
                                                data-bs-target="#faq-four"

                                                aria-controls="faq-four"
                                            >
                                                Is airport shuttle service offered?
                                            </button>
                                        </div>
                                        <div
                                            id="faq-four"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    Does have fully refundable room rates available to book on
                                                    our site. If you’ve booked a fully refundable room rate,
                                                    this can be cancelled up to a few days before check-in
                                                    depending on the property's cancellation policy. Just make
                                                    sure to check this property's cancellation policy for the
                                                    exact terms and conditions.
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
                                                data-bs-target="#faq-five"

                                                aria-controls="faq-five"
                                            >
                                                What are the check-in and check-out times?
                                            </button>
                                        </div>
                                        <div
                                            id="faq-five"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    Does have fully refundable room rates available to book on
                                                    our site. If you’ve booked a fully refundable room rate,
                                                    this can be cancelled up to a few days before check-in
                                                    depending on the property's cancellation policy. Just make
                                                    sure to check this property's cancellation policy for the
                                                    exact terms and conditions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /FAQ */}
                            {/* Reviews */}
                            <Reviews />
                        </div>
                        {/* /Reviews */}
                        {/* Tour Sidebar */}
                        <div className="col-xl-4 ">
                            <StickyContent />
                        </div>
                        {/* /Tour Sidebar */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}


        </div>
    )
}

export default TourDetails
