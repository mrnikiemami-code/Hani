"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';

const BlogGrid = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Blog',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Page',
            active: true,
        },
        {
            label: 'Blog Grid',
            active: true,
        },
    ];

    return (
        <div>

            <Breadcrumb
                title="Blog Grid"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />
            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row justify-content-center">
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-01.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Travel</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-01.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Bryan Bradfield</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                14 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                Top 10 Hidden Gems places in Central Europe in 2025
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-02.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Guide</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-02.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Michell West</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                12 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                Exploring the World: Your Ultimate Dream Tour Itinerary
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-03.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Rental</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-03.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Patricia Hasbro</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                14 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                New York City, USA - The City That Never Sleeps
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-09.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Travel</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-01.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Bryan Bradfield</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                14 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                How to Travel on a Budget: Affordable Destinations &amp; Tips
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-05.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Guide</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-03.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Michell West</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                12 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                The Ultimate Guide to Solo Travel: Tips for First-Time
                                                Travelers
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-06.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Adventure</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-20.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Patricia Hasbro</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                14 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                Top 10 Breath taking Destinations You Must Visit in 2025
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-10.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Tips</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-01.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Bryan Bradfield</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                14 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                How to Plan the Perfect Weekend Getaway: Quick Travel Tips
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-08.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">Vacation</span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-02.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Michell West</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                12 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                Top 7 Beach Destinations for a Relaxing Summer Vacation
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Blog Item*/}
                            <div className="col-xl-4 col-md-6">
                                <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                    <Link href={routes.blogDetails} className="blog-img">
                                        <ImageWithBasePath src="assets/img/blog/blog-07.jpg" alt="img" />
                                    </Link>
                                    <span className="badge bg-primary fs-13 fw-medium">
                                        Flight Tours
                                    </span>
                                    <div className="blog-info text-center">
                                        <div className="d-inline-flex align-items-center justify-content-center">
                                            <div className="d-inline-flex align-items-center border-end pe-3 me-3 mb-2">
                                                <Link
                                                    href="#"
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="avatar avatar-sm me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-18.jpg"
                                                            className="rounded-circle border border-white"
                                                            alt="img"
                                                        />
                                                    </span>
                                                    <p>Patricia Hasbro</p>
                                                </Link>
                                            </div>
                                            <p className="text-white mb-2">
                                                <i className="isax isax-calendar-2 me-2" />
                                                14 May 2025
                                            </p>
                                        </div>
                                        <h5>
                                            <Link href={routes.blogDetails}>
                                                The Best Flight Tours Over Iconic Landmarks You Have to
                                                Experience
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            {/* /Blog Item*/}
                            {/* Pagination */}
                            <nav className="pagination-nav">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <Link
                                            className="page-link"
                                            href="#"
                                            aria-label="Previous"
                                        >
                                            <span aria-hidden="true">
                                                <i className="fa-solid fa-chevron-left" />
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            1
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            2
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            3
                                        </Link>
                                    </li>
                                    <li className="page-item active">
                                        <Link className="page-link" href="#">
                                            4
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            5
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link
                                            className="page-link"
                                            href="#"
                                            aria-label="Next"
                                        >
                                            <span aria-hidden="true">
                                                <i className="fa-solid fa-chevron-right" />
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            {/* /Pagination */}
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>


        </div>
    )
}

export default BlogGrid
