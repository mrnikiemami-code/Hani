"use client";
import { img_path } from "../../environment";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"
import { useEffect, useRef, useState } from "react";
import { all_routes } from "../../routes/all_routes";

const ServiceTwoFooter = () => {
     const progressRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);

  const [scrollValue, setScrollValue] = useState(0);
   useEffect(() => {
    const handleScroll = () => {
      const pos = document.documentElement.scrollTop;
      const calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (calcHeight > 0) {
        const percentage = Math.round((pos * 100) / calcHeight);
        setScrollValue(percentage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
  {/* Footer */}
  <footer className="footer-nine">
    <div className="footer-top">
      <div className="container">
        <div className="row row-gap-4">
          <div className="col-xl-7">
            <div className="footer-about">
              <div className="row">
                <div className="col-md-8">
                  <div className="footer-about-text">
                    <Link href={all_routes.allService1} className="d-inline-block mb-1">
                      <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                    </Link>
                    <p className="text-white">
                      Our mission is to offer you a seamless and enjoyable car
                      rental experience. Whether you’re planning a road trip
                    </p>
                  </div>
                  <div className="home-nine-title text-white">
                    Subscribe to Our Newsletter
                  </div>
                  <p className="text-white mb-3">
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
                <div className="col-md-4">
                  <div className="footer-widget mb-0">
                    <div className="home-nine-title">Services</div>
                    <ul className="footer-menu">
                      <li>
                        <Link href={all_routes.hotelGrid}>Hotel</Link>
                      </li>
                      <li>
                        <Link href={all_routes.activityGrid}>Activity Finder</Link>
                      </li>
                      <li>
                        <Link href={all_routes.flightGrid}>Flight finder</Link>
                      </li>
                      <li>
                        <Link href={all_routes.tourGrid}>Tour Packages</Link>
                      </li>
                      <li>
                        <Link href={all_routes.carGrid}>Car Rental</Link>
                      </li>
                      <li>
                        <Link href={all_routes.cruiseGrid}>Luxury Cruises</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5">
            <div
              className="footer-image"
              style={{
                backgroundImage: `url(${img_path}assets/img/bg/footer-nine-bg.jpg)`
              }}
            >
              <div className="footer-content">
                <h2>
                  Explore Beyond the Horizon: Discover the World’s Wonders
                </h2>
                <Link href="#" className="btn btn-primary">
                  <i className="isax isax-call-outgoing me-1" /> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <ImageWithBasePath src="./assets/img/bg/footer-nine-bg2.png" alt="img" />
    </div>
    {/* Footer Bottom */}
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="copy-right">
              <p>
                Copyright © 2026{" "}
                <Link href="#" className="fw-medium">
                  DreamsTour
                </Link>
                , All Rights Reserved
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
    <div id="scroll-progress" className="scroll-progress" ref={progressRef}>
       <span  id="progress-value" ref={valueRef}>{scrollValue}%</span>
    </div>
  </footer>
  {/* /Footer */}
</>

  )
}

export default ServiceTwoFooter