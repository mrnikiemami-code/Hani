"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../components/common-sidebar/sidebar';
import Link from "next/link";
import AppSwiper from '../../../components/app-swiper'
import ImageWithBasePath from '../../../components/image-with-base-path';

const UserWishlist = () => {


  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Wishlist',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Wishlist',
      active: true,
    },
  ];


  return (
    <div>
      <Breadcrumb
        title="Wishlist"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04"
      />


      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            <div className="col-xl-9 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h6>My Wishlist</h6>
                  <p className="fs-14">Items in Wishlist : 60</p>
                </div>
              </div>
              {/* Hotel Grid */}
              <div className="hotel-list">
                <div className="place-item mb-4">
                  <div className="place-img">
                    
                      <AppSwiper preset="img-slider">
                        <div className="slide-images">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-01.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-02.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.hotelDetails}>
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-03.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </AppSwiper>
                    <div className="fav-item">
                      <Link href="#" className="fav-icon selected">
                        <i className="isax isax-heart5" />
                      </Link>
                      <span className="badge bg-info d-inline-flex align-items-center">
                        <i className="isax isax-ranking me-1" />
                        Trending
                      </span>
                    </div>
                  </div>
                  <div className="place-content pb-1">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <div>
                        <h5 className="mb-1 text-truncate">
                          <Link href={routes.hotelDetails}>Hotel Miravent Barcelona</Link>
                        </h5>
                        <p className="d-flex align-items-center mb-2">
                          <i className="isax isax-location5 me-2" />
                          Ciutat Vella, Barcelona
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <Link
                          href="#"
                          className="d-flex align-items-center overflow-hidden border-end pe-2 me-2"
                        >
                          <span className="avatar avatar-md flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-01.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </span>
                          <p className="fs-14 text-truncate">Beth Williams</p>
                        </Link>
                        <div className="d-flex align-items-center text-nowrap">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                            5.0
                          </span>
                          <p className="fs-14">(400 Reviews)</p>
                        </div>
                      </div>
                    </div>
                    <p className="line-ellipsis fs-14">
                      Experience luxury and comfort at our centrally located hotel,
                      featuring modern amenities, spacious rooms, and exceptional
                      service.
                    </p>
                    <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                      <h6 className="d-flex align-items-center mb-3">
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
                      <h5 className="text-primary text-nowrap me-2 mb-3">
                        $500{" "}
                        <span className="fs-14 fw-normal text-default">
                          / Night
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Hotel Grid */}
              {/* Tours List */}
              <div className="hotel-list">
                <div className="place-item mb-4">
                  <div className="place-img">
                    
                      <AppSwiper preset="img-slider">
                        <div className="slide-images">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-08.jpg"
                              className="img-fluid "
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-09.jpg"
                              className="img-fluid "
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.tourDetails}>
                            <ImageWithBasePath
                              src="assets/img/tours/tours-10.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </AppSwiper>
                    <div className="fav-item">
                      <Link href="#" className="fav-icon selected">
                        <i className="isax isax-heart5" />
                      </Link>
                      <span className="badge bg-info d-inline-flex align-items-center">
                        <i className="isax isax-ranking me-1" />
                        Trending
                      </span>
                    </div>
                  </div>
                  <div className="place-content">
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
                      <div>
                        <h5 className="mb-1 text-truncate">
                          <Link href={routes.tourDetails}>Rainbow Mountain Valley</Link>
                        </h5>
                        <p className="fs-14 d-flex align-items-center">
                          <i className="isax isax-location5 me-2" />
                          Ciutat Vella, Barcelona
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="fs-14 text-gray-9  border-end pe-2 me-2 mb-0">
                          <span className="me-1">
                            <i className="ti ti-receipt text-primary" />
                          </span>{" "}
                          Ecotourism
                        </p>
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                          5.0
                        </span>
                        <p className="fs-14">(105 Reviews)</p>
                      </div>
                    </div>
                    <p className="fs-14 border-bottom pb-3 mb-3">
                      Journey through majestic peaks and serene valleys, where
                      nature’s beauty surrounds you at every turn.
                    </p>
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          <i className="isax isax-calendar-tick text-gray-6" />
                        </span>
                        <p className="fs-14 text-gray-9  border-end pe-2 me-2 mb-0">
                          4 Day, 3 Night
                        </p>
                        <p className="fs-14 text-gray-9 mb-0 text-truncate d-flex align-items-center">
                          <i className="isax isax-profile-2user me-1" />
                          14 Guests
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <h6 className="d-flex align-items-center text-gray-6 fs-14 fw-normal border-end pe-2 me-2">
                          Starts From
                          <span className="ms-1 fs-18 fw-semibold text-primary">
                            $500
                          </span>
                          <span className="ms-1 fs-18 fw-semibold text-gray-3 text-decoration-line-through">
                            $789
                          </span>
                        </h6>
                        <Link
                          href="#"
                          className="avatar avatar-sm flex-shrink-0"
                        >
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
              {/* /Tours List */}
              {/* Car List */}
              <div className="hotel-list">
                <div className="place-item">
                  <div className="place-img">
                    
                      <AppSwiper preset="img-slider">
                        <div className="slide-images">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-06.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-07.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-08.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="slide-images">
                          <Link href={routes.carDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-11.jpg"
                              className="img-fluid"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </AppSwiper>
                    <div className="fav-item">
                      <Link href="#" className="fav-icon selected">
                        <i className="isax isax-heart5" />
                      </Link>
                      <span className="badge bg-info d-inline-flex align-items-center">
                        <i className="isax isax-ranking me-1" />
                        Trending
                      </span>
                    </div>
                  </div>
                  <div className="place-content">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                      <div className="">
                        <div className="d-flex align-items-center mb-1">
                          <h5 className="text-truncate border-end pe-2 me-2">
                            <Link href={routes.carDetails}>Toyota Camry SE 400</Link>
                          </h5>
                          <span className="badge badge-secondary badge-sm d-flex align-items-center">
                            Sedan
                          </span>
                        </div>
                        <p className="d-flex align-items-center">
                          <i className="isax isax-location5 me-2" />
                          Ciutat Vella, Barcelona
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="avatar avatar-sm flex-shrink-0"
                        >
                          <ImageWithBasePath
                            src="assets/img/users/user-08.jpg"
                            className="rounded-circle"
                            alt="img"
                          />
                        </Link>
                        <div className="d-flex align-items-center border-start ps-2 ms-2">
                          <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-1">
                            5.0
                          </span>
                          <p className="fs-14">(400 Reviews)</p>
                        </div>
                      </div>
                    </div>
                    <p className="fs-14 mb-3">
                      Enjoy modern comfort, cutting-edge technology, and exceptional
                      handling for every journey, from city streets to off-road
                      adventures.
                    </p>
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <div className="p-2 border rounded d-flex align-items-center">
                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                          <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap">
                            <i className="isax isax-gas-station me-1" />
                            Fuel :
                          </span>
                          <p className="fs-14 fw-medium ms-1"> Hybrid</p>
                        </div>
                        <div className="d-flex flex-wrap border-end pe-2 me-2">
                          <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap">
                            <i className="isax isax-kanban me-1" />
                            Gear :
                          </span>
                          <p className="fs-14 fw-medium ms-1"> Manual</p>
                        </div>
                        <div className="d-flex flex-wrap">
                          <span className="fs-14 d-flex align-items-center text-gray-6 fw-normal text-nowrap">
                            <i className="isax isax-routing-2 me-1" />
                            Travelled :
                          </span>
                          <p className="fs-14 fw-medium ms-1">14,000 KM</p>
                        </div>
                      </div>
                      <h5 className="text-primary text-nowrap">
                        $500{" "}
                        <span className="fs-14 text-gray-6 fw-normal">/ day</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Car List */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}



    </div>
  )
}

export default UserWishlist
