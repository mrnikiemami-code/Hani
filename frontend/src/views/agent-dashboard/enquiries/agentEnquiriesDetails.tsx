"use client";
import React from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import DefaultEditor from 'react-simple-wysiwyg';

const AgentEnquiriesDetails = () => {

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
    ]; const [values, setValue] = React.useState();
    function onChange(e: any) {
        setValue(e.target.value);
    }

    return (
        <div>
            <Breadcrumb title="Enquirers" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div>
                            <div className="mb-3">
                                <Link href={routes.agentEnquirers} className="text-primary">
                                    <i className="isax isax-arrow-left me-2" />
                                    Back to Enquiry List
                                </Link>
                            </div>
                            <div className="alert alert-teal alert-dismissible d-flex align-items-center border-0 mb-4 fade show">
                                <i className="isax isax-info-circle5 me-2" />
                                Reply added
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                >
                                    <i className="fas fa-xmark" />
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-lg-4 theiaStickySidebar">
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body">
                                        <h5 className="mb-3">Form Data</h5>
                                        <div className="mb-2">
                                            <h6 className="fw-medium mb-1">Name</h6>
                                            <p className="fs-14">Ronald Moultrie</p>
                                        </div>
                                        <div className="mb-2">
                                            <h6 className="fw-medium mb-1">Phone Number </h6>
                                            <p className="fs-14">+1 43567 67887</p>
                                        </div>
                                        <div className="mb-2">
                                            <h6 className="fw-medium mb-1">Email</h6>
                                            <p className="fs-14">roladm45@example.com</p>
                                        </div>
                                        <div className="mb-4 pb-4 border-bottom">
                                            <h6 className="fw-medium mb-1">Description</h6>
                                            <p className="fs-14">
                                                I’m planning a group of 10 people for a wine-tasting tour.
                                                Could you send me pricing information for this?
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <DefaultEditor value={values} onChange={onChange} />
                                        </div>
                                        <Link href="#" className="btn btn-primary">
                                            Add New Reply
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* /Sidebar */}
                            <div className="col-lg-8">
                                {/* Hotel-Booking List */}
                                <div className="card hotel-list mb-0">
                                    <div className="card-body p-0">
                                        <div className="list-header">
                                            <h6>Recent updates</h6>
                                        </div>
                                        {/* Hotel List */}
                                        <div className="custom-datatable-filter table-responsive">
                                            <table className="table datatable">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email Address</th>
                                                        <th>Reply Info</th>
                                                        <th>Replied On</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h6 className="fs-14">Chris Foxy</h6>
                                                        </td>
                                                        <td>agent@example.com</td>
                                                        <td>we will check and get back.</td>
                                                        <td>15 May 2025</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* /Hotel List */}
                                    </div>
                                </div>
                                {/* /Hotel-Booking List */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>


        </div>
    )
}

export default AgentEnquiriesDetails
