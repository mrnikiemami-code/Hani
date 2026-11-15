"use client";

import Link from "next/link";
import ImageWithBasePath from '../image-with-base-path'
import { all_routes } from '../../routes/all_routes'

const Footer = () => {

  const routes = all_routes

  return (
    <>
      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
              <div className="col">
                <div className="footer-widget">
                  <h5>Pages</h5>
                  <ul className="footer-menu">
                    <li>
                      <Link href={routes.teams}>Our Team</Link>
                    </li>
                    <li>
                      <Link href={routes.pricingPlan}>Pricing Plans</Link>
                    </li>
                    <li>
                      <Link href={routes.Gallery}>Gallery</Link>
                    </li>
                    <li>
                      <Link href={routes.profileSettings}>Settings</Link>
                    </li>
                    <li>
                      <Link href={routes.myProfile}>Profile</Link>
                    </li>
                    <li>
                      <Link href={routes.agentListing}>Listings</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Company</h5>
                  <ul className="footer-menu">
                    <li>
                      <Link href={routes.about_us}>About Us</Link>
                    </li>
                    <li>
                      <Link href="#">Careers</Link>
                    </li>
                    <li>
                      <Link href={routes.blogGrid}>Blog</Link>
                    </li>
                    <li>
                      <Link href="#">Affiliate Program</Link>
                    </li>
                    <li>
                      <Link href={routes.addFlight}>Add Your Listing</Link>
                    </li>
                    <li>
                      <Link href="#">Our Partners</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Destinations</h5>
                  <ul className="footer-menu">
                    <li>
                      <Link href="#">Hawai</Link>
                    </li>
                    <li>
                      <Link href="#">Istanbul</Link>
                    </li>
                    <li>
                      <Link href="#">San Diego</Link>
                    </li>
                    <li>
                      <Link href="#">Belgium</Link>
                    </li>
                    <li>
                      <Link href="#">Los Angeles</Link>
                    </li>
                    <li>
                      <Link href="#">New York</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Support</h5>
                  <ul className="footer-menu">
                    <li>
                      <Link href={routes.contactUs}>Contact Us</Link>
                    </li>
                    <li>
                      <Link href="#">Legal Notice</Link>
                    </li>
                    <li>
                      <Link href={routes.privacyPolicy}>Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href={routes.termsConditions}>Terms and Conditions</Link>
                    </li>
                    <li>
                      <Link href={routes.userChat}>Chat Support</Link>
                    </li>
                    <li>
                      <Link href="#">Refund Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Services</h5>
                  <ul className="footer-menu">
                    <li>
                      <Link href={routes.hotelGrid}>Hotel</Link>
                    </li>
                    <li>
                      <Link href="#">Activity Finder</Link>
                    </li>
                    <li>
                      <Link href={routes.flightGrid}>Flight Finder</Link>
                    </li>
                    <li>
                      <Link href={routes.tourGrid}>Holiday Rental</Link>
                    </li>
                    <li>
                      <Link href={routes.carGrid}>Car Rental</Link>
                    </li>
                    <li>
                      <Link href={routes.tourDetails}>Holiday Packages</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-wrap bg-white">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-3 col-xxl-3">
                  <div className="mb-3 text-center text-xl-start">
                    <Link href={routes.allService1} className="d-block footer-logo-light">
                      <ImageWithBasePath src="assets/img/logo-dark.svg" alt="logo" />
                    </Link>
                    <Link href={routes.allService1} className="footer-logo-dark">
                      <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-4 col-xxl-4">
                  <div className="d-flex align-items-center justify-content-center flex-wrap">
                    <h6 className="fs-14 fw-medium me-2 mb-2">Available on : </h6>
                    <Link href="#" className="d-block mb-3 me-2">
                      <ImageWithBasePath src="assets/img/icons/googleplay.svg" alt="logo" />
                    </Link>
                    <Link href="#" className="d-block mb-3">
                      <ImageWithBasePath src="assets/img/icons/appstore.svg" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-5 col-xxl-5">
                  <div className="d-sm-flex align-items-center justify-content-center justify-content-xl-end">
                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start me-0 pe-0 me-sm-3 pe-sm-3 border-end mb-3">
                      <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
                        <i className="ti ti-headphones-filled fs-24" />
                      </span>
                      <div className="ms-2">
                        <p className="mb-1">Customer Support</p>
                        <p className="fw-medium text-dark">+1 56589 54598</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start mb-3">
                      <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0">
                        <i className="ti ti-message fs-24 text-gray-9" />
                      </span>
                      <div className="ms-2">
                        <p className="mb-1">Drop Us an Email</p>
                        <p className="fw-medium text-dark">info@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-img">
              <ImageWithBasePath src="assets/img/bg/footer.svg" className="img-fluid" alt="img" />
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <p className="fs-14">
                    Copyright © 2026. All Rights Reserved,{" "}
                    <Link
                      href="#"
                      className="text-primary fw-medium"
                    >
                      DreamsTour
                    </Link>
                  </p>
                  <div className="d-flex align-items-center">
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
                  <ul className="card-links">
                    <li>
                      <Link href="#">
                        <ImageWithBasePath src="assets/img/icons/card-01.svg" alt="img" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <ImageWithBasePath src="assets/img/icons/card-02.svg" alt="img" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <ImageWithBasePath src="assets/img/icons/card-03.svg" alt="img" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <ImageWithBasePath src="assets/img/icons/card-04.svg" alt="img" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <ImageWithBasePath src="assets/img/icons/card-05.svg" alt="img" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <ImageWithBasePath src="assets/img/icons/card-06.svg" alt="img" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Footer Bottom */}
      </footer>
      {/* /Footer */}
    </>

  )
}

export default Footer