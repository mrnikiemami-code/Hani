"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"


const AboutSection = () => {
  return (
    <>
  {/* who we are section */}
  <section className="section who-we-are-sec">
    <div className="container">
      <div className="row align-items-center row-gap-4">
        <div className="col-lg-6">
          <div className="section-header-eleven wow fadeInUp mb-4 text-start">
            <span className="section-title justify-content-start">
              <ImageWithBasePath
                src="./assets/img/icons/compass.svg"
                alt="compass"
                className="me-1"
              />
              Who are we
            </span>
            <h2>More Than Just Activities</h2>
          </div>
          <p className="mb-4 wow fadeInUp">
            We believe in creating immersive experiences that connect you with
            local culture, nature, and unforgettable moments. Every activity is
            carefully selected to ensure authenticity, safety, and the magic
            that makes travel truly special.From adrenaline-pumping adventures
            to peaceful cultural discoveries, we've got something for every type
            of traveler. Let us help you create memories that last a lifetime.
          </p>
          <Link href="#" className="btn btn-primary wow fadeInUp">
            Start Your Adventure
            <i className="isax isax-arrow-right-3 ms-2" />
          </Link>
        </div>
        <div className="col-lg-6">
          <div className="who-we-are-sec-right">
            <div className="row align-items-center">
              <div className="col-4">
                <div className="who-we-are-img wow zoomIn">
                  <ImageWithBasePath src="./assets/img/tours/tours-48.jpg" alt="img" />
                </div>
              </div>
              <div className="col-4">
                <div className="who-we-are-img wow zoomIn">
                  <ImageWithBasePath src="./assets/img/tours/tours-49.jpg" alt="img" />
                </div>
                <div className="who-we-are-img wow zoomIn">
                  <ImageWithBasePath src="./assets/img/tours/tours-50.jpg" alt="img" />
                </div>
              </div>
              <div className="col-4">
                <div className="who-we-are-img wow zoomIn">
                  <ImageWithBasePath src="./assets/img/tours/tours-51.jpg" alt="img" />
                </div>
                <div className="who-we-are-img wow zoomIn">
                  <ImageWithBasePath src="./assets/img/tours/tours-52.jpg" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* who we are section */}
</>

  )
}

export default AboutSection