"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";

const GuideGrid = () => {


  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: "Guide",
      link: routes.allService1,
      active: false,
    },
    {
      label: "Our Guide",
      active: false,
    },
    {
      label: "Guide Grid",
      active: false,
    },
  ];
  return (
    <>
      <Breadcrumb
        title="Our Guide"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-09"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          {/* row start */}
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-01.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Micheal John</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-02.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Daiyanna leo</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-03.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>David Josebeb</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-04.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Campbell</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-05.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Ahmed nijaz</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-06.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Rachel hosey</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-07.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Ritu Varma</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-08.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Adam Hook</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-09.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Leslie Alexander</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-10.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Dianne Russell</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-11.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Albert Flores</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-12.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Kristin Watson</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-13.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Devon Lane</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-14.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Eleanor Pena</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-15.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Arlene McCoy</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card guide-card">
                <div className="card-body">
                  <div className="guide-img">
                    <Link href={routes.guideDetails}>
                      <ImageWithBasePath
                        src="assets/img/guide/guide-16.jpg"
                        alt="Img"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <h3>
                      <Link href={routes.guideDetails}>Aaron Williams</Link>
                    </h3>
                    <p>Tour Guide</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-facebook" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-x" />
                    </Link>
                    <Link href="#" className="media-btns me-2">
                      <i className="ti ti-brand-instagram" />
                    </Link>
                    <Link href="#" className="media-btns">
                      <i className="ti ti-brand-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-primary">
              Load More <i className="isax isax-arrow-right-3 ms-2" />
            </button>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  )
}

export default GuideGrid