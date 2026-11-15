"use client";


const ChooseSection = () => {
  return (
    <>
  {/* why choose */}
  <section className="section why-choose-sec">
    <div className="container">
      <div className="section-header-eight wow fadeInUp">
        <h2>Why Choose Us</h2>
      </div>
      <div className="row row-gap-4 wow fadeInUp">
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="why-choose-item w-100">
            <span className="avatar avatar-xl bg-primary rounded-circle flex-shrink-0 mb-3">
              <i className="isax isax-map5 fs-24" />
            </span>
            <div className="text-white mb-2 home-eight-title">
              Exceptional Service
            </div>
            <p className="mb-0 text-white">
              Our dedicated team prioritizes your comfort and satisfaction,
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="why-choose-item w-100">
            <span className="avatar avatar-xl bg-info rounded-circle flex-shrink-0 mb-3">
              <i className="isax isax-location-tick5 fs-24" />
            </span>
            <div className="text-white mb-2 home-eight-title">
              Prime Locations
            </div>
            <p className="mb-0 text-white">
              Enjoy easy access to local attractions, dining, entertainment.
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="why-choose-item w-100">
            <span className="avatar avatar-xl bg-cyan rounded-circle flex-shrink-0 mb-3">
              <i className="isax isax-ticket-star5 fs-24" />
            </span>
            <div className="text-white mb-2 home-eight-title">
              Quality Accommodations
            </div>
            <p className="mb-0 text-white">
              Our rooms and facilities are designed with your needs in mind.
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="why-choose-item w-100">
            <span className="avatar avatar-xl bg-teal rounded-circle flex-shrink-0 mb-3">
              <i className="isax isax-timer-15 fs-24" />
            </span>
            <div className="text-white mb-2 home-eight-title">
              Personalized Experience
            </div>
            <p className="mb-0 text-white">
              We tailor our services to meet your preferences, making your stay.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="why-choose-explore overflow-hidden">
      <div
        className="horizontal-slide d-flex"
        data-direction="right"
        data-speed="slow"
      >
        <div className="slide-list d-flex">
          <div className="support-item">
            <h3>Explore</h3>
          </div>
          <div className="support-item">
            <h3>Experience</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* why choose */}
</>

  )
}

export default ChooseSection