"use client";
import  { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import ReactApexChart from 'react-apexcharts';
import type { TableData } from '../../../core/data/interface';
import Table from "../../../components/data-table/index";
import { AgentDashboardData } from '../../../core/data/mock/agentDashboardData';
import AgentDhashboardModal from './agentDhashboardModal';

const AgentDashboard = () => {

  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Agent Dashboard',
      active: false,
      link: routes.home1
    },
    {
      label: 'Agent Dashboard',
      active: true,
    },
  ];

  const [donutChart] = useState<any>({
    series: [25, 15, 35, 5, 20],
    options: {
      chart: {
        height: 181,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      colors: ['#212E47', '#3538CD', '#0E9384', '#CF3425', '#98AA30'],
      labels: ['Cruise', 'Cars', 'Hotels', 'Tour', 'Flights'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%', // Adjust the inner radius of the donut
          },
        },
      },
      stroke: {
        width: 3, // Adds space between segments
        colors: ['#fff'], // Color of the gap (white in this case)
      },
      dataLabels: {
        enabled: false, // Hides the data labels
      },
    },
  });

  const [earningChart] = useState<any>({
    series: [
      {
        name: 'Income',
        data: [5000, 16000, 8000, 5000, 4000, 5000, 12000, 5000, 8000, 5000, 5000, 8000],
      },
      {
        name: 'Expenses',
        data: [5000, 4000, 4000, 5000, 8000, 5000, 4000, 5000, 4000, 5000, 5000, 4000],
      },
    ],
    options: {
      chart: {
        height: 280,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ['#0E9384', '#E4EBF1'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusWhenStacked: 'all',
          horizontal: false,
          endingShape: 'rounded',
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: '#4E5561',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => {
            return val / 1000 + 'K';
          },
          offsetX: -15,
          style: {
            colors: '#4E5561',
            fontSize: '13px',
          },
        },
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },
      fill: {
        opacity: 1,
      },
    },
  });

  const data = AgentDashboardData;
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
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (_text: any, render: any) => (
        <div className="d-flex align-items-center">
          <Link href={routes.hotelDetails} className="avatar avatar-lg">
            <ImageWithBasePath
              src={render.hotelImage}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <p className="text-dark mb-0 fw-medium fs-14">
              <Link href={routes.hotelDetails}>{render.hotelName}</Link>
            </p>
            <span className="fs-14 fw-normal text-gray-6">{render.location}</span>
          </div>
        </div>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.hotel.length - b.hotel.length,
    },
    {
      title: "Room & Guest",
      dataIndex: "room",
      key: "room",
      render: (_text: any, render: any) => (
        <>
          <h6 className="fs-14 mb-1">{render.room}</h6>
          <span className="fs-14 fw-normal text-gray-6">{render.guest}</span>
        </>

      ),
      sorter: (a: TableData, b: TableData) => a.room.length - b.room.length,
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      sorter: (a: TableData, b: TableData) => a.days.length - b.days.length,
    },
    {
      title: "Pricing",
      dataIndex: "pricing",
      key: "pricing",
      sorter: (a: TableData, b: TableData) => a.pricing.length - b.pricing.length,
    },
    {
      title: "Booked on",
      dataIndex: "bookedOn",
      key: "bookedOn",
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

      <Breadcrumb title="Agent Dashboard" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

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
              <div className="row">
                <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-success mb-2">
                        <i className="isax isax-calendar-15 fs-24" />
                      </span>
                      <p className="mb-1">Total Bookings</p>
                      <h5 className="mb-2">456</h5>
                      <p className="d-flex align-items-center justify-content-center fs-14">
                        <i className="isax isax-arrow-up-15 me-1 text-success" />
                        20% From Last Month{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-orange mb-2">
                        <i className="isax isax-money-time5 fs-24" />
                      </span>
                      <p className="mb-1">Total Listings</p>
                      <h5 className="mb-2">23</h5>
                      <Link
                        href={routes.agentListing}
                        className="fs-14 link-primary text-decoration-underline"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-info mb-2">
                        <i className="isax isax-money-send5 fs-24" />
                      </span>
                      <p className="mb-1">Total Earnings</p>
                      <h5 className="mb-2">$5,6560</h5>
                      <p className="d-flex align-items-center justify-content-center fs-14">
                        <i className="isax isax-arrow-down5 me-1 text-danger" />
                        15% From Last Month{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-indigo mb-2">
                        <i className="isax isax-magic-star5 fs-24" />
                      </span>
                      <p className="mb-1">Total Reviews</p>
                      <h5 className="mb-2">62</h5>
                      <Link
                        href={routes.agentReview}
                        className="fs-14 link-primary text-decoration-underline"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Bookings Statistics */}
                <div className="col-xl-4 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6>Bookings Statistics</h6>
                        <div className="dropdown ">
                          <Link
                            href="#"
                            className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6" />
                            2025
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-3">
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2025
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2024
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2023
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="text-center mb-3">
                        <div id="booking-chart" >
                          <ReactApexChart
                            options={donutChart.options}
                            series={donutChart.series}
                            type="donut"
                            height={181}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon teal">Hotels</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">16</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon secondary">Flights</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">12</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon purple">Cars</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">14</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon dark">Cruise</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">16</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-0">
                        <h6 className="border-icon primary">Tour</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">04</span> Bookings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Bookings Statistics */}
                {/* Earnings */}
                <div className="col-xl-8 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body pb-0">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6>Earnings</h6>
                        <div className="dropdown ">
                          <Link
                            href="#"
                            className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6" />
                            2025
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-3">
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2025
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2024
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2023
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="mb-2">
                            <p className="mb-0">Total Earnings this Year</p>
                            <h3>$20,659</h3>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="fs-14">
                              <span className="badge badge-soft-success badge-md border border-success rounded-pill me-2">
                                <i className="isax isax-arrow-up-3 " />
                                12%
                              </span>
                              vs last years
                            </p>
                          </div>
                        </div>
                        <div id="earning-chart">
                          <ReactApexChart
                            options={earningChart.options}
                            series={earningChart.series}
                            type="bar"
                            height={280}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Earnings */}
              </div>
              <div className="row">
                {/* Recently Added */}
                <div className="col-xl-6 col-xxl-5 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body">
                      <h6 className="mb-4">Recently Added</h6>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.hotelDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-20.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link href={routes.hotelDetails}>The Grand Horizon</Link>{" "}
                              <span className="badge badge-soft-info badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Hotels
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 25 Apr 2025</p>
                          </div>
                        </div>
                        <Link
                          href={routes.agentHotelBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          06 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.tourDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/tours/tours-28.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link href={routes.tourDetails}>Dare DevCon</Link>{" "}
                              <span className="badge badge-soft-pink badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Tour
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 16 May 2025</p>
                          </div>
                        </div>
                        <Link
                          href={routes.agentTourBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          12 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.flightDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/flight/flight-05.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link href={routes.flightDetails}>Altair 333</Link>{" "}
                              <span className="badge badge-soft-teal badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Flight
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 25 May 2025</p>
                          </div>
                        </div>
                        <Link
                          href={routes.agentFlightBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          14 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.cruiseDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-28.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link href={routes.cruiseDetails}>Oceania Cruises</Link>{" "}
                              <span className="badge badge-soft-cyan badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Cruise
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 18 Jun 2025</p>
                          </div>
                        </div>
                        <Link
                          href={routes.agentCruiseBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          22 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            href={routes.tourDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/tours/tours-26.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link href={routes.tourDetails}>Fitness Frenzy</Link>{" "}
                              <span className="badge badge-soft-pink badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Tour
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 25 May 2025</p>
                          </div>
                        </div>
                        <Link
                          href={routes.agentTourBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          40 Bookings
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Recently Added */}
                {/* Recent Invoices */}
                <div className="col-xxl-7 col-xl-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
                        <h6>Latest Invoices</h6>
                      </div>
                      <div className="card shadow-none mb-4">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <div className="d-flex align-items-center flex-wrap mb-1">
                                <Link
                                  href={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12565
                                </Link>
                                <p className="fs-14">Date: 15 May 2024</p>
                              </div>
                              <h6 className="fs-16 fw-medium">
                                <Link href={routes.flightDetails}>Cloudrider 789</Link>
                              </h6>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$569</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none mb-4">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <div className="d-flex align-items-center flex-wrap mb-1">
                                <Link
                                  href={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12564
                                </Link>
                                <p className="fs-14">Date: 13 May 2024</p>
                              </div>
                              <h6 className="fs-16 fw-medium">
                                <Link href={routes.hotelDetails}>The Luxe Haven</Link>
                              </h6>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$430</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none mb-4">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <div className="d-flex align-items-center flex-wrap mb-1">
                                <Link
                                  href={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12563
                                </Link>
                                <p className="fs-14">Date: 10 May 2024</p>
                              </div>
                              <h6 className="fs-16 fw-medium">
                                <Link href={routes.carDetails}>Ford Mustang 4.0 AT</Link>
                              </h6>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$380</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none mb-0">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <h6 className="fs-16 fw-medium mb-1">
                                <Link href={routes.cruiseDetails}>Super Aquamarine</Link>
                              </h6>
                              <div className="d-flex align-items-center flex-wrap">
                                <Link
                                  href={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12562
                                </Link>
                                <p className="fs-14">Date: 04 May 2024</p>
                              </div>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$475</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Recent Invoices */}
              </div>
              {/* Add Lists */}
              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 justify-content-center">
                <div className="col">
                  <div className="card bg-success-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">4 Hotels</h6>
                      <Link
                        href={routes.addHotel}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Hotels
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card bg-pink-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">4 Flights</h6>
                      <Link
                        href={routes.addFlight}
                        className="fs-14 fw-medium link-primary text-decoration-underline"
                      >
                        Add New Flight
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card bg-danger-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">5 Tours</h6>
                      <Link
                        href={routes.addTour}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Tour
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card bg-purple-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">9 Cars</h6>
                      <Link
                        href={routes.addCar}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Car
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card bg-cyan-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">8 Cruise</h6>
                      <Link
                        href={routes.addCruise}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Cruise
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Add Lists */}
              {/* Hotel-Booking List */}
              <div className="card hotel-list mb-0">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Recent Bookings</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="dropdown me-3">
                        <Link
                          href="#"
                          className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                          
                        >
                          Hotels
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Single Room
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Double Room
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                            >
                              Twin Room
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="input-icon-start position-relative">
                        <span className="icon-addon">
                          <i className="isax isax-search-normal-1 fs-14" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Hotel List */}
                  <Table dataSource={data} columns={columns} Selection={false} />
                  {/* /Hotel List */}
                </div>
              </div>
              {/* /Hotel-Booking List */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <AgentDhashboardModal />

    </div>
  )
}

export default AgentDashboard
