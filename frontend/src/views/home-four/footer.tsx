"use client";
import Link from "next/link";
import { all_routes } from '../../routes/all_routes'

const Footer = () => {

    const routes = all_routes;

    return (
        <div>
            <>
                {/* Footer */}
                <footer className="footer-four">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-7">
                                    <div className="row row-cols-md-4 row-cols-sm-2 row-cols-1">
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
                                                        <Link href="#">New York</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">Los Angeles</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="footer-widget">
                                                <h5>Quick Links</h5>
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
                                    </div>
                                </div>
                                <div className="col-xl-5 col-lg-6">
                                    <div className="footer-widget">
                                        <div className="mb-4">
                                            <h5 className="mb-1">Subscribe to Our Newsletter</h5>
                                            <p className="mb-3">
                                                Just sign up and we'll send you a notification by email.
                                            </p>
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
                                        <h5 className="mb-0">Contact Info</h5>
                                        <div className="d-sm-flex align-items-center justify-content-center justify-content-between">
                                            <div className="d-flex align-items-center justify-content-center justify-content-sm-start me-3 mt-2">
                                                <span className="avatar avatar-lg bg-light rounded-circle flex-shrink-0">
                                                    <i className="ti ti-headphones-filled fs-24 text-gray-9" />
                                                </span>
                                                <div className="ms-2">
                                                    <p className="fs-14 mb-1">Customer Support</p>
                                                    <h6 className="fw-medium">+1 56589 54598</h6>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center justify-content-sm-start mt-2">
                                                <span className="avatar avatar-lg bg-light rounded-circle flex-shrink-0">
                                                    <i className="ti ti-message-2 fs-24 text-gray-9" />
                                                </span>
                                                <div className="ms-2">
                                                    <p className="fs-14 mb-1">Drop Us an Email</p>
                                                    <h6 className="fw-medium text-dark">info@example.com</h6>
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
                                        <p>
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
                                        <ul className="policy-links">
                                            <li>
                                                <Link href="#">Legal Notice</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Refund Policy</Link>
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

        </div>
    )
}

export default Footer
