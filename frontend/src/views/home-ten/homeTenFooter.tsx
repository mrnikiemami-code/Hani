"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";

const HomeTenFooter = () => {
  const routes = all_routes;

  return (
    <>
      {/* Start Footer Section */}
      <footer className="footer footer-ten">
        <div className="container">
          {/* start footer */}
          <div className="foot-ten">
            {/* start row  */}
            <div className="row row-gap-5">
              <div className="col-xl-5 col-lg-6">
                <div className="footer-subscribe">
                  <div className="footer-content">
                    <h2 className="text-white mb-2">
                      Subscribe to our Newsletter
                    </h2>
                    <span className="text-light">
                      Just sign up and we'll send you a notification by email.
                    </span>
                  </div>
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
              <div className="col-lg-2 d-none d-xl-flex" />
              <div className="col-xl-5 col-lg-6">
                {/* start row  */}
                <div className="row row-gap-3">
                  <div className="col-lg-6">
                    <div className="footer-widget">
                      <h3 className="footer-title">Services</h3>
                      <Link href={routes.hotelGrid} className="link">
                        <span className="dot">
                          <i className="fa-solid fa-circle" />
                        </span>
                        Hotel
                      </Link>
                      <Link href={routes.activityGrid} className="link">
                        <span className="dot">
                          <i className="fa-solid fa-circle" />
                        </span>
                        Activity Finder
                      </Link>
                      <Link href={routes.flightGrid} className="link">
                        <span className="dot">
                          <i className="fa-solid fa-circle" />
                        </span>
                        Flight finder
                      </Link>
                      <Link href={routes.tourGrid} className="link">
                        <span className="dot">
                          <i className="fa-solid fa-circle" />
                        </span>
                        Tour Packages
                      </Link>
                      <Link href={routes.carGrid} className="link">
                        <span className="dot">
                          <i className="fa-solid fa-circle" />
                        </span>
                        Car Rental
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="footer-widget">
                      <h3 className="footer-title">Contact Us</h3>
                      <div className="customer-support mb-4">
                        <div className="icon bg-primary">
                          <i className="isax isax-headphone4" />
                        </div>
                        <div>
                          <h4 className="number">
                            <span>Customer Support</span>
                            +1 56589 54598
                          </h4>
                        </div>
                      </div>
                      <div className="customer-support mb-4">
                        <div className="icon bg-secondary">
                          <i className="isax isax-message-25" />
                        </div>
                        <div>
                          <h4 className="number">
                            <span>Drop Us an Email</span>
                            info@example.com
                          </h4>
                        </div>
                      </div>
                      <div className="customer-support mb-0">
                        <div className="icon bg-teal">
                          <i className="isax isax-call5" />
                        </div>
                        <div>
                          <h4 className="number">
                            <span>Toll Free</span>
                            +1 56569 54698
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end row  */}
              </div>
            </div>
            {/* end row  */}
          </div>
          {/* end footer */}
        </div>
        {/* Copy Rights */}
        <div className="copy-rights">
          <div className="container">
            <div className="copy-content">
              <div className="social-app">
                <Link href="#" target="_blank">
                  <ImageWithBasePath
                    src="assets/img/icons/google-play.svg"
                    alt="google"
                    className="img-fluid social-icon"
                  />
                </Link>
                <Link href="#" target="_blank">
                  <ImageWithBasePath
                    src="assets/img/icons/app-store.svg"
                    alt="google"
                    className="img-fluid social-icon"
                  />
                </Link>
              </div>
              <p>
                © 2026. All rights reserved.
                <Link href="#" className="copy-link">
                  {" "}
                  DreamsTour
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer Section */}
    </>
  );
};

export default HomeTenFooter;
