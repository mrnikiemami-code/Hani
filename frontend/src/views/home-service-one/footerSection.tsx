"use client";

import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path'
import { all_routes } from '../../routes/all_routes'

const FooterSection = () => {
  return (
    <>
  {/* Footer */}
  <footer className="footer-eight">
    <div className="footer-top">
      <ImageWithBasePath
        src="assets/img/bg/footer-bg-03.png"
        alt="img"
        className="footer-bg"
      />
      <div className="container">
        <div className="footer-subscribe">
          <div className="row row-gap-3">
            <div className="col-lg-7">
              <div>
                <h2 className="text-white">Subscribe to our Newsletter</h2>
                <span className="text-white">
                  Just sign up and we'll send you a notification by email.
                </span>
              </div>
            </div>
            <div className="col-lg-5">
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
        <div className="row align-items-center row-gap-3">
          <div className="col-md-5">
            <div className="footer-about">
              <div>
                <Link href={all_routes.allService1} className="d-inline-block mb-1">
                  <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                </Link>
                <p className="text-white">
                  Our mission is to offer you a seamless and enjoyable car
                  rental experience. Whether you’re planning a road trip
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row row-cols-xl-3 row-cols-sm-2 row-cols-1 g-4">
              <div className="col">
                <div className="d-flex align-items-center">
                  <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
                    <i className="ti ti-headphones-filled fs-24" />
                  </span>
                  <div className="ms-2">
                    <p className="fs-14 mb-1 text-white">Customer Support</p>
                    <div className="fw-medium text-light">+1 56589 54598</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex align-items-center">
                  <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0">
                    <i className="isax isax-message-25 fs-24" />
                  </span>
                  <div className="ms-2">
                    <p className="fs-14 mb-1 text-white">Drop Us an Email</p>
                    <div className="fw-medium text-light">info@example.com</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex align-items-center">
                  <span className="avatar avatar-lg bg-teal rounded-circle flex-shrink-0">
                    <i className="isax isax-message-25 fs-24" />
                  </span>
                  <div className="ms-2">
                    <p className="fs-14 mb-1 text-white">Toll Free</p>
                    <div className="fw-medium text-light">+1 56569 54698</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-middle">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center justify-content-lg-between flex-wrap gap-3">
          <div className="footer-links d-none d-lg-block">
            <ul>
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href={all_routes.hotelGrid}>Hotels</Link>
              </li>
              <li>
                <Link href={all_routes.tourGrid}>Tours</Link>
              </li>
              <li>
                <Link href={all_routes.carGrid}>Car Rentals</Link>
              </li>
              <li>
                <Link href={all_routes.cruiseGrid}>Cruise</Link>
              </li>
              <li>
                <Link href={all_routes.activityGrid}>Activities</Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="text-white">Available on</span>
            <Link href="#" className="d-block">
              <ImageWithBasePath src="assets/img/icons/googleplay-white.svg" alt="logo" />
            </Link>
            <Link href="#" className="d-block">
              <ImageWithBasePath src="assets/img/icons/appstore-white.svg" alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <p className="text-white mb-0">
              Copyright © 2026{" "}
              <Link href="#" className="fw-medium d-inline-flex align-items-center py-1">
                DreamsTour
              </Link>
            </p>
          </div>
          <div className="col-md-4">
            <div className="footer-bottom-links d-flex align-items-center justify-content-center gap-3">
              <Link href="#" className="d-inline-flex align-items-center py-1">
                Legal Notice
              </Link>
              <Link href="#" className="d-inline-flex align-items-center py-1">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <ul className="social-icon">
              <li>
                <Link href="#" aria-label="Facebook">
                  <i className="fa-brands fa-facebook" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="X">
                  <i className="fa-brands fa-x-twitter" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="Instagram">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin" />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="Pinterest">
                  <i className="fa-brands fa-pinterest" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* /Footer */}
</>

  )
}

export default FooterSection