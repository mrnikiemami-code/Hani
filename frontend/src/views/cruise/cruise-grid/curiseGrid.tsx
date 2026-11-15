"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import FliterSidebar from './filterSidebar';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import CruiseSearch from '../cruiseSearch';
import AppSwiper from '../../../components/app-swiper'
import { all_routes } from '../../../routes/all_routes';

const CuriseGrid = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Cruise',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Cruise',
            active: true,
        },
        {
            label: 'Cruise Grid',
            active: true,
        },
    ];


    const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
    const handleItemClick = (index: number) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = !updatedSelectedItems[index];
            return updatedSelectedItems;
        });
    };

    return (
        <div>

            <Breadcrumb
                title="Cruise Grid"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-06"
            />
            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <CruiseSearch />
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-xl-3 col-lg-4">
                                <FliterSidebar />
                            </div>
                            {/* /Sidebar */}
                            <div className="col-xl-9 col-lg-8 theiaStickySidebar">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h6 className="mb-3">1920 Cruises Found on Your Search</h6>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="list-item d-flex align-items-center mb-3">
                                            <Link href={routes.cruiseGrid} className="list-icon active me-2">
                                                <i className="isax isax-grid-1" />
                                            </Link>
                                            <Link href={routes.cruiseList} className="list-icon me-2">
                                                <i className="isax isax-firstline" />
                                            </Link>
                                            <Link href={routes.cruiseMap} className="list-icon me-2">
                                                <i className="isax isax-map-1" />
                                            </Link>
                                        </div>
                                        <div className="dropdown mb-3">
                                            <Link
                                                href="#"
                                                className="dropdown-toggle py-2"
                                                data-bs-toggle="dropdown"

                                            >
                                                <span className="fw-medium text-gray-9">Sort By : </span>
                                                Recommended
                                            </Link>
                                            <div className="dropdown-menu dropdown-sm">
                                                <form action={routes.cruiseGrid}>
                                                    <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input
                                                            className="form-check-input ms-0 mt-0"
                                                            name="recommend"
                                                            type="checkbox"
                                                            id="recommend1"
                                                            defaultChecked
                                                        />
                                                        <label
                                                            className="form-check-label ms-2"
                                                            htmlFor="recommend1"
                                                        >
                                                            Recommended
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input
                                                            className="form-check-input ms-0 mt-0"
                                                            name="recommend"
                                                            type="checkbox"
                                                            id="recommend2"
                                                        />
                                                        <label
                                                            className="form-check-label ms-2"
                                                            htmlFor="recommend2"
                                                        >
                                                            Price: low to high
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input
                                                            className="form-check-input ms-0 mt-0"
                                                            name="recommend"
                                                            type="checkbox"
                                                            id="recommend3"
                                                        />
                                                        <label
                                                            className="form-check-label ms-2"
                                                            htmlFor="recommend3"
                                                        >
                                                            Price: high to low
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input
                                                            className="form-check-input ms-0 mt-0"
                                                            name="recommend"
                                                            type="checkbox"
                                                            id="recommend4"
                                                        />
                                                        <label
                                                            className="form-check-label ms-2"
                                                            htmlFor="recommend4"
                                                        >
                                                            Newest
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input
                                                            className="form-check-input ms-0 mt-0"
                                                            name="recommend"
                                                            type="checkbox"
                                                            id="recommend5"
                                                        />
                                                        <label
                                                            className="form-check-label ms-2"
                                                            htmlFor="recommend5"
                                                        >
                                                            Ratings
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-0">
                                                        <input
                                                            className="form-check-input ms-0 mt-0"
                                                            name="recommend"
                                                            type="checkbox"
                                                            id="recommend6"
                                                        />
                                                        <label
                                                            className="form-check-label ms-2"
                                                            htmlFor="recommend6"
                                                        >
                                                            Reviews
                                                        </label>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                                                        <Link
                                                            href="#"
                                                            className="btn btn-light btn-sm me-2"
                                                        >
                                                            Reset
                                                        </Link>
                                                        <button type="submit" className="btn btn-primary btn-sm">
                                                            Apply
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-info br-10 p-3 pb-2 mb-4">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center">
                                            <i className="isax isax-info-circle me-2" />
                                            Save an average of 15% on thousands of cruise when you're signed
                                            in
                                        </p>
                                        <Link href={routes.login} className="btn btn-white btn-sm mb-2">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item common-grid-slider mb-4 flex-fill">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-05.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-02.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-04.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-08.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate">Beth Williams</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.9
                                                        </span>
                                                        <p className="fs-14 text-truncate">(400)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Super Aquamarine</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Ciutat Vella, Barcelona
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2021</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">4</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">88.47 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">19 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $500{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item mb-4 flex-fill">
                                            <div className="place-img">
                                                <Link href={routes.cruiseDetails}>
                                                    <ImageWithBasePath
                                                        src="assets/img/cruise/cruise-12.jpg"
                                                        className="img-fluid"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="fav-item" key={2} onClick={() => handleItemClick(2)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-09.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate">Tom Andrews</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.7
                                                        </span>
                                                        <p className="fs-14 text-truncate">(300)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Bonnie Yacht</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Oxford Street, London
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2020</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">3</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">70.63 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">17 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $600{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item mb-4 flex-fill">
                                            <div className="place-img">
                                                <Link href={routes.cruiseDetails}>
                                                    <ImageWithBasePath
                                                        src="assets/img/cruise/cruise-09.jpg"
                                                        className="img-fluid"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="fav-item" key={3} onClick={() => handleItemClick(3)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-10.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate ">Robert Cogs</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.5
                                                        </span>
                                                        <p className="fs-14 text-truncate">(320)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Coral Cruiser</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Princes Street, Edinburgh
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2021</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">4</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">88.47 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">19 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $500{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item mb-4 flex-fill">
                                            <div className="place-img">
                                                <Link href={routes.cruiseDetails}>
                                                    <ImageWithBasePath
                                                        src="assets/img/cruise/cruise-09.jpg"
                                                        className="img-fluid"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="fav-item" key={4} onClick={() => handleItemClick(4)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[4] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-11.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate ">Kenneth Pal</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.3
                                                        </span>
                                                        <p className="fs-14 text-truncate">(380)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Harbor Haven</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Princes Street, Edinburgh
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2016</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">6</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">98.15 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">14 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $300{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item common-grid-slider mb-4 flex-fill">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-01.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-07.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-05.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={5} onClick={() => handleItemClick(5)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[5] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-12.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate ">Timothy</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.1
                                                        </span>
                                                        <p className="fs-14 text-truncate">(300)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Albert Yacht</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    King’s Road, Chelsea
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2018</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">3</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">90.25 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">25 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $550{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item mb-4 flex-fill">
                                            <div className="place-img">
                                                <Link href={routes.cruiseDetails}>
                                                    <ImageWithBasePath
                                                        src="assets/img/cruise/cruise-11.jpg"
                                                        className="img-fluid"
                                                        alt="img"
                                                    />
                                                </Link>
                                                <div className="fav-item" key={6} onClick={() => handleItemClick(6)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[6] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-13.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate ">Mark Arriton</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.4
                                                        </span>
                                                        <p className="fs-14 text-truncate">(450)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Shelly Yacht</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Bold Street, Liverpool
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2023</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">2</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">72.83 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">23 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $450{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item  common-grid-slider mb-4 flex-fill">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-07.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-08.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-11.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={7} onClick={() => handleItemClick(7)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[7] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-14.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate ">Beth Will</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.6
                                                        </span>
                                                        <p className="fs-14 text-truncate">(520)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Sunny Sailor</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Broad Street, Bristol
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2008</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">4</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">64.37 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">18 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $350{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item common-grid-slider mb-4 flex-fill">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-06.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-12.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-04.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={8} onClick={() => handleItemClick(8)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[8] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-15.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate ">John James</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.8
                                                        </span>
                                                        <p className="fs-14 text-truncate">(360)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Ocean Voyager</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Chapel Street, Salford
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2022</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">7</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">98.56 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">15 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $700{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                    {/* Cruise Grid */}
                                    <div className="col-xl-4 col-md-6 d-flex">
                                        <div className="place-item common-grid-slider mb-4 flex-fill">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-08.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-05.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.cruiseDetails}>
                                                                <ImageWithBasePath
                                                                    src="assets/img/cruise/cruise-03.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={9} onClick={() => handleItemClick(9)}>
                                                    <Link href="#" className={`fav-icon ${selectedItems[9] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5" />
                                                    </Link>
                                                    <span className="badge bg-info d-inline-flex align-items-center">
                                                        <i className="isax isax-ranking me-1" />
                                                        Trending
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center overflow-hidden me-2"
                                                    >
                                                        <span className="avatar avatar-md flex-shrink-0 me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/users/user-16.jpg"
                                                                className="rounded-circle"
                                                                alt="img"
                                                            />
                                                        </span>
                                                        <p className="fs-14 text-truncate ">Ronald Moult</p>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                            4.2
                                                        </span>
                                                        <p className="fs-14 text-truncate">(500)</p>
                                                    </div>
                                                </div>
                                                <h5 className="mb-1 text-truncate">
                                                    <Link href={routes.cruiseDetails}>Sailor’s Delight</Link>
                                                </h5>
                                                <p className="d-flex align-items-center mb-3">
                                                    <i className="isax isax-location5 me-2" />
                                                    Castle Street, Cambridge
                                                </p>
                                                <div className="curise-details d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-calendar-2 text-gray-6 me-1" />
                                                            Year : <span className="text-dark fw-medium">2021</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-user me-1" />
                                                            Guests : <span className="text-dark fw-medium">6</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-1">
                                                            <i className="isax isax-fatrows text-gray-6 me-1" />
                                                            Width :{" "}
                                                            <span className="text-dark fw-medium">95.14 m</span>
                                                        </p>
                                                        <p>
                                                            <i className="isax isax-flash-1 me-1" />
                                                            Speed :{" "}
                                                            <span className="text-dark fw-medium">16 Knots</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                    <h6 className="d-flex align-items-center">
                                                        <i className="isax isax-home-wifi ms-2 me-2" />
                                                        <i className="isax isax-scissor me-2" />
                                                        <i className="isax isax-profile-2user me-2" />
                                                        <i className="isax isax-wind-2 me-2" />
                                                        <Link
                                                            href="#"
                                                            className="fs-14 fw-normal text-default d-inline-block"
                                                        >
                                                            +2
                                                        </Link>
                                                    </h6>
                                                    <h5 className="text-primary text-nowrap me-2">
                                                        $650{" "}
                                                        <span className="fs-14 fw-normal text-default">
                                                            / day
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cruise Grid */}
                                </div>
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
                </div>
                {/* /Page Wrapper */}
            </>


        </div>
    )
}

export default CuriseGrid
