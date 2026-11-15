"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"


const PopularSection = () => {
  return (
    <>
  {/* experience section */}
  <section className="section experience-section">
    <div className="container">
      <div className="section-header-eleven wow fadeInUp">
        <span className="section-title">
          <ImageWithBasePath
            src="./assets/img/icons/compass.svg"
            alt="compass"
            className="me-1"
          />
          Popular Experiences
        </span>
        <h2>Trending adventures travelers love</h2>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="experience-item wow fadeInUp" data-wow-delay="0.3s">
            <div className="experience-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-43.jpg" alt="img" />
              </Link>
            </div>
            <div className="experience-content d-flex align-items-center justify-content-between gap-3">
              <div>
                <h3 className="home-eleven-title mb-1">
                  <Link href="#">Scuba Diving</Link>
                </h3>
                <span className="text-gray-6">
                  <i className="isax isax-location5 me-1 text-gray-2" />
                  Abu Dhabi, UAE
                </span>
              </div>
              <Link href="#" className="experience-view-button">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="rating text-dark fs-14 fw-medium">
              <ImageWithBasePath
                src="./assets/img/icons/star.svg"
                alt="star"
                className="me-1"
              />
              4.96
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="experience-item wow fadeInUp" data-wow-delay="0.3s">
            <div className="experience-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-44.jpg" alt="img" />
              </Link>
            </div>
            <div className="experience-content d-flex align-items-center justify-content-between gap-3">
              <div>
                <h3 className="home-eleven-title mb-1">
                  <Link href="#">Hot Air Ballon</Link>
                </h3>
                <span className="text-gray-6">
                  <i className="isax isax-location5 me-1 text-gray-2" />
                  Japan
                </span>
              </div>
              <Link href="#" className="experience-view-button">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="rating text-dark fs-14 fw-medium">
              <ImageWithBasePath
                src="./assets/img/icons/star.svg"
                alt="star"
                className="me-1"
              />
              4.30
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="experience-item wow fadeInUp" data-wow-delay="0.3s">
            <div className="experience-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-45.jpg" alt="img" />
              </Link>
            </div>
            <div className="experience-content d-flex align-items-center justify-content-between gap-3">
              <div>
                <h3 className="home-eleven-title mb-1">
                  <Link href="#">Family Park Adventure</Link>
                </h3>
                <span className="text-gray-6">
                  <i className="isax isax-location5 me-1 text-gray-2" />
                  Canada
                </span>
              </div>
              <Link href="#" className="experience-view-button">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="rating text-dark fs-14 fw-medium">
              <ImageWithBasePath
                src="./assets/img/icons/star.svg"
                alt="star"
                className="me-1"
              />
              4.96
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="experience-item wow fadeInUp" data-wow-delay="0.3s">
            <div className="experience-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-46.jpg" alt="img" />
              </Link>
            </div>
            <div className="experience-content d-flex align-items-center justify-content-between gap-3">
              <div>
                <h3 className="home-eleven-title mb-1">
                  <Link href="#">Mountain Climbing</Link>
                </h3>
                <span className="text-gray-6">
                  <i className="isax isax-location5 me-1 text-gray-2" />
                  Bali, Indonesia
                </span>
              </div>
              <Link href="#" className="experience-view-button">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="rating text-dark fs-14 fw-medium">
              <ImageWithBasePath
                src="./assets/img/icons/star.svg"
                alt="star"
                className="me-1"
              />
              4.96
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="experience-item wow fadeInUp" data-wow-delay="0.3s">
            <div className="experience-img">
              <Link href="#">
                <ImageWithBasePath src="./assets/img/tours/tours-47.jpg" alt="img" />
              </Link>
            </div>
            <div className="experience-content d-flex align-items-center justify-content-between gap-3">
              <div>
                <h3 className="home-eleven-title mb-1">
                  <Link href="#">Sky Dive</Link>
                </h3>
                <span className="text-gray-6">
                  <i className="isax isax-location5 me-1 text-gray-2" />
                  Dubai, UAE
                </span>
              </div>
              <Link href="#" className="experience-view-button">
                <i className="isax isax-arrow-right-1" />
              </Link>
            </div>
            <div className="rating text-dark fs-14 fw-medium">
              <ImageWithBasePath
                src="./assets/img/icons/star.svg"
                alt="star"
                className="me-1"
              />
              4.96
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* experience section */}
</>

  )
}

export default PopularSection