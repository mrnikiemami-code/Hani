"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";

const ExperienceSection = () => {
  return (
    <>
      {/* destinations */}
      <section className="section destinations-sec">
        <div className="container">
          <div className="section-header-eight wow fadeInUp">
            <h2>
              Experience Iconic <br />{" "}
              <ImageWithBasePath
                src="./assets/img/bg/heading-bg-02.png"
                alt="img"
              />{" "}
              Destinations{" "}
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="location-wrap wow zoomIn">
                <Link href={all_routes.hotelGrid}>
                  <ImageWithBasePath
                    src="assets/img/destination/destination-48.jpg"
                    alt="Img"
                  />
                </Link>
                <div className="loc-name-bottom">
                  <h3 className="mb-1 home-eight-title">Denmark</h3>
                </div>
                <Link href={all_routes.hotelGrid} className="loc-view-bottom">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
              <div className="location-wrap wow zoomIn">
                <Link href={all_routes.hotelGrid}>
                  <ImageWithBasePath
                    src="assets/img/destination/destination-49.jpg"
                    alt="Img"
                  />
                </Link>
                <div className="loc-name-bottom">
                  <h3 className="mb-1 home-eight-title">Indonesia</h3>
                </div>
                <Link href={all_routes.hotelGrid} className="loc-view-bottom">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="location-wrap wow zoomIn">
                <Link href={all_routes.hotelGrid}>
                  <ImageWithBasePath
                    src="assets/img/destination/destination-50.jpg"
                    alt="Img"
                  />
                </Link>
                <div className="loc-name-bottom">
                  <h3 className="mb-1 home-eight-title">Romania</h3>
                </div>
                <Link href={all_routes.hotelGrid} className="loc-view-bottom">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="location-wrap wow zoomIn">
                <Link href={all_routes.hotelGrid}>
                  <ImageWithBasePath
                    src="assets/img/destination/destination-51.jpg"
                    alt="Img"
                  />
                </Link>
                <div className="loc-name-bottom">
                  <h3 className="mb-1 home-eight-title">Mexico</h3>
                </div>
                <Link href={all_routes.hotelGrid} className="loc-view-bottom">
                  <i className="isax isax-arrow-right-1" />
                </Link>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="location-wrap wow zoomIn">
                    <Link href={all_routes.hotelGrid}>
                      <ImageWithBasePath
                        src="assets/img/destination/destination-52.jpg"
                        alt="Img"
                      />
                    </Link>
                    <div className="loc-name-bottom">
                      <h3 className="mb-1 home-eight-title">Germany</h3>
                    </div>
                    <Link href={all_routes.hotelGrid} className="loc-view-bottom">
                      <i className="isax isax-arrow-right-1" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="location-wrap wow zoomIn">
                    <Link href={all_routes.hotelGrid}>
                      <ImageWithBasePath
                        src="assets/img/destination/destination-53.jpg"
                        alt="Img"
                      />
                    </Link>
                    <div className="loc-name-bottom">
                      <h3 className="mb-1 home-eight-title">Belgium</h3>
                    </div>
                    <Link href={all_routes.hotelGrid} className="loc-view-bottom">
                      <i className="isax isax-arrow-right-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2 wow fadeInUp">
            <Link href="#" className="btn btn-primary">
              View All Destinations
              <i className="isax isax-arrow-right-3 ms-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* destinations */}
    </>
  );
};

export default ExperienceSection;
