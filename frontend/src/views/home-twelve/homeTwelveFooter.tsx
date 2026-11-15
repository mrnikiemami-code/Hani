"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"
import { all_routes } from "../../routes/all_routes"


const HomeTwelveFooter = () => {
  return (
    <>
  {/* Start Footer Section */}
  <footer className="footer footer-twelve">
    <div className="footer-top">
      <ImageWithBasePath
        src="assets/img/provider/footer-img-1.png"
        alt="footer"
        className="img-fluid img-1 wow fadeInLeft"
        data-wow-delay="0.3"
        data-wow-duration="1.5s"
      />
      <div className="container">
        {/* start row */}
        <div className="row subscribe-item">
          <div className="col-xl-3" />
          <div className="col-xl-9">
            <div
              className="footer-subscribe wow fadeInDown"
              data-wow-delay="0.3"
              data-wow-duration="1.5s"
            >
              <h3 className="subscribe">Subscribe to Keep Updated </h3>
              <div className="footer-input">
                <div className="input-group align-items-center justify-content-center">
                  <span className="input-group-text px-1">
                    <i className="isax isax-message-favorite5" />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                  />
                  <button type="submit" className="btn btn-primary btn-md">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end row */}
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        {/* start row */}
        <div className="row footer-bottom-content align-items-center row-gap-3">
          <div className="col-lg-6">
            <div className="footer-content">
              <Link href={all_routes.home12} className="foot-logo d-block mb-2">
                <ImageWithBasePath
                  src="assets/img/logo.svg"
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
              <p>
                Our mission is to offer you a seamless and enjoyable car <br />{" "}
                rental experience. Whether you’re planning a road trip
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="footer-link">
              <li>
                <Link href={all_routes.allService1} className="link">
                  Home
                </Link>
              </li>
              <li>
                <Link href={all_routes.flightGrid} className="link">
                  Flight
                </Link>
              </li>
              <li>
                <Link href={all_routes.hotelGrid} className="link">
                  Hotel
                </Link>
              </li>
              <li>
                <Link href={all_routes.carGrid} className="link">
                  Car
                </Link>
              </li>
              <li>
                <Link href={all_routes.cruiseGrid} className="link">
                  Cruise
                </Link>
              </li>
              <li>
                <Link href={all_routes.tourGrid} className="link">
                  Tour
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* end row */}
        {/* start row */}
        <div className="row align-items-center row-gap-3">
          <div className="col-xxl-6 col-xl-5 col-lg-4">
            <ul className="social-icon">
              <li>
                <Link href="#">
                  <i className="fa-brands fa-facebook" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa-brands fa-x-twitter" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa-brands fa-linkedin" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa-brands fa-pinterest" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xxl-6 col-xl-7 col-lg-8">
            <div className="d-flex align-items-center justify-content-md-end justify-content-center flex-wrap gap-3 footer-support-twelve">
              <div>
                <div className="d-flex align-items-center justify-content-end">
                  <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
                    <i className="ti ti-headphones-filled fs-24" />
                  </span>
                  <div className="ms-2">
                    <div className="fw-medium text-light mb-1 fs-16 fw-medium text-white">
                      <Link href="#" className="text-white">
                        +1 56589 54598
                      </Link>
                    </div>
                    <p className="fs-14 text-light">Customer Support</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-end">
                  <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0">
                    <i className="isax isax-message-25 fs-24" />
                  </span>
                  <div className="ms-2">
                    <div className="fw-medium text-light mb-1 fs-16 fw-medium text-white">
                      <Link href="#" className="text-white">
                        info@example.com
                      </Link>
                    </div>
                    <p className="fs-14 text-light">Drop Us an Email</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-end">
                  <span className="avatar avatar-lg bg-purple rounded-circle flex-shrink-0">
                    <i className="isax isax-call5 fs-24" />
                  </span>
                  <div className="ms-2">
                    <div className="fw-medium text-light mb-1 fs-16 fw-medium text-white">
                      <Link href="#" className="text-white">
                        +1 56569 54698
                      </Link>
                    </div>
                    <p className="fs-14 text-light">Toll Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end row */}
      </div>
    </div>
    <div className="copy-rights">
      <div className="container">
        <div className="copy-right d-flex align-items-center justify-content-md-between justify-content-center gap-2 flex-wrap">
          <p>
            Copyright © 2026. All Rights Reserved,{" "}
            <Link href={all_routes.allService1}>DreamsTour</Link>
          </p>
          <div className="d-flex align-items-center justify-content-end gap-3">
            <Link href={all_routes.privacyPolicy} className="copy-link">
              Privacy Policy
            </Link>
            <Link href={all_routes.termsConditions} className="copy-link">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
    <ImageWithBasePath
      src="assets/img/bg/globe-img.png"
      alt="globe"
      className="img-fluid globe-img"
    />
  </footer>
  {/* End Footer Section */}
</>

  )
}

export default HomeTwelveFooter