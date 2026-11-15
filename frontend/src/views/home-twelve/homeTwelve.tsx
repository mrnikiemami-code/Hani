"use client";
import ImageWithBasePath from "../../components/image-with-base-path";
import DestinationSecttion from "./destinationSecttion";
import ActivitiesSection from "./activitiesSection";
import VisaTypes from "./visaTypes";
import TestimonialSection from "./testimonialSection";
import HomeTwelveFooter from "./homeTwelveFooter";
import Link from "next/link";
import { useBodyClass } from '../../hooks/useBodyClass'
import { all_routes } from "../../routes/all_routes";

const HomeTwelve = () => {


    useBodyClass('home-12')
  return (
    <>
  {/* Start Hero Section */}
  <section className="section hero-section-twelve">
        <div className="container">
      <div className="banner-tweleve">
        {/* start row  */}
        <div className="row">
          <div className="col-lg-7">
            <div
              className="banner-content wow fadeInDown"
              data-wow-delay="0.3"
              data-wow-duration="1s"
            >
              <div className="user-group">
                <div className="avatar-list-stacked">
                  <span className="avatar avatar-rounded">
                    <ImageWithBasePath
                      className="border border-white"
                      src="assets/img/users/user-01.jpg"
                      alt="img"
                    />
                  </span>
                  <span className="avatar avatar-rounded">
                    <ImageWithBasePath
                      className="border border-white"
                      src="assets/img/users/user-04.jpg"
                      alt="img"
                    />
                  </span>
                  <span className="avatar avatar-rounded">
                    <ImageWithBasePath
                      className="border border-white"
                      src="assets/img/users/user-06.jpg"
                      alt="img"
                    />
                  </span>
                  <span className="avatar avatar-rounded">
                    <ImageWithBasePath
                      className="border border-white"
                      src="assets/img/users/user-07.jpg"
                      alt="img"
                    />
                  </span>
                </div>
                <p>
                  200+ Visa Application has <br /> Booked on last 24 hours
                </p>
              </div>
              <div className="title">
                Expert
                <span className="line-img">{" "}Visa</span> <br />
                <span>Booking</span>
                {" "}for Every <br /> Destination
              </div>
              <p>
                Our visa specialists ensure accurate applications, timely
                submissions, and higher approval success for travelers,
                students, and professionals.
              </p>
              <Link href={all_routes.flightBooking} className="btn btn-primary">
                Explore All Services
              </Link>
            </div>
          </div>
          <div className="col-lg-5"></div>
        </div>
        {/* end row  */}
      </div>
    </div>
    {/* Slide aniamtion  */}
    <div
      className="horizontal-slide banner-slide d-flex wow fadeInDown"
      data-wow-delay="0.3"
      data-wow-duration="1s"
      data-direction="right"
      data-speed="slow"
    >
      <div className="slide-list d-flex">
        <div className="support-item">
          <h3>VISA BOOKING</h3>
        </div>
        <div className="support-item">
          <h3>VISA BOOKING</h3>
        </div>
        <div className="support-item">
          <h3>VISA BOOKING</h3>
        </div>
      </div>
    </div>
    <ImageWithBasePath
      src="assets/img/banner/banner-img-2.png"
      alt="banner"
      className="img-fluid flight-img wow zoomIn"
      data-wow-delay="0.3"
      data-wow-duration="1s"
    />
    <ImageWithBasePath
      src="assets/img/bg/banner-bg-13.png"
      alt="banner"
      className="img-fluid bg-img"
    />
  </section>
  {/* End Hero Section */}
  <DestinationSecttion/>
  <ActivitiesSection/>
  <VisaTypes/>
  <TestimonialSection/>
  <HomeTwelveFooter/>
</>

  )
}

export default HomeTwelve