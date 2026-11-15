"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../components/common-sidebar/sidebar';
import Link from "next/link";
import DeleteModal from './deleteModal';
import { all_routes } from '../../../routes/all_routes';

const Notification = () => {

  const routes = all_routes

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Notifications',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Notifications',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Notifications"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <Sidebar />
            </div>

            {/* /Sidebar */}
            {/* Notifications */}
            <div className="col-xl-9 col-lg-8">
              <div className="card shadow-none mb-0">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                    <h6>Notifications</h6>
                    <div className="d-flex">
                      <Link
                        href="#"
                        className="btn btn-light btn-sm d-flex align-items-center me-2"
                      >
                        <i className="isax isax-tick-square me-2" />
                        Mark all as Read
                      </Link>
                      <Link
                        href="#"
                        className="btn btn-primary btn-sm d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="isax isax-trash me-2" />
                        Delete All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card notification-card">
                    <div className="card-body d-sm-flex align-items-center">
                      <span className="avatar avatar-lg rounded-circle bg-teal flex-shrink-0 me-sm-3 mb-3 mb-sm-0">
                        <i className="isax isax-calendar-edit5" />
                      </span>
                      <div className="flex-fill">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="fs-16">Booking Confirmation</h6>
                          <Link
                            href="#"
                            className="notification-delete-btn btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            Delete
                          </Link>
                        </div>
                        <p className=" mb-1">
                          Your booking for the{" "}
                          <span className="text-gray-9 fw-medium mx-1">
                            {" "}
                            Super Aquamarine
                          </span>{" "}
                          is confirmed! Departure on{" "}
                          <span className="text-gray-9 fw-medium mx-1">
                            {" "}
                            03 Oct 2024
                          </span>{" "}
                          from
                          <span className="text-gray-9 fw-medium ms-1">
                            {" "}
                            Barcelona
                          </span>{" "}
                          . <i className="ti ti-point-filled text-primary" />
                        </p>
                        <p className="text-gray-9">2 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="card notification-card">
                    <div className="card-body d-sm-flex align-items-center">
                      <span className="avatar avatar-lg rounded-circle bg-pink flex-shrink-0 me-sm-3 mb-3 mb-sm-0">
                        <i className="isax isax-note-26" />
                      </span>
                      <div className="flex-fill">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="fs-16">Thank You Post-Trip</h6>
                          <Link
                            href="#"
                            className="notification-delete-btn btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            Delete
                          </Link>
                        </div>
                        <p className="mb-1">
                          Thank you for traveling with Dream Tour! We hope you
                          enjoyed your trip.
                        </p>
                        <p className="text-gray-9">10 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="card notification-card">
                    <div className="card-body d-sm-flex align-items-center">
                      <span className="avatar avatar-lg rounded-circle bg-purple flex-shrink-0 me-sm-3 mb-3 mb-sm-0">
                        <i className="isax isax-calendar-remove5" />
                      </span>
                      <div className="flex-fill">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="fs-16">Rescheduling Notification</h6>
                          <Link
                            href="#"
                            className="notification-delete-btn btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            Delete
                          </Link>
                        </div>
                        <p className=" mb-1">
                          Your Hotel booking of{" "}
                          <span className="text-gray-9 fw-medium mx-1">
                            {" "}
                            Suite Room
                          </span>{" "}
                          on{" "}
                          <span className="text-gray-9 fw-medium mx-1">
                            {" "}
                            15 Jan 2025
                          </span>{" "}
                          has been rescheduled to
                          <span className="text-gray-9 fw-medium ms-1">
                            {" "}
                            20 May 2025
                          </span>
                        </p>
                        <p className="text-gray-9">1 day ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="card notification-card mb-0">
                    <div className="card-body d-sm-flex align-items-center">
                      <span className="avatar avatar-lg rounded-circle bg-primary flex-shrink-0 me-sm-3 mb-3 mb-sm-0">
                        <i className="isax isax-info-circle5" />
                      </span>
                      <div className="flex-fill">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="fs-16">Pre-Tour Information</h6>
                          <Link
                            href="#"
                            className="notification-delete-btn btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            Delete
                          </Link>
                        </div>
                        <p className=" mb-1">
                          Your
                          <span className="text-gray-9 fw-medium mx-1">
                            Mountain Valley
                          </span>{" "}
                          is on{" "}
                          <span className="text-gray-9 fw-medium mx-1">
                            15 May 2024.
                          </span>{" "}
                          Please arrive at los Angeles
                        </p>
                        <p className="text-gray-9">2 mins ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Notifications */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <DeleteModal />


    </div>
  )
}

export default Notification
