"use client";
import ImageWithBasePath from "../../components/image-with-base-path";
import Link from "next/link";

const Recomanded = () => {
  return (
    <>
      {/* recommended */}
      <section className="section recommended-sec">
        <div className="container">
          <div className="section-header-eight wow fadeInUp">
            <h2>
              Exclusive Recommended <br />{" "}
              <ImageWithBasePath
                src="./assets/img/bg/heading-bg-03.png"
                alt="img"
              />{" "}
              Tours &amp; Highlights{" "}
            </h2>
          </div>
          <div className="row row-gap-4">
            <div className="col-lg-3 col-md-6">
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href="#" tabIndex={0}>
                    <ImageWithBasePath
                      src="assets/img/destination/destination-54.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </Link>
                  <div className="fav-item fs-14">
                    <span className="me-2">
                      <i className="isax isax-calendar-tick me-1" />3 Days, 2
                      Night
                    </span>
                    <span>
                      <i className="isax isax-profile-2user4 me-1" />
                      08 Guests
                    </span>
                  </div>
                  <div className="recommended-amount">
                    <p className="text-white mb-1">Starts From</p>
                    <span className="text-white fs-18 fw-semibold">
                      $450{" "}
                      <span className="text-decoration-line-through">$520</span>
                    </span>
                  </div>
                </div>
                <div className="recommended-content">
                  <div className="d-flex align-items-center gap-2 justify-content-center mb-3">
                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                      4.9
                    </span>
                    <span className="fs-14 text-gray-5">67 Reviews</span>
                  </div>
                  <div className="mb-1 home-eight-title text-dark">
                    <Link href="#">Serene Bay</Link>
                  </div>
                  <span>Bold Street, Liverpool</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href="#" tabIndex={0}>
                    <ImageWithBasePath
                      src="assets/img/destination/destination-55.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </Link>
                  <div className="fav-item fs-14">
                    <span className="me-2">
                      <i className="isax isax-calendar-tick me-1" />5 Days, 4
                      Nights
                    </span>
                    <span>
                      <i className="isax isax-profile-2user4 me-1" />
                      10 Guests
                    </span>
                  </div>
                  <div className="recommended-amount">
                    <p className="text-white mb-1">Starts From</p>
                    <span className="text-white fs-18 fw-semibold">
                      $850{" "}
                      <span className="text-decoration-line-through">$950</span>
                    </span>
                  </div>
                </div>
                <div className="recommended-content">
                  <div className="d-flex align-items-center gap-2 justify-content-center mb-3">
                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                      4.8
                    </span>
                    <span className="fs-14 text-gray-5">42 Reviews</span>
                  </div>
                  <div className="mb-1 home-eight-title text-dark">
                    <Link href="#">Coastal Retreat</Link>
                  </div>
                  <span>Highway 1, Malibu</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href="#" tabIndex={0}>
                    <ImageWithBasePath
                      src="assets/img/destination/destination-56.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </Link>
                  <div className="fav-item fs-14">
                    <span className="me-2">
                      <i className="isax isax-calendar-tick me-1" />2 Days, 1
                      Night
                    </span>
                    <span>
                      <i className="isax isax-profile-2user4 me-1" />6 Guests
                    </span>
                  </div>
                  <div className="recommended-amount">
                    <p className="text-white mb-1">Starts From</p>
                    <span className="text-white fs-18 fw-semibold">
                      $300{" "}
                      <span className="text-decoration-line-through">$350</span>
                    </span>
                  </div>
                </div>
                <div className="recommended-content">
                  <div className="d-flex align-items-center gap-2 justify-content-center mb-3">
                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                      4.6
                    </span>
                    <span className="fs-14 text-gray-5">30 Reviews</span>
                  </div>
                  <div className="mb-1 home-eight-title text-dark">
                    <Link href="#">Mountain Escape</Link>
                  </div>
                  <span>Ridge Road, Denver</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="recommended-list-item wow fadeInUp">
                <div className="recommended-img">
                  <Link href="#" tabIndex={0}>
                    <ImageWithBasePath
                      src="assets/img/destination/destination-57.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </Link>
                  <div className="fav-item fs-14">
                    <span className="me-2">
                      <i className="isax isax-calendar-tick me-1" />4 Days, 3
                      Nights
                    </span>
                    <span>
                      <i className="isax isax-profile-2user4 me-1" />8 Guests
                    </span>
                  </div>
                  <div className="recommended-amount">
                    <p className="text-white mb-1">Starts From</p>
                    <span className="text-white fs-18 fw-semibold">
                      $700{" "}
                      <span className="text-decoration-line-through">$800</span>
                    </span>
                  </div>
                </div>
                <div className="recommended-content">
                  <div className="d-flex align-items-center gap-2 justify-content-center mb-3">
                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                      4.7
                    </span>
                    <span className="fs-14 text-gray-5">55 Reviews</span>
                  </div>
                  <div className="mb-1 home-eight-title text-dark">
                    <Link href="#">Urban Oasis</Link>
                  </div>
                  <span>City Center, New York</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 pt-2 wow fadeInUp">
            <Link href="#" className="btn btn-primary">
              View All Listings
              <i className="isax isax-arrow-right-3 ms-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* recommended */}
    </>
  );
};

export default Recomanded;
