"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import Link from "next/link";

const FAQ = () => {
    const routes = all_routes
    const breadcrumbs = [
        {
            label: 'FAQ',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Pages',
            active: false,
        },
        {
            label: 'FAQ',
            active: true,
        },
    ];
    return (
        <>
            <Breadcrumb title="FAQ" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    {/* FAQ Section */}
                    <div className="faq ">
                        <div className="container">
                            <div className="faq-sec p-0">
                                <div className="row">
                                    <div className="col-lg-10 mx-auto">
                                        <div className="accordion " id="accordionFaq">
                                            <div className="accordion-item show  mb-3 pb-3 wow fadeInUp" data-wow-delay="0.2s">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#faq-collapseOne"
                                                        aria-controls="faq-collapseOne">
                                                        What types of tours do you offer?
                                                    </button>
                                                </h2>
                                                <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                                    <div className="accordion-body">
                                                        <p className="mb-0">We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                                        <p>Popular destinations include Europe, Africa (e.g., Morocco), </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item  mb-3 wow fadeInUp" data-wow-delay="0.4s">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#faq-collapsetwo"
                                                        aria-controls="faq-collapsetwo">
                                                        Are the tours customizable?
                                                    </button>
                                                </h2>
                                                <div id="faq-collapsetwo" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                    <div className="accordion-body">
                                                        <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay="0.6s">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#faq-collapsthree"
                                                        aria-controls="faq-collapsthree">
                                                        What safety measures do you follow?
                                                    </button>
                                                </h2>
                                                <div id="faq-collapsthree" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                    <div className="accordion-body">
                                                        <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay="0.8s">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#faq-collapsefour"
                                                        aria-controls="faq-collapsefour">
                                                        How far in advance should I book?
                                                    </button>
                                                </h2>
                                                <div id="faq-collapsefour" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                    <div className="accordion-body">
                                                        <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay="1.0s">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#faq-collapsesix"
                                                        aria-controls="faq-collapsesix">
                                                        What is your cancellation policy?
                                                    </button>
                                                </h2>
                                                <div id="faq-collapsesix" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                    <div className="accordion-body">
                                                        <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay="1.0s">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#faq-collapseseven"
                                                        aria-controls="faq-collapseseven">
                                                        Can I book flights, hotels, and car rentals together?
                                                    </button>
                                                </h2>
                                                <div id="faq-collapseseven" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                    <div className="accordion-body">
                                                        <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item  wow fadeInUp" data-wow-delay="1.0s">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#faq-collapseeight"
                                                        aria-controls="faq-collapseeight">
                                                        What is your cancellation policy?
                                                    </button>
                                                </h2>
                                                <div id="faq-collapseeight" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                    <div className="accordion-body">
                                                        <p>We offer a wide range of tours, including cultural, adventure, luxury, and customized itineraries.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /FAQ Section */}

                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="que-sec text-center">
                                <h4 className="mb-3">Have Any Other Questions?</h4>
                                <p className="mb-3">If you cannot find answer to your question in our FAQ, you can always contact us. We wil answer to you shortly!</p>
                                <div className="d-flex justify-content-center">
                                    <Link href={routes.contactUs} className="btn btn-primary d-flex align-items-center justify-content-center">Contact Us<i className="isax isax-arrow-right-3 ms-1"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
        </>
    )
}

export default FAQ