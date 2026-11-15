"use client";
import { Fragment } from "react";
import AppSwiper from "../../components/app-swiper";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";

const Destinations = () => {
  return (
    <>
      {/* destinations sec */}
      <section className="section destinations-sec-nine">
        <div className="section-head-nine px-2 text-center wow fadeInUp">
          <h2>
            Top <span>Destinations</span>
          </h2>
          <span>Explore the world's most beautiful places</span>
        </div>
        <AppSwiper preset="destinations-slider">
          <Fragment>
            {" "}
            <div className="destinations-item">
              <div className="destinations-img">
                <Link href="#">
                  <ImageWithBasePath
                    src="assets/img/destination/destination-58.jpg"
                    alt="img"
                  />
                </Link>
                <div className="location-text">Tokyo</div>
                <div className="destinations-amount">
                  <div>
                    <p className="text-light mb-1">Starts From</p>
                    <span className="text-white fs-20 fw-semibold">$899</span>
                  </div>
                  <Link href="#" className="location-view-button">
                    <i className="isax isax-arrow-right-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="destinations-item">
              <div className="destinations-img">
                <Link href="#">
                  <ImageWithBasePath
                    src="assets/img/destination/destination-59.jpg"
                    alt="img"
                  />
                </Link>
                <div className="location-text">New York</div>
                <div className="destinations-amount">
                  <div>
                    <p className="text-light mb-1">Starts From</p>
                    <span className="text-white fs-20 fw-semibold">$1199</span>
                  </div>
                  <Link href="#" className="location-view-button">
                    <i className="isax isax-arrow-right-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="destinations-item">
              <div className="destinations-img">
                <Link href="#">
                  <ImageWithBasePath
                    src="assets/img/destination/destination-60.jpg"
                    alt="img"
                  />
                </Link>
                <div className="location-text">London</div>
                <div className="destinations-amount">
                  <div>
                    <p className="text-light mb-1">Starts From</p>
                    <span className="text-white fs-20 fw-semibold">$749</span>
                  </div>
                  <Link href="#" className="location-view-button">
                    <i className="isax isax-arrow-right-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="destinations-item">
              <div className="destinations-img">
                <Link href="#">
                  <ImageWithBasePath
                    src="assets/img/destination/destination-61.jpg"
                    alt="img"
                  />
                </Link>
                <div className="location-text">Sydney</div>
                <div className="destinations-amount">
                  <div>
                    <p className="text-light mb-1">Starts From</p>
                    <span className="text-white fs-20 fw-semibold">$1099</span>
                  </div>
                  <Link href="#" className="location-view-button">
                    <i className="isax isax-arrow-right-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
          <Fragment>
            {" "}
            <div className="destinations-item">
              <div className="destinations-img">
                <Link href="#">
                  <ImageWithBasePath
                    src="assets/img/destination/destination-62.jpg"
                    alt="img"
                  />
                </Link>
                <div className="location-text">Berlin</div>
                <div className="destinations-amount">
                  <div>
                    <p className="text-light mb-1">Starts From</p>
                    <span className="text-white fs-20 fw-semibold">$649</span>
                  </div>
                  <Link href="#" className="location-view-button">
                    <i className="isax isax-arrow-right-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="destinations-item">
              <div className="destinations-img">
                <Link href="#">
                  <ImageWithBasePath
                    src="assets/img/destination/destination-63.jpg"
                    alt="img"
                  />
                </Link>
                <div className="location-text">Paris</div>
                <div className="destinations-amount">
                  <div>
                    <p className="text-light mb-1">Starts From</p>
                    <span className="text-white fs-20 fw-semibold">$1499</span>
                  </div>
                  <Link href="#" className="location-view-button">
                    <i className="isax isax-arrow-right-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
        </AppSwiper>
      </section>
      {/* destinations sec */}
    </>
  );
};

export default Destinations;
