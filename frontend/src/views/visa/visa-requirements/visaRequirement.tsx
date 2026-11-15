"use client";
import Link from "next/link";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "../../../components/image-with-base-path";

const VisaRequirement = () => {
    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: "Visa",
            link: routes.allService1,
            active: false,
        },
        {
            label: "Visa",
            active: true,
        },
        {
            label: "Visa Requirements",
            active: true,
        },
    ];
    return (
        <>
            <Breadcrumb
                title="Visa"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-08"
            />
            {/* Page Wrapper */}
            <div className="content">
                <section className="fast-visa-section section-padding">
                    <div className="container">
                        {/* row start */}
                        <div className="row align-items-center row-gap-5">
                            <div className="col-lg-6">
                                <div className="visa-section-header text-start">
                                    <span>Fast &amp; Reliable Visa Processing</span>
                                    <h2>Your Journey Starts Here</h2>
                                    <p>
                                        Get your visa approved quickly with our comprehensive guide and
                                        streamlined application process. We make travel dreams a
                                        reality.
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-3">
                                        <i className="isax isax-information5 text-purple me-2" />
                                        Processing time as fast as 3-5 business days
                                    </p>
                                    <p className="mb-3">
                                        <i className="isax isax-information5 text-purple me-2" />
                                        95% approval rate for complete applications
                                    </p>
                                    <p>
                                        <i className="isax isax-information5 text-purple me-2" />
                                        24/7 customer support throughout the process
                                    </p>
                                </div>
                                <div className="d-flex align-items-center mt-4">
                                    <Link href={routes.visaGrid} className="btn btn-light me-2">
                                        Start Application
                                    </Link>
                                    <Link href="#" className="btn btn-primary">
                                        Check Requirments
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="visa-requirement-img">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirements.jpg"
                                        alt="visa-requirement"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* row end */}
                    </div>
                </section>
                <section className="general-visa-section section-padding">
                    <div className="container">
                        <div className="visa-section-header">
                            <span>General Visa Requirements</span>
                            <h2>
                                Ensure you have all the necessary documents before starting your
                                application.
                            </h2>
                        </div>
                        {/* row start */}
                        <div className="row row-gap-4">
                            <div className="col-lg-4 d-flex">
                                <div className="general-visa-card-one flex-fill">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-card-one-bg.png"
                                        alt="visa-requirement-card-one-bg"
                                        className="img-fluid card-bg"
                                    />
                                    <div className="card-title">Valid Passport</div>
                                    <p>
                                        Passport must be valid for at least 6 months beyond your
                                        intended stay
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Original passport with at least 2 blank pages
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Copy of passport bio data page
                                    </p>
                                    <p className="mb-0">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Previous passports if applicable
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex">
                                <div className="general-visa-card-one flex-fill">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-card-one-bg.png"
                                        alt="visa-requirement-card-one-bg"
                                        className="img-fluid card-bg"
                                    />
                                    <div className="card-title">Photographs</div>
                                    <p>
                                        Recent passport-sized photographs meeting specific requirements
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />2 color photographs
                                        (35mm x 45mm)
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        White background, taken within last 6 months
                                    </p>
                                    <p className="mb-0">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Clear face visibility, no glasses
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex">
                                <div className="general-visa-card-one flex-fill">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-card-one-bg.png"
                                        alt="visa-requirement-card-one-bg"
                                        className="img-fluid card-bg"
                                    />
                                    <div className="card-title">Application Form</div>
                                    <p>Completed and signed visa application form our Portal</p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Online application form filled accurately
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Printed and signed by applicant
                                    </p>
                                    <p className="mb-0">
                                        <i className="ti ti-bolt-filled me-2" />
                                        All sections completed in English
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex">
                                <div className="general-visa-card-one flex-fill">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-card-one-bg.png"
                                        alt="visa-requirement-card-one-bg"
                                        className="img-fluid card-bg"
                                    />
                                    <div className="card-title">Travel Documents</div>
                                    <p>Proof of travel plans and accommodation with the travellers</p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Flight reservation or itinerary
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Hotel bookings or invitation letter
                                    </p>
                                    <p className="mb-0">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Travel insurance (recommended)
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex">
                                <div className="general-visa-card-one flex-fill">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-card-one-bg.png"
                                        alt="visa-requirement-card-one-bg"
                                        className="img-fluid card-bg"
                                    />
                                    <div className="card-title">Financial Proof</div>
                                    <p>
                                        Evidence of sufficient funds for the trip with the extra amount
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Bank statements (last 3-6 months)
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Employment letter or business proof
                                    </p>
                                    <p className="mb-0">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Income tax returns (if self-employed)
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex">
                                <div className="general-visa-card-one flex-fill">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-card-one-bg.png"
                                        alt="visa-requirement-card-one-bg"
                                        className="img-fluid card-bg"
                                    />
                                    <div className="card-title">Supporting Documents</div>
                                    <p>Additional documents based on visa type and categories</p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Purpose-specific documents
                                    </p>
                                    <p className="mb-3">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Proof of ties to home country
                                    </p>
                                    <p className="mb-0">
                                        <i className="ti ti-bolt-filled me-2" />
                                        Police clearance certificate (if required)
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* row end */}
                    </div>
                </section>
                <section className="service-work-section section-padding">
                    <div className="container">
                        <div className="row row-gap-4">
                            <div className="col-lg-3 d-flex">
                                <div className="card bg-t flex-fill bg-transparent border-0 shadow-none mb-0">
                                    <div className="card-body">
                                        <h2>Here’s a simple breakdown of how our services work</h2>
                                        <Link href="#" className="btn btn-light">
                                            Start Application
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card mb-0 flex-fill">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <span className="bg-secondary text-white p-3 rounded-circle d-inline-flex align-items-center justify-content-center">
                                                <i className="isax isax-buildings-2 fs-32" />
                                            </span>
                                            <span className="p-2 bg-light rounded d-inline-flex align-items-center justify-content-center fw-medium">
                                                01
                                            </span>
                                        </div>
                                        <div>
                                            <div className="fs-20 fw-semibold text-dark mb-2">
                                                Upload your documents
                                            </div>
                                            <p>
                                                Select the appropriate visa category based on your travel
                                                purpose and review the specific requirements.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card mb-0 flex-fill">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <span className="bg-teal text-white p-3 rounded-circle d-inline-flex align-items-center justify-content-center">
                                                <i className="isax isax-calendar-edit5 fs-32" />
                                            </span>
                                            <span className="p-2 bg-light rounded d-inline-flex align-items-center justify-content-center fw-medium">
                                                02
                                            </span>
                                        </div>
                                        <div>
                                            <div className="fs-20 fw-semibold text-dark mb-2">
                                                Submit Application
                                            </div>
                                            <p>
                                                Fill out the online application form and upload all required
                                                documents. Our system validates submission.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card mb-0 flex-fill">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <span className="bg-indigo text-white p-3 rounded-circle d-inline-flex align-items-center justify-content-center">
                                                <i className="isax isax-direct-send5 fs-32" />
                                            </span>
                                            <span className="p-2 bg-light rounded d-inline-flex align-items-center justify-content-center fw-medium">
                                                03
                                            </span>
                                        </div>
                                        <div>
                                            <div className="fs-20 fw-semibold text-dark mb-2">
                                                Get Approval
                                            </div>
                                            <p>
                                                Track your application status online. Once approved, receive
                                                your visa electronically or via courier service.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="counter-section section-padding pb-0">
                    <div className="container">
                        <div className="row justify-content-center row-gap-4">
                            <div className="col-md-6 col-lg-4">
                                <div className="counter-card">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-counter-bg-01.png"
                                        alt="img"
                                        className="counter-bg1"
                                    />
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-counter-bg-02.png"
                                        alt="img"
                                        className="counter-bg2"
                                    />
                                    <div className="counter-content">3-5 Days</div>
                                    <p className="fw-medium">Average Processing Time</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="counter-card">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-counter-bg-01.png"
                                        alt="img"
                                        className="counter-bg1"
                                    />
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-counter-bg-02.png"
                                        alt="img"
                                        className="counter-bg2"
                                    />
                                    <div className="counter-content">95%</div>
                                    <p className="fw-medium">Success Rate</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="counter-card">
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-counter-bg-01.png"
                                        alt="img"
                                        className="counter-bg1"
                                    />
                                    <ImageWithBasePath
                                        src="assets/img/visa/visa-requirement-counter-bg-02.png"
                                        alt="img"
                                        className="counter-bg2"
                                    />
                                    <div className="counter-content">24/7</div>
                                    <p className="fw-medium">Customer Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="visa-faq-section section-padding pb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <div className="visa-section-header">
                                    <span>Frequently Asked Questions</span>
                                    <h2>Find answers to common questions</h2>
                                </div>
                                <div className="accordion " id="accordionFaq">
                                    <div
                                        className="accordion-item show  mb-3 pb-3 wow fadeInUp"
                                        data-wow-delay="0.2s"
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#faq-collapseOne"
                                                aria-expanded="false"
                                                aria-controls="faq-collapseOne"
                                            >
                                                What types of tours do you offer?
                                            </button>
                                        </h2>
                                        <div
                                            id="faq-collapseOne"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    We offer a wide range of tours, including cultural,
                                                    adventure, luxury, and customized itineraries. Popular
                                                    destinations include Europe, Africa (e.g., Morocco),
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="accordion-item  mb-3 wow fadeInUp"
                                        data-wow-delay="0.4s"
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#faq-collapsetwo"
                                                aria-expanded="false"
                                                aria-controls="faq-collapsetwo"
                                            >
                                                Are the tours customizable?
                                            </button>
                                        </h2>
                                        <div
                                            id="faq-collapsetwo"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p>
                                                    We offer a wide range of tours, including cultural,
                                                    adventure, luxury, and customized itineraries.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="accordion-item mb-3 wow fadeInUp"
                                        data-wow-delay="0.6s"
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#faq-collapsthree"
                                                aria-expanded="false"
                                                aria-controls="faq-collapsthree"
                                            >
                                                What safety measures do you follow?
                                            </button>
                                        </h2>
                                        <div
                                            id="faq-collapsthree"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p>
                                                    We offer a wide range of tours, including cultural,
                                                    adventure, luxury, and customized itineraries.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="accordion-item mb-3 wow fadeInUp"
                                        data-wow-delay="0.8s"
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#faq-collapsefour"
                                                aria-expanded="false"
                                                aria-controls="faq-collapsefour"
                                            >
                                                How far in advance should I book?
                                            </button>
                                        </h2>
                                        <div
                                            id="faq-collapsefour"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p>
                                                    We offer a wide range of tours, including cultural,
                                                    adventure, luxury, and customized itineraries.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="accordion-item mb-0 wow fadeInUp"
                                        data-wow-delay="1.0s"
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#faq-collapsesix"
                                                aria-expanded="false"
                                                aria-controls="faq-collapsesix"
                                            >
                                                What is your cancellation policy?
                                            </button>
                                        </h2>
                                        <div
                                            id="faq-collapsesix"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFaq"
                                        >
                                            <div className="accordion-body">
                                                <p>
                                                    We offer a wide range of tours, including cultural,
                                                    adventure, luxury, and customized itineraries.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* /Page Wrapper */}
        </>
    )
}

export default VisaRequirement