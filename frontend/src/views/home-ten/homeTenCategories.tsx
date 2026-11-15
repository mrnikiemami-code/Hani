"use client";
import Link from "next/link";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";

const HomeTenCategories = () => {
  const routes = all_routes;
  return (
    <>
      {/* Start Categories Section */}
      <section className="section categories-section-ten">
        <div className="container">
          <div className="section-header-ten wow fadeInUp" data-wow-delay="1.5">
            <h2 className="section-title">
              Featured Tour <span>Categories</span>{" "}
            </h2>
            <Link href="#" className="btn btn-primary">
              View All Categories <i className="isax isax-arrow-right-3" />{" "}
            </Link>
          </div>
          {/* start row */}
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-sm-2 row-cols-1 g-4 justify-content-center">
            <div className="col">
              {/* Item 1 */}
              <div
                className="categories-item-ten wow fadeInUp"
                data-wow-delay={1}
                data-wow-duration="1s"
              >
                <div className="categories-overlay">
                  <ImageWithBasePath
                    src="assets/img/tours/categories-img-1.jpg"
                    alt="categories-img"
                    className="img-fluid img-1"
                  />
                </div>
                <div className="categories-content">
                  <h3 className="custom-title">Ecotourism</h3>
                  <p className="mb-0">25 Guides</p>
                </div>
                <Link href="#" className="arrow-icon">
                  <i className="isax isax-arrow-right-1" />
                </Link>
                <ImageWithBasePath
                  src="assets/img/icons/categories-icon-1.svg"
                  alt="categories"
                  className="img-fluid shape-1"
                />
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col">
              {/* Item 1 */}
              <div
                className="categories-item-ten wow fadeInUp"
                data-wow-delay="1.5"
                data-wow-duration="1.5s"
              >
                <div className="categories-overlay">
                  <ImageWithBasePath
                    src="assets/img/tours/categories-img-2.jpg"
                    alt="categories-img"
                    className="img-fluid img-1"
                  />
                </div>
                <div className="categories-content">
                  <h3 className="custom-title">Adventure Tour</h3>
                  <p className="mb-0">47 Guides</p>
                </div>
                <Link href="#" className="arrow-icon">
                  <i className="isax isax-arrow-right-1" />
                </Link>
                <ImageWithBasePath
                  src="assets/img/icons/categories-icon-1.svg"
                  alt="categories"
                  className="img-fluid shape-1"
                />
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col">
              {/* Item 1 */}
              <div
                className="categories-item-ten wow fadeInUp"
                data-wow-delay={2}
                data-wow-duration="2s"
              >
                <div className="categories-overlay">
                  <ImageWithBasePath
                    src="assets/img/tours/categories-img-3.jpg"
                    alt="categories-img"
                    className="img-fluid img-1"
                  />
                </div>
                <div className="categories-content">
                  <h3 className="custom-title">Group Tours</h3>
                  <p className="mb-0">38 Guides</p>
                </div>
                <Link href="#" className="arrow-icon">
                  <i className="isax isax-arrow-right-1" />
                </Link>
                <ImageWithBasePath
                  src="assets/img/icons/categories-icon-1.svg"
                  alt="categories"
                  className="img-fluid shape-1"
                />
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col">
              {/* Item 1 */}
              <div
                className="categories-item-ten wow fadeInUp"
                data-wow-delay="2.5"
                data-wow-duration="2.5s"
              >
                <div className="categories-overlay">
                  <ImageWithBasePath
                    src="assets/img/tours/categories-img-4.jpg"
                    alt="categories-img"
                    className="img-fluid img-1"
                  />
                </div>
                <div className="categories-content">
                  <h3 className="custom-title">Beach Tours</h3>
                  <p className="mb-0">54 Guides</p>
                </div>
                <Link href="#" className="arrow-icon">
                  <i className="isax isax-arrow-right-1" />
                </Link>
                <ImageWithBasePath
                  src="assets/img/icons/categories-icon-1.svg"
                  alt="categories"
                  className="img-fluid shape-1"
                />
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col">
              {/* Item 1 */}
              <div
                className="categories-item-ten wow fadeInUp"
                data-wow-delay={3}
                data-wow-duration="3s"
              >
                <div className="categories-overlay">
                  <ImageWithBasePath
                    src="assets/img/tours/categories-img-5.jpg"
                    alt="categories-img"
                    className="img-fluid img-1"
                  />
                </div>
                <div className="categories-content">
                  <h3 className="custom-title">Honey Moon</h3>
                  <p className="mb-0">22 Guides</p>
                </div>
                <Link href="#" className="arrow-icon">
                  <i className="isax isax-arrow-right-1" />
                </Link>
                <ImageWithBasePath
                  src="assets/img/icons/categories-icon-1.svg"
                  alt="categories"
                  className="img-fluid shape-1"
                />
              </div>
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </section>
      {/* End Categories Section */}
      {/* Start Destination Section */}
      <section className="section destination-section-ten">
        <div className="container">
          <div className="section-header-ten wow fadeInUp" data-wow-delay="1.5">
            <h2 className="section-title">
              Explore our hand picked{" "}
              <span>destinations around the globe</span>{" "}
            </h2>
          </div>
          {/* start row */}
          <div className="row row-gap-4">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="destination-item-ten wow fadeInUp"
                data-wow-delay={1}
                data-wow-duration="1s"
              >
                <div className="destination-overlay">
                  <Link href="#">
                    <ImageWithBasePath
                      src="assets/img/destination/destination-img-1.jpg"
                      alt="destination"
                      className="img-fluid img-1"
                    />
                  </Link>
                  <ImageWithBasePath
                    src="assets/img/icons/shape-2.svg"
                    alt="categories"
                    className="img-fluid shape-1"
                  />
                </div>
                <div className="destination-content">
                  <div className="title">
                    <h3 className="custom-title">
                      <Link href="#">Santorini, Greece</Link>
                    </h3>
                    <p>
                      {" "}
                      Starts From <span> $200</span>{" "}
                    </p>
                  </div>
                  <div>
                    <Link href="#" className="link-icon">
                      {" "}
                      <i className="isax isax-arrow-right-3" />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="destination-item-ten wow fadeInUp"
                data-wow-delay="1.5"
                data-wow-duration="1.5s"
              >
                <div className="destination-overlay">
                  <Link href="#">
                    <ImageWithBasePath
                      src="assets/img/destination/destination-img-2.jpg"
                      alt="destination"
                      className="img-fluid img-1"
                    />
                  </Link>
                  <ImageWithBasePath
                    src="assets/img/icons/shape-2.svg"
                    alt="categories"
                    className="img-fluid shape-1"
                  />
                </div>
                <div className="destination-content">
                  <div className="title">
                    <h3 className="custom-title">
                      <Link href="#">Tokyo, Japan</Link>
                    </h3>
                    <p>
                      {" "}
                      Starts From <span> $300</span>{" "}
                    </p>
                  </div>
                  <div>
                    <Link href="#" className="link-icon">
                      {" "}
                      <i className="isax isax-arrow-right-3 text-xl" />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="destination-item-ten wow fadeInUp"
                data-wow-delay={2}
                data-wow-duration="2s"
              >
                <div className="destination-overlay">
                  <Link href="#">
                    <ImageWithBasePath
                      src="assets/img/destination/destination-img-3.jpg"
                      alt="destination"
                      className="img-fluid img-1"
                    />
                  </Link>
                  <ImageWithBasePath
                    src="assets/img/icons/shape-2.svg"
                    alt="categories"
                    className="img-fluid shape-1"
                  />
                </div>
                <div className="destination-content">
                  <div className="title">
                    <h3 className="custom-title">
                      <Link href="#">Paris, France</Link>
                    </h3>
                    <p>
                      {" "}
                      Starts From <span> $320</span>{" "}
                    </p>
                  </div>
                  <div>
                    <Link href="#" className="link-icon">
                      {" "}
                      <i className="isax isax-arrow-right-3 text-xl" />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="destination-item-ten wow fadeInUp"
                data-wow-delay="2.5"
                data-wow-duration="2.5s"
              >
                <div className="destination-overlay">
                  <Link href="#">
                    <ImageWithBasePath
                      src="assets/img/destination/destination-img-4.jpg"
                      alt="destination"
                      className="img-fluid img-1"
                    />
                  </Link>
                  <ImageWithBasePath
                    src="assets/img/icons/shape-2.svg"
                    alt="categories"
                    className="img-fluid shape-1"
                  />
                </div>
                <div className="destination-content">
                  <div className="title">
                    <h3 className="custom-title">
                      <Link href="#">Bali, Indonesia</Link>
                    </h3>
                    <p>
                      {" "}
                      Starts From <span> $180</span>{" "}
                    </p>
                  </div>
                  <div>
                    <Link href="#" className="link-icon">
                      {" "}
                      <i className="isax isax-arrow-right-3 text-xl" />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
          <div className="view-more wow fadeInUp" data-wow-delay="1.5">
            <Link href={routes.destination} className="btn btn-primary">
              View All Destinations{" "}
              <i className="isax isax-arrow-right-3" />{" "}
            </Link>
          </div>
        </div>
      </section>
      {/* End Destination Section */}
      {/* Start Slide Section */}
      <section
        className="support-section support-sec-eight support-section-ten overflow-hidden wow fadeInUp"
        data-wow-delay="1.5"
      >
        <div
          className="horizontal-slide d-flex"
          data-direction="right"
          data-speed="slow"
        >
          <div className="slide-list d-flex">
            <div className="support-item">
              <h3>Comprehensive Planning</h3>
            </div>
            <div className="support-item">
              <div>
                <ImageWithBasePath
                  src="assets/img/users/user-icon-1.png"
                  alt="user"
                  className="img-1"
                />
              </div>
            </div>
            <div className="support-item">
              <h3>Expert Guidance</h3>
            </div>
            <div className="support-item">
              <div>
                <ImageWithBasePath
                  src="assets/img/users/user-icon-1.png"
                  alt="user"
                  className="img-1"
                />
              </div>
            </div>
            <div className="support-item">
              <h3>Local Experience</h3>
            </div>
            <div className="support-item">
              <div>
                <ImageWithBasePath
                  src="assets/img/users/user-icon-1.png"
                  alt="user"
                  className="img-1"
                />
              </div>
            </div>
            <div className="support-item">
              <h3>Languages spoken</h3>
            </div>
            <div className="support-item">
              <div>
                <ImageWithBasePath
                  src="assets/img/users/user-icon-1.png"
                  alt="user"
                  className="img-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Slide Section */}
    </>
  );
};

export default HomeTenCategories;
