"use client";

import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../../components/common-sidebar/sidebar';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';
import Link from "next/link";
import Table from "../../../../components/data-table/index";
import type { TableData } from '../../../../core/data/interface';
import ImageWithBasePath from '../../../../components/image-with-base-path';
import { UserTourBookingData } from '../../../../core/data/mock/userTourBookingData';
import UserTourBookingModal from './userTourBookingModal';

const UserTourBooking = () => {

  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'My Bookings',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'My Bookings',
      active: true,
    },
    {
      label: 'Tour',
      active: true,
    },
  ];


  const data = UserTourBookingData;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_text: any, render: any) => (
        <Link
          href="#"
          className="link-primary fw-medium"
          data-bs-toggle="modal"
          data-bs-target={`#${render.action}`}
        >
          {render.id}
        </Link>

      ),
      sorter: (a: TableData, b: TableData) => a.id.length - b.id.length,
    },
    {
      title: "Tour & Type",
      dataIndex: "tourname",
      key: "tourname",
      render: (_text: any, render: any) => (
        <div className="d-flex align-items-center">
          <Link href={routes.tourDetails} className="avatar avatar-lg">
            <ImageWithBasePath
              src={render.tourimage}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <p className="text-dark mb-0 fw-medium fs-14">
              <Link href={routes.tourDetails}>{render.tourname}</Link>
            </p>
            <span className="fs-14 fw-normal text-gray-6">{render.tourtype}</span>
          </div>
        </div>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.tourname.length - b.tourname.length,
    },
    {
      title: "Travellers",
      dataIndex: "travellers",
      key: "travellers",
      sorter: (a: TableData, b: TableData) => a.travellers.length - b.travellers.length,
    },
    {
      title: "Days",
      dataIndex: "day",
      key: "day",
      sorter: (a: TableData, b: TableData) => a.day.length - b.day.length,
    },
    {
      title: "Price",
      dataIndex: "pricing",
      key: "pricing",
      sorter: (a: TableData, b: TableData) => a.pricing.length - b.pricing.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any, render: any) => (
        <span className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${text === 'Upcoming' ? 'badge-info' : text === 'Pending' ? 'badge-secondary' : text === 'Cancelled' ? 'badge-danger' : text === 'Completed' ? 'badge-success' : ''}`}>
          <i className="fa-solid fa-circle fs-5 me-1" />
          {render.status}
        </span>

      ),
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
    {
      title: "",
      dataIndex: "action",
      render: (_text: any, render: any) => (
        <div className="d-flex align-items-center">
          <Link
            href="#"
            data-bs-toggle="modal"
            data-bs-target={`#${render.action}`}
          >
            <i className="isax isax-eye" />
          </Link>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.action.length - b.action.length,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="My Bookings"
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
            {/* Hotel Booking */}
            <div className="col-xl-9 col-lg-8">
              {/* Booking Header */}
              <div className="card booking-header">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                  <div>
                    <h6>Tour</h6>
                    <p className="fs-14 text-gray-6 fw-normal ">
                      No of Booking : 40
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="input-icon-start  me-3 position-relative">
                      <span className="icon-addon">
                        <i className="isax isax-calendar-edit fs-14" />
                      </span>
                      <PredefinedDateRanges />
                    </div>
                    <div className="dropdown ">
                      <Link
                        href="#"
                        className="dropdown-toggle btn border text-gray-6 rounded  fw-normal fs-14 d-inline-flex align-items-center"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-file-export me-2 fs-14 text-gray-6" />
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
                            Export as Excel
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Booking Header */}
              {/* Car-Booking List */}
              <div className="card hotel-list">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Booking List</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="input-icon-start  me-2 position-relative">
                        <span className="icon-addon">
                          <i className="isax isax-search-normal-1 fs-14" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                      <div className="dropdown me-3">
                        <Link
                          href="#"
                          className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"

                        >
                          Tour Type
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Adventure Tourism
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Escorted Tour
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Ground Tour
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown me-3">
                        <Link
                          href="#"
                          className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"

                        >
                          Status
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Upcoming
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Pending
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Cancelled
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Completed
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex align-items-center sort-by">
                        <span className="fs-14 text-gray-9 fw-medium">
                          Sort By :
                        </span>
                        <div className="dropdown me-3">
                          <Link
                            href="#"
                            className="dropdown-toggle text-gray-6 btn  rounded d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"

                          >
                            Recommended
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Recently Added
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Ascending
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Desending
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Last Month
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Last 7 Days
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Hotel List */}
                  <Table dataSource={data} columns={columns} Selection={false} />
                  {/* /Hotel List */}
                </div>
              </div>
              {/* /Car-Booking List */}
            </div>
            {/* /Hotel Booking */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <UserTourBookingModal />
    </div>
  )
}

export default UserTourBooking
