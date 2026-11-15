"use client";
import { img_path } from "../../../environment";
import Link from "next/link";
import ImageWithBasePath from "../../../components/image-with-base-path";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import VideoModal from "../../../components/video-modal/videoModal";
import AppSwiper from '../../../components/app-swiper'
import Reviews from "../../../components/reviews/reviews";
const DestrinationDetails = () => {
  const routes = all_routes;
  const [showModal, setShowModal] = React.useState(false);
  const videoUrl = "https://www.youtube.com/watch?v=4fMuE_t5YL4";
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const breadcrumbs = [
    {
      label: "Destination Details",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Destination",
      active: false,
    },
    {
      label: "Destination Details",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Destination Details"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04 text-center"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="row row-gap-4 mb-4">
                <div className="col-5 d-flex">
                  <div className="destination-details-img">
                    <ImageWithBasePath
                      src="assets/img/destination/destination-details-img-01.jpg"
                      alt="img"
                      className="img-fluid w-100 h-100"
                    />
                  </div>
                </div>
                <div className="col-7 d-flex">
                  <div>
                    <div className="destination-details-img mb-4">
                      <ImageWithBasePath
                        src="assets/img/destination/destination-details-img-02.jpg"
                        alt="img"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="destination-details-img">
                      <ImageWithBasePath
                        src="assets/img/destination/destination-details-img-03.jpg"
                        alt="img"
                        className="img-fluid w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="mb-2">
                  <h4 className="mb-1 d-flex align-items-center flex-wrap mb-2">
                    Paris, France
                  </h4>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="d-flex align-items-center me-3 pe-3 border-end">
                      <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                        5.0
                      </span>
                      <p className="fs-14">
                        <Link href="#reviews">(400 Reviews)</Link>
                      </p>
                    </div>
                    <span className="badge badge-xs bg-info rounded-pill">
                      <i className="isax isax-ranking me-1" />
                      Trending
                    </span>
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
              <div className="accordion custom-accordion">
                <div className="accordion-item mb-4" id="field_one">
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
                        Paris is a world famous travel destination known for its
                        romantic atmosphere, iconic landmarks, rich history, art
                        museums, fashion streets, and vibrant café culture.
                      </p>
                      <div className="read-more">
                        <div className="more-text">
                          <p>
                            The city is walkable in sections, with the Louvre,
                            Musée d'Orsay and Notre-Dame within easy reach of
                            the Seine. Spring and early autumn bring the mildest
                            weather and the shortest queues.
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
                <div className="accordion-item mb-4" id="field_two">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_three"
                      aria-expanded="true"
                    >
                      Basic Information
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_three"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gy-3">
                        <div className="col-lg-4 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-timer fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Best Time
                              </div>
                              <span>Apr – Jun, Sep – Oct</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <div className="d-flex align-items-cente">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-dollar-circle fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Currency
                              </div>
                              <span>EUR</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-language-circle fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Language</h6>
                              <span>French, English</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-card-pos fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Visa Requirements
                              </div>
                              <span>Schengen</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-map fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Area
                              </div>
                              <span>105.4 km²</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-clock fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Time Zone
                              </div>
                              <span>CET (UTC +1)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="field_six">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_six"
                      aria-expanded="true"
                    >
                      Highlights
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_six"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                          <i className="isax isax-verify fs-16" />
                        </span>
                        <p>Eiffel Tower and Seine River cruise experience</p>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                          <i className="isax isax-verify fs-16" />
                        </span>
                        <p>World-class museums including the Louvre</p>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                          <i className="isax isax-verify fs-16" />
                        </span>
                        <p>Charming streets, cafés, and shopping districts</p>
                      </div>
                      <div className="d-flex align-items-center mb-0">
                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                          <i className="isax isax-verify fs-16" />
                        </span>
                        <p>Beautiful city views and photography spots</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="field_eleven">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_eleven"
                      aria-expanded="true"
                    >
                      Things To Do
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_eleven"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gy-3">
                        <div className="col-lg-6">
                          <div className="fs-16 text-dark fw-medium mb-3">
                            Sightseeing
                          </div>
                          <div>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Guided city tours and museum visits
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Evening city lights and sightseeing tour
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Walk through historic neighborhoods like Le Marais
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary" />
                              Join bike or walking tours across the city
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="fs-16 text-dark fw-medium mb-3">
                            Food &amp; Local Experiences
                          </div>
                          <div>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Local food tasting and café hopping
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Try French pastry and dessert workshops
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Experience local wine and cheese tasting sessions
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary" />
                              Regional cuisine discovery sessions
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="fs-16 text-dark fw-medium mb-3">
                            Culture &amp; Entertainment
                          </div>
                          <div>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Explore art galleries and cultural exhibitions
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Enjoy live music and small theater shows
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Classical concerts and opera performances
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary" />
                              Cultural storytelling and heritage shows
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="fs-16 text-dark fw-medium mb-3">
                            Shopping &amp; Local Life
                          </div>
                          <div>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Visit street markets and local shopping areas
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Boutique shopping in designer streets
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary mb-2" />
                              Vintage and flea market shopping tours
                            </p>
                            <p>
                              <i className="isax isax-verify fs-16 me-2 text-primary" />
                              Local artisan and handicraft stores
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="field_two">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_twelve"
                      aria-expanded="true"
                    >
                      Services
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_twelve"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gy-3">
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-timer fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Tours
                              </div>
                              <span>20</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-cente">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-dollar-circle fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Hotels
                              </div>
                              <span>569</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-language-circle fs-16" />
                            </span>
                            <div>
                              <h6 className="mb-1">Cars</h6>
                              <span>1420</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-card-pos fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Bus
                              </div>
                              <span>510</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-map fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Flights
                              </div>
                              <span>15</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-clock fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Cruise
                              </div>
                              <span>10</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-clock fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Activities
                              </div>
                              <span>320</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                              <i className="isax isax-clock fs-16" />
                            </span>
                            <div>
                              <div className="fs-14 fw-medium text-dark mb-1">
                                Guides
                              </div>
                              <span>400</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="field_four">
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
                          src: `${img_path}assets/img/destination/destination-img-large-01.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/destination/destination-img-large-02.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/destination/destination-img-large-03.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/destination/destination-img-large-04.jpg`,
                        },
                        {
                          src: `${img_path}assets/img/destination/destination-img-large-05.jpg`,
                        },
                      ]}
                    />
                    <div className="accordion-body">
                      
                        <AppSwiper preset="tour-gallery-slider">
                          <Link
                            className="galley-wrap"
                            href="#"
                            onClick={() => setOpen(true)}
                          >
                            <ImageWithBasePath
                              src="assets/img/destination/destination-img-01.jpg"
                              alt="img"
                            />
                          </Link>
                          <Link
                            className="galley-wrap"
                            href="#"
                            onClick={() => setOpen(true)}
                          >
                            <ImageWithBasePath
                              src="assets/img/destination/destination-img-02.jpg"
                              alt="img"
                            />
                          </Link>
                          <Link
                            className="galley-wrap"
                            href="#"
                            onClick={() => setOpen(true)}
                          >
                            <ImageWithBasePath
                              src="assets/img/destination/destination-img-03.jpg"
                              alt="img"
                            />
                          </Link>
                          <Link
                            className="galley-wrap"
                            href="#"
                            onClick={() => setOpen(true)}
                          >
                            <ImageWithBasePath
                              src="assets/img/destination/destination-img-04.jpg"
                              alt="img"
                            />
                          </Link>
                          <Link
                            className="galley-wrap"
                            href="#"
                            onClick={() => setOpen(true)}
                          >
                            <ImageWithBasePath
                              src="assets/img/destination/destination-img-05.jpg"
                              alt="img"
                            />
                          </Link>

                        </AppSwiper>
                    </div>


                  </div>
                </div>
                <div className="accordion-item mb-4" id="field_five">
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
                            src="assets/img/destination/destination-large-01.jpg"
                            className="rounded"
                            alt="Img"
                          />
                        </Link>
                        <Link
                          href="#"
                          onClick={handleOpenModal}
                          data-fancybox=""
                          className="avatar avatar-lg rounded-circle bg-white circle-middle"
                        >
                          <i className="isax isax-play-circle5 fs-24"></i>
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
                <div className="accordion-item mb-4" id="field_eight">
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
                              Is this destination family friendly?
                            </button>
                          </div>
                          <div
                            id="faq-collapseOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Yes, Paris offers family attractions, parks,
                                museums, and theme parks suitable for all age
                                groups.
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
                              Is it suitable for solo travelers?
                            </button>
                          </div>
                          <div
                            id="faq-two"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Yes. The city is easy to navigate alone, with
                                reliable public transport and a well-lit,
                                walkable centre. Free walking tours are a
                                straightforward way to meet other travellers.
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
                              How many days are ideal to explore this
                              destination?
                            </button>
                          </div>
                          <div
                            id="faq-three"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">
                              <p className="mb-0">
                                Three to four days covers the main landmarks and
                                one or two museums without rushing. Five days
                                allows a day trip to Versailles or Giverny.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="field_seven">
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
                      {/*  Map */}
                      <div>
                        <iframe
                          src="https://www.google.com/maps?q=Paris%2C%20France&output=embed"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="tour-detail-map w-100"
                        ></iframe>
                      </div>
                      {/*  /Map */}
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
                          { src: `${img_path}assets/img/destination/destination-img-01.jpg` },
                          { src: `${img_path}assets/img/destination/destination-img-02.jpg` },
                          { src: `${img_path}assets/img/destination/destination-img-03.jpg` },
                          { src: `${img_path}assets/img/destination/destination-img-04.jpg` },
                          { src: `${img_path}assets/img/destination/destination-img-05.jpg` },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 theiaStickySidebar">
              <div className="card shadow-none">
                <div className="card-body">
                  <h5 className="fs-18 mb-3">Why Book With Us</h5>
                  <div>
                    <p className="d-flex align-items-center mb-3">
                      <span className="text-primary me-2">
                        <i className="isax isax-medal-star" />
                      </span>
                      Expertise and Experience
                    </p>
                    <p className="d-flex align-items-center mb-3">
                      <span className="text-primary me-2">
                        <i className="isax isax-menu" />
                      </span>
                      Tailored Services
                    </p>
                    <p className="d-flex align-items-center mb-3">
                      <span className="text-primary me-2">
                        <i className="isax isax-message-minus" />
                      </span>
                      Comprehensive Planning
                    </p>
                    <p className="d-flex align-items-center mb-3">
                      <span className="text-primary me-2">
                        <i className="isax isax-user-add" />
                      </span>
                      Client Satisfaction
                    </p>
                    <p className="d-flex align-items-center">
                      <span className="text-primary me-2">
                        <i className="isax isax-grammerly" />
                      </span>
                      24/7 Support
                    </p>
                  </div>
                </div>
              </div>
              <div className="card shadow-none">
                <div className="card-body">
                  <h5 className="fs-18 mb-3">Enquire Us</h5>
                  <div className="banner-form">
                    <form action="#">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" />
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
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg search-btn ms-0 w-100 fs-14"
                      >
                        Submit Enquiry
                      </button>
                    </form>
                  </div>
                </div>
              </div>
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
                      <div className="d-flex align-items-center border-bottom pb-3 mb-0">
                        <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary">
                          <i className="isax isax-message-search5" />
                        </span>
                        <p>Info@example.com</p>
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
    </>
  );
};

export default DestrinationDetails;
