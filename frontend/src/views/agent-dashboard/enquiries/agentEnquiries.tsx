"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../sidebar/sidebar';
import PredefinedDateRanges from '../../../components/common-date-picker/datePicker';
import type { TableData } from '../../../core/data/interface';
import Table from "../../../components/data-table/index";
import Link from "next/link";
import { AgentEnquiringData } from '../../../core/data/mock/agentEnquringData';

const AgentEnquiries = () => {

    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Enquirers',
            active: false,
            link: routes.home1
        },
        {
            label: 'Enquirers',
            active: true,
        },
    ];

    const data = AgentEnquiringData;
    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (_text: any, render: any) => (
                <Link
                    href="#"
                    className="link-primary fw-medium"
                >
                    {render.type}
                </Link>

            ),
            sorter: (a: TableData, b: TableData) => a.type.length - b.type.length,
        },
        {
            title: "Enquiry for",
            dataIndex: "enquiryfor",
            key: "enquiryfor",
            render: (_text: any, render: any) => (
                <>
                    <h6 className="fs-14">{render.enquiryfor}</h6>
                </>

            ),
            sorter: (a: TableData, b: TableData) =>
                a.enquiryfor.length - b.enquiryfor.length,
        },
        {
            title: "Customer Info",
            dataIndex: "customerinfo",
            key: "customerinfo",
            render: (_text: any, render: any) => (
                <>
                    <p className="fs-14 fw-n mb-1">{render.customerinfo}</p>
                    <Link href={routes.agentEnquiriesDetails} className="link-primary">
                        View Details
                    </Link>
                </>

            ),
            sorter: (a: TableData, b: TableData) =>
                a.customerinfo.length - b.customerinfo.length,
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
            title: "Inquired On",
            dataIndex: "inquiredOn",
            sorter: (a: TableData, b: TableData) => a.inquiredOn.length - b.inquiredOn.length,
        },
        {
            title: "",
            dataIndex: "action",
            render: (_text: any,_render: any) => (
                <div className="d-flex align-items-center">
                    <Link href={routes.agentEnquiriesDetails}>
                        <i className="isax isax-eye" />
                    </Link>
                </div>

            ),
            sorter: (a: TableData, b: TableData) => a.action.length - b.action.length,
        },
    ];

    return (
        <div>
            <Breadcrumb title="Enquirers" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
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
                            {/* Booking Header */}
                            <div className="card booking-header">
                                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                                    <div>
                                        <h6>Enquiries</h6>
                                        <p className="fs-14 text-gray-6 fw-normal">
                                            No of Enquiries : 200
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
                            {/* Hotel-Booking List */}
                            <div className="card hotel-list">
                                <div className="card-body p-0">
                                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                        <h6 className="">Enquiries List</h6>
                                        <div className="d-flex align-items-center flex-wrap">
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

        </div>
    )
}

export default AgentEnquiries
