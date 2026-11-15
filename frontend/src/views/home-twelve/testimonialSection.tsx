"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"
import { all_routes } from "../../routes/all_routes"


const TestimonialSection = () => {
  return (
    <>
  {/* Start Testimonial Section */}
  <section className="section tesitimonial-section-twelve">
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
          Traveler Testimonials
        </div>
        <h2 className="section-title">
          {" "}
          Hear from travelers who <span> trusted us </span> with their journey
        </h2>
      </div>
      {/* Start row  */}
      <div className="row row-gap-4">
        <div className="col-xl-4 col-lg-6 col-md-6">
          <div
            className="tesitimonial-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1s"
          >
            <p className="review">
              “The visa process was smooth and stress-free. The team guided me
              clearly at every step and kept me updated until approval. I booked
              my Dubai activities right after getting my visa.”
            </p>
            <div className="tesitimonial-review">
              <div className="tesitimonial-author">
                <div className="author">
                  <ImageWithBasePath
                    src="assets/img/users/user-01.jpg"
                    alt="user"
                    className="img-fluid img-1"
                  />
                </div>
                <div>
                  <div className="author-name">
                    <Link href="#">Robinson</Link>
                  </div>
                  <p className="visa">Business Visa</p>
                </div>
              </div>
              <div className="review-star">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col  */}
        <div className="col-xl-4 col-lg-6 col-md-6">
          <div className="tesitimonial-item-twelve">
            <p className="review">
              “I was worried about documentation, but they handled everything
              professionally. My Schengen visa got approved on time, and
              planning my Europe trip became so much easier.”
            </p>
            <div className="tesitimonial-review">
              <div className="tesitimonial-author">
                <div className="author">
                  <ImageWithBasePath
                    src="assets/img/users/user-06.jpg"
                    alt="user"
                    className="img-fluid img-1"
                  />
                </div>
                <div>
                  <div className="author-name">
                    <Link href="#">Immaculate</Link>
                  </div>
                  <p className="visa">Business Visa</p>
                </div>
              </div>
              <div className="review-star">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col  */}
        <div className="col-xl-4 col-lg-6 col-md-6">
          <div
            className="tesitimonial-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1.5s"
          >
            <p className="review">
              “Excellent support throughout my UK student visa process line
              through. They explained every requirement clearly and responded
              quickly whenever I had questions.”Thank You.
            </p>
            <div className="tesitimonial-review">
              <div className="tesitimonial-author">
                <div className="author">
                  <ImageWithBasePath
                    src="assets/img/users/user-20.jpg"
                    alt="user"
                    className="img-fluid img-1"
                  />
                </div>
                <div>
                  <div className="author-name">
                    <Link href="#">Lossy diea</Link>
                  </div>
                  <p className="visa">Work Visa</p>
                </div>
              </div>
              <div className="review-star">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col  */}
        <div className="col-xl-4 col-lg-6 col-md-6">
          <div
            className="tesitimonial-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2s"
          >
            <p className="review">
              This was my first international trip, and I was nervous about the
              visa process. The team handled everything smoothly and gave me
              confidence throughout. I would definitely recommend them.
            </p>
            <div className="tesitimonial-review">
              <div className="tesitimonial-author">
                <div className="author">
                  <ImageWithBasePath
                    src="assets/img/users/user-03.jpg"
                    alt="user"
                    className="img-fluid img-1"
                  />
                </div>
                <div>
                  <div className="author-name">
                    <Link href="#">Rishvin</Link>
                  </div>
                  <p className="visa">Tourist Visa</p>
                </div>
              </div>
              <div className="review-star">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col  */}
        <div className="col-xl-4 col-lg-6 col-md-6">
          <div
            className="tesitimonial-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2.5s"
          >
            <p className="review">
              {" "}
              The document checklist and follow-ups were very well managed. I
              didn’t have to worry about missing anything. A very professional
              experience overall.Thank you for your guidelines.{" "}
            </p>
            <div className="tesitimonial-review">
              <div className="tesitimonial-author">
                <div className="author">
                  <ImageWithBasePath
                    src="assets/img/users/user-04.jpg"
                    alt="user"
                    className="img-fluid img-1"
                  />
                </div>
                <div>
                  <div className="author-name">
                    <Link href="#">Adam John</Link>
                  </div>
                  <p className="visa">Business Visa</p>
                </div>
              </div>
              <div className="review-star">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col  */}
        <div className="col-xl-4 col-lg-6 col-md-6">
          <div
            className="tesitimonial-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="3s"
          >
            <p className="review">
              I liked that I could get visa assistance and plan my travel
              activities in the same platform. It saved a lot of time and made
              the trip planning very easy. Thank you for your support.
            </p>
            <div className="tesitimonial-review">
              <div className="tesitimonial-author">
                <div className="author">
                  <ImageWithBasePath
                    src="assets/img/users/user-05.jpg"
                    alt="user"
                    className="img-fluid img-1"
                  />
                </div>
                <div>
                  <div className="author-name">
                    <Link href="#">Tom Cruise</Link>
                  </div>
                  <p className="visa">Visiting Visa</p>
                </div>
              </div>
              <div className="review-star">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col  */}
      </div>
      {/* end row  */}
    </div>
    <ImageWithBasePath
      src="assets/img/bg/testimonial-bg.png"
      alt="testimonial"
      className="img-fluid bg-img"
    />
  </section>
  {/* End Testimonial Section */}
  {/* Start Blogs Section */}
  <section className="section blog-section-twelve">
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
          Latest Articles &amp; Blogs
        </div>
        <h2 className="section-title">
          {" "}
          Stay <span>Updated</span> on the Stories
        </h2>
      </div>
      {/* start row */}
      <div className="row justify-content-center row-gap-4">
        <div className="col-lg-4 col-md-6 d-flex">
          <div
            className="blog-item-twelve flex-fill wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1.5s"
          >
            <div className="blog-overlay">
              <span className="badge">Adventure Travel</span>
              <ImageWithBasePath
                src="assets/img/blog/blog-img-5.jpg"
                alt="blog"
                className="img-fluid blog-img"
              />
            </div>
            <div className="blog-content">
              <h3 className="custom-title">
                <Link href={all_routes.blogGrid}> Visas for Thrill Seekers</Link>
              </h3>
              <p>
                Explore how adventure travelers secure visas for extreme sports,
                expeditions, and cultural immersion, ensuring safe and legal
                experiences.
              </p>
            </div>
            <div className="blog-footer">
              <div className="blog-author">
                <ImageWithBasePath
                  src="assets/img/users/blog-user-1.jpg"
                  alt="blog"
                  className="img-fluid img-1"
                />
                <Link href="#" className="link">
                  John Smith
                </Link>
              </div>
              <p className="blog-time">
                {" "}
                <i className="isax isax-calendar-1" /> 25 Jun 2026
              </p>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div
            className="blog-item-twelve flex-fill wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2s"
          >
            <div className="blog-overlay">
              <span className="badge">Remote Work Policies</span>
              <ImageWithBasePath
                src="assets/img/blog/blog-img-6.jpg"
                alt="blog"
                className="img-fluid blog-img"
              />
            </div>
            <div className="blog-content">
              <h3 className="custom-title">
                <Link href={all_routes.blogGrid}> Visa for Remote Workers</Link>
              </h3>
              <p>
                Discover the best visa options for remote workers, balancing
                work flexibility with legal travel requirements for extended
                stays abroad.
              </p>
            </div>
            <div className="blog-footer">
              <div className="blog-author">
                <ImageWithBasePath
                  src="assets/img/users/blog-user-2.jpg"
                  alt="blog"
                  className="img-fluid img-1"
                />
                <Link href="#" className="link">
                  Kim David
                </Link>
              </div>
              <p className="blog-time">
                {" "}
                <i className="isax isax-calendar-1" /> 30 Apr 2026{" "}
              </p>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div
            className="blog-item-twelve flex-fill wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2.5s"
          >
            <div className="blog-overlay">
              <span className="badge">Travel Insights</span>
              <ImageWithBasePath
                src="assets/img/blog/blog-img-7.jpg"
                alt="blog"
                className="img-fluid blog-img"
              />
            </div>
            <div className="blog-content">
              <h3 className="custom-title">
                <Link href={all_routes.blogGrid}> Visas for Digital Nomads</Link>
              </h3>
              <p>
                Learn how digital nomads utilize explore the globe, access
                remote work opportunities, and ensure compliance with
                immigration laws.
              </p>
            </div>
            <div className="blog-footer">
              <div className="blog-author">
                <ImageWithBasePath
                  src="assets/img/users/blog-user-3.jpg"
                  alt="blog"
                  className="img-fluid img-1"
                />
                <Link href="#" className="link">
                  David Kim
                </Link>
              </div>
              <p className="blog-time">
                {" "}
                <i className="isax isax-calendar-1" /> 28 Jul 2026{" "}
              </p>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>
      {/* end row */}
    </div>
  </section>
  {/* End Blogs Section */}
</>

  )
}

export default TestimonialSection