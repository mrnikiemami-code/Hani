"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";

const HomeTenExperience = () => {
    const routes = all_routes;
  return (
    <>
      {/* Start Experience Section */}
      <section className="section experience-section-ten">
        <div className="container">
          <div className="section-header-ten wow fadeInUp" data-wow-delay="1.5">
            <h2 className="section-title">
              We're committed to providing the{" "}
              <span className="d-block"> best tour experiences</span>{" "}
            </h2>
          </div>
          {/* start row */}
          <div className="row align-items-center">
            <div className="col-lg-3">
              {/* Item 1  */}
              <div className="experience-item-ten">
                <div className="experience-icon">
                  <i className="isax isax-calendar-search5" />
                </div>
                <div className="experience-content">
                  <h3 className="custom-title mb-2">Custom Itineraries</h3>
                  <p>Flexible tours tailored to your interests and schedule</p>
                </div>
              </div>
              {/* Item 2  */}
              <div className="experience-item-ten">
                <div className="experience-icon bg-teal">
                  <i className="isax isax-money5" />
                </div>
                <div className="experience-content">
                  <h3 className="custom-title mb-2">Best Price Guarantee</h3>
                  <p>Get the best value with our price match promise</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex">
              <div className="experience-img wow zoomIn" data-wow-delay="1.5">
                <ImageWithBasePath
                  src="assets/img/experiance/experience-img-1.png"
                  alt="experience-img"
                  className="img-fluid img-1"
                />
              </div>
            </div>
            <div className="col-lg-3">
              {/* Item 3  */}
              <div className="experience-item-ten">
                <div className="experience-icon bg-primary">
                  <i className="isax isax-document-copy5" />
                </div>
                <div className="experience-content">
                  <h3 className="custom-title mb-2">Certified Guides</h3>
                  <p>
                    All our guides are certified professionals with local
                    knowledge
                  </p>
                </div>
              </div>
              {/* Item 4  */}
              <div className="experience-item-ten">
                <div className="experience-icon bg-secondary">
                  <i className="isax isax-security-user5" />
                </div>
                <div className="experience-content">
                  <h3 className="custom-title mb-2">24/7 Support</h3>
                  <p>Round-the-clock assistance whenever you need it</p>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        <ImageWithBasePath
          src="assets/img/experiance/exp-shadow-3.png"
          alt="shadow-img"
          className="img-fluid shadow-1"
        />
      </section>
      {/* End Experience Section */}
      {/* Start Team Section */}
      <section className="section team-section-ten">
        <div className="container">
          <div className="section-header-ten wow fadeInUp" data-wow-delay="1.5">
            <h2 className="section-title">
              Featured <span> Guides</span>{" "}
            </h2>
          </div>
          {/* start row */}
          <div className="row row-gap-4">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="team-item-ten wow fadeInUp"
                data-wow-delay={1}
                data-wow-duration="1s"
              >
                <div className="team-item-ten">
                  <div className="team-overlay">
                    <Link href={routes.teams}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-31.jpg"
                        alt="destination"
                        className="img-fluid img-1"
                      />
                      <ImageWithBasePath
                        src="assets/img/icons/shape-3.png"
                        alt="categories"
                        className="img-fluid shape-1"
                      />
                    </Link>
                  </div>
                  <div className="team-content">
                    <div className="title">
                      <h3 className="custom-title">
                        <Link href={routes.teams}>Anthony Perez</Link>
                      </h3>
                      <p> Chicago </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="team-item-ten wow fadeInUp"
                data-wow-delay="1.5"
                data-wow-duration="1.5s"
              >
                <div className="team-item-ten">
                  <div className="team-overlay">
                    <Link href={routes.teams}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-32.jpg"
                        alt="destination"
                        className="img-fluid img-1"
                      />
                      <ImageWithBasePath
                        src="assets/img/icons/shape-3.png"
                        alt="categories"
                        className="img-fluid shape-1"
                      />
                    </Link>
                  </div>
                  <div className="team-content">
                    <div className="title">
                      <h3 className="custom-title">
                        <Link href={routes.teams}>Olivia Martinez</Link>
                      </h3>
                      <p> Tokyo </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="team-item-ten wow fadeInUp"
                data-wow-delay={2}
                data-wow-duration="2s"
              >
                <div className="team-item-ten">
                  <div className="team-overlay">
                    <Link href={routes.teams}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-33.jpg"
                        alt="destination"
                        className="img-fluid img-1"
                      />
                      <ImageWithBasePath
                        src="assets/img/icons/shape-3.png"
                        alt="categories"
                        className="img-fluid shape-1"
                      />
                    </Link>
                  </div>
                  <div className="team-content">
                    <div className="title">
                      <h3 className="custom-title">
                        <Link href={routes.teams}>Tyler Morgan</Link>
                      </h3>
                      <p> Bangkok </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="team-item-ten wow fadeInUp"
                data-wow-delay="2.5"
                data-wow-duration="2.5s"
              >
                <div className="team-item-ten">
                  <div className="team-overlay">
                    <Link href={routes.teams}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-34.jpg"
                        alt="destination"
                        className="img-fluid img-1"
                      />
                      <ImageWithBasePath
                        src="assets/img/icons/shape-3.png"
                        alt="categories"
                        className="img-fluid shape-1"
                      />
                    </Link>
                  </div>
                  <div className="team-content">
                    <div className="title">
                      <h3 className="custom-title">
                        <Link href={routes.teams}>Karen Perez</Link>
                      </h3>
                      <p> Singapore </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </section>
      {/* End Experience Section */}
      {/* Start Testimonial Section */}
      <section className="section testimonial-section-ten">
        <div className="container">
          <div className="testimonial-header wow fadeInUp" data-wow-delay="1.5">
            <div className="section-header-ten">
              <h2 className="section-title">
                Hear From Our <span> Happy Clients</span>{" "}
              </h2>
            </div>
            <div className="advisor-icon">
              <ImageWithBasePath
                src="assets/img/icons/testimonial-icon-1.svg"
                alt="testimonial"
                className="img-fluid img-1"
              />
              <p>
                <i className="fa-solid fa-circle" />
                <i className="fa-solid fa-circle" />
                <i className="fa-solid fa-circle" />
                <i className="fa-solid fa-circle" />
                <i className="fa-solid fa-circle" />
                <span>5.0 From 2560+Reviews </span>
              </p>
            </div>
          </div>
        </div>
        {/* Slide section  */}
        <div
          className="horizontal-slide d-flex mb-4 wow fadeInUp"
          data-wow-delay="1.5"
          data-direction="left"
          data-speed="slow"
        >
          <div className="slide-list d-flex gap-4">
            {/* Item 1 */}
            <div className="testimonial-item-ten ">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-01.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Dazzle Healer
                    </Link>
                    <p className="professional">Front End Developer</p>
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
              <p className="description">
                I've explored many tour options, but this one stands out. The
                detailed planning and user-friendly approach are exceptional.
                Highly recommended for seamless travel experiences. Kudos to the
                team!
              </p>
            </div>
            {/* Item 2 */}
            <div className="testimonial-item-ten">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-02.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Crystal Maiden
                    </Link>
                    <p className="professional">UIUX Designer</p>
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
              <p className="description">
                This tour platform has transformed my travel planning. The
                intuitive interface and comprehensive information save valuable
                time. Perfect for both novice and experienced travelers seeking
                adventure.
              </p>
            </div>
            {/* Item 3 */}
            <div className="testimonial-item-ten">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-03.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Steave Paul{" "}
                    </Link>
                    <p className="professional">Back End Developer</p>
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
              <p className="description">
                This guide turned our trip into an unforgettable experience. The
                planning was perfect, the timing was smooth, and the stories
                shared at each location made the tour truly come alive.
              </p>
            </div>
            {/* Item 4 */}
            <div className="testimonial-item-ten">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-05.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Thomos John
                    </Link>
                    <p className="professional">Mobile App Developer</p>
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
              <p className="description">
                I’ve explored many destinations, but this tour felt different
                because of the guide’s personal attention and deep local
                insight. Everything was well organized and easy to follow.
                Highly recommended.
              </p>
            </div>
          </div>
        </div>
        {/* Slide section */}
        {/* Slide section  */}
        <div
          className="horizontal-slide d-flex wow fadeInUp"
          data-wow-delay="1.5"
          data-direction="right"
          data-speed="slow"
        >
          <div className="slide-list d-flex gap-4">
            {/* Item 1 */}
            <div className="testimonial-item-ten">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-01.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Dazzle Healer
                    </Link>
                    <p className="professional">Front End Developer</p>
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
              <p className="description">
                From pickup to the final stop, the guide handled everything
                perfectly. Clear instructions, friendly attitude, and great
                destination knowledge made this one of my best travel
                experiences.
              </p>
            </div>
            {/* Item 2 */}
            <div className="testimonial-item-ten">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-02.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Crystal Maiden
                    </Link>
                    <p className="professional">UIUX Designer</p>
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
              <p className="description">
                As a tourist, I truly enjoyed every part of the tour because of
                the guide’s excellent planning and friendly support. The
                explanations were clear and the entire journey felt relaxed and
                enjoyable.
              </p>
            </div>
            {/* Item 3 */}
            <div className="testimonial-item-ten">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-03.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Steave Paul{" "}
                    </Link>
                    <p className="professional">Back End Developer</p>
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
              <p className="description">
                This guide made our trip smooth and worry free from start to
                finish. The local tips, well timed stops, and personal attention
                made the experience feel special and highly memorable.
              </p>
            </div>
            {/* Item 4 */}
            <div className="testimonial-item-ten">
              <div className="testimonial-author">
                <div className="testimonial-view">
                  <div className="author-img">
                    <Link href="#" className="author">
                      <ImageWithBasePath src="assets/img/users/user-05.jpg" alt="profile" />
                    </Link>
                  </div>
                  <div className="author-info">
                    <Link href="#" className="author-name">
                      Thomos John
                    </Link>
                    <p className="professional">Mobile App Developer</p>
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
              <p className="description">
                I've explored many tour options, but this one stands out. The
                detailed planning and user-friendly approach are exceptional.
                Highly recommended for seamless travel experiences. Kudos to the
                team!
              </p>
            </div>
          </div>
        </div>
        {/* Slide section */}
        <ImageWithBasePath
          src="assets/img/experiance/exp-shadow-4.png"
          alt="shadow"
          className="img-flui shadow-1"
        />
      </section>
      {/* End Testimonial Section */}
    </>
  );
};

export default HomeTenExperience;
