"use client";
import { img_path } from "../../../environment";
import { all_routes } from "../../../routes/all_routes";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import React, { useRef, useState } from "react";
import Link from "next/link";
import VideoModal from "../../../components/video-modal/videoModal";
import Lightbox from "yet-another-react-lightbox";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import AppSwiper from '../../../components/app-swiper'
import BannerCounter from "../../../components/banner-counter/counter";
const ActivityDetails = () => {
  const routes = all_routes;
  const [showModal, setShowModal] = React.useState(false);
  const [showMore, setShowMore] = useState<boolean>();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [defaultDate] = useState(new Date());
  const videoUrl = "https://www.youtube.com/watch?v=4fMuE_t5YL4";

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShow = () => {
    setShowMore(!showMore);
  };
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const scrollToLocation = () => locationRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToReview = () => reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Activity",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Activity",
      active: true,
    },
    {
      label: "Activity Details",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Activity"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="activity-wrap mb-4">
                <div className="row">
                  <Lightbox
                      open={open2}
                      close={() => setOpen2(false)}
                      slides={[
                        {
                          src: `${img_path}assets/img/activities/activity-12.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-13.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-14.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-15.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-16.jpg`,
                        },
                      ]}
                    />
                  <div className="col-lg-3">
                    <div className="activitys-img">
                      <Link
                        className="galley-wrap"
                        data-fancybox="gallery"
                        href="#"
                        onClick={()=>setOpen2(true)}
                      >
                        <ImageWithBasePath
                          src="assets/img/activities/activity-12.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="activitys-img  mb-0">
                      <Link
                        className="galley-wrap"
                        data-fancybox="gallery"
                        href="#"
                        onClick={()=>setOpen2(true)}
                      >
                        <ImageWithBasePath
                          src="assets/img/activities/activity-13.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex"> 
                    <div className="activitys-img-center flex-fill">
                      <div className="position-relative h-100">
                        <Link href="#" className="h-100 d-block">
                          <ImageWithBasePath
                            src="assets/img/activities/activity-14.jpg"
                            className="rounded"
                            alt="Img"
                          />
                        </Link>
                        <Link
                          href="#"
                          data-fancybox=""
                          onClick={handleOpenModal}
                          className="avatar play-video rounded-circle circle-middle"
                        >
                          <span>
                            <i className="isax isax-play5 text-dark fs-16" />
                          </span>
                        </Link>
                        <VideoModal
                          show={showModal}
                          handleClose={handleCloseModal}
                          videoUrl={videoUrl}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="activitys-img">
                      <Link
                        className="galley-wrap"
                        data-fancybox="gallery"
                        href="#"
                        onClick={()=>setOpen2(true)}
                      >
                        <ImageWithBasePath
                          src="assets/img/activities/activity-15.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="activitys-img mb-0">
                      <Link
                        className="galley-wrap"
                        data-fancybox="gallery"
                        href="#"
                        onClick={()=>setOpen2(true)}
                      >
                        <ImageWithBasePath
                          src="assets/img/activities/activity-16.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-wrap slider-wrap-five ">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2 pe-2 border-end d-flex align-items-center">
                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                      5.0
                    </span>
                    <p className="fs-14">
                      <Link href="#" onClick={scrollToReview}>
                        (400 Reviews)
                      </Link>
                    </p>
                  </div>
                  <span className="badge badge-xs bg-info rounded-pill ms-1">
                    <i className="isax isax-ranking me-1" />
                    Trending
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="mb-2">
                    <h4 className="mb-1 d-flex align-items-center flex-wrap mb-2">
                      Tropical Reef Snorkeling Adventure
                    </h4>
                    <div className="d-flex align-items-center flex-wrap">
                      <p className="fs-14 mb-2 me-2 pe-2 border-end">
                        <i className="isax isax-receipt text-primary me-2" />
                        Water Sports
                      </p>
                      <p className="fs-14 mb-2">
                        <i className="isax isax-location5 me-2" />
                        Phuket, Thailand
                        <Link
                          href="#"
                          onClick={scrollToLocation}
                          className="link-primary text-decoration-underline fw-medium ms-2"
                        >
                          View Location
                        </Link>
                      </p>
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
              <div className="accordion custom-accordion ">
                <div className="accordion-item mb-4">
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
                    <div className="accordion-body">
                      <p className="mb-2">
                        Discover colorful coral reefs and exotic marine life in
                        crystal clear tropical waters with a professionally
                        guided snorkeling experience designed for comfort,
                        safety, and fun. Glide over vibrant coral gardens, spot
                        tropical fish and other fascinating marine species, and
                        enjoy shallow reef areas that are ideal for first time
                        snorkelers.
                      </p>
                      <div className="read-more">
                        <div
                          className="more-text"
                          style={{ display: showMore ? "block" : "none" }}
                        >
                          <p>
                            Equipment, buoyancy vests and a boat transfer from
                            the marina are included. Sessions run in sheltered
                            water with a maximum of eight guests per guide, so
                            non-swimmers and children from eight years old can
                            join.
                          </p>
                        </div>
                        <Link
                          href="#"
                          onClick={handleShow}
                          className="fs-14 fw-medium more-link text-decoration-underline mb-2"
                        >
                          {showMore ? "Show Less" : "Show More"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item  mb-4">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_one"
                      aria-expanded="true"
                    >
                      Activity Details
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_one"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gy-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-timer fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Duration</h6>
                              <span>04 hours</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-speedometer fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Difficulty</h6>
                              <span>Beginner Friendly</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-profile-2user fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Group Size</h6>
                              <span>Upto 12 Members</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-user-tag fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Age Limit</h6>
                              <span>Above 6 years</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-user-octagon fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Guide</h6>
                              <span>Included</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-ranking fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Equipments</h6>
                              <span>Provided</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-car fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Hotel Pickup</h6>
                              <span>Available</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-ranking fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Languages</h6>
                              <span>English, Spanish</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_ten"
                      aria-expanded="true"
                    >
                      Itinerary
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_ten"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="stage-flow">
                        <div className="d-flex align-items-center flows-step">
                          <span className="flow-step">01</span>
                          <div className="flow-content">
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-1">
                              <div className="mb-1">
                                <h6 className="fw-medium mb-1">
                                  Arrival &amp; Check-in{" "}
                                  <span className="badge badge-info-100 me-1 d-inline-flex align-items-center ms-2">
                                    <i className="isax isax-clock me-1" />
                                    10 mins
                                  </span>
                                </h6>
                                <p>
                                  Complimentary pickup from your Key West hotel.
                                  Arrive at the marina, check in, and meet your
                                  guide and fellow snorkelers.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center flows-step">
                          <span className="flow-step">02</span>
                          <div className="flow-content">
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-1">
                              <div className="mb-1">
                                <h6 className="fw-medium mb-1">
                                  Safety Briefing &amp; Equipment Fitting
                                  <span className="badge badge-info-100 me-1 d-inline-flex align-items-center ms-2">
                                    <i className="isax isax-clock me-1" />
                                    20 mins
                                  </span>
                                </h6>
                                <p>
                                  Receive comprehensive safety instructions and
                                  learn basic snorkeling techniques. Get fitted
                                  with high quality snorkeling gear including
                                  mask, snorkel, fins, and flotation vest.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center flows-step">
                          <span className="flow-step">04</span>
                          <div className="flow-content">
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-1">
                              <div className="mb-1">
                                <h6 className="fw-medium mb-1">
                                  First Snorkeling Session
                                  <span className="badge badge-info-100 me-1 d-inline-flex align-items-center ms-2">
                                    <i className="isax isax-clock me-1" />
                                    120 mins
                                  </span>
                                </h6>
                                <p>
                                  Explore the vibrant coral reef for 120
                                  minutes. Swim alongside colorful tropical
                                  fish, spot sea turtles, and discover the
                                  underwater beauty of Key West's protected
                                  marine sanctuary.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center flows-step">
                          <span className="flow-step">05</span>
                          <div className="flow-content">
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-1">
                              <div className="mb-1">
                                <h6 className="fw-medium mb-1">
                                  Relax &amp; Refresh Break
                                  <span className="badge badge-info-100 me-1 d-inline-flex align-items-center ms-2">
                                    <i className="isax isax-clock me-1" />
                                    20 mins
                                  </span>
                                </h6>
                                <p>
                                  Return to the boat for refreshments including
                                  water, soft drinks, and light snacks. Short
                                  ride to the second snorkeling location.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center flows-step">
                          <span className="flow-step">06</span>
                          <div className="flow-content">
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-1">
                              <div className="mb-1">
                                <h6 className="fw-medium mb-1">
                                  Return &amp; Hotel Drop-off
                                  <span className="badge badge-info-100 me-1 d-inline-flex align-items-center ms-2">
                                    <i className="isax isax-clock me-1" />
                                    20 mins
                                  </span>
                                </h6>
                                <p>
                                  Cruise back to the marina while sharing your
                                  experience. Receive your digital underwater
                                  photos and transport back to your hotel.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4">
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
                    <Lightbox
                      open={open}
                      close={() => setOpen(false)}
                      slides={[
                        {
                          src: `${img_path}assets/img/activities/activity-01.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-02.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-03.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-04.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-05.jpg`,
                        },
                      ]}
                    />
                    <div className="accordion-body">
                      <AppSwiper preset="activity-slider">
                          <div className="col">
                            <Link
                              className="galley-wrap"
                              data-fancybox="gallery"
                              onClick={() => setOpen(true)}
                              href="#"
                            >
                              <ImageWithBasePath
                                src="assets/img/activities/activity-01.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                          <div className="col">
                            <Link
                              className="galley-wrap"
                              data-fancybox="gallery"
                              href="#"
                              onClick={() => setOpen(true)}
                            >
                              <ImageWithBasePath
                                src="assets/img/activities/activity-02.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                          <div className="col">
                            <Link
                              className="galley-wrap"
                              data-fancybox="gallery"
                              href="#"
                              onClick={() => setOpen(true)}
                            >
                              <ImageWithBasePath
                                src="assets/img/activities/activity-03.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                          <div className="col">
                            <Link
                              className="galley-wrap"
                              data-fancybox="gallery"
                              href="#"
                              onClick={() => setOpen(true)}
                            >
                              <ImageWithBasePath
                                src="assets/img/activities/activity-04.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                          <div className="col">
                            <Link
                              className="galley-wrap"
                              data-fancybox="gallery"
                              href="#"
                              onClick={() => setOpen(true)}
                            >
                              <ImageWithBasePath
                                src="assets/img/activities/activity-05.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                          <div className="col">
                            <Link
                              className="galley-wrap"
                              data-fancybox="gallery"
                              href="#"
                              onClick={() => setOpen(true)}
                            >
                              <ImageWithBasePath
                                src="assets/img/activities/activity-06.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                        </AppSwiper>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_five"
                      aria-expanded="true"
                    >
                      Video
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_five"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="position-relative">
                        <Link href="#">
                          <ImageWithBasePath
                            src="assets/img/activities/activity-11.jpg"
                            className="rounded"
                            alt="Img"
                          />
                        </Link>

                        <Link
                          href="#"
                          data-fancybox=""
                          onClick={handleOpenModal}
                          className="avatar play-video rounded-circle circle-middle"
                        >
                          <span>
                            <i className="isax isax-play5 text-dark fs-16" />
                          </span>
                        </Link>
                        <VideoModal
                          show={showModal}
                          handleClose={handleCloseModal}
                          videoUrl={videoUrl}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4">
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
                    <div className="accordion-body">
                      <div
                        className="accordion faq-accordion"
                        id="accordionFaq"
                      >
                        <div className="accordion-item show mb-2">
                          <div className="accordion-header">
                            <button
                              className="accordion-button fw-medium"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#faq-collapseOne"
                              aria-expanded="false"
                              aria-controls="faq-collapseOne"
                            >
                              Is this activity suitable for beginners?
                            </button>
                          </div>
                          <div
                            id="faq-collapseOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Yes. This snorkeling tour is beginner-friendly
                                and includes a safety briefing and guide support
                                throughout the experience.
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
                              aria-expanded="false"
                              aria-controls="faq-two"
                            >
                              Do I need to know swimming to join?
                            </button>
                          </div>
                          <div
                            id="faq-two"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                No. Buoyancy vests are provided and the guided
                                route stays in shallow, sheltered reef areas, so
                                confident non-swimmers can take part with a guide
                                alongside them.
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
                              aria-expanded="false"
                              aria-controls="faq-three"
                            >
                              How long is the snorkeling time in total?
                            </button>
                          </div>
                          <div
                            id="faq-three"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Around two hours in the water across two reef
                                stops, within a total trip time of roughly four
                                hours including the boat transfer and safety
                                briefing.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="location" ref={locationRef}>
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_seven"
                      aria-expanded="true"
                    >
                      Location
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_seven"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      {/* Map */}
                      <div>
                        <iframe
                          src="https://www.google.com/maps?q=Patong%20Beach%2C%20Phuket%2C%20Thailand&output=embed"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="tour-detail-map w-100"
                        />
                      </div>
                      {/* /Map */}
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4 mb-xl-0" id="reviews" ref={reviewsRef}>
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
                    <div className="accordion-body">
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
                            <div className="card rating-progress shadow-none flex-fill mb-3">
                              <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                  <p className="me-2 text-nowrap mb-0">
                                    5 Star Ratings
                                  </p>
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
                                    ></div>
                                  </div>
                                  <p className="progress-count ms-2">247</p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                  <p className="me-2 text-nowrap mb-0">
                                    4 Star Ratings
                                  </p>
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
                                    ></div>
                                  </div>
                                  <p className="progress-count ms-2">145</p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                  <p className="me-2 text-nowrap mb-0">
                                    3 Star Ratings
                                  </p>
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
                                    ></div>
                                  </div>
                                  <p className="progress-count ms-2">600</p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                  <p className="me-2 text-nowrap mb-0">
                                    2 Star Ratings
                                  </p>
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
                                    ></div>
                                  </div>
                                  <p className="progress-count ms-2">560</p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <p className="me-2 text-nowrap mb-0">
                                    1 Star Ratings
                                  </p>
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
                                    ></div>
                                  </div>
                                  <p className="progress-count ms-2">400</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 d-flex">
                            <div className="rating-item bg-light-200 text-center flex-fill mb-3">
                              <h6 className="fw-medium mb-3">
                                Customer Reviews &amp; Ratings
                              </h6>
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
                                    <h6 className="fs-16 fw-medium mb-1">
                                      Joseph Massey
                                    </h6>
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
                                The snorkeling tour was well organized and the
                                reef was absolutely beautiful. The guide was
                                very friendly and made beginners feel
                                comfortable throughout the session.
                              </p>
                              <div className="d-flex align-items-center">
                                <Lightbox
                      open={open3}
                      close={() => setOpen3(false)}
                      slides={[
                        {
                          src: `${img_path}assets/img/activities/activity-01.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-02.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/activities/activity-03.jpg`,
                        },
                      ]}
                    />
                                <Link
                                  className="avatar avatar-md me-2 mb-2"
                                  data-fancybox="gallery"
                                  href="#"
                                  onClick={()=>setOpen3(true)}
                                >
                                  <ImageWithBasePath
                                    src="assets/img/activities/activity-01.jpg"
                                    alt="img"
                                  />
                                </Link>
                                <Link
                                  className="avatar avatar-md me-2 mb-2"
                                  data-fancybox="gallery"
                                  href="#"
                                  onClick={()=>setOpen3(true)}
                                >
                                  <ImageWithBasePath
                                    src="assets/img/activities/activity-02.jpg"
                                    alt="img"
                                  />
                                </Link>
                                <Link
                                  className="avatar avatar-md me-0 mb-2"
                                  data-fancybox="gallery"
                                  href="#"
                                  onClick={()=>setOpen3(true)}
                                >
                                  <ImageWithBasePath
                                    src="assets/img/activities/activity-03.jpg"
                                    alt="img"
                                  />
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
                                    <h6 className="fs-16 fw-medium mb-1">
                                      Jeffrey Jones
                                    </h6>
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
                                As a first time snorkeler, I felt very safe and
                                well guided. The equipment and briefing were
                                excellent. Would definitely try again.
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
                                    <h6 className="fs-16 fw-medium mb-1">
                                      Jessie Alves
                                    </h6>
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
                                The location was perfect for exploring the city,
                                and the views from our room were breathtaking.
                                It made our trip so much more enjoyable to stay
                                somewhere central and scenic
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
                                    <h6 className="fs-16 fw-medium mb-1">
                                      Adrian Hendriques
                                    </h6>
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
                                Thank you so much for your kind words! We're
                                thrilled to hear that our location and views
                                made your trip even more enjoyable. We hope to
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
            </div>
            <div className="col-xl-4 theiaStickySidebar">
              <div className="card shadow-none">
                <div className="card-body">
                  <div className=" pb-3 mb-3 border-bottom">
                    <div className="row">
                      <div className="col-lg-6">
                        <p className="mb-2">Starts From</p>
                        <h4 className="text-primary">
                          $400{" "}
                          <span className="fs-14 text-default fw-normal">
                            / Night
                          </span>
                        </h4>
                      </div>
                      <div className="col-lg-6">
                        <label>Select your Date</label>
                        <div className="input-icon-end position-relative">
                          <DatePicker
                            className="form-control datetimepicker"
                            placeholder="dd/mm/yyyy"
                            defaultValue={defaultDate}
                            format="DD-MM-YYYY"
                            disablePast
                          />
                          <span className="input-icon-addon">
                            <i className="isax isax-calendar" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 timeslot-details">
                    <span className="mb-2 fw-medium d-block">
                      Choose Your Timeslot
                    </span>
                    <ul>
                      <li>
                        <div className="timeslot">
                          <input
                            type="radio"
                            id="timeslot1"
                            name="timeslot"
                            defaultChecked
                          />
                          <label htmlFor="timeslot1">
                            <i className="isax isax-clock me-1" />
                            08:00 AM - 12:00 PM
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="timeslot">
                          <input type="radio" id="timeslot2" name="timeslot" />
                          <label htmlFor="timeslot2">
                            <i className="isax isax-clock me-1" />
                            10:00 AM - 02:00 PM
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="timeslot">
                          <input type="radio" id="timeslot3" name="timeslot" />
                          <label htmlFor="timeslot3">
                            <i className="isax isax-clock me-1" />
                            12:00 PM - 04:00 PM
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="timeslot">
                          <input type="radio" id="timeslot4" name="timeslot" />
                          <label htmlFor="timeslot4">
                            <i className="isax isax-clock me-1" />
                            02:00 PM - 06:00 PM
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <div className="card shadow-none mb-0">
                      <div className="card-body p-3 pb-0">
                        <div className="border-bottom pb-2 mb-2">
                          <h6>Details</h6>
                        </div>
                        <div className="custom-increment">
                          <div className="mb-3 d-flex align-items-center justify-content-between">
                            <label className="form-label text-gray-9 mb-0">
                              Adults
                            </label>
                            <BannerCounter/>
                          </div>
                          <div className="mb-3 d-flex align-items-center justify-content-between">
                            <label className="form-label text-gray-9 mb-0">
                              Children{" "}
                              <span className="text-default fw-normal">
                                ( 2-12 Yrs )
                              </span>
                            </label>
                            <BannerCounter/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow-none mb-0">
                    <div className="card-body p-3 pb-0">
                      <div className="border-bottom pb-2 mb-3">
                        <h6>Extra Services</h6>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-3">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest1"
                          type="checkbox"
                          id="guest1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2 w-100"
                          htmlFor="guest1"
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            Hotel Pickup &amp; Drop
                            <span className="fw-semibold">$20</span>
                          </div>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-3">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest2"
                          type="checkbox"
                          id="guest2"
                        />
                        <label
                          className="form-check-label ms-2 w-100"
                          htmlFor="guest2"
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            Photo Package
                            <span className="fw-semibold">$10</span>
                          </div>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-3">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest3"
                          type="checkbox"
                          id="guest3"
                        />
                        <label
                          className="form-check-label ms-2 w-100"
                          htmlFor="guest3"
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            Professional Video Clip (30 sec)
                            <span className="fw-semibold">$40</span>
                          </div>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center ps-0 mb-3">
                        <input
                          className="form-check-input ms-0 mt-0"
                          name="guest4"
                          type="checkbox"
                          id="guest4"
                        />
                        <label
                          className="form-check-label ms-2 w-100"
                          htmlFor="guest4"
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            Refreshment Pack
                            <span className="fw-semibold">$30</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={routes.activityBooking}
                    className="btn btn-primary rounded-pill w-100 mt-3"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
              <div className="card shadow-none">
                <div className="card-body">
                  <h5 className="fs-18 mb-3">Why Book With Us</h5>
                  <div>
                    <p className="d-flex align-items-center mb-3">
                      <i className="isax isax-medal-star text-primary me-2" />
                      Expertise and Experience
                    </p>
                    <p className="d-flex align-items-center mb-3">
                      <i className="isax isax-menu text-primary me-2" />
                      Tailored Services
                    </p>
                    <p className="d-flex align-items-center mb-3">
                      <i className="isax isax-message-minus text-primary me-2" />
                      Comprehensive Planning
                    </p>
                    <p className="d-flex align-items-center mb-3">
                      <i className="isax isax-user-add text-primary me-2" />
                      Client Satisfaction
                    </p>
                    <p className="d-flex align-items-center">
                      <i className="isax isax-grammerly text-primary me-2" />
                      24/7 Support
                    </p>
                  </div>
                </div>
              </div>
              {/* Enquiry */}
              <div className="card shadow-none">
                <div className="card-body">
                  <form>
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
              <div className="card shadow-none mb-0">
                <div className="card-body">
                  <h5 className="fs-18 mb-3">Provider Details</h5>
                  <div className="py-1">
                    <div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
                      <Link href="#" className="avatar avatar-lg flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/users/user-05.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </Link>
                      <div className="ms-2 overflow-hidden">
                        <h6 className="fw-medium text-truncate mb-1">
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
                        <p>Call Us : +1 12545 45548</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                          <i className="isax isax-message-search5" />
                        </span>
                        <p>Email : Info@example.com</p>
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
                        href={routes.chat}
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
      {/* /Page Wrapper */}
      {/* Review Modal */}
      <div className="modal fade" id="add_review">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h5>Write a Review</h5>
              <Link href="#" data-bs-dismiss="modal" aria-label="Close">
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

export default ActivityDetails;
