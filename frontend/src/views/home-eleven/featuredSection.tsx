"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"


const FeaturedSection = () => {
  return (
    <>
  {/* featured section */}
  <section className="section featured-sec-eleven">
    <div className="container">
      <div className="section-header-eleven wow fadeInUp">
        <span className="section-title">
          <ImageWithBasePath
            src="./assets/img/icons/compass.svg"
            alt="compass"
            className="me-1"
          />
          Featured Activities
        </span>
        <h2>Handpicked experiences you'll love</h2>
      </div>
      <div>
        <ul className="nav wow fadeInUp">
          <li>
            <Link
              href="#"
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#tab-1"
            >
              <ImageWithBasePath src="./assets/img/bg/dubai.png" alt="img" className="me-2" />{" "}
              Dubai
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#tab-2"
            >
              <ImageWithBasePath
                src="./assets/img/bg/switzerland.png"
                alt="img"
                className="me-2"
              />
              Switzerland
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#tab-3"
            >
              <ImageWithBasePath src="./assets/img/bg/japan.png" alt="img" className="me-2" />
              Japan
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#tab-4"
            >
              <ImageWithBasePath
                src="./assets/img/bg/france.png"
                alt="img"
                className="me-2"
              />
              France
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#tab-5"
            >
              <ImageWithBasePath
                src="./assets/img/bg/thailand.png"
                alt="img"
                className="me-2"
              />
              Thailand
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#tab-6"
            >
              <ImageWithBasePath
                src="./assets/img/bg/canada.png"
                alt="img"
                className="me-2"
              />
              Canada
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#tab-7"
            >
              <ImageWithBasePath
                src="./assets/img/bg/indonesia.png"
                alt="img"
                className="me-2"
              />
              Indonesia
            </Link>
          </li>
        </ul>
        <div className="tab-content wow fadeInUp">
          <div className="tab-pane fade active show" id="tab-1">
            <div className="row row-gap-4 justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-56.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Camel Trekking</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-53.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Adventure &amp; Desert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-54.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Water &amp; Marineesert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-55.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Entertainment</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-57.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Dubai City Tour</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-58.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Quad Bike Desert Safari</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-59.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Skydive Dubai</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-60.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Speed Boat Sightseeing</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-2">
            <div className="row row-gap-4 justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-56.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Camel Trekking</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-57.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Dubai City Tour</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-58.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Quad Bike Desert Safari</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-59.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Skydive Dubai</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-53.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Adventure &amp; Desert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-54.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Water &amp; Marineesert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-55.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Entertainment</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-60.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Speed Boat Sightseeing</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-3">
            <div className="row row-gap-4 justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-53.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Adventure &amp; Desert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-54.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Water &amp; Marineesert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-55.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Entertainment</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-56.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Camel Trekking</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-57.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Dubai City Tour</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-58.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Quad Bike Desert Safari</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-59.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Skydive Dubai</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-60.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Speed Boat Sightseeing</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-4">
            <div className="row row-gap-4 justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-56.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Camel Trekking</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-57.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Dubai City Tour</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-58.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Quad Bike Desert Safari</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-59.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Skydive Dubai</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-60.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Speed Boat Sightseeing</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-53.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Adventure &amp; Desert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-54.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Water &amp; Marineesert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-55.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Entertainment</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-5">
            <div className="row row-gap-4 justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-57.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Dubai City Tour</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-58.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Quad Bike Desert Safari</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-53.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Adventure &amp; Desert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-54.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Water &amp; Marineesert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-55.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Entertainment</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-56.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Camel Trekking</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-59.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Skydive Dubai</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-60.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Speed Boat Sightseeing</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-6">
            <div className="row row-gap-4 justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-54.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Water &amp; Marineesert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-55.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Entertainment</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-53.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Adventure &amp; Desert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-56.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Camel Trekking</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-57.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Dubai City Tour</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-58.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Quad Bike Desert Safari</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-59.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Skydive Dubai</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-60.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Speed Boat Sightseeing</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-7">
            <div className="row row-gap-4 justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-60.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Speed Boat Sightseeing</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-53.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Adventure &amp; Desert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-54.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Water &amp; Marineesert</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-55.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Entertainment</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-56.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Camel Trekking</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />3
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $130
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $380
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-57.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Dubai City Tour</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />4
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $400
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-58.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Quad Bike Desert Safari</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />8
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $500
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="featured-item">
                  <div className="featured-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tours/tours-59.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="rating text-dark fs-14 fw-medium">
                      <ImageWithBasePath
                        src="./assets/img/icons/star.svg"
                        alt="star"
                        className="me-1"
                      />
                      4.96 <span className="text-gray-6"> (672 reviews)</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <h3 className="text-truncate mb-1 home-eight-title">
                      <Link href="#">Skydive Dubai</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-location5 me-2 text-gray-2" />
                        Dubai, UAE
                      </span>
                      <span className="text-gray-6 d-flex align-items-center">
                        <i className="isax isax-timer-15 me-2 text-gray-2" />2
                        Hours
                      </span>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fs-14 text-gray-5 me-2">
                          Starts From
                        </span>
                        <span className="fs-18 fw-semibold text-primary me-1">
                          $230
                        </span>
                        <span className="fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                          $480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5 wow fadeInUp">
          <Link href="#" className="btn btn-primary">
            View All Activities
            <i className="isax isax-arrow-right-3 ms-2" />
          </Link>
        </div>
      </div>
    </div>
  </section>
  {/* featured section */}
</>

  )
}

export default FeaturedSection