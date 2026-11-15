"use client";
import Link from "next/link";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";

const HomeClients = () => {
  return (
    <>
      {/* Clients Section */}
      <section className="section clients-sec-seven bg-light">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="mb-2 line-icon">What Our Client Says</h2>
            <p className="sub-title">
              Explore heartfelt stories from our satisfied travelers
            </p>
          </div>
          {/* start row */}
          <div className="row row-gap-3">
            <div className="col-lg-4">
              {/* Testimonial Item*/}
              <div
                className="card border-light mb-0 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between text-center flex-column">
                    <div className="rating d-flex align-items-center mb-4">
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                    </div>
                    <p className="mb-4">
                      Booking our dream cruise was incredibly easy with Dreams
                      tour The interface was user-friendly, and I loved how i
                      tell my it was a dream come true and itineraries at a
                      glance.
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <Link href="#" className="avatar avatar-lg  flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/users/user-01.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="text-start">
                        <h5 className="fw-semibold">
                          <Link href="#">Andrew Miller</Link>
                        </h5>
                        <span className="city-type">
                          Illinois, United States
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-absolute bottom-0 end-0 me-2 d-none d-xxl-block">
                  <i className="isax isax-quote-down5 fs-42 text-light" />
                </div>
              </div>
              {/* /Testimonial Item*/}
            </div>
            <div className="col-lg-4">
              {/* Testimonial Item*/}
              <div
                className="card border-light mb-0 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between text-center flex-column">
                    <div className="rating d-flex align-items-center mb-4">
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                    </div>
                    <p className="mb-4">
                      Finding the perfect bus was effortless and fast. The
                      platform’s smart filters, clear route comparisons, my
                      journey simple, organized, and completely hassle free from
                      start to finish.
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <Link href="#" className="avatar avatar-lg  flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/users/user-06.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="text-start">
                        <h5 className="fw-semibold">
                          <Link href="#">Sarah Thompson</Link>
                        </h5>
                        <span className="city-type">Texas, United States</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-absolute bottom-0 end-0 me-2 d-none d-xxl-block">
                  <i className="isax isax-quote-down5 fs-42 text-light" />
                </div>
              </div>
              {/* /Testimonial Item*/}
            </div>
            <div className="col-lg-4">
              {/* Testimonial Item*/}
              <div
                className="card border-light mb-0 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between text-center flex-column">
                    <div className="rating d-flex align-items-center mb-4">
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                      <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                    </div>
                    <p className="mb-4">
                      he entire bus booking experience was seamless and stress
                      free. I could easily browse schedules, check seat
                      availability, with just a few clicks on a clean, user
                      friendly site.
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <Link href="#" className="avatar avatar-lg  flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/users/user-07.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="text-start">
                        <h5 className="fw-semibold">
                          <Link href="#">Daniel Roberts</Link>
                        </h5>
                        <span className="city-type">
                          Washington, United States
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-absolute bottom-0 end-0 me-2 d-none d-xxl-block">
                  <i className="isax isax-quote-down5 fs-42 text-light" />
                </div>
              </div>
              {/* /Testimonial Item*/}
            </div>
          </div>
          {/* end row */}
        </div>
      </section>
      {/* /Countries Section */}
      {/* Blogs Section */}
      <section className="section blogs-sec-seven">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="mb-2 line-icon">Blogs &amp; Articles</h2>
            <p className="sub-title">
              Explore Inspiring Travel Blogs and Useful Bus Travel Advice
            </p>
          </div>
          {/* start row */}
          <div className="row g-4 justify-content-center">
            {/* Blog Item*/}
            <div className="col-lg-4 col-md-6 d-flex">
              <div
                className="blog-item blog-wrap flex-fill wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <Link href={all_routes.busDetails} className="blog-img">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-01.jpg"
                    alt="img"
                    className="img-fluid w-100"
                  />
                  <span className="badge bg-primary text-white fs-14 fw-medium">
                    Bookings
                  </span>
                </Link>
                <div className="blog-content">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                    <Link href="#" className="d-flex align-items-center">
                      <span className="avatar avatar-md flex-shrink-0 me-2">
                        <ImageWithBasePath
                          src="assets/img/users/user-01.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </span>
                      <p className="fs-14">Merkel James</p>
                    </Link>
                    <p className="fs-13 fw-medium d-flex align-items-center">
                      <i className="isax isax-calendar-1 text-gray-9 fs-20 me-2" />
                      27 Sep 2025
                    </p>
                  </div>
                  <h5>
                    <Link href={all_routes.busDetails}>
                      Top Reasons to Choose Online Bus Booking for Your Next
                      Trip
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            {/* /Blog Item*/}
            {/* Blog Item*/}
            <div className="col-lg-4 col-md-6">
              <div
                className="blog-item blog-wrap flex-fill wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <Link href={all_routes.busDetails} className="blog-img">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-02.jpg"
                    alt="img"
                    className="img-fluid w-100"
                  />
                  <span className="badge bg-primary text-white fs-14 fw-medium">
                    Bus Travel
                  </span>
                </Link>
                <div className="blog-content">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                    <Link href="#" className="d-flex align-items-center">
                      <span className="avatar avatar-md flex-shrink-0 me-2">
                        <ImageWithBasePath
                          src="assets/img/users/user-02.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </span>
                      <p className="fs-14">Harriet Collins</p>
                    </Link>
                    <p className="fs-13 fw-medium d-flex align-items-center">
                      <i className="isax isax-calendar-1 text-gray-9 fs-20 me-2" />
                      27 Sep 2025
                    </p>
                  </div>
                  <h5>
                    <Link href={all_routes.busDetails}>
                      Smart Tips for a Comfortable and Hassle Free Bus Travel
                      Experience
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            {/* /Blog Item*/}
            {/* Blog Item*/}
            <div className="col-lg-4 col-md-6">
              <div
                className="blog-item blog-wrap flex-fill wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <Link href={all_routes.busDetails} className="blog-img">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-03.jpg"
                    alt="img"
                    className="img-fluid w-100"
                  />
                  <span className="badge bg-primary text-white fs-14 fw-medium">
                    Travel Tips
                  </span>
                </Link>
                <div className="blog-content">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                    <Link href="#" className="d-flex align-items-center">
                      <span className="avatar avatar-md flex-shrink-0 me-2">
                        <ImageWithBasePath
                          src="assets/img/users/user-03.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </span>
                      <p className="fs-14">Rachel Mariscal</p>
                    </Link>
                    <p className="fs-13 fw-medium d-flex align-items-center">
                      <i className="isax isax-calendar-1 text-gray-9 fs-20 me-2" />
                      27 Sep 2025
                    </p>
                  </div>
                  <h5>
                    <Link href={all_routes.busDetails}>
                      How Online Bus Reservations Save Time and Reduce Travel
                      Stress
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            {/* /Blog Item*/}
          </div>
          {/* end row */}
        </div>
      </section>
      {/* /Blogs Section */}
      {/* Subcribe section */}
      <section className="subscribe-sec-seven section">
        <div className="container">
          <div className="row justify-content-center row-gap-3">
            <div className="col-lg-8 col-md-6">
              <div className="section-header mb-0 text-center text-lg-start">
                <h2 className="text-white">Subscribe to Keep Updated</h2>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-input">
                <div className="input-group align-items-center justify-content-center">
                  <span className="input-group-text px-1">
                    <i className="isax isax-message-favorite5" />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                  />
                  <button type="submit" className="btn btn-primary btn-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Subcribe section */}
    </>
  );
};

export default HomeClients;
