"use client";
import  { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import Sidebar from '../sidebar/sidebar';
import PredefinedDateRanges from '../../../components/common-date-picker/datePicker';
import ImageWithBasePath from '../../../components/image-with-base-path';

const AgentReviews = () => {

    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Reviews',
            active: false,
            link: routes.home1
        },
        {
            label: 'Reviews',
            active: true,
        },
    ];

    const [isReplyVisible, setIsReplyVisible] = useState<boolean>(false);

    const handleReplyToggle = () => {
        setIsReplyVisible(!isReplyVisible);
    };


    return (
        <div>
            <Breadcrumb title="Reviews" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-xl-3 col-lg-4">
                                <Sidebar />
                            </div>
                            {/* /Sidebar */}
                            <div className="col-xl-9 col-lg-8">
                                {/* Review Title */}
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                                            <div>
                                                <h6>Reviews</h6>
                                                <p className="fs-14">No of Reviews : 60</p>
                                            </div>
                                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                                <div>
                                                    <div className="input-icon-end position-relative">
                                                        <span className="input-icon-addon">
                                                            <i className="isax isax-calendar-edit" />
                                                        </span>
                                                        <PredefinedDateRanges />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Review Title */}
                                {/* Reviews */}
                                <div className="card shadow-none">
                                    <div className="card-body">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                                                <div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-22.jpg"
                                                                alt="user"
                                                                className="img-fluid rounded-circle"
                                                            />
                                                        </span>
                                                        <div>
                                                            <h6 className="fs-16">Derek Sanchez</h6>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="fs-14 d-flex align-items-center">
                                                                    2 days ago
                                                                    <i className="ti ti-point-filled text-gray mx-2" />
                                                                </span>
                                                                <p className="fs-14">
                                                                    <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                                                        4.7
                                                                    </span>
                                                                    Fast and Reliable
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 d-flex align-items-center mb-2">
                                                            <i className="isax isax-info-circle5 text-gray-9 me-2" />
                                                            Info : Hotel Booking (Hayat Hotel)
                                                        </p>
                                                        <p className="fs-16 mb-0">
                                                            Booked a last-minute flight with ease, and everything
                                                            went smoothly from start to finish
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-light btn-sm border add-reply me-2"
                                                        onClick={handleReplyToggle}
                                                    >
                                                        Reply
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="review-reply border-top mt-3 pt-3" style={{ display: isReplyVisible ? 'block' : 'none' }}>
                                                <form className="reply-form">
                                                    <textarea
                                                        rows={3}
                                                        className="form-control"
                                                        placeholder="Add Comment"
                                                        defaultValue={""}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm mt-2"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Reviews */}
                                {/* Reviews */}
                                <div className="card shadow-none">
                                    <div className="card-body">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                                                <div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-20.jpg"
                                                                alt="user"
                                                                className="img-fluid rounded-circle"
                                                            />
                                                        </span>
                                                        <div>
                                                            <h6 className="fs-16">Shirley Bryant</h6>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="fs-14 d-flex align-items-center">
                                                                    3 days ago
                                                                    <i className="ti ti-point-filled text-gray mx-2" />
                                                                </span>
                                                                <p className="fs-14">
                                                                    <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                                                        4.2
                                                                    </span>
                                                                    Fantastic Experience
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 d-flex align-items-center mb-2">
                                                            <i className="isax isax-info-circle5 text-gray-9 me-2" />
                                                            Info : Cuise Booking (Super Aquamarine)
                                                        </p>
                                                        <p className="fs-16 mb-0">
                                                            Our first cruise was amazing, with great service, food,
                                                            and excursions. Can’t wait to go again!
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-light btn-sm border add-reply me-2"
                                                        onClick={handleReplyToggle}
                                                    >
                                                        Reply
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="review-reply border-top mt-3 pt-3" style={{ display: isReplyVisible ? 'block' : 'none' }}>
                                                <form  className="reply-form">
                                                    <textarea
                                                        rows={3}
                                                        className="form-control"
                                                        placeholder="Add Comment"
                                                        defaultValue={""}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm mt-2"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Reviews */}
                                {/* Reviews */}
                                <div className="card shadow-none">
                                    <div className="card-body">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                                                <div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-04.jpg"
                                                                alt="user"
                                                                className="img-fluid rounded-circle"
                                                            />
                                                        </span>
                                                        <div>
                                                            <h6 className="fs-16">James Hobson</h6>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="fs-14 d-flex align-items-center">
                                                                    05 days ago
                                                                    <i className="ti ti-point-filled text-gray mx-2" />
                                                                </span>
                                                                <p className="fs-14">
                                                                    <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                                                        4.4
                                                                    </span>
                                                                    Amazing Tour
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 d-flex align-items-center mb-2">
                                                            <i className="isax isax-info-circle5 text-gray-9 me-2" />
                                                            Info : Tour Booking (Joy Jubilee Jamboree)
                                                        </p>
                                                        <p className="fs-16 mb-0">
                                                            The tour was well-organized, and the guides were
                                                            knowledgeable and friendly—an unforgettable experience!
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-light btn-sm border add-reply me-2"
                                                        onClick={handleReplyToggle}
                                                    >
                                                        Reply
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="review-reply border-top mt-3 pt-3" style={{ display: isReplyVisible ? 'block' : 'none' }}>
                                                <form  className="reply-form">
                                                    <textarea
                                                        rows={3}
                                                        className="form-control"
                                                        placeholder="Add Comment"
                                                        defaultValue={""}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm mt-2"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Reviews */}
                                {/* Reviews */}
                                <div className="card shadow-none">
                                    <div className="card-body">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                                                <div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-28.jpg"
                                                                alt="user"
                                                                className="img-fluid rounded-circle"
                                                            />
                                                        </span>
                                                        <div>
                                                            <h6 className="fs-16">Emma Bright</h6>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="fs-14 d-flex align-items-center">
                                                                    08 days ago
                                                                    <i className="ti ti-point-filled text-gray mx-2" />
                                                                </span>
                                                                <p className="fs-14">
                                                                    <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                                                        4.5
                                                                    </span>
                                                                    Hassle-Free Booking
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 d-flex align-items-center mb-2">
                                                            <i className="isax isax-info-circle5 text-gray-9 me-2" />
                                                            Info : Car Booking (Volkswagen Amarok)
                                                        </p>
                                                        <p className="fs-16 mb-0">
                                                            The booking process was quick, and the car was ready on
                                                            time with no issues and super convenient
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-light btn-sm border add-reply me-2"
                                                        onClick={handleReplyToggle}
                                                    >
                                                        Reply
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="review-reply border-top mt-3 pt-3" style={{ display: isReplyVisible ? 'block' : 'none' }}>
                                                <form className="reply-form">
                                                    <textarea
                                                        rows={3}
                                                        className="form-control"
                                                        placeholder="Add Comment"
                                                        defaultValue={""}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm mt-2"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Reviews */}
                                {/* Reviews */}
                                <div className="card shadow-none">
                                    <div className="card-body">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                                                <div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-25.jpg"
                                                                alt="user"
                                                                className="img-fluid rounded-circle"
                                                            />
                                                        </span>
                                                        <div>
                                                            <h6 className="fs-16">Michael Cornejo</h6>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <span className="fs-14 d-flex align-items-center">
                                                                    10 days ago
                                                                    <i className="ti ti-point-filled text-gray mx-2" />
                                                                </span>
                                                                <p className="fs-14">
                                                                    <span className="badge badge-xs badge-warning text-gray-9 me-2">
                                                                        4.6
                                                                    </span>
                                                                    Perfect for Family
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 d-flex align-items-center mb-2">
                                                            <i className="isax isax-info-circle5 text-gray-9 me-2" />
                                                            Info : Hotel Booking (Hotel Miravent)
                                                        </p>
                                                        <p className="fs-16 mb-0">
                                                            The hotel was family-friendly, with spacious rooms and
                                                            activities for the kids—great stay!
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-light btn-sm border add-reply me-2"
                                                        onClick={handleReplyToggle}
                                                    >
                                                        Reply
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="bg-light rounded p-3 mt-3 ms-5">
                                                <p>
                                                    <span className="fw-medium">You Replied : </span> Booked a
                                                    last-minute flight with ease, and everything went smoothly
                                                    from start to finish
                                                </p>
                                            </div>
                                            <div className="review-reply border-top mt-3 pt-3" style={{ display: isReplyVisible ? 'block' : 'none' }}>
                                                <form className="reply-form">
                                                    <textarea
                                                        rows={3}
                                                        className="form-control"
                                                        placeholder="Add Comment"
                                                        defaultValue={""}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm mt-2"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Reviews */}
                                {/* Pagination */}
                                <nav className="pagination-nav">
                                    <ul className="pagination justify-content-center justify-content-sm-end ">
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
                </div>
                {/* /Page Wrapper */}
            </>


        </div>
    )
}

export default AgentReviews
