"use client";
import AppSwiper from '../../components/app-swiper'
import ImageWithBasePath from "../../components/image-with-base-path";

const HomeTenPartners = () => {


  return (
    <>
      {/* Start Partners Section */}
      <div className="section bg-white pt-0">
        <section
          className="section partners-section-ten wow fadeInUp"
          data-wow-delay="1.5"
        >
          <div className="container">
            <AppSwiper preset="partners-slider">
              <div className="slide-item">
                <h2>
                  <ImageWithBasePath src="assets/img/clients/client-1.svg" alt="client" />
                </h2>
              </div>
              <div className="slide-item">
                <h2>
                  <ImageWithBasePath src="assets/img/clients/client-2.svg" alt="client" />
                </h2>
              </div>
              <div className="slide-item">
                <h2>
                  <ImageWithBasePath src="assets/img/clients/client-3.svg" alt="client" />
                </h2>
              </div>
              <div className="slide-item">
                <h2>
                  <ImageWithBasePath src="assets/img/clients/client-4.svg" alt="client" />
                </h2>
              </div>
              <div className="slide-item">
                <h2>
                  <ImageWithBasePath src="assets/img/clients/client-5.svg" alt="client" />
                </h2>
              </div>
              <div className="slide-item">
                <h2>
                  <ImageWithBasePath src="assets/img/clients/client-6.svg" alt="client" />
                </h2>
              </div>
              <div className="slide-item">
                <h2>
                  <ImageWithBasePath src="assets/img/clients/client-7.svg" alt="client" />
                </h2>
              </div>
            </AppSwiper>
          </div>
        </section>
      </div>
      {/* End Partners Section */}
      {/* Start FAQ Section */}
      <section className="section faq-section-ten">
        <div className="container">
          {/* start row  */}
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div
                className="section-header-ten wow fadeInUp"
                data-wow-delay="1.5"
              >
                <h2 className="section-title">
                  Frequently <span> Asked Questions </span>{" "}
                </h2>
              </div>
              <div
                className="accordion accordion-flush faq-accordion-five"
                id="accordionFaq"
              >
                <div
                  className="accordion-item show mb-3 wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
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
                      <span>Q1</span> What types of tours do you offer?
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
                        adventure, luxury, and customized itineraries.
                      </p>
                      <p>
                        Popular destinations include Europe, Africa (e.g.,
                        Morocco),{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item mb-3 wow fadeInUp"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.4s",
                    animationName: "fadeInUp",
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
                      <span>Q2</span> Do I need a travel guide for every tour?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsetwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        Not always. Travel guides are helpful for cultural
                        sites, unfamiliar destinations, group tours, or when you
                        want deeper local insight. Independent travelers may
                        skip a guide for simple or well-marked trips.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item mb-3  wow fadeInUp"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInUp",
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
                      <span>Q3</span> What languages do travel guides speak?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsthree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        Many guides are multilingual. Common languages include
                        English, Spanish, French, German, Mandarin, and regional
                        languages. Availability depends on the destination and
                        guide certification.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item mb-3 wow fadeInUp"
                  data-wow-delay="0.8s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.8s",
                    animationName: "fadeInUp",
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
                      <span>Q4</span> Can travel guides customize the tour?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsefour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes. Most guides can tailor itineraries based on your
                        interests, pace, budget, dietary needs, accessibility
                        requirements, and time constraints.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="1.0s"
                  style={{
                    visibility: "visible",
                    animationDelay: "1s",
                    animationName: "fadeInUp",
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
                      <span>Q5</span> Are travel guides suitable for families or
                      solo travelers?
                    </button>
                  </h2>
                  <div
                    id="faq-collapsefive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        Absolutely. Guides adapt experiences for families
                        (kid-friendly activities, safety) and solo travelers
                        (personalized pacing, local connections, and added
                        security).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end row  */}
            <div className="col-lg-4">
              <div className="faq-img-ten">
                <ImageWithBasePath
                  src="assets/img/faq/faq-img-1.jpg"
                  alt="faq"
                  className="img-fluid img-1"
                />
              </div>
            </div>{" "}
            {/* end row  */}
          </div>
          {/* end row  */}
        </div>
      </section>
      {/* End FAQ Section */}
    </>
  );
};

export default HomeTenPartners;
