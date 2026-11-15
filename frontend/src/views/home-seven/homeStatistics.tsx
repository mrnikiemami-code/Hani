"use client";
import Link from "next/link";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";
import CountUp from "react-countup";

const HomeStatistics = () => {
  return (
    <>
      {/* Statistics Section */}
      <section className="section stat-sec-seven pt-0">
        <div className="container">
          {/* start row */}
          <div className="row justify-content-center row-gap-3">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="stat-item">
                <h2>
                  <span className="counter animated fadeInDownBig"><CountUp end={88} /></span>
                </h2>
                <h6>Happy Customers</h6>
              </div>
            </div>
            {/* end col */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="stat-item">
                <h2>
                  <span className="counter animated fadeInDownBig"><CountUp end={5600} /></span>+
                </h2>
                <h6>Successfully Completed Tours</h6>
              </div>
            </div>
            {/* end col */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="stat-item">
                <h2>
                  <span className="counter animated fadeInDownBig"><CountUp end={25} /></span>K
                </h2>
                <h6>Travellers Around the World</h6>
              </div>
            </div>
            {/* end col */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="stat-item">
                <h2>
                  <span className="counter animated fadeInDownBig"><CountUp end={9} /></span>+
                </h2>
                <h6>Routes Per Day</h6>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </section>
      {/* /Statistics Section */}
      {/* Experts Section */}
      <section className="section adavantages-sec adavantages-sec-seven bg-light-200">
        <div className="container">
          {/* start row */}
          <div className="row align-items-center">
            <div className="col-xl-6">
              <div className="section-right-img d-none d-xl-block">
                <ImageWithBasePath
                  src="assets/img/bus/about-img.png"
                  alt="Img"
                  className="img-fluid"
                />
                <div className="percentage text-center">
                  <h2 className="mb-1 text-white">10+</h2>
                  <p className="text-white">
                    Years of <span className="d-block">Experience</span>
                  </p>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xl-6">
              <div>
                <span className="text-primary fs-16 fw-medium mb-4 d-block">
                  About Us
                </span>
                <h2 className="mb-4">
                  Experience hassle-free travel with real{" "}
                  <span className="d-block">
                    time tracking and instant booking.
                  </span>
                </h2>
                <p>
                  We are a team of dedicated professionals committed to
                  delivering excellence through innovation, quality, and
                  customer satisfaction. Our journey began with a simple vision
                  — to make everyday experiences smarter, simpler, and more
                  meaningful.
                </p>
                {/* start row */}
                <div className="row mt-4 row-gap-4">
                  <div className="col-md-6">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-xxl-center gap-3 flex-wrap flex-xxl-nowrap flex-column flex-xxl-row">
                          <span className="avatar rounded-icon-md rounded-circle bg-purple flex-shrink-0">
                            <i className="isax isax-add5 fs-24" />
                          </span>
                          <div>
                            <h5 className="mb-2">Comfort &amp; Safety</h5>
                            <p className="text-truncate line-clamb-3">
                              Travel with verified operators and clean buses.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-xxl-center gap-3 flex-wrap flex-xxl-nowrap flex-column flex-xxl-row">
                          <span className="avatar rounded-icon-md rounded-circle bg-orange flex-shrink-0">
                            <i className="isax isax-edit-25 fs-24" />
                          </span>
                          <div>
                            <h5 className="mb-2">Smart Travel Feature</h5>
                            <p className="text-truncate line-clamb-3">
                              Real-time tracking ,updates &amp; easy
                              cancellations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-xxl-center gap-3 flex-wrap flex-xxl-nowrap flex-column flex-xxl-row">
                          <span className="avatar rounded-icon-md rounded-circle bg-success flex-shrink-0">
                            <i className="isax isax-tick-circle5 fs-24" />
                          </span>
                          <div>
                            <h5 className="mb-2">Secure Payments</h5>
                            <p className="text-truncate line-clamb-3">
                              Multiple payment options with full data
                              protection.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="card border-0 mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-xxl-center gap-3 flex-wrap flex-xxl-nowrap flex-column flex-xxl-row">
                          <span className="avatar rounded-icon-md rounded-circle bg-teal flex-shrink-0">
                            <i className="isax isax-star5 fs-24" />
                          </span>
                          <div>
                            <h5 className="mb-2">Seamless Experience</h5>
                            <p className="text-truncate line-clamb-3">
                              Simple, fast, and reliable booking experience{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                </div>
                {/* end row */}
                <div className="d-flex align-items-center view-all">
                  <Link
                    href={all_routes.busDetails}
                    className="btn btn-dark d-flex align-items-center gap-2"
                  >
                    More About Us
                    <i className="isax isax-arrow-right-3" />
                  </Link>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </section>
      {/* /Experts Section */}

      {/* Support Section */}
      <section className="support-section support-sec-seven bg-primary overflow-hidden">
        <div
          className="horizontal-slide d-flex"
          data-direction="left"
          data-speed="slow"
        >
          <div className="slide-list d-flex">
            <div className="support-item">
              <h5>Personalized Itineraries</h5>
            </div>
            <div className="support-item">
              <h5>Comprehensive Planning</h5>
            </div>
            <div className="support-item">
              <h5>Expert Guidance</h5>
            </div>
            <div className="support-item">
              <h5>Local Experience</h5>
            </div>
            <div className="support-item">
              <h5>Customer Support</h5>
            </div>
            <div className="support-item">
              <h5>Sustainability Efforts</h5>
            </div>
            <div className="support-item">
              <h5>Multiple Regions</h5>
            </div>
          </div>
        </div>
      </section>
      {/* /Support Section */}
    </>
  );
};

export default HomeStatistics;
