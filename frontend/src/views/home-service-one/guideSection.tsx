"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";

const GuideSection = () => {
  return (
    <>
  {/* gudie section */}
  <section className="section guide-section">
    <div className="container">
      <div className="section-header-eight wow fadeInUp">
        <h2>
          Featured &amp; Expert <br />{" "}
          <ImageWithBasePath src="./assets/img/bg/heading-bg-04.png" alt="img" /> Guide For
          you{" "}
        </h2>
      </div>
      <div className="row row-gap-4">
        <div className="col-lg-3 col-md-6 wow fadeInUp">
          <div className="guide-list-item">
            <div className="guide-img">
              <Link href="#" tabIndex={0}>
                <ImageWithBasePath
                  src="assets/img/users/user-lg-35.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </Link>
              <Link href="#" className="loc-view-bottom">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="guide-content">
              <div className="home-eight-title text-dark mb-1">
                <Link href="#">Anthony Perez</Link>
              </div>
              <span>Chicago</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp">
          <div className="guide-list-item">
            <div className="guide-img">
              <Link href="#" tabIndex={0}>
                <ImageWithBasePath
                  src="assets/img/users/user-lg-36.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </Link>
              <Link href="#" className="loc-view-bottom">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="guide-content">
              <div className="home-eight-title text-dark mb-1">
                <Link href="#">Olivia Martinez</Link>
              </div>
              <span>Tokyo</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp">
          <div className="guide-list-item">
            <div className="guide-img">
              <Link href="#" tabIndex={0}>
                <ImageWithBasePath
                  src="assets/img/users/user-lg-37.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </Link>
              <Link href="#" className="loc-view-bottom">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="guide-content">
              <div className="home-eight-title text-dark mb-1">
                <Link href="#">Tyler Morgan</Link>
              </div>
              <span>Bangkok</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp">
          <div className="guide-list-item">
            <div className="guide-img">
              <Link href="#" tabIndex={0}>
                <ImageWithBasePath
                  src="assets/img/users/user-lg-38.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </Link>
              <Link href="#" className="loc-view-bottom">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="guide-content">
              <div className="home-eight-title text-dark mb-1">
                <Link href="#">Karen Perez</Link>
              </div>
              <span>Singapore</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 pt-2 wow fadeInUp">
        <Link href="#" className="btn btn-primary">
          View All Guides
          <i className="isax isax-arrow-right-3 ms-2" />
        </Link>
      </div>
    </div>
  </section>
  {/* gudie section */}
</>

  )
}

export default GuideSection