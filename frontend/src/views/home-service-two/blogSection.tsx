"use client";
import { Fragment } from "react";
import AppSwiper from "../../components/app-swiper";
import ImageWithBasePath from "../../components/image-with-base-path";
import Link from "next/link";
import { all_routes } from "../../routes/all_routes";

const BlogSection = () => {
  return (
    <>
      {/* blog */}
      <section className="section blog-sec-nine">
        <div className="container">
          <div className="section-head-nine text-center wow fadeInUp">
            <h2>
              Read Our Latest <span>Stories &amp; Tips</span> Here
            </h2>
            <span>
              Resources that cater to travel enthusiasts, with a focus on
              adventure, gear reviews, and travel tips.
            </span>
          </div>
        </div>
        <AppSwiper preset="blog-nine-slider">
            <Fragment>
              <div className="blog-nine-item slick-slide">
                <div className="d-md-flex">
                  <div className="blog-nine-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="./assets/img/blog/blog-36.jpg"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <button className="badge badge-light border-0">
                      Adventure Awaits
                    </button>
                    <div className="home-nine-title mb-2">
                      <Link href="#">
                        Unveiling Hidden Gems: Your Next Adventure?
                      </Link>
                    </div>
                    <p className="mb-4">
                      Discover uncharted territories and create unforgettable
                      memories...
                    </p>
                    <span className="text-gray-9 d-flex align-items-center">
                      <i className="isax isax-calendar me-1" />
                      15 Aug 2026
                    </span>
                  </div>
                </div>
              </div>
            </Fragment>

            <Fragment>
              <div className="blog-nine-item slick-slide">
                <div className="d-md-flex">
                  <div className="blog-nine-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="./assets/img/blog/blog-37.jpg"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <button className="badge badge-light border-0">
                      Travel Tips
                    </button>
                    <div className="home-nine-title mb-2">
                      <Link href="#">Travel Light: Pack Smart, See More</Link>
                    </div>
                    <p className="mb-4">
                      Our guide helps you pack efficiently, so you can focus on
                      your adventure...
                    </p>
                    <span className="text-gray-9 d-flex align-items-center">
                      <i className="isax isax-calendar me-1" />
                      10 Sep 2026
                    </span>
                  </div>
                </div>
              </div>
            </Fragment>

            <Fragment>
              <div className="blog-nine-item slick-slide">
                <div className="d-md-flex">
                  <div className="blog-nine-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="./assets/img/blog/blog-38.jpg"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <button className="badge badge-light border-0">
                      Destinations
                    </button>
                    <div className="home-nine-title mb-2">
                      <Link href="#">Top 5 Hidden Beaches in the Caribbean</Link>
                    </div>
                    <p className="mb-4">
                      Escape the crowds and discover pristine shores with our
                      curated list...
                    </p>
                    <span className="text-gray-9 d-flex align-items-center">
                      <i className="isax isax-calendar me-1" />
                      01 Dec 2026
                    </span>
                  </div>
                </div>
              </div>
            </Fragment>
          </AppSwiper>
        <div className="text-center mt-4 wow fadeInUp px-3">
          <Link href={all_routes.blogGrid} className="btn btn-primary">
            View All Articles <i className="isax isax-arrow-right-3 ms-2" />
          </Link>
        </div>
      </section>
      {/* blog */}
    </>
  );
};

export default BlogSection;
