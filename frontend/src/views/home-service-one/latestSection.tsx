"use client";
import ImageWithBasePath from "../../components/image-with-base-path"
import Link from "next/link";
import AppSwiper from '../../components/app-swiper'


const LatestSection = () => {
  return (
    <>
  {/* article */}
  <section className="section article-section">
    <div className="container">
      <div className="section-header-eight wow fadeInUp">
        <h2>
          Latest Trending <br />{" "}
          <ImageWithBasePath src="./assets/img/bg/heading-bg-05.png" alt="img" /> Articles
          &amp; Insights
        </h2>
      </div>
      <div className="row row-gap-4 justify-content-center wow fadeInUp">
        <div className="col-lg-4 col-md-6">
          <div className="article-item">
            <div className="article-img">
              <Link href="#" tabIndex={0}>
                <ImageWithBasePath
                  src="assets/img/tours/tour-thumb-06.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </Link>
              <div className="article-content">
                <h3>
                  <Link href="#">
                    Essential Travel Tips to Plan Stress Free Trips...
                  </Link>
                </h3>
                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <span className="text-white fs-16">
                    <i className="isax isax-calendar" /> 15 Apr 2026
                  </span>
                  <Link
                    href="#"
                    className="badge badge-light text-dark rounded-pill p-2"
                  >
                    Travel Tips
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="article-item">
            <div className="article-img">
              <Link href="#" tabIndex={0}>
                <ImageWithBasePath
                  src="assets/img/tours/tour-thumb-07.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </Link>
              <div className="article-content">
                <h3>
                  <Link href="#">
                    Best Hotels and Unique Stays for Comfortable, Luxurious...
                  </Link>
                </h3>
                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <span className="text-white fs-16">
                    <i className="isax isax-calendar" /> 21 Mar 2026
                  </span>
                  <Link
                    href="#"
                    className="badge badge-light text-dark rounded-pill p-2"
                  >
                    Hotels &amp; Stays
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="article-item">
            <div className="article-img">
              <Link href="#" tabIndex={0}>
                <ImageWithBasePath
                  src="assets/img/tours/tour-thumb-08.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </Link>
              <div className="article-content">
                <h3>
                  <Link href="#">
                    Top Adventure Travel Experiences for Thrill Seekers
                    Across...
                  </Link>
                </h3>
                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <span className="text-white fs-16">
                    <i className="isax isax-calendar" /> 22 Feb 2026
                  </span>
                  <Link
                    href="#"
                    className="badge badge-light text-dark rounded-pill p-2"
                  >
                    Adventure Travel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* article */}
  <>
  {/* clients sections */}
  <div className="clients-sec-eight">
    <div className="container">
      <div >
         <AppSwiper preset="clients-slider">
        <div className="client-img">
          <ImageWithBasePath src="assets/img/clients/client-07.svg" alt="img" />
        </div>
        <div className="client-img">
          <ImageWithBasePath src="assets/img/clients/client-05.svg" alt="img" />
        </div>
        <div className="client-img">
          <ImageWithBasePath src="assets/img/clients/client-03.svg" alt="img" />
        </div>
        <div className="client-img">
          <ImageWithBasePath src="assets/img/clients/client-06.svg" alt="img" />
        </div>
        <div className="client-img">
          <ImageWithBasePath src="assets/img/clients/client-07.svg" alt="img" />
        </div>
        <div className="client-img">
          <ImageWithBasePath src="assets/img/clients/client-01.svg" alt="img" />
        </div>
        <div className="client-img">
          <ImageWithBasePath src="assets/img/clients/client-02.svg" alt="img" />
        </div>
        </AppSwiper>
      </div>
    </div>
  </div>
  {/* clients sections */}
</>

</>

  )
}

export default LatestSection