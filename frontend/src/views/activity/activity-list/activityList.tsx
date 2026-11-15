"use client";
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ActivitySearch from '../activitySearch';
import ActivityFilter from '../activityFilter';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import { useState } from 'react';

const ActivityList = () => {
  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Activity',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Activity',
      active: true,
    },
    {
      label: 'Activity List',
      active: true,
    },
  ];
  const [fav, setFav] = useState<boolean[]>([]);
  const handlefav = (i: number) => {
    setFav((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };
  return (
    <>
      <Breadcrumb
        title="Activity"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
      />
      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          {/* Hotel Search */}
          <ActivitySearch />
          {/* /Hotel Search */}
          {/* Hotel Types */}
          <div className="mb-2">
            <div className="mb-3">
              <h5 className="mb-2">Choose type of activities you are interested</h5>
            </div>
            <div className="row">
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={routes.activityGrid} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/activities/activity-model-01.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={routes.activityGrid}>Adventure</Link>
                    </h6>
                    <p className="fs-14">216 Activities</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={routes.activityGrid} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/activities/activity-model-02.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={routes.activityGrid}>Water Sports</Link>
                    </h6>
                    <p className="fs-14">569 Activities</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={routes.activityGrid} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/activities/activity-model-03.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={routes.activityGrid}>Air Activities</Link>
                    </h6>
                    <p className="fs-14">129 Activities</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={routes.activityGrid} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/activities/activity-model-04.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={routes.activityGrid}>Desert &amp; Safari</Link>
                    </h6>
                    <p className="fs-14">60 Activities</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={routes.activityGrid} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/activities/activity-model-05.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={routes.activityGrid}>Nature &amp; Wildlife</Link>
                    </h6>
                    <p className="fs-14">200 Activities</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                  <Link href={routes.activityGrid} className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/activities/activity-model-06.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">
                      <Link href={routes.activityGrid}>Sightseeing</Link>
                    </h6>
                    <p className="fs-14">180 Activities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Hotel Types */}
          <div className="row">
            {/* Sidebar */}
            <ActivityFilter />
            {/* /Sidebar */}
            <div className="col-xl-9 col-lg-8">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-3">
                  1920 Activities{" "}
                  <span className="fw-normal">Found on Your Search</span>
                </h6>
                <div className="d-flex align-items-center flex-wrap">
                  <div className="list-item d-flex align-items-center mb-3">
                    <Link href={routes.activityGrid} className="list-icon me-2">
                      <i className="isax isax-grid-1" />
                    </Link>
                    <Link href={routes.activityList} className="list-icon active me-2">
                      <i className="isax isax-firstline" />
                    </Link>
                    <Link href={routes.activityMap} className="list-icon me-2">
                      <i className="isax isax-map-1" />
                    </Link>
                  </div>
                  <div className="dropdown mb-3">
                    <Link
                      href="#"
                      className="dropdown-toggle py-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="fw-medium text-gray-9">Sort By : </span>
                      Recommended
                    </Link>
                    <div className="dropdown-menu dropdown-sm">
                      <form>
                        <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend1"
                          >
                            Recommended
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend2"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend2"
                          >
                            Price: low to high
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend3"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend3"
                          >
                            Price: high to low
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend4"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend4"
                          >
                            Newest
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend5"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend5"
                          >
                            Ratings
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center ps-0 mb-0">
                          <input
                            className="form-check-input ms-0 mt-0"
                            name="recommend"
                            type="checkbox"
                            id="recommend6"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="recommend6"
                          >
                            Reviews
                          </label>
                        </div>
                        <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                          <Link href="#" className="btn btn-light btn-sm me-2">
                            Reset
                          </Link>
                          <button type="submit" className="btn btn-primary btn-sm">
                            Apply
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-info br-10 p-3 pb-2 mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center">
                    <i className="isax isax-info-circle me-2" />
                    Save an average of 15% on thousands of activities when you're
                    signed in
                  </p>
                  <Link href={routes.login} className="btn btn-white btn-sm mb-2">
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="hotel-list">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    {/* Activity List */}
                    <div className="place-item mb-4">
                      <div className="place-img activity-img">
                        <Link href={routes.activityDetails}>
                          <ImageWithBasePath
                            src="assets/img/activities/activity-01.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                        <div className="fav-item">
                          <span className="badge bg-info d-inline-flex align-items-center">
                            <i className="isax isax-ranking me-1" />
                            Trending
                          </span>
                          <button className={`fav-icon border-0 ${fav[0] ? '' : 'selected'}`} onClick={() => handlefav(0)}>
                            <i className="isax isax-heart5" />
                          </button>
                        </div>
                      </div>
                      <div className="place-content pb-1">
                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                          <div>
                            <h5 className="mb-1 text-truncate">
                              <Link href={routes.activityDetails}>Snorkeling Tour</Link>
                            </h5>
                            <p className="d-flex align-items-center mb-2">
                              <i className="isax isax-location5 me-1" />
                              Phuket, Thailand
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap">
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                4.9
                              </span>
                              <p className="fs-14">(672 Reviews)</p>
                            </div>
                          </div>
                        </div>
                        <p className="line-ellipsis fs-14">
                          Discover colorful coral reefs and exotic marine life in
                          crystal-clear waters with a guided snorkeling experience.
                        </p>
                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-clock4 me-2" /> 4 Hrs
                          </p>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap border-end pe-2 me-2">
                              <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                                <span className="fs-14 fw-normal text-gray-6">
                                  Starts From
                                </span>
                                $400{" "}
                                <span className="text-gray-3 text-decoration-line-through">
                                  $480
                                </span>
                              </h5>
                            </div>
                            <Link
                              href="#"
                              className="d-flex align-items-center overflow-hidden"
                            >
                              <span className="avatar avatar-md flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Activity List */}
                    {/* Activity List */}
                    <div className="place-item mb-4">
                      <div className="place-img activity-img">
                        <Link href={routes.activityDetails}>
                          <ImageWithBasePath
                            src="assets/img/activities/activity-02.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                        <div className="fav-item">
                          <span className="badge bg-info d-inline-flex align-items-center">
                            <i className="isax isax-ranking me-1" />
                            Trending
                          </span>
                          <button className={`fav-icon border-0 ${fav[1] ? '' : 'selected'}`} onClick={() => handlefav(1)}>
                            <i className="isax isax-heart5" />
                          </button>
                        </div>
                      </div>
                      <div className="place-content pb-1">
                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                          <div>
                            <h5 className="mb-1 text-truncate">
                              <Link href={routes.activityDetails}>
                                Alpine Snowboarding
                              </Link>
                            </h5>
                            <p className="d-flex align-items-center mb-2">
                              <i className="isax isax-location5 me-1" />
                              Zermatt, Switzerland
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap">
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                4.6
                              </span>
                              <p className="fs-14">(450 Reviews)</p>
                            </div>
                          </div>
                        </div>
                        <p className="line-ellipsis fs-14">
                          Ride through breathtaking alpine slopes and enjoy an
                          adrenaline-filled snowboarding experience in pristine
                          mountain terrain.
                        </p>
                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-clock4 me-2" /> 4 Hrs
                          </p>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap border-end pe-2 me-2">
                              <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                                <span className="fs-14 fw-normal text-gray-6">
                                  Starts From
                                </span>
                                $150{" "}
                                <span className="text-gray-3 text-decoration-line-through">
                                  $200
                                </span>
                              </h5>
                            </div>
                            <Link
                              href="#"
                              className="d-flex align-items-center overflow-hidden"
                            >
                              <span className="avatar avatar-md flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/users/user-02.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Activity List */}
                    {/* Activity List */}
                    <div className="place-item mb-4">
                      <div className="place-img activity-img">
                        <Link href={routes.activityDetails}>
                          <ImageWithBasePath
                            src="assets/img/activities/activity-03.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                        <div className="fav-item">
                          <span className="badge bg-info d-inline-flex align-items-center">
                            <i className="isax isax-ranking me-1" />
                            Trending
                          </span>
                          <button className={`fav-icon border-0 ${fav[2] ? 'selected' : ''}`} onClick={() => handlefav(2)}>
                            <i className="isax isax-heart5" />
                          </button>
                        </div>
                      </div>
                      <div className="place-content pb-1">
                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                          <div>
                            <h5 className="mb-1 text-truncate">
                              <Link href={routes.activityDetails}>
                                White Water Rafting
                              </Link>
                            </h5>
                            <p className="d-flex align-items-center mb-2">
                              <i className="isax isax-location5 me-1" />
                              Rotorua, New Zealand
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap">
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                4.6
                              </span>
                              <p className="fs-14">(320 Reviews)</p>
                            </div>
                          </div>
                        </div>
                        <p className="line-ellipsis fs-14">
                          Conquer exciting rapids and explore stunning natural
                          surroundings during a safe and guided rafting experience.
                        </p>
                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-clock4 me-2" /> 5 Hrs
                          </p>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap border-end pe-2 me-2">
                              <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                                <span className="fs-14 fw-normal text-gray-6">
                                  Starts From
                                </span>
                                $650{" "}
                                <span className="text-gray-3 text-decoration-line-through">
                                  $700
                                </span>
                              </h5>
                            </div>
                            <Link
                              href="#"
                              className="d-flex align-items-center overflow-hidden"
                            >
                              <span className="avatar avatar-md flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/users/user-03.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Activity List */}
                    {/* Activity List */}
                    <div className="place-item mb-4">
                      <div className="place-img activity-img">
                        <Link href={routes.activityDetails}>
                          <ImageWithBasePath
                            src="assets/img/activities/activity-04.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                        <div className="fav-item">
                          <span className="badge bg-info d-inline-flex align-items-center">
                            <i className="isax isax-ranking me-1" />
                            Trending
                          </span>
                          <button className={`fav-icon border-0 ${fav[3] ? 'selected' : ''}`} onClick={() => handlefav(3)}>
                            <i className="isax isax-heart5" />
                          </button>
                        </div>
                      </div>
                      <div className="place-content pb-1">
                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                          <div>
                            <h5 className="mb-1 text-truncate">
                              <Link href={routes.activityDetails}>
                                Cliffside Paragliding
                              </Link>
                            </h5>
                            <p className="d-flex align-items-center mb-2">
                              <i className="isax isax-location5 me-1" />
                              Dubai, UAE
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap">
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                4.7
                              </span>
                              <p className="fs-14">(730 Reviews)</p>
                            </div>
                          </div>
                        </div>
                        <p className="line-ellipsis fs-14">
                          Discover colorful coral reefs and exotic marine life in
                          crystal-clear waters with a guided snorkeling experience.
                        </p>
                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-clock4 me-2" /> 3 Hrs
                          </p>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap border-end pe-2 me-2">
                              <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                                <span className="fs-14 fw-normal text-gray-6">
                                  Starts From
                                </span>
                                $650{" "}
                                <span className="text-gray-3 text-decoration-line-through">
                                  $750
                                </span>
                              </h5>
                            </div>
                            <Link
                              href="#"
                              className="d-flex align-items-center overflow-hidden"
                            >
                              <span className="avatar avatar-md flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/users/user-05.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Activity List */}
                    {/* Activity List */}
                    <div className="place-item mb-4">
                      <div className="place-img activity-img">
                        <Link href={routes.activityDetails}>
                          <ImageWithBasePath
                            src="assets/img/activities/activity-05.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                        <div className="fav-item">
                          <span className="badge bg-info d-inline-flex align-items-center">
                            <i className="isax isax-ranking me-1" />
                            Trending
                          </span>
                          <button className={`fav-icon border-0 ${fav[4] ? 'selected' : ''}`} onClick={() => handlefav(4)}>
                            <i className="isax isax-heart5" />
                          </button>
                        </div>
                      </div>
                      <div className="place-content pb-1">
                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                          <div>
                            <h5 className="mb-1 text-truncate">
                              <Link href={routes.activityDetails}>Dessert Adventure</Link>
                            </h5>
                            <p className="d-flex align-items-center mb-2">
                              <i className="isax isax-location5 me-1" />
                              Annecy, France
                            </p>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap">
                              <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                4.2
                              </span>
                              <p className="fs-14">(280 Reviews)</p>
                            </div>
                          </div>
                        </div>
                        <p className="line-ellipsis fs-14">
                          Glide smoothly along stunning cliff edges and enjoy
                          panoramic ocean and mountain views from above.
                        </p>
                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                          <p className="d-flex align-items-center mb-3">
                            <i className="isax isax-clock4 me-2" /> 3 Hrs
                          </p>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex align-items-center text-nowrap border-end pe-2 me-2">
                              <h5 className="text-primary text-nowrap d-flex align-items-center gap-1">
                                <span className="fs-14 fw-normal text-gray-6">
                                  Starts From
                                </span>
                                $370{" "}
                                <span className="text-gray-3 text-decoration-line-through">
                                  $400
                                </span>
                              </h5>
                            </div>
                            <Link
                              href="#"
                              className="d-flex align-items-center overflow-hidden"
                            >
                              <span className="avatar avatar-md flex-shrink-0">
                                <ImageWithBasePath
                                  src="assets/img/users/user-04.jpg"
                                  className="rounded-circle"
                                  alt="img"
                                />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Activity List */}
                  </div>
                </div>
              </div>
              {/* Pagination */}
              <nav className="pagination-nav">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">
                        <i className="fa-solid fa-chevron-left" />
                      </span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* /Pagination */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

    </>
  )
}

export default ActivityList