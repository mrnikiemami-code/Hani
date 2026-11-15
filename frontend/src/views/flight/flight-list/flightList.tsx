"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import FlightSearch from '../flightSearch';
import AppSwiper from '../../../components/app-swiper'
import FlightFilter from '../flightFilter';


const FlightList = () => {
    const routes = all_routes
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Flight',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Flight',
            active: false,
        },
        {
            label: 'Flight List',
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
        <>
            <Breadcrumb title="Flight" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-05" />
            <div className="content">
                <div className="container">
                    <FlightSearch />


                    <div className="row">

                        <FlightFilter />

                        <div className="col-xl-9 col-lg-9">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-3">1920 Flights Found on Your Search</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="list-item d-flex align-items-center mb-3">
                                        <Link href={routes.flightGrid} className="list-icon me-2"><i className="isax isax-grid-1"></i></Link>
                                        <Link href={routes.flightList} className="list-icon active me-2"><i className="isax isax-firstline"></i></Link>
                                    </div>
                                    <div className="dropdown mb-3">
                                        <Link href="#" className="dropdown-toggle py-2" data-bs-toggle="dropdown" >
                                            <span className="fw-medium text-gray-9">Sort By : </span>Recommended
                                        </Link>
                                        <div className="dropdown-menu dropdown-sm">
                                            <form action={routes.flightGrid}>
                                                <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend1" defaultChecked />
                                                    <label className="form-check-label ms-2" htmlFor="recommend1">Recommended</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend2" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend2">Price: low to high</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend3" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend3">Price: high to low</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend4" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend4">Newest</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend5" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend5">Ratings</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-0">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend6" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend6">Reviews</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                                                    <Link href="#" className="btn btn-light btn-sm me-2">Reset</Link>
                                                    <button type="button" className="btn btn-primary btn-sm">Apply</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-info br-10 p-3 pb-2 mb-4">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center"><i className="isax isax-info-circle me-2"></i>Save an average of 15% on thousands of flights when you're signed in</p>
                                    <Link href={routes.login} className="btn btn-white btn-sm mb-2">Sign In</Link>
                                </div>
                            </div>
                            <div className="hotel-list  list-full">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        {/* Flight List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-09.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-05.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={routes.compare} className="fav-icon compare-icon me-2" aria-label="Add to compare" title="Add to compare">
                                                            <i className="isax isax-arrange-square"></i>
                                                        </Link>
                                                        <Link href="#" className={`fav-icon me-2${selectedItems[1] ? 'selected' : ''}`}>
                                                            <i className="isax isax-heart5"></i>
                                                        </Link>
                                                        <span className="badge bg-indigo">Cheapest</span>
                                                    </div>
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">5.0</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="text-truncate mb-1"><Link href={routes.flightDetails}>Skybridge 191</Link></h5>
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-sm me-2">
                                                                <ImageWithBasePath src="assets/img/icons/airindia.svg" className="rounded-circle" alt="icon" />
                                                            </span>
                                                            <p className="fs-14 mb-0 me-2">Air India</p>
                                                            <p className="fs-14 mb-0"><i className="ti ti-point-filled text-primary me-2"></i>1-stop at Texas</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-outline-success fs-10 fw-medium  me-2">20 Seats Left</span>
                                                        <Link href="#" className="avatar avatar-sm">
                                                            <ImageWithBasePath src="assets/img/users/user-08.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className=" fs-14 mb-3">Experience top-notch service, in-flight amenities, and smooth takeoffs for a stress-free journey.</p>
                                                <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-45 me-2"></i>New York</span>
                                                    <Link href="#" className="arrow-icon flex-shrink-0 mx-2"><i className="isax isax-arrow-2"></i></Link>
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-135 me-2"></i>Sydney</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                    <div className="date-info p-2">
                                                        <p className="d-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Aug 01, 2024 - Aug 03, 2024</p>
                                                    </div>
                                                    <h6 className="text-primary"><span className="fs-14 fw-normal text-default">From </span>$500</h6>

                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight List */}

                                        {/* Flight List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-01.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={2} onClick={() => handleItemClick(2)}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={routes.compare} className="fav-icon compare-icon me-2" aria-label="Add to compare" title="Add to compare">
                                                            <i className="isax isax-arrange-square"></i>
                                                        </Link>
                                                        <Link href="#" className={`fav-icon me-2${selectedItems[2] ? 'selected' : ''}`}>
                                                            <i className="isax isax-heart5"></i>
                                                        </Link>
                                                        <span className="badge bg-indigo">Cheapest</span>
                                                    </div>
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">4.5</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="text-truncate mb-1"><Link href={routes.flightDetails}>SkyBound 102</Link></h5>
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-sm me-2">
                                                                <ImageWithBasePath src="assets/img/icons/airindia.svg" className="rounded-circle" alt="icon" />
                                                            </span>
                                                            <p className="fs-14 mb-0 me-2">Indigo</p>
                                                            <p className="fs-14 mb-0"><i className="ti ti-point-filled text-primary me-2"></i>1-stop at Dubai</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-outline-success fs-10 fw-medium  me-2">18 Seats Left</span>
                                                        <Link href="#" className="avatar avatar-sm">
                                                            <ImageWithBasePath src="assets/img/users/user-09.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className=" fs-14 mb-3">Enjoy a comfortable and seamless journey with top-notch service on every flight.</p>
                                                <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-45 me-2"></i>London</span>
                                                    <Link href="#" className="arrow-icon flex-shrink-0 mx-2"><i className="isax isax-arrow-2"></i></Link>
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-135 me-2"></i>London</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                    <div className="date-info p-2">
                                                        <p className="d-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Aug 13, 2024 - Aug 15, 2024</p>
                                                    </div>
                                                    <h6 className="text-primary"><span className="fs-14 fw-normal text-default">From </span>$600</h6>

                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight List */}

                                        {/* Flight List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-01.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-09.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-05.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={3} onClick={() => handleItemClick(3)}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={routes.compare} className="fav-icon compare-icon me-2" aria-label="Add to compare" title="Add to compare">
                                                            <i className="isax isax-arrange-square"></i>
                                                        </Link>
                                                        <Link href="#" className={`fav-icon me-2${selectedItems[3] ? 'selected' : ''}`}>
                                                            <i className="isax isax-heart5"></i>
                                                        </Link>
                                                        <span className="badge bg-indigo">Cheapest</span>
                                                    </div>
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">4.9</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="text-truncate mb-1"><Link href={routes.flightDetails}>Nimbus 345</Link></h5>
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-sm me-2">
                                                                <ImageWithBasePath src="assets/img/icons/airindia.svg" className="rounded-circle" alt="icon" />
                                                            </span>
                                                            <p className="fs-14 mb-0 me-2">Indigo</p>
                                                            <p className="fs-14 mb-0"><i className="ti ti-point-filled text-primary me-2"></i>1-stop at Dubai</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-outline-success fs-10 fw-medium  me-2">27 Seats Left</span>
                                                        <Link href="#" className="avatar avatar-sm">
                                                            <ImageWithBasePath src="assets/img/users/user-10.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className=" fs-14 mb-3">Enjoy a hassle-free journey with reliable service, spacious seating, and friendly staff.</p>
                                                <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-45 me-2"></i>Paris</span>
                                                    <Link href="#" className="arrow-icon flex-shrink-0 mx-2"><i className="isax isax-arrow-2"></i></Link>
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-135 me-2"></i>Cape Town</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                    <div className="date-info p-2">
                                                        <p className="d-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Aug 26, 2024 - Aug 27, 2024</p>
                                                    </div>
                                                    <h6 className="text-primary"><span className="fs-14 fw-normal text-default">From </span>$300</h6>

                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight List */}

                                        {/* Flight List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-01.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-04.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={4} onClick={() => handleItemClick(4)}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={routes.compare} className="fav-icon compare-icon me-2" aria-label="Add to compare" title="Add to compare">
                                                            <i className="isax isax-arrange-square"></i>
                                                        </Link>
                                                        <Link href="#" className={`fav-icon me-2${selectedItems[4] ? 'selected' : ''}`}>
                                                            <i className="isax isax-heart5"></i>
                                                        </Link>
                                                        <span className="badge bg-indigo">Cheapest</span>
                                                    </div>
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">4.3</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="text-truncate mb-1"><Link href={routes.flightDetails}>AstraFlight 215</Link></h5>
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-sm me-2">
                                                                <ImageWithBasePath src="assets/img/icons/airindia.svg" className="rounded-circle" alt="icon" />
                                                            </span>
                                                            <p className="fs-14 mb-0 me-2">Indigo</p>
                                                            <p className="fs-14 mb-0"><i className="ti ti-point-filled text-primary me-2"></i>1-stop at Frankfurt</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-outline-success fs-10 fw-medium  me-2">27 Seats Left</span>
                                                        <Link href="#" className="avatar avatar-sm">
                                                            <ImageWithBasePath src="assets/img/users/user-11.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className=" fs-14 mb-3">Travel smart with affordable fares, seamless connections, and exceptional in-flight comfort.</p>
                                                <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-45 me-2"></i>Toronto</span>
                                                    <Link href="#" className="arrow-icon flex-shrink-0 mx-2"><i className="isax isax-arrow-2"></i></Link>
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-135 me-2"></i>Bangkok</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                    <div className="date-info p-2">
                                                        <p className="d-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Sep 04, 2024 - Sep 07, 2024</p>
                                                    </div>
                                                    <h6 className="text-primary"><span className="fs-14 fw-normal text-default">From </span>$300</h6>

                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight List */}

                                        {/* Flight List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-05.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={5} onClick={() => handleItemClick(5)}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={routes.compare} className="fav-icon compare-icon me-2" aria-label="Add to compare" title="Add to compare">
                                                            <i className="isax isax-arrange-square"></i>
                                                        </Link>
                                                        <Link href="#" className={`fav-icon me-2${selectedItems[5] ? 'selected' : ''}`}>
                                                            <i className="isax isax-heart5"></i>
                                                        </Link>
                                                        <span className="badge bg-indigo">Cheapest</span>
                                                    </div>
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">4.1</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="text-truncate mb-1"><Link href={routes.flightDetails}>Cloudrider 789</Link></h5>
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-sm me-2">
                                                                <ImageWithBasePath src="assets/img/icons/airindia.svg" className="rounded-circle" alt="icon" />
                                                            </span>
                                                            <p className="fs-14 mb-0 me-2">Air India</p>
                                                            <p className="fs-14 mb-0"><i className="ti ti-point-filled text-primary me-2"></i>1-stop at Dallas</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-outline-success fs-10 fw-medium  me-2">14 Seats Left</span>
                                                        <Link href="#" className="avatar avatar-sm">
                                                            <ImageWithBasePath src="assets/img/users/user-12.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className=" fs-14 mb-3">Experience top-notch service, in-flight amenities, and smooth takeoffs for a stress-free journey.</p>
                                                <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-45 me-2"></i>Chicago</span>
                                                    <Link href="#" className="arrow-icon flex-shrink-0 mx-2"><i className="isax isax-arrow-2"></i></Link>
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-135 me-2"></i>Melbourne</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                    <div className="date-info p-2">
                                                        <p className="d-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Sep 11, 2024 - Sep 13, 2024</p>
                                                    </div>
                                                    <h6 className="text-primary"><span className="fs-14 fw-normal text-default">From </span>$550</h6>

                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight List */}

                                        {/* Flight List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img ">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-01.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={6} onClick={() => handleItemClick(6)}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={routes.compare} className="fav-icon compare-icon me-2" aria-label="Add to compare" title="Add to compare">
                                                            <i className="isax isax-arrange-square"></i>
                                                        </Link>
                                                        <Link href="#" className={`fav-icon me-2${selectedItems[6] ? 'selected' : ''}`}>
                                                            <i className="isax isax-heart5"></i>
                                                        </Link>
                                                        <span className="badge bg-indigo">Cheapest</span>
                                                    </div>
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">4.6</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="text-truncate mb-1"><Link href={routes.flightDetails}>Aether Express 901</Link></h5>
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-sm me-2">
                                                                <ImageWithBasePath src="assets/img/icons/airindia.svg" className="rounded-circle" alt="icon" />
                                                            </span>
                                                            <p className="fs-14 mb-0 me-2">Indigo</p>
                                                            <p className="fs-14 mb-0"><i className="ti ti-point-filled text-primary me-2"></i>1-stop at Seoul</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-outline-success fs-10 fw-medium  me-2">12 Seats Left</span>
                                                        <Link href="#" className="avatar avatar-sm">
                                                            <ImageWithBasePath src="assets/img/users/user-13.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className=" fs-14 mb-3">Fly with confidence, knowing our comfortable cabins and efficient service make every trip a breeze.</p>
                                                <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-45 me-2"></i>Miami</span>
                                                    <Link href="#" className="arrow-icon flex-shrink-0 mx-2"><i className="isax isax-arrow-2"></i></Link>
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-135 me-2"></i>Tokyo</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                    <div className="date-info p-2">
                                                        <p className="d-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Sep 22, 2024 - Sep 24, 2024</p>
                                                    </div>
                                                    <h6 className="text-primary"><span className="fs-14 fw-normal text-default">From </span>$450</h6>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight List */}

                                        {/* Flight List */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-04.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-09.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.flightDetails}>
                                                                <ImageWithBasePath src="assets/img/flight/flight-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={7} onClick={() => handleItemClick(7)}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={routes.compare} className="fav-icon compare-icon me-2" aria-label="Add to compare" title="Add to compare">
                                                            <i className="isax isax-arrange-square"></i>
                                                        </Link>
                                                        <Link href="#" className={`fav-icon me-2${selectedItems[7] ? 'selected' : ''}`}>
                                                            <i className="isax isax-heart5"></i>
                                                        </Link>
                                                        <span className="badge bg-indigo">Cheapest</span>
                                                    </div>
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">4.8</span>
                                                </div>
                                            </div>
                                            <div className="place-content">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                    <div>
                                                        <h5 className="text-truncate mb-1"><Link href={routes.flightDetails}>Voyager 658</Link></h5>
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-sm me-2">
                                                                <ImageWithBasePath src="assets/img/icons/airindia.svg" className="rounded-circle" alt="icon" />
                                                            </span>
                                                            <p className="fs-14 mb-0 me-2">Air India</p>
                                                            <p className="fs-14 mb-0"><i className="ti ti-point-filled text-primary me-2"></i>1-stop at Sydney</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-outline-success fs-10 fw-medium  me-2">21 Seats Left</span>
                                                        <Link href="#" className="avatar avatar-sm">
                                                            <ImageWithBasePath src="assets/img/users/user-14.jpg" className="rounded-circle" alt="img" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className=" fs-14 mb-3">Relax and enjoy your flight with on-time schedules, comfortable seats, and world-class service.</p>
                                                <div className="flight-loc d-flex align-items-center justify-content-between mb-3">
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-45 me-2"></i>Frankfurt</span>
                                                    <Link href="#" className="arrow-icon flex-shrink-0 mx-2"><i className="isax isax-arrow-2"></i></Link>
                                                    <span className="loc-name d-inline-flex justify-content-center align-items-center w-100"><i className="isax isax-airplane rotate-135 me-2"></i>Auckland</span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                    <div className="date-info p-2">
                                                        <p className="d-flex align-items-center"><i className="isax isax-calendar-2 me-2"></i>Oct 04, 2024 - Oct 07, 2024</p>
                                                    </div>
                                                    <h6 className="text-primary"><span className="fs-14 fw-normal text-default">From </span>$350</h6>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight List */}
                                    </div>
                                </div>

                            </div>

                            {/* Pagination */}
                            <nav className="pagination-nav">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <Link className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                                    <li className="page-item active"><Link className="page-link" href="#">4</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">5</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            {/* /Pagination */}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FlightList