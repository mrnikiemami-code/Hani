"use client";
import { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../components/common-sidebar/sidebar';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import ReactApexChart from "react-apexcharts";
import { useLocale, useTranslations } from "next-intl";
import { formatMoney } from "@/lib/hani/money";
import type { TravelerDashboard } from "@/features/dashboard/infrastructure/dashboard-api";
import { formatIsoInstant } from "@/lib/hani/calendar";

const Dashboard = ({ dashboard }: { dashboard?: TravelerDashboard | null }) => {

    const routes = all_routes
    const locale = useLocale();
    const t = useTranslations("common");

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Dashboard',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Dashboard',
            active: true,
        },
    ];


    const [toursChart] = useState<any>({

        series: [76, 67, 61, 90],
        options: {
            chart: {
                height: 283,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: '30%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        offsetX: -8,
                        fontSize: '16px',
                        formatter: function (seriesName: any, opts: any) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                        },
                    },
                }
            },
            colors: ['#155EEF', '#212E47', '#98AA30', '#CF3425'],
            labels: ['Hotels', 'Cars', 'Tours', 'Flights'],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        },


    });


    const [chartOptions] = useState<any>({
        chart: {
            height: 250,
            type: "bar",
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        colors: ["#CF3425", "#FEEDEB"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: "bottom",
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                borderRadius: 5,
                horizontal: false,
                endingShape: "rounded",
            },
        },
        series: [
            {
                name: "Income",
                data: [5000, 16000, 8000, 5000, 4000, 5000, 12000, 5000, 8000, 5000, 5000, 8000],
            },
            {
                name: "Expenses",
                data: [5000, 4000, 4000, 5000, 8000, 5000, 4000, 5000, 4000, 5000, 5000, 4000],
            },
        ],
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            labels: {
                style: {
                    colors: "#4E5561",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val: number) => `${val / 1000}K`,
                offsetX: -15,
                style: {
                    colors: "#4E5561",
                    fontSize: "13px",
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
            enabled: false,
        },
        fill: {
            opacity: 1,
        },
    });

    return (
        <div>
            <Breadcrumb
                title="Dashboard"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-04"
            />

            {/* Page Wrapper */}
            <div className="content content-two">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 ">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="alert alert-teal alert-dismissible d-flex align-items-center border-0 mb-4 fade show">
                                <i className="isax isax-info-circle5 me-2" /> Reminder about your
                                upcoming booking Hotel Hayat on 15 May 2025 at 09:30 AM . We look
                                forward to seeing you!
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                >
                                    <i className="fas fa-xmark" />
                                </button>
                            </div>
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card shadow-none">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <span className="avatar avatar-xl rounded-circle bg-primary me-3">
                                                    <i className="isax isax-calendar-15 fs-36" />
                                                </span>
                                                <div>
                                                    <h3>{dashboard?.summary.orderCount ?? 0}</h3>
                                                    <p>{t("totalBookings")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="card shadow-none">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <span className="avatar avatar-xl rounded-circle bg-secondary me-3">
                                                    <i className="isax isax-money-send5 fs-36" />
                                                </span>
                                                <div>
                                                    <h3>
                                                        {formatMoney(
                                                            dashboard?.summary.grossPaid,
                                                            dashboard?.summary.currency,
                                                            locale
                                                        )}
                                                    </h3>
                                                    <p>{t("totalTransactions")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="card shadow-none">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <span className="avatar avatar-xl rounded-circle bg-purple me-3">
                                                    <i className="isax isax-money-tick5 fs-36" />
                                                </span>
                                                <div>
                                                    <h3>
                                                        {formatMoney(
                                                            dashboard && dashboard.summary.orderCount > 0
                                                                ? dashboard.summary.grossPaid / dashboard.summary.orderCount
                                                                : 0,
                                                            dashboard?.summary.currency,
                                                            locale
                                                        )}
                                                    </h3>
                                                    <p>{t("averageValue")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-7 d-flex">
                                    <div className="card shadow-none flex-fill">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h6>{t("recentBookings")}</h6>
                                                <div className="dropdown ">
                                                    <Link
                                                        href="#"
                                                        className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i className="isax isax-document-filter me-2 fs-14 text-gray-6" />
                                                        Filter
                                                    </Link>
                                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                Completed
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                Upcoming
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                Inprogress
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {dashboard?.recentOrders?.length ? (
                                                dashboard.recentOrders.map((order) => (
                                                    <div className="card shadow-none mb-2" key={order.orderId}>
                                                        <div className="card-body">
                                                            <div className="d-flex align-items-center flex-wrap row-gap-2">
                                                                <span className="avatar avatar-xl flex-shrink-0 me-2 bg-light d-inline-flex align-items-center justify-content-center">
                                                                    <i className="isax isax-receipt-item5 fs-24" />
                                                                </span>
                                                                <div className="flex-fill">
                                                                    <span className="badge badge-soft-info badge-xs rounded-pill mb-1">
                                                                        {order.status}
                                                                    </span>
                                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                                        <h6 className="fs-16 text-truncate">
                                                                            {order.orderNumber}
                                                                        </h6>
                                                                        <span className="badge badge-info badge-sm rounded-pill">
                                                                            {order.paymentStatus}
                                                                        </span>
                                                                    </div>
                                                                    <div className="d-flex align-items-center flex-wrap">
                                                                        <p className="fs-14 d-flex align-items-center border-end pe-2 me-2 mb-0">
                                                                            <i className="isax isax-calendar-25 me-2" />
                                                                            {formatIsoInstant(order.createdAt, locale, { dateStyle: "medium" })}
                                                                        </p>
                                                                        <p className="fs-14 d-flex align-items-center">
                                                                            {formatMoney(order.total, order.currency, locale)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-5">{t("noBookings")}</p>
                                            )}
                                            <div className="card shadow-none mb-2">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                                        <Link
                                                            href={routes.hotelDetails}
                                                            className="avatar avatar-xl flex-shrink-0 me-2"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-04.jpg"
                                                                className="img-fluid rounded-circle"
                                                                alt="Img"
                                                            />
                                                        </Link>
                                                        <div className="flex-fill">
                                                            <span className="badge badge-soft-teal badge-xs rounded-pill mb-1">
                                                                <i className="isax isax-airplane5 me-1" />
                                                                Flight
                                                            </span>
                                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                                <h6 className="fs-16 text-truncate">
                                                                    <Link href={routes.hotelDetails}>
                                                                        AstraFlight 215{" "}
                                                                        <span className="text-gray-5 fw-normal fs-14">
                                                                            ( Suite )
                                                                        </span>
                                                                    </Link>
                                                                </h6>
                                                                <span className="badge badge-info badge-sm rounded-pill">
                                                                    <i className="ti ti-point-filled me-1" />
                                                                    Inpogress
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <p className="fs-14 d-flex align-items-center border-end pe-2 me-2 mb-0">
                                                                    <i className="isax isax-calendar-25 me-2" />
                                                                    Date : 25 May 2025
                                                                </p>
                                                                <p className="fs-14 d-flex align-items-center">
                                                                    <i className="isax isax-timer5 me-2" />
                                                                    Time : 09:30 AM
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow-none mb-0">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                                                        <Link
                                                            href={routes.hotelDetails}
                                                            className="avatar avatar-xl flex-shrink-0 me-2"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/tours/tours-24.jpg"
                                                                className="img-fluid rounded-circle"
                                                                alt="Img"
                                                            />
                                                        </Link>
                                                        <div className="flex-fill">
                                                            <span className="badge badge-soft-pink badge-xs rounded-pill mb-1">
                                                                <i className="isax isax-signpost me-1" />
                                                                Tour
                                                            </span>
                                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                                <h6 className="fs-16 text-truncate">
                                                                    <Link href={routes.hotelDetails}>Rainbow Valley</Link>
                                                                </h6>
                                                                <span className="badge badge-success badge-sm rounded-pill">
                                                                    <i className="ti ti-point-filled me-1" />
                                                                    Completed
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <p className="fs-14 d-flex align-items-center border-end pe-2 me-2 mb-0">
                                                                    <i className="isax isax-calendar-25 me-2" />
                                                                    Date : 25 May 2025
                                                                </p>
                                                                <p className="fs-14 d-flex align-items-center">
                                                                    <i className="isax isax-timer5 me-2" />
                                                                    Time : 09:30 AM
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-5 d-flex">
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
                                                        January
                                                    </Link>
                                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                January
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                February
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                March
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-0">
                                                    <p className="mb-0">Total Amount Spend</p>
                                                    <h3>$2659</h3>
                                                </div>
                                                <div id="tours_chart" />
                                                <ReactApexChart
                                                    options={toursChart.options}
                                                    series={toursChart.series}
                                                    type="radialBar"
                                                    height={280}
                                                />

                                                <p className="fs-14">
                                                    <span className="text-success">+21 %</span> increased
                                                    Compared to Last year
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl col-lg-4 col-sm-6">
                                    {/* Tours Plan*/}
                                    <div className="tours-item mb-4">
                                        <Link href={routes.hotelGrid} className="tours-img">
                                            <ImageWithBasePath
                                                src="assets/img/hotels/hotel-15.jpg"
                                                className="img-fluid w-100"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="tours-content text-center">
                                            <h6 className="fs-16 fw-medium">968 Hotels</h6>
                                            <Link
                                                href={routes.hotelGrid}
                                                className="link-primary text-decoration-underline"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                    {/* /Tours Plan*/}
                                </div>
                                <div className="col-xl col-lg-4 col-sm-6">
                                    {/* Tours Plan*/}
                                    <div className="tours-item mb-4">
                                        <Link href={routes.flightGrid} className="tours-img">
                                            <ImageWithBasePath
                                                src="assets/img/flight/flight-07.jpg"
                                                className="img-fluid w-100"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="tours-content text-center">
                                            <h6 className="fs-16 fw-medium">689 Flights</h6>
                                            <Link
                                                href={routes.flightGrid}
                                                className="link-primary text-decoration-underline"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                    {/* /Tours Plan*/}
                                </div>
                                <div className="col-xl col-lg-4 col-sm-6">
                                    {/* Tours Plan*/}
                                    <div className="tours-item mb-4">
                                        <Link href={routes.tourGrid} className="tours-img">
                                            <ImageWithBasePath
                                                src="assets/img/tours/tours-24.jpg"
                                                className="img-fluid w-100"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="tours-content text-center">
                                            <h6 className="fs-16 fw-medium">985 Tours</h6>
                                            <Link
                                                href={routes.tourGrid}
                                                className="link-primary text-decoration-underline"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                    {/* /Tours Plan*/}
                                </div>
                                <div className="col-xl col-lg-4 col-sm-6">
                                    {/* Tours Plan*/}
                                    <div className="tours-item mb-4">
                                        <Link href={routes.carGrid} className="tours-img">
                                            <ImageWithBasePath
                                                src="assets/img/cars/car-11.jpg"
                                                className="img-fluid w-100"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="tours-content text-center">
                                            <h6 className="fs-16 fw-medium">698 Cars</h6>
                                            <Link
                                                href={routes.carGrid}
                                                className="link-primary text-decoration-underline"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                    {/* /Tours Plan*/}
                                </div>
                                <div className="col-xl col-lg-4 col-sm-6">
                                    {/* Tours Plan*/}
                                    <div className="tours-item mb-4">
                                        <Link href={routes.cruiseGrid} className="tours-img">
                                            <ImageWithBasePath
                                                src="assets/img/cruise/cruise-15.jpg"
                                                className="img-fluid w-100"
                                                alt="img"
                                            />
                                        </Link>
                                        <div className="tours-content text-center">
                                            <h6 className="fs-16 fw-medium">968 Cruise</h6>
                                            <Link
                                                href={routes.cruiseGrid}
                                                className="link-primary text-decoration-underline"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                    {/* /Tours Plan*/}
                                </div>
                            </div>
                            <div className="row">
                                {/* Recent Booking */}
                                <div className="col-xl-6 col-xxl-7 d-flex">
                                    <div className="card shadow-none flex-fill">
                                        <div className="card-body pb-0">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h6>{t("recentBookings")}</h6>
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
                                                <div className="mb-2">
                                                    <p className="mb-0">{t("spendingForBookings")}</p>
                                                    <div className="d-flex align-items-center">
                                                        <h3 className="me-2">
                                                            {formatMoney(
                                                                dashboard?.summary.grossPaid,
                                                                dashboard?.summary.currency,
                                                                locale
                                                            )}
                                                        </h3>
                                                        <p className="fs-14">
                                                            <span className="badge badge-soft-success badge-md border border-success rounded-pill me-2">
                                                                <i className="isax isax-arrow-up-3 " />
                                                                12%
                                                            </span>
                                                            vs last years
                                                        </p>
                                                    </div>
                                                </div>
                                                <div id="transcation_chart" />
                                                <ReactApexChart
                                                    options={chartOptions}
                                                    series={chartOptions.series}
                                                    type="bar"
                                                    height={250}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Recent Booking */}
                                {/* Most Booked Services */}
                                <div className="col-xl-6 col-xxl-5 d-flex">
                                    <div className="card shadow-none flex-fill">
                                        <div className="card-body">
                                            <h6 className="mb-4">Most Booked Services</h6>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href={routes.flightDetails}
                                                        className="avatar avatar-lg flex-shrink-0 me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-01.jpg"
                                                            className="img-fluid rounded-circle"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                    <div>
                                                        <h6 className="fs-16">
                                                            <Link href={routes.flightDetails}>Cloudrider 789</Link>{" "}
                                                            <span className="badge badge-soft-teal badge-xs rounded-pill">
                                                                <i className="isax isax-signpost me-1" />
                                                                Flight
                                                            </span>
                                                        </h6>
                                                        <p className="fs-14">Last Booked : 25 Apr 2025</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={routes.flightDetails}
                                                    className="btn rebook-btn btn-sm"
                                                >
                                                    <i className="isax isax-calendar-add5 me-1" />
                                                    Rebook
                                                </Link>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href={routes.hotelDetails}
                                                        className="avatar avatar-lg flex-shrink-0 me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-21.jpg"
                                                            className="img-fluid rounded-circle"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                    <div>
                                                        <h6 className="fs-16">
                                                            <Link href={routes.hotelDetails}>The Luxe Haven</Link>{" "}
                                                            <span className="badge badge-soft-info badge-xs rounded-pill">
                                                                <i className="isax isax-signpost me-1" />
                                                                Hotel
                                                            </span>
                                                        </h6>
                                                        <p className="fs-14">Last Booked : 16 May 2025</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={routes.hotelDetails}
                                                    className="btn rebook-btn btn-sm"
                                                >
                                                    <i className="isax isax-calendar-add5 me-1" />
                                                    Rebook
                                                </Link>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href={routes.carDetails}
                                                        className="avatar avatar-lg flex-shrink-0 me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-09.jpg"
                                                            className="img-fluid rounded-circle"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                    <div>
                                                        <h6 className="fs-16">
                                                            <Link href={routes.carDetails}>Ford Mustang 4.0 AT</Link>{" "}
                                                            <span className="badge badge-soft-purple badge-xs rounded-pill">
                                                                <i className="isax isax-signpost me-1" />
                                                                Car
                                                            </span>
                                                        </h6>
                                                        <p className="fs-14">Last Booked : 25 May 2025</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={routes.carDetails}
                                                    className="btn rebook-btn btn-sm"
                                                >
                                                    <i className="isax isax-calendar-add5 me-1" />
                                                    Rebook
                                                </Link>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href={routes.cruiseDetails}
                                                        className="avatar avatar-lg flex-shrink-0 me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-26.jpg"
                                                            className="img-fluid rounded-circle"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                    <div>
                                                        <h6 className="fs-16">
                                                            <Link href={routes.cruiseDetails}>Super Aquamarine</Link>{" "}
                                                            <span className="badge badge-soft-cyan badge-xs rounded-pill">
                                                                <i className="isax isax-signpost me-1" />
                                                                Cruise
                                                            </span>
                                                        </h6>
                                                        <p className="fs-14">Last Booked : 18 Jun 2025</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={routes.cruiseDetails}
                                                    className="btn rebook-btn btn-sm"
                                                >
                                                    <i className="isax isax-calendar-add5 me-1" />
                                                    Rebook
                                                </Link>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href={routes.tourDetails}
                                                        className="avatar avatar-lg flex-shrink-0 me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-29.jpg"
                                                            className="img-fluid rounded-circle"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                    <div>
                                                        <h6 className="fs-16">
                                                            <Link href={routes.tourDetails}>Mystic Falls</Link>{" "}
                                                            <span className="badge badge-soft-pink badge-xs rounded-pill">
                                                                <i className="isax isax-signpost me-1" />
                                                                Tour
                                                            </span>
                                                        </h6>
                                                        <p className="fs-14">Last Booked : 25 May 2025</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={routes.tourDetails}
                                                    className="btn rebook-btn btn-sm"
                                                >
                                                    <i className="isax isax-calendar-add5 me-1" />
                                                    Rebook
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Most Booked Services */}
                            </div>
                            <div className="row">
                                {/* Notifications */}
                                <div className="col-xl-5 d-flex">
                                    <div className="card shadow-none flex-fill">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h6>Notifications</h6>
                                                <div className="dropdown ">
                                                    <Link
                                                        href="#"
                                                        className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i className="isax isax-document-filter me-2 fs-14 text-gray-6" />
                                                        All
                                                    </Link>
                                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                All
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                Recent
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0 me-2">
                                                    <i className="isax isax-info-circle5" />
                                                </span>
                                                <div className="flex-fill overflow-hidden">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <h6 className="fs-16 text-truncate">
                                                            Pre-Tour Information
                                                        </h6>
                                                        <p className="fs-14 text-primary text-nowrap">
                                                            1 day ago
                                                        </p>
                                                    </div>
                                                    <p className="fs-14 two-line-ellipsis">
                                                        Your <span className="fw-medium">Mountain Valley</span>{" "}
                                                        is on 15 May 2024. Please arrive at los Angeles"
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <span className="avatar avatar-lg bg-purple rounded-circle flex-shrink-0 me-2">
                                                    <i className="isax isax-calendar-remove5" />
                                                </span>
                                                <div className="flex-fill overflow-hidden">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <h6 className="fs-16 text-truncate">
                                                            Rescheduling Notification
                                                        </h6>
                                                        <p className="fs-14 text-primary text-nowrap">
                                                            1 day ago
                                                        </p>
                                                    </div>
                                                    <p className="fs-14 two-line-ellipsis">
                                                        Your Hotel Booking of Suite Room on 15 Jan 2025 has been
                                                        rescheduled to 20 May 2025.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <span className="avatar avatar-lg bg-teal rounded-circle flex-shrink-0 me-2">
                                                    <i className="isax isax-calendar-edit5" />
                                                </span>
                                                <div className="flex-fill overflow-hidden">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <h6 className="fs-16 text-truncate">
                                                            Booking Confirmation
                                                        </h6>
                                                        <p className="fs-14 text-primary text-nowrap">
                                                            1 day ago
                                                        </p>
                                                    </div>
                                                    <p className="fs-14 two-line-ellipsis">
                                                        Thank you for choosing Air India. Your adventure is set
                                                        for 21 Jan 2025 at 04:45 PM.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0 me-2">
                                                    <i className="isax isax-color-swatch5" />
                                                </span>
                                                <div className="flex-fill overflow-hidden">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <h6 className="fs-16 text-truncate">
                                                            Special Offer Notification
                                                        </h6>
                                                        <p className="fs-14 text-primary text-nowrap">
                                                            1 day ago
                                                        </p>
                                                    </div>
                                                    <p className="fs-14 two-line-ellipsis">
                                                        Book next tour with us by Jan 2025 to avail Offer
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Notifications */}
                                {/* Recent Invoices */}
                                <div className="col-xl-7 d-flex">
                                    <div className="card shadow-none flex-fill">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h6>Recent Invoices</h6>
                                                <div className="dropdown ">
                                                    <Link
                                                        href="#"
                                                        className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                                                        data-bs-toggle="dropdown"
                                                    >
                                                        <i className="isax isax-document-filter me-2 fs-14 text-gray-6" />
                                                        All
                                                    </Link>
                                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                All
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                <i className="ti ti-point-filled me-1" />
                                                                Recent
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card shadow-none mb-4">
                                                <div className="card-body p-2">
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href={routes.flightDetails}
                                                            className="avatar avatar-lg rounded-circle flex-shrink-0 me-2"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/flight/flight-01.jpg"
                                                                className="img-fluid rounded-circle"
                                                                alt="Img"
                                                            />
                                                        </Link>
                                                        <div className="d-flex justify-content-between align-items-center flex-fill">
                                                            <div>
                                                                <h6 className="fs-16 fw-medium mb-1">
                                                                    <Link href={routes.flightDetails}>Cloudrider 789</Link>
                                                                </h6>
                                                                <div className="d-flex align-items-center flex-wrap">
                                                                    <Link
                                                                        href={routes.invoices}
                                                                        className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                                                    >
                                                                        #INV12565
                                                                    </Link>
                                                                    <p className="fs-14">Date: 15 May 2024</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-end">
                                                                <h6 className="fw-medium mb-1">$569</h6>
                                                                <p className="fs-14 text-success">Paid</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow-none mb-4">
                                                <div className="card-body p-2">
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href={routes.hotelDetails}
                                                            className="avatar avatar-lg rounded-circle flex-shrink-0 me-2"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/hotels/hotel-24.jpg"
                                                                className="img-fluid rounded-circle"
                                                                alt="Img"
                                                            />
                                                        </Link>
                                                        <div className="d-flex justify-content-between align-items-center flex-fill">
                                                            <div>
                                                                <h6 className="fs-16 fw-medium mb-1">
                                                                    <Link href={routes.hotelDetails}>The Luxe Haven</Link>
                                                                </h6>
                                                                <div className="d-flex align-items-center flex-wrap">
                                                                    <Link
                                                                        href={routes.invoices}
                                                                        className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                                                    >
                                                                        #INV12564
                                                                    </Link>
                                                                    <p className="fs-14">Date: 13 May 2024</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-end">
                                                                <h6 className="fw-medium mb-1">$430</h6>
                                                                <p className="fs-14 text-success">Paid</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow-none mb-4">
                                                <div className="card-body p-2">
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href={routes.carDetails}
                                                            className="avatar avatar-lg rounded-circle flex-shrink-0 me-2"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/cars/car-07.jpg"
                                                                className="img-fluid rounded-circle"
                                                                alt="Img"
                                                            />
                                                        </Link>
                                                        <div className="d-flex justify-content-between align-items-center flex-fill">
                                                            <div>
                                                                <h6 className="fs-16 fw-medium mb-1">
                                                                    <Link href={routes.carDetails}>Ford Mustang 4.0 AT</Link>
                                                                </h6>
                                                                <div className="d-flex align-items-center flex-wrap">
                                                                    <Link
                                                                        href={routes.invoices}
                                                                        className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                                                    >
                                                                        #INV12563
                                                                    </Link>
                                                                    <p className="fs-14">Date: 10 May 2024</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-end">
                                                                <h6 className="fw-medium mb-1">$380</h6>
                                                                <p className="fs-14 text-success">Paid</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow-none mb-0">
                                                <div className="card-body p-2">
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            href={routes.cruiseDetails}
                                                            className="avatar avatar-lg rounded-circle flex-shrink-0 me-2"
                                                        >
                                                            <ImageWithBasePath
                                                                src="assets/img/cruise/cruise-02.jpg"
                                                                className="img-fluid rounded-circle"
                                                                alt="Img"
                                                            />
                                                        </Link>
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
                                                                <h6 className="fw-medium mb-1">$475</h6>
                                                                <p className="fs-14 text-success">Paid</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Recent Invoices */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}



        </div>
    )
}

export default Dashboard
