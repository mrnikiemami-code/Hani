"use client";

import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path'
import { all_routes } from '../../routes/all_routes'

const FooterTwo = () => {

  const routes = all_routes

  return (
    <>
    {/* Footer */}
    <footer className="footer-two">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-widget">
                <span className="d-block mb-2 footer-logo-light">
                  <ImageWithBasePath src="assets/img/logo-dark.svg" alt="Img" />
                </span>
                <span className="mb-2 footer-logo-dark">
                  <ImageWithBasePath src="assets/img/logo.svg" alt="Img" />
                </span>
                <p className="mb-3">
                  The experience of booking your flight tickets, hotel stay
                </p>
                <span className="d-block mb-2">Available on</span>
                <div className="d-flex align-items-center row-gap-2 flex-wrap">
                  <Link href="#" className="d-block me-2">
                    <ImageWithBasePath src="assets/img/icons/googleplay.svg" alt="logo" />
                  </Link>
                  <Link href="#" className="d-block">
                    <ImageWithBasePath src="assets/img/icons/appstore.svg" alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-3 col-sm-6">
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
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
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
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
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
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="footer-widget">
                    <h5>Services</h5>
                    <div className="customer-info">
                      <div className="customer-info-icon">
                        <span>
                          <i className="isax isax-headphone5" />
                        </span>
                      </div>
                      <div className="customer-info-content">
                        <span>Customer Support</span>
                        <h6>+1 56589 54598</h6>
                      </div>
                    </div>
                    <div className="customer-info">
                      <div className="customer-info-icon">
                        <span>
                          <i className="isax isax-sms5" />
                        </span>
                      </div>
                      <div className="customer-info-content">
                        <span>Drop Us an Email</span>
                        <h6>info@example.com</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <ul className="social-icon social-icon-two">
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

export default FooterTwo
