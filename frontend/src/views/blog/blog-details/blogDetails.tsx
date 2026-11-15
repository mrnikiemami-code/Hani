"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';

const BlogDetails = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Blog Details',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Page',
            active: true,
        },
        {
            label: 'Blog Details',
            active: true,
        },
    ];

    return (
        <div>

            <Breadcrumb
                title="Blog Details"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-01"
            />
            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        {/* Blog Details */}
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <div className="card blog-details mb-4 mb-lg-0">
                                    <div className="card-body">
                                        <div className="blog-content">
                                            <div className="blog-image mb-3">
                                                <ImageWithBasePath
                                                    src="assets/img/blog/blog-sm-01.jpg"
                                                    alt="image"
                                                    className="img-fluid rounded"
                                                />
                                            </div>
                                            <div className="d-flex  align-items-center flex-wrap row-gap-2 mb-3">
                                                <Link
                                                    href="#"
                                                    className=" d-flex align-items-center fs-16 text-gray-9 pe-3 border-end me-3"
                                                >
                                                    <ImageWithBasePath
                                                        src="assets/img/users/user-01.jpg"
                                                        alt="Img"
                                                        className="img-fluid avatar avatar-sm rounded-circle me-2"
                                                    />{" "}
                                                    Bryan Bradfield
                                                </Link>
                                                <div className="pe-3 border-end me-3">
                                                    <span className="d-flex align-items-center fs-16 text-gray-9 ">
                                                        <i className="isax isax-calendar-2 me-1" />
                                                        14 May 2025
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="badge badge-sm badge-primary">
                                                        Travels
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <h2>
                                                    The Ultimate Guide to Solo Travel: Tips for First-Time
                                                    Travelers
                                                </h2>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-gray-6">
                                                    Solo travel can be an incredibly empowering and enriching
                                                    experience, offering you the freedom to explore the world at
                                                    your own pace and make personal connections with different
                                                    cultures. However, if it’s your first time traveling solo,
                                                    the idea can be both exciting and a bit intimidating. This
                                                    guide provides essential tips to help you prepare for your
                                                    adventure and make the most of your solo journey.
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-gray-6">
                                                    When traveling solo, it’s important to have a rough plan in
                                                    place, especially if it’s your first time. Research your
                                                    destination, book accommodations in advance, and have a
                                                    basic itinerary. However, don’t over-plan! Leave some room
                                                    for spontaneity so you can explore new opportunities and
                                                    experiences that arise along the way.If you’re feeling
                                                    anxious about traveling solo for the first time, consider
                                                    starting with a short trip or visiting a destination known
                                                    for being solo traveler-friendly. Many European cities,
                                                    Southeast Asia, and parts of Latin America have well-trodden
                                                    paths with plenty of resources for solo travelers.
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-gray-6 d-flex align-items-center mb-2">
                                                    {" "}
                                                    <span className="me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/Polygon.svg"
                                                            alt="Img"
                                                            className="img-fluid"
                                                        />
                                                    </span>{" "}
                                                    Prioritize safety by booking your first night’s
                                                    accommodation before you arrive.
                                                </p>
                                                <p className="text-gray-6 d-flex align-items-center mb-2">
                                                    {" "}
                                                    <span className="me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/Polygon.svg"
                                                            alt="Img"
                                                            className="img-fluid"
                                                        />
                                                    </span>{" "}
                                                    Bring only essentials to make moving around easier and keep
                                                    your hands free.
                                                </p>
                                                <p className="text-gray-6 d-flex align-items-center ">
                                                    {" "}
                                                    <span className="me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/Polygon.svg"
                                                            alt="Img"
                                                            className="img-fluid"
                                                        />
                                                    </span>{" "}
                                                    Have a small first-aid kit with basic supplies in case of
                                                    minor injuries or health issues.
                                                </p>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="blog-image mb-3">
                                                        <ImageWithBasePath
                                                            src="assets/img/blog/blog-34.jpg"
                                                            alt="image"
                                                            className="img-fluid rounded"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="blog-image mb-3">
                                                        <ImageWithBasePath
                                                            src="assets/img/blog/blog-35.jpg"
                                                            alt="image"
                                                            className="img-fluid rounded"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pb-3 border-bottom">
                                                <p className="fs-14 text-gray-6">
                                                    Solo travel is a fantastic way to grow, explore, and
                                                    discover new aspects of yourself and the world. While it may
                                                    feel daunting at first, with the right preparation, mindset,
                                                    and a bit of courage, it can become one of the most
                                                    fulfilling experiences of your life. So pack your bags, take
                                                    that leap, and embrace the adventure that awaits!
                                                </p>
                                            </div>
                                            <div className="mt-3 pb-3 border-bottom d-flex flex-wrap align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <p className="fs-16 text-gray-9 mb-0 me-2">Tags :</p>
                                                    <Link
                                                        href="#"
                                                        className="badge badge-sm badge-secondary me-2"
                                                    >
                                                        Travels
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="badge badge-sm badge-secondary me-2"
                                                    >
                                                        Tips
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="badge badge-sm badge-secondary"
                                                    >
                                                        Guide
                                                    </Link>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="fs-16.text-gray-9 mb-0 me-2">Share On :</p>
                                                    <Link href="#" className="me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/facebook.svg"
                                                            alt="image"
                                                            className="img-fluid"
                                                        />
                                                    </Link>
                                                    <Link href="#" className="me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/insta.svg"
                                                            alt="image"
                                                            className="img-fluid"
                                                        />
                                                    </Link>
                                                    <Link href="#" className="me-2">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/twitter.svg"
                                                            alt="image"
                                                            className="img-fluid"
                                                        />
                                                    </Link>
                                                    <Link href="#">
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/whatsapp.svg"
                                                            alt="image"
                                                            className="img-fluid"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <div className="border border-light br-10 p-3 d-md-flex align-items-center">
                                                    <div className="blog-user-image me-md-3 mb-3 mb-md-0 flex-shrink-0">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-01.jpg"
                                                            alt="image"
                                                            className="img-fluid rounded"
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 text-primary mb-1">About Author</h6>
                                                        <p className="fs-16 text-gray-6">
                                                            Hi, I’m Bryan Bradfield, and I’ve been hooked on solo
                                                            travel ever since I took my first trip alone a few years
                                                            ago. What started as a nerve-wracking experience quickly
                                                            turned into a life-changing adventure, and I’ve never
                                                            looked back. Traveling solo has taught me so much about
                                                            myself, from gaining confidence in navigating new places
                                                            to embracing spontaneity.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6>Comments</h6>
                                            <div className="my-3">
                                                <div className="border border-light rounded p-3">
                                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-21.jpg"
                                                                alt="image"
                                                                className="img-fluid rounded-circle avatar avatar-md me-2"
                                                            />
                                                            <div>
                                                                <h6>Charles Lozano</h6>
                                                                <span className="fs-14 fw-normal text-gray-6">
                                                                    a week ago
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href="#"
                                                                className="fs-14 fw-medium text-dark d-flex align-items-center"
                                                            >
                                                                {" "}
                                                                <i className="isax isax-back-square me-1" /> Reply
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <p className="fs-14 text-gray-6">
                                                            Great tips for solo travelers! Love how you capture the
                                                            freedom and self-growth that comes with exploring new
                                                            places alone. Super inspiring!
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <div className="border border-light rounded p-3">
                                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-42.jpg"
                                                                alt="image"
                                                                className="img-fluid rounded-circle avatar avatar-md me-2"
                                                            />
                                                            <div>
                                                                <h6>Dennis Cheng</h6>
                                                                <span className="fs-14 fw-normal text-gray-6">
                                                                    a week ago
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href="#"
                                                                className="fs-14 fw-medium text-dark d-flex align-items-center"
                                                            >
                                                                {" "}
                                                                <i className="isax isax-back-square me-1" /> Reply
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <p className="fs-14 text-gray-6">
                                                            Your solo travel guide is incredibly helpful! The
                                                            practical tips on safety and planning give me the
                                                            confidence to explore new destinations on my own.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="mb-3">Write A Comment</h6>
                                            <div>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="exampleInputEmail1"
                                                                    className="form-label"
                                                                >
                                                                    Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="exampleInputEmail1"
                                                                    aria-describedby="exampleInputEmail1"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="exampleInputEmail2"
                                                                    className="form-label"
                                                                >
                                                                    Email
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="exampleInputEmail2"
                                                                    aria-describedby="exampleInputEmail2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Message</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows={4}
                                                                    defaultValue={""}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="d-flex justify-content-end">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-sm btn-primary"
                                                    >
                                                        Post Comment
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 theiaStickySidebar">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pb-3 border-bottom mb-3">
                                            <h5 className="d-flex align-items-center ">
                                                <span className="me-1 fs-16">
                                                    <i className="isax isax-search-normal text-primary" />
                                                </span>{" "}
                                                Search
                                            </h5>
                                        </div>
                                        <div className="blog-search">
                                            <div className="search-content">
                                                <div className="search-feild position-relative">
                                                    <span>
                                                        <i className="isax isax-search-normal" />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                <div className="d-flex">
                                                    <Link
                                                        href={routes.blogDetails}
                                                        className="avatar avatar-xxl me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/blog/blog-09.jpg"
                                                            className="rounded"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                </div>
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
                                                <div className="d-flex">
                                                    <Link
                                                        href={routes.blogDetails}
                                                        className="avatar avatar-xxl me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/blog/blog-05.jpg"
                                                            className="rounded"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                </div>
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
                                                <div className="d-flex">
                                                    <Link
                                                        href={routes.blogDetails}
                                                        className="avatar avatar-xxl me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/blog/blog-06.jpg"
                                                            className="rounded"
                                                            alt="Img"
                                                        />
                                                    </Link>
                                                </div>
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
                                                            <p className="fs-14 text-truncate">Bafield</p>
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
                            </div>
                        </div>
                        {/* /Blog Details */}
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>



        </div>
    )
}

export default BlogDetails
