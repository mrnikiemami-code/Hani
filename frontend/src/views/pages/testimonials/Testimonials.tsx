"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';

const Testimonials = () => {
    const routes = all_routes
    const breadcrumbs = [
        {
            label: 'Testimonials',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Pages',
            active: false,
        },
        {
            label: 'Testimonials',
            active: true,
        },
    ];
    return (
        <>
            <Breadcrumb title="Testimonials" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
            {/* Page Wrapper */}
            <div className="content">
                <div className="container">

                    <div className="row row-gap-4">
                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Great Hospitality</h6>
                                    <p className="mb-4">Dream Tours made our Ark trip a dream come true! The staff was incredibly attentive, and every detail was perfectly managed. We couldn’t have asked for a better experience!</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Andrew Fetcher</Link>
                                                </h6>
                                                <p>New York, United States</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>
                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Hidden Treasure</h6>
                                    <p className="mb-4">I went on the Gone with the Wind tour, and it was my first multi-day bus tour. The experience was terrific, thanks to the friendly tour guides. I’ve told many people about it</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Bryan Bradfield</Link>
                                                </h6>
                                                <p>Cape Town, South Africa</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.7</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Easy to Find your Leisuere Place</h6>
                                    <p className="mb-4">Thanks for arranging a smooth travel experience for us. Our cab driver was polite, timely, and helpful. The team ensured that everything was taken care of, making it a stress-free trip</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-03.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Prajakta Sasane</Link>
                                                </h6>
                                                <p>Paris, France</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.8	</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>


                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Perfect Vacation</h6>
                                    <p className="mb-4">I used DreamsTour to book our family vacation, and it was a flawless experience. From finding affordable flights to booking an amazing hotel and everything was seamless.</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-19.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Sergio Ramos</Link>
                                                </h6>
                                                <p>Columbus, United States</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Amazing Deals</h6>
                                    <p className="mb-4">Booking my flights and hotels through Dream Tour was so easy! I found great deals and had all my reservations confirmed in minutes. Highly recommend this platform.</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-34.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Blanca Renard</Link>
                                                </h6>
                                                <p>London, United Kingdom</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.6</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Quick, Easy, and Affordable</h6>
                                    <p className="mb-4">As a frequent traveler, I value convenience and price. DreamsTour is my go-to platform because they have everything in one place. I even saved money on flights and car rentals!</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-35.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">David Welker</Link>
                                                </h6>
                                                <p>Paris, France</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.7</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Exceptional Support</h6>
                                    <p className="mb-4">DreamsTour made it simple to book everything from flights to hotels and even local tours. When I had a question about my reservation, their support team responded quickly.</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-36.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Sandra Montero</Link>
                                                </h6>
                                                <p>Denver, United States</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Great Selection of Tours and Cruises</h6>
                                    <p className="mb-4">We were looking for a cruise that fit our schedule, and DreamsTour had so many options. The booking process was straightforward, and we ended up with an amazing deal. </p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-37.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Donald Brooks</Link>
                                                </h6>
                                                <p>Pretoria, South Africa</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">A Stress-free Family Vacation</h6>
                                    <p className="mb-4">Planning a vacation with kids can be tough, but DreamsTour made it super easy for us. We booked flights, hotels, and a rental car in one go. We had an amazing time & everything was perfectly arranged!</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-38.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Gracie Walsh</Link>
                                                </h6>
                                                <p>Lyon, France</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Incredible Experiences</h6>
                                    <p className="mb-4">We’ve used DreamsTour for three vacations now, and each one has been perfect. Whether it’s finding a unique tour or booking a last-minute flight, they always have the best options.</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-39.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Thomas Pelkey</Link>
                                                </h6>
                                                <p>Chicago, United States</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">The Best Travel Companion</h6>
                                    <p className="mb-4">DreamsTour has become my go-to for all travel bookings. I’ve booked everything from solo trips to group vacations, and every experience has been perfect. </p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-40.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Emma Garcia</Link>
                                                </h6>
                                                <p>Sydney, Australia</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.6</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>

                        <div className="col-lg-4 d-flex">
                            {/* Testimonial Item*/}
                            <div className="card border-white mb-0 wow fadeInUp flex-fill" data-wow-delay="0.2s">
                                <div className="card-body">
                                    <h6 className="mb-3">Smooth and Easy</h6>
                                    <p className="mb-4">Thanks for arranging a smooth travel experience for us. Our cab driver was polite, timely, and helpful. The team ensured that everything was taken care of, making it a stress-free trip</p>
                                    <div className="border-top pt-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="avatar avatar-md  flex-shrink-0">
                                                <ImageWithBasePath src="assets/img/users/user-41.jpg" className="rounded-circle" alt="img" />
                                            </Link>
                                            <div className="ms-2">
                                                <h6 className="fs-16 fw-medium"><Link href="#">Robert Seger</Link>
                                                </h6>
                                                <p>Bristol, United Kingdom</p>
                                            </div>
                                        </div>
                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                    </div>
                                </div>
                            </div>
                            {/* /Testimonial Item*/}
                        </div>
                    </div>

                </div>
            </div>
            {/* /Page Wrapper */}
        </>
    )
}

export default Testimonials