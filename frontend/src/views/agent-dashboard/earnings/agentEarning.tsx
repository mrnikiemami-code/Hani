"use client";
import  { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../sidebar/sidebar';
import Link from "next/link";
import PredefinedDateRanges from '../../../components/common-date-picker/datePicker';
import AgentEarningModal from './agentEarningModal';
import ReactApexChart from 'react-apexcharts';

const AgentEarning = () => {

    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Earnings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Earnings',
            active: true,
        },
    ];

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
                height: 295,
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


    return (
        <div>
            <Breadcrumb title="Earnings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />


            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 ">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="row">
                                <div className="col-xl-3">
                                    <div className="card earning-box bg-primary">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <span className="avatar avatar-md rounded-circle mb-2">
                                                    <i className="isax isax-graph5 fs-24" />
                                                </span>
                                                <p className="text-white mb-1">Total Earning This Month</p>
                                                <h3 className="text-white mb-1">$2659</h3>
                                                <Link
                                                    href="#"
                                                    className="text-decoration-underline text-white"
                                                >
                                                    View Transactions
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-9">
                                    <div className="card card-detail shadow-none">
                                        <div className="card-body">
                                            <h5 className="mb-3">Card Details</h5>
                                            <div className="row g-4">
                                                <div className="col-xl col-md-3 col-sm-6">
                                                    <div>
                                                        <h6 className="fs-14 fw-medium mb-1">Bank Name</h6>
                                                        <p className="fs-14">Citi Bank Inc</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl col-md-3 col-sm-6">
                                                    <div>
                                                        <h6 className="fs-14 fw-medium mb-1">Branch Name</h6>
                                                        <p className="fs-14">London</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl col-md-4 col-sm-6">
                                                    <div>
                                                        <h6 className="fs-14 fw-medium mb-1">Account Number</h6>
                                                        <p className="fs-14">5396 5250 1908 XXXX</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl col-md-2 col-sm-6">
                                                    <div>
                                                        <h6 className="fs-14 fw-medium mb-1">Account Name</h6>
                                                        <p className="fs-14">Darren</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between pt-3 mt-3 border-top">
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit_card"
                                                        className="text-primary text-decoration-underline me-2"
                                                    >
                                                        Edit Card
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#add_card"
                                                        className="text-primary text-decoration-underline"
                                                    >
                                                        Add New Card
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        href="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#saved_card"
                                                        className="text-decoration-underline"
                                                    >
                                                        View Saved Cards
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-0 bg-light">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h5>Payout Details</h5>
                                        <p className="fs-14">Expected payout on : 25 Jan 2025</p>
                                    </div>
                                    <div className="row align-items-center g-4">
                                        <div className="col-md-4">
                                            <div>
                                                <p className="mb-1">Amount to be paid</p>
                                                <h5>$2,565.60</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div>
                                                <p className="mb-1">Last With Drawn Payment</p>
                                                <h5>$1,565.60</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="text-end">
                                                <Link
                                                    href="#withdraw_payment"
                                                    data-bs-toggle="modal"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Withdraw Payment
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <div className="col-md-6">
                                            <div className="mb-2">
                                                <p className="mb-0">Total Earnings this Year</p>
                                                <div className="d-flex align-items-center">
                                                    <h3>$20,659</h3>
                                                    <p className="fs-14 ms-2">
                                                        <span className="badge badge-soft-success badge-md border border-success rounded-pill me-2">
                                                            <i className="isax isax-arrow-up-3 " />
                                                            12%
                                                        </span>
                                                        vs last years
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-2">
                                                <p className="mb-0">Total Earnings Last Year</p>
                                                <h3>$16,659</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div id="earning-chart" >
                                                <ReactApexChart
                                                    options={earningChart.options}
                                                    series={earningChart.series}
                                                    type="bar"
                                                    height={295}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="place-nav listing-nav">
                                <ul className="nav mb-2">
                                    <li className="me-2">
                                        <Link
                                            href="#"
                                            className="nav-link active"
                                            data-bs-toggle="tab"
                                            data-bs-target="#earning-list"
                                        >
                                            Earnings
                                        </Link>
                                    </li>
                                    <li className="me-2">
                                        <Link
                                            href="#"
                                            className="nav-link"
                                            data-bs-toggle="tab"
                                            data-bs-target="#withdraw-list"
                                        >
                                            Withdraw
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="earning-list">
                                    {/* Earning List */}
                                    <div className="card hotel-list">
                                        <div className="card-body p-0">
                                            <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                                <h6 className="">Invoices</h6>
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
                                                            Status
                                                        </Link>
                                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                                            <li>
                                                                <Link
                                                                    href="#"
                                                                    className="dropdown-item rounded-1"
                                                                >
                                                                    Paid
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
                                                        </ul>
                                                    </div>
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <div className="input-icon-start position-relative">
                                                            <span className="icon-addon">
                                                                <i className="isax isax-calendar-edit fs-14" />
                                                            </span>
                                                            <PredefinedDateRanges />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="custom-datatable-filter table-responsive">
                                                <table className="table datatable">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Invoice For</th>
                                                            <th>Service</th>
                                                            <th>Payment Type</th>
                                                            <th>Date</th>
                                                            <th>Amount</th>
                                                            <th>Status</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-1245
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    Hotel Atheena Plaza
                                                                </p>
                                                            </td>
                                                            <td>Hotel</td>
                                                            <td>Card</td>
                                                            <td>15 May 2025, 10:00 AM</td>
                                                            <td>$11,569</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-3215
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    Skybridge-12
                                                                </p>
                                                            </td>
                                                            <td>Flight</td>
                                                            <td>Paypal</td>
                                                            <td>20 May 2025, 10:00 AM</td>
                                                            <td>$12,543</td>
                                                            <td>
                                                                <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Pending
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-4581
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    The Queen of Ocean
                                                                </p>
                                                            </td>
                                                            <td>Cruise</td>
                                                            <td>Stripe</td>
                                                            <td>27 May 2025, 10:00 AM</td>
                                                            <td>$14,697</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-6545
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    Ford Mustang
                                                                </p>
                                                            </td>
                                                            <td>Car</td>
                                                            <td>Card</td>
                                                            <td>12 Jun 2025, 10:00 AM</td>
                                                            <td>$10,528</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-5769
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    PlayPalooza Part
                                                                </p>
                                                            </td>
                                                            <td>Tour</td>
                                                            <td>Stripe</td>
                                                            <td>18 Jun 2025, 10:00 AM</td>
                                                            <td>$12,297</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-4742
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    The Urban Retreat
                                                                </p>
                                                            </td>
                                                            <td>Hotel</td>
                                                            <td>Card</td>
                                                            <td>22 Jun 2025, 10:00 AM</td>
                                                            <td>$18,349</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-9364
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    Foodie Fiesta
                                                                </p>
                                                            </td>
                                                            <td>Tour</td>
                                                            <td>Stripe</td>
                                                            <td>16 Jul 2025, 10:00 AM</td>
                                                            <td>$17,875</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-6184
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    Nimbus 345
                                                                </p>
                                                            </td>
                                                            <td>Flight</td>
                                                            <td>Paypal</td>
                                                            <td>25 Jul 2025, 10:00 AM</td>
                                                            <td>$15,175</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-8207
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    The Grand Horizon
                                                                </p>
                                                            </td>
                                                            <td>Hotel</td>
                                                            <td>Card</td>
                                                            <td>14 Jul 2025, 10:00 AM</td>
                                                            <td>$12,766</td>
                                                            <td>
                                                                <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Cancelled
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#earning_invoice"
                                                                >
                                                                    #IN-3854
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p className="text-dark mb-0 fw-medium fs-14">
                                                                    Mercedes-benz
                                                                </p>
                                                            </td>
                                                            <td>Car</td>
                                                            <td>Paypal</td>
                                                            <td>28 Aug 2025, 10:00 AM</td>
                                                            <td>$13,496</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Paid
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#earning_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Earning List */}
                                    <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                                        <div className="value d-flex align-items-center">
                                            <span>Show</span>
                                            <select>
                                                <option>5</option>
                                                <option>10</option>
                                                <option>20</option>
                                            </select>
                                            <span>entries</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Link href="#">
                                                <span className="me-3">
                                                    <i className="isax isax-arrow-left-2" />
                                                </span>
                                            </Link>
                                            <nav aria-label="Page navigation">
                                                <ul className="paginations d-flex justify-content-center align-items-center">
                                                    <li className="page-item me-2">
                                                        <Link
                                                            className="page-link-1 active d-flex justify-content-center align-items-center "
                                                            href="#"
                                                        >
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item me-2">
                                                        <Link
                                                            className="page-link-1 d-flex justify-content-center align-items-center"
                                                            href="#"
                                                        >
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item ">
                                                        <Link
                                                            className="page-link-1 d-flex justify-content-center align-items-center"
                                                            href="#"
                                                        >
                                                            3
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            <Link href="#">
                                                <span className="ms-3">
                                                    <i className="isax isax-arrow-right-3" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="withdraw-list">
                                    {/* Withdraw List List */}
                                    <div className="card hotel-list">
                                        <div className="card-body p-0">
                                            <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                                <h6>Invoices</h6>
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
                                                            Status
                                                        </Link>
                                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                                            <li>
                                                                <Link
                                                                    href="#"
                                                                    className="dropdown-item rounded-1"
                                                                >
                                                                    Paid
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
                                                        </ul>
                                                    </div>
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <div className="input-icon-start position-relative">
                                                            <span className="icon-addon">
                                                                <i className="isax isax-calendar-edit fs-14" />
                                                            </span>
                                                            <PredefinedDateRanges />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="custom-datatable-filter table-responsive">
                                                <table className="table datatable">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Date</th>
                                                            <th>Amount</th>
                                                            <th>Status</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-1245
                                                                </Link>
                                                            </td>
                                                            <td>15 May 2025, 10:00 AM</td>
                                                            <td>$11,569</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Completed
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-3215
                                                                </Link>
                                                            </td>
                                                            <td>20 May 2025, 10:00 AM</td>
                                                            <td>$12,543</td>
                                                            <td>
                                                                <span className="badge badge-secondary rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Pending
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-4581
                                                                </Link>
                                                            </td>
                                                            <td>27 May 2025, 10:00 AM</td>
                                                            <td>$14,697</td>
                                                            <td>
                                                                <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Cancelled
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-6545
                                                                </Link>
                                                            </td>
                                                            <td>12 Jun 2025, 10:00 AM</td>
                                                            <td>$10,528</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Completed
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-5769
                                                                </Link>
                                                            </td>
                                                            <td>18 Jun 2025, 10:00 AM</td>
                                                            <td>$12,297</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Completed
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-4742
                                                                </Link>
                                                            </td>
                                                            <td>22 Jun 2025, 10:00 AM</td>
                                                            <td>$18,349</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Completed
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-9364
                                                                </Link>
                                                            </td>
                                                            <td>16 Jul 2025, 10:00 AM</td>
                                                            <td>$17,875</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Completed
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-6184
                                                                </Link>
                                                            </td>
                                                            <td>25 Jul 2025, 10:00 AM</td>
                                                            <td>$15,175</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Completed
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-8207
                                                                </Link>
                                                            </td>
                                                            <td>14 Jul 2025, 10:00 AM</td>
                                                            <td>$12,766</td>
                                                            <td>
                                                                <span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Cancelled
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Link
                                                                    href="#"
                                                                    className="link-primary fw-medium"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#withdraw_invoice"
                                                                >
                                                                    #WR-3854
                                                                </Link>
                                                            </td>
                                                            <td>28 Aug 2025, 10:00 AM</td>
                                                            <td>$13,496</td>
                                                            <td>
                                                                <span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10">
                                                                    <i className="fa-solid fa-circle fs-5 me-1" />
                                                                    Completed
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#withdraw_invoice"
                                                                        className="me-2"
                                                                    >
                                                                        <i className="isax isax-eye" />
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <i className="isax isax-document-download" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Withdraw List */}
                                    <div className="table-paginate d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                                        <div className="value d-flex align-items-center">
                                            <span>Show</span>
                                            <select>
                                                <option>5</option>
                                                <option>10</option>
                                                <option>20</option>
                                            </select>
                                            <span>entries</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Link href="#">
                                                <span className="me-3">
                                                    <i className="isax isax-arrow-left-2" />
                                                </span>
                                            </Link>
                                            <nav aria-label="Page navigation">
                                                <ul className="paginations d-flex justify-content-center align-items-center">
                                                    <li className="page-item me-2">
                                                        <Link
                                                            className="page-link-1 active d-flex justify-content-center align-items-center "
                                                            href="#"
                                                        >
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item me-2">
                                                        <Link
                                                            className="page-link-1 d-flex justify-content-center align-items-center"
                                                            href="#"
                                                        >
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item ">
                                                        <Link
                                                            className="page-link-1 d-flex justify-content-center align-items-center"
                                                            href="#"
                                                        >
                                                            3
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            <Link href="#">
                                                <span className="ms-3">
                                                    <i className="isax isax-arrow-right-3" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AgentEarningModal />
        </div>
    )
}

export default AgentEarning
