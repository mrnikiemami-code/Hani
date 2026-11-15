"use client";
import { useEffect, useRef, useState } from "react";
import ImageWithBasePath from "../../components/image-with-base-path";
import CountUp from "react-countup";
const DeliverySection = () => {
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
      {/* deliver section */}
      <section className="deliver-sec" ref={sectionRef}>
        <div className="container">
          <div className="row row-gap-4 align-items-center mb-4">
            <div className="col-lg-6">
              <div className="section-header-eight mb-0 text-start wow fadeInUp">
                <h2>Thoughtfully planned journeys, delivered end to end</h2>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp">
              <span>
                For over two decades we have built trips around the people
                taking them. Every flight, stay, transfer and guided experience
                is booked through partners we have vetted ourselves, so the
                itinerary you see is the trip you get.
              </span>
              <div className="d-flex align-items-center mt-4 flex-wrap">
                <div className="avatar-list-stacked avatar-group-md me-2">
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
                <div>
                  <p className="fs-16 mb-0 text-dark">
                    More than 4.9K clients reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-gap-4">
            <div className="col-lg-6 d-flex">
              <div className="deliver-img d-flex w-100 wow zoomIn">
                <ImageWithBasePath
                  src="assets/img/tours/tours-36.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-lg-3 d-flex">
              <div className="deliver-img d-flex w-100 wow zoomIn">
                <ImageWithBasePath
                  src="assets/img/tours/tours-37.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-lg-3 d-flex">
              <div className="deliver-img d-flex w-100 wow zoomIn">
                <ImageWithBasePath
                  src="assets/img/tours/tours-38.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="statistics-sec wow fadeInUp">
            <div className="row row-gap-4">
              <div className="col-xl-3 col-md-6">
                <div className="statistics-count">
                  <div className="text-white mb-1 fs-18 fw-normal">
                    Providers Registered
                  </div>
                  <h3>
                    {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={12}
                          duration={5}
                          className="counter"
                        />
                        +
                      </>
                    )}
                  </h3>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="statistics-count">
                  <div className="text-white mb-1 fs-18 fw-normal">
                    Clients Globally
                  </div>
                  <h3>
                    {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={15000}
                          duration={5}
                          className="counter"
                        />
                        +
                      </>
                    )}
                  </h3>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="statistics-count">
                  <div className="text-white mb-1 fs-18 fw-normal">
                    Destinations Worldwide
                  </div>
                  <h3>
                    {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={98}
                          duration={5}
                          className="counter"
                        />
                        +
                      </>
                    )}
                  </h3>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="statistics-count">
                  <div className="text-white mb-1 fs-18 fw-normal">
                    Services
                  </div>
                  <h3>
                    {startCounter && (
                      <>
                        <CountUp
                          start={0}
                          end={20}
                          duration={5}
                          className="counter"
                        />
                        +
                      </>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* deliver section */}
    </>
  );
};

export default DeliverySection;
