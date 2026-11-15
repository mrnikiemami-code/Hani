"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"
import { all_routes } from "../../routes/all_routes"


const VisaTypes = () => {
  return (
    <>
  {/* Start Visa Section */}
  <section className="section visa-section-twelve">
    <div className="container">
      <div
        className="section-header-twelve wow fadeInDown"
        data-wow-delay="0.3"
        data-wow-duration="1.5s"
      >
        <div className="subtitle">
          {" "}
          <ImageWithBasePath
            src="assets/img/icons/flight-icon-1.svg"
            alt="flight"
            className="img-fluid img-1"
          />
          Visa Types
        </div>
        <h2 className="section-title">
          {" "}
          Complete <span>visa assistance</span> for every type of traveler
        </h2>
      </div>
      {/* start row */}
      <div className="row align-items-center">
        <div className="col-lg-5">
          <div
            className="visa-img d-none d-lg-block wow zoomIn"
            data-wow-delay="0.3"
            data-wow-duration="1.5s"
          >
            <ImageWithBasePath
              src="assets/img/visa/visa-img-1.jpg"
              alt="visa"
              className="img-fluid img-1"
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div
            className="accordion accordion-flush faq-accordion-five"
            id="accordionFaq"
          >
            <div
              className="accordion-item show mb-3 wow fadeInDown"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInDown"
              }}
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
                  <span>01</span> Tourist Visa
                </button>
              </h2>
              <div
                id="faq-collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  <div className="accordion-inner">
                    A tourist visa is an official document issued by a country
                    that allows you to enter and stay there for leisure,
                    sightseeing, visiting friends/relatives, and other non-work
                    purposes.
                    <div className="accordion-img">
                      <ImageWithBasePath
                        src="assets/img/visa/visa-img-01.jpg"
                        alt="visa"
                        className="img-fluid img-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="accordion-item mb-3 wow fadeInDown"
              data-wow-delay="0.4s"
              style={{
                visibility: "visible",
                animationDelay: "0.4s",
                animationName: "fadeInDown"
              }}
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
                  <span>02</span> Business Visa
                </button>
              </h2>
              <div
                id="faq-collapsetwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  <div className="accordion-inner">
                    Apply for a student visa with complete guidance from
                    application to approval. We help you choose the right
                    country, university, and ensure all documents meet embassy
                    requirements.
                    <div className="accordion-img">
                      <ImageWithBasePath
                        src="assets/img/visa/visa-img-02.jpg"
                        alt="visa"
                        className="img-fluid img-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="accordion-item mb-3  wow fadeInDown"
              data-wow-delay="0.6s"
              style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInDown"
              }}
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
                  <span>03</span> Student Visa
                </button>
              </h2>
              <div
                id="faq-collapsthree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  <div className="accordion-inner">
                    A Student Visa allows international students to enter and
                    stay in a foreign country for educational purposes, such as
                    university degrees, diploma courses, language programs, or
                    professional training.
                    <div className="accordion-img">
                      <ImageWithBasePath
                        src="assets/img/visa/visa-img-03.jpg"
                        alt="visa"
                        className="img-fluid img-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="accordion-item mb-3 wow fadeInDown"
              data-wow-delay="0.8s"
              style={{
                visibility: "visible",
                animationDelay: "0.8s",
                animationName: "fadeInDown"
              }}
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
                  <span>04</span> Transit Visa
                </button>
              </h2>
              <div
                id="faq-collapsefour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  <div className="accordion-inner">
                    A Transit Visa allows travelers to pass through a country
                    while traveling to another destination, usually for a short
                    period, without entering the country for tourism or work.
                    <div className="accordion-img">
                      <ImageWithBasePath
                        src="assets/img/visa/visa-img-04.jpg"
                        alt="visa"
                        className="img-fluid img-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="accordion-item wow fadeInDown"
              data-wow-delay="1.0s"
              style={{
                visibility: "visible",
                animationDelay: "1s",
                animationName: "fadeInDown"
              }}
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
                  <span>05</span> Group Travel Visa
                </button>
              </h2>
              <div
                id="faq-collapsefive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  <div className="accordion-inner">
                    A Group Travel Visa allows multiple travelers to apply and
                    travel together under a single visa application, commonly
                    used for tour groups, families, corporate trips, students,
                    or pilgrimages.
                    <div className="accordion-img">
                      <ImageWithBasePath
                        src="assets/img/visa/visa-img-05.jpg"
                        alt="visa"
                        className="img-fluid img-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}
    </div>
  </section>
  {/* End Statistics Section */}
   {/* Start Trip Section */}
  <section className="section trip-section-twelve p-0">
    <div className="container">
      <div className="trip-twelve">
        <div
          className="section-header-twelve wow fadeInDown"
          data-wow-delay="0.3"
          data-wow-duration="1.5s"
        >
          <h2 className="section-title"> Plan Your Trip Without Worries </h2>
          <p>Visa support and unforgettable experiences — all in one place.</p>
          <Link href={all_routes.agentVisaBooking} className="btn btn-white">
            {" "}
            Start Visa Application <i className="isax isax-arrow-right-3" />
          </Link>
        </div>
      </div>
    </div>
    <ImageWithBasePath
      src="assets/img/flight/flight-img-1.png"
      alt="flight"
      className="img-fluid flight-1 wow zoomIn"
      data-wow-delay="0.3"
      data-wow-duration="2.5s"
    />
  </section>
  {/* End Trip Section */}
</>

  )
}

export default VisaTypes