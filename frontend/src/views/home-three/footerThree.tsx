"use client";

import Link from "next/link";
import ImageWithBasePath from '../../components/image-with-base-path'
import { all_routes } from '../../routes/all_routes'

const FooterThree = () => {

    const routes = all_routes;

  return (
    <>
        {/* Footer */}
        <footer className="footer-three">
        <div className="footer-top">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="footer-widget">
                            <div className="footer-about">
                                <div className="mb-4">
                                    <Link href={routes.home3} className="d-inline-block mb-1">
                                        <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                                    </Link>
                                    <p>Our mission is to offer you a seamless and enjoyable car rental experience. Whether you’re planning a road trip</p>
                                </div>
                                <h5 className="mb-1">Subscribe to Our Newsletter</h5>
                                <p className="mb-3">Just sign up and we'll send you a notification by email.</p>
                                <div className="footer-input">
                                    <div className="input-group align-items-center justify-content-center">
                                        <span className="input-group-text px-1"><i className="isax isax-message-favorite5"></i></span>
                                        <input type="email" className="form-control" placeholder="Enter Email Address" />
                                        <button type="submit" className="btn btn-primary btn-md">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="row row-cols-md-3 row-cols-sm-2 row-cols-1">
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
                        </div>
                    </div>
                </div>
                <div className="footer-contact">
                    <div className="row align-items-center">
                        <div className="col-xl-5">
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
                        <div className="col-xl-7">
                            <div className="row row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
                                <div className="col">
                                    <div className="d-flex align-items-center">
                                        <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
											<i className="ti ti-headphones-filled fs-24"></i>
										</span>
                                        <div className="ms-2">
                                            <p className="fs-14 mb-1">Customer Support</p>
                                            <h6 className="fw-medium text-light">+1 56589 54598</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex align-items-center">
                                        <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0">
											<i className="ti ti-message-2 fs-24"></i>
										</span>
                                        <div className="ms-2">
                                            <p className="fs-14 mb-1">Drop Us an Email</p>
                                            <h6 className="fw-medium text-light">info@example.com</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex align-items-center">
                                        <span className="avatar avatar-lg bg-teal rounded-circle flex-shrink-0">
											<i className="ti ti-message-2 fs-24"></i>
										</span>
                                        <div className="ms-2">
                                            <p className="fs-14 mb-1">Toll Free</p>
                                            <h6 className="fw-medium text-light">+1 56569 54698</h6>
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
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <p>Copyright &copy; 2026. All Rights Reserved, <Link href="#" className="text-primary fw-medium">DreamsTour</Link></p>
                    </div>
                    <div className="col-lg-7">
                        <ul className="policy-links justify-content-xl-end">
                            <li className="me-4">
                                <Link href="#">Legal Notice</Link>
                            </li>
                            <li className="me-4">
                                <Link href={routes.privacyPolicy}>Privacy Policy</Link>
                            </li>
                            <li className="me-4">
                                <Link href={routes.termsConditions}>Terms and Conditions</Link>
                            </li>
                            <li className="me-4">
                                <Link href="#">Refund Policy</Link>
                            </li>
                            <li>
                                <Link href={routes.userChat}>Chat Support</Link>
                            </li>
                        </ul>
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

export default FooterThree