"use client";
import ImageWithBasePath from "../../components/image-with-base-path"
import { useRef,useLayoutEffect } from "react";
import {gsap} from "gsap";

const CustomerSupport = () => {
   const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const trailImages = container.querySelectorAll(".content-img");

      const HIDE_DELAY = 400;
      let mouseStopTimer: number;

      const hideTrail = () => {
        gsap.to(trailImages, {
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
        });
      };

      const showTrail = () => {
        gsap.to(trailImages, {
          opacity: 1,
          duration: 0.1,
        });
      };

      const handleMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        clearTimeout(mouseStopTimer);

        showTrail();

        gsap.to(trailImages, {
          x: x,
          y: y,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });

        mouseStopTimer = window.setTimeout(hideTrail, HIDE_DELAY);
      };

      container.addEventListener("mousemove", handleMove);
      container.addEventListener("mouseleave", hideTrail);
      container.addEventListener("mouseenter", showTrail);

      hideTrail();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
  {/* support */}
  <section className="support-section-nine">
    <div className="overflow-hidden">
      <div className="support-section-plane">
        <div
          className="horizontal-slide d-flex"
          data-direction="right"
          data-speed="slow"
        >
          <div className="slide-list d-flex">
            <div className="support-item">
              <h3>Personalized Itineraries</h3>
            </div>
            <div className="support-item">
              <h3>Comprehensive Planning</h3>
            </div>
            <div className="support-item">
              <h3>Expert Guidance</h3>
            </div>
            <div className="support-item">
              <h3>Local Experience</h3>
            </div>
            <div className="support-item">
              <h3>Customer Support</h3>
            </div>
            <div className="support-item">
              <h3>Sustainability Efforts</h3>
            </div>
            <div className="support-item">
              <h3>Multiple Regions</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="support-section-car bg-primary">
        <div
          className="horizontal-slide d-flex"
          data-direction="left"
          data-speed="slow"
        >
          <div className="slide-list d-flex">
            <div className="support-item">
              <h3>Personalized Itineraries</h3>
            </div>
            <div className="support-item">
              <h3>Comprehensive Planning</h3>
            </div>
            <div className="support-item">
              <h3>Expert Guidance</h3>
            </div>
            <div className="support-item">
              <h3>Local Experience</h3>
            </div>
            <div className="support-item">
              <h3>Customer Support</h3>
            </div>
            <div className="support-item">
              <h3>Sustainability Efforts</h3>
            </div>
            <div className="support-item">
              <h3>Multiple Regions</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="support-content" ref={containerRef}>
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="content-img" >
              <div className="content-img-single">
                <ImageWithBasePath
                  src="assets/img/tours/tours-71.jpg"
                  className="img-fluid"
                  alt="health"
                />
              </div>
            </div>
            <div className="content-img">
              <div className="content-img-single">
                <ImageWithBasePath
                  src="assets/img/tours/tours-72.jpg"
                  className="img-fluid"
                  alt="health"
                />
              </div>
            </div>
            <div className="content-img">
              <div className="content-img-single">
                <ImageWithBasePath
                  src="assets/img/tours/tours-73.jpg"
                  className="img-fluid"
                  alt="health"
                />
              </div>
            </div>
            <div className="support-content-text wow fadeInUp">
              <h2>
                DreamsTour offers various blog resources that cater to travel
                enthusiasts, with a focus on adventure, gear reviews, and travel
                tips.
              </h2>
            </div>
          </div>
          <div className="col-lg-8 mx-auto">
            <div className="row row-gap-4 align-items-center">
              <div className="col-lg-6">
                <div className="support-image wow zoomIn">
                  <ImageWithBasePath src="./assets/img/tours/tours-74.jpg" alt="img" />
                </div>
              </div>
              <div className="col-lg-6 ps-xl-5 wow fadeInUp">
                <div className="d-flex align-items-center gap-3 justify-content-center justify-content-lg-start">
                  <div className="text-white home-nine-title">Need Help?</div>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
                      <i className="ti ti-headphones-filled fs-24" />
                    </span>
                    <div className="ms-2">
                      <p className="fs-14 mb-0 text-gray-4">Customer Support</p>
                      <div className="fw-medium text-light">+1 56589 54598</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* support */}
</>

  )
}

export default CustomerSupport