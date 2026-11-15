"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';

const BlogList = () => {

    const routes = all_routes;

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
            label: 'Blog List',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb
                title="Blog List"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />
            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div
                                            className="blog-item mb-4 wow fadeInUp"
                                            data-wow-delay="0.2s"
                                        >
                                            <Link href={routes.blogDetails} className="blog-img">
                                                <ImageWithBasePath
                                                    src="assets/img/blog/blog-list-03.jpg"
                                                    className="w-100"
                                                    alt="img"
                                                />
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
                                    <div className="col-xl-12">
                                        <div
                                            className="blog-item mb-4 wow fadeInUp"
                                            data-wow-delay="0.2s"
                                        >
                                            <Link href={routes.blogDetails} className="blog-img blog-list-img">
                                                <ImageWithBasePath
                                                    src="assets/img/blog/blog-list-01.jpg"
                                                    className="w-100"
                                                    alt="img"
                                                />
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
                                    <div className="col-xl-12">
                                        <div
                                            className="blog-item mb-4 wow fadeInUp"
                                            data-wow-delay="0.2s"
                                        >
                                            <Link href={routes.blogDetails} className="blog-img">
                                                <ImageWithBasePath
                                                    src="assets/img/blog/blog-list-02.jpg"
                                                    className="w-100"
                                                    alt="img"
                                                />
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
                                </div>
                                {/* Pagination */}
                                <nav className="pagination-nav mb-4 mb-lg-0">
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
                            {/* Sidebar */}
                            <div className="col-xl-4 col-lg-4 theiaStickySidebar">
                                {/* Search */}
                                <div className="card mb-3">
                                    <div className="card-header border-0 pb-0">
                                        <div className="pb-3 border-bottom">
                                            <h5>
                                                <i className="isax isax-search-normal-1 text-primary fs-16 me-2" />
                                                Search
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card-body pt-3">
                                        <form>
                                            <div className="bg-light-100 p-3 rounded border">
                                                <div className="input-icon">
                                                    <span className="input-icon-addon">
                                                        <i className="isax isax-search-normal-1 fs-14" />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* /Search */}
                                {/* Categories */}
                                <div className="card mb-3">
                                    <div className="card-header border-0 pb-0">
                                        <div className="pb-3 border-bottom">
                                            <h5>
                                                <i className="isax isax-candle text-primary fs-16 me-2" />
                                                Categories
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card-body pt-3">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-medium mb-0">
                                                <Link href="#">Travel</Link>
                                            </h6>
                                            <p>(12)</p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-medium mb-0">
                                                <Link href="#">Guide</Link>
                                            </h6>
                                            <p>(10)</p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-medium mb-0">
                                                <Link href="#">Rental</Link>
                                            </h6>
                                            <p>(14)</p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-dark fw-medium mb-0">
                                                <Link href="#">Adventure</Link>
                                            </h6>
                                            <p>(16)</p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-medium mb-0">
                                                <Link href="#">Vacation</Link>
                                            </h6>
                                            <p>(20)</p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fw-medium mb-0">
                                                <Link href="#">Tips</Link>
                                            </h6>
                                            <p>(15)</p>
                                        </div>
                                    </div>
                                </div>
                                {/* /Categories */}
                                {/* Related Posts */}
                                <div className="card mb-3">
                                    <div className="card-header border-0 pb-0">
                                        <div className="pb-3 border-bottom">
                                            <h5>
                                                <i className="ti ti-brand-blogger text-primary fs-16 me-2" />
                                                Related Posts
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card-body pt-3">
                                        <div className="blog-post mb-3">
                                            <div className="d-flex align-items-center">
                                                <Link
                                                    href={routes.blogDetails}
                                                    className="avatar avatar-xxl flex-shrink-0 me-2"
                                                >
                                                    <ImageWithBasePath
                                                        src="assets/img/blog/blog-09.jpg"
                                                        className="rounded"
                                                        alt="Img"
                                                    />
                                                </Link>
                                                <div>
                                                    <Link
                                                        href={routes.blogDetails}
                                                        className="two-line-ellipsis fs-14 fw-medium"
                                                    >
                                                        How to Travel on a Budget: Affordable Destinations &amp;
                                                        Tips
                                                    </Link>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <Link
                                                            href="#"
                                                            className="d-flex align-items-center border-end pe-2 me-2"
                                                        >
                                                            <span className="avatar avatar-xs me-1">
                                                                <ImageWithBasePath
                                                                    src="assets/img/users/user-01.jpg"
                                                                    className="blog-user-img rounded-circle border border-light"
                                                                    alt="img"
                                                                />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Bryan</p>
                                                        </Link>
                                                        <p className="fs-14 text-truncate">
                                                            <i className="isax isax-calendar-2 me-2" />
                                                            14 May 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-post mb-3">
                                            <div className="d-flex align-items-center">
                                                <Link
                                                    href={routes.blogDetails}
                                                    className="avatar avatar-xxl flex-shrink-0 me-2"
                                                >
                                                    <ImageWithBasePath
                                                        src="assets/img/blog/blog-05.jpg"
                                                        className="rounded"
                                                        alt="Img"
                                                    />
                                                </Link>
                                                <div>
                                                    <Link
                                                        href={routes.blogDetails}
                                                        className="two-line-ellipsis fs-14 fw-medium"
                                                    >
                                                        The Ultimate Guide to Solo Travel: Tips for First-Time
                                                        Travelers
                                                    </Link>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <Link
                                                            href="#"
                                                            className="d-flex align-items-center border-end pe-2 me-2"
                                                        >
                                                            <span className="avatar avatar-sm me-1">
                                                                <ImageWithBasePath
                                                                    src="assets/img/users/user-03.jpg"
                                                                    className="blog-user-img rounded-circle border border-light"
                                                                    alt="img"
                                                                />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Michell</p>
                                                        </Link>
                                                        <p className="fs-14 text-truncate">
                                                            <i className="isax isax-calendar-2 me-2" />
                                                            14 May 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-post">
                                            <div className="d-flex align-items-center">
                                                <Link
                                                    href={routes.blogDetails}
                                                    className="avatar avatar-xxl flex-shrink-0 me-2"
                                                >
                                                    <ImageWithBasePath
                                                        src="assets/img/blog/blog-06.jpg"
                                                        className="rounded"
                                                        alt="Img"
                                                    />
                                                </Link>
                                                <div>
                                                    <Link
                                                        href={routes.blogDetails}
                                                        className="two-line-ellipsis fs-14 fw-medium"
                                                    >
                                                        Top 10 Breath taking Destinations You Must Visit in 2025
                                                    </Link>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <Link
                                                            href="#"
                                                            className="d-flex align-items-center border-end pe-2 me-2"
                                                        >
                                                            <span className="avatar avatar-xs me-1">
                                                                <ImageWithBasePath
                                                                    src="assets/img/users/user-04.jpg"
                                                                    className="blog-user-img rounded-circle border border-light"
                                                                    alt="img"
                                                                />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Bradfield</p>
                                                        </Link>
                                                        <p className="fs-14 text-truncate">
                                                            <i className="isax isax-calendar-2 me-2" />
                                                            14 May 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Related Posts */}
                                {/* Popular Tags */}
                                <div className="card mb-0">
                                    <div className="card-header border-0 pb-0">
                                        <div className="pb-3 border-bottom">
                                            <h5>
                                                <i className="isax isax-tag text-primary fs-16 me-2" />
                                                Popular Tags
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card-body pt-3 pb-2">
                                        <div className="d-flex align-items-center flex-wrap category-tag">
                                            <Link
                                                href="#"
                                                className="badge badge-md fw-normal me-2 mb-2"
                                            >
                                                Luxury
                                            </Link>
                                            <Link
                                                href="#"
                                                className="badge badge-md fw-normal me-2 mb-2"
                                            >
                                                Travel
                                            </Link>
                                            <Link
                                                href="#"
                                                className="badge badge-md fw-normal me-2 mb-2"
                                            >
                                                Nature
                                            </Link>
                                            <Link
                                                href="#"
                                                className="badge badge-md fw-normal mb-2"
                                            >
                                                Photography
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* /Popular Tags */}
                            </div>
                            {/* /Sidebar */}
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>


        </div>
    )
}

export default BlogList
