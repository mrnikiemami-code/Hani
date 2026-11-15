"use client";

import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import type { TableData } from '../../../../core/data/interface';
import Table from "../../../../components/data-table/index";
import Link from "next/link";
import Sidebar from '../../sidebar/sidebar';
import PredefinedDateRanges from '../../../../components/common-date-picker/datePicker';
import { all_routes } from '../../../../routes/all_routes';
import { AgentBusBookingData } from '../../../../core/data/mock/agentBusBookingData';
import AgentBusBookingModal from './agentBusBookingModal';

const AgentBusBooking = () => {

    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Bus Bookings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Bus Bookings',
            active: true,
        },
    ];


    const data = AgentBusBookingData;
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
            title: "Bus & Brands",
            dataIndex: "",
            key: "",
            render: (_text: any, render: any) => (
                <div>
                    <p className="text-dark mb-0 fw-medium fs-14">
                        <Link href={routes.flightDetails}>{render.flightName}</Link>
                    </p>
                    <span className="fs-14 fw-normal text-gray-6">{render.flightType}</span>
                </div>
            ),
            sorter: (a: TableData, b: TableData) =>
                a.flightName.length - b.flightName.length,
        },
        {
            title: "Booked By",
            dataIndex: "bookedBy",
            key: "bookedBy",
            render: (_text: any, render: any) => (
                <>
                    <h6 className="fs-14 mb-1">{render.bookedBy}</h6>
                    <span className="fs-14 fw-normal text-gray-6">{render.bookedLocation}</span>
                </>
            ),
            sorter: (a: TableData, b: TableData) => a.bookedby.length - b.bookedby.length,
        },
        {
            title: "Travellers",
            dataIndex: "travellers",
            key: "travellers",
            render: (_text: any, render: any) => (
                <>
                    <h6 className="fs-14 mb-1">{render.tickect}</h6>
                    <span className="fs-14 fw-normal text-gray-6">{render.members}</span>
                </>
            ),
            sorter: (a: TableData, b: TableData) => a.ticket.length - b.ticket.length,
        },
        {
            title: "Days",
            dataIndex: "days",
            key: "days",
            sorter: (a: TableData, b: TableData) => a.from_to.length - b.from_to.length,
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
            <Breadcrumb title="Bus Bookings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 ">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        {/* Hotel Booking */}
                        <div className="col-xl-9 col-lg-8 theiaStickySidebar">
                            {/* Booking Header */}
                            <div className="card booking-header border-0">
                                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                                    <div>
                                        <h6 className="mb-1">Bus Bookings</h6>
                                        <p className="fs-14 text-gray-6 fw-normal ">
                                            No of Booking : 40
                                        </p>
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
                            {/* /Booking Header */}
                            {/* Bus Booking List */}
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
                                                    Ticket Type
                                                </Link>
                                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Business Class
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Economy
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Fare Economy
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
                                                <div className="dropdown">
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
                            {/* /Bus Booking List */}

                        </div>
                        {/* /Hotel Booking */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
            <AgentBusBookingModal />
        </div>
    )
}

export default AgentBusBooking
