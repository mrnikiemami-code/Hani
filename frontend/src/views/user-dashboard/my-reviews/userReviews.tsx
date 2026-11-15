"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../components/common-sidebar/sidebar';
import PredefinedDateRanges from '../../../components/common-date-picker/datePicker';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import EditReviewModal from './editReviewModal';
import DeleteReviewModal from './deleteReviewModal';

const UserReviews = () => {

  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'My Reviews',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'My Reviews',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="My Reviews"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
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
              {/* Review Title */}
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                    <div>
                      <h6>My Reviews</h6>
                      <p className="fs-14">No of Reviews : 60</p>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                      <div className="me-3 ">
                        <div className="input-icon-end position-relative">
                          <span className="input-icon-addon">
                            <i className="isax isax-calendar-edit" />
                          </span>
                          <PredefinedDateRanges />
                        </div>
                      </div>
                      <div className="dropdown">
                        <Link
                          href="#"
                          className="dropdown-toggle btn btn-white rounded border d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-file-export me-1" />
                          Export
                        </Link>
                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-file-type-pdf me-1" />
                              Export as PDF
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-file-type-xls me-1" />
                              Export as Excel{" "}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Review Title */}
              {/* Reviews */}
              <div className="card shadow-none">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            alt="user"
                            className="img-fluid rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-16">Jeffrey Wilson</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="fs-14 d-flex align-items-center">
                              2 days ago
                              <i className="ti ti-point-filled text-gray mx-2" />
                            </span>
                            <p className="fs-14">
                              <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                4.0
                              </span>
                              Excellent service!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_review"
                        >
                          <i className="isax isax-edit-2 me-1" />
                          Edit
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-1" />
                          Delete
                        </Link>
                      </div>
                    </div>
                    <p className="fs-16 mb-3">
                      It was a good location however the cocoon concept was weird.
                      No tables, chairs etc was difficult as everything went on the
                      floor.
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <p className="fs-14 d-flex align-items-center mb-0">
                      <i className="isax isax-info-circle5 text-gray-9 me-2" />
                      Info : Hotel Booking (Hayat Hotel)
                    </p>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-like-1 me-1" />
                        21
                      </Link>
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-dislike me-1" />
                        50
                      </Link>
                      <Link href="#" className="fs-14 ">
                        <i className="isax isax-heart5 text-danger me-1" />
                        45
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Reviews */}
              {/* Reviews */}
              <div className="card shadow-none">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            alt="user"
                            className="img-fluid rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-16">Jeffrey Wilson</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="fs-14 d-flex align-items-center">
                              2 days ago
                              <i className="ti ti-point-filled text-gray mx-2" />
                            </span>
                            <p className="fs-14">
                              <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                4.2
                              </span>
                              Fantastic Experience
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_review"
                        >
                          <i className="isax isax-edit-2 me-1" />
                          Edit
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-1" />
                          Delete
                        </Link>
                      </div>
                    </div>
                    <p className="fs-16 mb-3">
                      Our first cruise was amazing, with great service, food, and
                      excursions. Can’t wait to go again!
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <p className="fs-14 d-flex align-items-center mb-0">
                      <i className="isax isax-info-circle5 text-gray-9 me-2" />
                      Info : Cuise Booking (Super Aquamarine)
                    </p>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-like-1 me-1" />
                        15
                      </Link>
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-dislike me-1" />
                        40
                      </Link>
                      <Link href="#" className="fs-14 ">
                        <i className="isax isax-heart5 text-danger me-1" />
                        20
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Reviews */}
              {/* Reviews */}
              <div className="card shadow-none">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            alt="user"
                            className="img-fluid rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-16">Jeffrey Wilson</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="fs-14 d-flex align-items-center">
                              5 days ago
                              <i className="ti ti-point-filled text-gray mx-2" />
                            </span>
                            <p className="fs-14">
                              <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                4.4
                              </span>
                              Amazing Tour
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_review"
                        >
                          <i className="isax isax-edit-2 me-1" />
                          Edit
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-1" />
                          Delete
                        </Link>
                      </div>
                    </div>
                    <p className="fs-16 mb-3">
                      The tour was well-organized, and the guides were knowledgeable
                      and friendly—an unforgettable experience!
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <p className="fs-14 d-flex align-items-center mb-0">
                      <i className="isax isax-info-circle5 text-gray-9 me-2" />
                      Info : Tour Booking (Joy Jubilee Jamboree)
                    </p>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-like-1 me-1" />
                        13
                      </Link>
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-dislike me-1" />
                        18
                      </Link>
                      <Link href="#" className="fs-14 ">
                        <i className="isax isax-heart5 text-danger me-1" />
                        22
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Reviews */}
              {/* Reviews */}
              <div className="card shadow-none">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            alt="user"
                            className="img-fluid rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-16">Jeffrey Wilson</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="fs-14 d-flex align-items-center">
                              8 days ago
                              <i className="ti ti-point-filled text-gray mx-2" />
                            </span>
                            <p className="fs-14">
                              <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                4.5
                              </span>
                              Hassle-Free Booking
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_review"
                        >
                          <i className="isax isax-edit-2 me-1" />
                          Edit
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-1" />
                          Delete
                        </Link>
                      </div>
                    </div>
                    <p className="fs-16 mb-3">
                      The booking process was quick, and the car was ready on time
                      with no issues and super convenient
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <p className="fs-14 d-flex align-items-center mb-0">
                      <i className="isax isax-info-circle5 text-gray-9 me-2" />
                      Info : Car Booking (Volkswagen Amarok)
                    </p>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-like-1 me-1" />
                        16
                      </Link>
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-dislike me-1" />
                        28
                      </Link>
                      <Link href="#" className="fs-14 ">
                        <i className="isax isax-heart5 text-danger me-1" />
                        26
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Reviews */}
              {/* Reviews */}
              <div className="card shadow-none">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            alt="user"
                            className="img-fluid rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-16">Jeffrey Wilson</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="fs-14 d-flex align-items-center">
                              10 days ago
                              <i className="ti ti-point-filled text-gray mx-2" />
                            </span>
                            <p className="fs-14">
                              <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                4.7
                              </span>
                              Fast and Reliable
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_review"
                        >
                          <i className="isax isax-edit-2 me-1" />
                          Edit
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-1" />
                          Delete
                        </Link>
                      </div>
                    </div>
                    <p className="fs-16 mb-3">
                      Booked a last-minute flight with ease, and everything went
                      smoothly from start to finish
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <p className="fs-14 d-flex align-items-center mb-0">
                      <i className="isax isax-info-circle5 text-gray-9 me-2" />
                      Info : Flight Booking (AstraFlight 215)
                    </p>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-like-1 me-1" />
                        30
                      </Link>
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-dislike me-1" />
                        40
                      </Link>
                      <Link href="#" className="fs-14 ">
                        <i className="isax isax-heart5 text-danger me-1" />
                        57
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Reviews */}
              {/* Reviews */}
              <div className="card shadow-none">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            alt="user"
                            className="img-fluid rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-16">Jeffrey Wilson</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="fs-14 d-flex align-items-center">
                              12 days ago
                              <i className="ti ti-point-filled text-gray mx-2" />
                            </span>
                            <p className="fs-14">
                              <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                4.6
                              </span>
                              Perfect for Family
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_review"
                        >
                          <i className="isax isax-edit-2 me-1" />
                          Edit
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-1" />
                          Delete
                        </Link>
                      </div>
                    </div>
                    <p className="fs-16 mb-3">
                      The hotel was family-friendly, with spacious rooms and
                      activities for the kids—great stay!
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <p className="fs-14 d-flex align-items-center mb-0">
                      <i className="isax isax-info-circle5 text-gray-9 me-2" />
                      Info : Hotel Booking (Hotel Miravent)
                    </p>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-like-1 me-1" />
                        30
                      </Link>
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-dislike me-1" />
                        19
                      </Link>
                      <Link href="#" className="fs-14 ">
                        <i className="isax isax-heart5 text-danger me-1" />
                        48
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Reviews */}
              {/* Reviews */}
              <div className="card shadow-none">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/users/user-01.jpg"
                            alt="user"
                            className="img-fluid rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-16">Jeffrey Wilson</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            <span className="fs-14 d-flex align-items-center">
                              15 days ago
                              <i className="ti ti-point-filled text-gray mx-2" />
                            </span>
                            <p className="fs-14">
                              <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                4.1
                              </span>
                              Best Cruise Deals
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_review"
                        >
                          <i className="isax isax-edit-2 me-1" />
                          Edit
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-white btn-sm border"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-1" />
                          Delete
                        </Link>
                      </div>
                    </div>
                    <p className="fs-16 mb-3">
                      I found an amazing deal for my dream cruise, and the booking
                      process was a breeze!
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                    <p className="fs-14 d-flex align-items-center mb-0">
                      <i className="isax isax-info-circle5 text-gray-9 me-2" />
                      Info : Cruise Booking (Norwegian Cruise)
                    </p>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-like-1 me-1" />
                        13
                      </Link>
                      <Link href="#" className="fs-14 me-3">
                        <i className="isax isax-dislike me-1" />
                        40
                      </Link>
                      <Link href="#" className="fs-14 ">
                        <i className="isax isax-heart5 text-danger me-1" />
                        52
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Reviews */}
              {/* Pagination */}
              <nav className="pagination-nav">
                <ul className="pagination justify-content-center justify-content-sm-end ">
                  <li className="page-item disabled">
                    <Link
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                    >
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
                    <Link
                      className="page-link"
                      href="#"
                      aria-label="Next"
                    >
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
      <EditReviewModal />
      <DeleteReviewModal />
    </div>
  )
}

export default UserReviews
