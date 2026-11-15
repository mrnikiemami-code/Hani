"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";
import { useState } from "react";

const TrendingList = () => {
  const [fav, setFav] = useState<boolean[]>([]);
  const handlefav = (i: number) => {
    setFav((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };
  return (
    <>
      {/* trending list */}
      <section className="section trending-list-nine">
        <div className="container">
          <div className="section-head-nine text-center wow fadeInUp">
            <h2>
              Trending <span>Listings</span>
            </h2>
            <span>Explore the world's most beautiful places</span>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-4 px-2 gap-2 wow fadeInUp">
            <ul className="nav">
              <li>
                <Link
                  href="#"
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-1"
                >
                  Flights
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-2"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-3"
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-4"
                >
                  Cruise
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-5"
                >
                  Tour
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-6"
                >
                  Activity
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-7"
                >
                  Visa
                </Link>
              </li>
            </ul>
          </div>
          <div className="tab-content wow fadeInUp">
            <div className="tab-pane fade active show" id="tab-1">
              <div className="row justify-content-center row-gap-4">
                <div className="col-xxl-3 col-lg-4 col-md-6">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        <ImageWithBasePath
                          src="assets/img/flight/flight-01.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-white text-dark">
                          214 Seats Left
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[2] ? "selected" : ""}`}
                          onClick={() => handlefav(2)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <h3 className="text-truncate mb-2 home-eight-title">
                        <Link href={all_routes.flightDetails}>
                          AstraFlight 215
                        </Link>
                      </h3>
                      <div className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-sm me-2">
                          <ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0">Air Asia</p>
                        <p className="fs-14 d-inline-flex align-items-center mb-0">
                          <i className="fa-solid fa-circle fs-6 text-primary mx-2" />
                          1-stop at Frankfurt
                        </p>
                      </div>
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Toronto
                        </span>
                        <span className="arrow-icon">
                          <i className="isax isax-arrow-2" />
                        </span>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Bangkok
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                            5.0
                          </span>
                          <span className="fs-14 text-gray-5">21 Reviews</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="fs-14 text-gray-5 me-2">From</span>
                          <span className="fs-18 fw-semibold text-primary">
                            $300
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-4 col-md-6">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        <ImageWithBasePath
                          src="assets/img/flight/flight-02.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-white text-dark">
                          45 Seats Left
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[3] ? "selected" : ""}`}
                          onClick={() => handlefav(3)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <h3 className="text-truncate mb-2 home-eight-title">
                        <Link href={all_routes.flightDetails}>
                          Cloudrider 789
                        </Link>
                      </h3>
                      <div className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-sm me-2">
                          <ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0">Indigo</p>
                        <p className="fs-14 d-inline-flex align-items-center mb-0">
                          <i className="fa-solid fa-circle fs-6 text-primary mx-2" />
                          1-stop at Frankfurt
                        </p>
                      </div>
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Chicago
                        </span>
                        <span className="arrow-icon">
                          <i className="isax isax-arrow-2" />
                        </span>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Melbourne
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                            5.0
                          </span>
                          <span className="fs-14 text-gray-5">21 Reviews</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="fs-14 text-gray-5 me-2">From</span>
                          <span className="fs-18 fw-semibold text-primary">
                            $300
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-4 col-md-6">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        <ImageWithBasePath
                          src="assets/img/flight/flight-03.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-white text-dark">
                          32 Seats Left
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[4] ? "selected" : ""}`}
                          onClick={() => handlefav(4)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <h3 className="text-truncate mb-2 home-eight-title">
                        <Link href={all_routes.flightDetails}>
                          Aether Express 901
                        </Link>
                      </h3>
                      <div className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-sm me-2">
                          <ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0">Air India</p>
                        <p className="fs-14 d-inline-flex align-items-center mb-0">
                          <i className="fa-solid fa-circle fs-6 text-primary mx-2" />
                          1-stop at Seoul
                        </p>
                      </div>
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Miami
                        </span>
                        <span className="arrow-icon">
                          <i className="isax isax-arrow-2" />
                        </span>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Tokyo
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                            5.0
                          </span>
                          <span className="fs-14 text-gray-5">22 Reviews</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="fs-14 text-gray-5 me-2">From</span>
                          <span className="fs-18 fw-semibold text-primary">
                            $450
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-4 col-md-6">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        <ImageWithBasePath
                          src="assets/img/flight/flight-04.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-white text-dark">
                          66 Seats Left
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[5] ? "selected" : ""}`}
                          onClick={() => handlefav(5)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <h3 className="text-truncate mb-2 home-eight-title">
                        <Link href={all_routes.flightDetails}>
                          Silverwing 505
                        </Link>
                      </h3>
                      <div className="d-flex align-items-center mb-3">
                        <span className="avatar avatar-sm me-2">
                          <ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0">Emirates</p>
                        <p className="fs-14 d-inline-flex align-items-center mb-0">
                          <i className="fa-solid fa-circle fs-6 text-primary mx-2" />
                          1-stop at London
                        </p>
                      </div>
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Boston
                        </span>
                        <span className="arrow-icon">
                          <i className="isax isax-arrow-2" />
                        </span>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Singapore
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                            4.9
                          </span>
                          <span className="fs-14 text-gray-5">99 Reviews</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="fs-14 text-gray-5 me-2">From</span>
                          <span className="fs-18 fw-semibold text-primary">
                            $700
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="tab-2">
              <div className="row  row-gap-4 justify-content-center">
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-01.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[6] ? "" : "selected"}`}
                          onClick={() => handlefav(6)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          5.0
                        </span>
                        <p className="fs-14">(400 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>
                          Hotel Miravent Barcelona
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Beth Will</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.hotelDetails}>
                        <ImageWithBasePath
                          src="assets/img/hotels/hotel-05.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[7] ? "selected" : ""}`}
                          onClick={() => handlefav(7)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.7
                        </span>
                        <p className="fs-14">(360 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>The Luxe Haven</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $600{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Andrews</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.hotelDetails}>
                        <ImageWithBasePath
                          src="assets/img/hotels/hotel-06.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[8] ? "selected" : ""}`}
                          onClick={() => handlefav(8)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.5
                        </span>
                        <p className="fs-14">(500 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>
                          The Urban Retreat
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Robert</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <button
                          className={`fav-icon border-0 ${fav[9] ? "" : "selected"}`}
                          onClick={() => handlefav(9)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.3
                        </span>
                        <p className="fs-14">(380 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>
                          Hotel Evergreen{" "}
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        King’s Road, Chelsea
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $550{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Timothy</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
              </div>
            </div>
            <div className="tab-pane fade" id="tab-3">
              <div className="row  row-gap-4 justify-content-center">
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[10] ? "" : "selected"}`}
                          onClick={() => handlefav(10)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>
                          Toyota Camry SE 400
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Hybrid</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Manual</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">14,000 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $500{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              5.0
                            </span>
                            <p className="fs-14">(400 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[11] ? "selected" : ""}`}
                          onClick={() => handlefav(11)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>
                          Ford Mustang 4.0 AT
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Diesel</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Manual</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">10,300 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $600{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.7
                            </span>
                            <p className="fs-14">(300 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[12] ? "selected" : ""}`}
                          onClick={() => handlefav(12)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>
                          Ferrari 458 MM Special
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Hybrid</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Auto</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">13,000 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $300{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.0
                            </span>
                            <p className="fs-14">(320 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[13] ? "selected" : ""}`}
                          onClick={() => handlefav(13)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>
                          Mercedes-benz Convertible
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Hybrid</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Auto</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">10,000 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $400{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.0
                            </span>
                            <p className="fs-14">(380 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
              </div>
            </div>
            <div className="tab-pane fade" id="tab-4">
              <div className="row justify-content-center">
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.cruiseDetails}>
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-05.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[14] ? "" : "selected"}`}
                          onClick={() => handlefav(14)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate">Beth Williams</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.9
                          </span>
                          <p className="fs-14 text-truncate">(400)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>
                          Super Aquamarine
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :
                            <span className="text-dark fw-medium">2021</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests :{" "}
                            <span className="text-dark fw-medium">4</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">88.47 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">
                              19 Knots
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.cruiseDetails}>
                        <ImageWithBasePath
                          src="assets/img/cruise/cruise-12.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[15] ? "selected" : ""}`}
                          onClick={() => handlefav(15)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate">Tom Andrews</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.7
                          </span>
                          <p className="fs-14 text-truncate">(300)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Bonnie Yacht</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :
                            <span className="text-dark fw-medium">2020</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests :{" "}
                            <span className="text-dark fw-medium">3</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">70.63 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">
                              17 Knots
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $600{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.cruiseDetails}>
                        <ImageWithBasePath
                          src="assets/img/cruise/cruise-09.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[16] ? "selected" : ""}`}
                          onClick={() => handlefav(16)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">Robert Cogs</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.5
                          </span>
                          <p className="fs-14 text-truncate">(320)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Coral Cruiser</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :
                            <span className="text-dark fw-medium">2021</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests :{" "}
                            <span className="text-dark fw-medium">4</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">88.47 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">
                              19 Knots
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.cruiseDetails}>
                        <ImageWithBasePath
                          src="assets/img/cruise/cruise-09.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[17] ? "selected" : ""}`}
                          onClick={() => handlefav(17)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-11.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">Kenneth Pal</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.3
                          </span>
                          <p className="fs-14 text-truncate">(380)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Harbor Haven</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :
                            <span className="text-dark fw-medium">2016</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests :{" "}
                            <span className="text-dark fw-medium">6</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">98.15 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">
                              14 Knots
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $300{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
              </div>
            </div>
            <div className="tab-pane fade" id="tab-5">
              <div className="row row-gap-4 justify-content-center">
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[18] ? "" : "selected"}`}
                          onClick={() => handlefav(18)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9">Ecotourism</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            5.0
                          </span>
                          <p className="fs-14">(105 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>
                          Rainbow Mountain Valley
                        </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $500
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $789
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">4 Day,3 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            14 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            <ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[19] ? "selected" : ""}`}
                          onClick={() => handlefav(19)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Adventure Tour
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.7
                          </span>
                          <p className="fs-14">(110 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Mystic Falls</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $600
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $700
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3 Day, 2 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            12 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            <ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[20] ? "selected" : ""}`}
                          onClick={() => handlefav(20)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Summer Trip
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.7
                          </span>
                          <p className="fs-14">(180 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Crystal Lake</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $300
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $500
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">5 Day, 4 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            16 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            <ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[21] ? "selected" : ""}`}
                          onClick={() => handlefav(21)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Adventure Tour
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.9
                          </span>
                          <p className="fs-14">(300 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Majestic Peaks</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Deansgate, Manchester
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $400
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $480
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3 Day, 2 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            10 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            <ImageWithBasePath
                              src="assets/img/users/user-11.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
              </div>
            </div>
            <div className="tab-pane fade" id="tab-6">
              <div className="row row-gap-4 justify-content-center">
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.activityDetails}>
                        <ImageWithBasePath
                          src="assets/img/activities/activity-01.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className="fav-icon selected border-0">
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">
                            4.9
                          </span>{" "}
                          (672 reviews)
                        </p>
                      </div>
                      <h5 className="mt-1 mb-1 text-truncate">
                        <Link href={all_routes.activityDetails}>
                          Snorkeling Tour
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Phuket,
                          Thailand
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 4 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $400{" "}
                          <span className="text-gray-3 text-line">$480</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.activityDetails}>
                        <ImageWithBasePath
                          src="assets/img/activities/activity-02.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[22] ? "selected" : ""}`}
                          onClick={() => handlefav(22)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">
                            4.6
                          </span>{" "}
                          (450 reviews)
                        </p>
                      </div>
                      <h5 className="mt-1 mb-1 text-truncate">
                        <Link href={all_routes.activityDetails}>
                          Alpine Snowboarding
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Zermatt,
                          Switzerland
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 3 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $150{" "}
                          <span className="text-gray-3 text-line">$200</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0me-1">
                            <ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.activityDetails}>
                        <ImageWithBasePath
                          src="assets/img/activities/activity-03.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[23] ? "selected" : ""}`}
                          onClick={() => handlefav(23)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">
                            4.5
                          </span>{" "}
                          (320 reviews)
                        </p>
                      </div>
                      <h5 className="mt-1 mb-1 text-truncate">
                        <Link href={all_routes.activityDetails}>
                          White Water Rafting
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Rotorua,
                          New Zealand
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 5 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $350{" "}
                          <span className="text-gray-3 text-line">$400</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <Link href={all_routes.activityDetails}>
                        <ImageWithBasePath
                          src="assets/img/activities/activity-04.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button
                          className={`fav-icon border-0 ${fav[24] ? "selected" : ""}`}
                          onClick={() => handlefav(24)}
                        >
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">
                            4.2
                          </span>{" "}
                          (280 reviews)
                        </p>
                      </div>
                      <h5 className="mt-1 mb-1 text-truncate">
                        <Link href={all_routes.activityDetails}>
                          Cliffside Paragliding
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Annecy,
                          France
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 2 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $300{" "}
                          <span className="text-gray-3 text-line">$350</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/users/user-11.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
              </div>
            </div>
            <div className="tab-pane fade" id="tab-7">
              <div className="row row-gap-4 justify-content-center">
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-01.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className="fav-icon p-2 border-0 selected">
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Business Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">5-7 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.visaDetails}>
                          Electronic Visa for Tourism and Recreation
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 90 Days
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $500
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">
                              / Person
                            </span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            USA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-02.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className="fav-icon p-2 border-0">
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Student Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">2-4 Weeks</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.visaDetails}>
                          Long term for Academic with Health Insurance
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Consular Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $300
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">
                              / Person
                            </span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Egypt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-03.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className="fav-icon p-2 border-0">
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Work Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">
                            15-20 Working Days
                          </p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.visaDetails}>
                          Work Visa for Employment Opportunities
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Paper
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 2 Years
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $800
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">
                              / Person
                            </span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Spain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="trending-list-item">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.visaDetails}>
                          <ImageWithBasePath
                            src="assets/img/visa/visa-04.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className="fav-icon p-2 border-0">
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Transit Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3-5 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.visaDetails}>
                          Short term Visa for Travelers with Layovers
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 72 Hours
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $100
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">
                              / Person
                            </span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Qatar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* trending list */}
    </>
  );
};

export default TrendingList;
