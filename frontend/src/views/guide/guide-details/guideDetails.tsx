"use client";
import { img_path } from "../../../environment";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "../../../components/image-with-base-path";
import Lightbox from "yet-another-react-lightbox";
import React from "react";

interface GuideTour {
  id: number;
  image: string;
  category: string;
  rating: string;
  reviews: number;
  title: string;
  duration: string;
  groupSize: string;
  price: string;
}

interface RateCardItem {
  id: number;
  label: string;
  detail: string;
  price: string;
}

interface CancellationPolicyItem {
  id: number;
  icon: string;
  text: string;
}

const toursOffered: GuideTour[] = [
  {
    id: 1,
    image: "assets/img/tours/tours-02.jpg",
    category: "Walking tour",
    rating: "4.9",
    reviews: 212,
    title: "Gothic Quarter at first light",
    duration: "3 hours",
    groupSize: "Up to 8 people",
    price: "$68",
  },
  {
    id: 2,
    image: "assets/img/tours/tours-03.jpg",
    category: "Architecture",
    rating: "5.0",
    reviews: 168,
    title: "Gaudí beyond Sagrada Família",
    duration: "5 hours",
    groupSize: "Up to 6 people",
    price: "$124",
  },
  {
    id: 3,
    image: "assets/img/tours/tours-04.jpg",
    category: "Food & drink",
    rating: "4.8",
    reviews: 143,
    title: "Market to table: a cooking afternoon",
    duration: "4 hours",
    groupSize: "Up to 6 people",
    price: "$96",
  },
];

const rateCard: RateCardItem[] = [
  { id: 1, label: "Half day", detail: "Up to 4 hours", price: "$180" },
  { id: 2, label: "Full day", detail: "Up to 8 hours", price: "$320" },
  { id: 3, label: "Multi-day", detail: "Per day, 3 days or more", price: "$285" },
  { id: 4, label: "Airport transfer & orientation", detail: "2 hours", price: "$110" },
];

const cancellationPolicy: CancellationPolicyItem[] = [
  { id: 1, icon: "isax-tick-circle text-success", text: "Full refund up to 48 hours before the tour starts." },
  { id: 2, icon: "isax-info-circle text-warning", text: "50% refund between 24 and 48 hours." },
  { id: 3, icon: "isax-close-circle text-danger", text: "No refund under 24 hours, except in bad weather when the tour is rescheduled." },
];

