"use client";
import { Fragment } from "react";
import AppSwiper from "../../components/app-swiper";
import ImageWithBasePath from "../../components/image-with-base-path"
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import Link from "next/link";

const ActivitiesSection = () => {
     const [fav, setFav] = useState<boolean[]>([]);
     const handlefav = (i: number) => {
       setFav((prev) => {
         const updated = [...prev];
         updated[i] = !updated[i];
         return updated;
       });
     };
       const sectionRef = useRef<HTMLElement | null>(null);
       const [startCounter, setStartCounter] = useState(false);
       useEffect(() => {
         const observer = new IntersectionObserver(
           (entries) => {
             const entry = entries[0];
     
             if (entry.isIntersecting) {
               setStartCounter(true);
               observer.disconnect(); // run only once
             }
           },
           {
             threshold: 0.3, // 30% visible
           },
         );
     
         if (sectionRef.current) {
           observer.observe(sectionRef.current);
         }
     
         return () => {
           observer.disconnect();
         };
       }, []);
  return (
    <>
  {/* Start Activities Section */}
  <section className="section activities-section-twelve">
    <div className="container">
      <div
        className="section-header-twelve wow fadeInDown"
        data-wow-delay="0.3"
        data-wow-duration="1.5s"
      >
        <div className="subtitle">
          {" "}
          <ImageWithBasePath
            src="assets/img/icons/flight-icon-1.svg"
            alt="flight"
            className="img-fluid img-1"
          />{" "}
          Visa By Activities
        </div>
        <h2 className="section-title">
          {" "}
          Visas for Every <span>Journey</span>{" "}
        </h2>
      </div>
    </div>
    <div className="container-fluid">
      <AppSwiper preset="activities-slider-twelve">
        <Fragment>
          {/* Item 1 */}
        <div
          className="slide-item wow fadeInDown"
          data-wow-delay="0.3"
          data-wow-duration="1s"
        >
          <div className="activities-item-twelve">
            <div className="activities-overlay">
              <Link href="#">
                <ImageWithBasePath
                  src="assets/img/activities/activity-1.jpg"
                  alt="activity"
                  className="img-fluid img-1"
                />
              </Link>
              <div className="activities-badge">
                <button className={`fav-icon ${fav[1]?'selected':''}`}  onClick={()=>handlefav(1)}>
                  <i className="isax isax-heart5" />
                </button>
                <span className="badge d-inline-flex align-items-center">
                  Business Visa
                </span>
              </div>
            </div>
            <div className="activities-content">
              <p className="time">
                {" "}
                <i className="isax isax-clock" />
                2-4 Weeks{" "}
              </p>
              <h3 className="custom-title">
                <Link href="#">Electronic Visa for Tourism and Recreation</Link>
              </h3>
              <div className="mode">
                <p>Mode : Consular Visa</p>
                <i className="fa-solid fa-circle" />
                <p>Validity : 90 Days</p>
              </div>
              <div className="activities-footer">
                <p>
                  From <span className="price">$300</span> /Person
                </p>
                <p>
                  {" "}
                  <i className="isax isax-location5" /> USA
                </p>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
        <Fragment>
           {/* Item 2 */}
        <div
          className="slide-item wow fadeInDown"
          data-wow-delay="0.3"
          data-wow-duration="1.5s"
        >
          <div className="activities-item-twelve">
            <div className="activities-overlay">
              <Link href="#">
                <ImageWithBasePath
                  src="assets/img/activities/activity-2.jpg"
                  alt="activity"
                  className="img-fluid img-1"
                />
              </Link>
              <div className="activities-badge">
                <button className={`fav-icon ${fav[2]?'selected':''}`}  onClick={()=>handlefav(2)}>
                  <i className="isax isax-heart5" />
                </button>
                <span className="badge d-inline-flex align-items-center">
                  Student Visa
                </span>
              </div>
            </div>
            <div className="activities-content">
              <p className="time">
                {" "}
                <i className="isax isax-clock" />
                2-4 Weeks{" "}
              </p>
              <h3 className="custom-title">
                <Link href="#">Long term for Academic with Health Insurance</Link>
              </h3>
              <div className="mode">
                <p>Mode : Consular Visa</p>
                <i className="fa-solid fa-circle" />
                <p>Validity : 1 Year</p>
              </div>
              <div className="activities-footer">
                <p>
                  From <span className="price">$300</span> /Person
                </p>
                <p>
                  {" "}
                  <i className="isax isax-location5" /> Egypt
                </p>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
        <Fragment>
            {/* Item 3 */}
        <div
          className="slide-item wow fadeInDown"
          data-wow-delay="0.3"
          data-wow-duration="2s"
        >
          <div className="activities-item-twelve">
            <div className="activities-overlay">
              <Link href="#">
                <ImageWithBasePath
                  src="assets/img/activities/activity-3.jpg"
                  alt="activity"
                  className="img-fluid img-1"
                />
              </Link>
              <div className="activities-badge">
                <button className={`fav-icon ${fav[3]?'selected':''}`}  onClick={()=>handlefav(3)}>
                  <i className="isax isax-heart5" />
                </button>
                <span className="badge d-inline-flex align-items-center">
                  Work Visa
                </span>
              </div>
            </div>
            <div className="activities-content">
              <p className="time">
                {" "}
                <i className="isax isax-clock" />
                15-20 Working Days
              </p>
              <h3 className="custom-title">
                <Link href="#">Work Visa for Employment Opportunities</Link>
              </h3>
              <div className="mode">
                <p>Mode : Paper</p>
                <i className="fa-solid fa-circle" />
                <p>Validity : 2 Years</p>
              </div>
              <div className="activities-footer">
                <p>
                  From <span className="price">$800</span> /Person
                </p>
                <p>
                  {" "}
                  <i className="isax isax-location5" /> Spain
                </p>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
        <Fragment>
          {/* Item 4 */}
        <div
          className="slide-item wow fadeInDown"
          data-wow-delay="0.3"
          data-wow-duration="2.5s"
        >
          <div className="activities-item-twelve">
            <div className="activities-overlay">
              <Link href="#">
                <ImageWithBasePath
                  src="assets/img/activities/activity-4.jpg"
                  alt="activity"
                  className="img-fluid img-1"
                />
              </Link>
              <div className="activities-badge">
                <button className={`fav-icon ${fav[6]?'selected':''}`}  onClick={()=>handlefav(6)}>
                  <i className="isax isax-heart5" />
                </button>
                <span className="badge d-inline-flex align-items-center">
                  Transit Visa
                </span>
              </div>
            </div>
            <div className="activities-content">
              <p className="time">
                {" "}
                <i className="isax isax-clock" />
                3-5 Working Days{" "}
              </p>
              <h3 className="custom-title">
                <Link href="#">Short term Visa for Travelers with Layovers</Link>
              </h3>
              <div className="mode">
                <p>Mode : Electronic</p>
                <i className="fa-solid fa-circle" />
                <p>Validity : 72 Hours</p>
              </div>
              <div className="activities-footer">
                <p>
                  From <span className="price">$100</span> /Person
                </p>
                <p>
                  {" "}
                  <i className="isax isax-location5" /> Qatar
                </p>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
        <Fragment>
           {/* Item 5 */}
        <div
          className="slide-item wow fadeInDown"
          data-wow-delay="0.3"
          data-wow-duration="3s"
        >
          <div className="activities-item-twelve">
            <div className="activities-overlay">
              <Link href="#">
                <ImageWithBasePath
                  src="assets/img/activities/activity-5.jpg"
                  alt="activity"
                  className="img-fluid img-1"
                />
              </Link>
              <div className="activities-badge">
                <button className={`fav-icon ${fav[4]?'selected':''}`}  onClick={()=>handlefav(4)}>
                  <i className="isax isax-heart5" />
                </button>
                <span className="badge d-inline-flex align-items-center">
                  Family Reunion Visa
                </span>
              </div>
            </div>
            <div className="activities-content">
              <p className="time">
                {" "}
                <i className="isax isax-clock" />
                8-12 Working Days{" "}
              </p>
              <h3 className="custom-title">
                <Link href="#">Family Members to Join Our Relatives</Link>
              </h3>
              <div className="mode">
                <p>Mode : Paper</p>
                <i className="fa-solid fa-circle" />
                <p>Validity : 1 Year</p>
              </div>
              <div className="activities-footer">
                <p>
                  From <span className="price">$600</span> /Person
                </p>
                <p>
                  {" "}
                  <i className="isax isax-location5" /> Spain
                </p>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
        <Fragment>
         {/* Item 6 */}
        <div className="slide-item">
          <div className="activities-item-twelve">
            <div className="activities-overlay">
              <Link href="#">
                <ImageWithBasePath
                  src="assets/img/activities/activity-6.jpg"
                  alt="activity"
                  className="img-fluid img-1"
                />
              </Link>
              <div className="activities-badge">
                <button className={`fav-icon ${fav[5]?'selected':''}`}  onClick={()=>handlefav(5)}>
                  <i className="isax isax-heart5" />
                </button>
                <span className="badge d-inline-flex align-items-center">
                  Tourist Visa
                </span>
              </div>
            </div>
            <div className="activities-content">
              <p className="time">
                {" "}
                <i className="isax isax-clock" />
                10-15 Working Days{" "}
              </p>
              <h3 className="custom-title">
                <Link href="#">Cultural Programs and Exchanges</Link>
              </h3>
              <div className="mode">
                <p>Mode : Electronic</p>
                <i className="fa-solid fa-circle" />
                <p>Validity : 1 Year</p>
              </div>
              <div className="activities-footer">
                <p>
                  From <span className="price">$400</span> /Person
                </p>
                <p>
                  {" "}
                  <i className="isax isax-location5" /> USA
                </p>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
      </AppSwiper>
      <div className="arrow-item wow fadeInDown" data-wow-delay="1.5">
        <button type="button" className="slick-arrow activities-twelve-prev">
          <i className="isax isax-arrow-left-2" />
        </button>
        <button type="button" className="slick-arrow activities-twelve-next">
          <i className="isax isax-arrow-right-3" />
        </button>
      </div>
    </div>
  </section>
  {/* End Activities Section */}

  {/* Start Statistics Section */}
  <section className="section stat-section-twelve"  ref={sectionRef}>
    <div className="container">
      <div
        className="section-header-twelve wow fadeInDown"
        data-wow-delay="0.3"
        data-wow-duration="1.5s"
      >
        <div className="subtitle">
          {" "}
          <ImageWithBasePath
            src="assets/img/icons/flight-icon-1.svg"
            alt="flight"
            className="img-fluid img-1"
          />{" "}
          Working Process{" "}
        </div>
        <h2 className="section-title text-white">
          {" "}
          Checkout How our System Works
        </h2>
      </div>
      <div className="row row-gap-4">
        <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center position-relative">
          <div
            className="counter-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1s"
          >
            <div className="card-body">
              <h3 className="count">
                {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={50}
                          duration={5}
                          className="counter"
                        />
                      </>
                    )}
              </h3>
              <p>Apply Online</p>
            </div>
          </div>
          <ImageWithBasePath
            src="assets/img/icons/flight-icon-2.svg"
            alt="flight"
            className="icon-1 d-none d-md-block"
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center position-relative">
          <div
            className="counter-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="1.5s"
          >
            <div className="card-body">
              <h3 className="count">
                {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={48}
                          duration={5}
                          className="counter"
                        />
                      </>
                    )}
              </h3>
              <p>Get an Appointment</p>
            </div>
          </div>
          <ImageWithBasePath
            src="assets/img/icons/flight-icon-2.svg"
            alt="flight"
            className="icon-1 d-none d-lg-block"
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center position-relative">
          <div
            className="counter-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2s"
          >
            <div className="card-body">
              <h3 className="count">
                {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={45}
                          duration={5}
                          className="counter"
                        />
                      </>
                    )}
              </h3>
              <p>Submit Documents</p>
            </div>
          </div>
          <ImageWithBasePath
            src="assets/img/icons/flight-icon-2.svg"
            alt="flight"
            className="icon-1 d-none d-md-block"
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center position-relative">
          <div
            className="counter-item-twelve wow fadeInDown"
            data-wow-delay="0.3"
            data-wow-duration="2.5s"
          >
            <div className="card-body">
              <h3 className="count">
                {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={45}
                          duration={5}
                          className="counter"
                        />
                      </>
                    )}
              </h3>
              <p>Receive Visa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ImageWithBasePath
      src="assets/img/bg/stat-twelve-bg.png"
      alt="bg"
      className="element-1"
    />
  </section>
  {/* End Statistics Section */}


</>

  )
}

export default ActivitiesSection