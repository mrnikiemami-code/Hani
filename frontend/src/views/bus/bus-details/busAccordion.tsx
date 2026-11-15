"use client";
import { img_path } from "../../../environment";
import React, { useState } from "react";
import GalleryAccordion from "./busGallery";
import FaqAccordion from "./faqAccordion";
import Link from "next/link";
import ImageWithBasePath from "../../../components/image-with-base-path";
import Lightbox from "yet-another-react-lightbox";

type AccordionKey = "description" | "amenities" | "gallery" | "faq" | "reviews";

const BusAccordion: React.FC = () => {
    const [openItems, setOpenItems] = useState({
        description: true,
        amenities: true,
        gallery: true,
        faq: true,
        reviews: true,
    });


    const toggleItem = (key: AccordionKey) =>
        setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

    const [open, setOpen] = React.useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleText = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div className="accordion custom-accordion accordion-shadow-none">

                {/* Description */}
                <div className="accordion-item border-0 mb-4">
                    <div className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            onClick={() => toggleItem("description")}
                        >
                            Description
                        </button>
                    </div>
                    <div className={`accordion-collapse collapse ${openItems.description ? "show" : ""}`}>
                        <div className="accordion-body pt-0">
                            <p className="mb-2">
                                The Royal Travels Comfortline Coach is a luxury intercity bus designed for long-distance comfort. It features ergonomically designed seats, ample legroom, and personal air vents to ensure a relaxed journey. Each seat includes a USB charging port, reading light, and foldable tray for added convenience.
                            </p>
                            <div className="read-more">
                                <div
                                    className="more-text"
                                    style={{ display: isOpen ? "block" : "none" }}
                                >
                                    <p>
                                        The coach is equipped with high-speed Wi-Fi, onboard restrooms, and climate control systems for a pleasant ride throughout the journey. Passengers can enjoy entertainment screens, bottle holders, and storage compartments for luggage and personal items
                                    </p>
                                </div>

                                <Link
                                    href="#"
                                    className="fs-14 fw-medium more-link text-decoration-underline mb-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleText();
                                    }}
                                >
                                    {isOpen ? "Show Less" : "Show More"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="accordion-item mb-0 border-0 pb-1">
                    <div className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            onClick={() => toggleItem("amenities")}
                        >
                            Amenities
                        </button>
                    </div>
                    <div className={`accordion-collapse collapse ${openItems.amenities ? "show" : ""}`}>
                        <div className="accordion-body pt-0">
                            <div className="row">
                                <div className="col-lg-4 col-md-6">
                                    <div className="mb-3">
                                        <h6 className="mb-2">Comfort & Seating</h6>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Reclining semi sleeper seats</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Extra legroom and footrests</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Personal reading lights</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Clean blankets and pillows</p></div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="mb-3">
                                        <h6 className="mb-2">Connectivity & Entertainment</h6>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Free high-speed Wi-Fi</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>USB charging ports at every seat</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Individual entertainment screens</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Bluetooth headphone support</p></div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="mb-3">
                                        <h6 className="mb-2">Travel Assistance</h6>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>GPS tracking with live updates</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>24/7 customer support</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Bottled water and light snacks</p></div>
                                        <div className="d-flex align-items-center mb-2"><i className="isax isax-verify text-primary me-2 fs-16"></i><p>Friendly and trained crew</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="accordion-item mb-4 border-0">
                    <div className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            onClick={() => toggleItem("gallery")}
                        >
                            Gallery
                        </button>
                    </div>

                    <GalleryAccordion />
                </div>

                {/* FAQ */}
                <div className="accordion-item mb-4 border-0">
                    <div className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            onClick={() => toggleItem("faq")}
                        >
                            Frequently Asked Questions
                        </button>
                    </div>
                    <div className={`accordion-collapse collapse ${openItems.faq ? "show" : ""}`}>
                        <div className="accordion-body pt-0">
                            {/* Faq accordion */}
                            <FaqAccordion />
                            {/* Faq accordion */}
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="accordion-item mb-xl-0 mb-4 shadow-sm p-3 border-0">
                    <div className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            onClick={() => toggleItem("reviews")}
                        >
                            Reviews
                        </button>
                    </div>
                    <div className={`accordion-collapse collapse ${openItems.reviews ? "show" : ""}`}>
                        <div className="accordion-body border-top mt-3 pt-3">
                            <div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                    <h6 className="mb-3">Reviews (45)</h6>
                                    <Link
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#add_review"
                                        className="btn btn-primary btn-md mb-3"
                                    >
                                        <i className="isax isax-edit-2 me-1" />
                                        Write a Review
                                    </Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 d-flex">
                                        <div className="rating-item bg-light-200 text-center flex-fill mb-3">
                                            <h6 className="fw-medium mb-3">Customer Reviews &amp; Ratings</h6>
                                            <h5 className="display-6">4.9 / 5.0</h5>
                                            <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                                <i className="ti ti-star-filled text-primary me-1" />
                                                <i className="ti ti-star-filled text-primary me-1" />
                                                <i className="ti ti-star-filled text-primary me-1" />
                                                <i className="ti ti-star-filled text-primary me-1" />
                                                <i className="ti ti-star-filled text-primary" />
                                            </div>
                                            <p>Based On 2,459 Reviews</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex">
                                        <div className="card rating-progress shadow-none flex-fill mb-3">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-2">
                                                    <p className="me-2 text-nowrap mb-0">5 Star Ratings</p>
                                                    <div
                                                        className="progress w-100"
                                                        role="progressbar"
                                                        aria-valuenow={90}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    >
                                                        <div
                                                            className="progress-bar bg-primary"
                                                            style={{ width: "90%" }}
                                                        />
                                                    </div>
                                                    <p className="progress-count ms-2">247</p>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <p className="me-2 text-nowrap mb-0">4 Star Ratings</p>
                                                    <div
                                                        className="progress mb-0 w-100"
                                                        role="progressbar"
                                                        aria-valuenow={80}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    >
                                                        <div
                                                            className="progress-bar bg-primary"
                                                            style={{ width: "80%" }}
                                                        />
                                                    </div>
                                                    <p className="progress-count ms-2">145</p>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <p className="me-2 text-nowrap mb-0">3 Star Ratings</p>
                                                    <div
                                                        className="progress mb-0 w-100"
                                                        role="progressbar"
                                                        aria-valuenow={70}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    >
                                                        <div
                                                            className="progress-bar bg-primary"
                                                            style={{ width: "70%" }}
                                                        />
                                                    </div>
                                                    <p className="progress-count ms-2">600</p>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <p className="me-2 text-nowrap mb-0">2 Star Ratings</p>
                                                    <div
                                                        className="progress mb-0 w-100"
                                                        role="progressbar"
                                                        aria-valuenow={90}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    >
                                                        <div
                                                            className="progress-bar bg-primary"
                                                            style={{ width: "60%" }}
                                                        />
                                                    </div>
                                                    <p className="progress-count ms-2">560</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="me-2 text-nowrap mb-0">1 Star Ratings</p>
                                                    <div
                                                        className="progress mb-0 w-100"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    >
                                                        <div
                                                            className="progress-bar bg-primary"
                                                            style={{ width: "40%" }}
                                                        />
                                                    </div>
                                                    <p className="progress-count ms-2">400</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card review-item shadow-none mb-3">
                                    <div className="card-body p-3">
                                        <div className="review-info">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-05.jpg"
                                                            className="rounded-circle"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <div>
                                                        <h6 className="fs-16 fw-medium mb-1">Joseph Massey</h6>
                                                        <div className="d-flex align-items-center flex-wrap date-info">
                                                            <p className="fs-14 mb-0">2 days ago</p>
                                                            <p className="fs-14 d-inline-flex align-items-center mb-0">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                    5.0
                                                                </span>
                                                                Unforgettable Stay!
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"
                                                >
                                                    <i className="isax isax-repeat me-1" />
                                                    Reply
                                                </Link>
                                            </div>
                                            <p className="mb-2">
                                                It was a good location however the cocoon concept was weird. No
                                                tables, chairs etc was difficult as everything went on the floor.
                                            </p>
                                            <Lightbox
                                                open={open}
                                                close={() => setOpen(false)}
                                                slides={[
                                                    { src: `${img_path}assets/img/bus/bus-large-01.jpg` },
                                                    { src: `${img_path}assets/img/bus/bus-large-02.jpg` },
                                                    { src: `${img_path}assets/img/bus/bus-large-03.jpg` },
                                                ]}
                                            />
                                            <div className="d-flex align-items-center">

                                                <Link href="#" className="avatar avatar-md me-2 mb-2" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/bus/bus-thumb-01.jpg" alt="gallery-img" />
                                                </Link>
                                                <Link href="#" className="avatar avatar-md me-2 mb-2" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/bus/bus-thumb-02.jpg" alt="gallery-img" />
                                                </Link>
                                                <Link href="#" className="avatar avatar-md me-2 mb-2" onClick={() => setOpen(true)}>
                                                    <ImageWithBasePath src="assets/img/bus/bus-thumb-03.jpg" alt="gallery-img" />
                                                </Link>

                                            </div>
                                            <div className="d-inline-flex align-items-center">
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center fs-14 me-3"
                                                >
                                                    <i className="isax isax-like-1 me-2" />
                                                    21
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-dislike me-2" />
                                                    50
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-heart5 text-danger me-2" />
                                                    45
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card review-item shadow-none mb-3">
                                    <div className="card-body p-3">
                                        <div className="review-info">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-21.jpg"
                                                            className="rounded-circle"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <div>
                                                        <h6 className="fs-16 fw-medium mb-1">Jeffrey Jones</h6>
                                                        <div className="d-flex align-items-center flex-wrap date-info">
                                                            <p className="fs-14 mb-0">2 days ago</p>
                                                            <p className="fs-14 d-inline-flex align-items-center mb-0">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                    4.0
                                                                </span>
                                                                Excellent service!
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"
                                                >
                                                    <i className="isax isax-repeat me-1" />
                                                    Reply
                                                </Link>
                                            </div>
                                            <p className="mb-2">
                                                From the moment we arrived, the staff made us feel welcome. The rooms
                                                were immaculate, and every detail was thoughtfully arranged. It was
                                                the perfect blend of comfort and luxury!
                                            </p>
                                            <div className="d-inline-flex align-items-center">
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center fs-14 me-3"
                                                >
                                                    <i className="isax isax-like-1 me-2" />
                                                    15
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-dislike me-2" />
                                                    30
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-heart5 text-danger me-2" />
                                                    52
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card review-item shadow-none mb-3">
                                    <div className="card-body p-3">
                                        <div className="review-info">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-26.jpg"
                                                            className="rounded-circle"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <div>
                                                        <h6 className="fs-16 fw-medium mb-1">Jessie Alves</h6>
                                                        <div className="d-flex align-items-center flex-wrap date-info">
                                                            <p className="fs-14 mb-0">2 days ago</p>
                                                            <p className="fs-14 d-inline-flex align-items-center mb-0">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                    5.0
                                                                </span>
                                                                Convenient Location!
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"
                                                >
                                                    <i className="isax isax-repeat me-1" />
                                                    Reply
                                                </Link>
                                            </div>
                                            <p className="mb-2">
                                                The location was perfect for exploring the city, and the views from
                                                our room were breathtaking. It made our trip so much more enjoyable to
                                                stay somewhere central and scenic
                                            </p>
                                            <div className="d-inline-flex align-items-center">
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center fs-14 me-3"
                                                >
                                                    <i className="isax isax-like-1 me-2" />
                                                    13
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-dislike me-2" />
                                                    38
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-heart5 text-danger me-2" />
                                                    75
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="review-info reply mt-4 p-3">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-25.jpg"
                                                            className="rounded-circle"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <div>
                                                        <h6 className="fs-16 fw-medium mb-1">Adrian Hendriques</h6>
                                                        <div className="d-flex align-items-center flex-wrap date-info">
                                                            <p className="fs-14 mb-0">2 days ago</p>
                                                            <p className="fs-14 d-inline-flex align-items-center mb-0">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                    2.0
                                                                </span>
                                                                Excellent service!
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="btn btn-outline-light btn-md d-inline-flex align-items-center me-2"
                                                >
                                                    <i className="isax isax-repeat me-1" />
                                                    Reply
                                                </Link>
                                            </div>
                                            <p className="mb-2">
                                                Thank you so much for your kind words! We're thrilled to hear that our
                                                location and views made your trip even more enjoyable. We hope to
                                                welcome you back soon for another scenic stay!
                                            </p>
                                            <div className="d-inline-flex align-items-center">
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center fs-14 me-3"
                                                >
                                                    <i className="isax isax-like-1 me-2" />
                                                    10
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-dislike me-2" />
                                                    21
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center me-3"
                                                >
                                                    <i className="isax isax-heart5 text-danger me-2" />
                                                    46
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mb-4 mb-xl-0">
                                    <Link
                                        href="#"
                                        className="btn btn-primary btn-md d-inline-flex align-items-center justify-content-center mt-2"
                                    >
                                        See all 4,078 reviews
                                        <i className="isax isax-arrow-right-3 ms-1" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            {/* Review Modal */}
            <div className="modal fade" id="add_review">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-center justify-content-between">
                            <h5>Write a Review</h5>
                            <Link
                                href="#"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x fs-16" />
                            </Link>
                        </div>
                        <form>
                            <div className="modal-body pb-0">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Your Rating <span className="text-danger">*</span>
                                            </label>
                                            <div className="selection-wrap">
                                                <div className="d-inline-block">
                                                    <div className="rating-selction">
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            defaultValue={5}
                                                            id="rating5"
                                                        />
                                                        <label htmlFor="rating5">
                                                            <i className="fa-solid fa-star" />
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            defaultValue={4}
                                                            id="rating4"
                                                        />
                                                        <label htmlFor="rating4">
                                                            <i className="fa-solid fa-star" />
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            defaultValue={3}
                                                            id="rating3"
                                                        />
                                                        <label htmlFor="rating3">
                                                            <i className="fa-solid fa-star" />
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            defaultValue={2}
                                                            id="rating2"
                                                        />
                                                        <label htmlFor="rating2">
                                                            <i className="fa-solid fa-star" />
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            defaultValue={1}
                                                            id="rating1"
                                                        />
                                                        <label htmlFor="rating1">
                                                            <i className="fa-solid fa-star" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Name <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input type="email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Write Your Review <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                rows={3}
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <button type="submit" className="btn btn-primary btn-md">
                                        <i className="isax isax-edit-2 me-1" />
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Review Modal */}
        </>

    );
};

export default BusAccordion;
