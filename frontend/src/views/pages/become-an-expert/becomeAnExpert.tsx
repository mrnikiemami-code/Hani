"use client";
import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "../../../components/image-with-base-path";
import VideoModal from "../../../components/video-modal/videoModal";

const BecomeAnExpert = () => {
  const routes = all_routes;
  const [showModal, setShowModal] = useState(false);
  const videoUrl = "https://youtu.be/NSAOrGb9orM";
  //Breadcrumb Data
  const breadcrumbs = [
    {
        label: 'Become an Expert',
        link: routes.home1,
        active: false,
    },
    {
        label: 'Become an Expert',
        active: true,
    },
];
  return (
    <div>
      <Breadcrumb
        title="Become an Expert"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01 text-center"
      />
      <>
        {/* How It Works */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div
                  className="section-header text-center wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <h2 className="mb-2">How It Works</h2>
                  <p>
                    Discover how easy it is to become a travel expert. Follow these
                    steps to share your knowledge and earn rewards!
                  </p>
                </div>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div
                  className="card work-card d-flex mb-0 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="card-body flex-fill">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="work-icon bg-primary-transparent d-flex align-items-center justify-content-between">
                        <i className="isax isax-lock5 fs-48" />
                      </span>
                      <h3 className="display-3">01</h3>
                    </div>
                    <div className="card-content">
                      <h5 className="mb-2">Sign Up</h5>
                      <p>
                        Create your account by filling out our quick registration form
                        and set up your profile
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div
                  className="card work-card d-flex mb-0 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="card-body flex-fill">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="work-icon bg-primary-transparent d-flex align-items-center justify-content-between">
                        <i className="isax isax-additem5 fs-48" />
                      </span>
                      <h3 className="display-3">02</h3>
                    </div>
                    <div className="card-content">
                      <h5 className="mb-2">Add Your Service</h5>
                      <p>
                        Add your service with detailed descriptions and competitive
                        pricing to attract more customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div
                  className="card work-card d-flex mb-0 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="card-body flex-fill">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="work-icon bg-primary-transparent d-flex align-items-center justify-content-between">
                        <i className="isax isax-calendar-edit5 fs-48" />
                      </span>
                      <h3 className="display-3">03</h3>
                    </div>
                    <div className="card-content">
                      <h5 className="mb-2">Get Booking</h5>
                      <p>
                        Travelers will discover and book your services directly
                        through our platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /How It Works */}
        {/* About Section */}
        <section className="section bg-light-200">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 text-center text-lg-start">
                <div
                  className="section-right-img-two mb-4 mb-lg-0 wow fadeInUp"
                  data-wow-delay="1.5"
                >
                  <ImageWithBasePath src="assets/img/section-img-02.png" alt="Img" />
                  <div className="card review-rate-top border-0 mb-0">
                    <div className="card-body d-flex align-items-center">
                      <div className="avatar-list-stacked avatar-group-md me-2">
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/users/user-01.jpg"
                            alt="img"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/users/user-04.jpg"
                            alt="img"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/users/user-06.jpg"
                            alt="img"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/users/user-07.jpg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div>
                        <div className="d-flex align-items-center fs-12">
                          <i className="ti ti-star-filled text-warning" />
                          <i className="ti ti-star-filled text-warning" />
                          <i className="ti ti-star-filled text-warning" />
                          <i className="ti ti-star-filled text-warning" />
                          <i className="ti ti-star-filled text-warning me-1" />
                          <p className="fs-14 text-gray-9">5.0</p>
                        </div>
                        <p className="fs-14">2K+ Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="section-header wow fadeInUp" data-wow-delay="0.2s">
                  <h2 className="mb-2">Benefits of become a local expert</h2>
                  <p className="mb-4">
                    Discover how becoming a travel expert can open doors to exciting
                    opportunities, from earning income by sharing your knowledge
                  </p>
                </div>
                <div className="local-expert wow fadeInUp" data-wow-delay="0.2s">
                  <div className="d-flex align-items-center">
                    <span className="avatar bg-primary flex-shrink-0 me-3">
                      <i className="isax isax-dollar-circle fs-24" />
                    </span>
                    <div>
                      <h6 className="fs-18 mb-1">Income Opportunity</h6>
                      <p>
                        Hosting tours can provide a steady source of income,
                        especially in popular tourist destinations.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="avatar bg-secondary flex-shrink-0 me-3">
                      <i className="isax isax-headphone fs-24" />
                    </span>
                    <div>
                      <h6 className="fs-18 mb-1">24/7 Customer support</h6>
                      <p>
                        Get assistance anytime, day or night, ensuring seamless
                        support for your queries or concerns.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="avatar bg-primary flex-shrink-0 me-3">
                      <i className="isax isax-profile-2user fs-24" />
                    </span>
                    <div>
                      <h6 className="fs-18 mb-1">Networking and Connections</h6>
                      <p>
                        Connect with other local businesses, like restaurants, hotels,
                        and transportation providers, to enhance your offerings.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="avatar bg-secondary flex-shrink-0 me-3">
                      <i className="isax isax-task fs-24" />
                    </span>
                    <div>
                      <h6 className="fs-18 mb-1">Recognition and Respect</h6>
                      <p>
                        Establish yourself as an authority in your community. Gain
                        respect and admiration from tourists and locals alike.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /About Section */}
        {/* About */}
        <section className="section team-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="text-center mb-4">
                  <h2>
                    Know More about{" "}
                    <span className="text-primary text-decoration-underline">
                      DreamsTour
                    </span>
                  </h2>
                </div>
                <div className="expert-video wow zoomIn" data-wow-delay="0.2s">
                  <Link
                    className="video-btn video-effect"
                    data-fancybox=""
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                  >
                    <i className="isax isax-play5" />
                  </Link>
                  <VideoModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    videoUrl={videoUrl}
                  />
                </div>
                <div className="counter-wrap wow fadeInUp" data-wow-delay="0.2s">
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="counter-item mb-4">
                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-teal">
                          <i className="isax isax-global5 me-2" />
                          Destinations Worldwide
                        </h6>
                        <h3 className="display-6">
                          <span className="counter">50</span>+
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="counter-item mb-4">
                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-purple">
                          <i className="isax isax-calendar-2 me-2" />
                          Booking Completed
                        </h6>
                        <h3 className="display-6">
                          <span className="counter">7000</span>+
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="counter-item mb-4">
                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-pink">
                          <i className="isax isax-tag-user5 me-2" />
                          Client Globally
                        </h6>
                        <h3 className="display-6">
                          <span className="counter">100</span>+
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="counter-item mb-4">
                        <h6 className="mb-1 d-flex align-items-center justify-content-center text-info">
                          <i className="isax isax-status-up5 me-2" />
                          Providers Registered
                        </h6>
                        <h3 className="display-6">
                          <span className="counter">89</span>+
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-bg">
              <ImageWithBasePath
                src="assets/img/bg/about-bg-01.svg"
                alt="img"
                className="about-bg-02"
              />
            </div>
          </div>
        </section>
        {/* /About */}
        <section className="section pt-0">
          <div className="container">
            <div className="row">
              {/* Enquiry */}
              <div className="col-lg-5">
                <div
                  className="card shadow-none mb-4 mb-lg-0 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="card-body">
                    <form action="#">
                      <h5 className="mb-3 fs-18">Register</h5>
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Comments</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          defaultValue={""}
                        />
                      </div>
                      <div className="form-check d-flex mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="remembers_me"
                        />
                        <label
                          className="form-check-label ms-2 text-gray-9 fs-14"
                          htmlFor="remembers_me"
                        >
                          I have read and accept the&nbsp;
                          <Link
                            href={routes.termsConditions}
                            className="text-primary text-decoration-underline"
                          >
                            Terms and conditions
                          </Link>{" "}
                          &nbsp;and&nbsp;
                          <Link
                            href={routes.privacyPolicy}
                            className="text-primary text-decoration-underline"
                          >
                            Privacy policy
                          </Link>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* /Enquiry */}
              {/* FAQ */}
              <div className="col-lg-7">
                <div className="text-center section-header mb-4">
                  <h2 className="mb-2">
                    Frequently Asked{" "}
                    <span className="text-primary text-decoration-underline">
                      Questions
                    </span>
                  </h2>
                  <p>
                    DreamsTour, a tour operator specializing in dream destinations,
                    offers a variety of benefits for travelers.
                  </p>
                </div>
                <div
                  className="accordion accordion-flush faq-accordion-five bg-white"
                  id="accordionFaq"
                >
                  <div
                    className="accordion-item border show mb-3 wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-collapseOne"
                        aria-expanded="false"
                        aria-controls="faq-collapseOne"
                      >
                        What types of tours do you offer?
                      </button>
                    </h2>
                    <div
                      id="faq-collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionFaq"
                    >
                      <div className="accordion-body">
                        <p className="mb-0">
                          We offer a wide range of tours, including cultural,
                          adventure, luxury, and customized itineraries. Popular
                          destinations include Europe, Africa (e.g., Morocco),{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item border mb-3 wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-collapsetwo"
                        aria-expanded="false"
                        aria-controls="faq-collapsetwo"
                      >
                        Are the tours customizable?
                      </button>
                    </h2>
                    <div
                      id="faq-collapsetwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFaq"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide range of tours, including cultural,
                          adventure, luxury, and customized itineraries.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item border mb-3  wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-collapsthree"
                        aria-expanded="false"
                        aria-controls="faq-collapsthree"
                      >
                        What safety measures do you follow?
                      </button>
                    </h2>
                    <div
                      id="faq-collapsthree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFaq"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide range of tours, including cultural,
                          adventure, luxury, and customized itineraries.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item border mb-3 wow fadeInUp"
                    data-wow-delay="0.8s"
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-collapsefour"
                        aria-expanded="false"
                        aria-controls="faq-collapsefour"
                      >
                        How far in advance should I book?
                      </button>
                    </h2>
                    <div
                      id="faq-collapsefour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFaq"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide range of tours, including cultural,
                          adventure, luxury, and customized itineraries.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item border mb-3 wow fadeInUp"
                    data-wow-delay="1.0s"
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-collapsefive"
                        aria-expanded="false"
                        aria-controls="faq-collapsefive"
                      >
                        What is your cancellation policy?
                      </button>
                    </h2>
                    <div
                      id="faq-collapsefive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFaq"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide range of tours, including cultural,
                          adventure, luxury, and customized itineraries.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion-item border wow fadeInUp"
                    data-wow-delay="1.0s"
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-collapsesix"
                        aria-expanded="false"
                        aria-controls="faq-collapsesix"
                      >
                        Can I book flights, hotels, and car rentals together?
                      </button>
                    </h2>
                    <div
                      id="faq-collapsesix"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFaq"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer a wide range of tours, including cultural,
                          adventure, luxury, and customized itineraries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /FAQ */}
            </div>
          </div>
        </section>
        {/* Update Section */}
        <section className="update-section expert-update section pt-0">
          <div className="container">
            <div className="update-sec wow zoomIn" data-wow-delay="0.2s">
              <div className="section-header text-center">
                <h2 className="mb-1">Stay Updated</h2>
                <p className="sub-title">
                  Signup for New Offers &amp; Updates from DreamsTour{" "}
                </p>
              </div>
              <div className="input-group justify-content-center mx-auto">
                <span className="input-group-text px-1">
                  <i className="isax isax-message-favorite5" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email Address"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </div>
              <div className="update-bg">
                <ImageWithBasePath src="assets/img/bg/update-bg.png" alt="img" />
              </div>
            </div>
          </div>
        </section>
        {/* /Update Section */}
      </>

    </div>
  );
};

export default BecomeAnExpert;
