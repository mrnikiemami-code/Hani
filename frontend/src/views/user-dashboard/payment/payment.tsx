"use client";

import Link from "next/link";
import type { TableData } from '../../../core/data/interface';
import Table from "../../../components/data-table/index";
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PredefinedDateRanges from '../../../components/common-date-picker/datePicker';
import { PaymentData } from '../../../core/data/mock/paymentData';
import { all_routes } from '../../../routes/all_routes';
import Sidebar from '../../../components/common-sidebar/sidebar';

const Payment = () => {

    const routes = all_routes;

    const data = PaymentData;
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (_text: any, render: any) => (
                <Link href={routes.invoices} className="link-primary fw-medium">
                    {render.id}
                </Link>

            ),
            sorter: (a: TableData, b: TableData) => a.id.length - b.id.length,
        },
        {
            title: "Payment",
            dataIndex: "payment",
            key: "payment",
            render: (_text: any, render: any) => (
                <h6 className='fs-14'>{render.payment}</h6>
            ),
            sorter: (a: TableData, b: TableData) =>
                a.payment.length - b.payment.length,
        },
        {
            title: "Service",
            dataIndex: "service",
            key: "service",
            sorter: (a: TableData, b: TableData) => a.service.length - b.service.length,
        },
        {
            title: "Payment Type",
            dataIndex: "paymentType",
            key: "paymentType",
            sorter: (a: TableData, b: TableData) => a.paymentType.length - b.paymentType.length,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            sorter: (a: TableData, b: TableData) => a.amount.length - b.amount.length,
        },
        {
            title: "Status",
            dataIndex: "status",
            sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
            render: (status: any) => (
                <>
                    <span
                        className={`badge  rounded-pill d-inline-flex align-items-center fs-10 ${status === "Completed" ? "badge-success" : status === "Pending" ? "badge-secondary" : "badge-danger"}`}
                    >
                        <i className="ti ti-circle-filled fs-5 me-1" />
                        {status}
                    </span>
                </>
            ),
        },
    ];

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Payments',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Payments',
            active: true,
        },
    ];

    return (
        <div>
            <>
                <div>
                    <Breadcrumb
                        title="Payments"
                        breadcrumbs={breadcrumbs}
                        backgroundClass="breadcrumb-bg-01"
                    />
                </div>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-xl-3 col-lg-4">
                                <Sidebar />
                            </div>
                            {/* /Sidebar */}
                            {/* Payments */}
                            <div className="col-xl-9 col-lg-8">
                                <div className="card hotel-list">
                                    <div className="card-body p-0">
                                        <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                            <h6>Payments</h6>
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
                                                                Completed
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
                                                <div className="input-icon-end position-relative">
                                                    <span className="input-icon-addon">
                                                        <i className="isax isax-calendar-edit" />
                                                    </span>
                                                    <PredefinedDateRanges />
                                                </div>
                                            </div>
                                        </div>
                                        <Table dataSource={data} columns={columns} Selection={false} />
                                    </div>
                                </div>
                            </div>
                            {/* /Payments */}
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>

        </div>
    )
}

export default Payment