const GuideDetails = () => {


  const routes = all_routes;
  const [open, setOpen] = React.useState(false);
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Guide",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Our Guide",
      active: true,
    },
    {
      label: "Guide Details",
      active: true,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Our Guide"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-09"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="guide-details-card-one">
            <div className="guide-details-card-one-inner">
              <div className="d-flex align-items-center guide-details-card-one-inner-content">
                <div className="guide-img">
                  <ImageWithBasePath
                    src="assets/img/guide/guide-details-img-01.jpg"
                    alt="Img"
                    className="img-fluid"
                  />
                </div>
                <div className="w-100">
                  <div className="guide-info">
                    <h2 className="guide-name">Mr. Aaron Williams</h2>
                    <div className="d-flex align-items-center">
                      <ul>
                        <li className="fs-14 text-gray-6 pe-2 me-2 border-end border-light d-flex align-items-center">
                          <i className="isax isax-signpost5 me-2" />
                          Professional Travel Guide
                        </li>
                        <li className="fs-14 text-gray-6 pe-2 me-2 border-end border-light d-flex align-items-center">
                          <i className="isax isax-location5 me-2" />
                          Barcelona, Spain
                        </li>
                        <li className="fs-14 text-gray-6 pe-2 me-2 border-end border-light d-flex align-items-center">
                          <i className="isax isax-personalcard me-2" />8 Years Of
                          Experience
                        </li>
                        <li>
                          <span className="badge badge-warning text-dark me-2">
                            4.9
                          </span>
                          (2459 Reviews)
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 w-100">
                    <div className="d-flex align-items-center flex-wrap row-gap-3">
                      <span className="badge badge-soft-info badge-md rounded-pill text-info me-2">
                        English
                      </span>
                      <span className="badge badge-soft-info badge-md rounded-pill text-info me-2">
                        Spanish
                      </span>
                      <span className="badge badge-soft-info badge-md rounded-pill text-info me-2">
                        French
                      </span>
                      <span className="badge badge-soft-info badge-md rounded-pill text-info me-2">
                        Catalan
                      </span>
                      <span className="badge badge-soft-info badge-md rounded-pill text-info me-0">
                        Hindi
                      </span>
                    </div>
                    <Link href={routes.guideBooking} className="btn btn-primary">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row start */}
          <div className="row">
            <div className="col-lg-8 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="fs-18 fw-semibold text-dark mb-3">About Me</div>
                  <p>
                    I am a licensed and experienced travel guide with a deep passion
                    for showcasing destinations in an engaging, informative, and
                    memorable way. Over the years, I have guided travelers from
                    different countries, cultures, and age groups, helping them
                    explore cities, landscapes, and cultural landmarks with
                    confidence and comfort.
                  </p>
                  <p>
                    My tours are carefully designed to balance local history,
                    cultural stories, and modern experiences. Whether it is a city
                    sightseeing tour, an adventure activity, a cultural exploration,
                    or a relaxed family trip, I focus on delivering well-organized
                    itineraries that match each traveler’s interests and pace.
                  </p>
                  <p>
                    Safety, professionalism, and customer satisfaction are at the
                    core of my guiding approach. I ensure clear communication,
                    timely planning, and a friendly atmosphere throughout the
                    journey. I also assist travelers with practical guidance such as
                    local customs, travel tips, and must-see attractions to make
                    every trip smooth and stress-free.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="fs-18 fw-semibold text-dark mb-4">
                    Key Information
                  </div>
                  <div>
                    <div className="d-flex align-items-center mb-4">
                      <span className="p-2 bg-primary-transparent d-inline-flex align-items-center justify-content-center rounded me-2">
                        <i className="isax isax-brifecase-tick fs-24" />
                      </span>
                      <div>
                        <p className="mb-0">Experience</p>
                        <p className="fw-medium text-dark">8+ Years</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <span className="p-2 bg-primary-transparent d-inline-flex align-items-center justify-content-center rounded me-2">
                        <i className="isax isax-teacher fs-24" />
                      </span>
                      <div>
                        <p className="mb-0">Certifications</p>
                        <p className="fw-medium text-dark">
                          Licensed Tour Guide #ES-2016-0847
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <span className="p-2 bg-primary-transparent d-inline-flex align-items-center justify-content-center rounded me-2">
                        <i className="isax isax-location fs-24" />
                      </span>
                      <div>
                        <p className="mb-0">Base Location</p>
                        <p className="fw-medium text-dark">Barcelona, Spain</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-0">
                      <span className="p-2 bg-primary-transparent d-inline-flex align-items-center justify-content-center rounded me-2">
                        <i className="isax isax-tick-circle fs-24" />
                      </span>
                      <div>
                        <p className="mb-0">Availability</p>
                        <p className="fw-medium text-dark">Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
          {/* row start */}
          <div className="row">
            <div className="col-xxl-8">
              <div className="card">
                <div className="card-body">
                  <div className="fs-18 fw-semibold text-dark mb-4">
                    My Expertise
                  </div>
                  <div className="row row-gap-4">
                    <div className="col-md-6 col-lg-4">
                      <div className="expertise-img">
                        <ImageWithBasePath src="assets/img/guide/expertise-01.jpg" alt="img" />
                        <div className="expertise-img-content">
                          City Sightseeing Tours
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="expertise-img">
                        <ImageWithBasePath src="assets/img/guide/expertise-02.jpg" alt="img" />
                        <div className="expertise-img-content">
                          Adventure Activities
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="expertise-img">
                        <ImageWithBasePath src="assets/img/guide/expertise-03.jpg" alt="img" />
                        <div className="expertise-img-content">
                          Family &amp; Group Tours
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="expertise-img">
                        <ImageWithBasePath src="assets/img/guide/expertise-04.jpg" alt="img" />
                        <div className="expertise-img-content">
                          Travel Assistance
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="expertise-img">
                        <ImageWithBasePath src="assets/img/guide/expertise-05.jpg" alt="img" />
                        <div className="expertise-img-content">
                          Outdoor Activities
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="expertise-img">
                        <ImageWithBasePath src="assets/img/guide/expertise-06.jpg" alt="img" />
                        <div className="expertise-img-content">
                          Business Travel Assistance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tours offered */}
            <div className="col-xxl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                    <div className="fs-18 fw-semibold text-dark">Tours Offered</div>
                    <Link href={routes.tourGrid} className="fs-13 link-primary text-decoration-underline">
                      See all 8 tours
                    </Link>
                  </div>
                  <div className="row row-gap-4">
                    {toursOffered.map((tour) => (
                      <div className="col-md-6 col-lg-4" key={tour.id}>
                        <div className="card mb-0">
                          <div className="position-relative">
                            <ImageWithBasePath
                              src={tour.image}
                              className="img-fluid w-100"
                              alt={tour.title}
                              style={{ height: "150px", objectFit: "cover", borderRadius: "6px 6px 0 0" }}
                            />
                            <span className="badge bg-primary position-absolute top-0 start-0 m-2">
                              {tour.category}
                            </span>
                          </div>
                          <div className="card-body">
                            <div className="d-flex align-items-center gap-1 mb-2">
                              <span className="badge badge-warning badge-xs text-gray-9 fs-12">
                                {tour.rating}
                              </span>
                              <span className="fs-13 text-gray-6">({tour.reviews} reviews)</span>
                            </div>
                            <h3 className="fs-15 mb-2">
                              <Link href={routes.tourDetails}>{tour.title}</Link>
                            </h3>
                            <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                              <span className="fs-13 text-gray-6">
                                <i className="isax isax-clock me-1" />
                                {tour.duration}
                              </span>
                              <span className="fs-13 text-gray-6">
                                <i className="isax isax-profile-2user me-1" />
                                {tour.groupSize}
                              </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                              <div>
                                <span className="fs-16 fw-semibold text-dark">{tour.price}</span>
                                <span className="fs-13 text-gray-6 d-block">per person</span>
                              </div>
                              <Link href={routes.guideBooking} className="btn btn-primary btn-sm">
                                Book
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Rate card */}
            <div className="col-xxl-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="fs-18 fw-semibold text-dark mb-4">Rate Card</div>
                  {rateCard.map((rate, index) => (
                    <div
                      className={`d-flex align-items-center justify-content-between gap-3${index > 0 ? " border-top pt-3 mt-3" : ""}`}
                      key={rate.id}
                    >
                      <div>
                        <p className="fs-14 fw-medium text-dark mb-0">{rate.label}</p>
                        <p className="fs-13 text-gray-6 mb-0">{rate.detail}</p>
                      </div>
                      <span className="fs-16 fw-semibold text-dark flex-shrink-0">{rate.price}</span>
                    </div>
                  ))}
                  <p className="fs-13 text-gray-6 border-top pt-3 mt-3 mb-0">
                    Rates are per group, not per person. Entrance tickets and
                    transport are not included.
                  </p>
                </div>
              </div>
            </div>
            {/* Cancellation policy */}
            <div className="col-xxl-8 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="fs-18 fw-semibold text-dark mb-4">Cancellation Policy</div>
                  <div className="row row-gap-3">
                    {cancellationPolicy.map((policy, index) => (
                      <div
                        className={`col-12${index < cancellationPolicy.length - 1 ? " mb-2" : ""}`}
                        key={policy.id}
                      >
                        <div className="d-flex gap-2">
                          <i className={`isax ${policy.icon} flex-shrink-0 mt-1`} />
                          <span className="fs-14">{policy.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="fs-18 fw-semibold text-dark mb-4">
                    Availability Schedule
                  </div>
                  <div>
                    <div className="card border-0 bg-light-300">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                          <p className="fw-medium mb-0">Monday</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success fs-10">
                              9:00 AM - 2:00 PM
                            </span>
                            <span className="badge bg-success fs-10">
                              3:00 PM - 10:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border-0 bg-light-300">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                          <p className="fw-medium mb-0">Tuesday</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success fs-10">
                              9:00 AM - 2:00 PM
                            </span>
                            <span className="badge bg-success fs-10">
                              3:00 PM - 10:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border-0 bg-light-300">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                          <p className="fw-medium mb-0">Wednesday</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success fs-10">
                              3:00 PM - 10:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border-0 bg-light-300">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                          <p className="fw-medium mb-0">Thursday</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success fs-10">
                              9:00 AM - 2:00 PM
                            </span>
                            <span className="badge bg-success fs-10">
                              3:00 PM - 10:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border-0 bg-light-300">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                          <p className="fw-medium mb-0">Friday</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success fs-10">
                              9:00 AM - 2:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border-0 bg-light-300">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                          <p className="fw-medium mb-0">Saturday</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success fs-10">
                              9:00 AM - 2:00 PM
                            </span>
                            <span className="badge bg-success fs-10">
                              3:00 PM - 10:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border-0 bg-light-300">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                          <p className="fw-medium mb-0">Sunday</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-light fs-10 text-white">
                              Unavailable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
          <div className="card mb-3">
            <div className="card-body">
              <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap mb-3 border-bottom">
                  <h6 className="mb-3">Customer Reviews</h6>
                </div>
                <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="card rating-progress shadow-none flex-fill mb-3">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <p className="me-2 text-nowrap mb-0">5 Star Ratings</p>
                          <div
                            className="progress w-100"
                            role="progressbar"
                            aria-valuenow={83}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: "90%" }}
                            />
                          </div>
                          <p className="progress-count ms-2">2,050</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <p className="me-2 text-nowrap mb-0">4 Star Ratings</p>
                          <div
                            className="progress mb-0 w-100"
                            role="progressbar"
                            aria-valuenow={12}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: "80%" }}
                            />
                          </div>
                          <p className="progress-count ms-2">295</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <p className="me-2 text-nowrap mb-0">3 Star Ratings</p>
                          <div
                            className="progress mb-0 w-100"
                            role="progressbar"
                            aria-valuenow={3}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: "70%" }}
                            />
                          </div>
                          <p className="progress-count ms-2">74</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <p className="me-2 text-nowrap mb-0">2 Star Ratings</p>
                          <div
                            className="progress mb-0 w-100"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: "60%" }}
                            />
                          </div>
                          <p className="progress-count ms-2">25</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="me-2 text-nowrap mb-0">1 Star Ratings</p>
                          <div
                            className="progress mb-0 w-100"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: "40%" }}
                            />
                          </div>
                          <p className="progress-count ms-2">15</p>
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
                            <h6 className="fs-16 fw-medium mb-1">Daniel Carter</h6>
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
                        The adventure desert ride was thrilling and perfectly
                        organized. The guide was professional, friendly, and made
                        sure everything felt safe and enjoyable throughout the ride.
                        A truly memorable experience and highly recommended!
                      </p>
                      <div className="d-flex align-items-center">
                        <Lightbox
                          open={open}
                          close={() => setOpen(false)}
                          slides={[
                            {
                              src: `${img_path}assets/img/guide/gallery-img-large-01.jpg`,
                            },
                            {
                              src: `${img_path}assets/img/guide/gallery-img-large-02.jpg`,
                            },
                            {
                              src: `${img_path}assets/img/guide/gallery-img-large-03.jpg`,
                            },
                          ]}
                        />
                        <Link
                          className="avatar avatar-md me-2 mb-2"
                          data-fancybox="gallery"
                          href="#"
                          onClick={() => setOpen(true)}
                        >
                          <ImageWithBasePath
                            src="assets/img/guide/gallery-img-large-01.jpg"
                            alt="img"
                          />
                        </Link>
                        <Link
                          className="avatar avatar-md me-2 mb-2"
                          data-fancybox="gallery"
                          href="#" onClick={() => setOpen(true)}
                        >
                          <ImageWithBasePath
                            src="assets/img/guide/gallery-img-large-02.jpg"
                            alt="img"
                          />
                        </Link>
                        <Link
                          className="avatar avatar-md me-0 mb-2"
                          data-fancybox="gallery"
                          href="#" onClick={() => setOpen(true)}
                        >
                          <ImageWithBasePath
                            src="assets/img/guide/gallery-img-large-03.jpg"
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
                              src="assets/img/users/user-26.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Sophia Nguyen</h6>
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
                        The guide was extremely knowledgeable, friendly, and made
                        the entire desert adventure smooth, safe, and enjoyable.
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
                            <h6 className="fs-16 fw-medium mb-1">Aaron Williams</h6>
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
                        Thank you for choosing our snorkeling adventure. We’re glad
                        you felt safe and comfortable during your first snorkeling
                        experience. We would love to host you again in the future.
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
      {/* /Page Wrapper */}
    </>
  )
}

export default GuideDetails