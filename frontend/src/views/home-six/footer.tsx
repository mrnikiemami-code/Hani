"use client";

import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path'
import { all_routes } from '../../routes/all_routes'

const FooterSix = () => {

    const routes = all_routes;

    return (
        <>
            <>
                {/* Footer */}
                <footer className="footer-three footer-six">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="footer-widget">
                                        <div className="footer-about">
                                            <div className="mb-4">
                                                <Link href={routes.allService1} className="d-inline-block mb-1">
                                                    <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                                                </Link>
                                                <p>
                                                    Our mission is to offer you a seamless and enjoyable car
                                                    rental experience. Whether you’re planning a road trip
                                                </p>
                                            </div>
                                        </div>
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
                                </div>
                                <div className="col-lg-4">
                                    <div>
                                        <h5 className="mb-2 text-white">Subscribe to Keep Updated</h5>
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
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
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
                                <div className="col-lg-3 col-md-6">
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
                                                <Link href={routes.addTour}>Add Your Listing</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Our Partners</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
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
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-widget">
                                        <h5>Quick Links</h5>
                                        <ul className="footer-menu">
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
                                                <Link href="#">Refund Policy</Link>
                                            </li>
                                            <li>
                                                <Link href={routes.userChat}>Chat Support</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Tickets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5 mx-auto">
                                    <p className="text-center">
                                        Copyright © 2026. All Rights Reserved,{" "}
                                        <Link href="#" className="text-primary fw-medium">
                                            DreamsTour
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Footer Bottom */}
                </footer>
                {/* /Footer */}
            </>

        </>
    )
}

export default FooterSix


