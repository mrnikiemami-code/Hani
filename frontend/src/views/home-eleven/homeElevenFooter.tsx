"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"
import { all_routes } from "../../routes/all_routes"


const HomeElevenFooter = () => {
  return (
    <>
  {/* gallery sec */}
  <section className="gallery-section overflow-hidden wow fadeInUp">
    <div
      className="horizontal-slide d-flex"
      data-direction="right"
      data-speed="speed"
    >
      <div className="slide-list d-flex">
        <div className="gallery-item">
          <ImageWithBasePath src="./assets/img/tours/tours-61.jpg" alt="img" />
        </div>
        <div className="gallery-item">
          <ImageWithBasePath src="./assets/img/tours/tours-62.jpg" alt="img" />
        </div>
        <div className="gallery-item">
          <ImageWithBasePath src="./assets/img/tours/tours-63.jpg" alt="img" />
        </div>
        <div className="gallery-item">
          <ImageWithBasePath src="./assets/img/tours/tours-64.jpg" alt="img" />
        </div>
        <div className="gallery-item">
          <ImageWithBasePath src="./assets/img/tours/tours-65.jpg" alt="img" />
        </div>
      </div>
    </div>
  </section>
  {/* gallery sec */}
  <>
  {/* Footer */}
  <footer className="footer-three footer-eleven">
    <div className="footer-top">
      <div className="footer-title-text">DREAMSTOUR</div>
      <div className="container">
        <div className="footer-subscribe">
          <div className="row row-gap-3 align-items-center">
            <div className="col-lg-7">
              <div>
                <h2 className="text-white mb-0">Subscribe to Keep Updated </h2>
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
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-4">
            <div className="footer-widget">
              <div className="footer-about">
                <div className="mb-4">
                  <Link href={all_routes.allService1} className="d-inline-block mb-3">
                    <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                  </Link>
                  <p>
                    Our mission is to offer you a seamless and enjoyable car
                    rental experience. Whether you’re planning a road trip
                  </p>
                  <ul className="social-icon mt-3">
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
          <div className="col-xl-7 col-lg-8">
            <div className="row row-cols-md-3 row-cols-sm-2 row-cols-1 row-gap-3">
              <div className="col">
                <div className="footer-widget mb-0">
                  <div className="home-eleven-title">Activities</div>
                  <ul className="footer-menu">
                    <li>
                      <Link href="#">Sky Dive Ride</Link>
                    </li>
                    <li>
                      <Link href="#">Hot Air Balloon Ride</Link>
                    </li>
                    <li>
                      <Link href="#">Desert Safari</Link>
                    </li>
                    <li>
                      <Link href="#">High Speed Boat Ride</Link>
                    </li>
                    <li>
                      <Link href="#">Montain Climbing</Link>
                    </li>
                    <li>
                      <Link href="#">Cultural Events</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget mb-0">
                  <div className="home-eleven-title">Menu</div>
                  <ul className="footer-menu">
                    <li>
                      <Link href={all_routes.allService1}>Home</Link>
                    </li>
                    <li>
                      <Link href={all_routes.flightList}>Flight</Link>
                    </li>
                    <li>
                      <Link href={all_routes.hotelList}>Hotel</Link>
                    </li>
                    <li>
                      <Link href={all_routes.carList}>Car</Link>
                    </li>
                    <li>
                      <Link href={all_routes.cruiseList}>Cruise</Link>
                    </li>
                    <li>
                      <Link href={all_routes.tourList}>Tour</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget mb-0">
                  <div className="home-eleven-title">Contact Us</div>
                  <div className="customer-info">
                    <div className="customer-info-icon">
                      <span>
                        <i className="isax isax-headphone5" />
                      </span>
                    </div>
                    <div className="customer-info-content">
                      <span>Customer Support</span>
                      <span className="customer-info-text">+1 56589 54598</span>
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
                      <span className="customer-info-text">
                        info@example.com
                      </span>
                    </div>
                  </div>
                  <div className="customer-info mb-0">
                    <div className="customer-info-icon">
                      <span>
                        <i className="isax isax-call5" />
                      </span>
                    </div>
                    <div className="customer-info-content">
                      <span>Toll Free</span>
                      <span className="customer-info-text">+1 56569 54698</span>
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
          <div className="col-md-7 ">
            <p className="text-lg-start text-center">
              Copyright © 2026. All Rights Reserved,{" "}
              <Link href="#" className="fw-medium">
                DreamsTour
              </Link>
            </p>
          </div>
          <div className="col-md-5">
            <ul className="policy-links justify-content-lg-end justify-content-center gap-2">
              <li>
                <Link href={all_routes.privacyPolicy}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={all_routes.termsConditions}>Terms and Conditions</Link>
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

</>

  )
}

export default HomeElevenFooter