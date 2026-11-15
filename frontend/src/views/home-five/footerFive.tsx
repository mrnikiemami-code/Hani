"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import { all_routes } from '../../routes/all_routes'

const FooterFive = () => {

    const routes = all_routes

  return (
    <footer className="footer-five">
        <div className="container">
            <div className="footer-top">
                <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
                    <div className="col-lg-5">
                        <div className="footer-about">
                            <span className="d-block mb-2 footer-logo-light"><ImageWithBasePath src="assets/img/logo-dark.svg" alt="Img" /></span>
                            <span className="mb-2 footer-logo-dark"><ImageWithBasePath src="assets/img/logo.svg" alt="Img" /></span>
                            <p>At Deams Tour, we are committed to delivering a seamless and unforgettable cruise experience. </p>
                            <h5>Subscribe to Our Newsletter</h5>
                            <p>Just sign up and we'll send you a notification by email.</p>
                            <div className="footer-input">
                                <div className="input-group align-items-center justify-content-center">
                                    <span className="input-group-text px-1"><i className="isax isax-message-favorite5"></i></span>
                                    <input type="email" className="form-control" placeholder="Enter Email Address" />
                                    <button type="submit" className="btn btn-primary">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2">
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
                    <div className="col-lg-2">
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
                    <div className="col-lg-3">
                        <div className="footer-widget">
                            <h5>Contact Info</h5>
                            <div className="customer-info">
                                <div className="customer-info-icon">
                                    <span><i className="isax isax-headphone5"></i></span>
                                </div>
                                <div className="customer-info-content">
                                    <span>Customer Support</span>
                                    <h6>+1 56589 54598</h6>
                                </div>
                            </div>
                            <div className="customer-info">
                                <div className="customer-info-icon">
                                    <span><i className="isax isax-sms5"></i></span>
                                </div>
                                <div className="customer-info-content">
                                    <span>Drop Us an Email</span>
                                    <h6>info@example.com</h6>
                                </div>
                            </div>
                            <div className="customer-info">
                                <div className="customer-info-icon">
                                    <span><i className="isax isax-call5"></i></span>
                                </div>
                                <div className="customer-info-content">
                                    <span>Toll Free</span>
                                    <h6>+1 56569 54698</h6>
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
                            <p className="fs-14">Copyright &copy; 2026. All Rights Reserved, <Link href="#" className="text-primary fw-medium">DreamsTour</Link></p>
                            <div className="d-flex align-items-center">
                                <ul className="social-icon">
                                    <li>
                                        <Link href="#"><i className="fa-brands fa-facebook"></i></Link>
                                    </li>
                                    <li>
                                        <Link href="#"><i className="fa-brands fa-x-twitter"></i></Link>
                                    </li>
                                    <li>
                                        <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                                    </li>
                                    <li>
                                        <Link href="#"><i className="fa-brands fa-linkedin"></i></Link>
                                    </li>
                                    <li>
                                        <Link href="#"><i className="fa-brands fa-pinterest"></i></Link>
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
  )
}

export default FooterFive