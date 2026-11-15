"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";

const HomeRoutes = () => {
  return (
    <>
      {/* Routes Section */}
      <section className="section routes-sec-seven position-relative">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="mb-2 line-icon">Popular Routes</h2>
            <p className="sub-title">
              Plan Your Next Journey with Our Top Bus Routes
            </p>
          </div>
          {/* start row */}
          <div className="row">
            <div className="col-xl-7">
              <div className="bus-list">
                {/* Bus List 1 */}
                <div className="place-item mb-2">
                  <div className="place-img">
                    <Link href={all_routes.busDetails}>
                      <ImageWithBasePath
                        src="assets/img/bus/bus-img-01.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="place-content">
                    <div className="bus-content">
                      <div className="bus-title">
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Chicago</Link>
                          </h5>
                          <p>09:30 AM</p>
                        </div>
                        <div className="dot-line">
                          <span>
                            <small className="text-muted">13h 10m</small>
                          </span>
                        </div>
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Miami</Link>
                          </h5>
                          <p>10:40 PM</p>
                        </div>
                      </div>
                      <div className="bus-title-item">
                        <h6 className="d-flex align-items-center w-100 justify-content-between text-primary flex-md-column flex-row fs-18 fw-semibold gap-1">
                          $350
                          <span className="ms-1 fs-14 fw-normal text-gray-6">
                            From
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href={all_routes.busList}
                          className="btn btn-dark btn-lg search-btn"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bus List 2 */}
                <div className="place-item mb-2">
                  <div className="place-img">
                    <Link href={all_routes.busDetails}>
                      <ImageWithBasePath
                        src="assets/img/bus/bus-img-02.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="place-content">
                    <div className="bus-content">
                      <div className="bus-title">
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Toronto</Link>
                          </h5>
                          <p>08:25 PM</p>
                        </div>
                        <div className="dot-line">
                          <span>
                            <small className="text-muted">16h 25m</small>
                          </span>
                        </div>
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Bangkok</Link>
                          </h5>
                          <p>104:45 PM</p>
                        </div>
                      </div>
                      <div className="bus-title-item">
                        <h6 className="d-flex align-items-center w-100 justify-content-between text-primary flex-md-column flex-row fs-18 fw-semibold gap-1">
                          $300
                          <span className="ms-1 fs-14 fw-normal text-gray-6">
                            From
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href={all_routes.busList}
                          className="btn btn-dark btn-lg search-btn"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bus List 3 */}
                <div className="place-item mb-2">
                  <div className="place-img">
                    <Link href={all_routes.busDetails}>
                      <ImageWithBasePath
                        src="assets/img/bus/bus-img-03.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="place-content">
                    <div className="bus-content">
                      <div className="bus-title">
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Boston</Link>
                          </h5>
                          <p>08:10 AM</p>
                        </div>
                        <div className="dot-line">
                          <span>
                            <small className="text-muted">12h 30m</small>
                          </span>
                        </div>
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Dallas</Link>
                          </h5>
                          <p>08:40 PM</p>
                        </div>
                      </div>
                      <div className="bus-title-item">
                        <h6 className="d-flex align-items-center w-100 justify-content-between text-primary flex-md-column flex-row fs-18 fw-semibold gap-1">
                          $250
                          <span className="ms-1 fs-14 fw-normal text-gray-6">
                            From
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href={all_routes.busList}
                          className="btn btn-dark btn-lg search-btn"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bus List 4 */}
                <div className="place-item mb-2">
                  <div className="place-img">
                    <Link href={all_routes.busDetails}>
                      <ImageWithBasePath
                        src="assets/img/bus/bus-img-04.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="place-content">
                    <div className="bus-content">
                      <div className="bus-title">
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Seattle</Link>
                          </h5>
                          <p>05:50 PM</p>
                        </div>
                        <div className="dot-line">
                          <span>
                            <small className="text-muted">14h 45m</small>
                          </span>
                        </div>
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Denver</Link>
                          </h5>
                          <p>08:35 AM</p>
                        </div>
                      </div>
                      <div className="bus-title-item">
                        <h6 className="d-flex align-items-center w-100 justify-content-between text-primary flex-md-column flex-row fs-18 fw-semibold gap-1">
                          $390
                          <span className="ms-1 fs-14 fw-normal text-gray-6">
                            From
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href={all_routes.busList}
                          className="btn btn-dark btn-lg search-btn"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bus List 5 */}
                <div className="place-item">
                  <div className="place-img">
                    <Link href={all_routes.busDetails}>
                      <ImageWithBasePath
                        src="assets/img/bus/bus-img-05.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="place-content">
                    <div className="bus-content">
                      <div className="bus-title">
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Portland</Link>
                          </h5>
                          <p>08:00 AM</p>
                        </div>
                        <div className="dot-line">
                          <span>
                            <small className="text-muted">16h 10m</small>
                          </span>
                        </div>
                        <div className="bus-title-item">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Orlando</Link>
                          </h5>
                          <p>12:05 PM</p>
                        </div>
                      </div>
                      <div className="bus-title-item">
                        <h6 className="d-flex align-items-center w-100 justify-content-between text-primary flex-md-column flex-row fs-18 fw-semibold gap-1">
                          $650
                          <span className="ms-1 fs-14 fw-normal text-gray-6">
                            From
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href={all_routes.busList}
                          className="btn btn-dark btn-lg search-btn"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xl-5">
              <div className="rountes-img d-none d-xl-block">
                <ImageWithBasePath
                  src="assets/img/bus/routes-img-01.jpg"
                  alt="img"
                  className="img-fluid rounded"
                />
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        <ImageWithBasePath
          src="assets/img/bus/routes-img-02.png"
          alt="img"
          className="img-fluid element-one d-none"
        />
        <ImageWithBasePath
          src="assets/img/bus/routes-img-03.png"
          alt="img"
          className="img-fluid element-two d-none d-xl-block"
        />
      </section>
      {/* /Popular Section */}
      {/* Countries Section */}
      <section className="section choose-sec-seven position-relative overflow-hidden">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="mb-2 text-white line-icon">Why Choose Us</h2>
            <p className="sub-title text-white">
              Experience the best in bus travel with our premium services
            </p>
          </div>
          {/* start row */}
          <div className="row row-gap-4">
            <div className="col-lg-3 col-sm-6">
              <div className="card border-0 mb-0">
                <div className="card-body">
                  <div className="text-center">
                    <span className="avatar rounded-icon-md rounded-circle bg-success flex-shrink-0">
                      <i className="isax isax-calendar-add5 fs-24" />
                    </span>
                    <div>
                      <h5>Safe Travel</h5>
                      <p className="text-truncate line-clamb-3">
                        Travel safely with our verified and trusted operators
                      </p>
                    </div>
                  </div>
                </div>
                <ImageWithBasePath
                  src="assets/img/bus/why-img-02.png"
                  alt="img"
                  className="img-fluid rounded why-img-one"
                />
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card border-0 mb-0">
                <div className="card-body">
                  <div className="text-center">
                    <span className="avatar rounded-icon-md rounded-icon-md-1 rounded-circle bg-danger flex-shrink-0">
                      <i className="isax isax-headphone5 fs-24" />
                    </span>
                    <div>
                      <h5>24/7 Support</h5>
                      <p className="text-truncate line-clamb-3">
                        Round-the-clock customer support for your convenience
                      </p>
                    </div>
                  </div>
                </div>
                <ImageWithBasePath
                  src="assets/img/bus/why-img-02.png"
                  alt="img"
                  className="img-fluid rounded why-img-one"
                />
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card border-0 mb-0">
                <div className="card-body">
                  <div className="text-center">
                    <span className="avatar rounded-icon-md rounded-icon-md-2 rounded-circle bg-purple flex-shrink-0">
                      <i className="isax isax-heart-edit5 fs-24" />
                    </span>
                    <div>
                      <h5>Easy Booking</h5>
                      <p className="text-truncate line-clamb-3">
                        Simple and quick booking process in just a few clicks
                      </p>
                    </div>
                  </div>
                </div>
                <ImageWithBasePath
                  src="assets/img/bus/why-img-02.png"
                  alt="img"
                  className="img-fluid rounded why-img-one"
                />
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-3 col-sm-6">
              <div className="card border-0 mb-0">
                <div className="card-body">
                  <div className="text-center">
                    <span className="avatar rounded-icon-md rounded-icon-md-3 rounded-circle bg-secondary flex-shrink-0">
                      <i className="isax isax-tag-user5 fs-24" />
                    </span>
                    <div>
                      <h5>Verified Operators</h5>
                      <p className="text-truncate line-clamb-3">
                        All of our bus operators are verified Licensed and
                        certified
                      </p>
                    </div>
                  </div>
                </div>
                <ImageWithBasePath
                  src="assets/img/bus/why-img-02.png"
                  alt="img"
                  className="img-fluid rounded why-img-one"
                />
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          {/* start img */}
          <div className="why-img d-none d-lg-block text-center">
            <ImageWithBasePath
              src="assets/img/bus/why-img-01.png"
              alt="img"
              className="img-fluid"
            />
          </div>
          {/* end img */}
        </div>
        <div className="slide-section">
          <div
            className="horizontal-slide d-flex"
            data-direction="left"
            data-speed="slow"
          >
            <div className="slide-list d-flex">
              <div className="slide-item">
                <h3>EXPERT GUIDANCE</h3>
              </div>
              <div className="slide-item">
                <h3> ITINERARIES</h3>
              </div>
              <div className="slide-item">
                <h3>MULTIPLE REGIONS</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Popular Section */}
      {/* Countries Section */}
      <section className="section countries-sec-seven">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="mb-2 line-icon">Popular Connected Countries</h2>
            <p className="sub-title">
              Explore Seamless Bus Connections Across Borders
            </p>
          </div>
          {/* start row */}
          <div className="row row-gap-3">
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-01.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Scotland</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-02.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Niger</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-03.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Slovenia</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-04.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>NetherLands</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-05.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Singapore</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-06.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Finland</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-07.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Argentina</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-08.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Croatia</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-09.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Canada</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-10.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>England</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-11.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Romania</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-12.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Turkey</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-13.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Peru</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-14.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>France</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-15.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Sweden</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-16.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Brazil</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-17.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Kuwait</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="countries-item d-flex align-items-center gap-2">
                <ImageWithBasePath
                  src="assets/img/icons/lang-18.svg"
                  alt="img"
                  className="img-fluid"
                />
                <h6>Botswana</h6>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
      </section>
      {/* /Countries Section */}
    </>
  );
};

export default HomeRoutes;
