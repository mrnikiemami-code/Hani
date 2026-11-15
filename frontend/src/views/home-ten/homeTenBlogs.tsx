"use client";
import { Fragment } from "react";
import AppSwiper from "../../components/app-swiper";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";

const HomeTenBlogs = () => {
  const routes = all_routes;



  return (
    <>
      {/* Start Blog Section */}
      <section className="section blog-section-ten">
        <div className="container">
          <div className="section-header-ten wow fadeInUp" data-wow-delay="1.5">
            <h2 className="section-title">
              Stay Updated <span> on the Stories </span>
            </h2>
            <Link
              href={routes.blogGrid}
              className="btn btn-primary d-flex align-items-center"
            >
              View All <i className="isax isax-arrow-right-3" />
            </Link>
          </div>
          {/* start slider  */}
          <AppSwiper preset="blog-ten-slider">
        <Fragment>
            <div className="slide-item">
              {/* Item 1  */}
              <div className="blog-item-ten">
                <div className="blog-overlay">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-1.jpg"
                    alt="blog-img"
                    className="img-1"
                  />
                </div>
                <div className="blog-content">
                  <button className="badge border-0">Guided Tours</button>
                  <h3 className="custom-title">
                    <Link href="#">
                      How a Travel Guide Can Enhance Your Adventure
                    </Link>
                  </h3>
                </div>
                <div className="blog-date">
                  <h4 className="date">30</h4>
                  <p className="month">Mar</p>
                </div>
              </div>
            </div>
        </Fragment>
        <Fragment>
             <div className="slide-item">
              {/* Item 2  */}
              <div
                className="blog-item-ten wow fadeInUp"
                data-wow-delay="1.5"
                data-wow-duration="1.5s"
              >
                <div className="blog-overlay">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-2.jpg"
                    alt="blog-img"
                    className="img-1"
                  />
                </div>
                <div className="blog-content">
                  <button className="badge border-0">Travel Tips</button>
                  <h3 className="custom-title">
                    <Link href="#">
                      How to Choose the Right Travel Guide for Your Trip
                    </Link>
                  </h3>
                </div>
                <div className="blog-date">
                  <h4 className="date">22</h4>
                  <p className="month">Feb</p>
                </div>
              </div>
            </div>
        </Fragment>
        <Fragment>
            <div className="slide-item">
              {/* Item 3  */}
              <div
                className="blog-item-ten wow fadeInUp"
                data-wow-delay={2}
                data-wow-duration="2s"
              >
                <div className="blog-overlay">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-3.jpg"
                    alt="blog-img"
                    className="img-1"
                  />
                </div>
                <div className="blog-content">
                  <button className="badge border-0">Activity Tours</button>
                  <h3 className="custom-title">
                    <Link href="#">
                      Adventure Sports Experiences with Professional Guides
                    </Link>
                  </h3>
                </div>
                <div className="blog-date">
                  <h4 className="date">15</h4>
                  <p className="month">Jan</p>
                </div>
              </div>
            </div>
        </Fragment>
        <Fragment>
           <div className="slide-item">
              {/* Item 1  */}
              <div className="blog-item-ten">
                <div className="blog-overlay">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-1.jpg"
                    alt="blog-img"
                    className="img-1"
                  />
                </div>
                <div className="blog-content">
                  <button className="badge border-0">Guided Tours</button>
                  <h3 className="custom-title">
                    <Link href="#">
                      How a Travel Guide Can Enhance Your Adventure
                    </Link>
                  </h3>
                </div>
                <div className="blog-date">
                  <h4 className="date">30</h4>
                  <p className="month">Mar</p>
                </div>
              </div>
            </div>
        </Fragment>
        <Fragment>
<div className="slide-item">
              {/* Item 3  */}
              <div
                className="blog-item-ten wow fadeInUp"
                data-wow-delay={2}
                data-wow-duration="2s"
              >
                <div className="blog-overlay">
                  <ImageWithBasePath
                    src="assets/img/blog/blog-img-3.jpg"
                    alt="blog-img"
                    className="img-1"
                  />
                </div>
                <div className="blog-content">
                  <button className="badge border-0">Activity Tours</button>
                  <h3 className="custom-title">
                    <Link href="#">
                      Adventure Sports Experiences with Professional Guides
                    </Link>
                  </h3>
                </div>
                <div className="blog-date">
                  <h4 className="date">15</h4>
                  <p className="month">Jan</p>
                </div>
              </div>
            </div>
        </Fragment>
      </AppSwiper>
      
         
          <div className="arrow-item wow fadeInUp" data-wow-delay="1.5">
            <button type="button" className="slick-arrow blog-ten-prev">
              <i className="isax isax-arrow-left-2" />
            </button>
            <button type="button" className="slick-arrow blog-ten-next">
              <i className="isax isax-arrow-right-3" />
            </button>
          </div>
        </div>
      </section>
      {/* End Blog Section */}
    </>
  );
};

export default HomeTenBlogs;
