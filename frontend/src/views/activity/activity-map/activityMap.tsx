"use client";
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ActivitySearch from '../activitySearch';
import ImageWithBasePath from '../../../components/image-with-base-path';
import { useState } from 'react';
import Slider from '../../../components/app-slider/appSlider'
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import Link from "next/link";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 53.470692,
  lng: -2.220328,
};
interface Location {
  id: number;
  lat: number;
  lng: number;
  grid_name: string;
  grid_address: string;
  grid_day: string;
  grid_rate: string;
  image: string;
  grid_star: string;
}
const locations: Location[] = [{
  id: 1,
  "lat": 53.470692,
  "lng": -2.220328,
  "grid_name": "Snorkeling Tour",
  "grid_address": "Phuket, Thailand",
  "grid_day": "4 Hours",
  "grid_rate": "$500",
  "image": 'assets/img/activities/activity-01.jpg',
  "grid_star": "5.0"
},
{
  "id": 2,
  "lat": 53.469189,
  "lng": -2.199262,
  "grid_name": "Alpine Snowboarding",
  "grid_address": "Zermatt, Switzerland",
  "grid_day": "10 Hours",
  "grid_rate": "$600",
  "image": 'assets/img/activities/activity-02.jpg',
  "grid_star": "4.7"
},
{
  "id": 3,
  "lat": 53.468665,
  "lng": -2.189269,
  "grid_name": "White Water Rafting",
  "grid_address": "Rotorua, New Zealand",
  "grid_day": "6 Hours",
  "grid_rate": "$700",
  "image": 'assets/img/activities/activity-03.jpg',
  "grid_star": "4.9"
},
];
const ActivityMap = () => {
  const routes = all_routes;


  const [selectedMarker, setSelectedMarker] = useState<Location | null>(locations[0]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD6adZVdzTvBpE2yBRK8cDfsss8QXChK0I",
  });

  const [fav, setFav] = useState<boolean[]>([]);

  const handlefav = (i: number) => {
    setFav((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };

  if (!isLoaded) return <div>Loading Map...</div>;

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
      label: 'Activity Map',
      active: true,
    },
  ];



  return (
    <>
      <Breadcrumb
        title="Activity"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
      />
      {/* Page Wrapper */}
      <div className="content pb-0">
        <div className="map-content">
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
          <div className="d-flex align-items-center justify-content-between flex-wrap recommend-wrap mb-2">
            <div className="d-flex align-items-center flex-wrap">
              <div className="dropdown mb-3">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white btn-sm border rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#filter_modal"
                >
                  <i className="isax isax-filter-add me-1" /> Filters
                </Link>
              </div>
              <div className="dropdown mb-3">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white btn-sm border rounded"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pricing
                </Link>
                <div className="dropdown-menu dropdown-sm">
                  <form>
                    <h6 className="fw-medium fs-16 mb-3">Pricing</h6>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="pricing1"
                        type="checkbox"
                        id="pricing1"
                        defaultChecked
                      />
                      <label className="form-check-label ms-2" htmlFor="pricing1">
                        $50 - $100
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="pricing2"
                        type="checkbox"
                        id="pricing2"
                        defaultChecked
                      />
                      <label className="form-check-label ms-2" htmlFor="pricing2">
                        $100 - $1000
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="pricing3"
                        type="checkbox"
                        id="pricing3"
                        defaultChecked
                      />
                      <label className="form-check-label ms-2" htmlFor="pricing3">
                        $1000 - $5000
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-0">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="pricing4"
                        type="checkbox"
                        id="pricing4"
                        defaultChecked
                      />
                      <label className="form-check-label ms-2" htmlFor="pricing4">
                        $10000 - $2000
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
              <div className="dropdown mb-3">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white btn-sm border rounded"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User Ratings
                </Link>
                <div className="dropdown-menu dropdown-sm">
                  <form>
                    <h6 className="fw-medium fs-16 mb-3">Ratings</h6>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="review01"
                        type="checkbox"
                        id="review01"
                      />
                      <label className="form-check-label ms-2" htmlFor="review01">
                        <span className="rating d-flex align-items-center">
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary" />
                          <span className="ms-2">5 Star</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="review02"
                        type="checkbox"
                        id="review02"
                      />
                      <label className="form-check-label ms-2" htmlFor="review02">
                        <span className="rating d-flex align-items-center">
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary" />
                          <span className="ms-2">4 Star</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="review03"
                        type="checkbox"
                        id="review03"
                      />
                      <label className="form-check-label ms-2" htmlFor="review03">
                        <span className="rating d-flex align-items-center">
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary" />
                          <span className="ms-2">3 Star</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="review04"
                        type="checkbox"
                        id="review04"
                      />
                      <label className="form-check-label ms-2" htmlFor="review04">
                        <span className="rating d-flex align-items-center">
                          <i className="fas fa-star filled text-primary me-1" />
                          <i className="fas fa-star filled text-primary" />
                          <span className="ms-2">2 Star</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-0">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="review05"
                        type="checkbox"
                        id="review05"
                      />
                      <label className="form-check-label ms-2" htmlFor="review05">
                        <span className="rating d-flex align-items-center">
                          <i className="fas fa-star filled text-primary" />
                          <span className="ms-2">1 Star</span>
                        </span>
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
              <div className="dropdown mb-3">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white btn-sm border rounded"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Activity Type
                </Link>
                <div className="dropdown-menu dropdown-sm">
                  <form>
                    <h6 className="fw-medium fs-16 mb-3">Amenities</h6>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="amenities1"
                        type="checkbox"
                        id="amenities1"
                        defaultChecked
                      />
                      <label className="form-check-label ms-2" htmlFor="amenities1">
                        Adventure
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="amenities2"
                        type="checkbox"
                        id="amenities2"
                      />
                      <label className="form-check-label ms-2" htmlFor="amenities2">
                        Water Sports
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="amenities3"
                        type="checkbox"
                        id="amenities3"
                      />
                      <label className="form-check-label ms-2" htmlFor="amenities3">
                        Nature &amp; Wildlife
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="amenities4"
                        type="checkbox"
                        id="amenities4"
                      />
                      <label className="form-check-label ms-2" htmlFor="amenities4">
                        Sightseeing
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="amenities5"
                        type="checkbox"
                        id="amenities5"
                      />
                      <label className="form-check-label ms-2" htmlFor="amenities5">
                        Cultural Tours
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap">
              <div className="input-icon mb-3 me-3">
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Activity Name"
                />
              </div>
              <div className="list-item d-flex align-items-center mb-3">
                <Link href={routes.activityGrid} className="list-icon me-2">
                  <i className="isax isax-grid-1" />
                </Link>
                <Link href={routes.activityList} className="list-icon me-2">
                  <i className="isax isax-firstline" />
                </Link>
                <Link href={routes.activityMap} className="list-icon active me-2">
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
                      <label className="form-check-label ms-2" htmlFor="recommend1">
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
                      <label className="form-check-label ms-2" htmlFor="recommend2">
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
                      <label className="form-check-label ms-2" htmlFor="recommend3">
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
                      <label className="form-check-label ms-2" htmlFor="recommend4">
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
                      <label className="form-check-label ms-2" htmlFor="recommend5">
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
                      <label className="form-check-label ms-2" htmlFor="recommend6">
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
        </div>
        <div className="row">
          <div className="col-xl-8">
            <div className="map-lists-widget border-top">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <h6 className="mb-4">1920 Activities Found on Your Search</h6>
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
                          <button className={`fav-icon border-0 ${fav[1] ? '' : 'selected'}`} onClick={() => handlefav(1)}>
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
                          <button className={`fav-icon border-0 ${fav[2] ? '' : 'selected'}`} onClick={() => handlefav(2)}>
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
                          <button className={`fav-icon border-0 ${fav[4] ? 'selected' : ''}`} onClick={() => handlefav(4)}>
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
                          <button className={`fav-icon border-0 ${fav[5] ? 'selected' : ''}`} onClick={() => handlefav(5)}>
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
              <div className="text-center">
                <Link href="#" className="btn btn-primary">
                  Load More
                </Link>
              </div>
            </div>
          </div>
          {/* Map */}
          <div className="col-xl-4 map-right grid-map">
            <div id="map" className="map-listing">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                options={{
                  scrollwheel: false,
                  mapTypeId: "roadmap",
                }}
              >
                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={{ lat: location.lat, lng: location.lng }}
                    onClick={() => setSelectedMarker(location)}
                  />
                ))}

                {selectedMarker && (
                  <InfoWindow
                    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div>
                      <div className="card">
                        <div className="card-img">
                          <Link href="#" className="property-img">
                            <ImageWithBasePath
                              className="img-fluid w-100"
                              alt="img"
                              src={selectedMarker.image}
                            />
                          </Link>
                        </div>
                        <div className="card-body">
                          <h5 className="title mb-2">
                            <Link href="#" tabIndex={-1}>
                              {selectedMarker.grid_name}
                            </Link>
                          </h5>
                          <p className="mb-3">
                            <i className="isax isax-location"></i>{" "}
                            {selectedMarker.grid_address}
                          </p>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <h4 className="text-primary me-1">
                                {selectedMarker.grid_rate}
                              </h4>
                              <p>{selectedMarker.grid_day}</p>
                            </div>
                            <span className="badge badge-warning text-dark">
                              {selectedMarker.grid_star}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>
          {/* /Map */}
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Filter Modal */}
      <div
        className="modal fade"
        id="filter_modal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h4>Filters</h4>
              <Link href="#" className="text-primary">
                Clear
              </Link>
            </div>
            <form>
              <div className="modal-body">
                <div className=" mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2">
                      <i className="isax isax-ranking text-primary" />
                    </span>
                    <h6>Activity Type</h6>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="popular1"
                        type="checkbox"
                        id="popular1"
                        defaultChecked
                      />
                      <label className="form-check-label ms-2" htmlFor="popular1">
                        Adventure
                      </label>
                    </div>
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="popular2"
                        type="checkbox"
                        id="popular2"
                      />
                      <label className="form-check-label ms-2" htmlFor="popular2">
                        Water Sports
                      </label>
                    </div>
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="popular3"
                        type="checkbox"
                        id="popular3"
                      />
                      <label className="form-check-label ms-2" htmlFor="popular3">
                        Air Activities
                      </label>
                    </div>
                    <div className="form-checkbox form-check form-check-inline d-inline-flex align-items-center mt-2 me-2">
                      <input
                        className="form-check-input ms-0 mt-0"
                        name="popular4"
                        type="checkbox"
                        id="popular4"
                      />
                      <label className="form-check-label ms-2" htmlFor="popular4">
                        Desert &amp; Safari
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2 pb-2">
                    <span className="me-2">
                      <i className="isax isax-coin text-primary" />
                    </span>
                    <h6>Price Per Activity</h6>
                  </div>
                  <div className="mt-4">
                    <div className="filter-range">
                      <Slider range min={200} max={5695} defaultValue={[500, 2000]} />
                    </div>
                    <div className="filter-range-amount">
                      <p className="fs-14">
                        Range :{" "}
                        <span className="text-gray-9 fw-medium">$200 - $5695</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex align-items-center justify-content-end m-0">
                  <button
                    type="button"
                    className="btn btn-light btn-md me-2"
                    data-bs-dismiss="modal"
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary btn-md">
                    Apply Filters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Filter Modal */}
    </>
  )
}

export default ActivityMap