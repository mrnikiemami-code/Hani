"use client";

import Link from "next/link";
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../components/image-with-base-path';
import { useState } from 'react';


const RecentlyViewed = () => {
  const routes = all_routes
  const [fav, setFav] = useState<boolean[]>([]);
  const handleFav = (i: number) => {
    setFav((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    })
  }
  const breadcrumbs = [
    {
      label: 'Recently Viewed',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Pages',
      active: false,
    },
    {
      label: 'Recently Viewed',
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumb title="Recently Viewed" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <ul className="nav recent-tabs">
            <li>
              <Link
                href="#"
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#tab-1"
              >
                Tours
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#tab-2"
              >
                Flights
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#tab-3"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#tab-4"
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#tab-5"
              >
                Cruise
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#tab-6"
              >
                Activity
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#tab-7"
              >
                Visa
              </Link>
            </li>
          </ul>
          {/* Tab Content */}
          <div className="tab-content wow fadeInUp">
            {/* Tours Tab */}
            <div className="tab-pane fade active show" id="tab-1">
              <div className="row row-gap-4 justify-content-center">
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[10] ? '' : 'selected'}`} onClick={() => handleFav(10)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9">Ecotourism</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            5.0
                          </span>
                          <p className="fs-14">(105 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Rainbow Mountain Valley</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $500
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $789
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">4 Day,3 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            14 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            <ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[11] ? 'selected' : ''}`} onClick={() => handleFav(11)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Adventure Tour
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.7
                          </span>
                          <p className="fs-14">(110 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Mystic Falls</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $600
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $700
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3 Day, 2 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            12 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            < ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[12] ? 'selected' : ''}`} onClick={() => handleFav(12)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Summer Trip
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.7
                          </span>
                          <p className="fs-14">(180 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Crystal Lake</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $300
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $500
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">5 Day, 4 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            16 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            < ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[13] ? 'selected' : ''}`} onClick={() => handleFav(13)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Adventure Tour
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.9
                          </span>
                          <p className="fs-14">(300 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Majestic Peaks</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Deansgate, Manchester
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $400
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $480
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3 Day, 2 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            10 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            < ImageWithBasePath
                              src="assets/img/users/user-11.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[14] ? 'selected' : ''}`} onClick={() => handleFav(14)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Group Tours
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.3
                          </span>
                          <p className="fs-14">(250 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Enchanted Forest</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        King’s Road, Chelsea
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $550
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $600
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">2 Day, 1 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            17 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            < ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-12.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[15] ? 'selected' : ''}`} onClick={() => handleFav(15)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Beach Tours
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.1
                          </span>
                          <p className="fs-14">(280 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Serene Bay</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Bold Street, Liverpool
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $450
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $520
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3 D2 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            08 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            < ImageWithBasePath
                              src="assets/img/users/user-13.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-13.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[16] ? 'selected' : ''}`} onClick={() => handleFav(16)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Historical Tours
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.6
                          </span>
                          <p className="fs-14">(400 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Ancient Ruins</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Broad Street, Bristol
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $350
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $400
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">2 Day, 1 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            10 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            < ImageWithBasePath
                              src="assets/img/users/user-14.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.tourDetails}>
                            < ImageWithBasePath
                              src="assets/img/tours/tours-14.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[17] ? 'selected' : ''}`} onClick={() => handleFav(17)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>
                          <p className="fs-14 text-gray-9 text-truncate">
                            Adventure Tour
                          </p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            4.2
                          </span>
                          <p className="fs-14">(350 Reviews)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.tourDetails}>Mystical Caves</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Chapel Street, Salford
                      </p>
                      <div className="mb-3">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $700
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $800
                          </span>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-calendar-tick text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3 Day, 2 Night</p>
                        </div>
                        <span className="d-inline-block border vertical-splits">
                          <span className="bglight text-light d-flex align-items-center justify-content-center" />
                        </span>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                            <i className="isax isax-profile-2user me-1" />
                            14 Guests
                          </p>
                          <Link href="#" className="avatar avatar-sm ms-3">
                            < ImageWithBasePath
                              src="assets/img/users/user-15.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
              </div>
            </div>
            {/* Flights Tab */}
            <div className="tab-pane fade" id="tab-2">
              <div className="row row-gap-4 justify-content-center">
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide ">
                        <div className="slide-images">
                          <Link href={all_routes.flightDetails}>
                            < ImageWithBasePath
                              src="assets/img/flight/flight-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon me-2 ${fav[8] ? '' : 'selected'}`} onClick={() => handleFav(8)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          5.0
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          New York
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Sydney
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>Skybridge 191</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Air India</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at Texas
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Aug 01, 2024 - Aug 03, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $500
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            20 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        < ImageWithBasePath
                          src="assets/img/flight/flight-08.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon border-0 me-2 ${fav[50] ? 'selected' : ''}`} onClick={() => handleFav(50)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          4.3
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          London
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          London
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>SkyBound 102</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Indigo</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at Dubai
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Aug 13, 2024 - Aug 15, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $600
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            18 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        < ImageWithBasePath
                          src="assets/img/flight/flight-06.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon border-0 me-2 ${fav[53] ? 'selected' : ''}`} onClick={() => handleFav(53)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          4.8
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Paris
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Cape Town
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>Nimbus 345</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Indigo</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at Dubai
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Aug 26, 2024 - Aug 27, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $300
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            27 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        < ImageWithBasePath
                          src="assets/img/flight/flight-01.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon border-0 me-2 ${fav[54] ? 'selected' : ''}`} onClick={() => handleFav(54)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          4.3
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Toronto
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Bangkok
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>AstraFlight 215</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Indigo</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at Frankfurt
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Sep 04, 2024 - Sep 07, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $300
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            27 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-11.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide ">
                        <div className="slide-images">
                          <Link href={all_routes.flightDetails}>
                            < ImageWithBasePath
                              src="assets/img/flight/flight-02.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon border-0 me-2 ${fav[55] ? 'selected' : ''}`} onClick={() => handleFav(55)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          4.7
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Chicago
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Melbourne
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>Cloudrider 789</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Air India</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at Dallas
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Sep 11, 2024 - Sep 13, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $550
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            14 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.flightDetails}>
                        < ImageWithBasePath
                          src="assets/img/flight/flight-03.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon border-0 me-2 ${fav[56] ? 'selected' : ''}`} onClick={() => handleFav(56)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          4.5
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Miami
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Tokyo
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>Aether Express 901</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Indigo</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at Seoul
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Sep 22, 2024 - Sep 24, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $450
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            12 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-13.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide ">
                        <div className="slide-images">
                          <Link href={all_routes.flightDetails}>
                            < ImageWithBasePath
                              src="assets/img/flight/flight-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon border-0 me-2 ${fav[57] ? 'selected' : ''}`} onClick={() => handleFav(57)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          4.6
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Frankfurt
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Auckland
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>Voyager 658</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Air India</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at Sydney
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Oct 04, 2024 - Oct 07, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $350
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            21 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-14.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
                {/* Flight Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide ">
                        <div className="slide-images">
                          <Link href={all_routes.flightDetails}>
                            < ImageWithBasePath
                              src="assets/img/flight/flight-04.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <div className="d-flex align-items-center">
                          <Link href="#" className={`fav-icon border-0 me-2 ${fav[52] ? 'selected' : ''}`} onClick={() => handleFav(52)}>
                            <i className="isax isax-heart5" />
                          </Link>
                          <span className="badge bg-indigo">Cheapest</span>
                        </div>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">
                          4.9
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="flight-loc d-flex align-items-center justify-content-between mb-2">
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-45 me-2" />
                          Boston
                        </span>
                        <Link href="#" className="arrow-icon flex-shrink-0">
                          <i className="isax isax-arrow-2" />
                        </Link>
                        <span className="loc-name d-inline-flex align-items-center">
                          <i className="isax isax-airplane rotate-135 me-2" />
                          Singapore
                        </span>
                      </div>
                      <h5 className="text-truncate mb-1">
                        <Link href={all_routes.flightDetails}>Silverwing 505</Link>
                      </h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="avatar avatar-sm me-2">
                          < ImageWithBasePath
                            src="assets/img/icons/airindia.svg"
                            className="rounded-circle"
                            alt="icon"
                          />
                        </span>
                        <p className="fs-14 mb-0 me-2">Air India</p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          1-stop at London
                        </p>
                      </div>
                      <div className="date-info p-2 mb-3">
                        <p className="d-flex align-items-center">
                          <i className="isax isax-calendar-2 me-2" />
                          Oct 17, 2024 - Oct 19, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="text-primary">
                          <span className="fs-14 fw-normal text-default">From</span>
                          $700
                        </h6>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-outline-success fs-10 fw-medium me-2">
                            18 Seats Left
                          </span>
                          <Link href="#" className="avatar avatar-sm">
                            < ImageWithBasePath
                              src="assets/img/users/user-15.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Flight Grid */}
              </div>
            </div>
            {/* Hotels Tab */}
            <div className="tab-pane fade" id="tab-3">
              <div className="row  row-gap-4 justify-content-center">
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.hotelDetails}>
                            < ImageWithBasePath
                              src="assets/img/hotels/hotel-01.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[1] ? '' : 'selected'}`} onClick={() => handleFav(1)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          5.0
                        </span>
                        <p className="fs-14">(400 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>Hotel Miravent Barcelona</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Beth Will</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.hotelDetails}>
                        < ImageWithBasePath
                          src="assets/img/hotels/hotel-05.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[18] ? 'selected' : ''}`} onClick={() => handleFav(18)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.7
                        </span>
                        <p className="fs-14">(360 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>The Luxe Haven</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $600{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Andrews</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.hotelDetails}>
                        < ImageWithBasePath
                          src="assets/img/hotels/hotel-06.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[19] ? 'selected' : ''}`} onClick={() => handleFav(20)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.5
                        </span>
                        <p className="fs-14">(500 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>The Urban Retreat</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Robert</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.hotelDetails}>
                            < ImageWithBasePath
                              src="assets/img/hotels/hotel-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[2] ? '' : 'selected'}`} onClick={() => handleFav(2)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.3
                        </span>
                        <p className="fs-14">(380 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>Hotel Evergreen </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        King’s Road, Chelsea
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $550{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Timothy</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.hotelDetails}>
                        < ImageWithBasePath
                          src="assets/img/hotels/hotel-09.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[21] ? 'selected' : ''}`} onClick={() => handleFav(21)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.1
                        </span>
                        <p className="fs-14">(270 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>Stardust Hotel</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Bold Street, Liverpool
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $450{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-14.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Mark Arrin</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.hotelDetails}>
                            < ImageWithBasePath
                              src="assets/img/hotels/hotel-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[22] ? 'selected' : ''}`} onClick={() => handleFav(22)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.6
                        </span>
                        <p className="fs-14">(650 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>Hotel Serene Valley</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Broad Street, Bristol
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $350{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-15.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Brent Hole</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.hotelDetails}>
                            < ImageWithBasePath
                              src="assets/img/hotels/hotel-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[3] ? '' : 'selected'}`} onClick={() => handleFav(3)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.2
                        </span>
                        <p className="fs-14">(550 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>Hotel Skyline Vista</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Chapel Street, Salford
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $700{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-16.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate">John James</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
                {/* Hotel Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.hotelDetails}>
                            < ImageWithBasePath
                              src="assets/img/hotels/hotel-12.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                        <Link href="#" className={`fav-icon ${fav[23] ? 'selected' : ''}`} onClick={() => handleFav(23)}>
                          <i className="isax isax-heart5" />
                        </Link>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          4.8
                        </span>
                        <p className="fs-14">(700 Reviews)</p>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.hotelDetails}>Hotel Aurora Bliss</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-2">
                        <i className="isax isax-location5 me-2" />
                        Castle Street, Cambridge
                      </p>
                      <div className="border-top pt-2 mb-2">
                        <h6 className="d-flex align-items-center">
                          Facillities :
                          <i className="isax isax-home-wifi ms-2 me-2 text-primary" />
                          <i className="isax isax-scissor me-2 text-primary" />
                          <i className="isax isax-profile-2user me-2 text-primary" />
                          <i className="isax isax-wind-2 me-2 text-primary" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap me-2">
                          $650{" "}
                          <span className="fs-14 fw-normal text-default">
                            / Night
                          </span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-01.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14">Ronald</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hotel Grid */}
              </div>
            </div>
            {/* Cars Tab */}
            <div className="tab-pane fade" id="tab-4">
              <div className="row  row-gap-4 justify-content-center">
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[4] ? '' : 'selected'}`} onClick={() => handleFav(4)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-08.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Toyota Camry SE 400</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Hybrid</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Manual</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">14,000 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $500{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              5.0
                            </span>
                            <p className="fs-14">(400 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[24] ? 'selected' : ''}`} onClick={() => handleFav(24)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-09.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Ford Mustang 4.0 AT</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Diesel</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Manual</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">10,300 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $600{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.7
                            </span>
                            <p className="fs-14">(300 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[25] ? 'selected' : ''}`} onClick={() => handleFav(25)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-10.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Ferrari 458 MM Special</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Hybrid</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Auto</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">13,000 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $300{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.0
                            </span>
                            <p className="fs-14">(320 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-09.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[26] ? 'selected' : ''}`} onClick={() => handleFav(26)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-11.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Mercedes-benz Convertible</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Hybrid</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Auto</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">10,000 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $400{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.0
                            </span>
                            <p className="fs-14">(380 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[27] ? 'selected' : ''}`} onClick={() => handleFav(27)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-12.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>BMW 3.0 Gran Turismo</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        King’s Road, Chelsea
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Petrol</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Manual</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">12,800 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $550{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.3
                            </span>
                            <p className="fs-14">(300 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[28] ? 'selected' : ''}`} onClick={() => handleFav(28)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-13.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Infiniti QX60 </Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Bold Street, Liverpool
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Diesel</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Auto</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">13,500 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $450{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.1
                            </span>
                            <p className="fs-14">(450 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-12.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[29] ? 'selected' : ''}`} onClick={() => handleFav(29)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-14.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Toyota 86 Sports</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Broad Street, Bristol
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Hybrid</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Auto</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">15,000 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $350{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.6
                            </span>
                            <p className="fs-14">(520 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-13.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[30] ? 'selected' : ''}`} onClick={() => handleFav(30)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-15.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Jeep Wrangler</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Chapel Street, Salford
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Diesel</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Manual</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">10,300 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $700{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.2
                            </span>
                            <p className="fs-14">(360 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
                {/* Car Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.carDetails}>
                            < ImageWithBasePath
                              src="assets/img/cars/car-14.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[31] ? 'selected' : ''}`} onClick={() => handleFav(31)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <Link
                        href="#"
                        className="avatar avatar-md ms-3 car-avatar-image"
                      >
                        < ImageWithBasePath
                          src="assets/img/users/user-16.jpg"
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center">
                          <span className="badge badge-secondary  fs-10 fw-medium me-1">
                            Sedan
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.carDetails}>Jaguar XK</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Castle Street, Cambridge
                      </p>
                      <div className="mb-3 p-2 border rounded">
                        <div className="row">
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-gas-station me-1" />
                              Fuel
                            </span>
                            <p className="text-dark fs-14">Petrol</p>
                          </div>
                          <div className="col border-end">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-kanban me-1" />
                              Gear
                            </span>
                            <p className="text-dark fs-14">Auto</p>
                          </div>
                          <div className="col">
                            <span className="fs-14 d-flex align-items-center text-dark">
                              <i className="isax isax-routing-2 me-1" />
                              Travelled
                            </span>
                            <p className="text-dark fs-14">13,800 KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <h5 className="text-primary">
                            $650{" "}
                            <span className="fs-14 text-gray-6 fw-normal">
                              / day
                            </span>
                          </h5>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                              4.8
                            </span>
                            <p className="fs-14">(500 Reviews)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Car Grid */}
              </div>
            </div>
            {/* Cruise Tab */}
            <div className="tab-pane fade" id="tab-5">
              <div className="row justify-content-center">
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.cruiseDetails}>
                            < ImageWithBasePath
                              src="assets/img/cruise/cruise-05.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[5] ? '' : 'selected'}`} onClick={() => handleFav(5)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate">Beth Williams</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.9
                          </span>
                          <p className="fs-14 text-truncate">(400)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Super Aquamarine</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Ciutat Vella, Barcelona
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2021</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">4</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">88.47 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">19 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.cruiseDetails}>
                        < ImageWithBasePath
                          src="assets/img/cruise/cruise-12.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[32] ? 'selected' : ''}`} onClick={() => handleFav(32)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate">Tom Andrews</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.7
                          </span>
                          <p className="fs-14 text-truncate">(300)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Bonnie Yacht</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Oxford Street, London
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2020</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">3</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">70.63 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">17 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $600{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.cruiseDetails}>
                        < ImageWithBasePath
                          src="assets/img/cruise/cruise-09.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[33] ? 'selected' : ''}`} onClick={() => handleFav(33)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">Robert Cogs</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.5
                          </span>
                          <p className="fs-14 text-truncate">(320)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Coral Cruiser</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2021</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">4</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">88.47 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">19 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $500{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.cruiseDetails}>
                        < ImageWithBasePath
                          src="assets/img/cruise/cruise-09.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[34] ? 'selected' : ''}`} onClick={() => handleFav(34)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-11.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">Kenneth Pal</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.3
                          </span>
                          <p className="fs-14 text-truncate">(380)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Harbor Haven</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Princes Street, Edinburgh
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2016</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">6</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">98.15 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">14 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $300{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.cruiseDetails}>
                            < ImageWithBasePath
                              src="assets/img/cruise/cruise-01.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[35] ? 'selected' : ''}`} onClick={() => handleFav(35)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">Timothy</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.1
                          </span>
                          <p className="fs-14 text-truncate">(300)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Albert Yacht</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        King’s Road, Chelsea
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2018</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">3</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">90.25 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">25 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $550{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.cruiseDetails}>
                        < ImageWithBasePath
                          src="assets/img/cruise/cruise-11.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[36] ? 'selected' : ''}`} onClick={() => handleFav(36)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-13.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">Mark Arriton</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.4
                          </span>
                          <p className="fs-14 text-truncate">(450)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Shelly Yacht</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Bold Street, Liverpool
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2023</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">2</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">72.83 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">23 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $450{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.cruiseDetails}>
                            < ImageWithBasePath
                              src="assets/img/cruise/cruise-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[37] ? 'selected' : ''}`} onClick={() => handleFav(37)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-14.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">Beth Will</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.6
                          </span>
                          <p className="fs-14 text-truncate">(520)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Sunny Sailor</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Broad Street, Bristol
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2008</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">4</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">64.37 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">18 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $350{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
                {/* Cruise Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="img-slide">
                        <div className="slide-images">
                          <Link href={all_routes.cruiseDetails}>
                            < ImageWithBasePath
                              src="assets/img/cruise/cruise-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="fav-item">
                        <Link href="#" className={`fav-icon ${fav[38] ? 'selected' : ''}`} onClick={() => handleFav(38)}>
                          <i className="isax isax-heart5" />
                        </Link>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            < ImageWithBasePath
                              src="assets/img/users/user-15.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate ">John James</p>
                        </Link>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            4.8
                          </span>
                          <p className="fs-14 text-truncate">(360)</p>
                        </div>
                      </div>
                      <h5 className="mb-1 text-truncate">
                        <Link href={all_routes.cruiseDetails}>Ocean Voyager</Link>
                      </h5>
                      <p className="d-flex align-items-center mb-3">
                        <i className="isax isax-location5 me-2" />
                        Chapel Street, Salford
                      </p>
                      <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                            Year :<span className="text-dark fw-medium">2022</span>
                          </p>
                          <p>
                            <i className="isax isax-user me-1" />
                            Guests : <span className="text-dark fw-medium">7</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-1">
                            <i className="isax isax-fatrows text-gray-6 me-1" />
                            Width :
                            <span className="text-dark fw-medium">98.56 m</span>
                          </p>
                          <p>
                            <i className="isax isax-flash-1 me-1" />
                            Speed :{" "}
                            <span className="text-dark fw-medium">15 Knots</span>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h6 className="d-flex align-items-center">
                          <i className="isax isax-home-wifi ms-2 me-2" />
                          <i className="isax isax-scissor me-2" />
                          <i className="isax isax-profile-2user me-2" />
                          <i className="isax isax-wind-2 me-2" />
                          <Link
                            href="#"
                            className="fs-14 fw-normal text-default d-inline-block"
                          >
                            +2
                          </Link>
                        </h6>
                        <h5 className="text-primary text-nowrap me-2">
                          $700{" "}
                          <span className="fs-14 fw-normal text-default">
                            / day
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Cruise Grid */}
              </div>
            </div>
            {/* Activity Tab */}
            <div className="tab-pane fade" id="tab-6">
              <div className="row row-gap-4 justify-content-center">
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-01.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[6] ? '' : 'selected'}`} onClick={() => handleFav(6)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.9</span>{" "}
                          (672 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>Snorkeling Tour</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Phuket,
                          Thailand
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 4 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $400 <span className="text-gray-3 text-line">$480</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            < ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-02.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[49] ? 'selected' : ''}`} onClick={() => handleFav(49)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.6</span>{" "}
                          (450 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>Alpine Snowboarding</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Zermatt,
                          Switzerland
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 3 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $150 <span className="text-gray-3 text-line">$200</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0me-1">
                            < ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-03.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[39] ? 'selected' : ''}`} onClick={() => handleFav(39)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.5</span>{" "}
                          (320 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>White Water Rafting</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Rotorua, New
                          Zealand
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 5 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $350 <span className="text-gray-3 text-line">$400</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            < ImageWithBasePath
                              src="assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-04.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[40] ? 'selected' : ''}`} onClick={() => handleFav(40)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.2</span>{" "}
                          (280 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>Cliffside Paragliding</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Annecy, France
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 2 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $300 <span className="text-gray-3 text-line">$350</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            < ImageWithBasePath
                              src="assets/img/users/user-11.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-05.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[7] ? '' : 'selected'}`} onClick={() => handleFav(7)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.0</span>{" "}
                          (510 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>River Cruise</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Paris, France
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 3 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $280 <span className="text-gray-3 text-line">$300</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            < ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-06.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[41] ? 'selected' : ''}`} onClick={() => handleFav(41)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.7</span>{" "}
                          (730 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>Dessert Adventure</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Dubai, UAE
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 5 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $200 <span className="text-gray-3 text-line">$220</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            < ImageWithBasePath
                              src="assets/img/users/user-13.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-07.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[42] ? 'selected' : ''}`} onClick={() => handleFav(42)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.1</span>{" "}
                          (280 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>Coastal Kayaking</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Sydney,
                          Australia
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 4 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $150 <span className="text-gray-3 text-line">$160</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            < ImageWithBasePath
                              src="assets/img/users/user-14.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
                {/* Activity Grid */}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <Link href={all_routes.home11}>
                        < ImageWithBasePath
                          src="assets/img/activities/activity-08.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[43] ? 'selected' : ''}`} onClick={() => handleFav(43)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-info d-inline-flex align-items-center">
                          <i className="isax isax-ranking me-1" />
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="place-content activity-content">
                      <div className="d-flex align-items-center badge-right position-absolute">
                        <span className="rating fs-12 me-1">
                          <i className="fas fa-star filled" />
                        </span>
                        <p className="fs-14 text-gray-2">
                          <span className="fs-14 fw-medium text-gray-9">4.8</span>{" "}
                          (140 reviews)
                        </p>
                      </div>
                      <h5 className="mt-3 mb-1 text-truncate">
                        <Link href={all_routes.home11}>Historic Landmarks Tour</Link>
                      </h5>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-location5 me-1" /> Rome, Italy
                        </p>
                        <p className="d-flex align-items-center fs-14 mb-0">
                          <i className="isax isax-clock5 me-1" /> 2 hrs
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                          <span className="fs-14 fw-normal text-gray-6">
                            Starts From
                          </span>{" "}
                          $120 <span className="text-gray-3 text-line">$150</span>
                        </h5>
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden"
                        >
                          <span className="avatar avatar-md flex-shrink-0">
                            < ImageWithBasePath
                              src="assets/img/users/user-16.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Activity Grid */}
              </div>
            </div>
            {/* Visa Tab */}
            <div className="tab-pane fade" id="tab-7">
              <div className="row row-gap-4 justify-content-center">
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-01.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[9] ? '' : 'selected'}`} onClick={() => handleFav(9)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Business Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">5-7 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Electronic Visa for Tourism and Recreation
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 90 Days
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $500
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            USA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-02.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[43] ? 'selected' : ''}`} onClick={() => handleFav(43)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Student Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">2-4 Weeks</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Long term for Academic with Health Insurance
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Consular Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $300
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Egypt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-03.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[44] ? 'selected' : ''}`} onClick={() => handleFav(44)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Work Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">15-20 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Work Visa for Employment Opportunities
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Paper
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 2 Years
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $800
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Spain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-04.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[45] ? 'selected' : ''}`} onClick={() => handleFav(45)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Transit Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">3-5 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Short term Visa for Travelers with Layovers
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 72 Hours
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $100
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Qatar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-05.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon p-2 border-0 ${fav[0] ? '' : 'selected'}`} onClick={() => handleFav(0)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Family Reunion Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">8-12 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Family Members to Join Relatives
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Paper
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $600
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Spain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-06.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[46] ? 'selected' : ''}`} onClick={() => handleFav(46)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Cultural Exchange Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">10-15 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Cultural Programs and Exchanges
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Electronic
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 6 Months
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $400
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            USA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-07.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[47] ? 'selected' : ''}`} onClick={() => handleFav(47)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Research Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">4-6 Weeks</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Grown up E-visa with Cooling and Assurance.
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : e-Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 1 Year
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $900
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Qatar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
                {/* Tours Grid */}
                <div className="col-xxl-3 col-xl-4 col-md-6 d-flex">
                  <div className="place-item mb-0 flex-fill">
                    <div className="place-img">
                      <div className="slide-images">
                        <Link href={all_routes.home12}>
                          < ImageWithBasePath
                            src="assets/img/visa/visa-08.jpg"
                            className="img-fluid w-100"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="fav-item">
                        <button className={`fav-icon border-0 ${fav[48] ? 'selected' : ''}`} onClick={() => handleFav(48)}>
                          <i className="isax isax-heart5" />
                        </button>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center">
                          Volunteer Visa
                        </span>
                      </div>
                    </div>
                    <div className="place-content">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex flex-wrap align-items-center me-2">
                          <span className="me-1">
                            <i className="isax isax-clock text-gray-6" />
                          </span>
                          <p className="fs-14 text-gray-9">6-8 Working Days</p>
                        </div>
                      </div>
                      <h5 className="mb-2">
                        <Link href={all_routes.home12}>
                          Voluntary Work with Medical Coverage Included
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center gap-0 mb-3">
                        <p className="d-flex align-items-center fs-14 mb-0 me-2">
                          Mode : Sticker Visa
                        </p>
                        <p className="fs-14 mb-0">
                          <i className="ti ti-point-filled text-primary me-2" />
                          Validity : 6 Months
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="mb-0">
                          <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal">
                            From{" "}
                            <span className="ms-1 fs-18 fw-semibold text-primary">
                              $350
                            </span>
                            <span className="ms-1 fs-14 text-gray-3">/ Person</span>
                          </h6>
                        </div>
                        <div className="ms-2 d-flex align-items-center">
                          <p className="d-flex align-items-center fs-14 mb-0">
                            <i className="isax isax-location5 me-1" />
                            Spain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Tours Grid */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>

  )
}

export default RecentlyViewed;