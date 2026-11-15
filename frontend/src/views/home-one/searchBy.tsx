"use client";

import ImageWithBasePath from '../../components/image-with-base-path';
import Link from "next/link";
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';

const SearchBy = () => {

  const routes = all_routes

  
  return (
    <>
  {/* Destination Section */}
  <section className="section destination-section blog-section ">
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-xl-6 col-lg-10 text-center aos"
          data-aos="fade-up"
        >
          <div className="section-header text-center">
            <h2 className="mb-2">
              Search by{" "}
              <span className="text-primary  text-decoration-underline">
                Destinations
              </span>{" "}
              Around the World{" "}
            </h2>
            <p className="sub-title">
              DreamsTour Marketplace is a platform designed to connect fans with
              exclusive experiences related to a specific tour
            </p>
          </div>
        </div>
      </div>
      <AppSwiper preset="destination-slider">
        {/* Destination Item*/}
        <div
          className="destination-item mb-4 aos"
          data-aos="fade-up"
        >
          <ImageWithBasePath src="assets/img/destination/destination-01.jpg" alt="img" />
          <div className="destination-info text-center">
            <div className="destination-content">
              <h5 className="mb-1 text-white">Turkey</h5>
              <div className="d-flex align-items-center justify-content-center">
                <div className="rating d-flex align-items-center me-2">
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled" />
                </div>
                <p className="fs-14 text-white">452 Reviews</p>
              </div>
            </div>
            <div className="destination-overlay bg-white mt-2">
              <div className="d-flex">
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-indigo">
                      <i className="isax isax-airplane" />
                    </span>
                    <h6 className="fs-13 fw-medium">21 Flights</h6>
                  </div>
                </div>
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-cyan">
                      <i className="isax isax-buildings" />
                    </span>
                    <h6 className="fs-13 fw-medium">15 Hotels</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-success">
                      <i className="isax isax-ship" />
                    </span>
                    <h6 className="fs-13 fw-medium">06 Cruises</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href={routes.destination} className="overlay-circle-link">
            <i className="isax isax-arrow-right-1" />
          </Link>
        </div>
        {/* /Destination Item*/}
        {/* Destination Item*/}
        <div
          className="destination-item mb-4 aos"
          data-aos="fade-up"
        >
          <ImageWithBasePath src="assets/img/destination/destination-02.jpg" alt="img" />
          <div className="destination-info text-center">
            <div className="destination-content">
              <h5 className="mb-1 text-white">Thailand</h5>
              <div className="d-flex align-items-center justify-content-center">
                <div className="rating d-flex align-items-center me-2">
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled" />
                </div>
                <p className="fs-14 text-white">400 Reviews</p>
              </div>
            </div>
            <div className="destination-overlay bg-white mt-2">
              <div className="d-flex">
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-indigo">
                      <i className="isax isax-airplane" />
                    </span>
                    <h6 className="fs-13 fw-medium">21 Flights</h6>
                  </div>
                </div>
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-cyan">
                      <i className="isax isax-buildings" />
                    </span>
                    <h6 className="fs-13 fw-medium">15 Hotels</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-success">
                      <i className="isax isax-ship" />
                    </span>
                    <h6 className="fs-13 fw-medium">06 Cruises</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href={routes.destination} className="overlay-circle-link">
            <i className="isax isax-arrow-right-1" />
          </Link>
        </div>
        {/* /Destination Item*/}
        {/* Destination Item*/}
        <div
          className="destination-item mb-4 aos"
         data-aos="fade-up"
        >
          <ImageWithBasePath src="assets/img/destination/destination-03.jpg" alt="img" />
          <div className="destination-info text-center">
            <div className="destination-content">
              <h5 className="mb-1 text-white">Australia</h5>
              <div className="d-flex align-items-center justify-content-center">
                <div className="rating d-flex align-items-center me-2">
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled" />
                </div>
                <p className="fs-14 text-white">400 Reviews</p>
              </div>
            </div>
            <div className="destination-overlay bg-white mt-2">
              <div className="d-flex">
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-indigo">
                      <i className="isax isax-airplane" />
                    </span>
                    <h6 className="fs-13 fw-medium">21 Flights</h6>
                  </div>
                </div>
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-cyan">
                      <i className="isax isax-buildings" />
                    </span>
                    <h6 className="fs-13 fw-medium">15 Hotels</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-success">
                      <i className="isax isax-ship" />
                    </span>
                    <h6 className="fs-13 fw-medium">06 Cruises</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href={routes.destination} className="overlay-circle-link">
            <i className="isax isax-arrow-right-1" />
          </Link>
        </div>
        {/* /Destination Item*/}
        {/* Destination Item*/}
        <div
          className="destination-item mb-4 aos"
          data-aos="fade-up"
        >
          <ImageWithBasePath src="assets/img/destination/destination-04.jpg" alt="img" />
          <div className="destination-info text-center">
            <div className="destination-content">
              <h5 className="mb-1 text-white">Brazil</h5>
              <div className="d-flex align-items-center justify-content-center">
                <div className="rating d-flex align-items-center me-2">
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled" />
                </div>
                <p className="fs-14 text-white">422 Reviews</p>
              </div>
            </div>
            <div className="destination-overlay bg-white mt-2">
              <div className="d-flex">
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-indigo">
                      <i className="isax isax-airplane" />
                    </span>
                    <h6 className="fs-13 fw-medium">21 Flights</h6>
                  </div>
                </div>
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-cyan">
                      <i className="isax isax-buildings" />
                    </span>
                    <h6 className="fs-13 fw-medium">15 Hotels</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-success">
                      <i className="isax isax-ship" />
                    </span>
                    <h6 className="fs-13 fw-medium">06 Cruises</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href={routes.destination} className="overlay-circle-link">
            <i className="isax isax-arrow-right-1" />
          </Link>
        </div>
        {/* /Destination Item*/}
        {/* Destination Item*/}
        <div
          className="destination-item mb-4 aos"
          data-aos="fade-up"
        >
          <ImageWithBasePath src="assets/img/destination/destination-05.jpg" alt="img" />
          <div className="destination-info text-center">
            <div className="destination-content">
              <h5 className="mb-1 text-white">Canada</h5>
              <div className="d-flex align-items-center justify-content-center">
                <div className="rating d-flex align-items-center me-2">
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled me-1" />
                  <i className="fa-solid fa-star filled" />
                </div>
                <p className="fs-14 text-white">370 Reviews</p>
              </div>
            </div>
            <div className="destination-overlay bg-white mt-2">
              <div className="d-flex">
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-indigo">
                      <i className="isax isax-airplane" />
                    </span>
                    <h6 className="fs-13 fw-medium">21 Flights</h6>
                  </div>
                </div>
                <div className="col border-end">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-cyan">
                      <i className="isax isax-buildings" />
                    </span>
                    <h6 className="fs-13 fw-medium">15 Hotels</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="count-info text-center">
                    <span className="d-block mb-1 text-success">
                      <i className="isax isax-ship" />
                    </span>
                    <h6 className="fs-13 fw-medium">06 Cruises</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href={routes.destination} className="overlay-circle-link">
            <i className="isax isax-arrow-right-1" />
          </Link>
        </div>
        {/* /Destination Item*/}
      </AppSwiper>
      <div className="text-center view-all aos" data-aos="fade-up">
        <Link
          href={routes.destination}
          className="btn btn-dark d-inline-flex align-items-center"
        >
          View All Locations
          <i className="isax isax-arrow-right-3 ms-2" />
        </Link>
      </div>
    </div>
  </section>
  {/* /Destination Section */}
</>
    
  )
}

export default SearchBy