"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';

const ContactUs = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Contact Us',
            active: false,
            link: routes.home1
        },
        {
            label: 'Pages',
            active: false,
        },
        {
            label: 'Contact Us',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb title="Contact Us" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-02" />


            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row align-items-center row-gap-4">
                        <div className="col-xl-7 col-lg-7">
                            <div className="mb-4 mb-lg-0">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h2 className="mb-3">
                                            Reach Out to Our Dedicated Support Team
                                        </h2>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h6 className="mb-2">
                                        Our team is ready to help. Your satisfaction is our priority
                                    </h6>
                                    <p>
                                        Got a question, need advice, or looking for help? Our
                                        knowledgeable team is here to assist you every step of the way.
                                        We’re just a message or call away, ready to provide the guidance
                                        you need.
                                    </p>
                                </div>
                                <div className="border-bottom mb-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <span className="avatar avatar-lg rounded-circle bg-light  text-gray-6 me-2">
                                            <i className="isax isax-sms5 fs-24" />
                                        </span>
                                        <div>
                                            <p className="fs-14 mb-0">Email Address</p>
                                            <h6 className="text-gray-6">dreamtourinfo@example.com</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-bottom mb-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <span className="avatar avatar-lg rounded-circle bg-light  text-gray-6 me-2">
                                            <i className="isax isax-call-calling5 fs-24" />
                                        </span>
                                        <div>
                                            <p className="fs-14 mb-0">Phone Number</p>
                                            <h6 className="text-gray-6">+1 81649 48103</h6>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center">
                                        <span className="avatar avatar-lg rounded-circle bg-light  text-gray-6 me-2">
                                            <i className="isax isax-map-15 fs-24" />
                                        </span>
                                        <div>
                                            <p className="fs-14 mb-0">Our Location</p>
                                            <h6 className="text-gray-6">
                                                2077 Chicago Avenue Orosi, CA 93647
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5">
                            <div className="card bg-light-200 shadow-none mb-0">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <h2 className="mb-1">Get in Touch</h2>
                                        <p className="text-gray-6 mb-1">
                                            How we can help you? Please write down your query
                                        </p>
                                    </div>
                                    <form action={routes.contactUs}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        First Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Last Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Email <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="email" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Phone <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="email" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Message <span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map-grid">
                        <iframe
                            className="w-100"
                            height={300}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}



        </div>
    )
}

export default ContactUs
