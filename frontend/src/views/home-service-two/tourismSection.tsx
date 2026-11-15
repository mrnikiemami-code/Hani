"use client";

import ImageWithBasePath from '../../components/image-with-base-path'

const TourismSection = () => {
  return (
    <>
  {/* tourism */}
  <section className="tourism-sec">
    <ImageWithBasePath src="./assets/img/icons/cloud.svg" alt="img" className="tourism-bg1" />
    <ImageWithBasePath
      src="./assets/img/icons/cloud-2.svg"
      alt="img"
      className="tourism-bg2"
    />
    <div className="container">
      <div
        className="section-head-nine text-center wow fadeInUp"
        style={{ visibility: "visible", animationName: "fadeInUp" }}
      >
        <h2 className="text-white">
          Advantages of Our <span>Tourism</span> Platform
        </h2>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="tourism-item wow fadeInUp">
            <div className="tourism-icon">
              <ImageWithBasePath src="./assets/img/icons/tourism-icon1.svg" alt="img" />
            </div>
            <div className="tourism-content">
              <h3 className="home-nine-title">Powerful Smart Search</h3>
              <p>
                Get instant, personalized travel results using intelligent
                filters, dynamic pricing.
              </p>
            </div>
          </div>
          <div className="tourism-item wow fadeInUp">
            <div className="tourism-icon">
              <ImageWithBasePath src="./assets/img/icons/tourism-icon2.svg" alt="img" />
            </div>
            <div className="tourism-content">
              <h3 className="home-nine-title">Curated Experiences</h3>
              <p>
                Handpicked destinations, activities, and guided tours designed
                by travel experts.
              </p>
            </div>
          </div>
          <div className="tourism-item wow fadeInUp">
            <div className="tourism-icon">
              <ImageWithBasePath src="./assets/img/icons/tourism-icon3.svg" alt="img" />
            </div>
            <div className="tourism-content">
              <h3 className="home-nine-title">Best Price Guarantee</h3>
              <p>
                Compare multiple providers instantly to secure the best travel
                deals.
              </p>
            </div>
          </div>
          <div className="tourism-item wow fadeInUp">
            <div className="tourism-icon">
              <ImageWithBasePath src="./assets/img/icons/tourism-icon4.svg" alt="img" />
            </div>
            <div className="tourism-content">
              <h3 className="home-nine-title">Global Coverage</h3>
              <p>
                Access travel across 150+ countries, flights, hotels, cruises,
                local experiences.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="tourism-img wow zoomIn">
            <ImageWithBasePath src="./assets/img/tours/tours-70.png" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* tourism */}
</>

  )
}

export default TourismSection