"use client";
import { Fragment } from "react";
import AppSwiper from "../../components/app-swiper";
import ImageWithBasePath from "../../components/image-with-base-path"
import Link from "next/link";


const CategorySection = () => {
  return (
    <>
  {/* Explore section */}
  <section className="section explore-section">
    <div className="container">
      <div className="section-header-eleven wow fadeInUp">
        <span className="section-title">
          <ImageWithBasePath
            src="./assets/img/icons/compass.svg"
            alt="compass"
            className="me-1"
          />
          Explore
        </span>
        <h2>Explore by Category</h2>
      </div>
      <div className="position-relative wow fadeInUp">
        <AppSwiper preset="explore-slider">
        <Fragment>
          <div className="slick-slide"><div className="explore-item me-0">
            <div className="explore-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-40.jpg" alt="img" />
              </Link>
            </div>
            <h3 className="home-eleven-title">
              <Link href="#">Adventure</Link>
            </h3>
          </div></div>
        </Fragment>
        <Fragment>
          <div className="slick-slide"><div className="explore-item me-0">
            <div className="explore-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-41.jpg" alt="img" />
              </Link>
            </div>
            <h3 className="home-eleven-title">
              <Link href="#">Family</Link>
            </h3>
          </div></div>
        </Fragment>
        <Fragment>
          <div className="slick-slide"><div className="explore-item me-0">
            <div className="explore-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-39.jpg" alt="img" />
              </Link>
            </div>
            <h3 className="home-eleven-title">
              <Link href="#">Water Sports</Link>
            </h3>
          </div></div>
        </Fragment>
        <Fragment>
          <div className="slick-slide"><div className="explore-item me-0">
            <div className="explore-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-42.jpg" alt="img" />
              </Link>
            </div>
            <h3 className="home-eleven-title">
              <Link href="#">City Tours</Link>
            </h3>
          </div></div>
        </Fragment>
        <Fragment>
          <div className="slick-slide"> <div className="explore-item me-0">
            <div className="explore-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-39.jpg" alt="img" />
              </Link>
            </div>
            <h3 className="home-eleven-title">
              <Link href="#">Water Sports</Link>
            </h3>
          </div></div>
        </Fragment>
      </AppSwiper>
        <button type="button" className="slick-arrow restaurant-prev">
          <i className="isax isax-arrow-left" />
        </button>
        <button type="button" className="slick-arrow restaurant-next">
          <i className="isax isax-arrow-right-1" />
        </button>
      </div>
    </div>
  </section>
  {/* Explore section */}
</>

  )
}

export default CategorySection