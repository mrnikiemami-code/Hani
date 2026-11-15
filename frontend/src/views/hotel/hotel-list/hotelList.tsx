"use client";
import { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import SearchOption from '../searchOption';
import AppSwiper from '../../../components/app-swiper'
import HotelFilter from '../hotelFilter';
const HotelList = () => {
    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Hotel',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Hotels',
            active: false,
        },
        {
            label: 'Hotel List',
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
            <Breadcrumb title="Hotel" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
            <div className="content">
                <div className="container">

                    <SearchOption />

                    <div className="row">

                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-3 ">
                            <HotelFilter />
                        </div>
                        {/* /Sidebar */}

                        <div className="col-xl-9 col-lg-9">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-3">1920 Hotels Found on Your Search</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="list-item d-flex align-items-center mb-3">
                                        <Link href={routes.hotelGrid} className="list-icon me-2"><i className="isax isax-grid-1"></i></Link>
                                        <Link href={routes.hotelList} className="list-icon active me-2"><i className="isax isax-firstline"></i></Link>
                                        <Link href={routes.hotelMap} className="list-icon me-2"><i className="isax isax-map-1"></i></Link>
                                    </div>
                                    <div className="dropdown mb-3">
                                        <Link href="#" className="dropdown-toggle py-2" data-bs-toggle="dropdown" >
                                            <span className="fw-medium text-gray-9">Sort By : </span>Recommended
                                        </Link>
                                        <div className="dropdown-menu dropdown-sm">
                                            <form >
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
                                    <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center"><i className="isax isax-info-circle me-2"></i>Save an average of 15% on thousands of hotels when you're signed in</p>
                                    <Link href={routes.login} className="btn btn-white btn-sm mb-2">Sign In</Link>
                                </div>
                            </div>
                            <div className="hotel-list">
                                <div className="row justify-content-center">

                                    <div className="col-md-12">

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-01.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>Hotel Miravent Barcelona</Link></h5>
                                                        <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Beth Williams</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                                            <p className="fs-14">(400)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Experience luxury and comfort at our centrally located hotel, featuring modern amenities, spacious rooms, and exceptional service.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$500 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                <Link href={routes.hotelDetails}>
                                                    <ImageWithBasePath src="assets/img/hotels/hotel-05.jpg" className="img-fluid" alt="img" />
                                                </Link>
                                                <div className="fav-item" key={2} onClick={() => handleItemClick(2)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>The Luxe Haven</Link></h5>
                                                        <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Oxford Street, London</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Tom Andrews</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.7</span>
                                                            <p className="fs-14">(360)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Stay in luxury at our hotel, featuring premium amenities, stunning cityscape views, and an on-site spa for the ultimate relaxation experience</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$600 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                <Link href={routes.hotelDetails}>
                                                    <ImageWithBasePath src="assets/img/hotels/hotel-06.jpg" className="img-fluid" alt="img" />
                                                </Link>
                                                <div className="fav-item" key={3} onClick={() => handleItemClick(3)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>The Urban Retreat</Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>Princes Street, Edinburgh</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-03.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Rober Cowell</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.5</span>
                                                            <p className="fs-14">(500)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Conveniently located near top attractions, our hotel offers modern rooms, free parking, and a complimentary breakfast to start your day right.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$300 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-07.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={4} onClick={() => handleItemClick(4)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[4] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>The Grand Horizon</Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>Deansgate, Manchester</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-05.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Timothy Brewer</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                                            <p className="fs-14">(450)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Discover the perfect balance of luxury and affordability at our hotel, with a 24-hour concierge, free Wi-Fi, and easy access to local hotspots.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$400 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={5} onClick={() => handleItemClick(5)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[5] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>Hotel Evergreen </Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>King’s Road, Chelsea</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-06.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Timothy Rio</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.5</span>
                                                            <p className="fs-14">(500)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Our hotel offers pet-friendly rooms, complimentary shuttle service, and comfortable accommodations just minutes from key attractions and business centers.</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$300 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-10.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-04.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-06.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={6} onClick={() => handleItemClick(6)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[6] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>Stardust Hotel</Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>Bold Street, Liverpool</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-07.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Brent Holmes</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.1</span>
                                                            <p className="fs-14">(270)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Relax in our elegantly designed rooms with stunning views, on-site dining, and premium amenities, ideal for both business and leisure stays</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$450 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-11.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-05.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={7} onClick={() => handleItemClick(7)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[7] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>Hotel Serene Valley</Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>Broad Street, Bristol</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-08.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">John James</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.6</span>
                                                            <p className="fs-14">(650)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Whether you're here for business or leisure, our hotel provides modern amenities, free Wi-Fi, and easy access to the city's vibrant downtown area</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$350 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                
                                                    <AppSwiper preset="img-slider">
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-12.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-08.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                        <div className="slide-images">
                                                            <Link href={routes.hotelDetails}>
                                                                <ImageWithBasePath src="assets/img/hotels/hotel-10.jpg" className="img-fluid" alt="img" />
                                                            </Link>
                                                        </div>
                                                    </AppSwiper>
                                                <div className="fav-item" key={8} onClick={() => handleItemClick(8)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[8] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="overflow-hidden">
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>Hotel Aurora Bliss</Link></h5>
                                                        <p className="d-flex align-items-center text-truncate mb-2"><i className="isax isax-location5 me-2"></i>Castle Street, Cambridge</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-09.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">Roald Mourie</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.8</span>
                                                            <p className="fs-14">(700)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Stay in the heart of the action at our hotel, featuring well-appointed rooms, on-site dining, and easy access to popular attractions and nightlife</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$650 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

                                        {/* Hotel Grid */}
                                        <div className="place-item mb-4">
                                            <div className="place-img">
                                                <Link href={routes.hotelDetails}>
                                                    <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                </Link>
                                                <div className="fav-item" key={9} onClick={() => handleItemClick(9)}>
                                                    <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                    <Link href={routes.compare} className="fav-icon compare-icon" aria-label="Add to compare" title="Add to compare">
                                                        <i className="isax isax-arrange-square"></i>
                                                    </Link>
                                                    <Link href="#" className={`fav-icon ${selectedItems[9] ? 'selected' : ''}`}>
                                                        <i className="isax isax-heart5"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="place-content pb-1">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                    <div>
                                                        <h5 className="mb-1 text-truncate"><Link href={routes.hotelDetails}>The Skyline</Link></h5>
                                                        <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Chapel Street, London</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <Link href="#" className="d-flex align-items-center overflow-hidden border-end pe-2 me-2">
                                                            <span className="avatar avatar-md flex-shrink-0 me-2">
                                                                <ImageWithBasePath src="assets/img/users/user-10.jpg" className="rounded-circle" alt="img" />
                                                            </span>
                                                            <p className="fs-14 text-truncate">John Doe</p>
                                                        </Link>
                                                        <div className="d-flex align-items-center text-nowrap">
                                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.7</span>
                                                            <p className="fs-14">(160)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="line-ellipsis fs-14">Our hotel has featuring premium amenities, stunning cityscape views, and an on-site spa for the ultimate relaxation experience</p>
                                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                    <h6 className="d-flex align-items-center mb-3">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                                    <h5 className="text-primary text-nowrap me-2 mb-3">$600 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}

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

export default HotelList